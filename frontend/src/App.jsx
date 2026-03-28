import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Auth from './components/Auth';
import HomePage from './pages/Home.jsx';
import ItemsPage from './pages/Items.jsx';
import KitsPage from './pages/Kits.jsx';
import PanditsPage from './pages/Pandits.jsx';
import ContactPage from './pages/Contact.jsx';
import HoroscopePage from './pages/Horoscope.jsx';
import PanchangPage from './pages/Panchang.jsx';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

export default function App() {

  // ✅ FIXED API (IMPORTANT)
  const API = import.meta.env.VITE_API_URL || "https://api.vaidikpooja.in";

  console.log("✅ API VALUE:", API);

  const [products, setProducts] = useState([]);
  const [kits, setKits] = useState([]);
  const [pandits, setPandits] = useState([]);
  const [cart, setCart] = useState([]);
  const [kitCart, setKitCart] = useState([]);
  const [user, setUser] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [bookingPandit, setBookingPandit] = useState(null);

  const navigate = useNavigate();

  // ✅ CART COUNT
  const cartCount = useMemo(
    () =>
      cart.reduce((sum, item) => sum + item.quantity, 0) +
      kitCart.reduce((sum, item) => sum + item.quantity, 0),
    [cart, kitCart]
  );

  // ✅ TOTAL PRICE
  const cartTotal = useMemo(
    () =>
      cart.reduce((sum, item) => sum + item.price * item.quantity, 0) +
      kitCart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart, kitCart]
  );

  // ✅ LOAD DATA (SAFE VERSION)
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("📡 Fetching from:", API);

        const prodRes = await fetch(`${API}/api/products`);
        const kitRes = await fetch(`${API}/api/kits`);
        const panditRes = await fetch(`${API}/api/pandits`);

        const productsData = prodRes.ok ? await prodRes.json() : [];
        const kitsData = kitRes.ok ? await kitRes.json() : [];
        const panditsData = panditRes.ok ? await panditRes.json() : [];

        console.log("PRODUCTS:", productsData);
        console.log("KITS:", kitsData);
        console.log("PANDITS:", panditsData);

        setProducts(productsData);
        setKits(kitsData);
        setPandits(panditsData);

      } catch (err) {
        console.error('❌ Failed to load data:', err);
      }
    };

    loadData();
  }, [API]);

  // ✅ ADD TO CART
  const addToCart = (product) => {
    setCart(prev => [...prev, { ...product, quantity: 1 }]);
    setIsCartOpen(true);
  };

  const addKitToCart = (kit) => {
    setKitCart(prev => [...prev, { ...kit, quantity: 1 }]);
    setIsCartOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      <Routes>
        <Route path="/" element={<HomePage products={products} onAddToCart={addToCart} />} />
        <Route path="/items" element={<ItemsPage products={products} onAddToCart={addToCart} />} />
        <Route path="/kits" element={<KitsPage kits={kits} onAddToCart={addKitToCart} />} />
        <Route path="/pandits" element={<PanditsPage pandits={pandits} />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/horoscope" element={<HoroscopePage />} />
        <Route path="/panchang" element={<PanchangPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </div>
  );
}