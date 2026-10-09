import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mountain, Truck, ShieldAlert, Users, Compass, ChevronRight, Radio, ArrowRight, Activity, Shield, Award, Zap, Video } from 'lucide-react';

interface Scene {
  id: number;
  category: string;
  title: string;
  description: string;
  solicitud: string;
  image: string;
  icon: any;
  bullet: string;
}

export default function Hero({ activeScene: parentActiveScene, onExplore }: { activeScene: number, onExplore?: () => void }) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const scenes: Scene[] = [
    {
      id: 0,
      category: "VIAJES & CONECTIVIDAD 4X4",
      title: "CONECTIVIDAD EN VIAJES: TOYOTA HILUX CON STARLINK MINI",
      description: "Equipamos camionetas Toyota Hilux de viaje y aventura con soportes de neodimio de alta resistencia. Conexión satelital Starlink Mini en tiempo real atravesando caminos difíciles, vientos andinos y parajes de montaña en el NOA.",
      solicitud: "camionetas y vehículos de turismo conectados permanentemente",
      image: "https://image.pollinations.ai/prompt/A%20rugged%20pickup%20truck%20parked%20in%20the%20high%20Andes%20mountains%20with%20a%20satellite%20dish%20mounted%20on%20the%20roof%20cinematic%20lighting?width=1600&height=900&nologo=true",
      icon: Mountain,
      bullet: "Hilux 4x4 + Starlink Mini"
    },
    {
      id: 1,
      category: "LOGÍSTICA PESADA & SEGURIDAD",
      title: "TRAZABILIDAD NOCTURNA Y CCTV INTELIGENTE EN CABINA SCANIA",
      description: "Sistemas DVR y cámaras de alta definición instaladas en la cabina de choferes profesionales para grabaciones 24/7 sin puntos ciegos. Sistema GPS híbrido con conmutación dinámica satelital para logística pesada y camiones en ruta.",
      solicitud: "camiones con cabina gps satelital y cctv activo",
      image: "https://image.pollinations.ai/prompt/Inside%20the%20cabin%20of%20a%20heavy%20transport%20truck%20at%20night%20with%20glowing%20CCTV%20dashboard%20screens%20and%20GPS%20navigation%20high%20tech?width=1600&height=900&nologo=true",
      icon: Truck,
      bullet: "Cámara DVR + Localizador Satelital"
    },
    {
      id: 2,
      category: "EMERGENCIAS & DESIERTO",
      title: "BASE MÉDICA DE CAMPAÑA Y SALUD REMOTA EN LA CORDILLERA",
      description: "Despliegue táctico de internet portátil en situaciones críticas de rescate andino. Enlace conmutado de bajo retardo y telefonía satelital redundante para dotaciones de paramédicos y ambulancias operando en el desierto.",
      solicitud: "empresas de paramedicos con bases remotas en alta montaña",
      image: "https://image.pollinations.ai/prompt/An%20offroad%20ambulance%20parked%20in%20a%20remote%20mountain%20desert%20setting%20up%20a%20medical%20base%20with%20a%20satellite%20internet%20antenna?width=1600&height=900&nologo=true",
      icon: ShieldAlert,
      bullet: "Paramédicos + Red Crítica de Alerta"
    },
    {
      id: 3,
      category: "GENTE DEL CAMPO CONECTADA",
      title: "ARRAIGO PRODUCTIVO E INCLUSIÓN DIGITAL RURAL EN SALTA",
      description: "Llevamos internet satelital de alta velocidad a parajes desconectados del campo. Productores, ganaderos y familias rurales acceden instantáneamente a educación digital, facturación de guías agropecuarias y videollamadas fluidas.",
      solicitud: "Productores rurales conectados en el norte argentino",
      image: "https://image.pollinations.ai/prompt/A%20traditional%20rural%20farm%20in%20Northern%20Argentina%20with%20a%20modern%20satellite%20internet%20dish%20on%20the%20roof%20sunny%20day?width=1600&height=900&nologo=true",
      icon: Users,
      bullet: "Estaciones Rurales Conectadas"
    },
    {
      id: 4,
      category: "CARAVANAS EN MOVIMIENTO",
      title: "DIRECCIÓN DE FLOTAS Y TRANSPORTE ADVENTURE EN CARAVANA",
      description: "Soporte unificado de datos para colectivos de pasajeros, camionetas de apoyo y turismo de aventura. Kit Starlink Mini con convertidores nativos a 12V/24V, manteniendo la señal activa y de alta velocidad en pleno movimiento por rutas del NOA.",
      solicitud: "vehiculos de viajes y convoys de alta disponibilidad",
      image: "https://image.pollinations.ai/prompt/A%20convoy%20of%204x4%20offroad%20adventure%20vehicles%20driving%20through%20a%20dusty%20mountain%20trail%20with%20satellite%20antennas?width=1600&height=900&nologo=true",
      icon: Compass,
      bullet: "Flota NOA + Datos Integrados"
    },
    {
      id: 5,
      category: "FASE V: VIDEO TELEMÁTICA ACTIVA",
      title: "LOS SINIESTROS NO SOLO CUESTAN POR EL CHOQUE: CUESTAN POR EL TIEMPO PERDIDO Y LA INCERTIUMBRE",
      description: "En flotas mineras, logísticas y de transporte en el NOA, una unidad parada impacta directamente en la operación. La video telemática con cámaras inteligentes permite pasar de opiniones a hechos objetivos: qué ocurrió, cuándo, dónde y en qué contexto.",
      solicitud: "dashcams inteligentes y resguardo antisiniestros para flotas",
      image: "https://image.pollinations.ai/prompt/Modern%20dual%20dashcam%20telematics%20display%20showing%20live%20video%20analytics%20and%20AI%20alerts%20in%20a%20fleet%20truck%20at%20night?width=1600&height=900&nologo=true",
      icon: Video,
      bullet: "Fase V: Video Telemática & Dashcams IA"
    }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % scenes.length);
    }, 8500);
    return () => clearInterval(slideTimer);
  }, []);

  const currentScene = scenes[activeTab];

  const handleContactWhatsApp = (scenario: string) => {
    const text = encodeURIComponent(`Hola Servidor Satelital, estuve explorando el escenario técnico de conectividad: "${scenario}" y me interesa recibir una cotización a medida.`);
    window.open(`https://wa.me/5493875843438?text=${text}`, '_blank');
  };

  return (
    <div className="relative min-h-screen w-full bg-transparent overflow-hidden flex flex-col justify-between">
      
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.45, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center brightness-[0.3] contrast-[1.1] saturate-[0.5]"
            style={{ backgroundImage: `url(${currentScene.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10 pt-28 sm:pt-32 pb-12 flex flex-col justify-center flex-1">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FF1E42]/40 bg-[#FF1E42]/10 text-[#FF1E42] text-[10px] sm:text-xs font-mono font-black tracking-widest uppercase shadow-lg shadow-[#FF1E42]/20">
              <span className="w-2 h-2 rounded-full bg-[#FF1E42] animate-ping" />
              <span>CONECTIVIDAD SATELITAL Y TELEMETRÍA FLOTAS</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-tight uppercase tracking-tight font-sans mt-4">
              Conectividad Starlink para <span className="text-gradient">Salta y el NOA</span>
            </h1>
            
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-xl">
              Soportes magnéticos reforzados, ingeniería de alimentación 12V-24V de alta eficiencia y conexión de máxima velocidad para hogares, campos, turismo de aventura y parajes rurales.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-8 max-w-md border-t border-white/5 mt-8">
              <div className="space-y-1">
                <span className="text-white font-display font-bold text-lg sm:text-2xl block leading-none">+4.000m</span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-gray-500 block">Altitud de Operación</span>
              </div>
              <div className="space-y-1 border-l border-white/10 pl-4">
                <span className="text-white font-display font-bold text-lg sm:text-2xl block leading-none">99.7%</span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-gray-500 block">SLA contractual</span>
              </div>
              <div className="space-y-1 border-l border-white/10 pl-4">
                <span className="text-[#FF1E42] font-display font-bold text-lg sm:text-2xl block leading-none">24 / 7</span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-gray-500 block">Soporte VIP local</span>
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#0b0e14]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.8)] space-y-4">
              <h3 className="text-xs font-mono tracking-widest text-white/50 uppercase border-b border-white/10 pb-3 mb-4">
                Accesos Principales
              </h3>
              
              <div className="flex flex-col gap-3">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contacto"
                  className="w-full px-6 py-4 rounded-xl bg-[#FF1E42] text-[#040609] font-mono text-xs uppercase tracking-widest font-black hover:bg-white transition-colors flex items-center justify-between shadow-[0_0_25px_rgba(255,30,66,0.4)] border-b-4 border-b-red-800 hover:border-b-2 active:border-b-0"
                >
                  <span>Instalar Starlink Hoy</span>
                  <ArrowRight size={14} />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#productos"
                  className="w-full px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-between border-b-4 border-b-white/10 hover:border-b-2 active:border-b-0"
                >
                  <span>Ver Market / Catálogo</span>
                  <ArrowRight size={14} className="text-gray-500" />
                </motion.a>
                
                <a 
                  href="#paneles" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (onExplore) onExplore();
                  }}
                  className="group relative w-full px-6 py-4 rounded-xl bg-[#0b0e14] border border-amber-500/30 hover:border-amber-500 overflow-hidden transition-all duration-500 cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.15)] flex items-center justify-between"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-[1.5s] ease-in-out" />
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                       <Zap size={16} className="animate-pulse" />
                    </div>
                    <div className="text-left">
                       <p className="text-[9px] font-mono text-amber-500 uppercase font-bold tracking-widest">El Futuro Energético</p>
                       <p className="text-sm font-display font-black text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors">
                         Paneles Solares
                       </p>
                    </div>
                  </div>
                  <ArrowRight className="text-amber-500 relative z-10 group-hover:translate-x-1 transition-transform" size={16} />
                </a>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4">
              <span className="text-[9px] font-mono tracking-widest text-[#FF1E42] font-bold uppercase block">
                [ESCENARIOS RESUELTOS EN EL NOA]
              </span>
              
              <div className="space-y-2">
                <span className="text-[8px] font-mono uppercase px-2 py-0.5 rounded bg-[#FF1E42]/15 text-[#FF1E42] border border-[#FF1E42]/25 inline-block">
                  {currentScene.category}
                </span>
                <h3 className="text-sm sm:text-md font-bold text-white font-display uppercase tracking-tight">
                  {currentScene.title}
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {currentScene.description}
                </p>
              </div>

              <div className="flex gap-1.5 pt-1">
                {scenes.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className="h-1.5 rounded-full transition-all cursor-pointer w-2 bg-white/20 hover:bg-white/40"
                    style={{ width: activeTab === idx ? "24px" : "8px", backgroundColor: activeTab === idx ? "#FF1E42" : "" }}
                    aria-label={`Ir al escenario ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleContactWhatsApp(currentScene.title)}
                  className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-[#FF1E42] hover:text-[#040609] border border-white/10 hover:border-[#FF1E42] text-white font-mono text-[10px] uppercase tracking-wider font-extrabold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border-b-4 border-b-white/5 hover:border-b-2 active:border-b-0"
                >
                  <Radio size={12} className="animate-pulse" /> Consultar por este caso
                </motion.button>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10 py-4 border-t border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center text-[9px] font-mono text-gray-500">
        <p className="flex items-center gap-1.5 uppercase">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF1E42]" /> 
          EQUIPAMIENTO DE RADIOCOMUNICACIÓN Y SOPORTES HOMOLOGADOS DE DISEÑO LOCAL SALTEÑO
        </p>
      </div>

    </div>
  );
}

