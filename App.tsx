
import React, { useState, useEffect } from 'react';
import { ChevronDown, Sparkles, Music, Heart, Cake, PartyPopper, Star } from 'lucide-react';
import { SONGS, COLORS, ASSETS } from './constants';
import SongReveal from './components/SongReveal';
import AudioCandle from './components/AudioCandle';
import MusicFortune from './components/MusicFortune';
import LifeLessonsBook from './components/LifeLessonsBook';
import StickerFrame from './components/StickerFrame';

// Sub-component for individual bunting flags - Monochromatic Pink shades
const BuntingFlag: React.FC<{ letter: string; color: string; delay: string }> = ({ letter, color, delay }) => (
  <div 
    className="relative flex flex-col items-center group"
    style={{ 
      animation: `swing 4s ease-in-out infinite alternate`,
      animationDelay: delay,
      transformOrigin: 'top center'
    }}
  >
    {/* Flag Shape */}
    <div 
      className={`w-10 h-14 md:w-14 md:h-20 ${color} shadow-md flex items-center justify-center relative transition-colors duration-500`}
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)' }}
    >
      <span className="text-white font-serif text-xl md:text-2xl font-black drop-shadow-sm select-none">
        {letter}
      </span>
      {/* Texture overlay for depth */}
      <div className="absolute inset-0 bg-white/10 opacity-20 pointer-events-none"></div>
    </div>
    {/* String connection point */}
    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-rose-200 rounded-full border border-white/50 z-10"></div>
  </div>
);

const BuntingBanner: React.FC = () => {
  // Monochromatic Pink/Rose Palette
  const row1 = [
    { l: 'H', c: 'bg-rose-300' },
    { l: 'A', c: 'bg-pink-400' },
    { l: 'P', c: 'bg-rose-400' },
    { l: 'P', c: 'bg-pink-500' },
    { l: 'Y', c: 'bg-rose-500' },
  ];
  
  const row2 = [
    { l: 'B', c: 'bg-pink-600' },
    { l: 'I', c: 'bg-rose-400' },
    { l: 'R', c: 'bg-pink-400' },
    { l: 'T', c: 'bg-rose-300' },
    { l: 'H', c: 'bg-pink-500' },
    { l: 'D', c: 'bg-rose-500' },
    { l: 'A', c: 'bg-pink-400' },
    { l: 'Y', c: 'bg-rose-400' },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-4 py-8 pointer-events-none select-none overflow-visible">
      {/* Tier 1: HAPPY */}
      <div className="relative flex justify-center gap-1 md:gap-2">
        <svg className="absolute top-0 left-[-20px] right-[-20px] w-[calc(100%+40px)] h-12 -z-10 opacity-20" viewBox="0 0 400 50">
          <path d="M0,10 Q200,60 400,10" fill="none" stroke="#fda4af" strokeWidth="1.5" strokeDasharray="4 2" />
        </svg>
        {row1.map((f, i) => (
          <BuntingFlag key={i} letter={f.l} color={f.c} delay={`${i * 0.15}s`} />
        ))}
      </div>

      {/* Tier 2: BIRTHDAY */}
      <div className="relative flex justify-center gap-1 md:gap-2 -mt-2">
        <svg className="absolute top-0 left-[-40px] right-[-40px] w-[calc(100%+80px)] h-12 -z-10 opacity-20" viewBox="0 0 600 50">
          <path d="M0,10 Q300,60 600,10" fill="none" stroke="#fda4af" strokeWidth="1.5" strokeDasharray="4 2" />
        </svg>
        {row2.map((f, i) => (
          <BuntingFlag key={i} letter={f.l} color={f.c} delay={`${(i + 5) * 0.1}s`} />
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes swing {
          0% { transform: rotate(-3deg); }
          100% { transform: rotate(3deg); }
        }
      `}} />
    </div>
  );
};

// Sub-component for a single glossy heart balloon
const GlossyHeartBalloon: React.FC<{ 
  size: number; 
  rotation: number; 
  delay: string; 
  xOffset: number; 
  yOffset: number;
}> = ({ size, rotation, delay, xOffset, yOffset }) => (
  <div 
    className="absolute transition-transform duration-1000 ease-in-out hover:scale-110"
    style={{ 
      left: `${xOffset}px`, 
      top: `${yOffset}px`, 
      transform: `rotate(${rotation}deg)`,
      animation: `float ${3 + Math.random() * 2}s ease-in-out infinite alternate`,
      animationDelay: delay
    }}
  >
    {/* Balloon Body */}
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      <defs>
        <radialGradient id="balloonGradient" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ff5f5f" />
          <stop offset="60%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#9f1239" />
        </radialGradient>
      </defs>
      <path 
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
        fill="url(#balloonGradient)"
      />
      <ellipse cx="7" cy="7" rx="2" ry="3" fill="white" fillOpacity="0.3" transform="rotate(-15, 7, 7)" />
    </svg>
    <div 
      className="absolute left-1/2 -translate-x-1/2 top-[80%] w-[1px] bg-gradient-to-b from-rose-300/40 to-transparent" 
      style={{ 
        height: '200px', 
        transform: `rotate(${-rotation}deg) scaleY(1.5)`, 
        transformOrigin: 'top'
      }} 
    />
  </div>
);

const BalloonBunch: React.FC = () => {
  const balloons = [
    { size: 60, rot: -5, delay: '0s', x: 0, y: 0 },
    { size: 55, rot: 10, delay: '0.2s', x: -30, y: -15 },
    { size: 65, rot: -15, delay: '0.5s', x: 35, y: -10 },
    { size: 50, rot: 5, delay: '0.8s', x: -15, y: -40 },
    { size: 60, rot: -10, delay: '0.3s', x: 20, y: -45 },
    { size: 58, rot: 12, delay: '1.1s', x: 45, y: -30 },
    { size: 52, rot: -8, delay: '0.6s', x: -45, y: -25 },
    { size: 62, rot: 0, delay: '1.5s', x: 0, y: -60 },
    { size: 55, rot: -12, delay: '0.9s', x: -25, y: -65 },
    { size: 57, rot: 15, delay: '0.4s', x: 30, y: -70 },
    { size: 50, rot: -5, delay: '1.2s', x: 10, y: -25 },
    { size: 65, rot: 8, delay: '0.7s', x: -55, y: -50 },
  ];

  return (
    <div className="relative w-20 h-20">
      {balloons.map((b, i) => (
        <GlossyHeartBalloon 
          key={i} 
          size={b.size} 
          rotation={b.rot} 
          delay={b.delay} 
          xOffset={b.x} 
          yOffset={b.y} 
        />
      ))}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          from { transform: translateY(0px) rotate(-2deg); }
          to { transform: translateY(-10px) rotate(2deg); }
        }
      `}} />
    </div>
  );
};

const TamilPoem: React.FC = () => (
  <div className="space-y-10 animate-in fade-in slide-in-from-top-12 duration-1000 mb-20">
    <div className="flex justify-center items-center gap-4 text-rose-300">
       <div className="h-px w-10 bg-rose-100"></div>
       <Music size={24} />
       <div className="h-px w-10 bg-rose-100"></div>
    </div>
    
    <div className="space-y-8 bg-white/40 backdrop-blur-sm p-8 md:p-12 rounded-[3rem] border border-white/60 shadow-xl shadow-rose-100/10 max-w-4xl mx-auto">
       <h3 className="font-serif text-3xl md:text-4xl text-slate-800 leading-relaxed lowercase tracking-tight">
         🎶 பாடலாய் பிறந்தவளே… 🎶
       </h3>
       
       <div className="text-slate-600 space-y-8 leading-[1.8] text-base md:text-lg font-light max-w-2xl mx-auto">
          <p>
            உன் குரல்<br/>
            ஒரு பாடல் மட்டும் இல்லை,<br/>
            அது மனசுக்குள்ளே மெதுவா<br/>
            நுழையும் ஒரு உயிருள்ள உணர்வு.
          </p>
          
          <p>
            சிரிப்பிலும் சோகத்திலும்<br/>
            அதே குரல்<br/>
            ஆறுதலாக மாறுகிறது,<br/>
            மருந்தாகவே மாறுகிறது,<br/>
            நம்பிக்கையை தருகிறது.
          </p>
          
          <p>
            மேடை இருந்தாலும் இல்லையாலும்<br/>
            உன் குரல்<br/>
            உன்னுடைய அடையாளம்,
          </p>
          
          <div className="pt-4">
            <p className="font-serif italic text-2xl text-rose-400">
              பாடிக்கிட்டே இரு…<br/>
              <span className="text-sm tracking-[0.3em] uppercase font-black text-rose-300">
                உன் கனவுகளையும், உன் உண்மையையும், உன் மனசையும். 💫
              </span>
            </p>
          </div>
       </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [wishMade, setWishMade] = useState(false);

  const handleWishMade = () => {
    setWishMade(true);
    // Smooth scroll to the musical destiny section after a short delay
    setTimeout(() => {
      document.getElementById('musical-destiny')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] overflow-x-hidden selection:bg-rose-200">
      {/* 1. HERO SECTION: CELEBRATION OVERVIEW */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-20 bg-gradient-to-br from-[#fffafa] via-[#fff5f7] to-[#f3effb] relative overflow-hidden pt-12">
        
        {/* --- PINK THEMED BUNTING BANNER AT THE TOP --- */}
        <div className="absolute top-0 left-0 w-full z-40">
           <BuntingBanner />
        </div>

        {/* Background Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-200/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-purple-200/20 blur-[100px] rounded-full"></div>
        
        {/* --- STICKER: BIRTHDAY CHIBI --- */}
        <div className="fixed top-24 left-[5%] z-50">
           <StickerFrame 
             label="Birthday Chibi" 
             rotation="-rotate-6"
             src={ASSETS.CHIBI_MAIN}
           />
        </div>
        
        {/* --- STICKER: MAGIC --- */}
        <div className="fixed bottom-24 right-[5%] z-50">
           <StickerFrame 
             label="Magic" 
             rotation="rotate-12"
             src={ASSETS.CHIBI1_MAIN} 
           >
             <div className="p-4 text-center">
                <span className="text-4xl">✨</span>
             </div>
           </StickerFrame>
        </div>

        {/* --- HIGH-FIDELITY BALLOON BUNCH --- */}
        <div className="absolute top-48 right-[15%] md:right-[20%] z-20 scale-75 md:scale-100">
          <BalloonBunch />
        </div>
        
        <div className="absolute bottom-40 left-[10%] text-3xl opacity-30">🎵</div>
        <div className="absolute top-1/2 left-1/4 text-2xl text-rose-300 animate-pulse"><Sparkles /></div>

        <div className="flex flex-col md:flex-row items-center gap-12 w-full max-w-7xl mt-12 md:mt-24">
          <div className="flex-1 text-center md:text-left z-10 space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/80 shadow-sm border border-rose-100 text-[11px] tracking-[0.5em] uppercase font-black text-rose-400 animate-in slide-in-from-left duration-1000">
              <Cake size={16} /> Happy Birthday to you <Cake size={16} />
            </div>
            
            <h1 className="font-serif text-6xl md:text-8xl text-slate-800 leading-[0.9] lowercase tracking-tighter">
              today is <br /> 
              <span className="text-rose-400 italic">extraordinary</span> <br /> 
              because <span className="underline decoration-rose-200 decoration-wavy">you</span> are.
            </h1>

            <p className="text-lg font-light text-slate-500 leading-relaxed max-w-md">
              another year, another melody. this space is a private listening room curated just for your resonance. 🎧💜
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-8 opacity-60">
               <div className="flex items-center gap-2">
                  <Heart size={18} className="text-rose-300" fill="currentColor" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Celebrating You</span>
               </div>
               <div className="flex items-center gap-2">
                  <Music size={18} className="text-purple-300" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Song for Song</span>
               </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center z-10 relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute -top-12 -left-12 z-30">
                 <StickerFrame
  label="Sing!"
  rotation="-rotate-12"
  src={ASSETS.MIC_ICON}
  className="scale-110 shadow-lg"
/>
              </div>

              <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl rotate-3 flex flex-col items-center justify-center p-8 border border-slate-100 transform hover:rotate-0 transition-transform duration-700 group">
                <div className="w-full h-full border-2 border-rose-50 rounded-2xl flex flex-col items-center justify-center text-center gap-6">
                   <PartyPopper size={48} className="text-rose-300 group-hover:scale-125 transition-transform" />
                   <span className="font-serif text-3xl text-slate-700 italic">"The Singer's Encore"</span>
                   <div className="text-xs tracking-widest text-slate-400 uppercase">Vol. {new Date().getFullYear() - 2000}</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-rose-100 rounded-3xl shadow-lg -rotate-6 -z-10"></div>
              <div className="absolute inset-0 bg-purple-100 rounded-3xl shadow-lg rotate-12 -z-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE SECTION: POEM AND CANDLE/FORTUNE */}
      <section className="py-20 flex flex-col items-center min-h-screen relative bg-gradient-to-b from-transparent to-rose-50/20">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-slate-200 to-transparent"></div>
        
        <div className="w-full max-w-5xl mx-auto px-6 z-10 flex flex-col items-center">
          
          {/* --- THE POEM IS ALWAYS VISIBLE --- */}
          <TamilPoem />

          {!wishMade ? (
            <div className="w-full max-w-4xl text-center space-y-12 border-t border-rose-50 pt-20 animate-in fade-in duration-700">
              <div className="space-y-4">
                <h2 className="font-serif text-5xl text-slate-800 lowercase tracking-tighter italic">now, make a silent wish.</h2>
                <p className="text-[10px] tracking-[0.5em] uppercase text-slate-400 font-bold">and blow towards the candle</p>
              </div>
              <AudioCandle onWishMade={handleWishMade} />
            </div>
          ) : (
            <div className="w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 flex flex-col items-center">
              {/* 1. Musical Destiny Reveal */}
              <MusicFortune />
              
              {/* 2. Life Lessons Book Animation Section */}
              <div className="mt-20 w-full">
                <LifeLessonsBook />
              </div>

              {/* Separator */}
              <div className="mt-20 h-[1px] w-full max-w-xs bg-gradient-to-r from-transparent via-rose-100 to-transparent"></div>

              {/* 3. Birthday Playlist */}
              <div className="mt-32 w-full">
                <div className="text-center mb-20 space-y-4">
                  <div className="inline-block p-3 bg-rose-50 rounded-full text-rose-300 animate-pulse">
                    <Music size={24} />
                  </div>
                  <h2 className="font-serif text-5xl text-slate-800 lowercase">your birthday playlist</h2>
                  <p className="text-xs tracking-[0.4em] uppercase text-slate-400 font-bold">curated for your soul's vibrato</p>
                </div>

                <div className="space-y-0">
                  {SONGS.map((song, index) => (
                    <SongReveal 
                      key={song.id} 
                      song={song} 
                      align={index % 2 === 0 ? 'left' : 'right'} 
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 text-center opacity-40">
        <div className="flex justify-center gap-4 mb-8">
          <Star size={14} className="text-rose-300" />
          <Star size={14} className="text-pink-300" />
          <Star size={14} className="text-rose-200" />
        </div>
        <p className="text-[10px] tracking-[0.8em] uppercase font-black text-red-500" >
          Happy Birthday Harshitha 24|12|{new Date().getFullYear()}
        </p>
      </footer>
      
      <div className="fixed bottom-10 right-10 z-50 animate-bounce cursor-pointer opacity-20 hover:opacity-100 transition-opacity" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <ChevronDown size={32} className="text-slate-400 rotate-180" />
      </div>
    </div>
  );
};

export default App;
