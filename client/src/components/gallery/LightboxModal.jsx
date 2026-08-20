import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const LightboxModal = ({ isOpen, activeImage, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !activeImage) return null;

  // Normalize field names — API may return image/title OR url/caption
  const imgSrc = activeImage.image || activeImage.url;
  const imgAlt = activeImage.title || activeImage.caption || activeImage.alt || '1522 Mumbai Gallery';
  const imgCaption = activeImage.title || activeImage.caption;
  const imgCategory = activeImage.category;

  return (
    <div 
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-charcoal-950/95 backdrop-blur-2xl p-4 sm:p-8 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 text-stone-300 hover:text-stone-100 p-2.5 rounded-full bg-charcoal-850/90 border border-stone-700 hover:bg-charcoal-750 transition-colors shadow-xl"
        aria-label="Close lightbox (ESC)"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Navigation Left */}
      <button
        onClick={onPrev}
        className="absolute left-3 sm:left-6 z-20 text-stone-300 hover:text-stone-100 p-2.5 sm:p-3 rounded-full bg-charcoal-850/90 border border-stone-700 hover:bg-charcoal-750 transition-colors flex items-center justify-center shadow-xl"
        aria-label="Previous image (Left Arrow)"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Main Image Container */}
      <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center relative z-10 px-16">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={imgAlt}
            className="max-w-full max-h-[65vh] sm:max-h-[72vh] object-contain rounded-2xl shadow-2xl border border-stone-800"
          />
        ) : (
          <div className="w-full h-64 bg-charcoal-800 rounded-2xl flex items-center justify-center text-stone-500 text-sm">
            Image not available
          </div>
        )}
        {(imgCaption || imgCategory) && (
          <div className="mt-4 text-center max-w-xl">
            {imgCategory && (
              <span className="text-[10px] uppercase tracking-widest text-terracotta-400 font-sans font-bold block mb-1">
                {imgCategory}
              </span>
            )}
            {imgCaption && (
              <p className="font-serif text-base sm:text-lg text-stone-100 font-light">
                {imgCaption}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Navigation Right */}
      <button
        onClick={onNext}
        className="absolute right-3 sm:right-6 z-20 text-stone-300 hover:text-stone-100 p-2.5 sm:p-3 rounded-full bg-charcoal-850/90 border border-stone-700 hover:bg-charcoal-750 transition-colors flex items-center justify-center shadow-xl"
        aria-label="Next image (Right Arrow)"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
};

export default LightboxModal;
