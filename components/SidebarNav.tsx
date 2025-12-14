
import React from 'react';

interface SidebarNavProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ activeSection, scrollToSection }) => {
  const navItems = [
    { id: 'hero', label: 'Start' },
    { id: 'introduction', label: 'Einführung' },
    { id: 'map-section', label: 'Karte' },
    { id: 'timeline-section', label: 'Chronik' },
    { id: 'intro', label: 'Gründung' },
    { id: 'rise', label: 'Aufstieg' }, 
    { id: 'culture', label: 'Kultur' },
    { id: 'vienna', label: 'Wien' },   
    { id: 'fall', label: 'Untergang' }, 
  ];

  return (
    <div className="flex fixed left-2 md:left-4 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 md:gap-5 items-start pointer-events-none">
      {/* Progress Bar Line */}
      <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-black/10 dark:bg-white/10 -z-10 rounded-full"></div>
      
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className="group flex items-center gap-4 relative pointer-events-auto p-1"
          aria-label={item.label}
        >
          {/* Dot */}
          <div className={`
            w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center bg-[#f2f2f7] dark:bg-black
            ${activeSection === item.id 
              ? 'border-black dark:border-white scale-110 shadow-[0_0_15px_rgba(0,0,0,0.3)] dark:shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
              : 'border-transparent group-hover:border-gray-400 dark:group-hover:border-gray-600'}
          `}>
             <div className={`
               w-2 h-2 rounded-full transition-colors duration-300
               ${activeSection === item.id ? 'bg-black dark:bg-white' : 'bg-gray-400 dark:bg-gray-600'}
             `}></div>
          </div>

          {/* Label */}
          <span className={`
            hidden md:block
            text-sm font-medium tracking-wide transition-all duration-300 
            px-3 py-1.5 rounded-lg border border-white/5 shadow-lg
            ${activeSection === item.id 
              ? 'text-black dark:text-white bg-white/40 dark:bg-black/60 backdrop-blur-md opacity-100 translate-x-0' 
              : 'text-gray-500 dark:text-gray-400 bg-white/20 dark:bg-black/40 backdrop-blur-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}
          `}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SidebarNav;
