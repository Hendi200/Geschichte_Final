
import React, { useState } from 'react';
import { AnalysisTopic } from '../types';
import { Eye, Users, TrainFront, ChevronRight } from 'lucide-react';
import { getAsset } from '../assets';

const CulturalAnalysis: React.FC = () => {
  const [activeAnalysis, setActiveAnalysis] = useState<AnalysisTopic>(AnalysisTopic.THREAT);

  const topics = [
    {
      id: AnalysisTopic.THREAT,
      title: "Das Millet-System & Gesellschaft",
      icon: Users,
      intro: "Ein Vielvölkerreich unter einer Verwaltung.",
      content: (
        <>
          <p className="mb-4">
            Das Osmanische Reich organisierte seine religiösen Minderheiten im sogenannten <strong>Millet-System</strong>. Jede Religionsgemeinschaft (Millet) durfte ihre internen Angelegenheiten wie Heirat, Bestattung und Bildung selbst regeln.
          </p>
          <p className="mb-4">
            Es gab jedoch keine vollständige Gleichberechtigung. Muslime bildeten die herrschende Klasse («Millet-i Hâkime»), während Christen und Juden Schutzbefohlene waren, die eine spezielle Kopfsteuer (Dschizya) entrichten mussten.
          </p>
          <p>
             Dennoch war das Reich für damalige Verhältnisse erstaunlich migrationsfreundlich. Sephardische Juden, die aus Spanien vertrieben wurden, fanden hier Zuflucht. Anfang des 20. Jahrhunderts lag der Anteil der Bevölkerung mit Migrationshintergrund in Istanbul bei fast 30%.
          </p>
        </>
      )
    },
    {
      id: AnalysisTopic.FASCINATION,
      title: "Fremdwahrnehmung: Furcht & Faszination",
      icon: Eye,
      intro: "Vom 'Türkengefahr' zum 'Kranken Mann'.",
      content: (
        <>
          <p className="mb-4">
            Jahrhundertelang herrschte in Europa die "Türkenfurcht". Die Osmanen galten als unbesiegbare Strafe Gottes. Gleichzeitig waren europäische Höfe von der osmanischen Ästhetik fasziniert – die "Turquerie"-Mode brachte Tulpen, Kaffee und orientalische Gewänder nach Wien und Paris.
          </p>
          <p>
            Mit dem Machtverfall im 19. Jahrhundert wandelte sich das Bild drastisch. Das Reich wurde als "Kranker Mann am Bosporus" verspottet. Propaganda über grausame Niederschlagungen von Aufständen (z.B. "Le bourreau turc") prägte das Bild im Westen.
          </p>
        </>
      )
    },
    {
      id: AnalysisTopic.EXCHANGE,
      title: "Technologie & Bündnisse",
      icon: TrainFront,
      intro: "Der Weg in die Moderne.",
      content: (
        <>
          <p className="mb-4">
            Um den technologischen Rückstand aufzuholen, reformierte sich das Reich (Tanzimat-Reformen). Ein Symbol dieser Modernisierung war der <strong>Orient-Express</strong>, der Istanbul direkt mit den Metropolen Europas verband.
          </p>
          <p>
            Politisch wandte sich das Reich, enttäuscht von britischen und französischen Annexionen (Ägypten, Tunesien), dem Deutschen Kaiserreich zu. Wilhelm II. inszenierte sich als Freund der Muslime. Das prestigeträchtigste Projekt war die <strong>Bagdad-Bahn</strong>, die Berlin mit dem Persischen Golf verbinden sollte – ein Vorhaben, das die Geopolitik des Nahen Ostens nachhaltig veränderte.
          </p>
        </>
      )
    }
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-4">
      {topics.map((topic) => {
        const isActive = activeAnalysis === topic.id;
        
        return (
          <div 
            key={topic.id}
            onClick={() => setActiveAnalysis(topic.id)}
            className={`
              group relative overflow-hidden rounded-3xl border transition-all duration-500 cursor-pointer
              ${isActive 
                ? 'bg-black text-white border-white/10 shadow-xl scale-100' 
                : 'bg-white/40 dark:bg-white/5 border-transparent hover:bg-white dark:hover:bg-[#252527] scale-95 opacity-80 hover:opacity-100 hover:scale-[0.97]'}
            `}
          >
            {/* Background Image (folds out) */}
            {isActive && (
                <div className="absolute inset-0 z-0">
                    <img 
                        src={getAsset('culture_bg')} 
                        alt="Background" 
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90"></div>
                </div>
            )}

            {/* Content Container */}
            <div className="relative z-10">
                {/* Header / Teaser */}
                <div className="p-5 md:p-8 flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-6">
                    <div className={`
                    p-3 md:p-4 rounded-2xl transition-colors duration-500 shrink-0
                    ${isActive ? 'bg-white text-black' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'}
                    `}>
                        <topic.icon size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                        <h3 className={`text-lg md:text-2xl font-serif font-bold transition-colors ${isActive ? 'text-white' : 'text-gray-900 dark:text-gray-400'}`}>
                        {topic.title}
                        </h3>
                        {!isActive && (
                        <p className="text-gray-400 dark:text-gray-500 mt-1 text-sm md:text-base hidden sm:block">{topic.intro}</p>
                        )}
                    </div>
                </div>
                
                <ChevronRight 
                    size={24} 
                    className={`transition-transform duration-500 shrink-0 ${isActive ? 'rotate-90 text-white' : 'rotate-0 text-gray-400'}`} 
                />
                </div>

                {/* Expanded Content */}
                <div className={`
                px-5 md:px-8 lg:px-24 overflow-hidden transition-all duration-700 ease-in-out
                ${isActive ? 'max-h-[800px] opacity-100 pb-8 md:pb-12' : 'max-h-0 opacity-0'}
                `}>
                <div className="w-full h-[1px] bg-white/20 mb-6 md:mb-8"></div>
                <div className="text-base md:text-lg leading-relaxed text-gray-200">
                    {topic.content}
                </div>
                </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CulturalAnalysis;
