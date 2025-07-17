import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  LogOut,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  X,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface SessionManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SessionManager: React.FC<SessionManagerProps> = ({ isOpen, onClose }) => {
  const { allSessions, currentSession, logout, logoutAllDevices } = useAuth();
  const [showConfirmLogoutAll, setShowConfirmLogoutAll] = useState(false);
  const [loggingOutSession, setLoggingOutSession] = useState<string | null>(
    null,
  );

  // Get device icon based on user agent
  const getDeviceIcon = (userAgent: string) => {
    if (/iPhone|iPad|iPod/.test(userAgent)) {
      return /iPad/.test(userAgent) ? (
        <Tablet className="w-5 h-5" />
      ) : (
        <Smartphone className="w-5 h-5" />
      );
    }
    if (/Android/.test(userAgent)) {
      return /Mobile/.test(userAgent) ? (
        <Smartphone className="w-5 h-5" />
      ) : (
        <Tablet className="w-5 h-5" />
      );
    }
    if (/Windows|Mac|Linux/.test(userAgent)) {
      return <Laptop className="w-5 h-5" />;
    }
    return <Monitor className="w-5 h-5" />;
  };

  // Format time ago
  const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Ahora mismo";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  // Handle logout specific session
  const handleLogoutSession = async (sessionId: string) => {
    setLoggingOutSession(sessionId);
    try {
      await logout(sessionId);
    } catch (error) {
      console.error("Error logging out session:", error);
    } finally {
      setLoggingOutSession(null);
    }
  };

  // Handle logout all devices
  const handleLogoutAllDevices = async () => {
    try {
      await logoutAllDevices();
      setShowConfirmLogoutAll(false);
      onClose();
    } catch (error) {
      console.error("Error logging out all devices:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6" />
                <div>
                  <h2 className="text-xl font-playfair font-bold">
                    Gestión de Sesiones
                  </h2>
                  <p className="text-dusty-rose-100 text-sm">
                    {allSessions.length} sesión
                    {allSessions.length !== 1 ? "es" : ""} activa
                    {allSessions.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {allSessions.length === 0 ? (
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No hay sesiones activas</p>
              </div>
            ) : (
              <div className="space-y-4">
                {allSessions.map((session) => {
                  const isCurrentSession = session.id === currentSession?.id;
                  const isExpiringSoon =
                    session.expiresAt - Date.now() < 2 * 60 * 60 * 1000; // 2 hours

                  return (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`border rounded-xl p-4 transition-all ${
                        isCurrentSession
                          ? "border-dusty-rose-300 bg-dusty-rose-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div
                            className={`p-2 rounded-lg ${
                              isCurrentSession
                                ? "bg-dusty-rose-100 text-dusty-rose-600"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {getDeviceIcon(session.deviceInfo.userAgent)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-source-serif font-medium text-gray-900 truncate">
                                {session.deviceInfo.deviceName}
                              </h3>
                              {isCurrentSession && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-dusty-rose-100 text-dusty-rose-800">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Actual
                                </span>
                              )}
                              {isExpiringSoon && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  Expira pronto
                                </span>
                              )}
                            </div>

                            <div className="space-y-1 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>
                                  Última actividad:{" "}
                                  {formatTimeAgo(
                                    session.deviceInfo.lastActivity,
                                  )}
                                </span>
                              </div>
                              <div>
                                Expira:{" "}
                                {new Date(session.expiresAt).toLocaleDateString(
                                  "es-ES",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {!isCurrentSession && (
                          <button
                            onClick={() => handleLogoutSession(session.id)}
                            disabled={loggingOutSession === session.id}
                            className="ml-3 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Cerrar sesión en este dispositivo"
                          >
                            <LogOut className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {allSessions.length > 1 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <p>¿Ves alguna sesión que no reconoces?</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Cierra todas las sesiones por seguridad
                  </p>
                </div>

                {!showConfirmLogoutAll ? (
                  <button
                    onClick={() => setShowConfirmLogoutAll(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-source-serif font-medium text-sm"
                  >
                    Cerrar todo
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      ¿Estás seguro?
                    </span>
                    <button
                      onClick={() => setShowConfirmLogoutAll(false)}
                      className="px-3 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleLogoutAllDevices}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      Confirmar
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SessionManager;
