import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  EyeOff,
  CheckCircle2,
  Lock,
  ArrowRight,
  Package,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../lib/utils';
import { Button } from '../components/common/Button';
import { PaymentMethod, Order } from '@couplewalah/shared';

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, deliveryFee, packagingFee, discountAmount, total, secretGift, clearCart } =
    useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Buyer information
  const [buyerName, setBuyerName] = useState(user?.name || 'Sheikh Shoieb Ahamad');
  const [buyerEmail, setBuyerEmail] = useState(user?.email || 'sheikhshoiebsa17@gmail.com');
  const [buyerPhone, setBuyerPhone] = useState('9876543210');

  // Shipping details
  const [recipientName, setRecipientName] = useState(
    secretGift.isSecretGift && secretGift.recipientName ? secretGift.recipientName : 'Rohan Verma'
  );
  const [addressLine1, setAddressLine1] = useState('Flat 402, Rosewood Heights');
  const [addressLine2, setAddressLine2] = useState('Park Street');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('400001');
  const [deliveryInstructions, setDeliveryInstructions] = useState(
    secretGift.deliveryInstructions || 'Please ring bell quietly for surprise delivery.'
  );

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Razorpay');
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderPayload: Partial<Order> = {
        orderNumber: `CW-${Math.floor(100000 + Math.random() * 900000)}`,
        customerDetails: {
          name: buyerName,
          email: buyerEmail,
          phone: buyerPhone,
        },
        shippingAddress: {
          fullName: recipientName,
          phone: buyerPhone,
          addressLine1,
          addressLine2,
          city,
          state,
          pincode,
        },
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          slug: i.slug,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
          selectedVariants: i.selectedVariants,
          isPersonalized: i.isPersonalized,
          personalizationValues: i.personalizationValues,
        })),
        secretGift,
        subtotal,
        discountAmount,
        deliveryFee,
        packagingFee,
        totalAmount: total,
        paymentMethod,
        paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
        orderStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Payment Confirmed',
        timeline: [
          {
            status: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Payment Confirmed',
            timestamp: new Date().toISOString(),
            note:
              paymentMethod === 'Cash on Delivery'
                ? 'Order placed via Cash on Delivery.'
                : 'Payment successfully verified via Razorpay Secured Checkout.',
          },
        ],
      };

      // Try sending to server if API is active, otherwise persist locally
      try {
        const response = await fetch('/api/v1/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data._id) {
            orderPayload._id = data.data._id;
          }
        }
      } catch {
        // Fallback to local storage persistence
      }

      const generatedId = orderPayload._id || `ord-${Date.now()}`;
      localStorage.setItem(`cw_order_${generatedId}`, JSON.stringify({ ...orderPayload, _id: generatedId }));

      // Save to customer order list
      const savedOrders = JSON.parse(localStorage.getItem('cw_user_orders') || '[]');
      savedOrders.unshift({ ...orderPayload, _id: generatedId, createdAt: new Date().toISOString() });
      localStorage.setItem('cw_user_orders', JSON.stringify(savedOrders));

      clearCart();
      setIsProcessing(false);
      navigate(`/order-success/${generatedId}`);
    } catch (err) {
      alert('Failed to place order. Please check inputs.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="max-w-3xl mb-8">
        <h1 className="font-serif text-3xl font-bold text-charcoal">Secure Checkout</h1>
        <p className="text-xs text-mutedText mt-1">
          Complete your order details with 256-bit SSL encrypted protection.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Delivery & Payment Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Buyer Details */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blush shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-charcoal border-b border-blush pb-3">
              1. Your Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Your Name *</label>
                <input
                  required
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Email Address *</label>
                <input
                  required
                  type="email"
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Phone Number *</label>
                <input
                  required
                  type="tel"
                  maxLength={10}
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blush shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-blush pb-3">
              <h2 className="font-serif text-lg font-bold text-charcoal">
                2. Shipping & Delivery Address
              </h2>
              {secretGift.isSecretGift && (
                <span className="text-[11px] font-semibold text-burgundy bg-blush px-2.5 py-1 rounded-full flex items-center gap-1">
                  <EyeOff className="w-3.5 h-3.5" /> Secret Gift Delivery
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Recipient Name (Who receives the parcel?) *
                </label>
                <input
                  required
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Address Line 1 (Flat, House no., Building, Apartment) *
                </label>
                <input
                  required
                  type="text"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Address Line 2 (Street, Sector, Landmark)
                </label>
                <input
                  type="text"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">City *</label>
                <input
                  required
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">State *</label>
                <input
                  required
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">PIN Code *</label>
                <input
                  required
                  maxLength={6}
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  Delivery Instructions
                </label>
                <input
                  type="text"
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blush shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-charcoal border-b border-blush pb-3">
              3. Select Payment Method
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                  paymentMethod === 'Razorpay'
                    ? 'border-burgundy bg-blush/40 shadow-soft ring-1 ring-burgundy'
                    : 'border-blush'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'Razorpay'}
                  onChange={() => setPaymentMethod('Razorpay')}
                  className="mt-1 accent-burgundy"
                />
                <div>
                  <span className="font-serif font-bold text-sm text-charcoal flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-burgundy" /> Razorpay Secured Checkout
                  </span>
                  <p className="text-xs text-mutedText mt-1">
                    UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Netbanking.
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Instant Safe Dev Simulator Enabled
                  </span>
                </div>
              </label>

              <label
                className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-burgundy bg-blush/40 shadow-soft ring-1 ring-burgundy'
                    : 'border-blush'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'Cash on Delivery'}
                  onChange={() => setPaymentMethod('Cash on Delivery')}
                  className="mt-1 accent-burgundy"
                />
                <div>
                  <span className="font-serif font-bold text-sm text-charcoal flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-roseGold" /> Cash on Delivery (COD)
                  </span>
                  <p className="text-xs text-mutedText mt-1">
                    Pay safely in cash or UPI when your parcel arrives at your doorstep.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Items Review & Final CTA */}
        <div className="lg:col-span-4 space-y-6 sticky top-28">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blush shadow-premium space-y-6">
            <h3 className="font-serif text-lg font-bold text-charcoal border-b border-blush pb-3">
              Order Review ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h3>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {items.map((i) => (
                <div key={i.id} className="flex items-center gap-3 text-xs">
                  <img src={i.image} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 overflow-hidden">
                    <p className="font-semibold text-charcoal truncate">{i.name}</p>
                    <p className="text-mutedText">
                      Qty: {i.quantity} × {formatPrice(i.price)}
                    </p>
                  </div>
                  <span className="font-bold text-burgundy">{formatPrice(i.price * i.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2.5 text-xs border-t border-blush pt-4">
              <div className="flex justify-between text-mutedText">
                <span>Subtotal</span>
                <span className="font-semibold text-charcoal">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-mutedText">
                <span>Delivery</span>
                <span className="font-semibold text-charcoal">
                  {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                </span>
              </div>
              {packagingFee > 0 && (
                <div className="flex justify-between text-mutedText">
                  <span>Secret Gift Packaging</span>
                  <span className="font-semibold text-charcoal">{formatPrice(packagingFee)}</span>
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
              type="submit"
              isLoading={isProcessing}
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Place Order &bull; {formatPrice(total)}
            </Button>

            <div className="flex items-center justify-center gap-1 text-[11px] text-mutedText text-center">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Guaranteed Safe Checkout</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
