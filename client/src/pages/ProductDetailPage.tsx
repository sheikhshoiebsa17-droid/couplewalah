import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Star,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ShoppingBag,
  MapPin,
  EyeOff,
  AlertCircle,
} from 'lucide-react';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from '../data/mockData';
import { formatPrice } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = INITIAL_PRODUCTS.find((p) => p.slug === slug) || INITIAL_PRODUCTS[0];

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0] || '/coplWlh.png');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (product.variants) {
      product.variants.forEach((v) => {
        if (v.options.length > 0) initial[v.name] = v.options[0].value;
      });
    }
    return initial;
  });

  // Personalization fields if any
  const [personalValues, setPersonalValues] = useState<Record<string, string>>({});
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [addedToast, setAddedToast] = useState(false);

  const isWishlisted = isInWishlist(product._id);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus('Available! Express Delivery in 3-5 business days.');
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  const handleAddToCart = () => {
    if (product.isPersonalizable) {
      // Validate required personalization fields
      const schema = product.personalizationSchema?.fields || [];
      const missing = schema.filter((f) => f.required && !personalValues[f.id]);
      if (missing.length > 0) {
        alert(`Please fill the required personalization field: ${missing[0].label}`);
        return;
      }
    }

    const formattedPersonalValues = Object.entries(personalValues).map(([fieldId, value]) => {
      const fieldDef = product.personalizationSchema?.fields.find((f) => f.id === fieldId);
      return {
        fieldId,
        label: fieldDef?.label || fieldId,
        value,
      };
    });

    addToCart({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      image: product.images[0] || '/coplWlh.png',
      quantity,
      selectedVariants,
      isPersonalized: product.isPersonalizable,
      personalizationValues: formattedPersonalValues,
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const reviews = INITIAL_REVIEWS.filter((r) => r.productId === product._id);
  const related = INITIAL_PRODUCTS.filter((p) => p._id !== product._id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-mutedText">
        <Link to="/" className="hover:text-burgundy">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-burgundy">Shop</Link>
        <span>/</span>
        <span className="text-charcoal font-medium truncate">{product.name}</span>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Gallery Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-blush-light border border-blush/80 shadow-soft">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isPersonalizable && (
              <div className="absolute top-4 left-4">
                <Badge variant="burgundy" size="md">
                  <Sparkles className="w-3.5 h-3.5 text-gold" /> Personalized Keepsake
                </Badge>
              </div>
            )}
            <button
              type="button"
              onClick={() => toggleWishlist(product._id)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-sm text-charcoal hover:text-burgundy shadow-sm transition-transform active:scale-95"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-burgundy text-burgundy' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === img ? 'border-burgundy ring-2 ring-burgundy/20' : 'border-blush'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Column */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-burgundy">
                {product.categories.join(' • ')}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-charcoal">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-mutedText">({product.numReviews} couple reviews)</span>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl sm:text-3xl font-bold text-burgundy">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-base text-mutedText line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  <Badge variant="gold">Save {product.discountPercentage}%</Badge>
                </>
              )}
            </div>
            <p className="text-xs text-mutedText mt-1">Inclusive of all taxes. Free shipping above ₹999.</p>
          </div>

          <p className="text-sm text-charcoal leading-relaxed">{product.description}</p>

          {/* Variants selector if available */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-4 pt-2 border-t border-blush/60">
              {product.variants.map((v) => (
                <div key={v.name}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                    {v.name}: <span className="text-burgundy font-semibold">{selectedVariants[v.name]}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {v.options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setSelectedVariants((prev) => ({ ...prev, [v.name]: opt.value }))
                        }
                        className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                          selectedVariants[v.name] === opt.value
                            ? 'border-burgundy bg-blush text-burgundy shadow-xs'
                            : 'border-blush text-charcoal hover:border-burgundy/40'
                        }`}
                      >
                        {opt.value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Personalization Section if applicable */}
          {product.isPersonalizable && product.personalizationSchema && (
            <div className="p-5 rounded-2xl bg-blush-light border border-roseGold/30 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold" />
                <h3 className="font-serif font-bold text-sm text-burgundy">
                  Personalize Your Keepsake
                </h3>
              </div>
              <p className="text-xs text-mutedText">
                Enter your details below. Our artisan team will engrave/print your custom keepsake accurately.
              </p>

              <div className="space-y-3">
                {product.personalizationSchema.fields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-xs font-semibold text-charcoal mb-1">
                      {field.label} {field.required && <span className="text-burgundy">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        rows={3}
                        maxLength={field.maxLength}
                        placeholder={field.placeholder}
                        value={personalValues[field.id] || ''}
                        onChange={(e) =>
                          setPersonalValues((prev) => ({ ...prev, [field.id]: e.target.value }))
                        }
                        className="w-full text-xs p-3 rounded-xl border border-blush bg-white focus:outline-none focus:ring-1 focus:ring-burgundy"
                      />
                    ) : field.type === 'date' ? (
                      <input
                        type="date"
                        value={personalValues[field.id] || ''}
                        onChange={(e) =>
                          setPersonalValues((prev) => ({ ...prev, [field.id]: e.target.value }))
                        }
                        className="w-full text-xs p-2.5 rounded-xl border border-blush bg-white focus:outline-none focus:ring-1 focus:ring-burgundy"
                      />
                    ) : field.type === 'image' ? (
                      <div className="border-2 border-dashed border-roseGold/40 p-4 rounded-xl text-center bg-white">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setPersonalValues((prev) => ({
                                ...prev,
                                [field.id]: `Uploaded: ${file.name}`,
                              }));
                            }
                          }}
                          className="text-xs"
                        />
                        {personalValues[field.id] && (
                          <p className="text-xs text-emerald-700 font-semibold mt-1">
                            ✓ {personalValues[field.id]}
                          </p>
                        )}
                      </div>
                    ) : (
                      <input
                        type="text"
                        maxLength={field.maxLength}
                        placeholder={field.placeholder}
                        value={personalValues[field.id] || ''}
                        onChange={(e) =>
                          setPersonalValues((prev) => ({ ...prev, [field.id]: e.target.value }))
                        }
                        className="w-full text-xs p-2.5 rounded-xl border border-blush bg-white focus:outline-none focus:ring-1 focus:ring-burgundy"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="pt-4 border-t border-blush/60 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-blush rounded-full overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-sm hover:bg-blush font-bold"
                >
                  -
                </button>
                <span className="px-4 py-2 text-sm font-semibold text-charcoal">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="px-3 py-2 text-sm hover:bg-blush font-bold"
                >
                  +
                </button>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                leftIcon={<ShoppingBag className="w-4 h-4" />}
              >
                {product.isPersonalizable ? 'Add Customized Gift to Cart' : 'Add to Shopping Cart'}
              </Button>
            </div>

            {addedToast && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between border border-emerald-200 animate-fade-in">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" /> Added to your cart!
                </span>
                <Link to="/cart" className="underline hover:text-emerald-900">
                  View Cart &rarr;
                </Link>
              </div>
            )}
          </div>

          {/* Delivery Pincode Checker */}
          <div className="p-4 bg-white rounded-2xl border border-blush/60 space-y-2">
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-mutedText" />
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter Delivery PIN Code"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-charcoal text-warmWhite rounded-xl text-xs font-semibold hover:bg-black transition-colors"
              >
                Check
              </button>
            </form>
            {pincodeStatus && (
              <p className="text-xs text-charcoal font-medium">{pincodeStatus}</p>
            )}
          </div>

          {/* Secret Gift Mode Banner */}
          <div className="p-4 rounded-2xl bg-charcoal text-warmWhite flex items-center gap-3">
            <EyeOff className="w-6 h-6 text-gold shrink-0" />
            <div className="text-xs">
              <span className="font-serif font-bold text-warmWhite block">Secret Gift Mode Eligible</span>
              <span className="text-mutedText">
                Want to surprise your partner? Toggle Secret Gift Mode in your cart for discreet packaging and hidden price slips.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Reviews Section */}
      <div className="pt-8 border-t border-blush/60 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blush shadow-xs space-y-4">
          <h3 className="font-serif text-xl font-bold text-charcoal">Product Details & Specs</h3>
          {product.specifications ? (
            <dl className="divide-y divide-blush/60 text-xs">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="py-2.5 flex justify-between">
                  <dt className="text-mutedText font-medium">{key}</dt>
                  <dd className="font-semibold text-charcoal">{val}</dd>
                </div>
              ))}
              <div className="py-2.5 flex justify-between">
                <dt className="text-mutedText font-medium">SKU</dt>
                <dd className="font-semibold text-charcoal">{product.sku}</dd>
              </div>
            </dl>
          ) : (
            <p className="text-xs text-mutedText">Standard CoupleWalah artisan specifications apply.</p>
          )}
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blush shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-charcoal">Customer Reviews</h3>
            <span className="text-xs font-semibold text-burgundy">{reviews.length} Verified</span>
          </div>

          {reviews.length === 0 ? (
            <p className="text-xs text-mutedText">No verified reviews for this product yet.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev._id} className="border-b border-blush/60 pb-3 last:border-b-0 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-charcoal">{rev.userName}</span>
                    <div className="flex text-gold">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-mutedText">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
