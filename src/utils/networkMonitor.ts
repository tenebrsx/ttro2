import { useEffect, useState, useCallback } from 'react';

// Network status types
export interface NetworkStatus {
  isOnline: boolean;
  connectionType: 'slow' | 'fast' | 'unknown';
  lastOnline: Date | null;
  retryCount: number;
}

// Network event types
export type NetworkEventType = 'online' | 'offline' | 'slow' | 'fast';

export interface NetworkEventListener {
  (status: NetworkStatus): void;
}

class NetworkMonitor {
  private listeners: Set<NetworkEventListener> = new Set();
  private status: NetworkStatus = {
    isOnline: navigator.onLine,
    connectionType: 'unknown',
    lastOnline: navigator.onLine ? new Date() : null,
    retryCount: 0,
  };

  private pingUrls = [
    'https://firestore.googleapis.com/',
    'https://www.google.com/favicon.ico',
    'https://www.cloudflare.com/favicon.ico',
  ];

  constructor() {
    this.initializeListeners();
    this.detectConnectionSpeed();
  }

  private initializeListeners() {
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);

    // Check connection quality periodically
    setInterval(this.checkConnectionQuality, 30000); // Every 30 seconds
  }

  private handleOnline = () => {
    console.log('🌐 Network: Connection restored');
    this.updateStatus({
      isOnline: true,
      lastOnline: new Date(),
      retryCount: 0,
    });
    this.detectConnectionSpeed();
  };

  private handleOffline = () => {
    console.log('🔌 Network: Connection lost');
    this.updateStatus({
      isOnline: false,
      connectionType: 'unknown',
    });
  };

  private updateStatus(updates: Partial<NetworkStatus>) {
    this.status = { ...this.status, ...updates };
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach(listener => {
      try {
        listener(this.status);
      } catch (error) {
        console.error('Error in network status listener:', error);
      }
    });
  }

  private async detectConnectionSpeed() {
    if (!navigator.onLine) return;

    try {
      const startTime = Date.now();
      const response = await fetch(this.pingUrls[0], {
        method: 'HEAD',
        cache: 'no-cache',
        signal: AbortSignal.timeout(5000),
      });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      // Classify connection speed
      const connectionType = responseTime < 1000 ? 'fast' : 'slow';

      console.log(`🚀 Network: Connection speed detected as ${connectionType} (${responseTime}ms)`);

      this.updateStatus({ connectionType });
    } catch (error) {
      console.warn('Network speed detection failed:', error);
      this.updateStatus({ connectionType: 'slow' });
    }
  }

  private checkConnectionQuality = async () => {
    if (!navigator.onLine) return;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      await fetch(this.pingUrls[1], {
        method: 'HEAD',
        cache: 'no-cache',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!this.status.isOnline) {
        this.handleOnline();
      }
    } catch (error) {
      if (this.status.isOnline) {
        console.warn('🔍 Network: Connection quality check failed, might be offline');
        this.handleOffline();
      }
    }
  };

  // Public methods
  public subscribe(listener: NetworkEventListener): () => void {
    this.listeners.add(listener);

    // Immediately call with current status
    listener(this.status);

    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getStatus(): NetworkStatus {
    return { ...this.status };
  }

  public async testConnectivity(): Promise<boolean> {
    if (!navigator.onLine) return false;

    for (const url of this.pingUrls) {
      try {
        const response = await fetch(url, {
          method: 'HEAD',
          cache: 'no-cache',
          signal: AbortSignal.timeout(5000),
        });

        if (response.ok) {
          return true;
        }
      } catch (error) {
        continue;
      }
    }

    return false;
  }

  public async waitForConnection(maxWaitMs: number = 30000): Promise<boolean> {
    if (this.status.isOnline) return true;

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        unsubscribe();
        resolve(false);
      }, maxWaitMs);

      const unsubscribe = this.subscribe((status) => {
        if (status.isOnline) {
          clearTimeout(timeout);
          unsubscribe();
          resolve(true);
        }
      });
    });
  }

  public incrementRetryCount() {
    this.updateStatus({
      retryCount: this.status.retryCount + 1,
    });
  }

  public resetRetryCount() {
    this.updateStatus({
      retryCount: 0,
    });
  }

  public destroy() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
    this.listeners.clear();
  }
}

// Singleton instance
const networkMonitor = new NetworkMonitor();

// React hook for using network status
export const useNetworkStatus = () => {
  const [status, setStatus] = useState<NetworkStatus>(networkMonitor.getStatus());

  useEffect(() => {
    const unsubscribe = networkMonitor.subscribe(setStatus);
    return unsubscribe;
  }, []);

  return status;
};

// Utility functions for network operations
export const withNetworkRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  retryDelay: number = 1000,
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Wait for connection if offline
      if (!navigator.onLine) {
        console.log(`🔄 Network retry ${attempt + 1}: Waiting for connection...`);
        const connected = await networkMonitor.waitForConnection(10000);
        if (!connected) {
          throw new Error('Network connection timeout');
        }
      }

      const result = await operation();

      // Reset retry count on success
      networkMonitor.resetRetryCount();

      return result;
    } catch (error) {
      lastError = error as Error;
      networkMonitor.incrementRetryCount();

      console.warn(`🔄 Network retry ${attempt + 1}/${maxRetries + 1} failed:`, error);

      if (attempt < maxRetries) {
        // Exponential backoff
        const delay = retryDelay * Math.pow(2, attempt);
        console.log(`⏳ Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw new Error(`Operation failed after ${maxRetries + 1} attempts: ${lastError.message}`);
};

// Firebase-specific network utilities
export const isFirebaseNetworkError = (error: any): boolean => {
  const firebaseNetworkCodes = [
    'unavailable',
    'deadline-exceeded',
    'cancelled',
    'unknown',
  ];

  return firebaseNetworkCodes.includes(error?.code) ||
         error?.message?.includes('network') ||
         error?.message?.includes('offline') ||
         error?.message?.includes('timeout');
};

export const handleFirebaseNetworkError = async <T>(
  operation: () => Promise<T>,
  fallback?: () => T | Promise<T>,
): Promise<T> => {
  try {
    return await withNetworkRetry(operation, 2, 1500);
  } catch (error) {
    if (isFirebaseNetworkError(error) && fallback) {
      console.log('🔄 Using fallback due to network error:', error);
      return await fallback();
    }
    throw error;
  }
};

// Connection quality helpers
export const isSlowConnection = (): boolean => {
  const status = networkMonitor.getStatus();
  return status.connectionType === 'slow';
};

export const shouldReduceAnimations = (): boolean => {
  const status = networkMonitor.getStatus();
  return !status.isOnline || status.connectionType === 'slow';
};

// Export the singleton instance
export default networkMonitor;
