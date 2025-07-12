import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import FirebaseTest from "./pages/FirebaseTest";
import ErrorBoundary from "./components/ErrorBoundary";
import { FirebaseProductsProvider } from "./contexts/FirebaseProductsContext";
function App() {
  return (
    <FirebaseProductsProvider>
      <HelmetProvider>
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
                  <Route path="/contact" element={<Contact />} />
                  <Route
                    path="/order-tracking/:orderId?"
                    element={<OrderTracking />}
                  />
                  <Route path="/ui-showcase" element={<UIShowcase />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/firebase-test" element={<FirebaseTest />} />
                  <Route path="/product/:id" element={<Product />} />
                </Routes>
              </ErrorBoundary>
            </main>
            <Footer />
            <FloatingActionButton />
          </div>
        </Router>
      </HelmetProvider>
    </FirebaseProductsProvider>
  );
}

export default App;
