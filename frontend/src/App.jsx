import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Auth from './components/Auth';
import HomePage from './pages/Home.jsx';
import ItemsPage from './pages/Items.jsx';
import KitsPage from './pages/Kits.jsx';
import PoojaList from './pages/PoojaList.jsx';
import PoojaDetails from './pages/PoojaDetails.jsx';
import PanditsPage from './pages/Pandits.jsx';
import ContactPage from './pages/Contact.jsx';
import HoroscopePage from './pages/Horoscope.jsx';
import PanchangPage from './pages/Panchang.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
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

  // load user from localStorage if present
  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) setUser(JSON.parse(raw));
    } catch (err) {
      // ignore parse errors
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleLogin = async (email, password) => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      throw new Error(e.message || 'Login failed');
    }
    const data = await res.json();
    localStorage.setItem('user', JSON.stringify(data.user || data));
    setUser(data.user || data);
  };

  const handleRegister = async (name, email, password) => {
    const res = await fetch(`${API}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      throw new Error(e.message || 'Registration failed');
    }
    const data = await res.json();
    localStorage.setItem('user', JSON.stringify(data.user || data));
    setUser(data.user || data);
  };

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
    setCart(prev => {
      const id = product._id || product.id;
      const found = prev.find(p => (p._id || p.id) === id);
      if (found) {
        return prev.map(p => ( (p._id || p.id) === id ? { ...p, quantity: p.quantity + 1 } : p ));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const addKitToCart = (kit) => {
    setKitCart(prev => {
      const id = kit._id || kit.id;
      const found = prev.find(k => (k._id || k.id) === id);
      if (found) {
        return prev.map(k => ((k._id || k.id) === id ? { ...k, quantity: k.quantity + 1 } : k));
      }
      return [...prev, { ...kit, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Cart handlers
  const updateQuantity = (itemId, delta) => {
    setCart(prev => prev.map(item => {
      const id = item._id || item.id;
      if (id !== itemId) return item;
      const next = item.quantity + delta;
      return { ...item, quantity: Math.max(0, next) };
    }).filter(i => i.quantity > 0));
  };

  const updateKitQuantity = (kitId, delta) => {
    setKitCart(prev => prev.map(item => {
      const id = item._id || item.id;
      if (id !== kitId) return item;
      const next = item.quantity + delta;
      return { ...item, quantity: Math.max(0, next) };
    }).filter(i => i.quantity > 0));
  };

  const removeItem = (itemId) => {
    setCart(prev => prev.filter(item => (item._id || item.id) !== itemId));
  };

  const removeKit = (kitId) => {
    setKitCart(prev => prev.filter(item => (item._id || item.id) !== kitId));
  };

  const handleCheckout = async () => {
    // ensure user logged in
    if (!user) {
      // prompt user to login
      setIsCartOpen(false);
      setIsAuthOpen(true);
      return;
    }

    const itemsToOrder = cart.map(i => ({ id: i._id || i.id, name: i.name, price: i.price, quantity: i.quantity }));
    const kitsToOrder = kitCart.map(k => ({ id: k._id || k.id, name: k.name, price: k.price, quantity: k.quantity }));
    const allItems = [...itemsToOrder, ...kitsToOrder];
    const totalPrice = allItems.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0);

    try {
      const res = await fetch(`${API}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id || user._id || user.userId || user.id, items: allItems, totalPrice })
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || body.message || 'Failed to place order');
      }
      const data = await res.json();
      // clear carts
      setCart([]);
      setKitCart([]);
      setIsCartOpen(false);
      window.alert('Order placed successfully! Order ID: ' + (data.id || 'N/A'));
    } catch (err) {
      console.error('Checkout error:', err);
      window.alert('Failed to place order: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const startShopping = () => {
    setIsCartOpen(false);
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
        onLogout={handleLogout}
        onNavigate={(path) => {
          if (path === 'home') return navigate('/');
          navigate(path === 'home' ? '/' : `/${path}`);
        }}
      />
      
      <Auth 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLogin={handleLogin} 
        onRegister={handleRegister} 
      />

      <Routes>
        <Route path="/" element={<HomePage products={products} onAddToCart={addToCart} onNavigate={(path) => { if (path === 'home') return navigate('/'); navigate(path === 'home' ? '/' : `/${path}`); }} />} />
        <Route path="/items" element={<ItemsPage products={products} onAddToCart={addToCart} />} />
        <Route path="/kits" element={<KitsPage kits={kits} onAddToCart={addKitToCart} />} />
        <Route path="/pandits" element={<PanditsPage pandits={pandits} />} />
        <Route path="/poojas" element={<PoojaList />} />
        <Route path="/pooja/:id" element={<PoojaDetails />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/horoscope" element={<HoroscopePage />} />
        <Route path="/panchang" element={<PanchangPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        kitItems={kitCart}
        onUpdateQuantity={updateQuantity}
        onUpdateKitQuantity={updateKitQuantity}
        onRemove={removeItem}
        onRemoveKit={removeKit}
        onCheckout={handleCheckout}
        onStartShopping={startShopping}
      />

      <Footer />
      <WhatsAppButton />
    </div>
  );
}