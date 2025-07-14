import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import FloatingActionButton from "./components/ui/FloatingActionButton";
import ScrollManager from "./components/ScrollManager";
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Test from "./pages/Test";
import OrderTracking from "./pages/OrderTracking";
import UIShowcase from "./pages/UIShowcase";
import Admin from "./pages/Admin";
import Product from "./pages/Product";
import ProductDebug from "./pages/ProductDebug";
import FirebaseTest from "./pages/FirebaseTest";
import FirebaseConnectionTest from "./pages/FirebaseConnectionTest";
import ErrorBoundary from "./components/ErrorBoundary";
import { FirebaseProductsProvider } from "./contexts/FirebaseProductsContext";

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  return (
    <div className="min-h-screen">
      {!isAdminPage && <Navigation />}
      <main>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/order-tracking/:orderId?"
              element={<OrderTracking />}
            />
            <Route path="/ui-showcase" element={<UIShowcase />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/firebase-test" element={<FirebaseTest />} />
            <Route
              path="/firebase-connection-test"
              element={<FirebaseConnectionTest />}
            />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/product-debug/:testId?" element={<ProductDebug />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
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
