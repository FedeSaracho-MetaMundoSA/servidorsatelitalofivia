import { SVGProps, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function CustomLogo(props: { className?: string }) {
  const [showOfficial, setShowOfficial] = useState(true);

  return (
    <div className={`flex flex-col items-start gap-2 ${props.className || ''}`}>
      <div 
        className="relative shrink-0 w-full cursor-pointer group"
        onClick={() => setShowOfficial(!showOfficial)}
      >
        <AnimatePresence mode="wait">
          {showOfficial ? (
            <motion.div
              key="official"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full"
            >
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#FF5665] via-[#E11D48] to-[#0B1330] opacity-45 blur-[3px] animate-pulse" />
              <img
                src="/servidor_logo.jpeg"
                alt="Servidor Satelital Oficial"
                className="relative h-11 sm:h-14 w-auto max-w-full rounded-xl border border-white/10 bg-white object-contain px-2.5 py-1.5 shadow-[0_0_16px_rgba(255,86,101,0.25)] transition-transform group-hover:scale-[1.02] duration-300"
              />
            </motion.div>
          ) : (
            <motion.div
              key="neon"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="relative h-11 sm:h-14 flex items-center justify-center px-4 rounded-xl bg-[#0b1330]/50 border border-[#ff5665]/30 backdrop-blur-md"
            >
              <span className="font-display font-black text-xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#ff5665] to-rose-400 drop-shadow-[0_0_8px_rgba(255,86,101,0.8)]">
                SERVIDOR
              </span>
              <span className="font-mono text-xs text-white/80 ml-2 tracking-widest uppercase">
                Satelital
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Botón Deslizable (Toggle) */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          setShowOfficial(!showOfficial);
        }}
        className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-full px-2 py-1 cursor-pointer hover:bg-black/80 transition-colors"
      >
        <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 ${showOfficial ? 'bg-[#ff5665]' : 'bg-gray-700'}`}>
          <motion.div 
            className="w-3 h-3 bg-white rounded-full shadow-md"
            animate={{ x: showOfficial ? 16 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div>
        <span className="text-[8px] font-mono uppercase text-gray-400 tracking-wider">
          {showOfficial ? 'Logo Oficial' : 'Logo Neon'}
        </span>
      </button>
    </div>
  );
}


