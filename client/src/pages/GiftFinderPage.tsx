import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Heart,
  CheckCircle2,
  Gift,
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/common/ProductCard';
import { Button } from '../components/common/Button';
import { Product } from '@couplewalah/shared';

interface RankedResult {
  product: Product;
  score: number;
  reason: string;
}

export const GiftFinderPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState('');
  const [budget, setBudget] = useState('');
  const [giftType, setGiftType] = useState('');
  const [results, setResults] = useState<RankedResult[] | null>(null);

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      calculateRecommendations();
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleRestart = () => {
    setStep(1);
    setRecipient('');
    setOccasion('');
    setBudget('');
    setGiftType('');
    setResults(null);
  };

  const calculateRecommendations = () => {
    const scored: RankedResult[] = INITIAL_PRODUCTS.map((p) => {
      let score = 0;
      const reasons: string[] = [];

      // Budget check
      if (budget === '299-499' && p.price >= 299 && p.price <= 499) {
        score += 35;
        reasons.push('Fits your ₹299–₹499 budget');
      } else if (budget === '500-999' && p.price >= 500 && p.price <= 999) {
        score += 35;
        reasons.push('Matches your ₹500–₹999 price preference');
      } else if (budget === '1000-1999' && p.price >= 1000 && p.price <= 1999) {
        score += 35;
        reasons.push('Matches your ₹1,000–₹1,999 budget');
      } else if (budget === '2000+' && p.price >= 2000) {
        score += 35;
        reasons.push('Luxury tier within your premium budget');
      }

      // Occasion check
      if (occasion && p.occasions.some((o) => o.toLowerCase().includes(occasion.toLowerCase()))) {
        score += 30;
        reasons.push(`Specially designed for ${occasion} milestones`);
      }

      // Recipient compatibility
      if (recipient) {
        const isHim = ['Boyfriend', 'Husband'].includes(recipient);
        const isHer = ['Girlfriend', 'Wife'].includes(recipient);
        if (p.recipient.includes('Couple') || (isHim && p.recipient.includes('Him')) || (isHer && p.recipient.includes('Her'))) {
          score += 20;
          reasons.push(`Beloved gift choice for your ${recipient}`);
        }
      }

      // Preferred type
      if (giftType === 'Personalized' && p.isPersonalizable) {
        score += 25;
        reasons.push('Customizable with your names & dates');
      } else if (giftType === 'Matching Couple Gifts' && p.categories.includes('Matching Bracelets')) {
        score += 25;
        reasons.push('Matching wearable couple keepsakes');
      } else if (giftType === 'Photo Gifts' && p.categories.includes('Custom Photo Gifts')) {
        score += 25;
        reasons.push('Features your favourite photo memory');
      } else if (giftType === 'Gift Hampers' && p.categories.includes('Romantic Hampers')) {
        score += 25;
        reasons.push('Complete multi-gift luxury package');
      }

      return {
        product: p,
        score,
        reason: reasons.slice(0, 2).join(' • ') || 'A thoughtful romantic present',
      };
    });

    scored.sort((a, b) => b.score - a.score);
    setResults(scored.slice(0, 4));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Intro */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush text-burgundy text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-gold" /> Smart Gift Matchmaker
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
          Find the Perfect Romantic Gift
        </h1>
        <p className="text-xs sm:text-sm text-mutedText max-w-lg mx-auto">
          Take 60 seconds to tell us about your partner. We'll curate ideal personalized presents guaranteed to make them smile.
        </p>
      </div>

      {!results ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-blush shadow-premium space-y-8">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-mutedText mb-2">
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-blush-light rounded-full h-2 overflow-hidden">
              <div
                className="bg-burgundy h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                1. Who are you shopping for?
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Girlfriend', 'Boyfriend', 'Wife', 'Husband', 'Fiancé', 'Partner'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRecipient(r)}
                    className={`p-4 rounded-2xl border text-center font-medium text-sm transition-all ${
                      recipient === r
                        ? 'border-burgundy bg-blush text-burgundy font-bold shadow-soft'
                        : 'border-blush text-charcoal hover:border-burgundy/40'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                2. What is the occasion?
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'Birthday',
                  'Anniversary',
                  'Wedding',
                  'Engagement',
                  'Valentine\'s Day',
                  'Long-Distance Surprise',
                  'Just Because',
                ].map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setOccasion(occ)}
                    className={`p-4 rounded-2xl border text-center font-medium text-xs sm:text-sm transition-all ${
                      occasion === occ
                        ? 'border-burgundy bg-blush text-burgundy font-bold shadow-soft'
                        : 'border-blush text-charcoal hover:border-burgundy/40'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                3. What is your budget?
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: '₹299 – ₹499 (Thoughtful Tokens)', val: '299-499' },
                  { label: '₹500 – ₹999 (Popular Keepsakes)', val: '500-999' },
                  { label: '₹1,000 – ₹1,999 (Signature Hampers)', val: '1000-1999' },
                  { label: '₹2,000+ (Grand Luxury)', val: '2000+' },
                ].map((b) => (
                  <button
                    key={b.val}
                    type="button"
                    onClick={() => setBudget(b.val)}
                    className={`p-4 rounded-2xl border text-left font-medium text-xs sm:text-sm transition-all ${
                      budget === b.val
                        ? 'border-burgundy bg-blush text-burgundy font-bold shadow-soft'
                        : 'border-blush text-charcoal hover:border-burgundy/40'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                4. What type of gift do you prefer?
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Personalized',
                  'Romantic',
                  'Practical',
                  'Matching Couple Gifts',
                  'Photo Gifts',
                  'Gift Hampers',
                ].map((gt) => (
                  <button
                    key={gt}
                    type="button"
                    onClick={() => setGiftType(gt)}
                    className={`p-4 rounded-2xl border text-center font-medium text-xs sm:text-sm transition-all ${
                      giftType === gt
                        ? 'border-burgundy bg-blush text-burgundy font-bold shadow-soft'
                        : 'border-blush text-charcoal hover:border-burgundy/40'
                    }`}
                  >
                    {gt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-blush/60">
            {step > 1 ? (
              <Button
                variant="outline"
                size="md"
                onClick={handlePrev}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Previous
              </Button>
            ) : <div />}

            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              disabled={
                (step === 1 && !recipient) ||
                (step === 2 && !occasion) ||
                (step === 3 && !budget) ||
                (step === 4 && !giftType)
              }
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {step === totalSteps ? 'See Recommendations' : 'Continue'}
            </Button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-8 animate-fade-in">
          {/* Summary Banner */}
          <div className="bg-blush rounded-2xl p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 border border-roseGold/40">
            <div className="text-xs space-y-1">
              <span className="font-bold uppercase tracking-wider text-burgundy">Your Match Criteria:</span>
              <p className="text-charcoal font-medium">
                For {recipient} • {occasion} • {giftType}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRestart}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Start Over
            </Button>
          </div>

          <h2 className="font-serif text-2xl font-bold text-charcoal">
            Top Recommendations For You:
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {results.map(({ product, reason, score }) => (
              <div key={product._id} className="relative">
                <ProductCard product={product} />
                <div className="mt-2 p-2.5 rounded-xl bg-warmWhite border border-blush/80 text-xs text-charcoal flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold shrink-0" />
                  <span className="text-[11px] leading-tight text-mutedText">
                    <strong className="text-burgundy">Why it fits:</strong> {reason}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
