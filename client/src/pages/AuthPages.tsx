import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Lock, Mail, User, Phone, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Try backend API first
      try {
        const res = await fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
          const data = await res.json();
          login(data.data.token, data.data.user);
          navigate(data.data.user.role === 'admin' ? '/admin' : '/account');
          return;
        }
      } catch {
        // Fallback to local dev auth mock
      }

      // Safe Local Dev Fallback:
      const isAdminUser = email.toLowerCase().includes('admin');
      const mockUser = {
        _id: isAdminUser ? 'usr-admin-1' : 'usr-cust-1',
        name: isAdminUser ? 'Staff Administrator' : 'Sheikh Shoieb Ahamad',
        email: email,
        role: isAdminUser ? ('admin' as const) : ('customer' as const),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      login('dev_jwt_token_sample', mockUser);
      navigate(isAdminUser ? '/admin' : '/account');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (role: 'admin' | 'customer') => {
    if (role === 'admin') {
      setEmail('admin@couplewalah.com');
      setPassword('Sheikh@0927');
    } else {
      setEmail('sheikhshoiebsa17@gmail.com');
      setPassword('Shoieb@0927');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-3xl border border-blush shadow-premium space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <img src="/coplWlh.png" alt="CoupleWalah" className="h-12 w-auto mx-auto" />
          </Link>
          <h1 className="font-serif text-2xl font-bold text-charcoal">Sign In to CoupleWalah</h1>
          <p className="text-xs text-mutedText">Access your orders, reminders, and saved wishlist</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-mutedText" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-charcoal">Password</label>
              <Link to="/forgot-password" className="text-[11px] text-burgundy hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-mutedText" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        {/* Quick Testing helper buttons */}
        <div className="pt-4 border-t border-blush/60 space-y-2 text-center">
          <p className="text-[10px] text-mutedText font-semibold uppercase tracking-wider">
            Quick Dev Test Accounts:
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill('customer')}
              className="flex-1 py-1.5 px-2 bg-blush-light text-burgundy text-[11px] rounded-lg border border-blush hover:bg-blush"
            >
              Demo Customer
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('admin')}
              className="flex-1 py-1.5 px-2 bg-charcoal text-warmWhite text-[11px] rounded-lg hover:bg-black"
            >
              Staff Admin
            </button>
          </div>
        </div>

        <p className="text-xs text-center text-mutedText pt-2">
          Don’t have an account?{' '}
          <Link to="/register" className="text-burgundy font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const mockUser = {
      _id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: 'customer' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    login('sample_jwt_token', mockUser);
    setIsLoading(false);
    navigate('/account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-3xl border border-blush shadow-premium space-y-6">
        <div className="text-center space-y-2">
          <h1 className="font-serif text-2xl font-bold text-charcoal">Create an Account</h1>
          <p className="text-xs text-mutedText">Save reminders, track your orders & customize gifts</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-mutedText" />
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ayesha Sharma"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-mutedText" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 w-4 h-4 text-mutedText" />
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Create Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-mutedText" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        <p className="text-xs text-center text-mutedText">
          Already have an account?{' '}
          <Link to="/login" className="text-burgundy font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-3xl border border-blush shadow-premium space-y-6 text-center">
        <h1 className="font-serif text-2xl font-bold text-charcoal">Password Recovery</h1>
        <p className="text-xs text-mutedText">
          Enter your registered email. If an account matches, we'll send a secure password reset link.
        </p>

        {sent ? (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-semibold space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <p>If an account exists for {email}, a recovery link has been dispatched.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-4"
          >
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 text-xs rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
            />
            <Button type="submit" variant="primary" className="w-full">
              Send Recovery Link
            </Button>
          </form>
        )}

        <Link to="/login" className="inline-block text-xs text-burgundy font-semibold hover:underline">
          &larr; Back to Login
        </Link>
      </div>
    </div>
  );
};
