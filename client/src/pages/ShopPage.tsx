import React, { useState, useMemo } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import {
  Filter,
  SlidersHorizontal,
  Sparkles,
  ArrowUpDown,
  Search,
  X,
  ChevronDown,
} from 'lucide-react';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../data/mockData';
import { ProductCard } from '../components/common/ProductCard';
import { Button } from '../components/common/Button';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Read URL query params
  const categoryFilter = searchParams.get('category') || 'all';
  const recipientFilter = searchParams.get('recipient') || 'all';
  const occasionFilter = searchParams.get('occasion') || 'all';
  const personalizableFilter = searchParams.get('personalizable') || 'all';
  const sortOption = searchParams.get('sort') || 'featured';
  const maxPrice = Number(searchParams.get('maxPrice')) || 3000;
  const searchQuery = searchParams.get('q') || '';

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'all' || value === '' || (key === 'maxPrice' && Number(value) >= 3000)) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = product.name.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchCat = product.categories.some((c) => c.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchCat) return false;
      }
      // Category
      if (categoryFilter !== 'all') {
        const cat = INITIAL_CATEGORIES.find((c) => c.slug === categoryFilter);
        const targetName = cat ? cat.name : categoryFilter;
        if (!product.categories.some((c) => c.toLowerCase() === targetName.toLowerCase())) {
          return false;
        }
      }
      // Recipient
      if (recipientFilter !== 'all') {
        if (!product.recipient.includes(recipientFilter as any)) return false;
      }
      // Occasion
      if (occasionFilter !== 'all') {
        if (!product.occasions.some((o) => o.toLowerCase() === occasionFilter.toLowerCase())) {
          return false;
        }
      }
      // Personalizable
      if (personalizableFilter === 'yes' && !product.isPersonalizable) return false;
      if (personalizableFilter === 'no' && product.isPersonalizable) return false;

      // Max price
      if (product.price > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      if (sortOption === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    categoryFilter,
    recipientFilter,
    occasionFilter,
    personalizableFilter,
    sortOption,
    maxPrice,
    searchQuery,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Title & Breadcrumbs */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-mutedText mb-2">
          <Link to="/" className="hover:text-burgundy">Home</Link>
          <span>/</span>
          <span className="text-charcoal font-medium">Couple Gifts Catalogue</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
          {searchQuery ? `Search results for "${searchQuery}"` : 'All Couple Gifts'}
        </h1>
        <p className="text-xs sm:text-sm text-mutedText mt-1">
          Showing {filteredProducts.length} handcrafted presents celebrating love.
        </p>
      </div>

      {/* Main Grid: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block space-y-6 bg-white p-6 rounded-2xl border border-blush/60 shadow-sm h-fit sticky top-28">
          <div className="flex items-center justify-between pb-4 border-b border-blush/60">
            <span className="font-serif font-bold text-base text-charcoal flex items-center gap-2">
              <Filter className="w-4 h-4 text-burgundy" /> Filter Gifts
            </span>
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs text-burgundy font-medium hover:underline"
            >
              Reset
            </button>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-2.5">
              Category
            </h4>
            <div className="space-y-1.5 max-h-52 overflow-y-auto pr-2">
              <button
                type="button"
                onClick={() => updateParam('category', 'all')}
                className={`w-full text-left text-xs py-1 px-2 rounded-lg transition-colors ${
                  categoryFilter === 'all'
                    ? 'bg-burgundy text-warmWhite font-semibold'
                    : 'text-mutedText hover:bg-blush-light hover:text-charcoal'
                }`}
              >
                All Categories
              </button>
              {INITIAL_CATEGORIES.map((cat) => (
                <button
                  key={cat._id}
                  type="button"
                  onClick={() => updateParam('category', cat.slug)}
                  className={`w-full text-left text-xs py-1 px-2 rounded-lg transition-colors ${
                    categoryFilter === cat.slug
                      ? 'bg-burgundy text-warmWhite font-semibold'
                      : 'text-mutedText hover:bg-blush-light hover:text-charcoal'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Recipient */}
          <div className="pt-4 border-t border-blush/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-2.5">
              Who is it for?
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {['all', 'Couple', 'Him', 'Her'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => updateParam('recipient', item)}
                  className={`py-1.5 px-2.5 rounded-lg border text-center transition-colors ${
                    recipientFilter === item
                      ? 'border-burgundy bg-blush text-burgundy font-semibold'
                      : 'border-blush/60 text-mutedText hover:border-burgundy/40'
                  }`}
                >
                  {item === 'all' ? 'Everyone' : item}
                </button>
              ))}
            </div>
          </div>

          {/* Personalization */}
          <div className="pt-4 border-t border-blush/60">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-2.5">
              Personalization
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                { label: 'All Items', val: 'all' },
                { label: 'Personalized Keepsakes Only', val: 'yes' },
                { label: 'Standard Gifts', val: 'no' },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => updateParam('personalizable', opt.val)}
                  className={`w-full text-left py-1 px-2 rounded-lg ${
                    personalizableFilter === opt.val
                      ? 'bg-roseGold/20 text-burgundy font-semibold'
                      : 'text-mutedText hover:bg-blush-light'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-4 border-t border-blush/60">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
              <span>Max Price</span>
              <span className="text-burgundy">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="300"
              max="3000"
              step="100"
              value={maxPrice}
              onChange={(e) => updateParam('maxPrice', e.target.value)}
              className="w-full accent-burgundy"
            />
            <div className="flex justify-between text-[10px] text-mutedText mt-1">
              <span>₹300</span>
              <span>₹3,000+</span>
            </div>
          </div>
        </div>

        {/* Products Grid & Sorting Controls */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Sort Bar */}
          <div className="bg-white p-4 rounded-2xl border border-blush/60 shadow-xs flex flex-wrap items-center justify-between gap-4">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-blush bg-blush-light text-xs font-semibold text-burgundy"
            >
              <Filter className="w-3.5 h-3.5" /> Filters
            </button>

            <span className="text-xs text-mutedText hidden sm:inline">
              Showing <span className="font-semibold text-charcoal">{filteredProducts.length}</span> gifts
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-mutedText hidden sm:inline">Sort by:</span>
              <select
                value={sortOption}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="text-xs py-1.5 px-3 rounded-lg border border-blush bg-white text-charcoal font-medium focus:outline-none focus:ring-1 focus:ring-burgundy"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Product Items */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-blush/60 space-y-4">
              <Sparkles className="w-12 h-12 text-gold mx-auto" />
              <h3 className="font-serif text-xl font-bold text-charcoal">No gifts matched your criteria</h3>
              <p className="text-xs text-mutedText max-w-sm mx-auto">
                Try widening your price range or clearing selected categories to explore our full collection.
              </p>
              <Button variant="secondary" onClick={clearAllFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
