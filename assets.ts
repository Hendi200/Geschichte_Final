
// Central Asset Management

// ANLEITUNG FÜR EIGENE BILDER (LOKAL):
// ------------------------------------
// 1. Erstelle einen Ordner namens "public" in deinem Hauptverzeichnis (neben index.html).
// 2. Kopiere deine Bilder (jpg, png, webp) in diesen "public" Ordner.
// 3. Trage unten den Dateinamen mit einem "/" davor ein.

// Beispiel:
// Wenn dein Bild "mein_bild.jpg" im public-Ordner liegt, schreibe: "/mein_bild.jpg"

const placeholder = (text: string) => `https://placehold.co/1920x1080/000000/000000.png?text=${text}`;

export const assets = {
  // --- STARTSEITE ---
  // Das große Hintergrundbild ganz oben
  hero: "", 
  
  // Bild für den Einleitungstext
  intro_bg: placeholder('intro'),
  
  // --- 1299: GRÜNDUNG ---
  osman: placeholder('osman'), // z.B. "/osman_portrait.jpg"
  bursa: placeholder('bursa'),
  
  // --- 1453: KONSTANTINOPEL ---
  cannon: placeholder('cannon'), // z.B. "/kanone.jpg"
  ships: placeholder('ships'),
  hagia_sophia: placeholder('hagia'),
  
  // --- KULTUR ---
  culture_bg: placeholder('culture'),
  
  // --- 1683: WIEN ---
  vienna_gold: placeholder('vienna_gold'),
  vienna_tunnels: placeholder('vienna_tunnels'),
  vienna_treaty: placeholder('vienna_treaty'),
  
  // --- 1923: DER FALL ---
  fall_bg: placeholder('fall'),
  ataturk: placeholder('ataturk'),
  
  // --- ZEITSTRAHL (Kleine Vorschaubilder) ---
  timeline_1299: placeholder('t1'),
  timeline_1453: placeholder('t2'),
  timeline_1520: placeholder('t3'),
  timeline_1683: placeholder('t4'),
  timeline_1914: placeholder('t5'),

  // --- KARTEN (Wichtig für den Slider!) ---
  // Lege Kartenbilder für die Jahre in den public Ordner
  map_1299: placeholder('map_1299'), // z.B. "/karte_1299.png"
  map_1451: placeholder('map_1451'), 
  map_1566: placeholder('map_1566'), 
  map_1683: placeholder('map_1683'), 
  map_1800: placeholder('map_1800'), 
  map_1914: placeholder('map_1914'), 
  map_1923: placeholder('map_1923'), 
  
  // Legacy (ignorieren)
  map_1300: placeholder('map_1300'),
  map_1520: placeholder('map_1520'),
  map_modern_borders: placeholder('modern_borders_overlay'), 
};

export const getAsset = (key: string) => {
  return (assets as any)[key] || assets.hero;
};
