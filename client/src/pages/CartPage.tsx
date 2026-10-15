import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  EyeOff,
  Package,
  Heart,
  Tag,
  Check,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';
import { Button } from '../components/common/Button';

export const CartPage: React.FC = () => {
  const {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    packagingFee,
    discountAmount,
    total,
    couponCode,
    secretGift,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    updateSecretGift,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{
    msg: string;
    isErr: boolean;
  } | null>(null);

  const navigate = useNavigate();

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = await applyCoupon(couponInput);
    setCouponFeedback({ msg: res.message, isErr: !res.success });
    if (res.success) setCouponInput('');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-blush mx-auto flex items-center justify-center text-burgundy">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-charcoal">Your Cart is Empty</h1>
        <p className="text-sm text-mutedText max-w-sm mx-auto">
          You haven't added any couple gifts yet. Discover our bestsellers or create a personalized keepsake.
        </p>
        <div className="pt-4">
          <Link to="/shop">
            <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore Couple Gifts
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-blush/80">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal">Shopping Bag</h1>
          <p className="text-xs text-mutedText mt-1">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <Link to="/shop" className="text-xs font-semibold text-burgundy hover:underline">
          Continue Shopping &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Items List & Secret Gift Mode */}
        <div className="lg:col-span-8 space-y-6">
          {/* Cart Items */}
          <div className="bg-white rounded-3xl p-6 border border-blush/80 shadow-sm space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-blush/60 last:border-b-0 last:pb-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover bg-blush-light shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/product/${item.slug}`}
                        className="font-serif font-bold text-charcoal text-base hover:text-burgundy transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-mutedText hover:text-red-600 p-1 rounded transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Selected Variants */}
                    {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                      <p className="text-xs text-mutedText mt-1">
                        {Object.entries(item.selectedVariants)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(' • ')}
                      </p>
                    )}

                    {/* Personalization Details if present */}
                    {item.isPersonalized && item.personalizationValues && (
                      <div className="mt-2 p-2.5 rounded-xl bg-blush/60 border border-roseGold/30 text-[11px] text-burgundy-deep space-y-1">
                        <div className="font-semibold flex items-center gap-1 text-burgundy">
                          <Sparkles className="w-3 h-3 text-gold" /> Customized Details:
                        </div>
                        {item.personalizationValues.map((pv, idx) => (
                          <div key={idx} className="flex gap-1">
                            <span className="font-medium text-mutedText">{pv.label}:</span>
                            <span className="font-semibold text-charcoal">{pv.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-blush rounded-full overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-xs hover:bg-blush font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-semibold text-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-xs hover:bg-blush font-bold"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-bold text-burgundy text-base">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SECRET GIFT MODE CARD (Feature Three) */}
          <div className="bg-charcoal text-warmWhite rounded-3xl p-6 sm:p-8 border border-roseGold/30 shadow-premium space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-burgundy/40 text-gold">
                  <EyeOff className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-warmWhite">
                    Secret Gift Mode (Surprise Delivery)
                  </h3>
                  <p className="text-xs text-mutedText">
                    Discreet packaging, satin ribbon box, and hidden invoice prices.
                  </p>
                </div>
              </div>

              {/* Toggle switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={secretGift.isSecretGift}
                  onChange={(e) =>
                    updateSecretGift({
                      isSecretGift: e.target.checked,
                      giftPackagingPrice: e.target.checked ? 149 : 0,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-charcoal-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-burgundy"></div>
              </label>
            </div>

            {secretGift.isSecretGift && (
              <div className="pt-4 border-t border-charcoal-light space-y-4 animate-fade-in text-xs">
                <div>
                  <label className="block text-roseGold font-semibold mb-1">
                    Personalized Wax-Sealed Greeting Card Message:
                  </label>
                  <textarea
                    rows={2}
                    maxLength={150}
                    value={secretGift.personalizedCardMessage || ''}
                    onChange={(e) =>
                      updateSecretGift({ personalizedCardMessage: e.target.value })
                    }
                    placeholder="Write a message to accompany your gift inside the envelope..."
                    className="w-full text-xs p-3 rounded-xl bg-charcoal-light border border-charcoal text-warmWhite focus:outline-none focus:ring-1 focus:ring-burgundy"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="hidePrices"
                      checked={secretGift.hidePricesOnSlip}
                      onChange={(e) =>
                        updateSecretGift({ hidePricesOnSlip: e.target.checked })
                      }
                      className="rounded accent-burgundy"
                    />
                    <label htmlFor="hidePrices" className="text-mutedText cursor-pointer">
                      Hide product prices on packing slip
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="discreetPack"
                      checked={secretGift.discreetPackaging}
                      onChange={(e) =>
                        updateSecretGift({ discreetPackaging: e.target.checked })
                      }
                      className="rounded accent-burgundy"
                    />
                    <label htmlFor="discreetPack" className="text-mutedText cursor-pointer">
                      Discreet outer carton delivery
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Coupon */}
        <div className="lg:col-span-4 space-y-6 sticky top-28">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blush shadow-premium space-y-6">
            <h2 className="font-serif text-xl font-bold text-charcoal border-b border-blush pb-3">
              Order Summary
            </h2>

            {/* Coupon Code Input */}
            <div>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon (e.g. LOVE10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy uppercase font-semibold"
                />
                <Button type="submit" variant="secondary" size="sm">
                  Apply
                </Button>
              </form>

              {couponFeedback && (
                <p
                  className={`text-xs mt-1.5 font-medium ${
                    couponFeedback.isErr ? 'text-red-600' : 'text-emerald-700'
                  }`}
                >
                  {couponFeedback.msg}
                </p>
              )}

              {couponCode && (
                <div className="mt-2 flex items-center justify-between p-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs">
                  <span className="flex items-center gap-1 font-semibold">
                    <Tag className="w-3.5 h-3.5" /> {couponCode} applied
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-3 text-xs border-t border-blush pt-4">
              <div className="flex justify-between text-mutedText">
                <span>Subtotal</span>
                <span className="font-semibold text-charcoal">{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-mutedText">
                <span>Delivery Fee</span>
                <span className="font-semibold text-charcoal">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700">FREE</span>
                  ) : (
                    formatPrice(deliveryFee)
                  )}
                </span>
              </div>

              {packagingFee > 0 && (
                <div className="flex justify-between text-mutedText">
                  <span>Secret Gift Box Packaging</span>
                  <span className="font-semibold text-charcoal">
                    {formatPrice(packagingFee)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-base font-bold text-burgundy pt-3 border-t border-blush">
                <span>Total Payable</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Button
              size="lg"
              variant="primary"
              className="w-full"
              onClick={() => navigate('/checkout')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Proceed to Checkout
            </Button>

            <div className="pt-2 text-center text-[11px] text-mutedText flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Razorpay 256-bit SSL encrypted checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
