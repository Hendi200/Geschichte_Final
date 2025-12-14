
import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  bgImage?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, bgImage, align = 'center', className = '' }) => {
  return (
    <section 
      id={id} 
      className={`relative py-16 md:py-24 lg:py-32 px-5 md:px-8 lg:px-12 flex flex-col justify-center overflow-hidden w-full transition-colors duration-500 ${className}`}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {bgImage ? (
          <>
            <img 
                src={bgImage} 
                alt="Background" 
                className="w-full h-full object-cover opacity-10 dark:opacity-40 select-none pointer-events-none scale-105 transition-opacity duration-500"
            />
            {/* Smooth gradients for seamless blending */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f2f2f7] via-[#f2f2f7]/90 to-[#f2f2f7] dark:from-black dark:via-black/90 dark:to-black transition-colors duration-500"></div>
            <div className="absolute inset-0 bg-white/30 dark:bg-black/30 transition-colors duration-500"></div>
          </>
        ) : (
          <div className="w-full h-full bg-[#f2f2f7] dark:bg-black transition-colors duration-500"></div>
        )}
      </div>

      {/* Content Container - max-w-7xl ensures Apple-like constraints on large screens */}
      <div className={`relative z-10 w-full max-w-[1400px] mx-auto`}>
        
        {/* Header Block */}
        <div className={`mb-12 md:mb-20 ${align === 'center' ? 'text-center mx-auto' : 'text-left'} max-w-4xl`}>
          {subtitle && (
            <div className={`inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-xl mb-4 md:mb-6 ${align === 'center' ? 'mx-auto' : ''}`}>
               <span className="text-ottoman-gold text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase font-sans">
                 {subtitle}
               </span>
            </div>
          )}
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif font-bold text-gray-900 dark:text-white mb-4 md:mb-6 tracking-tight leading-[1.1] transition-colors duration-500">
            {title}
          </h2>
          {align === 'center' && (
             <div className="h-1 w-16 md:w-24 bg-black/10 dark:bg-white/10 mx-auto rounded-full transition-colors duration-500"></div>
          )}
        </div>

        {/* Content Body */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
