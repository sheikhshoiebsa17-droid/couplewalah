import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'burgundy' | 'roseGold' | 'gold' | 'blush' | 'outline' | 'success';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blush',
  size = 'sm',
  className,
}) => {
  const variants = {
    burgundy: 'bg-burgundy text-warmWhite',
    roseGold: 'bg-roseGold/20 text-roseGold-dark border border-roseGold/40',
    gold: 'bg-gold/15 text-gold-dark border border-gold/30',
    blush: 'bg-blush text-burgundy-deep',
    outline: 'border border-mutedText/30 text-charcoal bg-white/70',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 font-medium rounded-full',
    md: 'text-xs px-2.5 py-1 font-semibold rounded-full',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 select-none tracking-tight',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};
