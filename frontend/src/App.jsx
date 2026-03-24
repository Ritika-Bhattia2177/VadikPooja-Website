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
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function App() {
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

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0) + kitCart.reduce((sum, item) => sum + item.quantity, 0),
    [cart, kitCart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + kitCart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart, kitCart]
  );

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const loadData = async () => {
      try {
        const [prodRes, kitRes, panditRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/kits'),
          fetch('/api/pandits')
        ]);

        const responses = [prodRes, kitRes, panditRes];
        const failed = responses.find((r) => !r.ok);
        if (failed) {
          const body = await failed.text();
          throw new Error(`Request failed ${failed.status} ${failed.url} :: ${body || 'no body'}`);
        }

        const [productsData, kitsData, panditsData] = await Promise.all(responses.map((r) => r.json()));
        setProducts(productsData);
        setKits(kitsData);
        setPandits(panditsData);
      } catch (err) {
        console.error('Failed to load data', err);
      }
    };

    loadData();
  }, []);

  const handleLogin = async (email, pass) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    });
    const data = await res.json();
    if (!res.ok || data.error) throw new Error(data.error || 'Login failed');
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
  };

  const handleRegister = async (name, email, pass) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password: pass })
    });
    const data = await res.json();
    if (!res.ok || data.error) throw new Error(data.error || 'Registration failed');
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const bumpItem = (setter, entity) => {
    setter(prev => {
      const entityId = entity._id || entity.id;
      const existing = prev.find(item => (item._id || item.id) === entityId);
      if (existing) {
        return prev.map(item => (item._id || item.id) === entityId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...entity, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const addToCart = (product) => bumpItem(setCart, product);
  const addKitToCart = (kit) => bumpItem(setKitCart, kit);

  const updateQuantity = (setter) => (id, delta) => {
    setter(prev => prev
      .map(item => {
        if ((item._id || item.id) === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter(item => item.quantity > 0)
    );
  };

  const updateCartQuantity = updateQuantity(setCart);
  const updateKitQuantity = updateQuantity(setKitCart);

  const handleCheckout = async () => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, items: [...cart, ...kitCart], totalPrice: cartTotal })
    });
    if (res.ok) {
      alert('Order placed successfully!');
      setCart([]);
      setKitCart([]);
      setIsCartOpen(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    const formData = new FormData(e.currentTarget);
    const bookingData = {
      userId: user.id,
      panditId: bookingPandit?.id,
      poojaType: formData.get('poojaType'),
      date: formData.get('date'),
      location: formData.get('location')
    };
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    if (res.ok) {
      alert('Pandit booked successfully!');
      setBookingPandit(null);
    }
  };

  const goTo = (path) => {
    const clean = (path || '').replace(/^\//, '');
    const target = !clean || clean === 'home' ? '/' : `/${clean}`;
    navigate(target);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF5] font-sans text-gray-900">
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
        onLogout={handleLogout}
        onNavigate={goTo}
      />

      <main className="flex-1">
        <Routes>
          <Route 
            path="/" 
            element={<HomePage products={products} onAddToCart={addToCart} onNavigate={goTo} />} 
          />
          <Route path="/items" element={<ItemsPage products={products} onAddToCart={addToCart} />} />
          <Route path="/kits" element={<KitsPage kits={kits} onAddToCart={addKitToCart} />} />
          <Route path="/pandits" element={<PanditsPage pandits={pandits} onBook={setBookingPandit} />} />
          <Route path="/horoscope" element={<HoroscopePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        kitItems={kitCart}
        onUpdateQuantity={updateCartQuantity}
        onUpdateKitQuantity={updateKitQuantity}
        onRemove={(id) => {
          const existing = cart.find(i => (i._id || i.id) === id);
          if (existing) {
            updateCartQuantity(id, -existing.quantity);
          }
        }}
        onRemoveKit={(id) => {
          const existing = kitCart.find(i => (i._id || i.id) === id);
          if (existing) {
            updateKitQuantity(id, -existing.quantity);
          }
        }}
        onCheckout={handleCheckout}
        onStartShopping={() => {
          setIsCartOpen(false);
          navigate('/items');
        }}
      />

      <Auth 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      {/* Booking Modal */}
      {bookingPandit && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setBookingPandit(null)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-4xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            <div className="bg-[#FF6F00] p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Book {bookingPandit.name}</h3>
              <p className="opacity-80">Fill in the details for your pooja</p>
            </div>
            <form onSubmit={handleBooking} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Pooja Type</label>
                <select name="poojaType" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#FF6F00]">
                  <option>Satyanarayan Pooja</option>
                  <option>Griha Pravesh</option>
                  <option>Lakshmi Pooja</option>
                  <option>Ganesh Pooja</option>
                  <option>Mundan Ceremony</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                  <input type="date" name="date" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#FF6F00]" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                  <input type="text" name="location" placeholder="City Area" required className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-[#FF6F00]" />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setBookingPandit(null)} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-[#FF6F00] hover:bg-[#FF9933] text-white rounded-xl font-bold transition-colors shadow-lg shadow-orange-100">Confirm Booking</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
