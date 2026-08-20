import React from 'react';

export const Badge = ({
  children,
  variant = 'default', // 'default', 'terracotta', 'olive', 'outline', 'gold'
  className = '',
}) => {
  const base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold tracking-wider uppercase";

  const variants = {
    default: "bg-charcoal-700 text-stone-200 border border-stone-600/40",
    terracotta: "bg-terracotta-500/15 text-terracotta-300 border border-terracotta-500/30",
    olive: "bg-olive-600/20 text-olive-400 border border-olive-500/30",
    outline: "border border-stone-600/60 text-stone-300 bg-charcoal-900/40",
    gold: "bg-amber-950/40 text-amber-200 border border-amber-500/30",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
