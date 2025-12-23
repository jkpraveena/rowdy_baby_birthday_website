
import React, { useState } from 'react';

interface SpotifyEmbedProps {
  trackId: string;
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({ trackId }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`transition-all duration-1000 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} p-1.5 bg-rose-50 rounded-2xl border border-rose-100 shadow-sm`}>
      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=1`}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="rounded-xl shadow-inner"
      ></iframe>
    </div>
  );
};

export default SpotifyEmbed;