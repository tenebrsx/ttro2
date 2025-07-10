import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Star,
  Search,
  Calendar,
  Camera,
  Package,
  Heart,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import { ImageLightbox, useLightbox } from "../components/ui/ImageLightbox";
import { OrderTracker } from "../components/ui/OrderTracker";
import { SeasonalMenu } from "../components/ui/SeasonalMenu";
import { SmartSearch } from "../components/ui/SmartSearch";
import {
  CustomerPhotoShowcase,
  useCustomerPhotoShowcase,
} from "../components/ui/CustomerPhotoShowcase";
import { FloatingActionButton } from "../components/ui/FloatingActionButton";
import {
  NotificationSystem,
  useNotifications,
} from "../components/ui/NotificationSystem";
import { SkeletonLoader } from "../components/ui/SkeletonLoader";
import DessertCustomizer from "../components/DessertCustomizer";

const UIShowcase = () => {
  const [activeComponent, setActiveComponent] = useState("overview");
  const [loading, setLoading] = useState(false);

  const { notifications, addNotification } = useNotifications();
  const { photos } = useCustomerPhotoShowcase();

  // Mock data for lightbox
  const lightboxImages = [
    {
      src: "/api/placeholder/600/400",
      alt: "Delicious chocolate cake",
      title: "Chocolate Premium Cake",
      description: "Rich and decadent chocolate cake with premium ingredients",
      tags: ["chocolate", "premium", "cake"],
      likes: 127,
      comments: 23,
    },
    {
      src: "/api/placeholder/600/400",
      alt: "Colorful macarons",
      title: "French Macarons Collection",
      description: "Hand-crafted French macarons in assorted flavors",
      tags: ["macarons", "french", "colorful"],
      likes: 89,
      comments: 15,
    },
    {
      src: "/api/placeholder/600/400",
      alt: "Wedding cake",
      title: "Elegant Wedding Cake",
      description: "Multi-tier wedding cake with fresh flowers",
      tags: ["wedding", "elegant", "flowers"],
      likes: 234,
      comments: 45,
    },
  ];

  const {
    isOpen,
    currentIndex,
    openLightbox,
    closeLightbox,
    goToNext,
    goToPrevious,
  } = useLightbox(lightboxImages);

  const components = [
    {
      id: "overview",
      name: "Overview",
      icon: <Sparkles className="w-5 h-5" />,
      description: "Comprehensive UI component showcase",
    },
    {
      id: "lightbox",
      name: "Image Lightbox",
      icon: <Camera className="w-5 h-5" />,
      description:
        "Advanced image gallery with zoom, share, and social features",
    },
    {
      id: "order-tracker",
      name: "Order Tracking",
      icon: <Package className="w-5 h-5" />,
      description: "Real-time order status tracking with progress timeline",
    },
    {
      id: "seasonal-menu",
      name: "Seasonal Menu",
      icon: <Calendar className="w-5 h-5" />,
      description: "Dynamic seasonal menu with availability tracking",
    },
    {
      id: "smart-search",
      name: "Smart Search",
      icon: <Search className="w-5 h-5" />,
      description: "Intelligent search with filters and suggestions",
    },
    {
      id: "customer-photos",
      name: "Customer Gallery",
      icon: <Heart className="w-5 h-5" />,
      description: "User-generated content showcase with social features",
    },
    {
      id: "interactive-elements",
      name: "Interactive Elements",
      icon: <Star className="w-5 h-5" />,
      description: "Floating buttons, notifications, and animations",
    },
  ];

  const handleSearchResult = (query: string) => {
    addNotification(`Searching for: ${query}`, "info");
  };

  const handleNotificationTest = (
    type: "success" | "error" | "warning" | "info",
  ) => {
    const messages = {
      success: "¡Pedido confirmado exitosamente!",
      error: "Error al procesar el pedido",
      warning: "Tu pedido se entregará con 15 minutos de retraso",
      info: "Nueva actualización disponible",
    };
    addNotification(messages[type], type);
  };

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <PageTransition>
      <div className="pt-16 min-h-screen bg-gray-50">
        {/* Header */}
        <section className="py-12 bg-gradient-to-br from-sage to-sage/80 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                UI Components Showcase
              </h1>
              <p className="text-xl text-sage-100 max-w-3xl mx-auto">
                Explore our advanced UI components designed to enhance the user
                experience with modern interactions, animations, and
                functionality.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto py-4 space-x-2">
              {components.map((component) => (
                <button
                  key={component.id}
                  onClick={() => setActiveComponent(component.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-300 ${
                    activeComponent === component.id
                      ? "bg-sage text-white shadow-warm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {component.icon}
                  <span className="text-sm font-medium">{component.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Overview */}
            {activeComponent === "overview" && (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Advanced UI Components
                  </h2>
                  <p className="text-gray-600 max-w-3xl mx-auto">
                    Our collection of modern, interactive components designed to
                    create engaging user experiences in the pastry business
                    website.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {components.slice(1).map((component) => (
                    <motion.div
                      key={component.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer"
                      onClick={() => setActiveComponent(component.id)}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 bg-sage/10 rounded-lg text-sage">
                          {component.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {component.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {component.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Image Lightbox */}
            {activeComponent === "lightbox" && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Advanced Image Lightbox
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Click on any image to experience the full-featured lightbox
                    with zoom, navigation, social sharing, and more.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {lightboxImages.map((image, index) => (
                    <div
                      key={index}
                      className="cursor-pointer group"
                      onClick={() => openLightbox(index)}
                    >
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-white text-center">
                            <Camera className="w-8 h-8 mx-auto mb-2" />
                            <p className="text-sm">Click to view</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h3 className="font-semibold text-gray-900">
                          {image.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {image.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <ImageLightbox
                  images={lightboxImages}
                  currentIndex={currentIndex}
                  isOpen={isOpen}
                  onClose={closeLightbox}
                  onNext={goToNext}
                  onPrevious={goToPrevious}
                  showSocialActions={true}
                  showThumbnails={true}
                />
              </div>
            )}

            {/* Order Tracker */}
            {activeComponent === "order-tracker" && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Real-time Order Tracking
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Track order progress from preparation to delivery with
                    real-time updates.
                  </p>
                </div>

                <OrderTracker
                  orderId="demo-order-123"
                  showEstimates={true}
                  showCustomerInfo={true}
                  allowFeedback={true}
                />
              </div>
            )}

            {/* Seasonal Menu */}
            {activeComponent === "seasonal-menu" && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Seasonal Menu System
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Dynamic menu that changes with seasons, showing availability
                    and allowing pre-orders.
                  </p>
                </div>

                <SeasonalMenu
                  showOnlyCurrentSeason={false}
                  allowPreOrders={true}
                  showAvailabilityDates={true}
                  enableFilters={true}
                  maxItemsToShow={6}
                />
              </div>
            )}

            {/* Smart Search */}
            {activeComponent === "smart-search" && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Intelligent Search System
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Advanced search with suggestions, filters, and real-time
                    results.
                  </p>
                </div>

                <div className="max-w-4xl mx-auto">
                  <SmartSearch
                    placeholder="Search desserts, flavors, ingredients..."
                    onSearch={handleSearchResult}
                    showFilters={true}
                    showSuggestions={true}
                    maxResults={5}
                  />
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Features:
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Real-time search suggestions</li>
                    <li>• Advanced filtering options</li>
                    <li>• Search history and favorites</li>
                    <li>• Keyboard navigation support</li>
                    <li>• Category and dietary filters</li>
                    <li>• Price range and rating filters</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Customer Photos */}
            {activeComponent === "customer-photos" && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Customer Photo Gallery
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Instagram-style gallery showcasing customer photos with
                    social features.
                  </p>
                </div>

                <CustomerPhotoShowcase
                  photos={photos}
                  showFilters={true}
                  showLightbox={true}
                  columnsDesktop={3}
                  columnsTablet={2}
                  columnsMobile={1}
                  maxPhotosToShow={9}
                  showSocialHandles={true}
                  allowReporting={true}
                />
              </div>
            )}

            {/* Interactive Elements */}
            {activeComponent === "interactive-elements" && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Interactive Elements
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Floating action buttons, notifications, loading states, and
                    more.
                  </p>
                </div>

                {/* Notification System Demo */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Notification System
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleNotificationTest("success")}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Success Notification
                    </button>
                    <button
                      onClick={() => handleNotificationTest("error")}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Error Notification
                    </button>
                    <button
                      onClick={() => handleNotificationTest("warning")}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Warning Notification
                    </button>
                    <button
                      onClick={() => handleNotificationTest("info")}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Info Notification
                    </button>
                  </div>
                </div>

                {/* Loading States Demo */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Loading States
                  </h3>
                  <button
                    onClick={handleLoadingDemo}
                    className="bg-sage text-white px-4 py-2 rounded-lg hover:bg-sage/90 transition-colors mb-4"
                  >
                    Demo Loading State
                  </button>

                  {loading ? (
                    <div className="space-y-4">
                      <SkeletonLoader type="card" count={2} />
                      <SkeletonLoader type="text" count={3} />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Sample Content
                        </h4>
                        <p className="text-gray-600">
                          This content appears after loading is complete. The
                          skeleton loader provides a smooth transition and
                          better perceived performance.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dessert Customizer Demo */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Interactive Dessert Customizer
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Step-by-step dessert customization with real-time price
                    calculation.
                  </p>
                  <DessertCustomizer onClose={() => {}} />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Floating Action Button */}
        <FloatingActionButton />

        {/* Notification System */}
        <NotificationSystem notifications={notifications} />
      </div>
    </PageTransition>
  );
};

export default UIShowcase;
