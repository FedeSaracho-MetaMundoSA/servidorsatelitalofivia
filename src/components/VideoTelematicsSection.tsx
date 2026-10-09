import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, 
  Smartphone, 
  Laptop, 
  Camera, 
  MapPin, 
  Play, 
  ShieldCheck, 
  Radio, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Wifi, 
  Server, 
  Eye, 
  Lock, 
  Sparkles,
  Maximize2,
  ExternalLink,
  ChevronRight,
  Activity
} from 'lucide-react';

export default function VideoTelematicsSection() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isSimulatingStream, setIsSimulatingStream] = useState<boolean>(false);

  const ecosystemCards = [
    {
      id: 1,
      tag: "APLICACIÓN MÓVIL",
      title: "UBICAR APP",
      badge: "iOS / Android",
      icon: Smartphone,
      color: "from-rose-500/20 to-red-600/20 border-rose-500/40 text-rose-400",
      accent: "#FF5665",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
      imageLabel: "SMARTPHONE CON UBICAR APP",
      description: "Aplicación móvil para monitorear vehículos, recibir alertas push instantáneas, consultar recorridos históricos y administrar dispositivos desde cualquier lugar.",
      bulletList: [
        "Monitoreo nativo iOS / Android",
        "Alertas push en tiempo real",
        "Historial interactivo de recorridos",
        "Gestión y apagado remoto de motor"
      ]
    },
    {
      id: 2,
      tag: "PLATAFORMA WEB",
      title: "UBITRACK PRO",
      badge: "Software B2B",
      icon: Laptop,
      color: "from-blue-500/20 to-indigo-600/20 border-blue-500/40 text-blue-400",
      accent: "#3B82F6",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      imageLabel: "LAPTOP CON UBITRACK PRO DASHBOARD",
      description: "Plataforma profesional para flotas: monitoreo satelital en tiempo real, reportes de telemetría CAN-Bus de motor, geocercas y gestión de mantenimiento.",
      bulletList: [
        "Telemetría avanzada de motor",
        "Geocercas & Puntos de Interés",
        "Alertas ADAS / DMS en vivo",
        "Reportes ejecutivos B2B descargables"
      ]
    },
    {
      id: 3,
      tag: "IA EN CABINA & CARRETERA",
      title: "CÁMARAS INTELIGENTES",
      badge: "Dashcam Dual IA",
      icon: Camera,
      color: "from-amber-500/20 to-orange-600/20 border-amber-500/40 text-amber-400",
      accent: "#F59E0B",
      image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=800&auto=format&fit=crop",
      imageLabel: "DASHCAM DUAL CON VISIÓN NOCTURNA IR",
      description: "Dashcams con registro automático de eventos por impacto, alertas de conducción, prevención de fatiga/distracción y evidencia objetiva ante siniestros.",
      bulletList: [
        "Visión Dual HD + Infrarrojo IR Cabina",
        "Sensor G de impacto en 3 ejes",
        "Detector IA de fatiga y celular",
        "Descarga remota en clips de 1 min"
      ]
    },
    {
      id: 4,
      tag: "RASTREO DE ACTIVOS",
      title: "SOLUCIONES DE RASTREO",
      badge: "Satelital SWR",
      icon: MapPin,
      color: "from-emerald-500/20 to-teal-600/20 border-emerald-500/40 text-emerald-400",
      accent: "#10B981",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
      imageLabel: "DISPOSITIVO DE LOCALIZACIÓN SATELITAL",
      description: "Tecnología de localización para vehículos, maquinaria pesada y activos con monitoreo permanente, alertas de sabotaje y protocolos de recuperación.",
      bulletList: [
        "Geolocalización satelital SWR",
        "Alertas de desconexión / jammer",
        "Corte remoto de motor",
        "Soporte para zonas de silencio Puna"
      ]
    }
  ];

  const stepsList = [
    {
      number: 1,
      title: "Autenticación Profesional",
      text: "Ingrese a Ubitrack Pro con su usuario y contraseña corporativa.",
      detail: "Acceso seguro SSL de alta velocidad con credenciales encriptadas."
    },
    {
      number: 2,
      title: "Módulo Tiempo Real",
      text: "Acceda al módulo Tiempo Real en la consola central.",
      detail: "Visualice el mapa interactivo con la ubicación satelital de cada unidad."
    },
    {
      number: 3,
      title: "Selección de Vehículo",
      text: "Busque el vehículo que desea visualizar.",
      detail: "Filtre por patente, chofer, ruta o estado de alerta en carretera."
    },
    {
      number: 4,
      title: "Conexión Live Stream (Wi-Fi / 4G)",
      text: "Haga clic sobre el ícono Live Streams (Wi-Fi), ubicado junto al nombre del vehículo.",
      detail: "Se activa el protocolo de enlace seguro P2P con la Dashcam."
    },
    {
      number: 5,
      title: "Transmisión en Tiempo Real",
      text: "Espere unos segundos mientras se establece la conexión con la cámara.",
      detail: "Una vez iniciada la transmisión podrá visualizar lo que está ocurriendo en ese momento."
    }
  ];

  const activeModalData = ecosystemCards.find(c => c.id === selectedModule);

  return (
    <section id="video-telematica" className="py-20 bg-transparent text-white relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* TOP HERO HUD BANNER */}
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 mb-16 relative shadow-[0_0_80px_rgba(255,30,66,0.18)]">
          <div className="absolute top-0 right-0 bg-[#FF1E42] text-black font-mono text-[10px] font-black uppercase tracking-widest px-5 py-1.5 rounded-bl-2xl flex items-center gap-2">
            <Sparkles size={13} />
            <span>ENLACE SATELITAL VIVO</span>
          </div>

          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 text-[#FF1E42] font-mono text-xs font-bold uppercase tracking-widest bg-[#FF1E42]/10 px-3 py-1 rounded-full border border-[#FF1E42]/20">
              <Video size={14} className="animate-pulse" />
              <span>VIDEO TELEMÁTICA Y DASHCAMS IA UBITRACK PRO</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight leading-none">
              MÁS VISIBILIDAD.<br />
              MÁS PREVENCIÓN.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1E42] via-rose-500 to-amber-400">
                MÁS CONTROL.
              </span>
            </h2>

            <div className="inline-block bg-[#FF1E42] text-[#040609] px-5 py-1.5 rounded-xl text-lg sm:text-2xl font-display font-black uppercase tracking-widest shadow-lg shadow-[#FF1E42]/30">
              DASH CAM & TELEMETRÍA
            </div>

            <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
              La solución <strong className="text-white font-bold">DASH CAM</strong> le permitirá acceder a videos en tiempo real, consultar grabaciones de eventos y solicitar la descarga de clips históricos directamente desde Ubitrack Pro.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  window.openWhatsAppSelector?.('gestion-siniestros-coaching-flotas');
                }}
                className="px-7 py-3.5 bg-[#FF1E42] text-[#040609] font-mono text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-xl shadow-[#FF1E42]/40 flex items-center gap-2 cursor-pointer border-b-4 border-b-red-800"
              >
                <span>Cotizar Sistema Dashcam</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => setIsSimulatingStream(true)}
                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play size={16} className="text-[#FF1E42]" />
                <span>Simular Conexión Vivo</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 ECOSYSTEM MODULES WITH SPECIFIC IMAGE SHOWCASES */}
        <div className="mb-20 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono text-[#FF1E42] font-bold uppercase tracking-widest border border-[#FF1E42]/30 px-3 py-1 rounded-full bg-[#FF1E42]/10">
              PLATAFORMAS INTEGRADAS & HARDWARE
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              Un Ecosistema para <span className="text-[#FF1E42]">Cada Necesidad</span>
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm font-light">
              Soluciones interconectadas con visualización directa para el control total de su flota desde cualquier dispositivo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ecosystemCards.map((card) => {
              const IconComp = card.icon;

              return (
                <motion.div
                  key={card.id}
                  whileHover={{ y: -5 }}
                  className="bg-black/40 backdrop-blur-xl border border-white/10 hover:border-[#FF1E42]/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group shadow-2xl relative overflow-hidden"
                >
                  <div className="space-y-5">
                    {/* Header line */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-xl bg-gradient-to-br ${card.color} border`}>
                          <IconComp size={18} />
                        </div>
                        <span className="text-[10px] font-mono font-bold tracking-widest text-gray-300 uppercase">
                          {card.tag}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#FF1E42] bg-[#FF1E42]/10 px-2.5 py-1 rounded-full border border-[#FF1E42]/30 font-bold uppercase">
                        {card.badge}
                      </span>
                    </div>

                    <h4 className="text-2xl font-display font-black text-white uppercase tracking-tight group-hover:text-[#FF1E42] transition-colors">
                      {card.title}
                    </h4>

                    {/* SPECIFIC REFERENTIAL IMAGE CONTAINER */}
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 group-hover:border-[#FF1E42]/40 transition-colors shadow-lg bg-black">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 contrast-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Image HUD Badge Overlay */}
                      <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold text-white border border-white/10 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E42] animate-ping" />
                        <span>{card.imageLabel}</span>
                      </div>

                      <button
                        onClick={() => setSelectedModule(card.id)}
                        className="absolute bottom-3 right-3 bg-black/80 hover:bg-[#FF1E42] hover:text-black text-white font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Maximize2 size={12} />
                        <span>Ver Inspección HD</span>
                      </button>
                    </div>

                    <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
                      {card.description}
                    </p>

                    <div className="pt-2 space-y-2 border-t border-white/10">
                      {card.bulletList.map((b, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                          <CheckCircle2 size={13} className="text-[#FF5665] shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-gray-400 uppercase">TECNOLOGÍA OFICIAL UBITRACK</span>
                    <button
                      onClick={() => {
                        window.openWhatsAppSelector?.(`consultar-${card.title.toLowerCase().replace(/\s+/g, '-')}`);
                      }}
                      className="text-[#FF5665] hover:underline font-bold flex items-center gap-1 cursor-pointer uppercase"
                    >
                      <span>Cotizar Módulo</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* STEP BY STEP PROCEDURE PANEL */}
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-white/10 pb-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#FF5665] text-black font-display font-black text-lg flex items-center justify-center">
                  1
                </div>
                <h3 className="text-xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                  Vista en Vivo y Vehículos con Más de una Cámara
                </h3>
              </div>
              <p className="text-gray-300 font-mono text-xs sm:text-sm uppercase tracking-wider font-bold">
                ACCEDÉ A LA TRANSMISIÓN EN TIEMPO REAL DE LA DASH CAM INSTALADA EN EL VEHÍCULO.
              </p>
            </div>

            <button
              onClick={() => setIsSimulatingStream(true)}
              className="px-6 py-3 bg-[#FF5665] hover:bg-white text-black font-mono text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Video size={16} />
              <span>PROBAR TRANSMISIÓN LIVE</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Steps List */}
            <div className="lg:col-span-7 space-y-3.5">
              {stepsList.map((s) => {
                const isActive = activeStep === s.number;

                return (
                  <div
                    key={s.number}
                    onClick={() => setActiveStep(s.number)}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                      isActive
                        ? 'bg-black/70 border-[#FF5665] shadow-lg shadow-[#FF5665]/10'
                        : 'bg-black/20 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full shrink-0 font-mono font-bold text-xs flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-[#FF5665] text-black shadow-md'
                          : 'bg-white/10 text-gray-400'
                      }`}
                    >
                      {s.number}
                    </div>

                    <div className="space-y-1">
                      <h4 className={`text-sm font-bold uppercase transition-colors ${
                        isActive ? 'text-white' : 'text-gray-300'
                      }`}>
                        {s.title}
                      </h4>
                      <p className="text-xs text-gray-300 font-light leading-relaxed">
                        {s.text}
                      </p>
                      {isActive && (
                        <p className="text-[11px] font-mono text-[#FF5665] pt-1 font-medium">
                          ➜ {s.detail}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="p-4 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-gray-300">
                <strong className="text-white uppercase font-bold">NOTA DE OPERACIÓN: </strong>
                Una vez iniciada la transmisión podrá visualizar lo que está ocurriendo en ese momento desde múltiples cámaras simultáneamente.
              </div>
            </div>

            {/* Interactive Mockup Display */}
            <div className="lg:col-span-5 bg-black/70 border border-white/10 rounded-2xl p-5 relative flex flex-col justify-between h-full min-h-[400px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-white uppercase">UBITRACK PRO • LIVE VIEW</span>
                </div>
                <span className="text-[10px] font-mono text-[#FF5665] bg-[#FF5665]/10 px-2 py-1 rounded border border-[#FF5665]/30">
                  STARLINK SWR / 4G
                </span>
              </div>

              {/* Video Mockup Screen */}
              <div className="relative bg-black rounded-xl border border-white/10 overflow-hidden aspect-video flex items-center justify-center group my-auto">
                <img
                  src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=800&auto=format&fit=crop"
                  alt="Live Stream Cam"
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                />
                
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-white flex items-center gap-1.5 border border-white/10">
                  <Camera size={12} className="text-[#FF5665]" />
                  <span>CAM 01: FRONTAL 1080p</span>
                </div>

                <div className="absolute top-3 right-3 bg-red-600 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest animate-pulse">
                  ● EN VIVO
                </div>

                <button
                  onClick={() => setIsSimulatingStream(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-colors cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-full bg-[#FF5665] text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                    <Play size={24} className="ml-1" />
                  </div>
                </button>

                <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md p-2 rounded text-[10px] font-mono text-gray-300 flex justify-between items-center border border-white/10">
                  <span>UNIDAD #104 - RUTA 51 PUNA</span>
                  <span className="text-emerald-400 font-bold">SEÑAL OK 100%</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>PASO ACTIVO: {activeStep} / 5</span>
                <button
                  onClick={() => setActiveStep((prev) => (prev % 5) + 1)}
                  className="text-[#FF5665] hover:underline cursor-pointer"
                >
                  Siguiente Paso ➔
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* DETAIL MODAL FOR SPECIFIC MODULE INSPECTION */}
      <AnimatePresence>
        {activeModalData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#080c14] border border-[#FF5665]/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#FF5665]/10 border border-[#FF5665]/30 text-[#FF5665]">
                    <activeModalData.icon size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#FF5665] uppercase tracking-widest font-bold">
                      {activeModalData.tag}
                    </span>
                    <h3 className="text-xl font-display font-black text-white uppercase">
                      {activeModalData.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedModule(null)}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono uppercase cursor-pointer"
                >
                  Cerrar ✕
                </button>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-black">
                <img
                  src={activeModalData.image}
                  alt={activeModalData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-black/80 text-[10px] font-mono text-white px-3 py-1 rounded-lg border border-white/10">
                  INSPECCIÓN TÉCNICA HD • {activeModalData.badge}
                </div>
              </div>

              <p className="text-gray-300 text-sm font-light leading-relaxed">
                {activeModalData.description}
              </p>

              <div className="bg-black/50 p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-mono text-gray-300">
                  ¿Desea solicitar una demostración en vivo de este módulo?
                </span>
                <button
                  onClick={() => {
                    setSelectedModule(null);
                    window.openWhatsAppSelector?.(`solicitar-demo-${activeModalData.title.toLowerCase().replace(/\s+/g, '-')}`);
                  }}
                  className="px-6 py-2.5 bg-[#FF5665] hover:bg-white text-black font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer w-full sm:w-auto text-center"
                >
                  Solicitar Demo Corporativa
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULLSTREAM MODAL SIMULATION */}
      <AnimatePresence>
        {isSimulatingStream && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#080c14] border border-[#FF5665]/40 rounded-3xl max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                  <div>
                    <h3 className="text-lg font-display font-bold text-white uppercase">
                      Simulación en Tiempo Real • Consola Ubitrack Pro
                    </h3>
                    <p className="text-xs text-gray-400 font-mono">
                      Enlace Wi-Fi / 4G con Dashcam Dual IA (Unidad #104 - Minera Puna +4200 msnm)
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsSimulatingStream(false)}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono uppercase cursor-pointer"
                >
                  Cerrar ✕
                </button>
              </div>

              {/* Dual Camera Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=800&auto=format&fit=crop"
                    alt="Camara Frontal"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/80 text-[9px] font-mono text-white px-2 py-0.5 rounded">
                    CAM 1: FRONTAL ROAD FULL HD
                  </div>
                  <div className="absolute bottom-2 right-2 bg-emerald-500 text-black text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                    ADAS OK
                  </div>
                </div>

                <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10">
                  <img
                    src="https://image.pollinations.ai/prompt/Night%20vision%20infrared%20cabin%20camera%20view%20of%20a%20professional%20truck%20driver?width=800&height=600&nologo=true"
                    alt="Camara Cabina IR"
                    className="w-full h-full object-cover filter contrast-125"
                  />
                  <div className="absolute top-2 left-2 bg-black/80 text-[9px] font-mono text-white px-2 py-0.5 rounded">
                    CAM 2: CABINA INFRARROJO IR
                  </div>
                  <div className="absolute bottom-2 right-2 bg-[#FF5665] text-black text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                    DMS NO FATIGA
                  </div>
                </div>
              </div>

              <div className="bg-[#05070d] p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-2 text-gray-300">
                  <Radio size={16} className="text-[#FF5665] animate-pulse" />
                  <span>Enlace satelital de alta velocidad acoplado al Kit Starlink Móvil 12V-24V</span>
                </div>

                <button
                  onClick={() => {
                    setIsSimulatingStream(false);
                    window.openWhatsAppSelector?.('gestion-siniestros-coaching-flotas');
                  }}
                  className="px-6 py-2.5 bg-[#FF5665] hover:bg-white text-black font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer w-full sm:w-auto text-center"
                >
                  Solicitar Cotización B2B
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
