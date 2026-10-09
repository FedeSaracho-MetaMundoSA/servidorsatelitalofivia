import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Battery, BatteryCharging, Layers, Zap, ShieldCheck, 
  Factory, Award, Check, AlertTriangle, HelpCircle, Thermometer, 
  Droplet, ArrowRight, Gauge, Globe, Compass, Anchor, Train, 
  Activity, Sparkles, CheckCircle2, Info, RefreshCw, Eye
} from 'lucide-react';

import imgMonoblocInundada from '../assets/images/monobloc_inundado_6v_12v.jpg';
import imgMonoblocGel from '../assets/images/gel_monobloc_6v_12v.png';
import imgSistemaInundada2v from '../assets/images/sistema_inundado_v2.jpg';
import imgSistemaGel2v from '../assets/images/sistema_gel_2v.png';
import imgModulosAgm2v from '../assets/images/modulos_agm.png';

interface BatteryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBatteryId?: string;
}

const applications = [
  { icon: <Droplet size={18} className="text-sky-400" />, label: "Bombeo de agua" },
  { icon: <Globe size={18} className="text-emerald-400" />, label: "Residencial / Población pequeña" },
  { icon: <Compass size={18} className="text-indigo-400" />, label: "Comunicaciones" },
  { icon: <ShieldCheck size={18} className="text-teal-400" />, label: "Protección catódica" },
  { icon: <Gauge size={18} className="text-amber-400" />, label: "Supervisión remota" },
  { icon: <Droplet size={18} className="text-blue-400" />, label: "Refrigeración" },
  { icon: <Sparkles size={18} className="text-yellow-400" />, label: "Alumbrado" },
  { icon: <Anchor size={18} className="text-cyan-400" />, label: "Recursos de navegación" },
  { icon: <Activity size={18} className="text-red-400" />, label: "Generación de viento" },
  { icon: <AlertTriangle size={18} className="text-orange-400" />, label: "Reparación de caminos" },
  { icon: <Train size={18} className="text-violet-400" />, label: "Señales de ferrocarril" },
  { icon: <Zap size={18} className="text-yellow-500" />, label: "Rastreo de misiles" },
  { icon: <BatteryCharging size={18} className="text-green-400" />, label: "Captación para paneles" },
  { icon: <Layers size={18} className="text-purple-400" />, label: "Sistemas UPS / Respaldo" }
];

const batteryModels = [
  {
    id: "monobloc-inundada",
    title: "Monobloque Inundado (6V y 12V)",
    subtitle: "Deka Solar - Ciclo Profundo",
    desc: "Acumuladores industriales de electrolito líquido diseñados bajo normas internacionales para descargas cíclicas profundas en entornos rigurosos. Equipados con placas de aleación de plomo-antimonio optimizadas de bajo contenido de antimonio y tecnología de rejillas pesadas, minimizando la pérdida de agua, reduciendo el desprendimiento de material activo y asegurando una extraordinaria tolerancia térmica para una óptima resiliencia en sistemas autónomos aislados (Off-Grid).",
    color: "sky",
    img: imgMonoblocInundada,
    icon: <BatteryCharging size={24} />,
    badge: "Mantenimiento Convencional",
    specs: [
      { key: "Caja y cubierta", val: "Polipropileno moldeado de alto impacto" },
      { key: "Separadores", val: "Envolturas/separadores de polietileno microporoso" },
      { key: "Retenedores", val: "Malla de fibra de vidrio de 20 mil (DC27-10 mil)" },
      { key: "Placa positiva y negativa", val: "Antimonio de alta resistencia" },
      { key: "Peso específico (cargada)", val: "1.275 a 25°C (77°F)" },
      { key: "Autodescarga", val: "4% por mes" },
      { key: "Tecnología de Placa", val: "Tecnología IPF™ (Igualación de voltajes entre celdas)" }
    ],
    highlights: ["Placas formadas con IPF™", "Envolturas de polietileno", "Caja robusta de polipropileno"]
  },
  {
    id: "monobloc-gel",
    title: "Monobloque de Gel (6V y 12V)",
    subtitle: "Deka Solar - Sellada VRLA",
    desc: "Celdas monobloc selladas con tecnología VRLA (Valve Regulated Lead Acid) y electrolito tixotrópico gelificado que elimina por completo la estratificación del ácido. Incorporan placas negativas sobredimensionadas de plomo-calcio que optimizan la recombinación de gases al 99.9% y previenen la sulfatación. Ideales para aplicaciones críticas de telecomunicaciones, instrumentación remota y almacenamiento residencial aislado donde se requiere una operación de ciclos de descarga profunda 100% libre de mantenimiento preventivo.",
    color: "amber",
    img: imgMonoblocGel,
    icon: <Battery size={24} />,
    badge: "100% Libre de Mantenimiento",
    specs: [
      { key: "Válvula reguladora", val: "Construcción sellada que elimina el relleno de agua y vapores ácidos" },
      { key: "Electrolito gelificado", val: "Gel tixotrópico a prueba de derrames que no se estratifica y protege las placas" },
      { key: "Placa positiva y negativa", val: "Plomo-calcio" },
      { key: "Autodescarga", val: "Menos del 2% al mes (mínimo deterioro en almacenamiento)" },
      { key: "Tecnología de Placa", val: "Tecnología IPF™" },
      { key: "Clasificación de Seguridad", val: "No derramable por ICAO, IATA y DOT (transporte seguro sin contenedores especiales)" }
    ],
    highlights: ["Gel tixotrópico antiderrame", "Seguridad ICAO/IATA/DOT", "Autodescarga < 2% mensual"]
  },
  {
    id: "sistema-inundado-2v",
    title: "Sistema Inundado (2V)",
    subtitle: "Deka Solar - Maintenance Saver™",
    desc: "Estaciones de almacenamiento de gran capacidad compuestas por vasos de 2V individuales con tecnología Maintenance Saver™ de Deka. Su diseño incorpora un volumen sobredimensionado de electrolito líquido libre sobre placas de aleación pesada que garantizan una resistencia mecánica superior, previniendo fallas prematuras por fatiga activa. Especialmente concebidas para subestaciones eléctricas, sistemas de bombeo de agua de alto caudal y micro-redes comunitarias de alta demanda de corriente.",
    color: "emerald",
    img: imgSistemaInundada2v,
    icon: <Layers size={24} />,
    badge: "Máxima Capacidad / 2V",
    specs: [
      { key: "Vaso y cubierta", val: "Polipropileno moldeado de alto impacto" },
      { key: "Separadores", val: "Material de polietileno microporoso de larga duración" },
      { key: "Retenedores", val: "Malla de fibra de vidrio envuelta vertical/horizontalmente, envoltura perforada y protector inferior" },
      { key: "Placa positiva y negativa", val: "Antimonio" },
      { key: "Peso específico (cargada)", val: "1.250 a 25°C (77°F)" },
      { key: "Autodescarga", val: "4% por mes" },
      { key: "Tecnología de Placa", val: "Placas formadas con tecnología IPF™" },
      { key: "Diseño de Vaso", val: "Sistema Maintenance Saver™ de gran volumen de electrolito" }
    ],
    highlights: ["Sistema Maintenance Saver™", "Retenedores reforzados en 3D", "Excelente disipación de calor"]
  },
  {
    id: "sistema-gel-2v",
    title: "Sistema de Gel / 2V (Deka Dominator®)",
    subtitle: "Deka Dominator® - Ciclos Extremos",
    desc: "Celdas de gel de grado industrial Deka Dominator® reguladas por válvula de seguridad autorregulada. Combinan placas planas formadas individualmente con el proceso patentado IPF™ (Individual Plate Formation), asegurando una consistencia electroquímica perfecta celda a celda. Ofrecen la máxima durabilidad ante descargas profundas extremas y choque mecánico en racks sísmicos, con una tasa de autodescarga inferior al 2% mensual a 25°C.",
    color: "rose",
    img: imgSistemaGel2v,
    icon: <ShieldCheck size={24} />,
    badge: "Servicio Industrial / 2V Gel",
    specs: [
      { key: "Válvula reguladora", val: "Construcción sellada sin relleno de agua ni emanaciones corrosivas" },
      { key: "Electrolito gelificado", val: "Gel tixotrópico premium que no se estratifica y asegura contacto óptimo" },
      { key: "Placa positiva y negativa", val: "Plomo-calcio de alta pureza" },
      { key: "Autodescarga", val: "Menos del 2% al mes" },
      { key: "Tecnología de Placa", val: "Placas formadas con tecnología IPF™" },
      { key: "Versatilidad", val: "Instalación en cualquier orientación (excepto invertida)" }
    ],
    highlights: ["Sello hermético absoluto VRLA", "Plomo-calcio de alta duración", "Sin estratificación ácida"]
  },
  {
    id: "modulos-agm-2v",
    title: "Módulos AGM / 2V (Deka Unigy® II)",
    subtitle: "Deka Unigy® II - Alta Densidad Sísmica",
    desc: "Sistemas de almacenamiento modulares de recombinación de gas AGM (Absorbent Glass Mat) de alta densidad de potencia, diseñados para instalación horizontal ultra-compacta en racks integrados. Equipados con bornes frontales de cobre electrolítico macizo revestidos en plomo para optimizar la conductividad de corriente continua y catalizadores de recombinación MICROCAT™ que mitigan la degradación térmica en climas severos, garantizando la máxima confiabilidad operativa.",
    color: "blue",
    img: imgModulosAgm2v,
    icon: <Zap size={24} />,
    badge: "Sistemas Modulares / Sísmicos",
    specs: [
      { key: "Terminales y Bornes", val: "Cobre sólido con enchapado de plomo para conductividad superior con bornes de 'doble vía'" },
      { key: "Caja y cubierta", val: "Polipropileno pirorretardante de alto impacto (UL 94 V-0, 28% LOI)" },
      { key: "Separadores", val: "Malla de fibra de vidrio microporosa absorbente (AGM)" },
      { key: "Placa positiva y de red", val: "Aleación Plomo-estaño optimizada" },
      { key: "Catalizador Especial", val: "Catalizador Microcat™ (disminuye corriente flotante, reduce calor y evita el secado)" },
      { key: "Estructura Física", val: "Sistema Interlock™ modular acoplado con 4 pernos, protección delantera deslizante" },
      { key: "Resistencia Mecánica", val: "Certificación sísmica Zona 4 (apilable de forma segura hasta 8 módulos de alto)" },
      { key: "Autodescarga", val: "Menos del 2% mensual; no derramable (ICAO, IATA, DOT)" }
    ],
    highlights: ["Catalizador Microcat™", "Sistema Modular Interlock™", "Certificación Sísmica Zona 4", "Carcasa ignífuga UL 94 V-0"]
  }
];

// Matrix Data - Filled carefully with accurate technical attributes according to page 5 structure
const comparisonMatrix = {
  columns: [
    { key: "monoblocInundada", label: "Monobloque Inundada" },
    { key: "monoblocGel", label: "Gel Monobloque" },
    { key: "monoblocAgm", label: "AGM Monobloque" },
    { key: "inundada2v", label: "Inundación 2V" },
    { key: "gel2v", label: "Gel 2V" },
    { key: "agm2v", label: "Batería AGM 2V" }
  ],
  rows: [
    {
      attribute: "Vida Alta",
      monoblocInundada: "No",
      monoblocGel: "No",
      monoblocAgm: "No",
      inundada2v: "Sí",
      gel2v: "Sí",
      agm2v: "Sí"
    },
    {
      attribute: "Vida Moderada",
      monoblocInundada: "Sí",
      monoblocGel: "Sí",
      monoblocAgm: "Sí",
      inundada2v: "No",
      gel2v: "No",
      agm2v: "No"
    },
    {
      attribute: "Capacidad Alta",
      monoblocInundada: "No",
      monoblocGel: "No",
      monoblocAgm: "No",
      inundada2v: "Sí",
      gel2v: "Sí",
      agm2v: "Sí"
    },
    {
      attribute: "Capacidad Moderada",
      monoblocInundada: "Sí",
      monoblocGel: "Sí",
      monoblocAgm: "Sí",
      inundada2v: "No",
      gel2v: "No",
      agm2v: "No"
    },
    {
      attribute: "Tolerancia Temp. Alta",
      monoblocInundada: "Moderada",
      monoblocGel: "Excelente",
      monoblocAgm: "Moderada",
      inundada2v: "Excelente",
      gel2v: "Excelente",
      agm2v: "Moderada"
    },
    {
      attribute: "Tolerancia Temp. Baja",
      monoblocInundada: "Moderada",
      monoblocGel: "Excelente",
      monoblocAgm: "Excelente",
      inundada2v: "Moderada",
      gel2v: "Excelente",
      agm2v: "Excelente"
    },
    {
      attribute: "Mantenimiento Mínimo",
      monoblocInundada: "No (Reclama agua)",
      monoblocGel: "Sí (100% Libre)",
      monoblocAgm: "Sí (100% Libre)",
      inundada2v: "No (Maintenance Saver)",
      gel2v: "Sí (100% Libre)",
      agm2v: "Sí (100% Libre)"
    },
    {
      attribute: "Mantenimiento Estándar",
      monoblocInundada: "Sí (Relleno periódico)",
      monoblocGel: "No (Hermética)",
      monoblocAgm: "No (Hermética)",
      inundada2v: "Sí (Baja frecuencia)",
      gel2v: "No (Hermética)",
      agm2v: "No (Hermética)"
    },
    {
      attribute: "Electrolito Suspendido",
      monoblocInundada: "No",
      monoblocGel: "Sí (Gelificado)",
      monoblocAgm: "Sí (Malla AGM)",
      inundada2v: "No",
      gel2v: "Sí (Gelificado)",
      agm2v: "Sí (Malla AGM)"
    },
    {
      attribute: "Ventilación Requerida",
      monoblocInundada: "Sí (Gases normales)",
      monoblocGel: "No (Válvula VRLA)",
      monoblocAgm: "No (Válvula VRLA)",
      inundada2v: "Sí (Emanación baja)",
      gel2v: "No (Válvula VRLA)",
      agm2v: "No (Válvula VRLA)"
    },
    {
      attribute: "Ventilación No Requerida",
      monoblocInundada: "No",
      monoblocGel: "Sí",
      monoblocAgm: "Sí",
      inundada2v: "No",
      gel2v: "Sí",
      agm2v: "Sí"
    },
    {
      attribute: "Instalación Vertical",
      monoblocInundada: "Obligatorio",
      monoblocGel: "No obligatorio",
      monoblocAgm: "No obligatorio",
      inundada2v: "Obligatorio",
      gel2v: "No obligatorio",
      agm2v: "No obligatorio"
    },
    {
      attribute: "Instalación Otras (Horizontal)",
      monoblocInundada: "No permitido",
      monoblocGel: "Sí (Recomendado)",
      monoblocAgm: "Sí (Recomendado)",
      inundada2v: "No permitido",
      gel2v: "Sí (Recomendado)",
      agm2v: "Sí (Sistema Interlock™)"
    },
    {
      attribute: "Peso Pesado",
      monoblocInundada: "No",
      monoblocGel: "No",
      monoblocAgm: "No",
      inundada2v: "Sí",
      gel2v: "Sí",
      agm2v: "Sí"
    },
    {
      attribute: "Peso Moderado",
      monoblocInundada: "Sí",
      monoblocGel: "Sí",
      monoblocAgm: "Sí",
      inundada2v: "No",
      gel2v: "No",
      agm2v: "No"
    }
  ]
};

export default function BatteryModal({ isOpen, onClose, initialBatteryId }: BatteryModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'catalog' | 'matrix' | 'eco'>('catalog');
  const [selectedBatteryId, setSelectedBatteryId] = useState<string>("monobloc-inundada");
  const [showRealPhoto, setShowRealPhoto] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (initialBatteryId) {
        setSelectedBatteryId(initialBatteryId);
        setActiveTab('catalog');
      }
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, initialBatteryId]);

  const selectedBattery = batteryModels.find(b => b.id === selectedBatteryId) || batteryModels[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6" id="battery-modal-container">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
            id="battery-modal-backdrop"
          />
          
          {/* Main Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="relative w-full max-w-7xl h-[92vh] sm:h-[88vh] bg-[#070b12] border border-slate-800 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
            id="battery-modal-content"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md z-20 sticky top-0">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                  <Battery className="animate-pulse" size={22} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight flex items-center gap-2">
                    Baterías Industriales DEKA <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-mono font-bold">EE.UU.</span>
                  </h2>
                  <p className="text-[10px] font-mono text-slate-400 tracking-wider">TECNOLOGÍA DE CICLO PROFUNDO • EAST PENN MANUFACTURING CO.</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
                id="close-battery-modal-btn"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Tabs bar */}
            <div className="flex border-b border-slate-800/80 bg-slate-950/40 p-2 gap-1 overflow-x-auto scrollbar-none z-10">
              <button
                onClick={() => setActiveTab('info')}
                className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold tracking-tight uppercase whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  activeTab === 'info'
                    ? 'bg-amber-500 text-slate-950 shadow-[0_4px_12px_rgba(245,158,11,0.25)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Info size={14} />
                Información General
              </button>
              <button
                onClick={() => setActiveTab('catalog')}
                className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold tracking-tight uppercase whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  activeTab === 'catalog'
                    ? 'bg-amber-500 text-slate-950 shadow-[0_4px_12px_rgba(245,158,11,0.25)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <BatteryCharging size={14} />
                Modelos y Catálogo
              </button>
              <button
                onClick={() => setActiveTab('matrix')}
                className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold tracking-tight uppercase whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  activeTab === 'matrix'
                    ? 'bg-amber-500 text-slate-950 shadow-[0_4px_12px_rgba(245,158,11,0.25)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Layers size={14} />
                Matriz de Selección
              </button>
              <button
                onClick={() => setActiveTab('eco')}
                className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold tracking-tight uppercase whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  activeTab === 'eco'
                    ? 'bg-amber-500 text-slate-950 shadow-[0_4px_12px_rgba(245,158,11,0.25)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Factory size={14} />
                Compromiso Ambiental
              </button>
            </div>

            {/* Content View */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950/20 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              <AnimatePresence mode="wait">
                {/* TAB 1: GENERAL INFO */}
                {activeTab === 'info' && (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-8"
                  >
                    {/* Hero Intro */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      <div className="lg:col-span-7 space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-[10px] font-mono tracking-wider uppercase font-bold">
                          🇺🇸 100% Hecho en los Estados Unidos
                        </div>
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white tracking-tight uppercase leading-tight">
                          Energía de Reserva Confiable de Larga Duración
                        </h3>
                        <p className="text-slate-300 font-light leading-relaxed text-sm sm:text-base">
                          Las baterías <strong className="text-white font-bold">Deka Solar</strong> son fabricadas y probadas bajo los estándares más exigentes de la industria por <strong className="text-white font-bold">East Penn Manufacturing Co., Inc.</strong> en los EE.UU. Están diseñadas para proporcionar un flujo de energía constante, seguro y de bajísimo mantenimiento para sistemas fotovoltaicos (PV) y aplicaciones de energía renovable que demandan ciclos profundos de descarga continuos.
                        </p>

                        {/* Certificates */}
                        <div className="pt-2">
                          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2.5">Certificaciones de Calidad y Medio Ambiente:</p>
                          <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300">
                              <Award size={14} className="text-amber-500" />
                              <span>ISO 9001</span>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300">
                              <Award size={14} className="text-amber-500" />
                              <span>ISO/TS 16949</span>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300">
                              <Award size={14} className="text-emerald-500" />
                              <span>ISO 14001</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Side Banner Illustration */}
                      <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between aspect-[16/10] sm:aspect-[21/9] lg:aspect-square">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
                        <img 
                          src="https://images.unsplash.com/photo-1509391366360-1e97d5259d81?q=80&w=600&auto=format&fit=crop" 
                          alt="Energía Renovable Industrial"
                          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity"
                        />
                        <div className="relative z-20 flex justify-between items-start w-full">
                          <span className="text-[8px] font-mono bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-bold uppercase tracking-widest">EAST PENN MFG</span>
                          <span className="text-[9px] font-mono text-slate-400">DEC-2026</span>
                        </div>

                        {/* Dynamic Battery Icon rendering */}
                        <div className="relative z-20 flex flex-col items-center justify-center my-6">
                          <div className="w-16 h-28 bg-[#0e1726] border-2 border-slate-700 rounded-lg relative flex flex-col justify-between p-1 shadow-[0_0_30px_rgba(245,158,11,0.08)]">
                            <div className="absolute -top-[8px] left-1/2 -translate-x-1/2 w-6 h-[8px] bg-slate-700 rounded-t-sm" />
                            {/* Positive/Negative terminal posts */}
                            <div className="flex justify-between px-1 -mt-2">
                              <div className="w-2.5 h-1 bg-red-500 rounded-sm" />
                              <div className="w-2.5 h-1 bg-blue-500 rounded-sm" />
                            </div>
                            <div className="flex-1 flex flex-col justify-end gap-1.5 p-1 mt-2">
                              <div className="h-4 bg-amber-500/20 border border-amber-500/40 rounded-sm" />
                              <div className="h-4 bg-amber-500/40 border border-amber-500/60 rounded-sm" />
                              <div className="h-4 bg-amber-500/80 rounded-sm" />
                            </div>
                          </div>
                          <span className="text-[10px] font-mono text-slate-300 mt-2">VRLA / AGM & GEL & FLOODED</span>
                        </div>

                        <div className="relative z-20 w-full pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span>PLANCHAS DE ANTIMONIO & CALCIO</span>
                          <span>99% REUTILIZABLE</span>
                        </div>
                      </div>
                    </div>

                    {/* Declared Applications Grid */}
                    <div className="border-t border-slate-800/80 pt-6 space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <div>
                          <h4 className="text-md font-display font-black text-white uppercase tracking-wider">
                            Aplicaciones Certificadas y Declaradas
                          </h4>
                          <p className="text-[10px] font-mono text-slate-400">RENDIMIENTO GARANTIZADO EN TODO TIPO DE ENTORNOS EXTREMOS</p>
                        </div>
                        <span className="text-[9px] font-mono text-slate-500 uppercase bg-slate-900 px-2 py-1 rounded border border-slate-800">CUMPLIMIENTO RIGUROSO</span>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                        {applications.map((app, appIdx) => (
                          <div 
                            key={appIdx} 
                            className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-3 flex flex-col items-center text-center justify-center space-y-2 hover:border-amber-500/30 hover:bg-slate-900 transition-all group"
                          >
                            <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                              {app.icon}
                            </div>
                            <span className="text-[10px] font-sans font-medium text-slate-300 leading-tight">
                              {app.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: DETAILED CATALOG */}
                {activeTab === 'catalog' && (
                  <motion.div
                    key="catalog"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                  >
                    {/* Left Sidebar List Selector */}
                    <div className="lg:col-span-4 flex flex-col gap-2.5">
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest px-1 mb-1">TECNOLOGÍAS DE BATERÍAS DEKA</div>
                      
                      {batteryModels.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => setSelectedBatteryId(b.id)}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                            selectedBatteryId === b.id
                              ? 'bg-slate-900 border-amber-500 shadow-[0_4px_15px_rgba(245,158,11,0.05)]'
                              : 'bg-slate-950/40 border-slate-850 hover:bg-slate-900/40 hover:border-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                              selectedBatteryId === b.id
                                ? 'bg-amber-500 text-slate-950'
                                : 'bg-slate-900 text-slate-400 group-hover:text-white'
                            }`}>
                              {b.icon}
                            </div>
                            <div>
                              <p className="text-xs font-sans font-bold text-white group-hover:text-amber-400 transition-colors leading-none uppercase">
                                {b.title.split(" (")[0]}
                              </p>
                              <span className="text-[9px] font-mono text-slate-400">{b.subtitle}</span>
                            </div>
                          </div>
                          <ArrowRight size={14} className={`transition-transform duration-200 ${
                            selectedBatteryId === b.id ? 'text-amber-500 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'
                          }`} />
                        </button>
                      ))}
                    </div>

                    {/* Right Details Panel */}
                    <div className="lg:col-span-8 bg-slate-900/30 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-6">
                      
                      {/* Top Row: Title & Badge */}
                      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3 pb-4 border-b border-slate-800/60">
                        <div>
                          <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest font-bold block mb-1">PRESTACIONES Y CONSTRUCCIÓN</span>
                          <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                            {selectedBattery.title}
                          </h3>
                          <span className="text-xs font-mono text-slate-400">{selectedBattery.subtitle}</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-950 bg-amber-500 px-3 py-1 rounded-full font-bold uppercase tracking-wide self-start shadow-[0_2px_8px_rgba(245,158,11,0.2)]">
                          {selectedBattery.badge}
                        </span>
                      </div>

                      {/* Middle: Content Text and Visual */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                        
                        {/* Text and Highlights */}
                        <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                            {selectedBattery.desc}
                          </p>

                          {/* Highlights badges */}
                          <div className="space-y-2">
                            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">Atributos Clave:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedBattery.highlights.map((hl, hIdx) => (
                                <span key={hIdx} className="text-[9px] font-sans font-bold text-amber-400 bg-amber-500/5 border border-amber-500/20 px-2 py-1 rounded">
                                  ✓ {hl}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Battery Visual Representation (Real Photo / Digital Twin) */}
                        <div className="md:col-span-5 relative rounded-xl overflow-hidden bg-slate-950/60 border border-slate-800 p-4 flex flex-col items-center justify-between min-h-[260px] group/vis">
                          {/* Glossy light effect */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                          
                          {/* Floating interactive toggle at top */}
                          <div className="flex w-full justify-between items-center z-20 mb-3 border-b border-slate-800/40 pb-2">
                            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">VISTA DE PRODUCTO</span>
                            <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                              <button 
                                onClick={() => setShowRealPhoto(true)}
                                className={`px-2 py-1 rounded text-[8px] font-mono font-bold uppercase transition-all ${showRealPhoto ? 'bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'text-slate-400 hover:text-white'}`}
                              >
                                Foto Real
                              </button>
                              <button 
                                onClick={() => setShowRealPhoto(false)}
                                className={`px-2 py-1 rounded text-[8px] font-mono font-bold uppercase transition-all ${!showRealPhoto ? 'bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'text-slate-400 hover:text-white'}`}
                              >
                                Gemelo 3D
                              </button>
                            </div>
                          </div>

                          {showRealPhoto ? (
                            <div className="relative flex flex-col items-center justify-center z-10 w-full h-full flex-grow py-2">
                              <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-900 p-1 max-w-[150px] w-full shadow-2xl group-hover/vis:scale-105 transition-transform duration-500">
                                <img 
                                  src={selectedBattery.img} 
                                  alt={selectedBattery.title} 
                                  className="w-full h-auto object-contain max-h-[160px] rounded-md filter brightness-105 contrast-105 saturate-110"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                              </div>
                              <span className="text-[9px] font-mono text-slate-400 mt-3 uppercase tracking-widest text-center flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> FOTO REAL DEL PRODUCTO
                              </span>
                            </div>
                          ) : (
                            /* Render custom realistic CSS twin for the active battery */
                            <div className="relative flex flex-col items-center justify-center z-10 w-full h-full flex-grow">
                              <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-3">GEMELO DIGITAL INDUSTRIAL</div>
                              
                              {/* Battery Chassis */}
                              <div className="w-28 h-36 bg-[#040810] border-[1.5px] border-slate-600 rounded-lg shadow-2xl relative flex flex-col justify-between p-1">
                                
                                {/* Glowing interior cells grid simulation */}
                                <div className="absolute inset-1.5 bg-[#010204] border border-slate-800 rounded p-1 flex gap-0.5 overflow-hidden">
                                  {Array.from({ length: selectedBattery.id.includes("2v") ? 1 : selectedBattery.title.includes("6V") ? 3 : 6 }).map((_, cIdx) => (
                                    <div key={cIdx} className="flex-1 border-[0.2px] border-slate-800 rounded-sm relative overflow-hidden flex flex-col justify-between p-0.5">
                                      <div className="w-full h-1 bg-slate-800/50" />
                                      {/* Lead-Calcium or Antimony grid lines */}
                                      <div className="flex-1 flex flex-col justify-around py-1 px-[1px]">
                                        <div className="h-[0.5px] bg-amber-500/10" />
                                        <div className="h-[0.5px] bg-amber-500/20" />
                                        <div className="h-[0.5px] bg-amber-500/10" />
                                        <div className="h-[0.5px] bg-slate-400/10" />
                                      </div>
                                      <div className="w-full h-1.5 bg-amber-500/10 border-t border-amber-500/20" />
                                    </div>
                                  ))}
                                </div>

                                {/* Top Terminal elements */}
                                <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-8 h-[5px] bg-slate-600 rounded-t-sm z-20" />
                                <div className="absolute -top-[4px] left-[15%] w-3 h-[4px] bg-red-500 rounded-sm z-20" />
                                <div className="absolute -top-[4px] right-[15%] w-3 h-[4px] bg-blue-500 rounded-sm z-20" />
                                
                                {/* Glowing cell text info overlay */}
                                <div className="absolute inset-x-2 bottom-2 bg-slate-950/80 border border-slate-800 rounded p-1 text-center z-20">
                                  <span className="text-[7.5px] font-mono text-white tracking-tighter leading-none block font-black">
                                    DEKA SOLAR
                                  </span>
                                  <span className="text-[6.5px] font-mono text-slate-400 uppercase tracking-widest leading-none block mt-0.5">
                                    {selectedBattery.id.includes("2v") ? "2 VOLTIOS" : "MONOBLOC VRLA"}
                                  </span>
                                </div>
                              </div>

                              {/* Battery specific label */}
                              <span className="text-[8px] font-mono text-slate-400 mt-2 text-center uppercase">
                                TECNOLOGÍA IPF™ ACTIVADA
                              </span>
                            </div>
                          )}
                        </div>

                      </div>

                      {/* Technical specifications details table */}
                      <div className="border-t border-slate-800/60 pt-4 space-y-3">
                        <span className="text-[9.5px] font-mono text-slate-400 uppercase tracking-widest font-bold block">Ficha Técnica Oficial del Fabricante:</span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedBattery.specs.map((spec, sIdx) => (
                            <div key={sIdx} className="bg-slate-950/60 border border-slate-850/60 rounded-xl p-3 flex flex-col justify-center">
                              <span className="text-[8.5px] font-mono text-amber-500 uppercase tracking-wider mb-0.5">{spec.key}</span>
                              <span className="text-xs text-slate-200 font-sans font-medium">{spec.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}

                {/* TAB 3: MATRIX COMPARISON */}
                {activeTab === 'matrix' && (
                  <motion.div
                    key="matrix"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <div>
                        <h4 className="text-md font-display font-black text-white uppercase tracking-wider">
                          Matriz de Selección Tecnológica de Baterías Solares
                        </h4>
                        <p className="text-[10px] font-mono text-slate-400">MATRIZ OFICIAL INTEGRADA PARA LA TOMA DE DECISIONES DE INGENIERÍA</p>
                      </div>
                      <span className="text-[9px] font-mono text-amber-500 uppercase bg-amber-500/5 px-2.5 py-1 rounded border border-amber-500/20">EAST PENN QUALITY MATRIX</span>
                    </div>

                    {/* Responsive Matrix Grid Wrapper */}
                    <div className="w-full overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/10">
                      <table className="w-full border-collapse text-left text-xs min-w-[750px]">
                        <thead>
                          <tr className="border-b border-slate-800 bg-slate-950/60">
                            <th className="p-4 font-mono font-bold text-slate-400 uppercase tracking-wider text-[9px]">ATRIBUTOS CLAVE</th>
                            {comparisonMatrix.columns.map((col, cIdx) => (
                              <th key={cIdx} className="p-4 font-sans font-bold text-white text-center uppercase tracking-tight text-[10px] border-l border-slate-800/40">
                                {col.label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/40 font-sans">
                          {comparisonMatrix.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-900/20 transition-colors">
                              <td className="p-3.5 font-medium text-slate-300 font-mono text-[9.5px]">
                                {row.attribute}
                              </td>
                              {/* Monobloque Inundada */}
                              <td className="p-3.5 text-center border-l border-slate-800/40">
                                {renderMatrixBadge(row.monoblocInundada)}
                              </td>
                              {/* Gel Monobloque */}
                              <td className="p-3.5 text-center border-l border-slate-800/40">
                                {renderMatrixBadge(row.monoblocGel)}
                              </td>
                              {/* AGM Monobloque */}
                              <td className="p-3.5 text-center border-l border-slate-800/40">
                                {renderMatrixBadge(row.monoblocAgm)}
                              </td>
                              {/* Inundación 2V */}
                              <td className="p-3.5 text-center border-l border-slate-800/40">
                                {renderMatrixBadge(row.inundada2v)}
                              </td>
                              {/* Gel 2V */}
                              <td className="p-3.5 text-center border-l border-slate-800/40">
                                {renderMatrixBadge(row.gel2v)}
                              </td>
                              {/* AGM 2V */}
                              <td className="p-3.5 text-center border-l border-slate-800/40">
                                {renderMatrixBadge(row.agm2v)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Quick Guide Card */}
                    <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
                      <Info className="text-amber-500 shrink-0 mt-0.5" size={16} />
                      <p className="text-[10px] font-mono text-slate-400 leading-normal">
                        <strong>Orientación rápida para Ingenieros:</strong> Las tecnologías de <strong>2 Voltios</strong> están destinadas para sistemas industriales de alta capacidad que requieren máxima fiabilidad de largo plazo (diseño de vida de 15 a 20 años). Las baterías de <strong>Gel tixotrópico</strong> proporcionan resistencia óptima a temperaturas extremas y son 100% libres de mantenimiento, mientras que la tecnología de <strong>Antimonio (Inundadas)</strong> es la más económica pero requiere reposición periódica de electrolito por el canal de agua destilada.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* TAB 4: ENVIRONMENTAL COMPROMISE */}
                {activeTab === 'eco' && (
                  <motion.div
                    key="eco"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-6"
                  >
                    {/* Header sustainability banner */}
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c2018] to-slate-950 border border-emerald-900/30 p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                      <div className="space-y-3 max-w-2xl text-center sm:text-left">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">LÍDER DE LA INDUSTRIA EN RECICLAJE INTEGRAL</span>
                        <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                          Compromiso Ambiental East Penn
                        </h3>
                        <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed font-light">
                          East Penn Manufacturing es un modelo global de economía circular. Su planta de fundición, refinería y tratamiento en Lyon Station, Pennsylvania, recicla prácticamente el 100% de cada componente de las baterías de ácido-plomo usadas que recibe, eliminando por completo la contaminación por desechos.
                        </p>
                      </div>

                      {/* Green Recycling Stats badge */}
                      <div className="shrink-0 flex flex-col items-center justify-center p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/20 text-center w-36">
                        <span className="text-3xl font-black text-emerald-400 font-display">100%</span>
                        <span className="text-[9px] font-mono text-emerald-300 uppercase tracking-wider mt-1 font-bold">Sistemas Plomo-Ácido Reciclados</span>
                      </div>
                    </div>

                    {/* Sustainability cards grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Card 1: Fundición */}
                      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-emerald-500/20 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                            <RefreshCw size={18} />
                          </div>
                          <h4 className="text-xs sm:text-sm font-sans font-bold text-white uppercase">
                            Planta de Reciclaje Homologada
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                          La fundidora y refinería de plomo autorizada de East Penn recicla prácticamente el <strong className="text-white">100% de cada componente</strong> de las baterías de ácido-plomo usadas que procesa, incluyendo el plomo, las cubiertas de polipropileno y el ácido sulfúrico.
                        </p>
                      </div>

                      {/* Card 2: Ácido */}
                      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-emerald-500/20 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                            <Factory size={18} />
                          </div>
                          <h4 className="text-xs sm:text-sm font-sans font-bold text-white uppercase">
                            Innovación de Ácido Única
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                          La primera planta de reciclaje de ácidos de la industria convierte el ácido usado en <strong className="text-white">sulfato de sodio útil</strong> para detergentes u otras industrias químicas, evitando por completo la disposición de un desecho líquido altamente peligroso.
                        </p>
                      </div>

                      {/* Card 3: Agua */}
                      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-emerald-500/20 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                            <Droplet size={18} />
                          </div>
                          <h4 className="text-xs sm:text-sm font-sans font-bold text-white uppercase">
                            Tratamiento y Destilado de Aguas
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                          Su planta de tratamiento y destilado de aguas residuales de última generación ahorra más de <strong className="text-white">100,000 galones (378,500 litros) de agua subterránea por día</strong>, recirculando y limpiando el agua para procesos industriales internos.
                        </p>
                      </div>

                      {/* Card 4: Emisiones */}
                      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-emerald-500/20 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                            <Sparkles size={18} />
                          </div>
                          <h4 className="text-xs sm:text-sm font-sans font-bold text-white uppercase">
                            Depuración de Emisiones de Dióxido de Azufre
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                          Una moderna unidad depuradora química ("scrubber unit") elimina casi en su totalidad las emisiones aéreas de <strong className="text-white">dióxido de azufre (SO₂)</strong> de la fundición, entregando aire limpio a la atmósfera local.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 backdrop-blur-md flex flex-col sm:flex-row justify-between items-center gap-2.5 text-[10px] font-mono text-slate-500">
              <span>© {new Date().getFullYear()} EAST PENN MFG • DISTRIBUIDOR AUTORIZADO DEKA</span>
              <span className="flex items-center gap-1.5 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                CONEXIÓN SEGURA AL CATÁLOGO DE PRODUCTOS
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Helper to render customized responsive matrix cell badges
function renderMatrixBadge(value: string) {
  if (value === "Sí") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-[8.5px] uppercase font-mono">
        <CheckCircle2 size={10} /> Sí
      </span>
    );
  }
  if (value === "No") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-950 text-slate-500 border border-slate-900 font-mono text-[8.5px] uppercase">
        — No
      </span>
    );
  }
  if (value.includes("Excelente")) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold text-[8.5px] uppercase font-mono">
        ★ Excelente
      </span>
    );
  }
  if (value.includes("Moderada")) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold text-[8.5px] uppercase font-mono">
        ⚠ Moderada
      </span>
    );
  }
  if (value.includes("Obligatorio")) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-bold text-[8.5px] uppercase font-mono">
        Vertical
      </span>
    );
  }
  
  // Custom texts (like "Sí (100% Libre)" or "No (Hermética)")
  const isPositive = value.includes("100% Libre") || value.includes("Recomendado") || value.includes("Interlock") || value.includes("Saver");
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded border font-mono text-[8.5px] uppercase font-medium ${
      isPositive 
        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10' 
        : 'bg-slate-900/50 text-slate-300 border-slate-800'
    }`}>
      {value}
    </span>
  );
}
