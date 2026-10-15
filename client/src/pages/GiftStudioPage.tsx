import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  Image as ImageIcon,
  Heart,
  Package,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '../data/mockData';
import { formatPrice } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const GiftStudioPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const personalizableProducts = INITIAL_PRODUCTS.filter((p) => p.isPersonalizable);

  const [selectedProduct, setSelectedProduct] = useState(
    personalizableProducts.find((p) => p._id === productId) || personalizableProducts[0]
  );

  const [partner1, setPartner1] = useState('Ayesha');
  const [partner2, setPartner2] = useState('Rohan');
  const [specialDate, setSpecialDate] = useState('2024-02-14');
  const [message, setMessage] = useState('Always & Forever Since Day One');
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [packagingChoice, setPackagingChoice] = useState('luxury-box');
  const [isSuccess, setIsSuccess] = useState(false);

  const { addToCart } = useCart();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddStudioGift = () => {
    if (!partner1.trim() || !partner2.trim()) {
      alert('Please provide names for both partners.');
      return;
    }

    const personalizationValues = [
      { fieldId: 'partner1', label: 'First Name', value: partner1.trim() },
      { fieldId: 'partner2', label: 'Second Name', value: partner2.trim() },
      { fieldId: 'specialDate', label: 'Anniversary Date', value: specialDate },
      { fieldId: 'message', label: 'Custom Message', value: message.trim() },
    ];

    if (uploadedPhoto) {
      personalizationValues.push({
        fieldId: 'couplePhoto',
        label: 'Photo Attached',
        value: 'Customer Portrait Uploaded',
      });
    }

    addToCart({
      productId: selectedProduct._id,
      name: selectedProduct.name,
      slug: selectedProduct.slug,
      price: selectedProduct.price,
      compareAtPrice: selectedProduct.compareAtPrice,
      image: selectedProduct.images[0] || '/coplWlh.png',
      quantity: 1,
      isPersonalized: true,
      personalizationValues,
    });

    setIsSuccess(true);
    setTimeout(() => {
      navigate('/cart');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-burgundy/10 text-burgundy text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-gold" /> Personalized Gift Studio
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal">
          Design Your Bespoke Keepsake
        </h1>
        <p className="text-sm text-mutedText">
          Watch your custom names, anniversary date, and heartfelt vows come alive on our artisan gifts in real time.
        </p>
      </div>

      {/* Product Selector Ribbon */}
      <div className="mb-10">
        <label className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-3">
          1. Choose a Customizable Item:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {personalizableProducts.map((p) => (
            <button
              key={p._id}
              type="button"
              onClick={() => setSelectedProduct(p)}
              className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                selectedProduct._id === p._id
                  ? 'border-burgundy bg-blush shadow-soft ring-2 ring-burgundy/20'
                  : 'border-blush/80 bg-white hover:border-burgundy/40'
              }`}
            >
              <img
                src={p.images[0]}
                alt={p.name}
                className="w-12 h-12 rounded-xl object-cover shrink-0"
              />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-charcoal truncate">{p.name}</p>
                <p className="text-xs font-semibold text-burgundy">{formatPrice(p.price)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Split: Studio Controls vs Live Preview Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Customization Controls */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-blush shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-bold text-charcoal border-b border-blush/60 pb-3">
            2. Personalization Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Partner 1 Name *
              </label>
              <input
                type="text"
                maxLength={20}
                value={partner1}
                onChange={(e) => setPartner1(e.target.value)}
                placeholder="e.g. Ayesha"
                className="w-full text-xs p-3 rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Partner 2 Name *
              </label>
              <input
                type="text"
                maxLength={20}
                value={partner2}
                onChange={(e) => setPartner2(e.target.value)}
                placeholder="e.g. Rohan"
                className="w-full text-xs p-3 rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              Special Anniversary or Milestone Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={specialDate}
                onChange={(e) => setSpecialDate(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-charcoal">
                Engraved Vow or Personal Message
              </label>
              <span className="text-[10px] text-mutedText">{message.length}/100</span>
            </div>
            <textarea
              rows={3}
              maxLength={100}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Always & Forever Since Day One"
              className="w-full text-xs p-3 rounded-xl border border-blush focus:outline-none focus:ring-1 focus:ring-burgundy"
            />
          </div>

          {/* Photo Upload if supported */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-charcoal mb-2">
              Attach Couple Photograph (Optional for laser-etching)
            </label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-burgundy/40 bg-blush-light text-burgundy text-xs font-semibold hover:bg-blush transition-colors">
                <ImageIcon className="w-4 h-4 text-gold" />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              {uploadedPhoto && (
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Ready for engraving
                </span>
              )}
            </div>
          </div>

          {/* Packaging choice */}
          <div className="pt-4 border-t border-blush/60 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal">
              3. Select Presentation Packaging:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPackagingChoice('luxury-box')}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  packagingChoice === 'luxury-box'
                    ? 'border-burgundy bg-blush font-semibold text-burgundy'
                    : 'border-blush text-charcoal'
                }`}
              >
                <Package className="w-4 h-4 mb-1 text-gold" />
                <span>Luxury CoupleWalah Box</span>
              </button>
              <button
                type="button"
                onClick={() => setPackagingChoice('standard-eco')}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  packagingChoice === 'standard-eco'
                    ? 'border-burgundy bg-blush font-semibold text-burgundy'
                    : 'border-blush text-charcoal'
                }`}
              >
                <Package className="w-4 h-4 mb-1 text-mutedText" />
                <span>Minimalist Eco Wrap</span>
              </button>
            </div>
          </div>

          <Button
            size="lg"
            variant="primary"
            className="w-full"
            onClick={handleAddStudioGift}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {isSuccess ? 'Adding to Cart...' : `Add Customized ${selectedProduct.name} to Cart`}
          </Button>
        </div>

        {/* Right Column: Live Artisan Preview Canvas */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-blush shadow-premium space-y-4 sticky top-28">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-burgundy flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold" /> Live Artisan Preview
            </span>
            <span className="text-[11px] text-mutedText">Instant simulation</span>
          </div>

          {/* Realistic Mockup Canvas with overlaid dynamic text */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-blush-light border border-blush flex items-center justify-center shadow-inner">
            <img
              src={selectedProduct.images[0]}
              alt="Preview"
              className="w-full h-full object-cover filter brightness-95"
            />
            {/* Dark glass overlay with simulated gold laser engraving */}
            <div className="absolute inset-8 rounded-2xl bg-black/40 backdrop-blur-[2px] p-6 flex flex-col items-center justify-center text-center border border-gold/40 shadow-2xl">
              <Heart className="w-6 h-6 text-gold fill-gold/20 mb-2 animate-pulse" />
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
                {partner1 || 'Partner 1'} <span className="text-gold">&</span> {partner2 || 'Partner 2'}
              </h3>
              {specialDate && (
                <p className="text-xs uppercase tracking-widest text-gold mt-1.5 font-medium">
                  Est. {new Date(specialDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              )}
              {message && (
                <p className="text-xs text-warmWhite italic mt-3 max-w-xs font-serif leading-relaxed border-t border-gold/30 pt-2">
                  "{message}"
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-2">
            <div>
              <span className="font-serif font-bold text-charcoal">{selectedProduct.name}</span>
              <p className="text-mutedText">Individual Hand-Carved Piece</p>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-burgundy">
                {formatPrice(selectedProduct.price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
