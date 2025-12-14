
import React, { useRef, useState, useEffect } from 'react';

interface BentoProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
  icon?: any;
  image?: string;
  dark?: boolean;
  onClick?: () => void;
}

const BentoCard: React.FC<BentoProps> = ({ 
  children, 
  title, 
  className = "", 
  icon: Icon, 
  image, 
  dark = false, 
  onClick 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`
        ${className}
        transform transition-all duration-700 ease-out h-full
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      `}
    >
      <div 
        onClick={onClick}
        className={`
          relative w-full h-full overflow-hidden rounded-[2.5rem] border transition-all duration-300 group flex flex-col shadow-lg
          ${(image && !imgError) 
             ? 'border-black/5 dark:border-white/10 hover:shadow-2xl' 
             : 'bg-white dark:bg-[#1c1c1e] hover:bg-gray-50 dark:hover:bg-[#252527] border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10'}
          ${dark ? 'bg-black text-white border-white/10' : ''}
          hover:-translate-y-2
        `}
      >
        {/* Background Image Handling */}
        {image && !imgError && (
          <div className="absolute inset-0 z-0 bg-black">
            <img 
              src={image} 
              alt={title || "Image"} 
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105 opacity-90 group-hover:opacity-80"
            />
            {/* Gradients for text readability - slightly stronger now */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>
        )}

        {/* Content Container */}
        <div className="relative z-10 p-6 md:p-8 flex flex-col flex-grow pointer-events-none">
          {title && (
            <div className="flex items-start justify-between mb-8 shrink-0 pointer-events-auto">
               <div className="flex items-center gap-4">
                 {Icon && (
                   <div className="p-3 rounded-2xl bg-[#1c1c1e]/80 text-ottoman-gold backdrop-blur-xl border border-white/10 shadow-lg">
                     <Icon size={22} strokeWidth={2} />
                   </div>
                 )}
                 {/* Title text with text-shadow for better readability over images */}
                 <h3 className={`text-2xl md:text-3xl font-serif font-bold tracking-tight transition-colors duration-500
                   ${image && !imgError || dark ? 'text-white drop-shadow-md' : 'text-gray-900 dark:text-[#f5f5f7]'}`}>
                   {title}
                 </h3>
               </div>
            </div>
          )}
          
          {/* Children - Full height container */}
          <div className={`flex-grow flex flex-col pointer-events-auto transition-colors duration-500
            ${image && !imgError || dark ? 'text-gray-200' : 'text-gray-600 dark:text-gray-400'}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoCard;
