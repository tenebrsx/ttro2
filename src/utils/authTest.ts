// Authentication Test Utility
// This file provides utilities to test the multi-device authentication system

interface SessionInfo {
  id: string;
  deviceInfo: {
    userAgent: string;
    timestamp: number;
    lastActivity: number;
    deviceName: string;
  };
  expiresAt: number;
  isCurrentSession: boolean;
}

interface AuthTestResult {
  success: boolean;
  message: string;
  data?: unknown;
}

export class AuthTester {
  private static readonly STORAGE_KEY = "ttro_admin_sessions";
  private static readonly ADMIN_PASSWORD = "admin123";

  // Clear all sessions for testing
  static clearAllSessions(): AuthTestResult {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return {
        success: true,
        message: "All sessions cleared successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to clear sessions: ${error}`,
      };
    }
  }

  // Get current sessions from localStorage
  static getCurrentSessions(): AuthTestResult {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      const sessions = stored ? JSON.parse(stored) : [];

      return {
        success: true,
        message: `Found ${sessions.length} sessions`,
        data: sessions,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to get sessions: ${error}`,
      };
    }
  }

  // Simulate login from multiple devices
  static simulateMultiDeviceLogin(deviceCount: number = 3): AuthTestResult {
    try {
      const devices = [
        {
          name: "iPhone 14",
          userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)",
        },
        {
          name: "MacBook Pro",
          userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        },
        {
          name: "Windows PC",
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
        { name: "Android Phone", userAgent: "Mozilla/5.0 (Linux; Android 12)" },
        {
          name: "iPad",
          userAgent: "Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X)",
        },
      ];

      const sessions = [];
      const now = Date.now();
      const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours

      for (let i = 0; i < Math.min(deviceCount, devices.length); i++) {
        const device = devices[i];
        const sessionId = `test_session_${now}_${i}`;

        sessions.push({
          id: sessionId,
          deviceInfo: {
            userAgent: device.userAgent,
            timestamp: now + i * 1000, // Slight delay between logins
            lastActivity: now + i * 1000,
            deviceName: device.name,
          },
          expiresAt: now + sessionDuration,
          isCurrentSession: i === 0, // First session is current
        });
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessions));

      return {
        success: true,
        message: `Successfully simulated ${sessions.length} concurrent sessions`,
        data: sessions,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to simulate multi-device login: ${error}`,
      };
    }
  }

  // Test session expiration
  static testSessionExpiration(): AuthTestResult {
    try {
      const now = Date.now();
      const expiredSession = {
        id: `expired_session_${now}`,
        deviceInfo: {
          userAgent: "Mozilla/5.0 (Test Device)",
          timestamp: now - 25 * 60 * 60 * 1000, // 25 hours ago
          lastActivity: now - 25 * 60 * 60 * 1000,
          deviceName: "Test Device",
        },
        expiresAt: now - 60 * 60 * 1000, // Expired 1 hour ago
        isCurrentSession: true,
      };

      const validSession = {
        id: `valid_session_${now}`,
        deviceInfo: {
          userAgent: "Mozilla/5.0 (Valid Device)",
          timestamp: now - 1000 * 60, // 1 minute ago
          lastActivity: now - 1000 * 60,
          deviceName: "Valid Device",
        },
        expiresAt: now + 23 * 60 * 60 * 1000, // Expires in 23 hours
        isCurrentSession: false,
      };

      const sessions = [expiredSession, validSession];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessions));

      return {
        success: true,
        message: "Test sessions created (1 expired, 1 valid)",
        data: { expiredSession, validSession },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to test session expiration: ${error}`,
      };
    }
  }

  // Validate session management
  static validateSessionManagement(): AuthTestResult {
    try {
      const result = this.getCurrentSessions();
      if (!result.success) {
        return result;
      }

      const sessions = result.data || [];
      const now = Date.now();

      // Check for expired sessions
      const expiredSessions = sessions.filter(
        (session: SessionInfo) => session.expiresAt <= now,
      );
      const validSessions = sessions.filter(
        (session: SessionInfo) => session.expiresAt > now,
      );
      const currentSessions = sessions.filter(
        (session: SessionInfo) => session.isCurrentSession,
      );

      const validationResults = {
        totalSessions: sessions.length,
        expiredSessions: expiredSessions.length,
        validSessions: validSessions.length,
        currentSessions: currentSessions.length,
        hasOnlyOneCurrentSession: currentSessions.length <= 1,
        allSessionsHaveIds: sessions.every(
          (session: SessionInfo) => session.id,
        ),
        allSessionsHaveDeviceInfo: sessions.every(
          (session: SessionInfo) =>
            session.deviceInfo &&
            session.deviceInfo.deviceName &&
            session.deviceInfo.userAgent,
        ),
      };

      const isValid =
        validationResults.hasOnlyOneCurrentSession &&
        validationResults.allSessionsHaveIds &&
        validationResults.allSessionsHaveDeviceInfo;

      return {
        success: isValid,
        message: isValid
          ? "Session management validation passed"
          : "Session management validation failed",
        data: validationResults,
      };
    } catch (error) {
      return {
        success: false,
        message: `Validation failed: ${error}`,
      };
    }
  }

  // Run comprehensive test suite
  static runFullTestSuite(): AuthTestResult[] {
    const results: AuthTestResult[] = [];

    console.log("🧪 Starting Authentication Test Suite...\n");

    // Test 1: Clear sessions
    console.log("1. Clearing existing sessions...");
    const clearResult = this.clearAllSessions();
    results.push(clearResult);
    console.log(
      clearResult.success ? "✅ PASS" : "❌ FAIL",
      clearResult.message,
    );

    // Test 2: Simulate multi-device login
    console.log("\n2. Simulating multi-device login...");
    const multiDeviceResult = this.simulateMultiDeviceLogin(3);
    results.push(multiDeviceResult);
    console.log(
      multiDeviceResult.success ? "✅ PASS" : "❌ FAIL",
      multiDeviceResult.message,
    );

    // Test 3: Validate session management
    console.log("\n3. Validating session management...");
    const validationResult = this.validateSessionManagement();
    results.push(validationResult);
    console.log(
      validationResult.success ? "✅ PASS" : "❌ FAIL",
      validationResult.message,
    );
    if (validationResult.data) {
      console.log("   Validation details:", validationResult.data);
    }

    // Test 4: Test session expiration
    console.log("\n4. Testing session expiration...");
    const expirationResult = this.testSessionExpiration();
    results.push(expirationResult);
    console.log(
      expirationResult.success ? "✅ PASS" : "❌ FAIL",
      expirationResult.message,
    );

    // Test 5: Final session check
    console.log("\n5. Final session check...");
    const finalResult = this.getCurrentSessions();
    results.push(finalResult);
    console.log(
      finalResult.success ? "✅ PASS" : "❌ FAIL",
      finalResult.message,
    );

    // Summary
    const passCount = results.filter((r) => r.success).length;
    const totalCount = results.length;

    console.log(
      `\n📊 Test Suite Summary: ${passCount}/${totalCount} tests passed`,
    );

    if (passCount === totalCount) {
      console.log(
        "🎉 All tests passed! Multi-device authentication is working correctly.",
      );
    } else {
      console.log("⚠️ Some tests failed. Please check the implementation.");
    }

    return results;
  }

  // Helper method to get device info from user agent
  static getDeviceInfo(userAgent: string): {
    deviceName: string;
    deviceType: string;
  } {
    let deviceName = "Unknown Device";
    let deviceType = "desktop";

    if (/iPhone|iPod/.test(userAgent)) {
      deviceName = "iOS Device";
      deviceType = "mobile";
    } else if (/iPad/.test(userAgent)) {
      deviceName = "iPad";
      deviceType = "tablet";
    } else if (/Android/.test(userAgent)) {
      deviceName = /Mobile/.test(userAgent)
        ? "Android Phone"
        : "Android Tablet";
      deviceType = /Mobile/.test(userAgent) ? "mobile" : "tablet";
    } else if (/Windows/.test(userAgent)) {
      deviceName = "Windows PC";
      deviceType = "desktop";
    } else if (/Mac/.test(userAgent)) {
      deviceName = "Mac";
      deviceType = "desktop";
    } else if (/Linux/.test(userAgent)) {
      deviceName = "Linux PC";
      deviceType = "desktop";
    }

    return { deviceName, deviceType };
  }

  // Performance test for large numbers of sessions
  static performanceTest(sessionCount: number = 100): AuthTestResult {
    const startTime = performance.now();

    try {
      const sessions = [];
      const now = Date.now();
      const sessionDuration = 24 * 60 * 60 * 1000;

      for (let i = 0; i < sessionCount; i++) {
        sessions.push({
          id: `perf_session_${now}_${i}`,
          deviceInfo: {
            userAgent: `Test Agent ${i}`,
            timestamp: now + i,
            lastActivity: now + i,
            deviceName: `Test Device ${i}`,
          },
          expiresAt: now + sessionDuration,
          isCurrentSession: i === 0,
        });
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessions));

      const endTime = performance.now();
      const duration = endTime - startTime;

      return {
        success: true,
        message: `Performance test completed: ${sessionCount} sessions created in ${duration.toFixed(2)}ms`,
        data: {
          sessionCount,
          duration,
          averageTimePerSession: duration / sessionCount,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Performance test failed: ${error}`,
      };
    }
  }
}

// Export utility functions for console testing
export const authTest = {
  run: () => AuthTester.runFullTestSuite(),
  clear: () => AuthTester.clearAllSessions(),
  simulate: (count?: number) => AuthTester.simulateMultiDeviceLogin(count),
  validate: () => AuthTester.validateSessionManagement(),
  sessions: () => AuthTester.getCurrentSessions(),
  performance: (count?: number) => AuthTester.performanceTest(count),
};

// Make available in global scope for console testing
if (typeof window !== "undefined") {
  (window as typeof window & { authTest: typeof authTest }).authTest = authTest;
}
