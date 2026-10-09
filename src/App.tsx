import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import KitStarlink from './components/KitStarlink';
import Products from './components/Products';
import Sectors from './components/Sectors';
import Contact from './components/Contact';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Preloader from './components/Preloader';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollFadeReveal from './components/ScrollFadeReveal';
import EarthCanvas from './components/EarthCanvas';
import SatelliteSpaceCanvas from './components/SatelliteSpaceCanvas';
import WhatsAppModal from './components/WhatsAppModal';
import ClientTagCloud from './components/ClientTagCloud';
import SolarModules from './components/SolarModules';
import BuyerPersonaSection from './components/BuyerPersonaSection';
import TelematicsSpecSection from './components/TelematicsSpecSection';
import VideoTelematicsSection from './components/VideoTelematicsSection';
import { AnimatePresence, motion } from 'motion/react';
import { 
  ArrowLeft, 
  ExternalLink, 
  ShoppingBag, 
  Mail, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle, 
  MapPin, 
  PhoneCall, 
  Calendar,
  MessageSquare,
  Sparkles,
  Zap
} from 'lucide-react';

declare global {
  interface Window {
    openWhatsAppSelector?: (preselectedCategory?: string) => void;
  }
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('inicio');

  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [whatsAppInitialCategory, setWhatsAppInitialCategory] = useState<string | undefined>(undefined);

  // Advanced client-side routing state for dedicated subpages (/Market, /contacto)
  const [currentRoute, setCurrentRoute] = useState<'home' | 'market' | 'contacto' | 'paneles'>('home');

  // Force URL to base path on mount to ensure preview always starts at home, since AI Studio iframe persists URL hashes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window.location.hash.includes('paneles') || window.location.pathname.includes('paneles'))) {
        window.history.replaceState(null, '', '/');
      }
    } catch (e) {
      // Ignore
    }
    // Hard reset to home on mount just in case
    setCurrentRoute('home');
  }, []);

  // Listen to popstate and hashchange for fluid browser forward/backward buttons
  useEffect(() => {
    const handleLocationChange = () => {
      try {
        const hash = window.location.hash.toLowerCase();
        
        // If we are still loading the preloader, do not process route changes to avoid jumping
        if (document.getElementById('btn-skip-intro-top')) {
            return;
        }
        
        // Auto-switch to home if we navigate to a landing page section anchor
        const landingHashes = ['#inicio', '#institucional', '#starlink', '#sectores', '#trayectoria', '#productos', '#servicios', '#contacto'];
        if (landingHashes.includes(hash) || hash === '') {
          setCurrentRoute('home');
          // Give React a frame to mount and scroll
          setTimeout(() => {
            const elId = hash.replace('#', '') || 'inicio';
            const el = document.getElementById(elId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 60);
          return;
        }

        if (hash === '#market' || hash === '#/market') {
          setCurrentRoute('market');
          return;
        }
        if (hash === '#contacto' || hash === '#/contacto') {
          setCurrentRoute('contacto');
          return;
        }
        if (hash === '#paneles' || hash === '#/paneles') {
          setCurrentRoute('paneles');
          return;
        }

        const searchParams = new URLSearchParams(window.location.search);
        const pageParam = searchParams.get('page');
        if (pageParam === 'market') {
          setCurrentRoute('market');
          return;
        }
        if (pageParam === 'contacto') {
          setCurrentRoute('contacto');
          return;
        }
        if (pageParam === 'paneles') {
          setCurrentRoute('paneles');
          return;
        }

        let rawPath = window.location.pathname.toLowerCase();
        if (rawPath.endsWith('/')) rawPath = rawPath.slice(0, -1);
        if (rawPath === '/market') {
          setCurrentRoute('market');
        } else if (rawPath === '/contacto') {
          setCurrentRoute('contacto');
        } else if (rawPath === '/paneles') {
          setCurrentRoute('paneles');
        } else {
          setCurrentRoute('home');
        }
      } catch (e) {
        console.warn("Error resolving path on hook:", e);
      }
    };
    window.addEventListener('popstate', handleLocationChange, { passive: true });
    window.addEventListener('hashchange', handleLocationChange, { passive: true });

    // Patch history pushState to catch programmatic changes cleanly
    let originalPush: any;
    try {
      originalPush = window.history.pushState;
      window.history.pushState = function(...args) {
        try {
          if (originalPush) {
            originalPush.apply(this, args);
          }
        } catch (err) {
          console.warn("History pushState restricted by browser/iframe security. Using state-only routing routing:", err);
        }
        handleLocationChange();
      };
    } catch (e) {
      console.warn("Cannot patch history.pushState:", e);
    }

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      try {
        if (originalPush) {
          window.history.pushState = originalPush;
        }
      } catch (e) {
        console.warn("Cannot restore pushState:", e);
      }
    };
  }, []);

  const navigateTo = (route: 'home' | 'market' | 'contacto' | 'paneles', hash?: string) => {
    const path = route === 'market' ? '/Market' : (route === 'contacto' ? '/contacto' : (route === 'paneles' ? '/paneles' : '/'));
    
    try {
      window.history.pushState(null, '', path + (hash || ''));
    } catch (e) {
      console.warn("History pushState is restricted in this session. Falling back to state + hash parameters:", e);
      try {
        if (route !== 'home') {
          window.location.hash = `#${route}`;
        } else {
          window.location.hash = hash || '#inicio';
        }
      } catch (err) {
        console.warn("Failed to set window location hash fallback:", err);
      }
    }
    
    setCurrentRoute(route);
    
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  useEffect(() => {
    window.openWhatsAppSelector = (category?: string) => {
      setWhatsAppInitialCategory(category);
      setIsWhatsAppOpen(true);
    };
    return () => {
      window.openWhatsAppSelector = undefined;
    };
  }, []);

  // Single IntersectionObserver for landing page section tracking
  useEffect(() => {
    if (loading || currentRoute !== 'home') return;

    const sections = ['inicio', 'institucional', 'solar', 'starlink', 'sectores', 'trayectoria', 'productos', 'servicios', 'contacto'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading, currentRoute]);

  // Removed global scroll listener to prevent performance issues and mobile layout breaking

  const simplePreloaderFallback = (
    <div className="fixed inset-0 z-[9999] bg-[#06080c] flex flex-col justify-center items-center text-center p-8">
      <div className="absolute inset-0 bg-[radial-gradient(#FF5665_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
      <div className="mb-6 w-16 h-16 border-4 border-t-[#FF5665] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
      <h1 className="text-2xl font-display font-extrabold text-white tracking-widest uppercase mb-2 animate-pulse">
        Servidor Satelital
      </h1>
      <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">
        Estableciendo enlace de reserva 2D...
      </p>
      <button 
        onClick={() => setLoading(false)}
        className="mt-8 px-6 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-mono text-xs rounded transition-all cursor-pointer"
      >
        SALTAR AL PORTAL
      </button>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {loading && (
          <ErrorBoundary fallback={
            <div className="fixed inset-0 z-[9999] bg-[#06080c]">
              {simplePreloaderFallback}
            </div>
          }>
            <Preloader onComplete={() => setLoading(false)} />
          </ErrorBoundary>
        )}
      </AnimatePresence>
      
      {!loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="bg-bg-base text-white min-h-screen selection:bg-[#FF5665]/30 selection:text-[#FF5665] font-sans relative w-full overflow-x-hidden"
        >
          {/* Universal Satellite Space Server Environment */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <ErrorBoundary fallback={<div className="absolute inset-0 bg-[#030509]" />}>
              <SatelliteSpaceCanvas />
            </ErrorBoundary>
            <div 
              className="absolute inset-0 bg-[#030509] transition-all duration-700 ease-out pointer-events-none"
              style={{ 
                opacity: currentRoute !== 'home' || activeSection !== 'inicio' ? 0.70 : 0.20
              }} 
            />
          </div>

          {/* STANDALONE ROUTE: MARKETPAGE DEDICATED LAYOUT */}
          {currentRoute === 'market' && (
            <div className="relative z-10 min-h-screen flex flex-col justify-between">
              
              {/* Standalone Nav header */}
              <nav className="sticky top-0 left-0 right-0 z-40 bg-[#06080c]/90 backdrop-blur-2xl border-b border-white/5 py-3 px-6 shadow-2xl">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => navigateTo('home')}
                      className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                        <ArrowLeft size={14} />
                      </div>
                      <span className="text-[11px] font-mono tracking-widest uppercase hidden sm:block">Retornar</span>
                    </button>
                    <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
                    <span className="text-xs font-display font-medium tracking-[0.2em] text-white uppercase flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5665] animate-pulse"></span>
                      E-COMMERCE SATELITAL
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigateTo('contacto')}
                      className="px-5 py-2.5 bg-white text-black text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-[#FF5665] hover:text-white transition-all cursor-pointer rounded-none border border-transparent hover:border-[#FF5665]"
                    >
                      Solicitar Cotización
                    </button>
                  </div>
                </div>
              </nav>

              {/* Subpage Hero banner */}
              <div className="bg-gradient-to-b from-[#0b0e14] to-transparent py-14 border-b border-white/5 text-center px-4">
                <div className="max-w-3xl mx-auto space-y-4">
                  <span className="inline-flex items-center gap-1 bg-[#FF5665]/10 border border-[#FF5665]/20 px-3 py-1 rounded-full text-[9px] font-mono text-[#FF5665] font-extrabold tracking-widest uppercase">
                    <ShoppingBag size={10} />
                    CATÁLOGO OFICIAL DE EQUIPAMIENTO
                  </span>
                  <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white uppercase">
                    Portal de Hardware
                  </h1>
                  <p className="text-gray-400 text-sm max-w-xl mx-auto font-light leading-relaxed">
                    Explore nuestro catálogo especializado para logística, turismo aventura, hogares y campos rurales del NOA con repuestos oficiales, soportes imantados y conversores de potencia directa.
                  </p>
                </div>
              </div>

              {/* Core catalog component */}
              <main className="flex-grow">
                <Products />
              </main>

              {/* Mercado Pago payment assurance banner */}
              <div className="bg-[#0b0e14] border-t border-b border-white/5 py-12 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                  <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="p-3 rounded-xl bg-[#009EE3]/15 text-[#009EE3] shrink-0 h-11 w-11 flex items-center justify-center">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">CRÉDITO Y MERCADO PAGO</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed font-light">
                        Aceptamos Mercado Pago, tarjetas corporativas y pasarelas de pago con acreditación instantánea.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-400 shrink-0 h-11 w-11 flex items-center justify-center">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">CHEQUES DE PAGO DIFERIDO</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed font-light">
                        Facilidades financieras comerciales mediante Cheques de Pago Diferido (eCheqs) previa validación crediticia.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="p-3 rounded-xl bg-rose-500/15 text-[#FF5665] shrink-0 h-11 w-11 flex items-center justify-center">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">INGENIERÍA SALTEÑA APORTADA</h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed font-light">
                        Soportes forjados localmente y equipos testeados a más de 4000 MSNM con soporte de emergencia 24hs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simplified footer */}
              <footer className="bg-black py-8 border-t border-white/10 text-center text-xs text-gray-500 font-mono">
                <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span>© 2026 Servidor Satelital. Todos los derechos reservados.</span>
                  <div className="flex gap-4 text-gray-400">
                    <button onClick={() => navigateTo('home')} className="hover:text-white cursor-pointer select-none">Web Principal</button>
                    <span>|</span>
                    <button onClick={() => navigateTo('contacto')} className="hover:text-white cursor-pointer select-none">Contacto Directo</button>
                  </div>
                </div>
              </footer>
            </div>
          )}

          {/* STANDALONE ROUTE: DEDICATED CONTACT FORM LAYOUT */}
          {currentRoute === 'contacto' && (
            <div className="relative z-10 min-h-screen flex flex-col justify-between">
              
              {/* Standalone Nav header */}
              <nav className="sticky top-0 left-0 right-0 z-40 bg-[#06080c]/90 backdrop-blur-2xl border-b border-white/5 py-3 px-6 shadow-2xl">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => navigateTo('home')}
                      className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                        <ArrowLeft size={14} />
                      </div>
                      <span className="text-[11px] font-mono tracking-widest uppercase hidden sm:block">Retornar</span>
                    </button>
                    <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
                    <span className="text-xs font-display font-medium tracking-[0.2em] text-white uppercase flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                      CENTRO DE INGENIERÍA
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={() => navigateTo('market')}
                      className="px-5 py-2.5 bg-transparent border border-white/20 text-white text-[11px] font-mono font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer rounded-none"
                    >
                      Catálogo de Equipamiento
                    </button>
                  </div>
                </div>
              </nav>

              {/* Subpage content */}
              <main className="flex-grow py-12">
                <div className="max-w-4xl mx-auto px-6 text-center mb-8">
                  <span className="inline-flex items-center gap-1 bg-[#FF5665]/10 border border-[#FF5665]/20 px-3 py-1 rounded-full text-[9px] font-mono text-[#FF5665] font-extrabold tracking-widest uppercase mb-3">
                    <Mail size={10} />
                    CENTRO DE INGENIERÍA & DESPACHO DIRECTO
                  </span>
                  <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-white uppercase">
                    Contacto Corporativo
                  </h1>
                  <p className="text-gray-400 text-sm max-w-xl mx-auto font-light leading-relaxed mt-2">
                    Envíe su pliego de licitación o solicite asesoramiento técnico de alta fidelidad. Nuestro equipo técnico responderá inmediatamente por correo o WhatsApp.
                  </p>
                </div>

                {/* Core contact module */}
                <Contact />

                {/* High quality corporate location details */}
                <div className="max-w-3xl mx-auto px-6 mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                  <div className="p-5 bg-[#0b0e14]/80 border border-white/10 rounded-2xl flex flex-col justify-between space-y-4">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-10 h-10 flex items-center justify-center shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">OFICINA SALTA</h4>
                      <p className="text-[11px] text-gray-400 mt-1 lines-clamp-2">
                        Salta Capital, República Argentina. Centro de ensamble y despacho al NOA.
                      </p>
                    </div>
                  </div>
                  <div className="p-5 bg-[#0b0e14]/80 border border-white/10 rounded-2xl flex flex-col justify-between space-y-4">
                    <div className="p-2.5 rounded-xl bg-[#FF5665]/10 text-[#FF5665] w-10 h-10 flex items-center justify-center shrink-0">
                      <PhoneCall size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">DIRECCIÓN TÉCNICA</h4>
                      <p className="text-[11px] text-gray-400 mt-1">
                        José Luis Sarachu (CTO)<br />
                        <span className="text-[#FF5665] font-bold font-mono">+54 9 387 584-3438</span>
                      </p>
                    </div>
                  </div>
                  <div className="p-5 bg-[#0b0e14]/80 border border-white/10 rounded-2xl flex flex-col justify-between space-y-4">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-10 h-10 flex items-center justify-center shrink-0">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">SOPORTE EN CAMPO</h4>
                      <p className="text-[11px] text-gray-400 mt-1">
                        SLA de contingencia las 24 horas y soporte técnico inmediato en toda la provincia.
                      </p>
                    </div>
                  </div>
                </div>
              </main>

              {/* Simplified footer */}
              <footer className="bg-black py-8 border-t border-white/10 text-center text-xs text-gray-500 font-mono">
                <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span>© 2026 Servidor Satelital. Todos los derechos reservados.</span>
                  <div className="flex gap-4 text-gray-400">
                    <button onClick={() => navigateTo('home')} className="hover:text-white cursor-pointer select-none">Web Principal</button>
                    <span>|</span>
                    <button onClick={() => navigateTo('market')} className="hover:text-white cursor-pointer select-none">Mercado Catálogo</button>
                  </div>
                </div>
              </footer>
            </div>
          )}

          {/* STANDALONE ROUTE: DEDICATED SOLAR PANELS LAYOUT */}
          {currentRoute === 'paneles' && (
            <div className="relative z-10 min-h-screen flex flex-col justify-between bg-transparent">

              {/* Standalone Nav header */}
              <nav className="fixed top-0 left-0 right-0 z-50 bg-[#06080c]/90 backdrop-blur-2xl border-b border-white/5 py-3 px-6 shadow-2xl">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => navigateTo('home')}
                      className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                        <ArrowLeft size={14} />
                      </div>
                      <span className="text-[11px] font-mono tracking-widest uppercase hidden sm:block">Retornar</span>
                    </button>
                    <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
                    <span className="text-xs font-display font-medium tracking-[0.2em] text-white uppercase flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      INFRAESTRUCTURA SOLAR
                    </span>
                  </div>
                  <div>
                    {/* Removed unneeded button as requested */}
                  </div>
                </div>
              </nav>

              {/* Core Solar Modules Content */}
              <main className="flex-grow pt-24">
                <SolarModules />
              </main>

              <footer className="bg-black py-8 border-t border-white/10 text-center text-xs text-gray-500 font-mono">
                <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span>© 2026 Servidor Satelital Solares. Todos los derechos reservados.</span>
                  <div className="flex gap-4 text-gray-400">
                    <button onClick={() => navigateTo('home')} className="hover:text-white cursor-pointer select-none">Web Principal</button>
                    <span>|</span>
                    <button onClick={() => navigateTo('contacto')} className="hover:text-white cursor-pointer select-none">Contacto</button>
                  </div>
                </div>
              </footer>
            </div>
          )}

          {/* LANDING PAGE ROUTE: SPATIAL CONTINUOUS SCROLLING ENVIRONMENT */}
          {currentRoute === 'home' && (
            <>
              <Navbar activeTab={activeSection} />
              
              {/* Marketing Promotion Header Alert: direct navigation option */}
              <div className="fixed bottom-6 left-6 z-40 hidden lg:flex flex-col gap-2 items-start bg-black/85 backdrop-blur-3xl border border-[#FF5665]/30 rounded-2xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.8)] max-w-sm">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[9px] font-mono tracking-widest text-[#FF5665] font-extrabold uppercase">
                    ATENCIÓN CORPORATIVA
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white font-sans mt-1">
                  ¿Deseas acceder al catálogo interactivo de hardware?
                </h4>
                <p className="text-[10px] text-gray-400 leading-relaxed font-light">
                  Abre las soluciones comerciales en una sección independiente y accede a la descarga de pliegos y especificaciones técnicas.
                </p>
                <div className="flex gap-2 w-full pt-1.5">
                  <button 
                    onClick={() => navigateTo('market')}
                    className="flex-1 py-1.5 px-3 bg-[#FF5665] hover:bg-rose-500 rounded-lg text-[9px] font-mono font-extrabold text-black flex items-center justify-center gap-1 cursor-pointer transition-all uppercase"
                  >
                    <span>Ver Catálogo</span>
                    <ExternalLink size={10} />
                  </button>
                  <button 
                    onClick={() => navigateTo('contacto')}
                    className="flex-1 py-1.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-[9px] font-mono text-white flex items-center justify-center gap-1 cursor-pointer transition-all uppercase"
                  >
                    <span>Cent. Contacto</span>
                  </button>
                </div>
              </div>

              <main className="relative z-10 bg-transparent">
                {/* Hero Section */}
                <div id="inicio">
                  <Hero activeScene={0} onExplore={() => navigateTo('paneles')} />
                </div>
                
                {/* About / Institution Section */}
                <div id="institucional">
                  <ScrollFadeReveal>
                    <ErrorBoundary fallback={<div className="p-12 text-center bg-[#06080c]">Cargando sección Institucional...</div>}>
                      <About />
                    </ErrorBoundary>
                  </ScrollFadeReveal>
                </div>

                {/* Starlink Section */}
                <div id="starlink">
                  <ScrollFadeReveal>
                    <ErrorBoundary fallback={<div className="p-12 text-center bg-[#06080c]">Cargando sección Starlink...</div>}>
                      <KitStarlink />
                    </ErrorBoundary>
                  </ScrollFadeReveal>
                </div>
                
                {/* Sectors Section */}
                <div id="sectores">
                  <ScrollFadeReveal>
                    <ErrorBoundary fallback={<div className="p-12 text-center bg-[#06080c]">Cargando sección Sectores...</div>}>
                      <Sectors />
                    </ErrorBoundary>
                  </ScrollFadeReveal>
                </div>

                {/* 3D Clientes Cloud Section */}
                <div id="trayectoria">
                  <ScrollFadeReveal>
                    <ErrorBoundary fallback={<div className="p-12 text-center bg-[#06080c]">Cargando trayectoria de clientes...</div>}>
                      <ClientTagCloud />
                    </ErrorBoundary>
                  </ScrollFadeReveal>
                </div>

                {/* Products Section */}
                <div id="productos">
                  <ScrollFadeReveal>
                    <ErrorBoundary fallback={<div className="p-12 text-center bg-[#06080c]">Cargando Productos...</div>}>
                      <Products />
                    </ErrorBoundary>
                  </ScrollFadeReveal>
                </div>
                
                {/* Services Section */}
                <div id="servicios">
                  <ScrollFadeReveal>
                    <ErrorBoundary fallback={<div className="p-12 text-center bg-[#06080c]">Cargando Servicios...</div>}>
                      <Services />
                    </ErrorBoundary>
                  </ScrollFadeReveal>
                </div>

                {/* Dedicated Video Telematics & Dashcams Section */}
                <div id="video-telematica">
                  <ScrollFadeReveal>
                    <ErrorBoundary fallback={<div className="p-12 text-center bg-[#06080c]">Cargando Sección Video Telemática...</div>}>
                      <VideoTelematicsSection />
                    </ErrorBoundary>
                  </ScrollFadeReveal>
                </div>

                {/* Buyer Persona / Video Telemática Section */}
                <div id="telematica-roles">
                  <ScrollFadeReveal>
                    <ErrorBoundary fallback={<div className="p-12 text-center bg-[#06080c]">Cargando Cuadro Argumental...</div>}>
                      <BuyerPersonaSection />
                    </ErrorBoundary>
                  </ScrollFadeReveal>
                </div>

                {/* Telematics & Dashcams Specs */}
                <div id="telematica-especificaciones">
                  <ScrollFadeReveal>
                    <ErrorBoundary fallback={<div className="p-12 text-center bg-[#06080c]">Cargando Especificaciones de Telemática...</div>}>
                      <TelematicsSpecSection />
                    </ErrorBoundary>
                  </ScrollFadeReveal>
                </div>
                
                {/* Contact Section */}
                <div id="contacto">
                  <ScrollFadeReveal>
                    <ErrorBoundary fallback={<div className="p-12 text-center bg-[#06080c]">Cargando Contacto...</div>}>
                      <Contact />
                    </ErrorBoundary>
                  </ScrollFadeReveal>
                </div>
              </main>
            </>
          )}

          <FloatingWhatsApp />
          <WhatsAppModal isOpen={isWhatsAppOpen} onClose={() => setIsWhatsAppOpen(false)} initialCategory={whatsAppInitialCategory} />
        </motion.div>
      )}
    </>
  );
}
