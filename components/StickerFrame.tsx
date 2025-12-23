
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface StickerFrameProps {
  label?: string;
  className?: string;
  children?: React.ReactNode;
  rotation?: string;
  src?: string; 
}

const StickerFrame: React.FC<StickerFrameProps> = ({ label, className = "", children, rotation = "rotate-3", src }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative group pointer-events-auto ${rotation} ${className}`}>
      {/* The main sticker frame container with fixed dimensions to contain images */}
      <div className="bg-white/60 backdrop-blur-md border-2 border-dashed border-rose-200 rounded-3xl p-2 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-500 flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 overflow-hidden relative">
        {src && !imageError ? (
          <img 
            src={src} 
            alt={label || "Sticker"} 
            onError={() => setImageError(true)}
            className="w-full h-full object-contain pointer-events-none select-none drop-shadow-sm" 
          />
        ) : children ? (
          <div className="w-full h-full flex items-center justify-center">
            {children}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-30">
            <Sparkles size={24} className="text-rose-300" />
            <span className="text-[8px] tracking-widest uppercase font-black text-rose-400 text-center">
              {src && imageError ? "Harshitha 💐" : "Place Sticker\nHere"}
            </span>
          </div>
        )}
      </div>

      {/* The "Sticker Tab" label */}
      {label && (
        <div className="absolute -top-3 -left-2 bg-rose-400 text-white text-[7px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform z-10">
          {label}
        </div>
      )}

      {/* Decorative "peel" effect in corner */}
      <div className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-tl from-white/80 to-transparent rounded-br-3xl pointer-events-none"></div>
    </div>
  );
};

export default StickerFrame;
