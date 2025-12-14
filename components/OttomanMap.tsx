
import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { getAsset } from '../assets';

interface MapRegion {
  id: string;
  name: string;
  year: number;
  description: string;
  assetKey: string;
}

const OttomanMap: React.FC = () => {
  // Initial state starts at 1299
  const [currentYear, setCurrentYear] = useState(1299);

  // Configuration for map phases - Erweiterte Zeitleiste
  const eras = [1299, 1451, 1566, 1683, 1800, 1914, 1923];

  const mapPhases: MapRegion[] = [
    {
      id: '1299',
      name: '1299: Die Gründung',
      year: 1299,
      description: 'Der Anfang: Ein kleines Fürstentum in Bithynien unter Osman I.',
      assetKey: 'map_1299'
    },
    {
      id: '1451',
      name: '1451: Vor dem Sturm',
      year: 1451,
      description: 'Expansion in Rumelien (Balkan) und Anatolien, Konstantinopel ist umzingelt.',
      assetKey: 'map_1451'
    },
    {
      id: '1566',
      name: '1566: Süleyman I.',
      year: 1566,
      description: 'Das Goldene Zeitalter: Herrschaft über Ungarn, Nordafrika und den Nahen Osten.',
      assetKey: 'map_1566'
    },
    {
      id: '1683',
      name: '1683: Maximale Ausdehnung',
      year: 1683,
      description: 'Der Zenit vor Wien. Das Reich umfasst weite Teile dreier Kontinente.',
      assetKey: 'map_1683'
    },
    {
      id: '1800',
      name: '1800: Der Rückzug',
      year: 1800,
      description: 'Verluste gegen Russland (Krim) und Österreich (Ungarn). Der Niedergang beginnt.',
      assetKey: 'map_1800'
    },
    {
      id: '1914',
      name: '1914: Vor dem Weltkrieg',
      year: 1914,
      description: 'Verlust fast aller europäischen Gebiete und Nordafrikas ("Der kranke Mann am Bosporus").',
      assetKey: 'map_1914'
    },
    {
      id: '1923',
      name: '1923: Republik Türkei',
      year: 1923,
      description: 'Nach dem Befreiungskrieg: Die Grenzen der modernen Türkei (Vertrag von Lausanne).',
      assetKey: 'map_1923'
    }
  ];

  // Helper to find the correct map phase based on year
  const activePhase = mapPhases.find(p => p.year === currentYear) || mapPhases[mapPhases.length - 1];
  
  // Helper to get current index for slider
  const currentIndex = eras.indexOf(currentYear);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative bg-[#a5c6e3] dark:bg-[#0f172a] rounded-[2rem] md:rounded-[3rem] p-4 md:p-8 shadow-2xl border border-black/5 dark:border-white/10 overflow-hidden">
        
        {/* Header Controls */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8 gap-4 bg-white/60 dark:bg-black/40 backdrop-blur-md p-5 md:p-6 rounded-2xl md:rounded-3xl border border-white/20 w-full">
            <div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <Maximize2 size={20} className="text-ottoman-red md:w-6 md:h-6"/> Territorium
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm mt-1 max-w-md">
                   Beobachte den Aufstieg und Fall über sechs Jahrhunderte.
                </p>
            </div>
            
            <div className="flex w-full md:w-auto justify-end">
                <div className="bg-ottoman-red text-white px-4 py-1.5 md:px-5 md:py-2 rounded-full font-serif font-bold text-lg md:text-xl shadow-lg shadow-ottoman-red/30 border border-white/20">
                    {currentYear}
                </div>
            </div>
        </div>

        {/* Map Visualization (Image Based) */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-inner border border-black/5 dark:border-white/5 bg-[#d1d1d6] dark:bg-[#1e1e24] group">
            
            {/* Info Overlay */}
            <div className="absolute z-20 top-3 left-3 md:top-4 md:left-4 max-w-[70%] md:max-w-xs bg-black/80 md:bg-black/90 backdrop-blur-xl p-3 md:p-5 rounded-xl md:rounded-2xl border border-white/10 text-white animate-fade-in shadow-2xl transition-all duration-300 pointer-events-none">
                <h4 className="font-bold text-ottoman-gold mb-1 text-sm md:text-lg font-serif">{activePhase.name}</h4>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-light hidden sm:block">{activePhase.description}</p>
            </div>

            {/* Map Images Layering for smooth transition */}
            {mapPhases.map((phase) => (
                <img 
                    key={phase.id}
                    src={getAsset(phase.assetKey)}
                    alt={`Karte ${phase.year}`}
                    className={`
                        absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out
                        ${phase.id === activePhase.id ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                    `}
                />
            ))}
        </div>

        {/* Timeline Slider - Index Based for Even Distribution & Snapping */}
        <div className="mt-6 md:mt-8 px-2 md:px-12 relative">
            <input 
                type="range" 
                min="0" 
                max={eras.length - 1}
                step="1"
                value={currentIndex}
                onChange={(e) => {
                    const index = parseInt(e.target.value);
                    setCurrentYear(eras[index]); 
                }}
                className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-ottoman-red focus:outline-none focus:ring-2 focus:ring-ottoman-red/50"
            />
            
            {/* Era Markers */}
            <div className="flex justify-between mt-4 relative h-6 w-full">
                {eras.map((year, index) => (
                    <button 
                        key={year} 
                        onClick={() => setCurrentYear(year)}
                        className={`
                            absolute transform -translate-x-1/2 transition-all duration-300 flex flex-col items-center gap-1 group touch-manipulation
                            ${currentYear === year ? 'text-gray-900 dark:text-white scale-110' : 'text-gray-400'}
                        `}
                        // Calculate position based on index percentage for even spacing
                        style={{ left: `${(index / (eras.length - 1)) * 100}%` }}
                    >
                        <div className={`w-0.5 h-2 md:h-3 ${currentYear === year ? 'bg-black dark:bg-white h-3 md:h-4' : 'bg-gray-300'} transition-all`}></div>
                        {/* Only show year label on larger screens or for every second item on mobile to prevent overlap */}
                        <span className={`text-[10px] md:text-xs font-serif font-bold uppercase tracking-wider group-hover:scale-110 transition-transform ${index % 2 !== 0 ? 'hidden md:block' : 'block'}`}>{year}</span>
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default OttomanMap;
