import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  User as UserIcon,
  Search,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Gift,
  ShieldCheck,
  LogOut,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { AnnouncementBar } from './AnnouncementBar';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { itemCount } = useCart();
  const { wishlist } = useWishlist();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setSearchOpen(false);
        setUserDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    {
      name: 'Personalized Gifts',
      path: '/personalized-gifts',
      highlight: true,
    },
    { name: 'For Him', path: '/category/for-him' },
    { name: 'For Her', path: '/category/for-her' },
    { name: 'Anniversary Gifts', path: '/occasions/anniversary' },
    { name: 'Couple Bundles', path: '/couple-bundles' },
    {
      name: 'Gift Finder',
      path: '/gift-finder',
      icon: Sparkles,
      badge: 'Interactive',
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <AnnouncementBar />

      {/* Main Nav Container */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-soft border-b border-roseGold/20'
            : 'bg-warmWhite/95 border-b border-blush/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-8 h-20 w-full">
            {/* 1. LEFT SECTION: Logo & Brand Name & Tagline */}
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-2.5 md:gap-3 shrink-0 py-1 select-none group min-w-max"
            >
              <img
                src="/coplWlh.png"
                alt="CoupleWalah Logo"
                className="h-10 sm:h-12 md:h-13 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="flex flex-col shrink-0 justify-center">
                <span className="font-serif text-lg sm:text-2xl md:text-[25px] font-bold tracking-tight text-burgundy group-hover:text-burgundy-deep transition-colors whitespace-nowrap leading-none">
                  Couple<span className="text-gold">Walah</span>
                </span>
                <span className="hidden sm:inline-block text-[9px] sm:text-[10px] tracking-widest uppercase text-mutedText font-medium whitespace-nowrap leading-none mt-1">
                  Every Couple Has A Story
                </span>
              </div>
            </Link>

            {/* 2. CENTER SECTION: Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center justify-center min-w-0 flex-1 overflow-hidden"
              aria-label="Main Navigation"
            >
              <div className="flex items-center justify-center space-x-0.5 xl:space-x-1.5 2xl:space-x-2.5">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`relative px-2 xl:px-2.5 2xl:px-3 py-1.5 text-xs xl:text-[13px] 2xl:text-sm font-medium transition-colors duration-200 rounded-md whitespace-nowrap group shrink-0 ${
                        isActive
                          ? 'text-burgundy font-semibold'
                          : 'text-charcoal hover:text-burgundy hover:bg-blush-light'
                      }`}
                    >
                      <span className="flex items-center gap-1 xl:gap-1.5">
                        {link.icon && (
                          <link.icon className="w-3.5 h-3.5 text-gold shrink-0 animate-pulse" />
                        )}
                        <span>{link.name}</span>
                        {link.badge && (
                          <span className="hidden 2xl:inline-block ml-0.5 text-[8px] font-semibold bg-roseGold/20 text-burgundy px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                            {link.badge}
                          </span>
                        )}
                      </span>
                      {isActive && (
                        <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-burgundy rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* 3. RIGHT SECTION: Action Icons & Mobile Menu Button */}
            <div className="flex items-center justify-end space-x-1 sm:space-x-1.5 lg:space-x-2 shrink-0">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 sm:p-2.5 rounded-full text-charcoal hover:text-burgundy hover:bg-blush/40 transition-colors"
                aria-label="Search Couple Gifts"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist Link with Badge */}
              <Link
                to="/account/wishlist"
                className="relative p-2 sm:p-2.5 rounded-full text-charcoal hover:text-burgundy hover:bg-blush/40 transition-colors"
                aria-label={`Wishlist (${wishlist.length} items)`}
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-warmWhite bg-burgundy rounded-full animate-fade-in">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Shopping Cart Link with Badge */}
              <Link
                to="/cart"
                className="relative p-2 sm:p-2.5 rounded-full text-charcoal hover:text-burgundy hover:bg-blush/40 transition-colors"
                aria-label={`Shopping Cart (${itemCount} items)`}
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 text-[11px] font-bold text-warmWhite bg-gradient-to-r from-burgundy to-burgundy-deep rounded-full shadow-sm animate-fade-in">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* User Account Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-0.5 sm:gap-1 p-2 sm:p-2.5 rounded-full text-charcoal hover:text-burgundy hover:bg-blush/40 transition-colors"
                  aria-label="User Account"
                >
                  <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <ChevronDown className="w-3.5 h-3.5 text-mutedText hidden sm:inline" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-premium border border-blush/80 py-2 z-50 animate-fade-in">
                    {isAuthenticated && user ? (
                      <>
                        <div className="px-4 py-3 border-b border-blush/50">
                          <p className="text-xs text-mutedText">Signed in as</p>
                          <p className="text-sm font-semibold text-charcoal truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-mutedText truncate">{user.email}</p>
                          {isAdmin && (
                            <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold bg-burgundy/10 text-burgundy px-2 py-0.5 rounded-full">
                              <ShieldCheck className="w-3 h-3" /> Admin Staff
                            </span>
                          )}
                        </div>

                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-burgundy font-medium hover:bg-blush-light"
                          >
                            <ShieldCheck className="w-4 h-4 text-burgundy" /> Admin Dashboard
                          </Link>
                        )}

                        <Link
                          to="/account"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal hover:bg-blush-light hover:text-burgundy"
                        >
                          <UserIcon className="w-4 h-4" /> My Dashboard
                        </Link>
                        <Link
                          to="/account/orders"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal hover:bg-blush-light hover:text-burgundy"
                        >
                          <Gift className="w-4 h-4" /> My Orders
                        </Link>
                        <Link
                          to="/account/reminders"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal hover:bg-blush-light hover:text-burgundy"
                        >
                          <Sparkles className="w-4 h-4 text-gold" /> Love Reminders
                        </Link>

                        <div className="border-t border-blush/50 my-1" />

                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </>
                    ) : (
                      <div className="p-3">
                        <p className="text-xs text-mutedText mb-3 text-center">
                          Welcome to CoupleWalah!
                        </p>
                        <Link
                          to="/login"
                          className="block w-full text-center py-2 px-4 mb-2 rounded-full bg-burgundy text-warmWhite text-xs font-semibold hover:bg-burgundy-deep transition-colors"
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/register"
                          className="block w-full text-center py-2 px-4 rounded-full border border-burgundy text-burgundy text-xs font-semibold hover:bg-blush/50 transition-colors"
                        >
                          Create Account
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Hamburger Button on the Right */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 sm:p-2 rounded-lg text-charcoal hover:text-burgundy hover:bg-blush/50 transition-colors lg:hidden ml-0.5 sm:ml-1 shrink-0"
                aria-label="Open mobile navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Search Bar */}
        {searchOpen && (
          <div className="border-t border-blush/60 bg-warmWhite/98 px-4 py-4 animate-slide-up shadow-sm">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-mutedText" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search personalized gifts, couple rings, photo lamps, hampers..."
                  autoFocus
                  className="w-full pl-12 pr-28 py-3 bg-white rounded-full border border-roseGold/40 focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-5 py-2 bg-burgundy hover:bg-burgundy-deep text-warmWhite text-xs font-semibold rounded-full transition-colors"
                >
                  Search
                </button>
              </form>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-mutedText">
                <span className="font-medium text-charcoal">Popular:</span>
                {['Custom Photo Lamp', 'Magnetic Bracelets', 'Couple Initial Rings', 'Anniversary Frame', 'Romantic Hamper'].map(
                  (tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setSearchQuery(tag);
                        navigate(`/search?q=${encodeURIComponent(tag)}`);
                        setSearchOpen(false);
                      }}
                      className="px-2.5 py-1 rounded-full bg-blush/60 hover:bg-blush text-burgundy-deep transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-warmWhite h-full shadow-2xl flex flex-col z-50 overflow-y-auto">
            <div className="p-5 flex items-center justify-between border-b border-blush/80">
              <div className="flex items-center gap-2">
                <img src="/coplWlh.png" alt="CoupleWalah" className="h-10 w-auto" />
                <span className="font-serif text-xl font-bold text-burgundy">CoupleWalah</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-blush/50"
              >
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            <nav className="p-4 space-y-1 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-charcoal hover:bg-blush hover:text-burgundy transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {link.icon && <link.icon className="w-4 h-4 text-gold" />}
                    {link.name}
                  </span>
                  {link.badge && (
                    <span className="text-[10px] font-bold bg-roseGold/20 text-burgundy px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}

              <div className="border-t border-blush/80 my-3 pt-3">
                <p className="px-4 text-xs font-bold text-mutedText uppercase tracking-wider mb-2">
                  Special Features
                </p>
                <Link
                  to="/gift-finder"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-burgundy font-medium hover:bg-blush"
                >
                  <Sparkles className="w-4 h-4 text-gold" /> Find The Perfect Gift
                </Link>
                <Link
                  to="/track-order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-charcoal hover:bg-blush"
                >
                  <Gift className="w-4 h-4 text-roseGold" /> Track Your Order
                </Link>
              </div>
            </nav>

            <div className="p-4 border-t border-blush/80 bg-white/60">
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-2">
                    <div className="w-9 h-9 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-charcoal">{user.name}</p>
                      <p className="text-xs text-mutedText">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center w-full py-2 bg-burgundy text-warmWhite rounded-full text-xs font-medium"
                  >
                    Go to Account
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 rounded-full bg-burgundy text-warmWhite text-xs font-semibold"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 rounded-full border border-burgundy text-burgundy text-xs font-semibold"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
