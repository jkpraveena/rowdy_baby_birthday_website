
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, BookOpen, Heart, Sparkles } from 'lucide-react';

const LESSONS = [
  "you don’t need to have life figured out yet — you’re exactly where you need to be.",
  "your journey is your own; comparison only steals your joy.",
  "take care of your body and mind — they carry you through everything.",
  "some people will stay, some will leave, all will teach you something.",
  "consistency will take you farther than talent ever will.",
  "failing means you tried — and that’s something to be proud of.",
  "confidence grows every time you choose courage over fear.",
  "setting boundaries is self-respect, not selfishness.",
  "the habits you build now quietly shape your future.",
  "your skills and character matter more than numbers and opinions.",
  "asking for help is strength, not weakness.",
  "your voice deserves to be heard — even when it shakes.",
  "discipline will give you freedom when motivation fades.",
  "social media shows highlights, not real life — don’t compare.",
  "kindness always comes back, even if not immediately.",
  "change is part of growth — welcome it.",
  "your past does not define how far you can go.",
  "joy often lives in the smallest moments — notice them.",
  "you’re allowed to change your dreams as you grow.",
  "be patient and gentle with yourself — you’re still becoming."
];

const LifeLessonsBook: React.FC = () => {
  const [flippedCount, setFlippedCount] = useState(0);
  const totalPages = LESSONS.length + 1; // Lessons + Finale

  const handleNext = () => {
    if (flippedCount < totalPages) {
      setFlippedCount(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (flippedCount > 0) {
      setFlippedCount(prev => prev - 1);
    }
  };

  // Helper component for subtle background hearts that vary slightly by page
  const PageBackgroundHearts = ({ idx }: { idx: number }) => {
    const configurations = [
      [{ top: '5%', right: '5%', size: 32 }, { bottom: '8%', left: '12%', size: 24 }],
      [{ top: '8%', left: '15%', size: 20 }, { bottom: '5%', right: '10%', size: 36 }],
      [{ top: '4%', right: '15%', size: 28 }, { bottom: '12%', right: '5%', size: 22 }],
      [{ top: '10%', right: '8%', size: 24 }, { bottom: '4%', left: '10%', size: 30 }],
    ];
    const config = configurations[idx % configurations.length];

    return (
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] overflow-hidden">
        {config.map((h, i) => (
          <Heart 
            key={i} 
            size={h.size} 
            className="absolute text-rose-300 -rotate-12" 
            style={{ ...h }}
            fill="currentColor"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-start py-12 md:py-24 px-4 select-none overflow-visible min-h-[850px]">
      
      {/* Header - Fixed Typography & Layout */}
      <div className="mb-16 md:mb-20 text-center z-10">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-rose-50 border border-rose-100 text-[10px] tracking-[0.5em] uppercase font-black text-rose-400 mb-6">
          <BookOpen size={14} /> The Chapters of You
        </div>
        <h2 className="font-serif text-4xl md:text-6xl text-slate-800 lowercase tracking-tighter italic max-w-2xl mx-auto leading-tight">
          20 things to remember on your 20th birthday
        </h2>
      </div>

      {/* The 3D Flipbook Stack Stage */}
      <div className="relative w-full max-w-[340px] md:max-w-[500px] aspect-[3/4] md:aspect-[4/3] perspective-2500 mb-12">
        
        {/* Physical Spine Shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-black/5 blur-xl -translate-x-full z-0 pointer-events-none"></div>
        
        {/* Pages Container */}
        <div className="relative w-full h-full transform-style-3d">
          
          {/* Back Cover (Bottom Layer) */}
          <div className="absolute inset-0 bg-rose-200 rounded-r-xl border-l-[8px] border-rose-300 shadow-xl translate-z-[-20px] pointer-events-none"></div>

          {/* Individual Pages */}
          {Array.from({ length: totalPages }).map((_, idx) => {
            const isFlipped = idx < flippedCount;
            const isLastPage = idx === LESSONS.length;
            
            // Fixed stacking logic: ensures all 21 pages have a consistent z-priority
            const zIndex = isFlipped ? (10 + idx) : (10 + totalPages - idx);
            
            // Physical thickness simulation to prevent z-fighting and "dullness"
            const thickness = isFlipped ? (idx * 0.4) : ((totalPages - idx) * 0.4);

            return (
              <div 
                key={idx}
                className={`absolute inset-0 origin-left transition-all duration-700 ease-[cubic-bezier(0.645,0.045,0.355,1)] transform-style-3d
                ${isFlipped ? 'rotate-y-180 opacity-0 pointer-events-none' : 'rotate-y-0 opacity-100 pointer-events-auto'}`}
                style={{ 
                  zIndex,
                  transform: `rotateY(${isFlipped ? -180 : 0}deg) translateZ(${thickness}px)`,
                  willChange: 'transform, opacity'
                }}
              >
                {/* Front Side of Page */}
                <div className="absolute inset-0 backface-hidden bg-white rounded-r-xl border border-slate-200 p-8 md:p-14 flex flex-col justify-between overflow-hidden shadow-sm">
                   {/* Subtle texture consistent with previous design */}
                   <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
                   
                   {/* SUBTLE BACKGROUND HEARTS - Placed behind content */}
                   <PageBackgroundHearts idx={idx} />

                   {/* Left spine shadow effect */}
                   <div className="absolute left-0 inset-y-0 w-8 bg-gradient-to-r from-black/5 to-transparent"></div>

                   {!isLastPage ? (
                     <>
                        <div className="relative z-10">
                          <span className="font-serif text-6xl md:text-8xl text-rose-600/90 italic leading-none block select-none">
                            {idx + 1}
                          </span>
                          <div className="w-12 h-0.5 bg-rose-200 mt-4"></div>
                        </div>

                        <div className="flex-1 flex items-center justify-center py-6 md:py-10 z-10">
                          <p className="font-serif text-xl md:text-3xl text-slate-700 leading-relaxed italic text-center px-4">
                            "{LESSONS[idx]}"
                          </p>
                        </div>

                        <div className="flex items-center justify-center gap-4 opacity-20 z-10">
                          <div className="h-[1px] flex-1 bg-slate-400"></div>
                          <Heart size={12} className="text-rose-400" fill="currentColor" />
                          <div className="h-[1px] flex-1 bg-slate-400"></div>
                        </div>
                     </>
                   ) : (
                     <div className="flex flex-col items-center justify-center h-full text-center space-y-8 z-10">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 shadow-inner">
                          <Sparkles size={40} />
                        </div>
                        <div className="space-y-4">
                          <h3 className="font-serif text-4xl md:text-6xl text-rose-600 italic leading-tight">Cheers to 20!</h3>
                          <p className="text-[10px] tracking-[0.4em] uppercase text-slate-400 font-black">Level 20 Unlocked</p>
                        </div>
                        <div className="w-16 h-px bg-rose-200"></div>
                     </div>
                   )}
                </div>

                {/* Back Side of Page (Under-sheet of paper) */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden bg-[#fafafa] rounded-l-xl border-r-8 border-rose-50 flex items-center justify-center shadow-inner">
                   <div className="w-full h-full bg-gradient-to-l from-black/5 via-transparent to-transparent"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Persistent Navigation Controls - Accessible on Mobile */}
        <div className="absolute inset-y-0 -left-6 md:-left-20 flex items-center z-[100]">
           <button 
             onClick={handlePrev} 
             disabled={flippedCount === 0}
             className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-2xl flex items-center justify-center text-rose-400 hover:bg-rose-500 hover:text-white transition-all disabled:opacity-0 active:scale-90 border border-rose-50"
             aria-label="Previous Page"
           >
             <ChevronLeft size={28} strokeWidth={2.5} />
           </button>
        </div>
        <div className="absolute inset-y-0 -right-6 md:-right-20 flex items-center z-[100]">
           <button 
             onClick={handleNext} 
             disabled={flippedCount === totalPages}
             className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-2xl flex items-center justify-center text-rose-400 hover:bg-rose-500 hover:text-white transition-all disabled:opacity-0 active:scale-90 border border-rose-50"
             aria-label="Next Page"
           >
             <ChevronRight size={28} strokeWidth={2.5} />
           </button>
        </div>
      </div>

      {/* Manual Progress Bar */}
      <div className="flex flex-col items-center gap-6 mt-4">
        <div className="flex flex-col items-center gap-3">
          <p className="text-[10px] tracking-[0.6em] uppercase font-black text-slate-400">
             Unlocking level 20: {flippedCount} / {totalPages}
          </p>
          <div className="w-40 md:w-56 h-1.5 bg-slate-100 rounded-full overflow-hidden">
             <div 
               className="h-full bg-rose-400 transition-all duration-700 ease-out" 
               style={{ width: `${(flippedCount / totalPages) * 100}%` }}
             ></div>
          </div>
        </div>
        <div className="text-[9px] uppercase tracking-[0.3em] font-medium text-slate-300 italic">
          tap the arrows to turn pages
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-2500 { perspective: 2500px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(-180deg); }
        .rotate-y-0 { transform: rotateY(0deg); }
        
        /* Consistent physical paper flip animation curves */
        .transform-style-3d > div {
           transform-origin: left center;
        }

        @media (max-width: 768px) {
          /* Maintain visual consistency on mobile */
          .perspective-2500 {
            max-width: 300px;
          }
        }
      `}} />
    </div>
  );
};

export default LifeLessonsBook;
