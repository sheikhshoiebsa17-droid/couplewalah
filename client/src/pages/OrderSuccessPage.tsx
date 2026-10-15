import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Heart, Package, ArrowRight, Truck } from 'lucide-react';
import { Button } from '../components/common/Button';
import { formatPrice } from '../lib/utils';
import { Order } from '@couplewalah/shared';

export const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  // Retrieve saved order details if available
  const savedOrderStr = orderId ? localStorage.getItem(`cw_order_${orderId}`) : null;
  const order: Order | null = savedOrderStr ? JSON.parse(savedOrderStr) : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-fade-in">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
          Order Confirmed
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
          Your Love Story is in Good Hands!
        </h1>
        <p className="text-xs sm:text-sm text-mutedText max-w-md mx-auto">
          We have received your order{' '}
          <strong className="text-burgundy">{order?.orderNumber || orderId}</strong>. A confirmation has been sent to your email.
        </p>
      </div>

      {order && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blush shadow-sm text-left space-y-4 max-w-xl mx-auto">
          <div className="flex justify-between items-center border-b border-blush pb-3 text-xs">
            <span className="font-semibold text-charcoal">Delivery Recipient:</span>
            <span className="text-mutedText">{order.shippingAddress.fullName}</span>
          </div>
          <div className="flex justify-between items-center border-b border-blush pb-3 text-xs">
            <span className="font-semibold text-charcoal">Payment Method:</span>
            <span className="text-mutedText">{order.paymentMethod} ({order.paymentStatus})</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-charcoal">Total Amount:</span>
            <span className="font-bold text-burgundy text-sm">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      )}

      <div className="pt-4 flex flex-wrap justify-center gap-4">
        <Link to={`/track-order?orderId=${order?.orderNumber || orderId}`}>
          <Button variant="secondary" size="md" leftIcon={<Truck className="w-4 h-4" />}>
            Track Delivery Status
          </Button>
        </Link>
        <Link to="/shop">
          <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export const TrackOrderPage: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const [searched, setSearched] = React.useState(false);

  // Pre-fill query from URL if available
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('orderId');
    if (id) {
      setQuery(id);
      setSearched(true);
    }
  }, []);

  const timeline = [
    { title: 'Order Confirmed', time: '15 Oct, 09:30 AM', done: true },
    { title: 'Personalization & Quality Check', time: '15 Oct, 02:15 PM', done: true },
    { title: 'Packed in Luxury Gift Box', time: '16 Oct, 10:00 AM', done: true },
    { title: 'Dispatched via Express Courier', time: 'In Transit (Estimated 18 Oct)', done: false },
    { title: 'Delivered', time: 'Pending', done: false },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-10">
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-full bg-blush text-burgundy mx-auto flex items-center justify-center">
          <Truck className="w-7 h-7" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
          Track Your CoupleWalah Parcel
        </h1>
        <p className="text-xs sm:text-sm text-mutedText max-w-md mx-auto">
          Enter your Order ID (e.g. CW-102941) or phone number to view live transit progress.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blush shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (query.trim()) setSearched(true);
          }}
          className="flex flex-col sm:flex-row gap-2"
        >
          <input
            type="text"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Order ID (e.g. CW-102941)"
            className="flex-1 px-4 py-3 text-xs rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy uppercase"
          />
          <Button type="submit" variant="primary">
            Track Parcel
          </Button>
        </form>

        {searched && (
          <div className="mt-8 pt-8 border-t border-blush/60 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between text-xs bg-blush-light p-4 rounded-2xl">
              <div>
                <span className="font-semibold text-charcoal">Tracking Number:</span>{' '}
                <span className="text-burgundy font-bold">BLUEDART-84920194</span>
              </div>
              <div className="text-emerald-700 font-semibold">● On Schedule</div>
            </div>

            <div className="space-y-6 pl-4 border-l-2 border-burgundy/30 ml-2">
              {timeline.map((step, idx) => (
                <div key={idx} className="relative">
                  <div
                    className={`absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                      step.done ? 'bg-burgundy' : 'bg-gray-300'
                    }`}
                  />
                  <h4
                    className={`text-xs font-semibold ${
                      step.done ? 'text-charcoal' : 'text-mutedText'
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-mutedText">{step.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
