import React from 'react';

export const SectionHeading = ({
  badge,
  title,
  subtitle,
  align = 'center', // 'left', 'center', 'right'
  className = '',
}) => {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  return (
    <div className={`flex flex-col max-w-3xl mb-12 sm:mb-16 ${alignClass} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-6 h-px bg-terracotta-500/60 inline-block" />
          <span className="text-[11px] font-sans font-semibold tracking-widest text-terracotta-400 uppercase">
            {badge}
          </span>
          <span className="w-6 h-px bg-terracotta-500/60 inline-block" />
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-stone-100 font-normal leading-[1.15] mb-4">
        {title}
      </h2>

      {subtitle && (
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-sans max-w-2xl font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
