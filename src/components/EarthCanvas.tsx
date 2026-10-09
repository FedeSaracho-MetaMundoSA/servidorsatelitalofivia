import React, { useEffect, useRef } from 'react';

interface EarthCanvasProps {
  activeSection: string;
}

export default function EarthCanvas({ activeSection }: EarthCanvasProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-[#040609]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,86,101,0.08)_0%,transparent_70%)] animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,86,101,0.05)_0%,transparent_60%)]" />
      
      {/* Decorative grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
        }}
      />
    </div>
  );
}
