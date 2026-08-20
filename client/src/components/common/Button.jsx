import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost', 'accent'
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-sans font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500/50 disabled:opacity-50 disabled:cursor-not-allowed select-none tracking-luxury uppercase text-xs";

  const sizeStyles = {
    sm: "px-4 py-2 text-[11px] gap-1.5",
    md: "px-6 py-3 text-xs gap-2",
    lg: "px-8 py-4 text-sm gap-2.5",
  };

  const variantStyles = {
    primary: "bg-terracotta-500 text-stone-50 hover:bg-terracotta-600 shadow-md hover:shadow-glow-terracotta active:scale-[0.99]",
    secondary: "bg-charcoal-750 text-stone-100 hover:bg-charcoal-700 border border-stone-800 hover:border-stone-600 active:scale-[0.99]",
    outline: "bg-transparent text-stone-200 border border-stone-600 hover:border-terracotta-400 hover:text-terracotta-400 active:scale-[0.99]",
    ghost: "bg-transparent text-stone-300 hover:text-stone-100 hover:bg-charcoal-800/60",
    accent: "bg-stone-100 text-charcoal-950 hover:bg-stone-200 shadow-lg font-semibold active:scale-[0.99]",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : Icon && iconPosition === 'left' ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      
      <span>{children}</span>

      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
};

export default Button;
