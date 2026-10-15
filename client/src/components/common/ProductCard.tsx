import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, Sparkles, Check, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@couplewalah/shared';
import { formatPrice } from '../../lib/utils';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Badge } from './Badge';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const isWishlisted = isInWishlist(product._id);

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.isPersonalizable) {
      navigate(`/gift-studio/${product._id}`);
    } else {
      addToCart({
        productId: product._id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        image: product.images[0] || '/coplWlh.png',
        quantity: 1,
      });
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product._id);
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden border border-blush/60 shadow-sm hover:shadow-premium transition-all duration-300 flex flex-col ${className}`}
    >
      {/* Image Container with Badges & Wishlist Button */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block w-full aspect-square overflow-hidden bg-blush-light"
      >
        <img
          src={product.images[0] || '/coplWlh.png'}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback image
            e.currentTarget.src = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isPersonalizable && (
            <Badge variant="burgundy" size="sm">
              <Sparkles className="w-3 h-3 text-gold" /> Personalized
            </Badge>
          )}
          {product.discountPercentage && product.discountPercentage > 0 && (
            <Badge variant="gold" size="sm">
              {product.discountPercentage}% OFF
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm text-charcoal hover:text-burgundy hover:scale-110 transition-all duration-200 shadow-sm z-10"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-burgundy text-burgundy' : 'text-charcoal'
            }`}
          />
        </button>

        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/95 text-charcoal rounded-full text-xs font-semibold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" /> View Details
          </span>
        </div>
      </Link>

      {/* Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Categories / Occasion pills */}
          <div className="flex items-center gap-2 mb-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="text-[11px] font-medium uppercase tracking-wider text-mutedText">
              {product.categories[0] || 'Couple Gift'}
            </span>
            {product.stock <= 5 && product.stock > 0 && (
              <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-medium">
                Only {product.stock} left
              </span>
            )}
          </div>

          {/* Title */}
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-serif font-semibold text-charcoal text-base line-clamp-1 hover:text-burgundy transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          {product.shortDescription && (
            <p className="text-xs text-mutedText mt-1 line-clamp-2">
              {product.shortDescription}
            </p>
          )}

          {/* Ratings */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1 mt-2">
              <div className="flex items-center text-gold">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="text-xs font-semibold text-charcoal">{product.rating.toFixed(1)}</span>
              <span className="text-[11px] text-mutedText">({product.numReviews})</span>
            </div>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="mt-4 pt-3 border-t border-blush/40 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-bold text-burgundy">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-xs text-mutedText line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAction}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
              product.isPersonalizable
                ? 'bg-gradient-to-r from-burgundy to-burgundy-deep text-warmWhite hover:shadow-md'
                : 'bg-blush hover:bg-blush-deep text-burgundy-deep'
            }`}
          >
            {product.isPersonalizable ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-gold" /> Customize
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
