"use client";

import { useEffect, useState, useMemo } from 'react';

export function Confetti() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const confettiPieces = useMemo(() => {
    if (!isClient) return [];
    
    return Array.from({ length: 150 }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 3}s`,
        backgroundColor: ['#E57373', '#F06292', '#fff', '#f8bbd0'][Math.floor(Math.random() * 4)],
        transform: `rotate(${Math.random() * 360}deg)`
      };
      return <div key={i} className="confetti" style={style}></div>;
    });
  }, [isClient]);

  return <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50">{confettiPieces}</div>;
}
