import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  Heart,
} from "lucide-react";

interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info" | "custom";
  title: string;
  message?: string;
  duration?: number;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  persistent?: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  success: (
    title: string,
    message?: string,
    options?: Partial<Notification>,
  ) => string;
  error: (
    title: string,
    message?: string,
    options?: Partial<Notification>,
  ) => string;
  warning: (
    title: string,
    message?: string,
    options?: Partial<Notification>,
  ) => string;
  info: (
    title: string,
    message?: string,
    options?: Partial<Notification>,
  ) => string;
  custom: (
    title: string,
    message?: string,
    icon?: React.ReactNode,
    options?: Partial<Notification>,
  ) => string;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const generateId = () =>
    `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addNotification = useCallback(
    (notification: Omit<Notification, "id">) => {
      const id = generateId();
      const newNotification: Notification = {
        ...notification,
        id,
        duration: notification.duration ?? 5000,
      };

      setNotifications((prev) => [...prev, newNotification]);

      // Auto remove after duration (unless persistent)
      if (
        !newNotification.persistent &&
        newNotification.duration &&
        newNotification.duration > 0
      ) {
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, newNotification.duration);
      }

      return id;
    },
    [],
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const success = useCallback(
    (title: string, message?: string, options?: Partial<Notification>) => {
      return addNotification({
        type: "success",
        title,
        message,
        ...options,
      });
    },
    [addNotification],
  );

  const error = useCallback(
    (title: string, message?: string, options?: Partial<Notification>) => {
      return addNotification({
        type: "error",
        title,
        message,
        duration: 7000, // Errors stay longer
        ...options,
      });
    },
    [addNotification],
  );

  const warning = useCallback(
    (title: string, message?: string, options?: Partial<Notification>) => {
      return addNotification({
        type: "warning",
        title,
        message,
        duration: 6000,
        ...options,
      });
    },
    [addNotification],
  );

  const info = useCallback(
    (title: string, message?: string, options?: Partial<Notification>) => {
      return addNotification({
        type: "info",
        title,
        message,
        ...options,
      });
    },
    [addNotification],
  );

  const custom = useCallback(
    (
      title: string,
      message?: string,
      icon?: React.ReactNode,
      options?: Partial<Notification>,
    ) => {
      return addNotification({
        type: "custom",
        title,
        message,
        icon,
        ...options,
      });
    },
    [addNotification],
  );

  const value: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
    custom,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2 max-w-sm w-full">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={() => removeNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface NotificationItemProps {
  notification: Notification;
  onRemove: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onRemove,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(100);

  const getNotificationConfig = () => {
    switch (notification.type) {
      case "success":
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          colors: "bg-green-50 border-green-200 text-green-800",
          iconColors: "text-green-500",
          progressColor: "bg-green-500",
        };
      case "error":
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          colors: "bg-red-50 border-red-200 text-red-800",
          iconColors: "text-red-500",
          progressColor: "bg-red-500",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          colors: "bg-yellow-50 border-yellow-200 text-yellow-800",
          iconColors: "text-yellow-500",
          progressColor: "bg-yellow-500",
        };
      case "info":
        return {
          icon: <Info className="w-5 h-5" />,
          colors: "bg-blue-50 border-blue-200 text-blue-800",
          iconColors: "text-blue-500",
          progressColor: "bg-blue-500",
        };
      case "custom":
        return {
          icon: notification.icon || <Heart className="w-5 h-5" />,
          colors: "bg-dusty-rose/10 border-dusty-rose/20 text-mocha",
          iconColors: "text-dusty-rose",
          progressColor: "bg-dusty-rose",
        };
      default:
        return {
          icon: <Info className="w-5 h-5" />,
          colors: "bg-gray-50 border-gray-200 text-gray-800",
          iconColors: "text-gray-500",
          progressColor: "bg-gray-500",
        };
    }
  };

  const config = getNotificationConfig();

  // Progress bar animation
  useEffect(() => {
    if (
      !notification.persistent &&
      notification.duration &&
      notification.duration > 0
    ) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const decrement = 100 / (notification.duration! / 50);
          const newProgress = prev - decrement;
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [notification.duration, notification.persistent]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative p-4 rounded-2xl border backdrop-blur-sm shadow-gentle hover:shadow-soft transition-all duration-300 ${config.colors}`}
    >
      {/* Progress bar */}
      {!notification.persistent &&
        notification.duration &&
        notification.duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 rounded-b-2xl overflow-hidden">
            <motion.div
              className={`h-full ${config.progressColor}`}
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        )}

      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className={`flex-shrink-0 ${config.iconColors}`}>
          {config.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium font-cormorant mb-1">
            {notification.title}
          </h4>
          {notification.message && (
            <p className="text-xs opacity-90 font-karla leading-relaxed">
              {notification.message}
            </p>
          )}

          {/* Action button */}
          {notification.action && (
            <button
              onClick={notification.action.onClick}
              className="mt-2 text-xs font-medium underline hover:no-underline transition-all duration-200"
            >
              {notification.action.label}
            </button>
          )}
        </div>

        {/* Close button */}
        <motion.button
          onClick={onRemove}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Hover effect overlay */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

// Convenience hook for common dessert-related notifications
export const useDessertNotifications = () => {
  const notifications = useNotifications();

  const orderSuccess = (dessertName: string) => {
    return notifications.success(
      "¡Pedido Confirmado!",
      `Tu ${dessertName} personalizado está en preparación. Te contactaremos pronto con los detalles.`,
      {
        icon: <Heart className="w-5 h-5" />,
        duration: 8000,
      },
    );
  };

  const orderError = () => {
    return notifications.error(
      "Error en el Pedido",
      "Hubo un problema al procesar tu pedido. Por favor, intenta nuevamente o contáctanos directamente.",
      {
        action: {
          label: "Contactar por WhatsApp",
          onClick: () => {
            const message =
              "Hola, tuve un problema al hacer un pedido en línea. ¿Podrían ayudarme?";
            window.open(
              `https://wa.me/18096581245?text=${encodeURIComponent(message)}`,
              "_blank",
            );
          },
        },
      },
    );
  };

  const formSubmissionSuccess = () => {
    return notifications.success(
      "Mensaje Enviado",
      "Gracias por contactarnos. Te responderemos dentro de 24 horas.",
      {
        icon: <CheckCircle className="w-5 h-5" />,
      },
    );
  };

  const imageLoadError = (imageName: string) => {
    return notifications.warning(
      "Imagen no Disponible",
      `No pudimos cargar la imagen de ${imageName}. Nuestros postres siguen siendo igual de deliciosos.`,
      {
        duration: 4000,
      },
    );
  };

  const seasonalPromotion = (title: string, message: string) => {
    return notifications.custom(title, message, <Heart className="w-5 h-5" />, {
      duration: 10000,
      action: {
        label: "Ver Ofertas",
        onClick: () => (window.location.href = "/menu"),
      },
    });
  };

  const cookieNotice = () => {
    const notificationId = notifications.info(
      "Cookies & Dulces",
      "Usamos cookies para mejorar tu experiencia (¡solo las digitales, las reales las hacemos por pedido!).",
      {
        persistent: true,
        action: {
          label: "Entiendo",
          onClick: () => {
            localStorage.setItem("cookies-accepted", "true");
            notifications.removeNotification(notificationId);
          },
        },
      },
    );
    return notificationId;
  };

  return {
    orderSuccess,
    orderError,
    formSubmissionSuccess,
    imageLoadError,
    seasonalPromotion,
    cookieNotice,
    ...notifications,
  };
};

export default NotificationProvider;
