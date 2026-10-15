import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  TrendingUp,
  ShoppingBag,
  Users,
  AlertTriangle,
  Package,
  Plus,
  Tag,
  BarChart3,
  Search,
  CheckCircle2,
  Clock,
  Edit,
  Trash2,
} from 'lucide-react';
import { INITIAL_PRODUCTS, INITIAL_BUNDLES } from '../data/mockData';
import { formatPrice } from '../lib/utils';
import { Button } from '../components/common/Button';
import { OrderStatus, Product, Coupon } from '@couplewalah/shared';

export const AdminDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons'>('overview');

  // Products state for admin management
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(699);
  const [newProdCategory, setNewProdCategory] = useState('Personalized Gifts');

  // Orders state
  const [orders, setOrders] = useState<any[]>(() => {
    const saved = localStorage.getItem('cw_user_orders');
    return saved
      ? JSON.parse(saved)
      : [
          {
            _id: 'ord-1001',
            orderNumber: 'CW-849201',
            customerDetails: { name: 'Ayesha Sharma', email: 'ayesha@example.com' },
            shippingAddress: { fullName: 'Rohan Verma', city: 'Mumbai' },
            items: [{ name: 'Personalized Couple Name Frame', quantity: 1, price: 699 }],
            totalAmount: 699,
            paymentStatus: 'Paid',
            orderStatus: 'Processing',
            createdAt: '2026-10-15T09:30:00Z',
          },
          {
            _id: 'ord-1002',
            orderNumber: 'CW-728192',
            customerDetails: { name: 'Vikram Das', email: 'vikram@example.com' },
            shippingAddress: { fullName: 'Pooja Iyer', city: 'Bangalore' },
            items: [{ name: 'Matching Magnetic Heart Bracelets', quantity: 2, price: 499 }],
            totalAmount: 998,
            paymentStatus: 'Paid',
            orderStatus: 'Shipped',
            createdAt: '2026-10-14T14:20:00Z',
          },
        ];
  });

  // Coupons state
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      _id: 'cp-1',
      code: 'LOVE10',
      discountType: 'percentage',
      discountValue: 10,
      minOrderValue: 0,
      timesUsed: 42,
      isActive: true,
      expiresAt: '2026-12-31',
      createdAt: '2026-01-01',
    },
    {
      _id: 'cp-2',
      code: 'COUPLE100',
      discountType: 'fixed',
      discountValue: 100,
      minOrderValue: 500,
      timesUsed: 19,
      isActive: true,
      expiresAt: '2026-12-31',
      createdAt: '2026-01-01',
    },
  ]);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;
    const newP: Product = {
      _id: `prod-${Date.now()}`,
      name: newProdName.trim(),
      slug: newProdName.toLowerCase().replace(/\s+/g, '-'),
      description: 'Handcrafted artisan keepsake designed exclusively for couples.',
      price: newProdPrice,
      sku: `CW-NEW-${Math.floor(100 + Math.random() * 900)}`,
      stock: 25,
      categories: [newProdCategory],
      occasions: ['Anniversary', 'Birthday'],
      recipient: ['Couple'],
      images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'],
      isPersonalizable: true,
      rating: 5.0,
      numReviews: 1,
      isFeatured: false,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts([newP, ...products]);
    setShowAddProduct(false);
    setNewProdName('');
  };

  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 48500);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Admin Top Header */}
      <div className="bg-charcoal text-warmWhite p-6 sm:p-8 rounded-3xl border border-roseGold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" /> CoupleWalah Staff Administration
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">Store Operations & Control</h1>
        </div>
        <Link to="/">
          <Button variant="outline" size="sm" className="text-warmWhite border-warmWhite hover:text-charcoal hover:bg-white">
            &larr; View Live Storefront
          </Button>
        </Link>
      </div>

      {/* Admin Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-blush pb-3 text-xs font-semibold">
        {[
          { id: 'overview', label: 'Dashboard & Metrics', icon: BarChart3 },
          { id: 'products', label: `Products (${products.length})`, icon: Package },
          { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
          { id: 'coupons', label: `Coupons (${coupons.length})`, icon: Tag },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full transition-colors ${
                activeTab === tab.id
                  ? 'bg-burgundy text-warmWhite'
                  : 'bg-white text-charcoal border border-blush hover:bg-blush-light'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Metrics 4-Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-blush shadow-sm space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-mutedText">
                Total Revenue
              </span>
              <p className="text-2xl font-bold text-burgundy">{formatPrice(totalRevenue)}</p>
              <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +18.4% from last month
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-blush shadow-sm space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-mutedText">
                Total Orders
              </span>
              <p className="text-2xl font-bold text-charcoal">142</p>
              <p className="text-[11px] text-mutedText">All channels (Razorpay + COD)</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-blush shadow-sm space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-mutedText">
                Active Catalog Items
              </span>
              <p className="text-2xl font-bold text-charcoal">{products.length}</p>
              <p className="text-[11px] text-mutedText">100% in stock</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-blush shadow-sm space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-mutedText">
                Registered Couples
              </span>
              <p className="text-2xl font-bold text-charcoal">512</p>
              <p className="text-[11px] text-mutedText">98% verified accounts</p>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blush shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-charcoal">Recent Incoming Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-blush-light text-mutedText font-semibold uppercase tracking-wider border-b border-blush">
                  <tr>
                    <th className="p-3">Order Number</th>
                    <th className="p-3">Buyer</th>
                    <th className="p-3">Recipient City</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blush/60">
                  {orders.map((ord) => (
                    <tr key={ord._id} className="hover:bg-warmWhite">
                      <td className="p-3 font-bold text-burgundy">{ord.orderNumber}</td>
                      <td className="p-3 font-medium text-charcoal">{ord.customerDetails.name}</td>
                      <td className="p-3 text-mutedText">{ord.shippingAddress.city}</td>
                      <td className="p-3 font-semibold text-charcoal">{formatPrice(ord.totalAmount)}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold text-[10px]">
                          {ord.paymentStatus}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-charcoal">{ord.orderStatus}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-charcoal">Product Catalogue</h3>
            <Button
              size="sm"
              variant="primary"
              onClick={() => setShowAddProduct(!showAddProduct)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add New Product
            </Button>
          </div>

          {showAddProduct && (
            <form
              onSubmit={handleAddProduct}
              className="bg-blush-light p-6 rounded-3xl border border-roseGold/40 space-y-4 animate-fade-in"
            >
              <h4 className="font-serif font-bold text-sm text-burgundy">Create New Gift</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Product Name</label>
                  <input
                    required
                    type="text"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g. Personalized Music Plaque"
                    className="w-full text-xs p-2.5 rounded-xl border border-blush bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Price (₹)</label>
                  <input
                    required
                    type="number"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-xl border border-blush bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-blush bg-white"
                  >
                    <option value="Personalized Gifts">Personalized Gifts</option>
                    <option value="Couple Rings">Couple Rings</option>
                    <option value="Romantic Hampers">Romantic Hampers</option>
                    <option value="Photo Frames">Photo Frames</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddProduct(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Product
                </Button>
              </div>
            </form>
          )}

          <div className="bg-white rounded-3xl border border-blush shadow-sm overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-blush-light text-mutedText font-semibold uppercase tracking-wider border-b border-blush">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blush/60">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-warmWhite">
                    <td className="p-3 flex items-center gap-2">
                      <img src={p.images[0]} alt="" className="w-8 h-8 rounded-lg object-cover" />
                      <span className="font-semibold text-charcoal">{p.name}</span>
                    </td>
                    <td className="p-3 font-bold text-burgundy">{formatPrice(p.price)}</td>
                    <td className="p-3 font-semibold text-charcoal">{p.stock} units</td>
                    <td className="p-3">
                      {p.isPersonalizable ? (
                        <span className="px-2 py-0.5 rounded-full bg-blush text-burgundy font-semibold text-[10px]">
                          Personalizable
                        </span>
                      ) : (
                        <span className="text-mutedText">Standard</span>
                      )}
                    </td>
                    <td className="p-3">
                      <span className="text-emerald-700 font-semibold">● Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ORDER MANAGEMENT WITH STATUS TRANSITIONS */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h3 className="font-serif text-xl font-bold text-charcoal">Order Fulfillment Pipeline</h3>
          <div className="bg-white rounded-3xl border border-blush shadow-sm overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-blush-light text-mutedText font-semibold uppercase tracking-wider border-b border-blush">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Update Order Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blush/60">
                {orders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-warmWhite">
                    <td className="p-3 font-bold text-burgundy">{ord.orderNumber}</td>
                    <td className="p-3">
                      <p className="font-semibold text-charcoal">{ord.customerDetails.name}</p>
                      <p className="text-[11px] text-mutedText">{ord.customerDetails.email}</p>
                    </td>
                    <td className="p-3 text-mutedText">{ord.items.map((i: any) => i.name).join(', ')}</td>
                    <td className="p-3 font-bold text-charcoal">{formatPrice(ord.totalAmount)}</td>
                    <td className="p-3">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(ord._id, e.target.value as OrderStatus)
                        }
                        className="text-xs p-1.5 rounded-lg border border-blush bg-white font-semibold text-charcoal focus:ring-1 focus:ring-burgundy"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Payment Confirmed">Payment Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: COUPON MANAGEMENT */}
      {activeTab === 'coupons' && (
        <div className="space-y-6">
          <h3 className="font-serif text-xl font-bold text-charcoal">Active Promotional Coupons</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coupons.map((cp) => (
              <div key={cp._id} className="bg-white p-5 rounded-2xl border border-blush shadow-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-serif font-bold text-base text-burgundy tracking-wider">
                    {cp.code}
                  </span>
                  <span className="text-emerald-700 text-xs font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-xs text-mutedText">
                  {cp.discountType === 'percentage'
                    ? `${cp.discountValue}% Off on order`
                    : `₹${cp.discountValue} Flat Discount`}
                  {cp.minOrderValue > 0 ? ` (Min order ₹${cp.minOrderValue})` : ''}
                </p>
                <div className="pt-2 text-[11px] text-mutedText border-t border-blush/60 flex justify-between">
                  <span>Used: {cp.timesUsed} times</span>
                  <span>Expires: {cp.expiresAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
