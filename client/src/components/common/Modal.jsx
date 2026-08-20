import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-2xl',
  className = '',
}) => {
  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-950/85 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Dialog Box */}
      <div
        className={`relative w-full ${maxWidth} bg-charcoal-900 border border-stone-700/60 rounded-2xl shadow-2xl overflow-hidden z-10 animate-slide-up ${className}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-stone-800 bg-charcoal-850/80">
          <div>
            {subtitle && (
              <p className="text-[11px] uppercase tracking-widest text-terracotta-400 font-sans font-semibold mb-1">
                {subtitle}
              </p>
            )}
            <h3 className="text-xl sm:text-2xl font-serif text-stone-100 font-normal">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-100 p-2 rounded-lg bg-charcoal-800/80 hover:bg-charcoal-700 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
