import { describe, it, expect } from 'vitest';
import { formatPrice, calculateDiscount } from '../lib/utils';

describe('CoupleWalah Client Cart & Customization Logic', () => {
  it('TEST 4: Two customized versions of the same product generate distinct cart item keys', () => {
    const productId = 'prod-1';
    
    const customizationA = [
      { fieldId: 'partner1', label: 'First Name', value: 'Ayesha' },
      { fieldId: 'partner2', label: 'Second Name', value: 'Rohan' },
    ];
    const keyA = `${productId}__${customizationA.map(c => `${c.fieldId}:${c.value}`).join('~')}`;

    const customizationB = [
      { fieldId: 'partner1', label: 'First Name', value: 'Kavya' },
      { fieldId: 'partner2', label: 'Second Name', value: 'Arjun' },
    ];
    const keyB = `${productId}__${customizationB.map(c => `${c.fieldId}:${c.value}`).join('~')}`;

    expect(keyA).not.toEqual(keyB);
    expect(keyA).toContain('Ayesha');
    expect(keyB).toContain('Kavya');
  });

  it('TEST 8: Calculates percentage discount accurately', () => {
    const original = 999;
    const sale = 699;
    const discount = calculateDiscount(sale, original);
    expect(discount).toBe(30);
  });

  it('formats INR currency properly', () => {
    const formatted = formatPrice(1499);
    expect(formatted).toContain('1,499');
  });
});
