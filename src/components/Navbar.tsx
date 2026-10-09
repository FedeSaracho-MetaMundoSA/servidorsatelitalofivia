import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Compass, ArrowRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { CustomLogo } from './Logo';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

function EarthGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[1, 32, 32]} scale={1.8}>
        <meshStandardMaterial
          color="#040609"
          emissive="#001122"
          roughness={0.8}
          metalness={0.5}
        />
      </Sphere>
      {/* Atmosphere / Wireframe */}
      <Sphere args={[1.05, 32, 32]} scale={1.8}>
        <meshBasicMaterial
          color="#FF5665"
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>
    </group>
  );
}

function Sidebar3DBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <EarthGlobe />
      </Canvas>
    </div>
  );
}

export default function Navbar({ activeTab }: { activeTab: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Nosotros', id: 'institucional' },
    { label: '⚡ ENERGÍA SOLAR', id: 'paneles' },
    { label: '📹 VIDEO TELEMÁTICA & DASHCAMS', id: 'video-telematica' },
    { label: 'Internet Satelital', id: 'starlink' },
    { label: 'Clientes', id: 'trayectoria' },
    { label: 'Market (Productos)', id: 'productos' },
    { label: 'Contacto', id: 'contacto' }
  ];

  return (
    <>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-4 left-0 right-0 z-50 pointer-events-none flex justify-between px-4 sm:px-8 items-center"
      >
        <a href="#inicio" className="pointer-events-auto flex items-center gap-1 group origin-left bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/5">
          <CustomLogo className="w-24 sm:w-28 h-auto" />
        </a>

        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          {/* Direct Quick Pill for Video Telematics & Solar */}
          <a
            href="#video-telematica"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-rose-600/20 hover:bg-rose-600/30 border border-[#FF5665]/40 text-[#FF5665] text-[10px] font-mono uppercase tracking-wider font-extrabold transition-all duration-300 backdrop-blur-md shadow-[0_0_15px_rgba(255,86,101,0.2)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5665] animate-pulse" />
            <span>📹 DASHCAMS IA</span>
          </a>

          <a
            href="#paneles"
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-mono uppercase tracking-wider font-extrabold transition-all duration-300 backdrop-blur-md"
          >
            <span>⚡ SOLAR</span>
          </a>

          {/* Quick Contact button hidden on small mobile */}
          <a
            href="#contacto"
            className="hidden sm:inline-flex px-4 py-2 rounded-full bg-[#FF5665] hover:bg-rose-500 text-[#06080c] text-[10px] font-mono uppercase tracking-wider font-extrabold transition-all duration-300 shadow-md shadow-[#FF5665]/20"
          >
            COTIZAR PROYECTO
          </a>

          <button 
            onClick={() => setIsOpen(true)}
            className="p-3 rounded-full bg-[#0b0e14]/90 backdrop-blur-xl border border-[#FF5665]/30 text-[#FF5665] hover:bg-[#FF5665] hover:text-black transition-all cursor-pointer shadow-[0_0_15px_rgba(255,86,101,0.2)]"
            aria-label="Open Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.div>

      {/* Right Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[450px] bg-[#040609] border-l border-white/10 z-[70] shadow-2xl flex flex-col overflow-hidden"
            >
              <Sidebar3DBackground />

              <div className="relative z-10 flex flex-col h-full p-8 pt-12">
                <div className="flex justify-between items-center mb-12">
                  <span className="text-[10px] font-mono tracking-widest text-[#FF5665] font-bold uppercase border border-[#FF5665]/20 px-3 py-1 rounded-full bg-[#FF5665]/5">
                    Menú Principal
                  </span>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex flex-col gap-4 flex-1 justify-center">
                  {links.map((link, i) => {
                    let isActive = activeTab === link.id;
                    if (link.id === 'starlink' && (activeTab === 'sectores' || activeTab === 'servicios' || activeTab === 'starlink')) {
                      isActive = true;
                    }
                    
                    const isHomePath = typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '');
                    const linkHref = isHomePath ? `#${link.id}` : `/#${link.id}`;

                    return (
                      <motion.a
                        key={link.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        href={linkHref}
                        onClick={() => setIsOpen(false)}
                        className={`group flex items-center justify-between py-4 border-b border-white/5 text-lg sm:text-xl font-display uppercase tracking-wider transition-all
                          ${isActive 
                            ? 'text-[#FF5665] font-black' 
                            : 'text-gray-300 hover:text-white'
                          }
                          ${link.id === 'paneles' ? 'text-amber-500' : ''}
                        `}
                      >
                        <span className="flex items-center gap-4">
                          <span className={`w-2 h-2 rounded-full transition-all ${isActive ? 'bg-[#FF5665] scale-100' : 'bg-transparent scale-0 group-hover:bg-white/50 group-hover:scale-100'}`} />
                          {link.label}
                        </span>
                        <ArrowRight size={18} className={`transition-transform duration-300 ${isActive ? 'translate-x-0 opacity-100 text-[#FF5665]' : '-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-gray-500'}`} />
                      </motion.a>
                    );
                  })}
                </nav>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <a
                    href="#contacto"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center py-4 rounded-xl bg-[#FF5665] hover:bg-rose-500 text-black font-mono text-xs uppercase tracking-widest font-black transition-all shadow-[0_0_20px_rgba(255,86,101,0.3)]"
                  >
                    Cotizar Proyecto
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
