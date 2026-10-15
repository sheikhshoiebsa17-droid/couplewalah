import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-warmWhite pt-16 pb-12 border-t-4 border-burgundy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-charcoal-light">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-burgundy/20 text-roseGold shrink-0">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-warmWhite font-serif">Bespoke Gifting</h4>
              <p className="text-xs text-mutedText mt-1">Handcrafted customization with your names & dates.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-burgundy/20 text-roseGold shrink-0">
              <Truck className="w-5 h-5 text-roseGold" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-warmWhite font-serif">Pan-India Express</h4>
              <p className="text-xs text-mutedText mt-1">Safe transit with real-time live SMS/Email tracking.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-burgundy/20 text-roseGold shrink-0">
              <ShieldCheck className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-warmWhite font-serif">100% Secure Checkout</h4>
              <p className="text-xs text-mutedText mt-1">Razorpay encrypted payments, UPI, and verified COD.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-burgundy/20 text-roseGold shrink-0">
              <RefreshCw className="w-5 h-5 text-roseGold" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-warmWhite font-serif">Secret Gift Mode</h4>
              <p className="text-xs text-mutedText mt-1">Surprise delivery with hidden invoice & luxury wrapping.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-charcoal-light">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <img src="/coplWlh.png" alt="CoupleWalah" className="h-12 w-auto object-contain" />
              <div>
                <span className="font-serif text-2xl font-bold text-warmWhite">
                  Couple<span className="text-gold">Walah</span>
                </span>
                <p className="text-[11px] text-roseGold tracking-widest uppercase font-medium">
                  Every Couple Has A Story
                </p>
              </div>
            </Link>
            <p className="mt-4 text-xs text-mutedText leading-relaxed max-w-sm">
              CoupleWalah is India's dedicated romantic gifting boutique, creating personalized keepsakes, couple jewellery, 3D photo lamps, and curated anniversary bundles crafted to celebrate your journey of love.
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs text-mutedText">
              <Heart className="w-4 h-4 text-burgundy fill-current" />
              <span>Designed with love for couples everywhere</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold mb-4 uppercase tracking-wider">
              Explore Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-mutedText">
              <li>
                <Link to="/personalized-gifts" className="hover:text-warmWhite transition-colors">
                  Personalized Gifts
                </Link>
              </li>
              <li>
                <Link to="/category/couple-rings" className="hover:text-warmWhite transition-colors">
                  Matching Couple Rings
                </Link>
              </li>
              <li>
                <Link to="/category/matching-bracelets" className="hover:text-warmWhite transition-colors">
                  Magnetic & Touch Bracelets
                </Link>
              </li>
              <li>
                <Link to="/category/custom-photo-gifts" className="hover:text-warmWhite transition-colors">
                  3D Custom Photo Lamps
                </Link>
              </li>
              <li>
                <Link to="/couple-bundles" className="hover:text-warmWhite transition-colors">
                  Romantic Gift Bundles
                </Link>
              </li>
              <li>
                <Link to="/category/gifts-under-499" className="hover:text-warmWhite transition-colors">
                  Gifts Under ₹499
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold mb-4 uppercase tracking-wider">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-mutedText">
              <li>
                <Link to="/track-order" className="hover:text-warmWhite transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/gift-finder" className="hover:text-warmWhite transition-colors">
                  Interactive Gift Finder
                </Link>
              </li>
              <li>
                <Link to="/account/reminders" className="hover:text-warmWhite transition-colors">
                  Anniversary Reminders
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-warmWhite transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-warmWhite transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-warmWhite transition-colors">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-gold mb-4 uppercase tracking-wider">
              Policies & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-mutedText">
              <li>
                <Link to="/shipping-policy" className="hover:text-warmWhite transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns-policy" className="hover:text-warmWhite transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-warmWhite transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-warmWhite transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-roseGold hover:text-warmWhite transition-colors font-medium">
                  Staff Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-mutedText">
          <p>© {new Date().getFullYear()} CoupleWalah. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Genuine Handcrafted Keepsakes</span>
            <span>•</span>
            <span>Razorpay Secured SSL</span>
            <span>•</span>
            <span>India Post & BlueDart Logistics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
