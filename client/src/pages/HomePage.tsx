import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Gift,
  Truck,
  Star,
  CheckCircle2,
  Package,
  EyeOff,
  Calendar,
  Lock,
} from 'lucide-react';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_BUNDLES,
  INITIAL_REVIEWS,
} from '../data/mockData';
import { ProductCard } from '../components/common/ProductCard';
import { formatPrice } from '../lib/utils';
import { Button } from '../components/common/Button';

export const HomePage: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const bestsellers = INITIAL_PRODUCTS.slice(0, 4);
  const personalizedPicks = INITIAL_PRODUCTS.filter((p) => p.isPersonalizable).slice(0, 3);

  const occasions = [
    { title: 'Anniversary', slug: 'anniversary', icon: Heart, tag: 'Most Popular' },
    { title: 'Birthday', slug: 'birthday', icon: Gift, tag: 'Surprises' },
    { title: 'Wedding & Engagement', slug: 'wedding', icon: Sparkles, tag: 'Everlasting' },
    { title: 'First Date Anniversary', slug: 'first-date', icon: Calendar, tag: 'Nostalgic' },
    { title: 'Valentine’s Day', slug: 'valentines-day', icon: Heart, tag: 'Romantic' },
    { title: 'Long-Distance Surprise', slug: 'long-distance', icon: Truck, tag: 'Connected' },
    { title: 'Just Because', slug: 'just-because', icon: Sparkles, tag: 'Pure Love' },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@') || !newsletterEmail.includes('.')) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setNewsletterError('');
    setNewsletterSubmitted(true);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 overflow-hidden">
      {/* SECTION 3: HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blush text-burgundy-deep text-xs font-semibold tracking-wide border border-roseGold/30">
              <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>India’s Dedicated Couple Gifting Destination</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl xl:text-6xl font-bold text-charcoal tracking-tight leading-[1.15]">
              Make Their Heart{' '}
              <span className="text-burgundy relative inline-block">
                Skip a Beat.
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3 text-gold/60"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-mutedText font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Thoughtful gifts. Beautiful memories. A little more love. Explore custom engraved keepsakes, matching jewelry, and luxury romantic hampers crafted uniquely for your love story.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/shop">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Shop Couple Gifts
                </Button>
              </Link>
              <Link to="/personalized-gifts">
                <Button size="lg" variant="secondary" leftIcon={<Sparkles className="w-4 h-4 text-gold" />}>
                  Create a Personalized Gift
                </Button>
              </Link>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-mutedText border-t border-blush/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-burgundy shrink-0" />
                <span>Handcrafted Customization</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-burgundy shrink-0" />
                <span>Discreet Secret Gift Mode</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-burgundy shrink-0" />
                <span>Pan-India Safe Delivery</span>
              </div>
            </div>
          </div>

          {/* Hero Editorial Imagery with Floating Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Backing decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-roseGold/20 via-blush/40 to-gold/20 rounded-3xl blur-2xl -z-10" />

              {/* Main Lifestyle Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-premium border-2 border-white/80 aspect-[4/5] bg-blush-light">
                <img
                  src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80"
                  alt="Romantic couple moment with gift"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-warmWhite">
                  <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                    Signature Keepsake
                  </span>
                  <p className="font-serif text-lg font-bold">Custom 3D Photo Lamp & Oak Frames</p>
                </div>
              </div>

              {/* Floating Badge Card */}
              <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 glass-panel p-4 rounded-2xl shadow-premium border border-white max-w-[220px] animate-fade-in hidden sm:block">
                <div className="flex items-center gap-2 text-burgundy mb-1">
                  <Heart className="w-4 h-4 fill-burgundy text-burgundy" />
                  <span className="text-xs font-bold uppercase tracking-wider">10,000+ Stories</span>
                </div>
                <p className="text-[11px] text-mutedText leading-snug">
                  Cherished by couples celebrating love across India.
                </p>
              </div>

              {/* Secret Gift Mode Floating Pill */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-premium border border-blush flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-burgundy" />
                <span className="text-xs font-bold text-charcoal">Secret Gift Mode Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-burgundy mb-2">
            Curated Collections
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Shop by Category
          </h2>
          <p className="text-sm text-mutedText mt-2">
            Explore handcrafted gifts designed for every relationship milestone.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {INITIAL_CATEGORIES.map((category) => (
            <Link
              key={category._id}
              to={`/category/${category.slug}`}
              className="group flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl bg-white border border-blush/60 shadow-sm hover:shadow-premium hover:border-burgundy/40 transition-all duration-300"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 border-2 border-blush group-hover:border-burgundy transition-all duration-300 shadow-inner bg-blush-light">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-sm font-semibold text-charcoal group-hover:text-burgundy transition-colors line-clamp-1">
                {category.name}
              </h3>
              <span className="text-[11px] text-mutedText mt-0.5 group-hover:text-burgundy-deep transition-colors">
                Explore &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 5: BESTSELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-burgundy mb-2">
              Loved by Couples
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Couple Bestsellers
            </h2>
            <p className="text-sm text-mutedText mt-1">
              Our most celebrated couple keepsakes and anniversary presents.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-burgundy hover:text-burgundy-deep group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 6: PERSONALIZED GIFT STUDIO SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden burgundy-gradient text-warmWhite p-8 sm:p-12 lg:p-16 shadow-premium">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-roseGold/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-gold text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" /> Feature Studio
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Made Just for Your Love Story.
              </h2>
              <p className="text-sm sm:text-base text-blush leading-relaxed max-w-xl mx-auto lg:mx-0">
                Turn your precious dates, names, coordinates, and candid photos into eternal art. Our Gift Studio provides real-time personalization with bespoke engraving and artisan finishing.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link to="/personalized-gifts">
                  <Button variant="gold" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Enter Gift Studio
                  </Button>
                </Link>
              </div>
            </div>

            {/* Showcase mini cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {personalizedPicks.slice(0, 2).map((item) => (
                <Link
                  key={item._id}
                  to={`/gift-studio/${item._id}`}
                  className="group bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 block text-left"
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-black/20">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h4 className="font-serif text-xs font-semibold line-clamp-1 text-warmWhite">
                    {item.name}
                  </h4>
                  <p className="text-xs font-bold text-gold mt-1">{formatPrice(item.price)}</p>
                  <span className="text-[10px] text-blush mt-1 inline-block">
                    Click to Personalize &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: INTERACTIVE GIFT FINDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blush-light rounded-3xl p-8 sm:p-12 border border-roseGold/30 relative overflow-hidden shadow-soft">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-roseGold/20 text-burgundy text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold" /> Personalized Matchmaker
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Not Sure What to Gift? We’ll Help.
            </h2>
            <p className="text-sm text-mutedText max-w-xl mx-auto">
              Answer 4 quick questions about your partner and occasion. Our smart algorithm matches the perfect romantic gift within your budget.
            </p>

            {/* Quick interactive selector chips preview */}
            <div className="pt-4 flex flex-wrap justify-center gap-2">
              {['For Him', 'For Her', 'Anniversary', 'Birthday', 'Under ₹999', 'Long-Distance'].map(
                (badge) => (
                  <span
                    key={badge}
                    className="px-3.5 py-1.5 rounded-full bg-white text-xs font-medium text-charcoal border border-blush shadow-xs"
                  >
                    {badge}
                  </span>
                )
              )}
            </div>

            <div className="pt-6">
              <Link to="/gift-finder">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Find the Perfect Gift Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: COUPLE BUNDLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-burgundy mb-2">
              Curated Gift Packages
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              Curated Couple Bundles
            </h2>
            <p className="text-sm text-mutedText mt-1">
              Thoughtfully matched combinations with bundled savings and luxury presentation.
            </p>
          </div>
          <Link
            to="/couple-bundles"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-burgundy hover:text-burgundy-deep group"
          >
            <span>View All Bundles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_BUNDLES.map((bundle) => (
            <div
              key={bundle._id}
              className="group bg-white rounded-2xl overflow-hidden border border-blush/60 shadow-sm hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-square overflow-hidden bg-blush-light">
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-burgundy text-warmWhite text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Combo Savings
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-charcoal group-hover:text-burgundy transition-colors">
                    {bundle.name}
                  </h3>
                  <p className="text-xs text-mutedText mt-1.5 line-clamp-2">
                    {bundle.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-blush/50">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-mutedText mb-1.5">
                      Included in Box:
                    </p>
                    <ul className="text-xs space-y-1 text-charcoal">
                      {bundle.includedProducts.map((p, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-burgundy shrink-0" />
                          <span className="line-clamp-1">{p.productName}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-blush/50 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-burgundy">
                      {formatPrice(bundle.price)}
                    </span>
                    {bundle.compareAtPrice && (
                      <span className="ml-2 text-xs text-mutedText line-through">
                        {formatPrice(bundle.compareAtPrice)}
                      </span>
                    )}
                  </div>
                  <Link to={`/couple-bundles`}>
                    <Button size="sm" variant="secondary">
                      View Bundle
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9: SHOP BY OCCASION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-burgundy mb-2">
            Celebrate Every Chapter
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Shop by Occasion
          </h2>
          <p className="text-sm text-mutedText mt-1">
            Whatever the romantic milestone, find gifts crafted to make it memorable.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
          {occasions.map((occ) => {
            const Icon = occ.icon;
            return (
              <Link
                key={occ.slug}
                to={`/occasions/${occ.slug}`}
                className="group flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-blush/60 hover:border-burgundy/40 shadow-xs hover:shadow-premium transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-blush group-hover:bg-burgundy flex items-center justify-center text-burgundy group-hover:text-warmWhite transition-colors duration-300 mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-serif text-xs font-semibold text-charcoal group-hover:text-burgundy transition-colors line-clamp-1">
                  {occ.title}
                </span>
                <span className="text-[10px] text-mutedText mt-1">{occ.tag}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SECTION 10: SECRET GIFT MODE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-charcoal text-warmWhite rounded-3xl p-8 sm:p-12 lg:p-14 border border-roseGold/20 shadow-premium relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-burgundy/30 border border-burgundy/40 text-roseGold text-xs font-semibold">
                <EyeOff className="w-3.5 h-3.5 text-gold" /> Exclusive Feature
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-warmWhite">
                Planning a Surprise? Switch On{' '}
                <span className="text-gold">Secret Gift Mode</span>.
              </h2>
              <p className="text-sm text-mutedText leading-relaxed max-w-2xl">
                Send love directly to your partner’s doorstep without spoiling the surprise. When enabled during checkout:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-warmWhite">Luxury Gift Box</h4>
                    <p className="text-[11px] text-mutedText">Satin ribbon wrapping & wax-sealed card.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <EyeOff className="w-5 h-5 text-roseGold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-warmWhite">Hidden Price Slip</h4>
                    <p className="text-[11px] text-mutedText">Invoices sent to buyer only; prices obscured.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-warmWhite">Discreet Outer Carton</h4>
                    <p className="text-[11px] text-mutedText">Neutral packaging keeps contents confidential.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-roseGold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-warmWhite">Separate Delivery Info</h4>
                    <p className="text-[11px] text-mutedText">Keep your billing address independent.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="glass-panel p-6 rounded-2xl border border-roseGold/30 text-charcoal max-w-xs text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-burgundy/10 text-burgundy mx-auto flex items-center justify-center">
                  <EyeOff className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-base text-charcoal">Available in Cart</h3>
                <p className="text-xs text-mutedText">
                  Simply tick "Secret Gift Mode" in your cart or checkout to activate custom wrapping and hidden price slips.
                </p>
                <Link to="/cart">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View Shopping Cart
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: WHY COUPLEWALAH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-burgundy mb-2">
            The CoupleWalah Promise
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Why Couples Choose Us
          </h2>
          <p className="text-sm text-mutedText mt-1">
            Genuine craftsmanship and honest service dedicated exclusively to romantic relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-blush/60 shadow-sm text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-blush text-burgundy mx-auto flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">Handcrafted Artistry</h3>
            <p className="text-xs text-mutedText leading-relaxed">
              Every personalized nameplate, engraved ring, and photo lamp is individually crafted and inspected before dispatch.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-blush/60 shadow-sm text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-blush text-burgundy mx-auto flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-burgundy" />
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">100% Transparent Gifting</h3>
            <p className="text-xs text-mutedText leading-relaxed">
              No fake countdown timers, no fabricated reviews, and no artificial hype. Just authentic gifts crafted to delight your partner.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-blush/60 shadow-sm text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-blush text-burgundy mx-auto flex items-center justify-center">
              <Truck className="w-6 h-6 text-roseGold" />
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">Secure & Tracked Transit</h3>
            <p className="text-xs text-mutedText leading-relaxed">
              Pan-India courier logistics with genuine tracking numbers and dedicated customer support from preparation to delivery.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 12: CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-burgundy mb-2">
            Real Stories, Real Smiles
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
            Verified Customer Reviews
          </h2>
          <p className="text-sm text-mutedText mt-1">
            Genuine experiences from couples who trusted us with their milestone celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_REVIEWS.map((review) => (
            <div
              key={review._id}
              className="bg-white p-6 rounded-2xl border border-blush/60 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-gold mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                {review.title && (
                  <h4 className="font-serif font-bold text-charcoal text-base mb-2">
                    "{review.title}"
                  </h4>
                )}
                <p className="text-xs text-mutedText leading-relaxed">"{review.comment}"</p>
              </div>

              <div className="mt-6 pt-4 border-t border-blush/50 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-charcoal">{review.userName}</p>
                  <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Couple Purchase
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 13: NEWSLETTER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blush rounded-3xl p-8 sm:p-12 text-center border border-roseGold/40 shadow-soft">
          <Heart className="w-8 h-8 text-burgundy fill-burgundy mx-auto mb-3" />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-deep">
            Join the CoupleWalah Circle
          </h2>
          <p className="text-xs sm:text-sm text-mutedText max-w-md mx-auto mt-2">
            Receive curated date night ideas, seasonal romance guides, and gentle reminders for upcoming anniversaries.
          </p>

          {newsletterSubmitted ? (
            <div className="mt-6 p-4 rounded-2xl bg-white/80 border border-emerald-300 text-emerald-800 text-xs font-semibold inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Thank you for subscribing! You can unsubscribe anytime with a single click.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="mt-6 max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-full text-xs bg-white border border-roseGold/40 focus:outline-none focus:ring-2 focus:ring-burgundy/30 text-charcoal"
                />
                <Button type="submit" variant="primary" size="md">
                  Subscribe
                </Button>
              </div>
              {newsletterError && (
                <p className="text-[11px] text-red-600 mt-2 text-left px-2">{newsletterError}</p>
              )}
              <p className="text-[10px] text-mutedText mt-3">
                We respect your privacy. No spam, ever. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
