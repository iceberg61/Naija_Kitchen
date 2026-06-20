import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import About from "./components/About";
import Card from "./components/Card";
import ReviewSection from "./components/ReviewSection";
import Order from "./components/Order";
import MenuPage from "./pages/MenuPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import CateringPage from "./pages/CateringPage";
import ReservationPage from "./pages/ReservationPage";
import AboutPage from "./pages/AboutPage";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Card />
      <ReviewSection />
      <Order />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"               element={<Home />} />
          <Route path="/menu"           element={<MenuPage />} />
          <Route path="/checkout"       element={<CheckoutPage />} />
          <Route path="/order-tracking" element={<OrderTrackingPage />} />
          <Route path="/catering"       element={<CateringPage />} />
          <Route path="/reservation"    element={<ReservationPage />} />
          <Route path="/about"          element={<AboutPage />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;