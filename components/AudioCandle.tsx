
import React, { useEffect, useRef, useState } from 'react';
import { Flame, Wind } from 'lucide-react';

interface AudioCandleProps {
  onWishMade: () => void;
}

const AudioCandle: React.FC<AudioCandleProps> = ({ onWishMade }) => {
  const [isBlown, setIsBlown] = useState(false);
  const [volume, setVolume] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
      analyzerRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyzerRef.current);
      analyzerRef.current.fftSize = 256;
      
      const bufferLength = analyzerRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkVolume = () => {
        if (!analyzerRef.current) return;
        analyzerRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;
        setVolume(avg);

        if (avg > 60 && !isBlown) {
          setIsBlown(true);
          // Stop listening immediately after detection
          stopListening();
          setTimeout(onWishMade, 1500);
        } else {
          animationFrameRef.current = requestAnimationFrame(checkVolume);
        }
      };

      checkVolume();
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopListening = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    // Stop all tracks in the stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    // Only close if it exists and isn't already closed
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(err => console.debug("AudioContext close error:", err));
      audioContextRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopListening();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12">
      <div className="relative">
        {/* Glow effect */}
        {!isBlown && (
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-orange-200/30 blur-3xl rounded-full animate-pulse"
            style={{ transform: `scale(${1 + volume/100}) translateX(-50%) translateY(-50%)` }}
          />
        )}
        
        <div className={`transition-all duration-1000 ${isBlown ? 'opacity-0 scale-90 translate-y-4' : 'opacity-100'}`}>
          <div className="w-1 h-24 bg-slate-800 rounded-full mx-auto relative overflow-hidden">
             <div className="absolute top-0 w-full h-2 bg-slate-600" />
          </div>
          <div className="flex justify-center -mt-[110px]">
            <Flame 
              size={48} 
              className={`text-orange-500 transition-all duration-300 ${volume > 30 ? 'scale-125' : 'scale-100'}`}
              fill="currentColor"
            />
          </div>
        </div>
        
        {isBlown && (
          <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-slate-400 animate-bounce">
            <Wind size={24} />
          </div>
        )}
      </div>

      <div className="text-center max-w-xs mx-auto">
        {!isBlown ? (
          <button 
            onClick={startListening}
            className="text-[10px] tracking-[0.4em] uppercase text-slate-400 border border-slate-200 px-6 py-3 rounded-full hover:bg-slate-50 transition-colors"
          >
            {audioContextRef.current ? "Now, blow a wish..." : "Enable Mic for your wish"}
          </button>
        ) : (
          <p className="text-xs font-serif italic text-slate-500 animate-pulse">The overture begins...</p>
        )}
      </div>
    </div>
  );
};

export default AudioCandle;
