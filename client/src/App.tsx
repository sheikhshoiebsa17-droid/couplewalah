import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { MainLayout } from './layouts/MainLayout';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { GiftStudioPage } from './pages/GiftStudioPage';
import { GiftFinderPage } from './pages/GiftFinderPage';
import { CoupleBundlesPage } from './pages/CoupleBundlesPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage, TrackOrderPage } from './pages/OrderSuccessPage';
import { LoginPage, RegisterPage, ForgotPasswordPage } from './pages/AuthPages';
import { AccountPage } from './pages/AccountPages';
import { AdminDashboardPage } from './pages/AdminPages';
import {
  AboutPage,
  ContactPage,
  FAQPage,
  PolicyPage,
} from './pages/StaticPages';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                {/* Main Storefront Layout */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/category/:slug" element={<ShopPage />} />
                  <Route path="/occasions/:slug" element={<ShopPage />} />
                  <Route path="/search" element={<ShopPage />} />
                  <Route path="/personalized-gifts" element={<ShopPage />} />
                  <Route path="/product/:slug" element={<ProductDetailPage />} />

                  {/* Feature Routes */}
                  <Route path="/gift-studio/:productId" element={<GiftStudioPage />} />
                  <Route path="/gift-studio" element={<GiftStudioPage />} />
                  <Route path="/gift-finder" element={<GiftFinderPage />} />
                  <Route path="/couple-bundles" element={<CoupleBundlesPage />} />

                  {/* Cart & Checkout */}
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
                  <Route path="/track-order" element={<TrackOrderPage />} />

                  {/* Customer Portal */}
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/account/*" element={<AccountPage />} />

                  {/* Auth */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                  {/* Static & Legal Pages */}
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route
                    path="/shipping-policy"
                    element={
                      <PolicyPage
                        title="Shipping Policy"
                        content={[
                          'At CoupleWalah, we treat every couple parcel as precious cargo. All items are securely packed in premium cartons.',
                          'Standard orders are dispatched within 24–48 hours. Personalized keepsakes require 24 hours of artisan laser-engraving and inspection before shipping.',
                          'Express air delivery across India typically takes 3 to 5 business days. Free shipping is automatically applied to all orders above ₹999.',
                        ]}
                      />
                    }
                  />
                  <Route
                    path="/returns-policy"
                    element={
                      <PolicyPage
                        title="Return and Refund Policy"
                        content={[
                          'We want you and your partner to be overjoyed with your gift. In the rare event of transit damage or manufacturing defects, we offer a free 7-day hassle-free replacement.',
                          'Due to their custom nature, personalized name-engraved items and customized photo lamps cannot be returned for buyer remorse, but will be replaced instantly if received defective.',
                          'Refunds for eligible cancellations or approved returns are credited back to your original payment method within 5–7 business days.',
                        ]}
                      />
                    }
                  />
                  <Route
                    path="/privacy-policy"
                    element={
                      <PolicyPage
                        title="Privacy Policy"
                        content={[
                          'CoupleWalah strictly protects customer privacy. We never sell, rent, or share your personal details with third-party advertising brokers.',
                          'Customer photos uploaded for 3D photo lamps and personalized frames are used solely for engraving and permanently deleted from working caches after delivery.',
                          'Secret Gift Mode transactions strictly maintain recipient confidentiality: invoice prices are suppressed on packing slips upon request.',
                        ]}
                      />
                    }
                  />
                  <Route
                    path="/terms"
                    element={
                      <PolicyPage
                        title="Terms and Conditions"
                        content={[
                          'By accessing CoupleWalah, you agree to our terms of service and order fulfillment policies.',
                          'Prices listed include applicable taxes. We reserve the right to correct typographical errors in promotional coupons or pricing before order confirmation.',
                        ]}
                      />
                    }
                  />
                </Route>

                {/* Admin Operations Portal */}
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/*" element={<AdminDashboardPage />} />

                {/* Catch-all 404 redirect to Home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
