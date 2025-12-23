
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Music, Heart, Send } from 'lucide-react';

const MusicFortune: React.FC = () => {
  const [fortune, setFortune] = useState<string>("you step into the velvet chorus of your twentieth year, where the breath of youth meets the deep, golden timber of a soul in bloom. may every melody you release carve a path through the silence to find its home in a legacy of pure resonance.");
  const [animationState, setAnimationState] = useState<'closed' | 'animating' | 'revealed'>('closed');

  useEffect(() => {
    const fetchFortune = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: "You are a poetic music sage. Generate a beautiful, 2-3 sentence birthday reading for a singer turning 20. Focus on the word 'resonance'. Use elegant, lowercase serif style.",
          config: { temperature: 0.9 },
        });
        if (response.text) setFortune(response.text.toLowerCase());
      } catch (err) {
        console.error("AI fetch failed, using static fallback.");
      }
    };
    fetchFortune();
  }, []);

  const handleStart = () => {
    if (animationState !== 'closed') return;
    setAnimationState('animating');
    
    // Smooth transition to revealed state
    setTimeout(() => {
      setAnimationState('revealed');
    }, 3500);
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimationState('closed');
  };

  return (
    <div id="musical-destiny" className="w-full flex flex-col items-center justify-start py-20 px-4 md:py-32 perspective-2000 relative min-h-[1000px] md:min-h-[1200px] overflow-visible">
      
      {/* Visual Header - Positioned absolutely at the top to ensure it never gets covered */}
      <div className="w-full text-center z-50 mb-16 md:mb-24">
        <h4 className="text-[12px] md:text-[18px] tracking-[1.2em] uppercase text-pink-400 font-black mb-6 opacity-80">
          Your Musical Destiny
        </h4>
        <div className="flex justify-center items-center gap-6 md:gap-8 text-pink-200">
           <Music size={14} className="animate-pulse" />
           <div className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-pink-100 to-transparent"></div>
           <Heart size={14} fill="currentColor" className="text-pink-300" />
           <div className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-pink-100 to-transparent"></div>
           <Music size={14} className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

      <div className="relative w-full max-w-lg aspect-[3/2] flex items-center justify-center mt-12">
        
        {/* --- ENVELOPE BASE --- */}
        <div 
          className={`relative w-full h-full transition-all duration-1000 transform-style-3d z-0
          ${animationState !== 'closed' ? 'scale-90 rotate-x-12 translate-y-16 md:translate-y-24 opacity-40' : 'hover:scale-[1.02] rotate-x-5'}`}
        >
          {/* Ground Shadow */}
          <div className="absolute inset-x-10 -bottom-16 h-12 bg-pink-900/10 blur-3xl rounded-[100%] scale-x-125 -z-10"></div>

          {/* Envelope Body */}
          <div className="absolute inset-0 bg-pink-200 rounded-xl shadow-2xl overflow-hidden transform-style-3d border border-pink-300/30">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
             <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent"></div>
             <div className="absolute inset-0 border-[35px] md:border-[45px] border-pink-100/40 border-b-transparent border-t-transparent"></div>
          </div>

          {/* Front Flaps */}
          <div className="absolute inset-0 z-30 pointer-events-none transform-style-3d">
             <div className="absolute inset-y-0 left-0 w-1/2 bg-pink-300 shadow-xl" style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)' }}></div>
             <div className="absolute inset-y-0 right-0 w-1/2 bg-pink-300 shadow-xl" style={{ clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)' }}></div>
             <div className="absolute inset-x-0 bottom-0 h-[65%] bg-pink-200 border-t border-pink-300/20 shadow-lg" style={{ clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)' }}></div>
          </div>

          {/* Seal / Start Button - The EXACT Origin Point */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-50 ${animationState !== 'closed' ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100 scale-100'}`}>
            <div className="relative group/seal cursor-pointer" onClick={handleStart}>
              <div className="absolute -inset-10 bg-pink-500/20 rounded-full blur-3xl group-hover/seal:opacity-60 transition-opacity"></div>
              <div className="w-20 h-20 md:w-24 md:h-24 bg-pink-600 rounded-full flex items-center justify-center shadow-[0_12px_40px_rgba(219,39,119,0.5)] border-4 border-pink-300 ring-10 ring-pink-100/50 hover:scale-110 active:scale-95 transition-all duration-300">
                  <Heart className="w-9 h-9 md:w-11 md:h-11 text-white" fill="currentColor" />
              </div>
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-black tracking-widest uppercase text-pink-500 animate-pulse">Touch Seal</div>
            </div>
          </div>

          {/* Top Flap */}
          <div 
            className={`absolute inset-x-0 top-0 h-[65%] bg-pink-400 origin-top transition-transform duration-[800ms] ease-in-out z-40 transform-style-3d border-b border-pink-500/10 ${animationState !== 'closed' ? 'rotate-x-180 z-10' : 'rotate-x-0'}`}
            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
          >
            <div className={`absolute inset-0 bg-pink-300 transition-opacity duration-1000 ${animationState !== 'closed' ? 'opacity-100' : 'opacity-0'}`}></div>
          </div>
        </div>

        {/* --- DYNAMIC FLYING ELEMENTS (No string line) --- */}
        
        {/* Paper Airplane - Centered Origin on Seal, larger path */}
        {animationState === 'animating' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[100]">
            <div className="animate-airplane-loop" style={{ offsetPath: 'path("M0,0 Q100,-350 300,-100 C500,150 200,450 0,350 C-250,250 -450,0 -200,-200 Q0,-350 0,0")' }}>
               <Send size={100} className="text-pink-500 rotate-[-45deg] drop-shadow-2xl" fill="currentColor" />
            </div>
          </div>
        )}

        {/* 3. The Final Letter - Resting ON TOP of the envelope, positioned to not hide header */}
        <div 
          className={`absolute z-[110] flex items-center justify-center transition-all duration-[1000ms] ease-[cubic-bezier(0.23,1,0.32,1)]
          ${animationState === 'revealed' ? 'opacity-100 scale-100 translate-y-12 md:translate-y-20 rotate-[-0.5deg]' : 'opacity-0 scale-0 translate-y-0 pointer-events-none'}`}
        >
          <div className="bg-white shadow-[0_60px_120px_-20px_rgba(219,39,119,0.3)] rounded-2xl w-[320px] md:w-[540px] h-[480px] md:h-[600px] flex flex-col items-center justify-center text-center p-8 md:p-16 border border-pink-50 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
            
            {/* Number 20 Graphic - Darkened and centered */}
            <div className="mb-8 md:mb-12 relative flex justify-center items-center w-full">
              <div className="font-serif text-[100px] md:text-[180px] text-pink-300 italic font-black select-none leading-none tracking-tighter opacity-80">20</div>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-4 md:pt-8">
                <div className="w-12 md:w-16 h-0.5 bg-pink-200 rounded-full mb-3 md:mb-4"></div>
                <Heart className="w-8 h-8 md:w-11 md:h-11 text-pink-400 animate-bounce" style={{ animationDuration: '3s' }} fill="none" strokeWidth={1.5} />
                <div className="w-12 md:w-16 h-0.5 bg-pink-200 rounded-full mt-3 md:mt-4"></div>
              </div>
            </div>

            <div className="relative z-10 w-full px-2 md:px-4 space-y-6 md:space-y-10">
              <p className="font-serif italic text-xl md:text-3xl text-slate-700 leading-relaxed max-w-md mx-auto drop-shadow-sm">
                "{fortune}"
              </p>
              <div className="pt-4 md:pt-8">
                  <div className="w-8 h-px bg-pink-100 mx-auto"></div>
              </div>
            </div>

            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 opacity-40">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300 w-6 h-6 md:w-8 md:h-8">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* Fold Back Action - Positioned clearly below the letter */}
      <div className={`mt-24 md:mt-48 transition-all duration-1000 text-center z-[120] relative ${animationState === 'revealed' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}>
         <div className="flex flex-col items-center gap-2 mb-4">
           <span className="text-[9px] md:text-[11px] tracking-[0.8em] uppercase font-black text-pink-300 opacity-60">resonance</span>
         </div>
         <button 
           onClick={reset}
           className="text-[10px] md:text-[11px] tracking-[0.6em] uppercase font-black text-pink-400 hover:text-pink-600 transition-all flex flex-col items-center gap-4 mx-auto group bg-pink-50/80 backdrop-blur-sm px-10 py-4 rounded-full border border-pink-100 shadow-md hover:shadow-lg active:scale-95 touch-manipulation"
         >
           Fold Back
         </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-2000 { perspective: 4000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-x-180 { transform: rotateX(180deg); }
        .rotate-x-12 { transform: rotateX(12deg); }
        .rotate-x-5 { transform: rotateX(5deg); }

        /* Airplane Flight Animation */
        @keyframes airplane-loop {
          0% { 
            offset-distance: 0%; 
            transform: scale(0.2); 
            opacity: 0; 
          }
          5% { opacity: 1; transform: scale(0.6); }
          15% { transform: scale(1.1); }
          85% { transform: scale(1.1); opacity: 1; }
          100% { 
            offset-distance: 100%; 
            transform: scale(0.2); 
            opacity: 0;
          }
        }
        .animate-airplane-loop {
          animation: airplane-loop 3.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(12px) rotate(-0.5deg) scale(1); }
          50% { transform: translateY(0px) rotate(0.5deg) scale(1.01); }
        }
        ${animationState === 'revealed' ? '.animate-float-gentle { animation: float-gentle 6s ease-in-out infinite; }' : ''}
      `}} />
    </div>
  );
};

export default MusicFortune;
