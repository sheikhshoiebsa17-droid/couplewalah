import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, HelpCircle, ShieldCheck, Heart } from 'lucide-react';
import { Button } from '../components/common/Button';

export const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-16">
    <div className="text-center mb-12">
      <Heart className="w-10 h-10 text-burgundy fill-burgundy mx-auto mb-3" />
      <span className="text-xs uppercase tracking-widest text-burgundy font-bold">Our Philosophy</span>
      <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal mt-2">Every Couple Has a Story.</h1>
    </div>
    <div className="prose prose-burgundy max-w-none text-charcoal space-y-6 text-sm sm:text-base leading-relaxed bg-white p-8 sm:p-12 rounded-3xl border border-blush shadow-sm">
      <p>
        CoupleWalah was born from a simple belief: modern love deserves meaningful celebration. In a world full of generic gifts and mass-produced gadgets, romantic milestones often received uninspired tokens.
      </p>
      <p>
        We set out to build an intimate, dedicated gifting atelier solely focused on the beauty of human connection. From the moment two hearts meet, through first dates, engagements, wedding anniversaries, and long-distance chapters — our mission is to translate your memories into tangible, lasting keepsakes.
      </p>
      <h3 className="font-serif text-xl font-bold text-burgundy pt-4">Artisan Craftsmanship & Sincerity</h3>
      <p>
        Every piece in our collection — whether a laser-etched 3D photo lamp, a custom oak anniversary frame, or sterling silver initial rings — is crafted with precision, inspected by human eyes, and packed in luxury gift packaging.
      </p>
      <p>
        We pledge complete transparency: no artificial countdown timers, no fabricated reviews, and dedicated customer care that treats your celebration as our very own.
      </p>
    </div>
  </div>
);

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-burgundy font-bold">Concierge Support</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-2">We’re Here for Your Love Story</h1>
        <p className="text-sm text-mutedText mt-2">Questions about custom engraving, secret gifting, or delivery timelines?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 bg-charcoal text-warmWhite p-8 rounded-3xl space-y-6">
          <h3 className="font-serif text-xl font-bold text-gold">Get in Touch</h3>
          <p className="text-xs text-mutedText leading-relaxed">
            Our customer concierge team is available Monday to Saturday, 9:00 AM to 7:00 PM IST.
          </p>
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-roseGold" />
              <span>care@couplewalah.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-roseGold" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-roseGold" />
              <span>CoupleWalah Design Studio, New Delhi, India</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 bg-white p-8 rounded-3xl border border-blush shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-xl font-bold text-charcoal">Message Received</h3>
              <p className="text-xs text-mutedText max-w-sm mx-auto">
                Thank you for writing to us. Our concierge team will respond within 4 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Your Name</label>
                <input required type="text" className="w-full px-4 py-2.5 rounded-xl border border-blush text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/20" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Email Address</label>
                  <input required type="email" className="w-full px-4 py-2.5 rounded-xl border border-blush text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/20" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">Order ID (Optional)</label>
                  <input type="text" placeholder="e.g. CW-1002" className="w-full px-4 py-2.5 rounded-xl border border-blush text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/20" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Message / Query</label>
                <textarea required rows={4} className="w-full px-4 py-2.5 rounded-xl border border-blush text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/20" placeholder="How can we assist your gifting surprise?" />
              </div>
              <Button type="submit" variant="primary" className="w-full" rightIcon={<Send className="w-4 h-4" />}>
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const FAQPage: React.FC = () => {
  const faqs = [
    {
      q: 'How does personalization work?',
      a: 'Simply select any item tagged with "Personalized" and enter your desired names, date, or photo upload in the Gift Studio. We format, align, and laser-engrave or print your personalized keepsake precisely as configured.',
    },
    {
      q: 'What is Secret Gift Mode?',
      a: 'Secret Gift Mode is our surprise delivery service. We hide product prices from the packing slip, ship in discreet unbranded outer boxes, and package the gift in luxury satin ribbon wrapping with a personalized greeting card.',
    },
    {
      q: 'How long does delivery take?',
      a: 'Standard orders ship within 24-48 hours. Personalized items require 1 additional day for handcrafted engraving. Delivery across India typically takes 3-5 business days via premium air couriers.',
    },
    {
      q: 'Can I track my order live?',
      a: 'Yes! As soon as your order is dispatched, you will receive a tracking link via email/SMS, and you can track real-time status on our Track Order page at any time.',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <HelpCircle className="w-10 h-10 text-burgundy mx-auto mb-2" />
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">Frequently Asked Questions</h1>
      </div>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-blush shadow-xs">
            <h3 className="font-serif text-base font-bold text-charcoal">{f.q}</h3>
            <p className="text-xs sm:text-sm text-mutedText mt-2 leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PolicyPage: React.FC<{ title: string; content: string[] }> = ({ title, content }) => (
  <div className="max-w-3xl mx-auto px-4 py-16">
    <div className="bg-white p-8 sm:p-12 rounded-3xl border border-blush shadow-sm space-y-4">
      <h1 className="font-serif text-3xl font-bold text-charcoal border-b border-blush pb-4">{title}</h1>
      {content.map((p, i) => (
        <p key={i} className="text-xs sm:text-sm text-mutedText leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  </div>
);
