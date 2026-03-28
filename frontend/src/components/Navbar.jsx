import React from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ cartCount, onOpenCart, onOpenAuth, user, onLogout, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleNavClick = (path) => {
    onNavigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md bg-[#FF9933] border-white/10 py-3 md:py-4 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo Section - Minimalist */}
          <Link 
            className="flex items-center cursor-pointer group" 
            to="/"
            onClick={() => handleNavClick('home')}
          >
            <div className="relative">
              <div className="w-12 h-12 border-2 border-[#FF6F00] rounded-full flex items-center justify-center mr-3 overflow-hidden bg-transparent">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif tracking-[0.2em] uppercase text-white leading-none">Vaidik</span>
              <span className="text-[10px] tracking-[0.4em] uppercase font-bold mt-1">Pooja</span>
            </div>
          </Link>

          {/* Navigation Links - Editorial Style */}
          <div className="hidden lg:flex items-center space-x-14 ml-10">
            {[
              { name: 'Home', path: 'home' },
              { name: 'Pooja Items', path: 'items' },
              { name: 'Pooja Kits', path: 'kits' },
              { name: 'Booking Pandit Ji', path: 'pandits' },
              { name: 'Horoscope', path: 'horoscope' },
              { name: 'Panchang', path: 'panchang' },
              { name: 'Contact', path: 'contact' },
            ].map((link) => (
              <Link 
                key={link.path}
                to={link.path === 'home' ? '/' : `/${link.path}`} 
                onClick={() => handleNavClick(link.path)} 
                className="relative text-[11px] uppercase tracking-[0.3em] font-bold text-white/70 hover:text-[#FF9933] transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-[#FF9933] transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Action Icons - Clean Utility */}
          <div className="flex items-center space-x-7">
            
            {user ? (
              <div className="relative group flex items-center">
                <div className="flex items-center space-x-2 p-2 text-white/80 cursor-pointer">
                  <div className="w-8 h-8 rounded-full border border-[#FF9933]/50 bg-[#FF6F00] flex items-center justify-center text-white font-bold text-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </div>
                <div className="absolute top-full right-0 mt-2 py-2 w-32 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="flex items-center space-x-3 p-2 text-white/50 hover:text-[#FF9933] transition-colors group"
              >
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#FF9933]/50 transition-colors">
                  <User size={16} />
                </div>
              </button>
            )}

            <button 
              onClick={onOpenCart}
              className="relative p-2 text-white/50 hover:text-[#FF9933] transition-colors group"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6F00] text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              className="lg:hidden p-2 text-white/50 hover:text-[#FF9933]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Immersive Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#0a0502] z-60 lg:hidden flex flex-col justify-center items-center"
        >
          <button 
            className="absolute top-8 right-8 p-4 text-white/50 hover:text-[#FF9933]"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={32} />
          </button>
          
          <div className="flex flex-col items-center space-y-8">
            {[
              { name: 'Home', path: 'home' },
              { name: 'Pooja Items', path: 'items' },
              { name: 'Pooja Kits', path: 'kits' },
              { name: 'Booking Pandit Ji', path: 'pandits' },
              { name: 'Horoscope', path: 'horoscope' },
              { name: 'Panchang', path: 'panchang' },
              { name: 'Contact', path: 'contact' },
            ].map((link) => (
              <div 
                key={link.path}
                className="text-4xl font-serif italic text-white hover:text-[#FF9933] transition-colors"
              >
                <Link 
                  to={link.path === 'home' ? '/' : `/${link.path}`} 
                  onClick={() => handleNavClick(link.path)}
                  className="block"
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="absolute bottom-12 flex space-x-8 text-white/30 text-[10px] uppercase tracking-[0.4em]">
            <span>Instagram</span>
            <span>Facebook</span>
            <span>Twitter</span>
          </div>
        </div>
      )}
    </nav>
  );
}
