import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react';
import { INITIAL_BUNDLES } from '../data/mockData';
import { formatPrice } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';

export const CoupleBundlesPage: React.FC = () => {
  const { addToCart } = useCart();

  const handleAddBundle = (bundle: typeof INITIAL_BUNDLES[0]) => {
    addToCart({
      productId: bundle._id,
      name: bundle.name,
      slug: bundle.slug,
      price: bundle.price,
      compareAtPrice: bundle.compareAtPrice,
      image: bundle.image,
      quantity: 1,
      isPersonalized: false,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush text-burgundy text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-gold" /> Bundled Romance
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
          Curated Couple Bundles
        </h1>
        <p className="text-sm text-mutedText">
          Hand-selected gift pairings crafted to tell your love story while saving up to 35% compared to individual items.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {INITIAL_BUNDLES.map((bundle) => (
          <div
            key={bundle._id}
            className="bg-white rounded-3xl overflow-hidden border border-blush shadow-premium flex flex-col md:flex-row"
          >
            <div className="md:w-1/2 relative bg-blush-light min-h-[260px]">
              <img
                src={bundle.image}
                alt={bundle.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-burgundy text-warmWhite text-xs font-bold px-3 py-1 rounded-full">
                Curated Combo
              </div>
            </div>

            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                  {bundle.name}
                </h3>
                <p className="text-xs text-mutedText mt-2 leading-relaxed">
                  {bundle.description}
                </p>

                <div className="mt-4 pt-4 border-t border-blush/60">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-mutedText block mb-2">
                    Package Includes:
                  </span>
                  <ul className="space-y-1.5 text-xs text-charcoal">
                    {bundle.includedProducts.map((p, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-burgundy shrink-0" />
                        <span>{p.productName}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-blush/60 flex items-center justify-between gap-4">
                <div>
                  <span className="text-2xl font-bold text-burgundy">
                    {formatPrice(bundle.price)}
                  </span>
                  {bundle.compareAtPrice && (
                    <span className="ml-2 text-xs text-mutedText line-through">
                      {formatPrice(bundle.compareAtPrice)}
                    </span>
                  )}
                </div>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleAddBundle(bundle)}
                  leftIcon={<ShoppingBag className="w-4 h-4" />}
                >
                  Add Bundle
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
