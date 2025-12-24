import React, { useEffect, useRef, useState } from "react";
import { Flame, Wind } from "lucide-react";

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

  // 🔔 Popup logic
  const candleRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintShownOnce, setHintShownOnce] = useState(false);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();

      analyzerRef.current = audioContextRef.current.createAnalyser();
      const source =
        audioContextRef.current.createMediaStreamSource(stream);
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
          stopListening();
          setTimeout(onWishMade, 1500);
        } else {
          animationFrameRef.current =
            requestAnimationFrame(checkVolume);
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

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (
      audioContextRef.current &&
      audioContextRef.current.state !== "closed"
    ) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopListening();
  }, []);

  // 👀 Show popup when candle scrolls into view (only once)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !hintShownOnce &&
          !isBlown
        ) {
          setShowHint(true);
          setHintShownOnce(true);

          setTimeout(() => setShowHint(false), 4500);
        }
      },
      { threshold: 0.6 }
    );

    if (candleRef.current) {
      observer.observe(candleRef.current);
    }

    return () => observer.disconnect();
  }, [hintShownOnce, isBlown]);

  return (
    <div
      ref={candleRef}
      className="relative flex flex-col items-center justify-center gap-8 py-12"
    >
      {/* Candle */}
      <div className="relative">
        {!isBlown && (
          <div
            className="absolute top-1/2 left-1/2 w-32 h-32 bg-orange-200/30 blur-3xl rounded-full animate-pulse"
            style={{
              transform: `translate(-50%, -50%) scale(${1 +
                volume / 100})`,
            }}
          />
        )}

        <div
          className={`transition-all duration-1000 ${
            isBlown
              ? "opacity-0 scale-90 translate-y-4"
              : "opacity-100"
          }`}
        >
          <div className="w-1 h-24 bg-slate-800 rounded-full mx-auto relative">
            <div className="absolute top-0 w-full h-2 bg-slate-600" />
          </div>

          <div className="flex justify-center -mt-[110px]">
            <Flame
              size={48}
              fill="currentColor"
              className={`text-orange-500 transition-transform duration-300 ${
                volume > 30 ? "scale-125" : "scale-100"
              }`}
            />
          </div>
        </div>

        {isBlown && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-slate-400 animate-bounce">
            <Wind size={24} />
          </div>
        )}
      </div>

      {/* Button / Text */}
      <div className="text-center max-w-xs mx-auto">
        {!isBlown ? (
          <button
            onClick={startListening}
            className="text-[10px] tracking-[0.4em] uppercase text-slate-400 border border-slate-200 px-6 py-3 rounded-full hover:bg-slate-50 transition-colors"
          >
            {audioContextRef.current
              ? "Now, blow a wish..."
              : "Enable Mic for your wish"}
          </button>
        ) : (
          <p className="text-xs font-serif italic text-slate-500 animate-pulse">
            The overture begins…
          </p>
        )}
      </div>

      {/* 🎀 Cute popup */}
      {showHint && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-candle-hint">
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3">
            <span className="text-2xl">🕯️</span>
            <p className="text-xs font-medium leading-snug">
              Blowing the candle is necessary
              <br />
              to see more upcoming surprises ✨
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioCandle;
