import * as React from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

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

interface AuthContextType {
  isAuthenticated: boolean;
  currentSession: SessionInfo | null;
  allSessions: SessionInfo[];
  loading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: (sessionId?: string) => Promise<void>;
  logoutAllDevices: () => Promise<void>;
  refreshSession: () => void;
  validateSession: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_PASSWORD = "admin123";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const STORAGE_KEY = "ttro_admin_sessions";

// Generate unique session ID
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get device name from user agent
const getDeviceName = (userAgent: string): string => {
  if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS Device";
  if (/Android/.test(userAgent)) return "Android Device";
  if (/Windows/.test(userAgent)) return "Windows PC";
  if (/Mac/.test(userAgent)) return "Mac";
  if (/Linux/.test(userAgent)) return "Linux PC";
  return "Unknown Device";
};

// Get all sessions from localStorage
const getAllSessions = (): SessionInfo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const sessions: SessionInfo[] = JSON.parse(stored);
    const now = Date.now();

    // Filter out expired sessions
    const validSessions = sessions.filter((session) => session.expiresAt > now);

    // Update storage if any sessions were expired
    if (validSessions.length !== sessions.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validSessions));
    }

    return validSessions;
  } catch (error) {
    console.error("Error reading sessions from localStorage:", error);
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
};

// Save sessions to localStorage
const saveSessions = (sessions: SessionInfo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error("Error saving sessions to localStorage:", error);
  }
};

// Get current session (the one for this device/browser)
const getCurrentSession = (sessions: SessionInfo[]): SessionInfo | null => {
  return sessions.find((session) => session.isCurrentSession) || null;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentSession, setCurrentSession] = useState<SessionInfo | null>(
    null,
  );
  const [allSessions, setAllSessions] = useState<SessionInfo[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const sessions = getAllSessions();
        const current = getCurrentSession(sessions);

        setAllSessions(sessions);
        setCurrentSession(current);
        setIsAuthenticated(!!current);

        console.log("🔐 Auth initialized:", {
          totalSessions: sessions.length,
          hasCurrentSession: !!current,
          isAuthenticated: !!current,
        });
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Update session activity
  const updateSessionActivity = useCallback(() => {
    if (!currentSession) return;

    const sessions = getAllSessions();
    const updatedSessions = sessions.map((session) => {
      if (session.id === currentSession.id && session.isCurrentSession) {
        return {
          ...session,
          deviceInfo: {
            ...session.deviceInfo,
            lastActivity: Date.now(),
          },
        };
      }
      return session;
    });

    saveSessions(updatedSessions);
    setAllSessions(updatedSessions);
    setCurrentSession(updatedSessions.find((s) => s.isCurrentSession) || null);
  }, [currentSession]);

  // Auto-update activity every 5 minutes
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(updateSessionActivity, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated, updateSessionActivity]);

  // Login function
  const login = useCallback(async (password: string): Promise<boolean> => {
    if (password !== ADMIN_PASSWORD) {
      return false;
    }

    const now = Date.now();
    const sessionId = generateSessionId();
    const userAgent = navigator.userAgent;

    const newSession: SessionInfo = {
      id: sessionId,
      deviceInfo: {
        userAgent,
        timestamp: now,
        lastActivity: now,
        deviceName: getDeviceName(userAgent),
      },
      expiresAt: now + SESSION_DURATION,
      isCurrentSession: true,
    };

    // Get existing sessions and mark none as current (since this is a new login)
    const existingSessions = getAllSessions().map((session) => ({
      ...session,
      isCurrentSession: false,
    }));

    // Add new session
    const allSessions = [...existingSessions, newSession];
    saveSessions(allSessions);

    setAllSessions(allSessions);
    setCurrentSession(newSession);
    setIsAuthenticated(true);

    console.log("🔐 User logged in successfully:", {
      sessionId,
      deviceName: newSession.deviceInfo.deviceName,
      totalSessions: allSessions.length,
    });

    return true;
  }, []);

  // Logout function (can logout specific session or current session)
  const logout = useCallback(
    async (sessionId?: string): Promise<void> => {
      const sessions = getAllSessions();
      const targetSessionId = sessionId || currentSession?.id;

      if (!targetSessionId) return;

      // Remove the specified session
      const updatedSessions = sessions.filter(
        (session) => session.id !== targetSessionId,
      );
      saveSessions(updatedSessions);

      // If logging out current session, update state
      if (targetSessionId === currentSession?.id) {
        setIsAuthenticated(false);
        setCurrentSession(null);
      }

      setAllSessions(updatedSessions);

      console.log("🔐 Session logged out:", {
        sessionId: targetSessionId,
        remainingSessions: updatedSessions.length,
      });
    },
    [currentSession],
  );

  // Logout all devices
  const logoutAllDevices = useCallback(async (): Promise<void> => {
    localStorage.removeItem(STORAGE_KEY);
    setAllSessions([]);
    setCurrentSession(null);
    setIsAuthenticated(false);

    console.log("🔐 All sessions logged out");
  }, []);

  // Refresh session data from localStorage
  const refreshSession = useCallback(() => {
    const sessions = getAllSessions();
    const current = getCurrentSession(sessions);

    setAllSessions(sessions);
    setCurrentSession(current);
    setIsAuthenticated(!!current);
  }, []);

  // Validate current session
  const validateSession = useCallback((): boolean => {
    if (!currentSession) return false;

    const now = Date.now();
    if (currentSession.expiresAt <= now) {
      // Session expired, logout
      logout();
      return false;
    }

    return true;
  }, [currentSession, logout]);

  // Check session validity periodically
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      validateSession();
    }, 60 * 1000); // Check every minute

    return () => clearInterval(interval);
  }, [isAuthenticated, validateSession]);

  const value: AuthContextType = {
    isAuthenticated,
    currentSession,
    allSessions,
    loading,
    login,
    logout,
    logoutAllDevices,
    refreshSession,
    validateSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
