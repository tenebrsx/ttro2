import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./contexts/CartContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import FloatingActionButton from "./components/ui/FloatingActionButton";
import ScrollManager from "./components/ScrollManager";
import MobileCart from "./components/MobileCart";
import CartButton from "./components/CartButton";
import Home from "./pages/Home";
import SimpleTest from "./pages/SimpleTest";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Test from "./pages/Test";
import OrderTracking from "./pages/OrderTracking";
import UIShowcase from "./pages/UIShowcase";
import Admin from "./pages/Admin";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import ErrorBoundary from "./components/ErrorBoundary";
function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <Router>
          <ScrollManager />
          <div className="min-h-screen">
            <Navigation />
            <main>
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/test" element={<Test />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route
                    path="/order-tracking/:orderId?"
                    element={<OrderTracking />}
                  />
                  <Route path="/ui-showcase" element={<UIShowcase />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                </Routes>
              </ErrorBoundary>
            </main>
            <Footer />
            <FloatingActionButton />
            <MobileCart />
            <CartButton />
          </div>
        </Router>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;
