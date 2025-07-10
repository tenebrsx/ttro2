import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, Heart } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'custom';
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
  persistent?: boolean;
}

interface NotificationSystemProps {
  notifications: Notification[];
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  maxNotifications?: number;
}

interface UseNotificationsReturn {
  notifications: Notification[];
  addNotification: (message: string, type?: Notification['type'], options?: Partial<Notification>) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

export const useNotifications = (): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (
    message: string,
    type: Notification['type'] = 'info',
    options: Partial<Notification> = {}
  ) => {
    const id = Date.now().toString();
    const notification: Notification = {
      id,
      type,
      message,
      duration: 5000,
      ...options,
    };

    setNotifications(prev => [...prev, notification]);

    // Auto-remove notification after duration (unless persistent)
    if (!notification.persistent) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
  };
};

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-5 h-5" />;
    case 'error':
      return <AlertCircle className="w-5 h-5" />;
    case 'warning':
      return <AlertTriangle className="w-5 h-5" />;
    case 'info':
      return <Info className="w-5 h-5" />;
    default:
      return <Heart className="w-5 h-5" />;
  }
};

const getNotificationColors = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return 'bg-green-50 border-green-200 text-green-800';
    case 'error':
      return 'bg-red-50 border-red-200 text-red-800';
    case 'warning':
      return 'bg-orange-50 border-orange-200 text-orange-800';
    case 'info':
      return 'bg-blue-50 border-blue-200 text-blue-800';
    default:
      return 'bg-sage/10 border-sage/20 text-sage';
  }
};

const getIconColors = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return 'text-green-600';
    case 'error':
      return 'text-red-600';
    case 'warning':
      return 'text-orange-600';
    case 'info':
      return 'text-blue-600';
    default:
      return 'text-sage';
  }
};

const getPositionClasses = (position: string) => {
  switch (position) {
    case 'top-left':
      return 'top-4 left-4';
    case 'top-center':
      return 'top-4 left-1/2 transform -translate-x-1/2';
    case 'top-right':
      return 'top-4 right-4';
    case 'bottom-left':
      return 'bottom-4 left-4';
    case 'bottom-center':
      return 'bottom-4 left-1/2 transform -translate-x-1/2';
    case 'bottom-right':
      return 'bottom-4 right-4';
    default:
      return 'top-4 right-4';
  }
};

export const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notifications,
  position = 'top-right',
  maxNotifications = 5
}) => {
  const visibleNotifications = notifications.slice(-maxNotifications);

  return (
    <div className={`fixed z-50 ${getPositionClasses(position)} pointer-events-none`}>
      <div className="space-y-3 w-96 max-w-[calc(100vw-2rem)]">
        <AnimatePresence>
          {visibleNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRemove={() => {}}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

interface NotificationItemProps {
  notification: Notification;
  onRemove: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onRemove
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!notification.persistent && notification.duration) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - (100 / (notification.duration! / 100));
          if (newProgress <= 0) {
            clearInterval(interval);
            return 0;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [notification.duration, notification.persistent]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.5 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="pointer-events-auto"
    >
      <div className={`
        relative overflow-hidden rounded-lg border shadow-lg backdrop-blur-sm
        ${getNotificationColors(notification.type)}
      `}>
        {/* Progress bar */}
        {!notification.persistent && (
          <div className="absolute bottom-0 left-0 h-1 bg-black/10">
            <motion.div
              className="h-full bg-current opacity-60"
              initial={{ width: '100%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>
        )}

        <div className="p-4">
          <div className="flex items-start space-x-3">
            {/* Icon */}
            <div className={`flex-shrink-0 ${getIconColors(notification.type)}`}>
              {notification.icon || getNotificationIcon(notification.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {notification.title && (
                <p className="text-sm font-semibold">
                  {notification.title}
                </p>
              )}
              <p className={`text-sm ${notification.title ? 'mt-1' : ''}`}>
                {notification.message}
              </p>

              {/* Action button */}
              {notification.action && (
                <button
                  onClick={notification.action.onClick}
                  className="mt-2 text-sm font-medium underline hover:no-underline transition-all duration-200"
                >
                  {notification.action.label}
                </button>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={() => onRemove(notification.id)}
              className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Toast-style notification hook
export const useToast = () => {
  const { addNotification } = useNotifications();

  const toast = {
    success: (message: string, options?: Partial<Notification>) =>
      addNotification(message, 'success', options),
    error: (message: string, options?: Partial<Notification>) =>
      addNotification(message, 'error', options),
    warning: (message: string, options?: Partial<Notification>) =>
      addNotification(message, 'warning', options),
    info: (message: string, options?: Partial<Notification>) =>
      addNotification(message, 'info', options),
    custom: (message: string, options?: Partial<Notification>) =>
      addNotification(message, 'custom', options),
  };

  return toast;
};

export default NotificationSystem;
