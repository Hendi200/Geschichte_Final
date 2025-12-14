
import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { getAsset } from '../assets';

interface Event {
  year: string;
  title: string;
  shortDesc: string;
  imageKey: string;
  targetId: string;
}

const events: Event[] = [
  {
    year: '1299',
    title: 'Gründung',
    shortDesc: 'Osman I. vereint die anatolischen Stämme.',
    imageKey: 'timeline_1299',
    targetId: 'intro'
  },
  {
    year: '1453',
    title: 'Konstantinopel',
    shortDesc: 'Die Eroberung der unbesiegbaren Stadt.',
    imageKey: 'timeline_1453',
    targetId: 'rise'
  },
  {
    year: '1520',
    title: 'Goldenes Zeitalter',
    shortDesc: 'Süleyman der Prächtige regiert.',
    imageKey: 'timeline_1520',
    targetId: 'culture'
  },
  {
    year: '1683',
    title: 'Wien',
    shortDesc: 'Das Ende der Expansion in Europa.',
    imageKey: 'timeline_1683',
    targetId: 'vienna'
  },
  {
    year: '1923',
    title: 'Republik',
    shortDesc: 'Der Untergang und Atatürks Reformen.',
    imageKey: 'timeline_1914',
    targetId: 'fall'
  }
];

interface TimelineProps {
  onNavigate: (id: string) => void;
}

const Timeline: React.FC<TimelineProps> = ({ onNavigate }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Width of a card roughly
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full relative group/timeline">
       
       {/* Left Arrow */}
       {showLeftArrow && (
         <button 
           onClick={() => scroll('left')}
           className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-xl flex items-center justify-center text-black dark:text-white transition-all hover:scale-110 -translate-x-1/2 md:-translate-x-6"
           aria-label="Scroll left"
         >
           <ArrowLeft size={20} />
         </button>
       )}

       {/* Right Arrow */}
       {showRightArrow && (
         <button 
           onClick={() => scroll('right')}
           className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-xl flex items-center justify-center text-black dark:text-white transition-all hover:scale-110 translate-x-1/2 md:translate-x-6"
           aria-label="Scroll right"
         >
           <ArrowRight size={20} />
         </button>
       )}

       {/* Horizontal Scroll Container */}
       <div 
         ref={scrollContainerRef}
         onScroll={checkScroll}
         className="flex overflow-x-auto gap-6 pb-12 pt-4 snap-x snap-mandatory px-4 md:px-0 scrollbar-hide"
       >
          {events.map((event, index) => (
            <div 
              key={index}
              className="snap-center shrink-0 w-[280px] md:w-[320px] bg-white dark:bg-[#1c1c1e] rounded-3xl border border-black/5 dark:border-white/10 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col"
            >
               {/* Image Part */}
               <div className="h-48 overflow-hidden relative">
                 <img 
                   src={getAsset(event.imageKey)} 
                   alt={event.title}
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 />
                 <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    <span className="text-ottoman-gold font-bold font-serif text-sm">{event.year}</span>
                 </div>
               </div>

               {/* Text Part */}
               <div className="p-6 flex flex-col flex-grow relative">
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-serif">{event.title}</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 flex-grow">
                   {event.shortDesc}
                 </p>
                 
                 <button 
                   onClick={() => onNavigate(event.targetId)}
                   className="w-full py-3 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                 >
                   Mehr erfahren <ArrowRight size={16} />
                 </button>
               </div>
            </div>
          ))}
          {/* Spacer for end of list */}
          <div className="w-4 shrink-0"></div>
       </div>
    </div>
  );
};

export default Timeline;
