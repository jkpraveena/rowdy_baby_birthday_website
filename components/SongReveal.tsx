
import React, { useState } from 'react';
import { Song } from '../types';
import SpotifyEmbed from './SpotifyEmbed';
import { Play, Music, Heart, Sparkles, Star } from 'lucide-react';
import StickerFrame from './StickerFrame';

interface SongRevealProps {
  song: Song;
  align?: 'left' | 'right';
}

const SongReveal: React.FC<SongRevealProps> = ({ song, align = 'left' }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className={`w-full max-w-6xl mx-auto my-32 px-6 md:px-12 flex flex-col ${align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 group`}>
      {/* Visual Info Column */}
      <div className={`flex-1 text-center ${align === 'right' ? 'md:text-right' : 'md:text-left'} space-y-6 relative`}>
        {/* Floating background emoji */}
        <div className={`absolute -top-10 ${align === 'right' ? 'right-0' : 'left-0'} text-6xl opacity-10 blur-[2px] group-hover:blur-0 transition-all duration-700 pointer-events-none select-none`}>
          {song.emoji}
        </div>
        
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-50 border border-rose-100 text-[10px] tracking-[0.3em] uppercase font-bold text-rose-400 shadow-sm mb-4">
          <Sparkles size={12} /> Birthday Selection <Sparkles size={12} />
        </div>

        <h3 className="font-serif text-3xl md:text-4xl text-slate-800 leading-tight lowercase">
          {song.quoteEn}
        </h3>
        
        <p className="text-xs text-slate-400 font-medium tracking-widest uppercase italic">
          {song.quoteTa}
        </p>

        <div className={`flex items-center ${align === 'right' ? 'justify-center md:justify-end' : 'justify-center md:justify-start'} gap-4`}>
          <div className="h-px w-12 bg-rose-100"></div>
          <Heart size={14} className="text-rose-200" fill="currentColor" />
          <div className="h-px w-12 bg-rose-100"></div>
        </div>

        <p className="text-base leading-relaxed text-slate-500 font-light max-w-md mx-auto md:mx-0">
          {song.description}
        </p>
      </div>

      {/* Media Column */}
      <div className="flex-1 w-full max-w-md relative">
        {/* Stickers Orbiting the card */}
        <div className="absolute -top-16 -right-16 md:-right-20 z-20 pointer-events-none">
           <StickerFrame label="Vibe" rotation="rotate-12" className="scale-75 md:scale-90 opacity-90 group-hover:opacity-100 transition-opacity">
             <span className="text-4xl">🎶</span>
           </StickerFrame>
        </div>
        <div className="absolute -bottom-20 -left-16 md:-left-20 z-20 pointer-events-none">
          <StickerFrame
  label="Cute"
  rotation="-rotate-6"
  src={ASSETS.CUTE_STICKER}
  className="scale-75 md:scale-90 opacity-90 group-hover:opacity-100 transition-opacity"
/>
        </div>

        {/* Decorative elements behind player */}
        <div className="absolute -inset-8 bg-gradient-to-tr from-rose-100/40 via-pink-50/30 to-rose-50/40 rounded-[3rem] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
        
        {!isRevealed ? (
          <button
            onClick={() => setIsRevealed(true)}
            className="relative w-full aspect-[4/3] md:aspect-square bg-rose-50/50 backdrop-blur-md border-2 border-rose-100 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center gap-6 hover:bg-rose-100/80 hover:border-rose-200 transition-all duration-500 shadow-xl group/btn"
          >
             <div className="absolute top-6 right-6 text-rose-300 animate-pulse"><Star size={24} /></div>
             <div className="absolute bottom-6 left-6 text-rose-200"><Music size={24} /></div>
             
             <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-rose-400 group-hover/btn:scale-110 transition-transform shadow-lg border border-rose-50">
                <Play size={36} fill="currentColor" className="ml-1" />
             </div>
             <div className="space-y-1 text-center">
                <span className="text-[11px] tracking-[0.6em] uppercase font-black text-rose-400 block">Unlock Track</span>
                <span className="text-[9px] tracking-[0.2em] text-rose-300 font-medium uppercase">Resonance Level 20</span>
             </div>
          </button>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-700 w-full bg-gradient-to-b from-white to-rose-50/30 p-6 md:p-8 rounded-[2.5rem] shadow-[0_30px_60px_-12px_rgba(251,113,133,0.15)] border border-rose-100 relative z-10 overflow-visible">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-400 shadow-inner">
                    <Music size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-rose-600">{song.title}</span>
                    <span className="text-[11px] italic font-serif text-slate-500">{song.artist}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                   <div className="text-2xl drop-shadow-sm">{song.emoji}</div>
                   <div className="h-1 w-4 bg-rose-100 rounded-full mt-1"></div>
                </div>
             </div>
             
             <SpotifyEmbed trackId={song.id} />
             
             <div className="mt-6 flex justify-center gap-2">
                {[1,2,3].map(i => (
                  <Heart key={i} size={8} className="text-rose-200" fill="currentColor" />
                ))}
             </div>

             {/* Background decorative touch */}
             <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none">
               <Heart size={80} className="text-rose-400" fill="currentColor" />
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongReveal;
