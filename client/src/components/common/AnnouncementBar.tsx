import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

const MESSAGES = [
  "Make Every Moment Special.",
  "Thoughtful Gifts for Your Favourite Person.",
  "Celebrate Your Love Story.",
  "Every Couple Has a Story. Make Yours Special.",
];

export const AnnouncementBar: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-burgundy-deep text-warmWhite text-xs py-2 px-4 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 font-medium tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-gold shrink-0 animate-pulse" />
        <span className="transition-opacity duration-300 text-center font-sans">
          {MESSAGES[index]}
        </span>
        <Heart className="w-3.5 h-3.5 text-blush shrink-0 fill-current" />
      </div>
    </div>
  );
};
