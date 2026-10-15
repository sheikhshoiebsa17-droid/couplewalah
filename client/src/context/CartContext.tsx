import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, SecretGiftDetails } from '@couplewalah/shared';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  packagingFee: number;
  discountAmount: number;
  total: number;
  couponCode: string | null;
  secretGift: SecretGiftDetails;
  addToCart: (
    item: Omit<CartItem, 'id'>,
    customizationKey?: string
  ) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  updateSecretGift: (details: Partial<SecretGiftDetails>) => void;
}

const DEFAULT_SECRET_GIFT: SecretGiftDetails = {
  isSecretGift: false,
  giftPackagingPrice: 0,
  recipientName: '',
  hidePricesOnSlip: true,
  discreetPackaging: true,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cw_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState<string | null>(() => {
    return localStorage.getItem('cw_coupon');
  });

  const [secretGift, setSecretGift] = useState<SecretGiftDetails>(() => {
    try {
      const saved = localStorage.getItem('cw_secret_gift');
      return saved ? JSON.parse(saved) : DEFAULT_SECRET_GIFT;
    } catch {
      return DEFAULT_SECRET_GIFT;
    }
  });

  useEffect(() => {
    localStorage.setItem('cw_cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (couponCode) {
      localStorage.setItem('cw_coupon', couponCode);
    } else {
      localStorage.removeItem('cw_coupon');
    }
  }, [couponCode]);

  useEffect(() => {
    localStorage.setItem('cw_secret_gift', JSON.stringify(secretGift));
  }, [secretGift]);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = items.reduce((acc, item) => {
    const itemExtra = (item.personalizationValues || []).reduce(
      (extra, f) => extra + (f.additionalPrice || 0),
      0
    );
    return acc + (item.price + itemExtra) * item.quantity;
  }, 0);

  const deliveryFee = subtotal === 0 || subtotal >= 999 ? 0 : 79;
  const packagingFee = secretGift.isSecretGift ? secretGift.giftPackagingPrice || 149 : 0;

  // Simple coupon discount calculation
  let discountAmount = 0;
  if (couponCode) {
    if (couponCode.toUpperCase() === 'LOVE10') {
      discountAmount = Math.round(subtotal * 0.1);
    } else if (couponCode.toUpperCase() === 'COUPLE100' && subtotal >= 500) {
      discountAmount = 100;
    } else if (couponCode.toUpperCase() === 'FOREVER50' && subtotal >= 399) {
      discountAmount = 50;
    }
  }

  const total = Math.max(0, subtotal - discountAmount + deliveryFee + packagingFee);

  const addToCart = (
    itemData: Omit<CartItem, 'id'>,
    customizationKey?: string
  ) => {
    // Generate distinct deterministic unique ID based on product + variants + personalization
    const variantStr = itemData.selectedVariants
      ? Object.entries(itemData.selectedVariants).sort().map(([k, v]) => `${k}:${v}`).join('|')
      : '';
    const personalStr = itemData.personalizationValues
      ? itemData.personalizationValues.map(v => `${v.fieldId}:${v.value}`).join('~')
      : '';
    const uniqueId = `${itemData.productId}_${variantStr}_${personalStr || customizationKey || 'std'}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === uniqueId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + itemData.quantity,
        };
        return next;
      }
      return [...prev, { ...itemData, id: uniqueId, addedAt: new Date().toISOString() }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.min(10, quantity) } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode(null);
    setSecretGift(DEFAULT_SECRET_GIFT);
  };

  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    const clean = code.trim().toUpperCase();
    if (clean === 'LOVE10') {
      setCouponCode(clean);
      return { success: true, message: '10% discount coupon applied successfully!' };
    }
    if (clean === 'COUPLE100') {
      if (subtotal < 500) {
        return { success: false, message: 'Coupon COUPLE100 requires a minimum order of ₹500.' };
      }
      setCouponCode(clean);
      return { success: true, message: '₹100 discount coupon applied!' };
    }
    if (clean === 'FOREVER50') {
      if (subtotal < 399) {
        return { success: false, message: 'Coupon FOREVER50 requires a minimum order of ₹399.' };
      }
      setCouponCode(clean);
      return { success: true, message: '₹50 off coupon applied!' };
    }
    return { success: false, message: 'Invalid or expired coupon code.' };
  };

  const removeCoupon = () => {
    setCouponCode(null);
  };

  const updateSecretGift = (details: Partial<SecretGiftDetails>) => {
    setSecretGift((prev) => ({ ...prev, ...details }));
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        deliveryFee,
        packagingFee,
        discountAmount,
        total,
        couponCode,
        secretGift,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        updateSecretGift,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
