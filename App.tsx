
import React, { useState, useEffect } from 'react';
import SidebarNav from './components/SidebarNav';
import Section from './components/Section';
import CulturalAnalysis from './components/CulturalAnalysis';
import Timeline from './components/Timeline';
import BentoCard from './components/BentoCard';
import OttomanMap from './components/OttomanMap';
import { MapPin, Crown, Swords, Ship, ShieldCheck, Pickaxe, Star, AlertTriangle, Crown as CrownLogo, Bomb, ArrowUp, Sun, Moon } from 'lucide-react';
import { getAsset } from './assets';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Theme Logic
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
       setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Section Spy
      const sections = ['hero', 'introduction', 'map-section', 'timeline-section', 'intro', 'rise', 'culture', 'vienna', 'fall'];
      const scrollPosition = scrollY + windowHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Reusable "Back to Timeline" button
  const BackToTimeline = () => (
    <div className="w-full flex justify-center mt-12">
      <button 
        onClick={() => scrollToSection('timeline-section')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors uppercase tracking-widest px-4 py-2 rounded-full border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
      >
        <ArrowUp size={14} /> Zur Chronik
      </button>
    </div>
  );

  // Reusable Text Box Style for Bento Cards (Improved readability)
  const GlassBox = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
        bg-[#1c1c1e]/80 dark:bg-black/60 backdrop-blur-2xl 
        border border-white/10 shadow-2xl rounded-3xl p-6 md:p-8 
        text-white ${className}
    `}>
        {children}
    </div>
  );

  return (
    <div className="min-h-screen font-sans overflow-x-hidden transition-colors duration-500 bg-[#f2f2f7] dark:bg-black text-[#1c1c1e] dark:text-[#f5f5f7] selection:bg-ottoman-gold selection:text-white pb-20 relative">
      
      {/* Theme Toggle - Fixed Top Right */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/20 dark:bg-black/50 backdrop-blur-md border border-black/5 dark:border-white/10 text-gray-900 dark:text-white shadow-lg transition-all hover:scale-110 hover:bg-white/40 dark:hover:bg-black/70"
        aria-label="Design wechseln"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Sidebar Navigation */}
      <SidebarNav 
        activeSection={activeSection} 
        scrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <div id="hero" className="relative h-screen min-h-[500px] w-full flex flex-col items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
            <img 
                src={getAsset('hero')} 
                alt="Blue Mosque" 
                className="w-full h-full object-cover animate-pan-slow opacity-60"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  console.error("Bild nicht gefunden: " + target.src);
                  target.src = "https://placehold.co/1920x1080/333333/ffffff.png?text=BILD+NICHT+GEFUNDEN%0APrüfe+public+Ordner";
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black"></div>
        </div>
        
        {/* Adjusted padding: Increased to pl-16 (4rem) on mobile and reduced font size to text-[10vw] to strictly avoid sidebar overlap */}
        <div className="relative z-10 text-center px-4 pl-16 md:px-24 max-w-7xl mx-auto flex flex-col items-center gap-2 md:gap-4">
            <h1 className="text-[10vw] md:text-[8rem] font-serif font-bold text-white tracking-tighter leading-none drop-shadow-2xl mix-blend-overlay">
              OSMANISCHES<br/>REICH
            </h1>
            
            <div className="flex items-center gap-4 relative mt-2">
               <p className="text-sm md:text-xl text-gray-300 font-light tracking-widest uppercase">
                 1299 — 1923
               </p>
            </div>
        </div>
      </div>

      {/* Introduction / Steckbrief Section */}
      <Section id="introduction" title="Einführung" subtitle="Das Weltreich" bgImage={getAsset('intro_bg')}>
         <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <p className="text-lg md:text-3xl font-serif leading-relaxed text-gray-900 dark:text-white mb-6 md:mb-8">
               Zu seiner Hochzeit war das Osmanische Reich eine globale Supermacht, die drei Kontinente verband: Europa, Afrika und Asien.
            </p>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-light">
               Es war nicht nur eine militärische Macht, sondern ein Zentrum für Wissenschaft, Kunst und Architektur. Als Nachfolger des Byzantinischen Reiches und Kalifat der islamischen Welt prägte es über sechs Jahrhunderte die Geschichte des Mittelmeerraums.
            </p>
         </div>

         {/* Fact Grid */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 max-w-5xl mx-auto">
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-black/5 dark:border-white/10 text-center">
               <h4 className="text-xs md:text-sm uppercase tracking-widest text-gray-500 mb-2">Dauer</h4>
               <p className="text-xl md:text-3xl font-serif font-bold">624 Jahre</p>
            </div>
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-black/5 dark:border-white/10 text-center">
               <h4 className="text-xs md:text-sm uppercase tracking-widest text-gray-500 mb-2">Dynastie</h4>
               <p className="text-xl md:text-3xl font-serif font-bold">36 Sultane</p>
            </div>
            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-black/5 dark:border-white/10 text-center">
               <h4 className="text-xs md:text-sm uppercase tracking-widest text-gray-500 mb-2">Max. Fläche</h4>
               <p className="text-xl md:text-3xl font-serif font-bold">5.2 Mio km²</p>
            </div>
             <div className="bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-black/5 dark:border-white/10 text-center">
               <h4 className="text-xs md:text-sm uppercase tracking-widest text-gray-500 mb-2">Hauptstadt</h4>
               <p className="text-xl md:text-3xl font-serif font-bold">Istanbul</p>
            </div>
         </div>
      </Section>

      {/* NEW: Map Section */}
      <Section id="map-section" title="Territorium" subtitle="Interaktive Karte">
        <OttomanMap />
      </Section>

      {/* Timeline Section */}
      <Section
        id="timeline-section"
        title="Chronik"
        subtitle="Verlauf"
      >
        <div className="mb-8 md:mb-12 max-w-4xl mx-auto text-center">
           <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
             Wähle eine Epoche, um mehr über die entscheidenden Wendepunkte zu erfahren.
           </p>
        </div>
        <Timeline onNavigate={scrollToSection} />
      </Section>

      {/* 1299 - Der Anfang */}
      <Section id="intro" title="1299 - 1453" subtitle="Gründung">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
             <BentoCard 
                title="Osman I. & Der Traum" 
                icon={Crown}
                image={getAsset('osman')}
                className="min-h-[400px] md:min-h-[500px]"
             >
               <GlassBox>
                 <p className="mb-4 md:mb-6 drop-shadow-sm text-gray-100 leading-relaxed text-sm md:text-base">
                   Der Legende nach hatte Osman I. einen Traum, in dem ein Baum aus seiner Brust wuchs und die ganze Welt beschattete. Dies wurde als göttliches Zeichen für die Weltherrschaft gedeutet.
                 </p>
                 <p className="drop-shadow-sm text-gray-100 leading-relaxed text-sm md:text-base">
                   Geboren 1258, nutzte Osman die Schwäche des Byzantinischen Reiches geschickt aus. Er vereinte verschiedene türkische Stämme ("Ghazi" - Glaubenskrieger) unter seiner Flagge.
                 </p>
               </GlassBox>
             </BentoCard>

              <BentoCard 
                  title="Bursa: Die erste Hauptstadt" 
                  icon={MapPin}
                  image={getAsset('bursa')}
                  className="min-h-[400px] md:min-h-[500px]"
              >
                  <div className="mt-auto">
                    <GlassBox>
                        <p className="text-sm md:text-lg text-white leading-relaxed">
                            Sein Sohn Orhan eroberte 1326 <strong>Bursa</strong>. Es war der Übergang vom nomadischen Fürstentum zum sesshaften Staat. Bursa lag an der Seidenstraße und brachte Reichtum und Struktur in das junge Reich.
                        </p>
                    </GlassBox>
                  </div>
              </BentoCard>
        </div>
        <BackToTimeline />
      </Section>

      {/* 1453 - Konstantinopel (Jetzt mittig) */}
      <Section id="rise" title="1453" subtitle="Konstantinopel">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
           
           <div className="lg:col-span-1">
              <BentoCard 
                 title="Die Kanonen" 
                 icon={Bomb}
                 image={getAsset('cannon')}
                 className="min-h-[350px] md:min-h-[400px] h-full"
              >
                 <div className="mt-auto">
                    <GlassBox>
                        <p className="leading-relaxed text-sm md:text-base">
                            Der ungarische Kanonengießer Urban fertigte für Mehmed II. das "Dardanellen-Geschütz". Es verschoss 600kg schwere Steinkugeln.
                        </p>
                    </GlassBox>
                 </div>
              </BentoCard>
           </div>

           <div className="lg:col-span-2">
              <BentoCard 
                 title="Schiffe über Land" 
                 icon={Ship}
                 image={getAsset('ships')}
                 className="min-h-[350px] md:min-h-[400px] h-full"
              >
                 <div className="mt-auto h-full flex flex-col justify-end">
                    <GlassBox>
                        <p className="text-xl md:text-2xl font-serif font-bold mb-2 md:mb-4 text-white">
                        Ein unmögliches Manöver
                        </p>
                        <p className="text-gray-200 text-sm md:text-lg leading-relaxed">
                        Da eine massive Eisenkette das Goldene Horn versperrte, ließ Mehmed II. in einer Nacht-und-Nebel-Aktion 70 Schiffe über geölte Holzbohlen über den Hügel von Galata ziehen.
                        </p>
                    </GlassBox>
                 </div>
              </BentoCard>
           </div>
           
           <div className="lg:col-span-3">
              <BentoCard 
                 title="Istanbul: Die neue Hauptstadt" 
                 image={getAsset('hagia_sophia')}
                 className="min-h-[350px] md:min-h-[400px]"
              >
                 <GlassBox className="max-w-3xl">
                   <p className="text-sm md:text-lg leading-relaxed">
                     Mit dem Fall der Stadt endete das Mittelalter. Die Hagia Sophia wurde zur Moschee, doch Mehmed "der Eroberer" lud Künstler und Gelehrte aus aller Welt ein, um seine neue Hauptstadt zum Zentrum der Welt zu machen.
                   </p>
                 </GlassBox>
              </BentoCard>
           </div>
        </div>
        <BackToTimeline />
      </Section>

      {/* Kultur - Accordion Layout (Jetzt mittig) */}
      <Section id="culture" title="Struktur & Kultur" subtitle="Goldenes Zeitalter">
        <CulturalAnalysis />
        <BackToTimeline />
      </Section>

      {/* 1683 - Wien */}
      <Section id="vienna" title="1683" subtitle="Wien">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            <BentoCard 
                title="Der Goldene Apfel" 
                icon={ShieldCheck} 
                image={getAsset('vienna_gold')}
                className="min-h-[350px]"
            >
               <div className="h-full flex items-center">
                <GlassBox>
                    <p className="text-sm md:text-lg leading-relaxed text-white">
                        Für die Osmanen war Wien der "Goldene Apfel" – das Tor nach Westeuropa. Großwesir Kara Mustafa Pascha mobilisierte ein riesiges Heer, um die Kaiserstadt endgültig zu nehmen.
                    </p>
                </GlassBox>
              </div>
            </BentoCard>

            <BentoCard 
                title="Krieg im Untergrund" 
                icon={Pickaxe} 
                image={getAsset('vienna_tunnels')}
                className="min-h-[350px]"
            >
               <div className="h-full flex items-center">
                <GlassBox>
                    <p className="text-sm md:text-lg drop-shadow-md text-white">
                        Ein Nervenkrieg: Da die Mauern hielten, gruben osmanische Mineure Tunnel. Die Wiener horchten mit Erbsen auf Trommeln nach den Grabungen und kämpften in engen Stollen.
                    </p>
                </GlassBox>
               </div>
            </BentoCard>

            <div className="md:col-span-2">
               <BentoCard 
                  title="Der Entsatz: 12. September" 
                  image={getAsset('vienna_treaty')} 
                  className="min-h-[400px] md:min-h-[500px]"
               >
                  <div className="flex flex-col md:flex-row gap-8 items-end h-full">
                    <div className="flex-1">
                        <GlassBox>
                            <h4 className="text-xl md:text-3xl font-bold text-ottoman-gold mb-2 md:mb-4 flex items-center gap-3">
                                <Star className="fill-current" /> Die Rettung
                            </h4>
                            <p className="text-white text-sm md:text-lg leading-relaxed">
                                Wien stand kurz vor dem Fall. Doch am Morgen des 12. September erschien das Entsatzheer unter dem polnischen König Jan Sobieski auf dem Kahlenberg. Mit dem legendären Angriff der "Flügelhusaren" – der größten Kavallerieattacke der Geschichte – wurde das osmanische Heer vernichtend geschlagen.
                            </p>
                        </GlassBox>
                    </div>
                  </div>
               </BentoCard>
            </div>
         </div>
         <BackToTimeline />
      </Section>

      {/* Der Fall */}
      <Section id="fall" title="Der Untergang" subtitle="Republik">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
           <BentoCard title="Der Erste Weltkrieg" icon={AlertTriangle} image={getAsset('fall_bg')} className="min-h-[400px] md:min-h-[500px]">
              <div className="h-full flex flex-col justify-center">
                <GlassBox>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4 Das letzte Aufbäumen">Das letzte Aufbäumen</h4>
                    <p className="text-base md:text-xl text-gray-200 mb-4 md:mb-6 leading-relaxed">
                    Schon vor 1914 wurde das Reich als "Kranker Mann am Bosporus" bezeichnet. Die "Jungtürken" versuchten durch eine Allianz mit dem Deutschen Reich die alte Stärke zurückzugewinnen.
                    </p>
                    <p className="text-gray-300 text-sm md:text-lg">
                    Trotz Erfolgen wie in Gallipoli endete der Krieg 1918 in einer Katastrophe. Das Reich wurde besetzt und sollte unter den Siegermächten aufgeteilt werden.
                    </p>
                </GlassBox>
              </div>
           </BentoCard>

           <BentoCard title="Die Republik" image={getAsset('ataturk')} className="min-h-[400px] md:min-h-[500px]">
              <div className="mt-auto pt-24">
                <GlassBox>
                    <h4 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 text-white">Mustafa Kemal Atatürk</h4>
                    <p className="text-sm md:text-lg leading-relaxed text-gray-200">
                    Er akzeptierte das Diktat von Sèvres nicht. Im türkischen Befreiungskrieg (1919–1923) vertrieb er die griechischen und alliierten Besatzer.
                    </p>
                    <p className="mt-4 text-gray-300 text-sm md:text-base">
                    1922 wurde das Sultanat abgeschafft. 1923 rief Atatürk die Republik Türkei aus und leitete radikale Reformen nach westlichem Vorbild ein. Das Osmanische Reich war Geschichte.
                    </p>
                </GlassBox>
              </div>
           </BentoCard>
        </div>
        <BackToTimeline />
      </Section>

      {/* Footer */}
      <footer className="py-16 md:py-24 flex flex-col items-center justify-center border-t border-black/5 dark:border-white/5 bg-[#f2f2f7] dark:bg-black transition-colors duration-500">
         <CrownLogo size={32} className="text-gray-300 dark:text-white/20 mb-6 md:w-10 md:h-10" />
         <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-400 dark:text-white/40 tracking-[0.3em] md:tracking-[0.5em] uppercase text-center">Osmanisches Reich</h2>
      </footer>
    </div>
  );
};

export default App;
