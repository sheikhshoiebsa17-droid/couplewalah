import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Package,
  Heart,
  Calendar,
  Settings,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Truck,
  Eye,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { INITIAL_PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/common/ProductCard';
import { Button } from '../components/common/Button';
import { formatPrice, formatDate } from '../lib/utils';
import { Reminder, Order } from '@couplewalah/shared';

export const AccountPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState<'orders' | 'reminders' | 'wishlist' | 'profile'>('orders');

  // Customer Reminders State (Feature Four)
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    try {
      const saved = localStorage.getItem('cw_reminders');
      return saved
        ? JSON.parse(saved)
        : [
            {
              _id: 'rem-1',
              userId: user?._id || 'usr-1',
              title: "Our 2nd Relationship Anniversary",
              occasionType: 'Anniversary',
              eventDate: '2026-11-20',
              recipientName: 'Rohan',
              daysInAdvance: 7,
              emailNotification: true,
              isActive: true,
              createdAt: '2026-01-01',
              updatedAt: '2026-01-01',
            },
            {
              _id: 'rem-2',
              userId: user?._id || 'usr-1',
              title: "Ayesha's Birthday Surprise",
              occasionType: 'Birthday',
              eventDate: '2026-12-14',
              recipientName: 'Ayesha',
              daysInAdvance: 5,
              emailNotification: true,
              isActive: true,
              createdAt: '2026-01-01',
              updatedAt: '2026-01-01',
            },
          ];
    } catch {
      return [];
    }
  });

  // New reminder form
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<Reminder['occasionType']>('Anniversary');
  const [newDate, setNewDate] = useState('');
  const [newRecipient, setNewRecipient] = useState('');
  const [newDaysAdvance, setNewDaysAdvance] = useState(7);

  const saveReminders = (items: Reminder[]) => {
    setReminders(items);
    localStorage.setItem('cw_reminders', JSON.stringify(items));
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDate) return;
    const item: Reminder = {
      _id: `rem-${Date.now()}`,
      userId: user?._id || 'usr-1',
      title: newTitle.trim(),
      occasionType: newType,
      eventDate: newDate,
      recipientName: newRecipient.trim() || 'Partner',
      daysInAdvance: newDaysAdvance,
      emailNotification: true,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveReminders([...reminders, item]);
    setShowAddReminder(false);
    setNewTitle('');
    setNewDate('');
  };

  const handleDeleteReminder = (id: string) => {
    saveReminders(reminders.filter((r) => r._id !== id));
  };

  const handleToggleReminder = (id: string) => {
    saveReminders(
      reminders.map((r) => (r._id === id ? { ...r, isActive: !r.isActive } : r))
    );
  };

  // Orders State
  const orders: Order[] = JSON.parse(localStorage.getItem('cw_user_orders') || '[]');
  const wishlistedProducts = INITIAL_PRODUCTS.filter((p) => wishlist.includes(p._id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* User Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blush shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center font-bold text-xl">
            {user?.name ? user.name.charAt(0) : 'U'}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-burgundy">
              Customer Sanctuary
            </span>
            <h1 className="font-serif text-2xl font-bold text-charcoal">
              Welcome back, {user?.name || 'Valued Couple'}
            </h1>
            <p className="text-xs text-mutedText">{user?.email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold self-start sm:self-center"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 bg-white p-4 rounded-3xl border border-blush shadow-sm space-y-1">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-semibold transition-colors ${
              activeTab === 'orders'
                ? 'bg-burgundy text-warmWhite'
                : 'text-charcoal hover:bg-blush-light'
            }`}
          >
            <Package className="w-4 h-4" /> My Orders ({orders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reminders')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-semibold transition-colors ${
              activeTab === 'reminders'
                ? 'bg-burgundy text-warmWhite'
                : 'text-charcoal hover:bg-blush-light'
            }`}
          >
            <Calendar className="w-4 h-4" /> Love Reminders ({reminders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('wishlist')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-semibold transition-colors ${
              activeTab === 'wishlist'
                ? 'bg-burgundy text-warmWhite'
                : 'text-charcoal hover:bg-blush-light'
            }`}
          >
            <Heart className="w-4 h-4" /> Wishlist ({wishlist.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-semibold transition-colors ${
              activeTab === 'profile'
                ? 'bg-burgundy text-warmWhite'
                : 'text-charcoal hover:bg-blush-light'
            }`}
          >
            <User className="w-4 h-4" /> Profile & Settings
          </button>
        </div>

        {/* Tab Content */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-charcoal">Order History</h2>
              {orders.length === 0 ? (
                <div className="bg-white rounded-3xl p-10 text-center border border-blush space-y-3">
                  <Package className="w-12 h-12 text-roseGold mx-auto" />
                  <h3 className="font-serif text-lg font-bold text-charcoal">No past orders yet</h3>
                  <p className="text-xs text-mutedText max-w-sm mx-auto">
                    When you order couple gifts or secret surprises, their tracking and receipts will appear here.
                  </p>
                  <Link to="/shop">
                    <Button variant="primary" size="sm">
                      Start Gifting
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div
                      key={ord._id}
                      className="bg-white p-6 rounded-3xl border border-blush shadow-xs space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-blush pb-3 text-xs">
                        <div>
                          <span className="font-bold text-burgundy">{ord.orderNumber}</span>
                          <span className="text-mutedText ml-2">
                            • {formatDate(ord.createdAt || new Date().toISOString())}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold text-[11px]">
                            {ord.orderStatus}
                          </span>
                          <span className="font-bold text-charcoal">
                            {formatPrice(ord.totalAmount)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <span className="font-medium text-charcoal">
                              {item.name} (Qty: {item.quantity})
                            </span>
                            <span className="text-mutedText">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex justify-between items-center text-xs">
                        <span className="text-mutedText">
                          Recipient: <strong>{ord.shippingAddress.fullName}</strong> ({ord.shippingAddress.city})
                        </span>
                        <Link
                          to={`/track-order?orderId=${ord.orderNumber}`}
                          className="font-semibold text-burgundy hover:underline flex items-center gap-1"
                        >
                          <Truck className="w-3.5 h-3.5" /> Track Parcel
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: REMINDERS (Feature Four) */}
          {activeTab === 'reminders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-xl font-bold text-charcoal">
                    Anniversary & Birthday Reminders
                  </h2>
                  <p className="text-xs text-mutedText">
                    Never forget your partner's special milestone. We'll send gentle reminders in advance.
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setShowAddReminder(!showAddReminder)}
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  Add Event
                </Button>
              </div>

              {/* Add Reminder Modal / Form */}
              {showAddReminder && (
                <form
                  onSubmit={handleAddReminder}
                  className="bg-blush-light p-6 rounded-3xl border border-roseGold/40 space-y-4 animate-fade-in"
                >
                  <h3 className="font-serif font-bold text-sm text-burgundy">New Love Reminder</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">
                        Occasion Title *
                      </label>
                      <input
                        required
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Wedding Anniversary"
                        className="w-full text-xs p-2.5 rounded-xl border border-blush bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">
                        Occasion Type
                      </label>
                      <select
                        value={newType}
                        onChange={(e) => setNewType(e.target.value as any)}
                        className="w-full text-xs p-2.5 rounded-xl border border-blush bg-white"
                      >
                        <option value="Anniversary">Anniversary</option>
                        <option value="Birthday">Birthday</option>
                        <option value="First Date">First Date</option>
                        <option value="Engagement">Engagement</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">
                        Date *
                      </label>
                      <input
                        required
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-blush bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">
                        Partner's Name
                      </label>
                      <input
                        type="text"
                        value={newRecipient}
                        onChange={(e) => setNewRecipient(e.target.value)}
                        placeholder="e.g. Rohan"
                        className="w-full text-xs p-2.5 rounded-xl border border-blush bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAddReminder(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" size="sm">
                      Save Reminder
                    </Button>
                  </div>
                </form>
              )}

              {/* Reminders List */}
              <div className="space-y-3">
                {reminders.map((rem) => (
                  <div
                    key={rem._id}
                    className="bg-white p-5 rounded-2xl border border-blush shadow-xs flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-blush text-burgundy">
                        <Sparkles className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-charcoal">{rem.title}</h4>
                        <p className="text-xs text-mutedText">
                          Date: <strong className="text-burgundy">{formatDate(rem.eventDate)}</strong> • For {rem.recipientName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleToggleReminder(rem._id)}
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          rem.isActive
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {rem.isActive ? 'Active' : 'Paused'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteReminder(rem._id)}
                        className="text-mutedText hover:text-red-600 p-1.5"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-charcoal">Saved Wishlist</h2>
              {wishlistedProducts.length === 0 ? (
                <div className="bg-white rounded-3xl p-10 text-center border border-blush space-y-3">
                  <Heart className="w-12 h-12 text-roseGold mx-auto" />
                  <h3 className="font-serif text-lg font-bold text-charcoal">Your wishlist is empty</h3>
                  <p className="text-xs text-mutedText">
                    Save romantic gift ideas here to surprise your partner when the time is right.
                  </p>
                  <Link to="/shop">
                    <Button variant="primary" size="sm">
                      Browse Gifts
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistedProducts.map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blush shadow-sm space-y-4">
              <h2 className="font-serif text-xl font-bold text-charcoal border-b border-blush pb-3">
                Account Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-semibold text-mutedText">Full Name</span>
                  <p className="font-bold text-charcoal text-sm mt-0.5">{user?.name}</p>
                </div>
                <div>
                  <span className="font-semibold text-mutedText">Email Address</span>
                  <p className="font-bold text-charcoal text-sm mt-0.5">{user?.email}</p>
                </div>
                <div>
                  <span className="font-semibold text-mutedText">Account Type</span>
                  <p className="font-bold text-burgundy text-sm mt-0.5 uppercase">
                    {user?.role || 'Customer'}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-mutedText">Member Since</span>
                  <p className="font-bold text-charcoal text-sm mt-0.5">2026</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
