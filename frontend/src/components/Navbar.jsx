import React from 'react';
import { ShoppingCart, User, X, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { name: 'Home', path: 'home' },
  { name: 'Poojas', path: 'poojas' },
  { name: 'Pooja Items', path: 'items' },
  { name: 'Pooja Kits', path: 'kits' },
  { name: 'Booking Pandit Ji', path: 'pandits' },
  { name: 'Horoscope', path: 'horoscope' },
  { name: 'Panchang', path: 'panchang' },
  { name: 'Contact', path: 'contact' },
];

export default function Navbar({ cartCount, onOpenCart, onOpenAuth, user, onLogout, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Lock body scroll when drawer is open
  React.useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const handleNavClick = (path) => {
    onNavigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md bg-[#EC8E15] border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-17">

            {/* ── Logo ── */}
            <Link
              to="/"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 sm:gap-3 shrink-0 group"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-[#FF6F00] overflow-hidden bg-transparent shrink-0">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base sm:text-lg lg:text-xl font-serif tracking-[0.18em] uppercase text-white whitespace-nowrap">
                  Vaidik
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.35em] uppercase font-bold text-white/80 mt-0.5 whitespace-nowrap">
                  Pooja
                </span>
              </div>
            </Link>

            {/* ── Desktop nav links ── */}
            {/* Hidden until xl so links don't crowd at lg */}
            <div className="hidden xl:flex items-center gap-8 2xl:gap-10 mx-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path === 'home' ? '/' : `/${link.path}`}
                  onClick={() => handleNavClick(link.path)}
                  className="relative text-[10px] 2xl:text-[11px] uppercase tracking-[0.28em] font-bold text-white/70 hover:text-[#FF9933] transition-colors group whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-[#FF9933] transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* ── Action icons ── */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* User */}
              {user ? (
                <div className="relative group">
                  <button className="flex items-center p-1.5 sm:p-2 text-white/80 cursor-pointer">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#FF9933]/50 bg-[#FF6F00] flex items-center justify-center text-white font-bold text-xs">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  </button>
                  <div className="absolute top-full right-0 mt-2 py-2 w-32 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="p-1.5 sm:p-2 text-white/50 hover:text-[#FF9933] transition-colors group"
                  aria-label="Sign in"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#FF9933]/50 transition-colors">
                    <User size={15} />
                  </div>
                </button>
              )}

              {/* Cart */}
              <button
                onClick={onOpenCart}
                className="relative p-1.5 sm:p-2 text-white/50 hover:text-[#FF9933] transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart size={17} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#FF6F00] text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Hamburger – shown below xl */}
              <button
                className="xl:hidden p-1.5 sm:p-2 ml-0.5 text-[#FF6F00] hover:text-[#FF9933] bg-white rounded-full border border-[#FF6F00]/30 shadow focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile / Tablet drawer ── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-100 xl:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
        style={{ background: 'rgba(0,0,0,0.45)' }}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full z-110 xl:hidden flex flex-col bg-[#FFF5EB] shadow-2xl rounded-l-2xl transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: 'min(82vw, 320px)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-end px-5 pt-5 pb-4 border-b border-[#FF9933]/20">
          <button
            className="p-1.5 rounded-full bg-[#EC8E15]/10 hover:bg-[#EC8E15]/20 text-[#EC8E15] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="space-y-1">
            {NAV_LINKS.map((link, i) => (
              <li key={link.path}>
                <Link
                  to={link.path === 'home' ? '/' : `/${link.path}`}
                  onClick={() => handleNavClick(link.path)}
                  className="flex items-center w-full px-3 py-3 rounded-xl text-[1.05rem] font-semibold text-gray-800 hover:text-[#EC8E15] hover:bg-[#EC8E15]/8 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EC8E15]/40 mr-3 shrink-0" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer footer */}
        <div className="px-5 py-5 border-t border-[#FF9933]/20">
          {user ? (
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                <div className="w-8 h-8 rounded-full bg-[#FF6F00] flex items-center justify-center text-white font-bold text-xs">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="truncate max-w-30">{user.name || 'Account'}</span>
              </div>
              <button
                onClick={() => { onLogout(); setIsMenuOpen(false); }}
                className="text-xs text-red-500 hover:text-red-700 font-semibold px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => { onOpenAuth(); setIsMenuOpen(false); }}
              className="w-full mb-4 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#EC8E15] text-white text-sm font-semibold tracking-wide hover:bg-[#FF6F00] transition-colors"
            >
              <User size={15} />
              Sign In / Register
            </button>
          )}


        </div>
      </div>
    </>
  );
}