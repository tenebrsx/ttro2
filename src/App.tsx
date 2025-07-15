import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import FloatingActionButton from "./components/ui/FloatingActionButton";
import ScrollManager from "./components/ScrollManager";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import OrderTracking from "./pages/OrderTracking";
import Admin from "./pages/AdminNew";
import Product from "./pages/Product";
import ImageCompressionTest from "./pages/ImageCompressionTest";
import MobileAnimationTest from "./pages/MobileAnimationTest";
import ErrorBoundary from "./components/ErrorBoundary";
import { FirebaseProductsProvider } from "./contexts/FirebaseProductsContext";
import { initializeMobileOptimizations } from "./utils/mobileDetection";

function AppContent() {
  const location = useLocation();

  // Initialize mobile optimizations
  useEffect(() => {
    const initMobile = async () => {
      try {
        await initializeMobileOptimizations();
        console.log("🎯 Mobile optimizations initialized");
      } catch (error) {
        console.warn("⚠️ Mobile optimization initialization failed:", error);
      }
    };

    initMobile();
  }, []);
  const isAdminPage = location.pathname === "/admin";

  return (
    <div className="min-h-screen">
      {!isAdminPage && <Navigation />}
      <main>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/order-tracking/:orderId?"
              element={<OrderTracking />}
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/image-test" element={<ImageCompressionTest />} />
            <Route path="/mobile-test" element={<MobileAnimationTest />} />
          </Routes>
        </ErrorBoundary>
      </main>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <FloatingActionButton />}
    </div>
  );
}

function App() {
  return (
    <FirebaseProductsProvider>
      <HelmetProvider>
        <Router>
          <ScrollManager />
          <AppContent />
        </Router>
      </HelmetProvider>
    </FirebaseProductsProvider>
  );
}

export default App;
