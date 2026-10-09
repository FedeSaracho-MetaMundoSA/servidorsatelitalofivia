import { useState, MouseEvent, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { panelData } from "../data/panelData";
import BatteryModal from "./BatteryModal";
import SolarCatalogConsole from "./SolarCatalogConsole";
import {
  Sun,
  BatteryCharging,
  Shield,
  Maximize,
  FileText,
  Zap,
  Wind,
  Layers,
  Settings,
  Droplets,
  CheckCircle2,
  MapPin,
  Mountain,
  Ruler,
  Droplet,
  ZapOff,
  CircleDollarSign,
  ShieldCheck,
  Leaf,
  Battery,
  Globe,
  Radio,
  Camera,
  Cpu,
  ChevronRight,
  List,
  Menu,
  X,
  Share2,
  Lightbulb,
  Search,
  ArrowUpDown,
  Copy,
  Check,
  FileSpreadsheet,
  Download,
  SlidersHorizontal,
  Info,
  Hash,
  Scale
} from "lucide-react";

function TransparentImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [processedSrc, setProcessedSrc] = useState<string>("");

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // We want to remove the white background from the image
      const threshold = 210; 
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // If the pixel is close to white, make it fully transparent
        if (r > threshold && g > threshold && b > threshold) {
          data[i + 3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      setProcessedSrc(canvas.toDataURL());
    };
  }, [src]);

  return (
    <img 
      src={processedSrc || src} 
      alt={alt} 
      className={`${className} transition-all duration-500`} 
      referrerPolicy="no-referrer" 
    />
  );
}

// 3D Glow Card Component
function GlowCard({
  children,
  className = "",
  color = "from-amber-500 to-[#FF5665]",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    // Smooth transition towards mouse center
    mouseX.set(x);
    mouseY.set(y);
  }

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      onMouseMove={handleMouseMove}
      className={`relative group rounded-3xl bg-[#0b0e14] border border-white/10 overflow-hidden ${className}`}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
        }}
      />
      <div className="relative z-10 h-full p-8">{children}</div>
    </motion.div>
  );
}

import SolarCarousel from "./SolarCarousel";
import panelSolarSol6p72 from "../assets/images/sol_6p_72_panel_solar.png";
import GlowCanvas3D from "./GlowCanvas3D";

import imgMonoblocInundada from "../assets/images/monobloc_inundado_6v_12v.jpg";
import imgMonoblocGel from "../assets/images/gel_monobloc_6v_12v.png";
import imgSistemaInundada2v from "../assets/images/sistema_inundado_v2.jpg";
import imgSistemaGel2v from "../assets/images/sistema_gel_2v.png";
import imgModulosAgm2v from "../assets/images/modulos_agm.png";

export default function SolarModules() {
  const [isBatteryModalOpen, setIsBatteryModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("modulos");

  // Legacy state definitions so that TypeScript type-checks the hidden spreadsheet block correctly
  const [searchQuery, setSearchQuery] = useState("");
  const [cellTypeFilter, setCellTypeFilter] = useState<"TODOS" | "MONOCRISTALINO" | "POLICRISTALINO">("TODOS");
  const [powerRangeFilter, setPowerRangeFilter] = useState<"TODOS" | "ALTA" | "MEDIA" | "BAJA">("TODOS");
  const [panelQuantity, setPanelQuantity] = useState<number>(4);
  const [connectionMode, setConnectionMode] = useState<"serie" | "paralelo" | "mixto">("serie");
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [consoleTab, setConsoleTab] = useState<"telemetria" | "ficha" | "curvas" | "planos">("telemetria");
  const [curveTemp, setCurveTemp] = useState<number>(25);
  const [curveIrradiance, setCurveIrradiance] = useState<number>(1000);
  const [curveMode, setCurveMode] = useState<"irradiacion" | "temperatura">("irradiacion");
  const [selectedBrand, setSelectedBrand] = useState<string>("TODOS");
  const [selectedLetter, setSelectedLetter] = useState<string>("TODOS");
  const [sortBy, setSortBy] = useState<string>("pp");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const enrichedPanelData = panelData.map((item) => {
    const isSolartec = item.model.startsWith("SOLARTEC") || item.model.startsWith("SOL-72PE") || item.model.startsWith("SOL-6P");
    const brand = isSolartec ? "SOLARTEC" : "LÍNEA SOL";
    const modelName = (isSolartec && item.model.startsWith("SOLARTEC ")) ? item.model.replace("SOLARTEC ", "") : item.model;
    const isMono = item.model.includes("M") || item.model.startsWith("SOL-72PE") || item.model.startsWith("SOL-6M");
    const cellType = isMono ? "MONOCRISTALINO" : "POLICRISTALINO";
    return {
      ...item,
      brand,
      modelName,
      fullModel: item.model,
      cellType
    };
  });

  const filteredPanels = enrichedPanelData;
  const sortedPanels = enrichedPanelData;
  const activeRowIndex = 0;
  const selectedPanel = enrichedPanelData[0];

  const handleCopyClipboard = () => {};
  const handleQuoteModel = (model: string) => {};
  const handleQuoteSystem = (model: string, qty: number, conn: string) => {};
  const handleExportCSV = () => {};

  const solarCategories = [
    { name: "Módulos Fotovoltaicos", id: "modulos", icon: <Sun size={18} />, desc: "Paneles de alta eficiencia Solartec", color: "text-amber-500" },
    { name: "Estructuras de Soporte", id: "estructuras", icon: <Mountain size={18} />, desc: "Perfiles de duraluminio GST/GSTR", color: "text-gray-400" },
    { name: "Baterías", id: "baterias", icon: <Battery size={18} />, desc: "Acumulación inteligente Deka / Litio / Gel", color: "text-cyan-400" },
    { name: "Controladores de Carga", id: "controladores", icon: <Cpu size={18} />, desc: "Reguladores MPPT de alta precisión", color: "text-purple-400" },
    { name: "Electrobombas y Bombeo", id: "bombeo", icon: <Droplets size={18} />, desc: "Sistemas autónomos de agua", color: "text-blue-400" },
    { name: "Tableros Eléctricos", id: "tableros", icon: <Layers size={18} />, desc: "Protecciones homologadas CC/CA", color: "text-sky-400" },
    { name: "Generadores Autónomos", id: "generadores", icon: <Zap size={18} />, desc: "Energía solar aislada continua", color: "text-yellow-500" },
    { name: "Sistemas On-Grid", id: "conectados", icon: <Share2 size={18} />, desc: "Inyección y conexión a red pública", color: "text-sky-500" },
    { name: "Alumbrado Autónomo", id: "alumbrado", icon: <Lightbulb size={18} />, desc: "Luminarias solares inteligentes", color: "text-emerald-400" },
    { name: "Electrificadores Rurales", id: "electrificadores", icon: <BatteryCharging size={18} />, desc: "Boyeros solares autónomos", color: "text-orange-400" },
  ];

  const handleContactWhatsApp = () => {
    const text = encodeURIComponent(
      `Hola Servidor Satelital, estoy interesado en recibir asesoramiento y cotización sobre los Nuevos Módulos Fotovoltaicos Solartec y Estructuras de Soporte (GST / GSTR).`,
    );
    window.open(`https://wa.me/5493875843438?text=${text}`, "_blank");
  };

  return (
    <>
    <section
      className="relative bg-transparent overflow-x-clip w-full min-h-screen"
      id="solar"
    >
      {/* 1. SPECTACULAR SOLAR PANEL VIDEO BACKGROUND -> CUSTOM LOCAL RENDER VIDEO */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover select-none"
          style={{ filter: "brightness(0.35) contrast(1.15) saturate(0.85)" }}
          src="/7211094-uhd_3840_2160_30fps.mp4"
          loop
          muted
          playsInline
          autoPlay
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0e14]/90 via-[#0b0e14]/40 to-[#0b0e14] pointer-events-none" />
      </div>

      {/* 2. VISION 2030 HERO (INICIO DE PANELES) */}
      <div className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(245,158,11,0.2)] backdrop-blur-md mx-auto"
          >
            <Sun size={16} className="animate-spin-slow" />
            <span>VISIÓN 2030: LA ERA DE LA ENERGÍA RENOVABLE</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-display font-black text-white leading-[1.1] uppercase tracking-tighter"
          >
            Sistemas <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-[#FF5665] filter drop-shadow-[0_0_15px_rgba(255,86,101,0.4)]">Solares</span> Inteligentes
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 text-lg sm:text-xl lg:text-2xl font-light leading-relaxed max-w-3xl mx-auto"
          >
            Pioneros en innovación. E-commerce industrial de alta escalabilidad. Equipamos campos, industrias y hogares con tecnología fotovoltaica de última generación.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="pt-12"
          >
            <a href="#modulos" className="inline-flex flex-col items-center gap-2 text-amber-500 hover:text-white transition-colors cursor-pointer">
              <span className="text-[10px] font-mono tracking-widest uppercase">Explorar Catálogo</span>
              <div className="w-px h-12 bg-gradient-to-b from-amber-500 to-transparent" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Background glowing effects */}
      <div className="absolute top-[100vh] right-0 w-full max-w-[600px] aspect-square bg-amber-500/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-full max-w-[500px] aspect-square bg-[#FF5665]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* 3. MAIN E-COMMERCE CONTENT WITH FLOATING SLIDING SIDEBAR */}
      <div className="container mx-auto px-6 max-w-6xl relative z-10 pt-20 pb-32">
        {/* Dynamic Glow Canvas 3D Backing */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen overflow-hidden rounded-[45px]">
          <GlowCanvas3D category={activeCategory} />
        </div>
        
        <div className="w-full mx-auto relative z-10">
          {/* Header Label */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Sun size={14} className="animate-spin-slow" />
            INNOVADOR NUEVAS ESTRUCTURAS SOLARES
          </span>
        </div>

        {/* Top Category Switched Tabs Bar */}
        <div className="mb-12 mt-4 relative z-20">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x snap-mandatory">
            {solarCategories.map((cat, i) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                  }}
                  className={`snap-start shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-xl border transition-all duration-300 cursor-pointer text-xs font-mono font-bold uppercase tracking-wider select-none ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 to-[#FF5665]/20 border-amber-500/50 text-white shadow-[0_0_20px_rgba(245,158,11,0.25)] font-black'
                      : 'bg-white/[0.02] border-white/5 text-gray-400 hover:bg-white/[0.06] hover:border-white/10 hover:text-white'
                  }`}
                >
                  <span className={`${isActive ? cat.color : 'text-gray-400'} transition-transform duration-300`}>
                    {cat.icon}
                  </span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {activeCategory === "modulos" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            {/* Title */}
            <div id="modulos" className="text-center mb-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white uppercase tracking-tight mb-6 leading-tight drop-shadow-2xl">
                Módulos{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-[#FF5665] filter drop-shadow-[0_0_15px_rgba(255,86,101,0.4)]">
                  Fotovoltaicos
                </span>
              </h2>
              <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed">
                Los módulos Solartec son fabricados en base a celdas fotovoltaicas de silicio policristalino de alta eficiencia. La eficiencia de conversión de estas celdas es superior al 14%.
              </p>
            </div>



            {/* In-depth Mechanical & Electrical Construction Breakdown - Bibliography / Technical Manual Style */}
            <div className="space-y-16 mb-16 relative z-10">
              <div className="border-l-2 border-amber-500/50 pl-4 py-1">
                <span className="text-xs font-mono text-amber-500 uppercase tracking-widest font-bold">Manual de Ingeniería & Especificaciones Técnicas</span>
              </div>

              {/* 1. Classic Solartec Modules */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Description */}
                <div className="lg:col-span-8 space-y-4 text-left">
                  <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight uppercase">
                    Módulos Fotovoltaicos Solartec
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Los módulos Solartec son fabricados en base a celdas fotovoltaicas de silicio policristalino de alta eficiencia. La eficiencia de conversión de estas celdas es superior al <strong className="text-white">14%</strong>.
                  </p>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Para protegerlas de los agentes atmosféricos y aislarlas eléctricamente, las celdas son encapsuladas con material plástico <strong className="text-white">EVA (etil-vinil-acetato)</strong> estable a la radiación ultravioleta. El frente expuesto al sol es de <strong className="text-white">vidrio templado de alta transparencia</strong> (bajo contenido de hierro) y de <strong className="text-white">3 mm de espesor</strong>, lo que le otorga una mayor resistencia al impacto. La cara posterior es de <strong className="text-white">TPE</strong>, una lámina plástica compuesta de elevada resistencia mecánica y eléctrica. El marco de <strong className="text-white">aluminio anodizado</strong> asegura la rigidez estructural y facilita su instalación. La caja de conexiones fijada a la cara posterior permite la interconexión con los otros componentes del sistema.
                  </p>
                </div>

                {/* Profile Photo - Transparent Local Image */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center p-4">
                  <div className="relative max-w-[280px] w-full flex justify-center group">
                    <TransparentImage 
                      src="/modulos-fotovoltaicos-1.jpg" 
                      alt="Módulo Fotovoltaico Solartec" 
                      className="w-full h-auto object-contain max-h-[320px] filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] brightness-110 saturate-110 contrast-105 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono text-center mt-4 uppercase tracking-widest">
                    <span>Fotografía de Perfil - Solartec</span>
                  </div>
                </div>
              </div>

              {/* 2. New SOL-6P Line */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12 border-t border-white/5">
                {/* Description */}
                <div className="lg:col-span-8 space-y-4 text-left order-1 lg:order-1">
                  <h4 className="text-xl md:text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-[#FF5665] tracking-tight uppercase">
                    Nueva Línea de Módulos: SOL-6P
                  </h4>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    La nueva línea de módulos fotovoltaicos Solartec SOL-6P incluye una variedad de módulos que van desde los <strong className="text-amber-400">260 a los 345 vatios</strong> de potencia nominal.
                  </p>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    Dicha línea surge con la necesidad de cubrir nuevas aplicaciones en el mercado como lo son: sistemas conectados a la red (On-Grid), sistemas autónomos (Off-Grid) en lugares de fácil acceso, entre otros.
                  </p>
                </div>

                {/* Imagen del Panel Solar Real SOL-6P */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 order-2 lg:order-2">
                  <div className="relative max-w-[280px] w-full flex justify-center group overflow-hidden rounded-2xl p-1 bg-slate-900/40 border border-slate-800">
                    <img 
                      src={panelSolarSol6p72} 
                      alt="Módulo Fotovoltaico Policristalino SOL-6P" 
                      className="w-full h-auto object-contain max-h-[220px] rounded-2xl transition-transform duration-500 hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-[10px] text-gray-400 font-mono text-center mt-4 uppercase tracking-widest">
                    <span>Línea SOL-6P Premium (260W~345W)</span>
                  </div>
                </div>
              </div>
            </div>

        {/* Interactive Solar Engineering Spreadsheet Console */}
        <SolarCatalogConsole />
        <div className="hidden">
          {/* Main Control Hub & Filters */}
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.02] to-transparent pointer-events-none" />
            
            <div className="flex flex-col gap-6 relative z-10">
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase">Consola de Dimensionamiento de Ingeniería v2.5</span>
                  </div>
                  <h3 className="text-white text-2xl font-display font-black tracking-tight uppercase">
                    Planilla de Especificaciones Técnicas
                  </h3>
                  <p className="text-slate-300 text-xs font-light mt-1">
                    Análisis comparativo, filtrado y descarga en tiempo real de módulos de silicio monocristalino y policristalino de alta pureza.
                  </p>
                </div>

                {/* Quick Stats Mini-Bar */}
                <div className="grid grid-cols-3 gap-3 bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl min-w-[280px]">
                  <div className="text-center border-r border-slate-800/80 pr-2">
                    <span className="block text-[9px] font-mono uppercase text-slate-400">Total Coincidentes</span>
                    <span className="text-sm font-mono font-bold text-amber-400">{sortedPanels.length}</span>
                  </div>
                  <div className="text-center border-r border-slate-800/80 px-2">
                    <span className="block text-[9px] font-mono uppercase text-slate-400">Potencia Máx</span>
                    <span className="text-sm font-mono font-bold text-sky-400">
                      {sortedPanels.length > 0 ? Math.max(...sortedPanels.map(p => p.pp)) : 0}W
                    </span>
                  </div>
                  <div className="text-center pl-2">
                    <span className="block text-[9px] font-mono uppercase text-slate-400">Peso Promedio</span>
                    <span className="text-sm font-mono font-bold text-[#FF5665]">
                      {sortedPanels.length > 0 ? (sortedPanels.reduce((acc, p) => acc + p.weight, 0) / sortedPanels.length).toFixed(1) : 0}kg
                    </span>
                  </div>
                </div>
              </div>

              {/* Grid with search inputs and copy buttons */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-t border-slate-800/60 pt-4">
                {/* Search Bar (Left) */}
                <div className="md:col-span-6 relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSelectedRow(0); // Reset selection
                    }}
                    placeholder="Buscar por marca, modelo, potencia pico, dimensiones o peso..."
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950/60 hover:bg-slate-950/80 focus:bg-slate-950 border border-slate-800 focus:border-amber-500/50 text-white rounded-xl text-xs font-mono transition-all placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedRow(0);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-[10px] font-mono transition-colors"
                    >
                      CLEAR
                    </button>
                  )}
                </div>

                {/* Brand Filter (Middle) */}
                <div className="md:col-span-3 flex gap-1 bg-slate-950/60 p-1 border border-slate-800/80 rounded-xl">
                  {["TODOS", "SOLARTEC", "LÍNEA SOL"].map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        setSelectedBrand(b);
                        setSelectedRow(0);
                      }}
                      className={`flex-1 py-1.5 text-[9px] font-mono font-bold uppercase rounded-lg transition-all ${
                        selectedBrand === b
                          ? "bg-gradient-to-r from-amber-500/20 to-[#FF5665]/20 border border-amber-500/40 text-white shadow-sm"
                          : "text-slate-400 hover:text-white hover:bg-slate-900/40"
                      }`}
                    >
                      {b === "TODOS" ? "TODOS" : b === "LÍNEA SOL" ? "SOL ☀️" : "SOLARTEC 🇦🇷"}
                    </button>
                  ))}
                </div>

                {/* Export & Copy Action Buttons (Right) */}
                <div className="md:col-span-3 flex gap-2 justify-end">
                  <button
                    onClick={handleCopyClipboard}
                    className="flex-1 md:flex-none px-4 py-2.5 bg-slate-950/60 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-100 hover:text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all"
                    title="Copiar contenido de la planilla al portapapeles"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-emerald-400 animate-bounce" />
                        <span className="text-emerald-400">¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} className="text-slate-400" />
                        <span>Copiar Datos</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="flex-1 md:flex-none px-4 py-2.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-emerald-500/30 hover:border-emerald-500/50 text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    title="Descargar planilla compatible con Excel"
                  >
                    <FileSpreadsheet size={14} className="text-emerald-400" />
                    <span>Excel (.CSV)</span>
                  </button>
                </div>
              </div>

              {/* Tab Index Range Filter / A-Z Selection Series (De la A-Z) */}
              <div className="border-t border-slate-800/60 pt-4">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2.5 flex items-center gap-2 font-bold">
                  <SlidersHorizontal size={12} className="text-amber-500" />
                  <span>Filtrar por Rango de Ingeniería de la A - Z / Series</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: "VER TODO EL CATÁLOGO", id: "TODOS" },
                    { label: "SOPORTE SERIE SOL-72 (360W)", id: "SOL-72" },
                    { label: "MONO SERIE SOL-6M (Premium)", id: "SOL-6M" },
                    { label: "POLI SERIE SOL-6P (Robusto)", id: "SOL-6P" },
                    { label: "SOLARTEC KS ALTA (≥100W)", id: "KS-ALTA" },
                    { label: "SOLARTEC KS MEDIA (40W-99W)", id: "KS-MEDIA" },
                    { label: "SOLARTEC KS BAJA (<40W)", id: "KS-BAJA" },
                  ].map((tab) => {
                    const isActive = selectedLetter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setSelectedLetter(tab.id);
                          setSelectedRow(0);
                        }}
                        className={`px-3 py-1.5 text-[9px] font-mono font-bold rounded-lg border uppercase transition-all select-none ${
                          isActive
                            ? "bg-amber-500/20 border-amber-500/50 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.1)] font-black"
                            : "bg-slate-950/30 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Table and Selected Specs Side-by-Side Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Spreadsheet Panel (Left, Span 8) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none" />
                
                {/* Visual Header Grid Division Label */}
                <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-300">
                  <span className="flex items-center gap-2 font-bold text-white">
                    <Layers size={14} className="text-amber-500" />
                    VISTA DE HOJA DE CÁLCULO DE INGENIERÍA SOL SOLARTEC
                  </span>
                  <span className="text-slate-400 font-normal">
                    Fila seleccionada se resalta en ámbar
                  </span>
                </div>

                <div className="overflow-x-auto relative z-10">
                  <table className="w-full text-left border-collapse min-w-[750px]">
                    <thead>
                      <tr className="bg-slate-950/40 border-b border-slate-800 text-[10px] font-mono uppercase tracking-widest text-white select-none">
                        <th className="p-3.5 font-bold text-center border-r border-slate-800/60 w-10">#</th>
                        
                        {/* Interactive Sort Headers */}
                        {[
                          { key: "brand", label: "MARCA" },
                          { key: "modelName", label: "MODELO" },
                          { key: "pp", label: "PP (W)" },
                          { key: "imp", label: "IMP (A)" },
                          { key: "vmp", label: "VMP (V)" },
                          { key: "isc", label: "ISC (A)" },
                          { key: "voc", label: "VOC (V)" },
                          { key: "dim", label: "DIMENSIONES (mm)" },
                          { key: "weight", label: "PESO (kg)" },
                        ].map((header) => {
                          const isSorted = sortBy === header.key;
                          return (
                            <th
                              key={header.key}
                              onClick={() => {
                                if (sortBy === header.key) {
                                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                                } else {
                                  setSortBy(header.key);
                                  setSortOrder("desc"); // Default to desc for power, weight etc
                                }
                                setSelectedRow(0);
                              }}
                              className={`p-3.5 font-bold cursor-pointer transition-colors border-r border-slate-800/60 hover:bg-slate-800/40 relative ${
                                isSorted ? "text-amber-400 bg-amber-500/[0.03]" : "text-slate-100"
                              }`}
                            >
                              <div className="flex items-center gap-1.5 justify-start">
                                <span>{header.label}</span>
                                <ArrowUpDown size={12} className={isSorted ? "text-amber-500" : "text-slate-500"} />
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="text-xs font-mono text-slate-200 divide-y divide-slate-800/60">
                      {sortedPanels.length === 0 ? (
                        <tr>
                          <td colSpan={10} className="p-10 text-center text-slate-400 font-mono">
                            Ningún panel coincide con los criterios de búsqueda o filtros aplicados.
                            <button
                              onClick={() => {
                                setSearchQuery("");
                                setSelectedBrand("TODOS");
                                setSelectedLetter("TODOS");
                                setSortBy("pp");
                                setSortOrder("desc");
                              }}
                              className="block mt-4 mx-auto px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-lg text-xs"
                            >
                              Restablecer Filtros
                            </button>
                          </td>
                        </tr>
                      ) : (
                        sortedPanels.map((item, idx) => {
                          const isSelected = activeRowIndex === idx;
                          return (
                            <motion.tr
                              key={item.fullModel}
                              onClick={() => setSelectedRow(idx)}
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.15, delay: Math.min(idx * 0.02, 0.3) }}
                              className={`cursor-pointer transition-all duration-150 relative ${
                                isSelected
                                  ? "bg-amber-500/[0.08] hover:bg-amber-500/[0.1] border-l-2 border-l-amber-500 text-white font-bold"
                                  : "hover:bg-slate-800/50 hover:text-white"
                              }`}
                            >
                              {/* Row index counter column */}
                              <td className="p-3 text-center font-bold text-slate-400 bg-slate-950/20 border-r border-slate-800/60">
                                {idx + 1}
                              </td>

                              {/* MARCA Column */}
                              <td className="p-3 border-r border-slate-800/60">
                                <span
                                  className={`px-2 py-0.5 text-[9px] font-mono rounded font-bold uppercase ${
                                    item.brand === "SOLARTEC"
                                      ? "bg-amber-500/15 border border-amber-500/30 text-amber-400"
                                      : "bg-sky-500/15 border border-sky-500/30 text-sky-400"
                                  }`}
                                >
                                  {item.brand}
                                </span>
                              </td>

                              {/* MODELO Column */}
                              <td className="p-3 border-r border-slate-800/60 text-white font-bold">
                                {item.modelName}
                              </td>

                              {/* PP Column */}
                              <td className="p-3 border-r border-slate-800/60 font-bold text-amber-400">
                                {item.pp}W
                              </td>

                              {/* IMP Column */}
                              <td className="p-3 border-r border-slate-800/60 text-slate-100">
                                {item.imp}
                              </td>

                              {/* VMP Column */}
                              <td className="p-3 border-r border-slate-800/60 text-slate-100">
                                {item.vmp}
                              </td>

                              {/* ISC Column */}
                              <td className="p-3 border-r border-slate-800/60 text-slate-100">
                                {item.isc}
                              </td>

                              {/* VOC Column */}
                              <td className="p-3 border-r border-slate-800/60 text-slate-100">
                                {item.voc}
                              </td>

                              {/* DIMENSIONES Column */}
                              <td className="p-3 border-r border-slate-800/60 text-slate-300">
                                {item.dim}
                              </td>

                              {/* PESO Column */}
                              <td className="p-3 text-slate-100">
                                {item.weight}
                              </td>
                            </motion.tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer Navigation / Indicators */}
                <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-3">
                  <div className="flex items-center gap-2">
                    <Info size={14} className="text-amber-500" />
                    <span>Mostrando {sortedPanels.length} de {enrichedPanelData.length} módulos disponibles en Salta</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedRow(Math.max(0, activeRowIndex - 1))}
                      disabled={activeRowIndex === 0}
                      className="px-2 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white rounded disabled:opacity-30 disabled:hover:text-slate-400"
                    >
                      ▲ ANTERIOR
                    </button>
                    <button
                      onClick={() => setSelectedRow(Math.min(sortedPanels.length - 1, activeRowIndex + 1))}
                      disabled={activeRowIndex >= sortedPanels.length - 1}
                      className="px-2 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white rounded disabled:opacity-30 disabled:hover:text-slate-400"
                    >
                      SIGUIENTE ▼
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Spec Telemetry Console Side (Right, Span 4) */}
            <div className="lg:col-span-4">
              <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-6 shadow-2xl relative overflow-hidden space-y-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] rounded-full pointer-events-none" />
                
                {/* Visual Header */}
                <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
                  <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-500">
                    <Cpu size={18} />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-mono font-bold uppercase tracking-wider">TELEMETRÍA DE LA FICHA</h4>
                    <span className="text-[10px] font-mono text-slate-400">PANEL ACTIVO SELECCIONADO</span>
                  </div>
                </div>

                {selectedPanel ? (
                  <div className="space-y-6">
                    {/* Console Tab Selector */}
                    <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                      <button
                        onClick={() => setConsoleTab("telemetria")}
                        className={`py-2 px-1 text-[9px] font-mono font-bold rounded-lg transition-all duration-200 uppercase tracking-tight flex flex-col items-center justify-center gap-1 ${
                          consoleTab === "telemetria"
                            ? "bg-amber-500/15 border border-amber-500/30 text-amber-400 font-black shadow"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <span className="text-xs">🔌</span>
                        <span className="scale-[0.85] sm:scale-100">TELEMETRÍA</span>
                      </button>
                      <button
                        onClick={() => setConsoleTab("ficha")}
                        className={`py-2 px-1 text-[9px] font-mono font-bold rounded-lg transition-all duration-200 uppercase tracking-tight flex flex-col items-center justify-center gap-1 ${
                          consoleTab === "ficha"
                            ? "bg-amber-500/15 border border-amber-500/30 text-amber-400 font-black shadow"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <span className="text-xs">📋</span>
                        <span className="scale-[0.85] sm:scale-100">FICHA</span>
                      </button>
                      <button
                        onClick={() => setConsoleTab("curvas")}
                        className={`py-2 px-1 text-[9px] font-mono font-bold rounded-lg transition-all duration-200 uppercase tracking-tight flex flex-col items-center justify-center gap-1 ${
                          consoleTab === "curvas"
                            ? "bg-amber-500/15 border border-amber-500/30 text-amber-400 font-black shadow"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <span className="text-xs">📊</span>
                        <span className="scale-[0.85] sm:scale-100">CURVAS</span>
                      </button>
                      <button
                        onClick={() => setConsoleTab("planos")}
                        className={`py-2 px-1 text-[9px] font-mono font-bold rounded-lg transition-all duration-200 uppercase tracking-tight flex flex-col items-center justify-center gap-1 ${
                          consoleTab === "planos"
                            ? "bg-amber-500/15 border border-amber-500/30 text-amber-400 font-black shadow"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <span className="text-xs">📐</span>
                        <span className="scale-[0.85] sm:scale-100">PLANOS</span>
                      </button>
                    </div>

                    {consoleTab === "telemetria" && (
                      <div className="space-y-6">
                        {/* Visual schematic of the solar panel */}
                        <div className="relative aspect-[3/4] w-full max-w-[180px] mx-auto bg-[#1b2234] border border-slate-700 rounded-xl overflow-hidden p-3 flex flex-col justify-between shadow-inner">
                          {/* Grid Lines Representing Cells */}
                          <div className="absolute inset-0 grid grid-cols-4 grid-rows-6 gap-[1.5px] p-2 pointer-events-none opacity-80">
                            {Array.from({ length: 24 }).map((_, i) => (
                              <div 
                                key={i} 
                                className={`border border-white/10 rounded-sm shadow-sm ${
                                  selectedPanel.brand === "SOLARTEC" 
                                    ? "bg-gradient-to-br from-blue-700 to-blue-900" 
                                    : "bg-gradient-to-br from-[#1b3464] to-[#0e1b34]"
                                }`} 
                              />
                            ))}
                          </div>

                          {/* Schematic overlays */}
                          <div className="relative z-10 flex flex-col justify-between h-full font-mono text-[8px] text-white">
                            <div className="flex justify-between items-start">
                              <span className="bg-black/80 px-1 py-0.5 rounded border border-white/10">{selectedPanel.brand}</span>
                              <span className="bg-black/80 px-1 py-0.5 rounded border border-white/10">{selectedPanel.weight} kg</span>
                            </div>
                            
                            {/* Center Power Tag */}
                            <div className="text-center bg-slate-950/90 border border-amber-500/40 p-1 rounded backdrop-blur-md">
                              <span className="block text-[7px] text-slate-400">Pmax (PP)</span>
                              <span className="text-[11px] font-bold text-amber-400">{selectedPanel.pp} Watts</span>
                            </div>

                            <div className="flex justify-between items-end">
                              <span className="bg-black/80 px-1 py-0.5 rounded border border-white/10">W: {selectedPanel.dim.split("x")[1]}mm</span>
                              <span className="bg-black/80 px-1 py-0.5 rounded border border-white/10">H: {selectedPanel.dim.split("x")[0]}mm</span>
                            </div>
                          </div>
                        </div>

                        {/* Detailed Spec Badges */}
                        <div className="space-y-4">
                          {/* Brand & Model Designation Title */}
                          <div className="text-center">
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Designación Técnica</span>
                            <h5 className="text-white text-lg font-mono font-bold mt-1">
                              {selectedPanel.brand} {selectedPanel.modelName}
                            </h5>
                          </div>

                          {/* Primary Parameters Dials / Meters */}
                          <div className="grid grid-cols-2 gap-3 pt-2">
                            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                              <span className="block text-[8px] font-mono text-slate-400 uppercase">Potencia Pico (PP)</span>
                              <span className="text-lg font-mono font-bold text-amber-400">{selectedPanel.pp} W</span>
                              <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                                <div 
                                  className="bg-amber-400 h-full rounded-full transition-all duration-500"
                                  style={{ width: `${(selectedPanel.pp / 370) * 100}%` }}
                                />
                              </div>
                            </div>

                            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                              <span className="block text-[8px] font-mono text-slate-400 uppercase">Generación Est.</span>
                              <span className="text-lg font-mono font-bold text-emerald-400">{(selectedPanel.pp * 5).toFixed(0)} Wh/d</span>
                              <span className="block text-[7px] text-slate-500 mt-1 font-mono">Calculado a 5 HSP</span>
                            </div>
                          </div>

                          {/* Secondary parameters list */}
                          <div className="space-y-2 bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5 text-left">
                            <div className="flex justify-between items-center text-xs font-mono py-1 border-b border-slate-800/50">
                              <span className="text-slate-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                IMP (Corriente p. pico):
                              </span>
                              <span className="text-white font-bold">{selectedPanel.imp} A</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-mono py-1 border-b border-slate-800/50">
                              <span className="text-slate-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                VMP (Tensión p. pico):
                              </span>
                              <span className="text-white font-bold">{selectedPanel.vmp} V</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-mono py-1 border-b border-slate-800/50">
                              <span className="text-slate-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                ISC (Corriente corto c.):
                              </span>
                              <span className="text-white font-bold">{selectedPanel.isc} A</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-mono py-1 border-b border-slate-800/50">
                              <span className="text-slate-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                VOC (Tensión c. abierto):
                              </span>
                              <span className="text-white font-bold">{selectedPanel.voc} V</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-mono py-1 border-b border-slate-800/50">
                              <span className="text-slate-400 flex items-center gap-1 text-left">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                DIMENSIONES:
                              </span>
                              <span className="text-white font-bold">{selectedPanel.dim} mm</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-mono py-1">
                              <span className="text-slate-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                                PESO:
                              </span>
                              <span className="text-white font-bold">{selectedPanel.weight} kg</span>
                            </div>
                          </div>

                          {/* Technical Certifications Bullet Points */}
                          <div className="space-y-1.5 bg-slate-950/20 border border-slate-800/40 rounded-xl p-3 text-[10px] font-mono text-slate-400 text-left">
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                              <span>Vidrio templado texturado de bajo hierro (3.2mm)</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                              <span>Junction Box IP67 con diodos de derivación bypass</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                              <span>Estructura de duraluminio anodizado robusto</span>
                            </div>
                          </div>

                          {/* Action buttons */}
                          <div className="flex flex-col gap-2 pt-2">
                            <button
                              onClick={() => handleQuoteModel(`${selectedPanel.brand} ${selectedPanel.modelName}`)}
                              className="w-full py-3 bg-gradient-to-r from-amber-500 to-[#FF5665] hover:brightness-110 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                            >
                              <Sun size={14} className="animate-spin-slow" />
                              Cotizar Modelo Seleccionado
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {consoleTab === "ficha" && (
                      <div className="space-y-5 text-left font-mono">
                        {/* Summary Header */}
                        <div className="border-b border-slate-800 pb-3">
                          <span className="text-[9px] text-amber-500 uppercase font-black tracking-widest block">FICHA DE INGENIERÍA OFICIAL</span>
                          <h5 className="text-white text-base font-bold mt-0.5 uppercase tracking-tight">
                            {selectedPanel.brand} {selectedPanel.modelName}
                          </h5>
                          <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                            {selectedPanel.model.startsWith("SOL-6P") ? (
                              "Módulo fotovoltaico policristalino de alto rendimiento SOLARTEC. Ofrece certificación libre de PID, óptima resistencia ante niebla salina o amoníaco, e inspección dual para asegurar cero micro-defectos."
                            ) : selectedPanel.model.startsWith("SOL-72PE") ? (
                              "Módulo fotovoltaico monocristalino de alta eficiencia con tecnología de celdas PERC. Óptimo desempeño en climas extremos y baja irradiación."
                            ) : (
                              "Módulo fotovoltaico de silicio cristalino para electrificación rural y telecomunicaciones profesionales."
                            )}
                          </p>
                        </div>

                        {/* Section 1: Electrical Parameters (STC) */}
                        <div className="space-y-1.5">
                          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <Zap size={10} className="text-amber-500" />
                            1. Especificaciones Eléctricas (STC*)
                          </div>
                          <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-2.5 text-[10px] space-y-1">
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Potencia Pico (Pmax)</span>
                              <span className="text-amber-400 font-bold">{selectedPanel.pp} W</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Tensión Pmax (Vmp)</span>
                              <span className="text-white">{selectedPanel.vmp} V</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Corriente Pmax (Imp)</span>
                              <span className="text-white">{selectedPanel.imp} A</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Tensión Cto. Abierto (Voc)</span>
                              <span className="text-white">{selectedPanel.voc} V</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Corriente Corto (Isc)</span>
                              <span className="text-white">{selectedPanel.isc} A</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Eficiencia Módulo</span>
                              <span className="text-emerald-400 font-bold">{selectedPanel.efficiency || (selectedPanel.model.startsWith("SOL-72PE") ? "18.6%" : "14.2%")}</span>
                            </div>
                            <div className="flex justify-between text-[8px] text-slate-500 pt-1">
                              <span>*Irradiancia 1000 W/m², Temp. 25°C, AM 1.5</span>
                              <span className="text-slate-400 font-bold">
                                Tolerancia: {selectedPanel.model.startsWith("SOL-6P-60") ? "0% ~ +3%" : selectedPanel.model.startsWith("SOL-6P-72") ? "+3%" : "+5 W"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Section 2: Mechanical parameters */}
                        <div className="space-y-1.5">
                          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <Settings size={10} className="text-slate-400" />
                            2. Características Mecánicas
                          </div>
                          <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-2.5 text-[10px] space-y-1">
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Dimensiones</span>
                              <span className="text-white font-bold">{selectedPanel.dim.replace("x", " x ").replace("x", " x ")} mm</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Peso Total</span>
                              <span className="text-white">{selectedPanel.weight} kg</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Tipo de Celdas</span>
                              <span className="text-slate-200">
                                {selectedPanel.model.startsWith("SOL-6P") ? "Celdas policristalinas de 156x156 mm (4BB)" : selectedPanel.model.startsWith("SOL-72PE") ? "72 celdas monocristalinas PERC" : "Celdas policristalinas de alta eficiencia"}
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Estructura Frontal</span>
                              <span className="text-slate-300">Vidrio templado templado alta transp. (3 mm)</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Cubierta Trasera</span>
                              <span className="text-slate-300">Lámina TPE aislante de alta resistencia</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Caja de Conexión</span>
                              <span className="text-slate-300">Clasificación IP67, con 3 diodos bypass</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Cableado y Conector</span>
                              <span className="text-slate-300">Cable 4 mm² x 1.2 m, acoplamiento MC4</span>
                            </div>
                          </div>
                        </div>

                        {/* Section 3: Thermal Coefficients */}
                        <div className="space-y-1.5">
                          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <Sun size={10} className="text-orange-400" />
                            3. Coeficientes Térmicos
                          </div>
                          <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-2.5 text-[10px] space-y-1">
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">NOCT (Temp. Nominal)</span>
                              <span className="text-white">45°C ± 2°C</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Coef. Temp. para Pmax</span>
                              <span className="text-white">-0.380% / °C</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Coef. Temp. para Voc</span>
                              <span className="text-white">-0.286% / °C</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Coef. Temp. para Isc</span>
                              <span className="text-white">+0.057% / °C</span>
                            </div>
                          </div>
                        </div>

                        {/* Section 4: Operating conditions */}
                        <div className="space-y-1.5">
                          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <Wind size={10} className="text-blue-400" />
                            4. Operación y Resistencia Mecánica
                          </div>
                          <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-2.5 text-[10px] space-y-1">
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Rango Temperatura</span>
                              <span className="text-white">-40°C a +85°C</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Tensión Máx. Sistema</span>
                              <span className="text-white">1000V DC</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Corr. Reversa Máxima</span>
                              <span className="text-white">20A</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Carga Máxima (Nieve)</span>
                              <span className="text-slate-300">5400 Pa</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Carga Viento (Presión)</span>
                              <span className="text-slate-300">2400 Pa</span>
                            </div>
                            <div className="flex justify-between text-left">
                              <span className="text-slate-400 shrink-0">Resistencia Amb.</span>
                              <span className="text-slate-200 text-[9px] text-right">Certificación anti-PID. Ensayo niebla salina, amoníaco e hidratación severa</span>
                            </div>
                          </div>
                        </div>

                        {/* Section 5: Warranties */}
                        <div className="space-y-1.5">
                          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <Shield size={10} className="text-emerald-400" />
                            5. Garantías y Certificaciones
                          </div>
                          <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-2.5 text-[10px] space-y-1">
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Garantía Producto</span>
                              <span className="text-emerald-400 font-bold">10 años limitados</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-400">Garantía Potencia</span>
                              <span className="text-emerald-400">25 años limitada (anual ≤ -0.55%)</span>
                            </div>
                            <div className="flex justify-between text-left">
                              <span className="text-slate-400 shrink-0">Normativas</span>
                              <span className="text-slate-300 text-right">IEC 61215, IEC 61730, ISO 9001:2008, TS62941</span>
                            </div>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-1">
                          <button
                            onClick={() => handleQuoteModel(`${selectedPanel.brand} ${selectedPanel.modelName}`)}
                            className="w-full py-3 bg-gradient-to-r from-amber-500 to-[#FF5665] hover:brightness-110 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                          >
                            <Sun size={14} className="animate-spin-slow" />
                            Cotizar Modelo Seleccionado
                          </button>
                        </div>
                      </div>
                    )}

                    {consoleTab === "curvas" && (() => {
                      const voc = selectedPanel.voc;
                      const isc = selectedPanel.isc;
                      const pp = selectedPanel.pp;
                      const maxV = 55;
                      const maxI = 11;
                      const maxP = 420;

                      // Helpers to calculate plot path
                      const getIVPath = (G: number, T: number) => {
                        const width = 280;
                        const height = 120;
                        const left = 25;
                        const top = 10;
                        const plotW = width - left - 10;
                        const plotH = height - top - 15;
                        const adjVoc = voc * (1 - 0.00286 * (T - 25));
                        const adjIsc = isc * (G / 1000) * (1 + 0.00057 * (T - 25));
                        
                        let d = "";
                        for (let s = 0; s <= 30; s++) {
                          const v = (adjVoc * s) / 30;
                          const expTerm = Math.pow(v / adjVoc, 11);
                          const i = Math.max(0, adjIsc * (1 - expTerm));
                          const x = left + (v / maxV) * plotW;
                          const y = top + plotH - (i / maxI) * plotH;
                          d += `${s === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
                        }
                        return d;
                      };

                      const getPVPath = (G: number, T: number) => {
                        const width = 280;
                        const height = 120;
                        const left = 25;
                        const top = 10;
                        const plotW = width - left - 10;
                        const plotH = height - top - 15;
                        const adjVoc = voc * (1 - 0.00286 * (T - 25));
                        const adjIsc = isc * (G / 1000) * (1 + 0.00057 * (T - 25));
                        
                        let d = "";
                        for (let s = 0; s <= 30; s++) {
                          const v = (adjVoc * s) / 30;
                          const expTerm = Math.pow(v / adjVoc, 11);
                          const i = Math.max(0, adjIsc * (1 - expTerm));
                          const p = v * i;
                          const x = left + (v / maxV) * plotW;
                          const y = top + plotH - (p / maxP) * plotH;
                          d += `${s === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
                        }
                        return d;
                      };

                      const activeAdjVoc = voc * (1 - 0.00286 * (curveTemp - 25));
                      const activeAdjIsc = isc * (curveIrradiance / 1000) * (1 + 0.00057 * (curveTemp - 25));
                      const activeAdjPmax = pp * (curveIrradiance / 1000) * (1 - 0.0038 * (curveTemp - 25));

                      return (
                        <div className="space-y-5 text-left font-mono text-xs">
                          {/* Selector */}
                          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950/40 border border-slate-800/40 rounded-xl text-[10px]">
                            <button
                              onClick={() => setCurveMode("irradiacion")}
                              className={`py-1.5 px-2 rounded-lg transition-all ${
                                curveMode === "irradiacion"
                                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                  : "text-slate-400 hover:text-white"
                              }`}
                            >
                              ☀️ Irradiación (W/m²)
                            </button>
                            <button
                              onClick={() => setCurveMode("temperatura")}
                              className={`py-1.5 px-2 rounded-lg transition-all ${
                                curveMode === "temperatura"
                                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                  : "text-slate-400 hover:text-white"
                              }`}
                            >
                              🌡️ Temperatura (°C)
                            </button>
                          </div>

                          {curveMode === "irradiacion" ? (
                            <div className="space-y-4">
                              <p className="text-[10px] text-slate-400 leading-relaxed">
                                <span className="text-amber-400 font-bold">Curvas Eléctricas de Rendimiento:</span> Las curvas muestran el comportamiento de corriente y potencia frente a la variación solar.
                              </p>

                              {/* Interactive Slider */}
                              <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-3 space-y-2">
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="text-slate-400">Irradiación Solar:</span>
                                  <span className="text-amber-400 font-bold font-mono">{curveIrradiance} W/m²</span>
                                </div>
                                <input
                                  type="range"
                                  min="200"
                                  max="1000"
                                  step="100"
                                  value={curveIrradiance}
                                  onChange={(e) => setCurveIrradiance(parseInt(e.target.value))}
                                  className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer h-1"
                                />
                                <div className="flex justify-between text-[8px] text-slate-500">
                                  <span>200 W/m² (Nublado)</span>
                                  <span>1000 W/m² (STC)</span>
                                </div>
                              </div>

                              {/* Curve Plot 1: I-V according to Irradiance */}
                              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 space-y-2">
                                <div className="text-[9px] text-slate-300 font-bold flex justify-between">
                                  <span>CURVA I-V (Corriente vs Tensión)</span>
                                  <span className="text-cyan-400 font-normal">Caída directa de Amperaje</span>
                                </div>
                                <div className="relative h-[120px] w-full">
                                  <svg className="w-full h-full" viewBox="0 0 280 120">
                                    {/* Grids */}
                                    <line x1="25" y1="10" x2="25" y2="105" stroke="#334155" strokeWidth="0.5" />
                                    <line x1="25" y1="105" x2="270" y2="105" stroke="#334155" strokeWidth="0.5" />
                                    {[0.2, 0.4, 0.6, 0.8, 1.0].map((f, i) => (
                                      <g key={i}>
                                        <line x1={25 + f * 245} y1="10" x2={25 + f * 245} y2="105" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2,2" />
                                        <text x={25 + f * 245} y="115" fill="#64748b" fontSize="6" textAnchor="middle">{(f * maxV).toFixed(0)}V</text>
                                        <line x1="20" y1={105 - f * 95} x2="25" y2={105 - f * 95} stroke="#334155" strokeWidth="0.5" />
                                        <text x="16" y={107 - f * 95} fill="#64748b" fontSize="6" textAnchor="end">{(f * maxI).toFixed(0)}A</text>
                                      </g>
                                    ))}

                                    {/* Family of curves reference (1000, 800, 600, 400) */}
                                    <path d={getIVPath(1000, 25)} fill="none" stroke="#0891b2" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
                                    <path d={getIVPath(800, 25)} fill="none" stroke="#0891b2" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.2" />
                                    <path d={getIVPath(600, 25)} fill="none" stroke="#0891b2" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.15" />

                                    {/* Live Active Curve */}
                                    <path d={getIVPath(curveIrradiance, curveTemp)} fill="none" stroke="#22d3ee" strokeWidth="1.5" />
                                  </svg>
                                </div>
                                <p className="text-[8px] text-slate-500 italic">
                                  Al disminuir la irradiación, se observa una reducción vertical del amperaje, manteniendo la tensión casi constante.
                                </p>
                              </div>

                              {/* Curve Plot 2: P-V according to Irradiance */}
                              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 space-y-2">
                                <div className="text-[9px] text-slate-300 font-bold flex justify-between">
                                  <span>CURVA P-V (Potencia vs Tensión)</span>
                                  <span className="text-amber-400 font-normal">Picos de Potencia Máxima</span>
                                </div>
                                <div className="relative h-[120px] w-full">
                                  <svg className="w-full h-full" viewBox="0 0 280 120">
                                    <line x1="25" y1="10" x2="25" y2="105" stroke="#334155" strokeWidth="0.5" />
                                    <line x1="25" y1="105" x2="270" y2="105" stroke="#334155" strokeWidth="0.5" />
                                    {[0.2, 0.4, 0.6, 0.8, 1.0].map((f, i) => (
                                      <g key={i}>
                                        <line x1={25 + f * 245} y1="10" x2={25 + f * 245} y2="105" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2,2" />
                                        <text x={25 + f * 245} y="115" fill="#64748b" fontSize="6" textAnchor="middle">{(f * maxV).toFixed(0)}V</text>
                                        <line x1="20" y1={105 - f * 95} x2="25" y2={105 - f * 95} stroke="#334155" strokeWidth="0.5" />
                                        <text x="16" y={107 - f * 95} fill="#64748b" fontSize="6" textAnchor="end">{(f * maxP).toFixed(0)}W</text>
                                      </g>
                                    ))}

                                    {/* Family P-V references */}
                                    <path d={getPVPath(1000, 25)} fill="none" stroke="#d97706" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
                                    <path d={getPVPath(600, 25)} fill="none" stroke="#d97706" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.15" />

                                    {/* Live Active Curve */}
                                    <path d={getPVPath(curveIrradiance, curveTemp)} fill="none" stroke="#fbbf24" strokeWidth="1.5" />

                                    {/* Live MPP dot */}
                                    {(() => {
                                      const mppV = activeAdjVoc * 0.81;
                                      const mppX = 25 + (mppV / maxV) * 245;
                                      const mppY = 105 - (activeAdjPmax / maxP) * 95;
                                      return (
                                        <g>
                                          <circle cx={mppX} cy={mppY} r="3" fill="#10b981" className="animate-pulse" />
                                          <text x={mppX} y={mppY - 6} fill="#10b981" fontSize="6" fontWeight="bold" textAnchor="middle">
                                            {activeAdjPmax.toFixed(0)}W
                                          </text>
                                        </g>
                                      );
                                    })()}
                                  </svg>
                                </div>
                                <div className="text-[9px] text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800 flex justify-between">
                                  <span>Pmax Ajustado: <strong className="text-emerald-400">{activeAdjPmax.toFixed(0)} W</strong></span>
                                  <span>Isc Activo: <strong>{activeAdjIsc.toFixed(2)} A</strong></span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <p className="text-[10px] text-slate-400 leading-relaxed">
                                <span className="text-red-400 font-bold">Efecto Térmico:</span> El calor disminuye la eficiencia de las celdas disminuyendo la tensión (Voc/Vmp) a medida que aumenta la temperatura.
                              </p>

                              {/* Interactive Slider */}
                              <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-3 space-y-2">
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="text-slate-400">Temperatura de Celda:</span>
                                  <span className="text-red-400 font-bold font-mono">{curveTemp} °C</span>
                                </div>
                                <input
                                  type="range"
                                  min="15"
                                  max="75"
                                  step="5"
                                  value={curveTemp}
                                  onChange={(e) => setCurveTemp(parseInt(e.target.value))}
                                  className="w-full accent-red-500 bg-slate-800 rounded-lg cursor-pointer h-1"
                                />
                                <div className="flex justify-between text-[8px] text-slate-500">
                                  <span>15 °C (Invierno)</span>
                                  <span>75 °C (Verano Extremo)</span>
                                </div>
                              </div>

                              {/* Curve Plot: I-V according to Temperature */}
                              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 space-y-2">
                                <div className="text-[9px] text-slate-300 font-bold flex justify-between">
                                  <span>CURVA I-V (Efecto de Temperatura)</span>
                                  <span className="text-red-400 font-normal">Tensión decrece con Calor</span>
                                </div>
                                <div className="relative h-[120px] w-full">
                                  <svg className="w-full h-full" viewBox="0 0 280 120">
                                    <line x1="25" y1="10" x2="25" y2="105" stroke="#334155" strokeWidth="0.5" />
                                    <line x1="25" y1="105" x2="270" y2="105" stroke="#334155" strokeWidth="0.5" />
                                    {[0.2, 0.4, 0.6, 0.8, 1.0].map((f, i) => (
                                      <g key={i}>
                                        <line x1={25 + f * 245} y1="10" x2={25 + f * 245} y2="105" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2,2" />
                                        <text x={25 + f * 245} y="115" fill="#64748b" fontSize="6" textAnchor="middle">{(f * maxV).toFixed(0)}V</text>
                                        <line x1="20" y1={105 - f * 95} x2="25" y2={105 - f * 95} stroke="#334155" strokeWidth="0.5" />
                                        <text x="16" y={107 - f * 95} fill="#64748b" fontSize="6" textAnchor="end">{(f * maxI).toFixed(0)}A</text>
                                      </g>
                                    ))}

                                    {/* 25°C STC Reference line */}
                                    <path d={getIVPath(1000, 25)} fill="none" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.6" />
                                    <text x="170" y="20" fill="#94a3b8" fontSize="5" opacity="0.7">Ref 25°C (STC)</text>

                                    {/* Live Active Curve */}
                                    <path d={getIVPath(curveIrradiance, curveTemp)} fill="none" stroke="#ef4444" strokeWidth="1.5" />
                                  </svg>
                                </div>
                                <div className="text-[9px] text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800 space-y-1">
                                  <div className="flex justify-between">
                                    <span>Tensión Voc Ajustada:</span>
                                    <span className="text-red-400 font-bold">{activeAdjVoc.toFixed(1)} V</span>
                                  </div>
                                  <div className="flex justify-between text-[8px] text-slate-500">
                                    <span>Voc nominal: {selectedPanel.voc} V</span>
                                    <span>Delta: {((activeAdjVoc / selectedPanel.voc - 1) * 100).toFixed(1)}%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Common backquote button */}
                          <div className="pt-1">
                            <button
                              onClick={() => handleQuoteModel(`${selectedPanel.brand} ${selectedPanel.modelName}`)}
                              className="w-full py-3 bg-gradient-to-r from-amber-500 to-[#FF5665] hover:brightness-110 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                            >
                              <Sun size={14} className="animate-spin-slow" />
                              Cotizar {selectedPanel.modelName}
                            </button>
                          </div>
                        </div>
                      );
                    })()}

                    {consoleTab === "planos" && (() => {
                      const dims = selectedPanel.dim.split("x");
                      const pLength = dims[0] || "1956";
                      const pWidth = dims[1] || "991";
                      const pThick = dims[2] || "45";
                      const brand = selectedPanel.brand;
                      const model = selectedPanel.model;

                      return (
                        <div className="space-y-4 text-left font-mono text-xs">
                          {/* Title banner */}
                          <div className="border-b border-slate-800 pb-2">
                            <span className="text-[9px] text-cyan-400 uppercase font-bold tracking-widest block">PLANO MECÁNICO E INGENIERÍA DE DISEÑO</span>
                            <h5 className="text-white text-sm font-bold mt-0.5 uppercase tracking-tight">
                              DIAGRAMA DE MEDIDAS Y COTAS {brand}
                            </h5>
                          </div>

                          {/* Beautiful Custom CAD/Blueprint SVG */}
                          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-2 shadow-inner overflow-hidden">
                            <svg className="w-full bg-[#0d1324] border border-cyan-900/40 rounded-xl" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg">
                              {/* Grid Pattern */}
                              <defs>
                                <pattern id="blueprint-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#112240" strokeWidth="0.5" />
                                </pattern>
                                <marker id="cad-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#00e5ff" />
                                </marker>
                              </defs>
                              <rect width="100%" height="100%" fill="url(#blueprint-grid)" />

                              {/* VISTA FRONTAL (Left Panel) */}
                              <text x="65" y="16" fill="#00e5ff" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold" letterSpacing="0.5">VISTA FRONTAL</text>
                              
                              {/* Solar Panel frame contour */}
                              <rect x="30" y="24" width="70" height="140" fill="#081021" stroke="#00e5ff" strokeWidth="1" rx="1" />
                              <rect x="33" y="27" width="64" height="134" fill="#050a14" stroke="#00e5ff" strokeWidth="0.5" opacity="0.6" />

                              {/* Cells matrix 6x12 representation */}
                              <g opacity="0.25">
                                {Array.from({ length: 12 }).map((_, r) => (
                                  <line key={`row-${r}`} x1="33" y1={27 + (r * 134) / 12} x2="97" y2={27 + (r * 134) / 12} stroke="#00e5ff" strokeWidth="0.4" />
                                ))}
                                {Array.from({ length: 6 }).map((_, c) => (
                                  <line key={`col-${c}`} x1={33 + (c * 64) / 6} y1="27" x2={33 + (c * 64) / 6} y2="161" stroke="#00e5ff" strokeWidth="0.4" />
                                ))}
                              </g>

                              {/* Dimension vertical: Height (1956 mm or similar) */}
                              <line x1="16" y1="24" x2="16" y2="164" stroke="#00e5ff" strokeWidth="0.5" markerStart="url(#cad-arrow)" markerEnd="url(#cad-arrow)" />
                              <line x1="16" y1="24" x2="30" y2="24" stroke="#00e5ff" strokeWidth="0.3" strokeDasharray="1,1" opacity="0.5" />
                              <line x1="16" y1="164" x2="30" y2="164" stroke="#00e5ff" strokeWidth="0.3" strokeDasharray="1,1" opacity="0.5" />
                              <text x="11" y="94" fill="#00e5ff" fontSize="6.5" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,11,94)">{pLength} mm</text>

                              {/* Dimension horizontal: Width (991 mm) */}
                              <line x1="30" y1="178" x2="100" y2="178" stroke="#00e5ff" strokeWidth="0.5" markerStart="url(#cad-arrow)" markerEnd="url(#cad-arrow)" />
                              <line x1="30" y1="164" x2="30" y2="178" stroke="#00e5ff" strokeWidth="0.3" strokeDasharray="1,1" opacity="0.5" />
                              <line x1="100" y1="164" x2="100" y2="178" stroke="#00e5ff" strokeWidth="0.3" strokeDasharray="1,1" opacity="0.5" />
                              <text x="65" y="187" fill="#00e5ff" fontSize="6.5" fontFamily="monospace" textAnchor="middle">{pWidth} mm</text>


                              {/* VISTA LATERAL / MARCO (Right Panel) */}
                              <text x="160" y="16" fill="#00e5ff" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold" letterSpacing="0.5">VISTA MARCO</text>
                              
                              {/* Aluminum frame structure extrusion blueprint */}
                              <rect x="154" y="24" width="12" height="140" fill="#0f1a30" stroke="#00e5ff" strokeWidth="1" />
                              <line x1="160" y1="24" x2="160" y2="164" stroke="#00e5ff" strokeWidth="0.5" strokeDasharray="1,2" opacity="0.6" />
                              {/* Junction box small representation on back */}
                              <rect x="151" y="80" width="3" height="20" fill="#00e5ff" stroke="#00e5ff" strokeWidth="0.5" opacity="0.8" />

                              {/* Dimension frame thickness (45 mm) */}
                              <line x1="154" y1="178" x2="166" y2="178" stroke="#00e5ff" strokeWidth="0.5" markerStart="url(#cad-arrow)" markerEnd="url(#cad-arrow)" />
                              <line x1="154" y1="164" x2="154" y2="178" stroke="#00e5ff" strokeWidth="0.3" strokeDasharray="1,1" opacity="0.5" />
                              <line x1="166" y1="164" x2="166" y2="178" stroke="#00e5ff" strokeWidth="0.3" strokeDasharray="1,1" opacity="0.5" />
                              <text x="160" y="187" fill="#00e5ff" fontSize="6.5" fontFamily="monospace" textAnchor="middle">{pThick} mm</text>


                              {/* Technical pointer labels / Callouts */}
                              <g opacity="0.8">
                                {/* Pointer 1: Glass */}
                                <path d="M 85 45 L 120 35 L 210 35" fill="none" stroke="#1e3a8a" strokeWidth="0.5" />
                                <circle cx="85" cy="45" r="1.5" fill="#00e5ff" />
                                <text x="215" y="37" fill="#94a3b8" fontSize="5.5" fontFamily="monospace">Vidrio Templado (3.2 mm)</text>

                                {/* Pointer 2: PERC Cell */}
                                <path d="M 65 110 L 115 100 L 210 100" fill="none" stroke="#1e3a8a" strokeWidth="0.5" />
                                <circle cx="65" cy="110" r="1.5" fill="#00e5ff" />
                                <text x="215" y="102" fill="#94a3b8" fontSize="5.5" fontFamily="monospace">Celdas PERC alta ef.</text>

                                {/* Pointer 3: Anodized Frame */}
                                <path d="M 162 70 L 185 60 L 210 60" fill="none" stroke="#1e3a8a" strokeWidth="0.5" />
                                <circle cx="162" cy="70" r="1.5" fill="#00e5ff" />
                                <text x="215" y="62" fill="#94a3b8" fontSize="5.5" fontFamily="monospace">Aluminio Anodizado ({pThick}mm)</text>

                                {/* Pointer 4: IP67 J-Box */}
                                <path d="M 152 90 L 175 90 L 210 90" fill="none" stroke="#1e3a8a" strokeWidth="0.5" />
                                <circle cx="152" cy="90" r="1.5" fill="#00e5ff" />
                                <text x="215" y="92" fill="#94a3b8" fontSize="5.5" fontFamily="monospace">Caja Conexiones IP67</text>
                              </g>
                            </svg>
                          </div>

                          {/* Mechanical text callouts list */}
                          <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3 text-[10px] space-y-1.5 leading-relaxed text-slate-400">
                            <div>
                              <strong className="text-white">● Celdas PERC Integradas:</strong> Celdas monocristalinas de alta pureza con tratamiento antirreflejo y pasivación trasera.
                            </div>
                            <div>
                              <strong className="text-white">● Estructura del Marco:</strong> Perfil extruido de duraluminio anodizado AL6063-T5 de 45 mm, con orificios para puesta a tierra y anclajes rápidos.
                            </div>
                            <div>
                              <strong className="text-white">● Vidrio Frontal:</strong> Templado térmicamente de bajo contenido en hierro, alta emisividad y transmisividad del espectro solar.
                            </div>
                          </div>

                          {/* Quick Quote button */}
                          <div className="pt-1">
                            <button
                              onClick={() => handleQuoteModel(`${brand} ${selectedPanel.modelName}`)}
                              className="w-full py-3 bg-gradient-to-r from-amber-500 to-[#FF5665] hover:brightness-110 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                            >
                              <Sun size={14} className="animate-spin-slow" />
                              Cotizar Estructura y Módulo
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="text-center py-10 text-slate-500 font-mono text-xs">
                    Seleccioná una fila de la planilla para auditar telemetría.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
        )}

        {/* 3D Glowing Support Structures */}
        {activeCategory === "estructuras" && (
          <div id="estructuras" className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              Estructuras de Soporte
            </h2>
            <p className="text-gray-400 font-light max-w-2xl mx-auto">
              Especialmente diseñadas para modificar la inclinación del
              generador solar dependiendo de la latitud del sitio. Resistentes a
              las condiciones meteorológicas más severas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* GST Card */}
            <motion.div
              whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
              className="p-[1px] rounded-3xl bg-gradient-to-br from-[#0088cc] via-[#0088cc]/20 to-black relative group"
            >
              <div className="absolute inset-0 bg-[#0088cc]/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="bg-[#0b0e14] h-full rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between">
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop"
                    alt="Estructura Solar"
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 grayscale mix-blend-screen"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0b0e14]/50 via-[#0b0e14]/80 to-[#0b0e14] z-10" />
                </div>

                <div className="absolute top-0 right-0 p-8 opacity-10 z-10">
                  <Layers size={100} />
                </div>
                <div className="relative z-20">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0088cc]/30 bg-[#0088cc]/10 text-[#0088cc] text-[10px] font-mono font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(0,136,204,0.3)]">
                    <Wind size={12} />
                    Estructura Telescópica
                  </div>
                  <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight drop-shadow-lg">
                    Soporte <span className="text-[#0088cc]">GST</span>
                  </h3>
                  <h4 className="text-xl text-gray-300 font-light mb-6 leading-snug">
                    Liviana. Práctica. Resistente.
                  </h4>
                  <ul className="text-gray-400 space-y-3 font-mono text-sm mb-8">
                    <li className="flex items-start gap-3">
                      <span className="text-[#0088cc] mt-1 drop-shadow-[0_0_5px_rgba(0,136,204,0.8)]">
                        ✦
                      </span>{" "}
                      Soporta las más variadas condiciones climáticas (viento,
                      lluvia, granizo y nieve)
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#0088cc] mt-1 drop-shadow-[0_0_5px_rgba(0,136,204,0.8)]">
                        ✦
                      </span>{" "}
                      Simple de colocar con bulones de anclaje
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#0088cc] mt-1 drop-shadow-[0_0_5px_rgba(0,136,204,0.8)]">
                        ✦
                      </span>{" "}
                      Amplia variedad de ángulos (35°, 40°, 45°, 50°, 55°, 60°)
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#0088cc] mt-1 drop-shadow-[0_0_5px_rgba(0,136,204,0.8)]">
                        ✦
                      </span>{" "}
                      Fabricada en aluminio anodizado
                    </li>
                  </ul>
                </div>
                <div className="pt-6 border-t border-white/10 text-xs font-mono text-gray-400 uppercase flex gap-4 flex-wrap relative z-20">
                  <span className="bg-white/5 px-2 py-1 rounded">
                    Módulos: 4 a 8
                  </span>
                  <span className="bg-white/5 px-2 py-1 rounded">
                    Aplicaciones: Telecom, Bombeo, Autónomos, RED
                  </span>
                </div>
              </div>
            </motion.div>

            {/* GSTR Card */}
            <motion.div
              whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
              className="p-[1px] rounded-3xl bg-gradient-to-br from-[#FF5665] via-[#FF5665]/20 to-black relative group"
            >
              <div className="absolute inset-0 bg-[#FF5665]/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="bg-[#0b0e14] h-full rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between">
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="https://images.unsplash.com/photo-1544002684-0a3dbf295b77?q=80&w=1200&auto=format&fit=crop"
                    alt="Estructura Solar Reforzada"
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 grayscale mix-blend-screen"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0b0e14]/50 via-[#0b0e14]/80 to-[#0b0e14] z-10" />
                </div>

                <div className="absolute top-0 right-0 p-8 opacity-10 z-10">
                  <Shield size={100} />
                </div>
                <div className="relative z-20">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF5665]/30 bg-[#FF5665]/10 text-[#FF5665] text-[10px] font-mono font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(255,86,101,0.3)]">
                    <Zap size={12} />
                    Estructura Reforzada
                  </div>
                  <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight drop-shadow-lg">
                    Soporte <span className="text-[#FF5665]">GSTR</span>
                  </h3>
                  <h4 className="text-xl text-gray-300 font-light mb-6 leading-snug">
                    Liviana. Práctica. Altamente resistente.
                  </h4>
                  <ul className="text-gray-400 space-y-3 font-mono text-sm mb-8">
                    <li className="flex items-start gap-3">
                      <span className="text-[#FF5665] mt-1 drop-shadow-[0_0_5px_rgba(255,86,101,0.8)]">
                        ✦
                      </span>{" "}
                      Reforzada para uso en condiciones extremas y altas
                      velocidades de viento
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#FF5665] mt-1 drop-shadow-[0_0_5px_rgba(255,86,101,0.8)]">
                        ✦
                      </span>{" "}
                      Disposición de 4 patas traseras para máxima estabilidad
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#FF5665] mt-1 drop-shadow-[0_0_5px_rgba(255,86,101,0.8)]">
                        ✦
                      </span>{" "}
                      Amplia variedad de ángulos (35°, 40°, 45°, 50°, 55°, 60°)
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#FF5665] mt-1 drop-shadow-[0_0_5px_rgba(255,86,101,0.8)]">
                        ✦
                      </span>{" "}
                      Distancia entre delanteras y traseras de ~2 metros
                    </li>
                  </ul>
                </div>
                <div className="pt-6 border-t border-white/10 text-xs font-mono text-gray-400 uppercase flex gap-4 flex-wrap relative z-20">
                  <span className="bg-white/5 px-2 py-1 rounded">
                    Módulos: 4 a 8
                  </span>
                  <span className="bg-white/5 px-2 py-1 rounded">
                    Aplicaciones: Telecom, Petróleo & Gas, Bombeo...
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        )}

        {/* Generadores Eléctricos Autónomos */}
        {activeCategory === "generadores" && (
          <div id="generadores" className="mb-24 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-mono font-bold tracking-widest uppercase mb-4">
              <BatteryCharging size={14} /> Soluciones Integrales
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight mb-6">
              Generadores Eléctricos{" "}
              <span className="text-amber-500">Autónomos</span>
            </h2>
            <p className="text-gray-400 font-light max-w-4xl mx-auto text-lg leading-relaxed">
              Conformados por módulos fotovoltaicos, estructura soporte, banco
              de baterías, regulador de carga y, eventualmente, un inversor
              DC/AC. Diseñados para abastecer energía continua las 24 horas del
              día.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
              className="bg-[#0b0e14] border border-white/10 hover:border-emerald-500/50 transition-colors p-8 rounded-3xl relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-700" />
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 flex items-center gap-3">
                <Sun size={24} className="text-emerald-500" />
                Sistemas Híbridos & Bombeo
              </h3>
              <div className="space-y-4 text-gray-400 font-light text-sm">
                <p>
                  Cuando los consumos son altos, los generadores se combinan con
                  otras fuentes (diesel, eólicos, termogeneradores) formando un{" "}
                  <strong>Sistema Híbrido</strong> para asegurar el suministro.
                </p>
                <div className="h-px w-full bg-white/10 my-4" />
                <p>
                  En <strong>bombeo de agua</strong>, no se utilizan baterías.
                  La bomba se conecta directamente a los módulos y la cantidad
                  de agua es proporcional al nivel de insolación, actuando el
                  tanque de agua como acumulador.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
              className="bg-[#0b0e14] border border-white/10 hover:border-amber-500/50 transition-colors p-8 rounded-3xl relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-amber-500/10 transition-colors duration-700" />
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 flex items-center gap-3">
                <Settings size={24} className="text-amber-500" />
                Generadores Autorregulados
              </h3>
              <div className="space-y-4 text-gray-400 font-light text-sm">
                <p>
                  Ideales para pequeñas viviendas y casillas de uso diario.
                  Destacan por su sencillez y bajo costo, ofreciendo gran
                  confiabilidad.
                </p>
                <ul className="space-y-2 font-mono text-xs mt-4">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />{" "}
                    Modelos Especiales: <strong>KS40TA</strong> y{" "}
                    <strong>KS56TA</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />{" "}
                    Exclusivo de 32 celdas conectadas en serie
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />{" "}
                    Limita el voltaje operativo a 14.5 – 15V
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />{" "}
                    Autorregulan la carga naturalmente sin requerir regulador
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
        )}

        {/* Conectados a la Red */}
        {activeCategory === "conectados" && (
          <div id="conectados" className="mb-24 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0088cc]/30 bg-[#0088cc]/10 text-[#0088cc] text-xs font-mono font-bold tracking-widest uppercase mb-4">
              <Zap size={14} /> Soluciones On-Grid
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight mb-6">
              Conectados a la <span className="text-[#0088cc]">Red</span>
            </h2>
            <p className="text-gray-400 font-light max-w-4xl mx-auto text-lg leading-relaxed">
              Suministran energía eléctrica en corriente alterna trabajando en
              paralelo con la red de distribución. Ideal para viviendas,
              negocios, edificios comerciales e industriales que buscan
              eficiencia, ahorro y uso de energías limpias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#0b0e14] border border-white/10 hover:border-[#0088cc]/50 transition-all p-6 rounded-3xl relative group"
            >
              <div className="w-12 h-12 bg-[#0088cc]/10 rounded-2xl flex items-center justify-center mb-4 text-[#0088cc]">
                <Layers size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">
                Módulos Fotovoltaicos
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Utilizamos módulos{" "}
                <strong className="text-white">SOLARTEC KS150T</strong> para
                instalaciones de baja potencia, con altas características
                eléctricas y mecánicas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#0b0e14] border border-white/10 hover:border-[#0088cc]/50 transition-all p-6 rounded-3xl relative group"
            >
              <div className="w-12 h-12 bg-[#0088cc]/10 rounded-2xl flex items-center justify-center mb-4 text-[#0088cc]">
                <Shield size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">
                Estructura Soporte
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Adaptable a techos inclinados, terrazas o parques. Orientación
                optimizada al norte para evitar sombras a horas del mediodía.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#0b0e14] border border-white/10 hover:border-[#0088cc]/50 transition-all p-6 rounded-3xl relative group"
            >
              <div className="w-12 h-12 bg-[#0088cc]/10 rounded-2xl flex items-center justify-center mb-4 text-[#0088cc]">
                <Wind size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">
                Cableado e Interconexión
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Conexiones series-paralelo ejecutadas bajo las más estrictas
                normas de seguridad eléctrica para alcanzar voltaje óptimo.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#0b0e14] border border-white/10 hover:border-[#0088cc]/50 transition-all p-6 rounded-3xl relative group"
            >
              <div className="w-12 h-12 bg-[#0088cc]/10 rounded-2xl flex items-center justify-center mb-4 text-[#0088cc]">
                <BatteryCharging size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">
                Inversor de Corriente
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Equipos <strong className="text-white">Sunny Boy de SMA</strong>{" "}
                de alta eficiencia {`>95%`}. Monitorean la red y desconectan por
                seguridad en cortes.
              </p>
            </motion.div>
          </div>
        </div>
        )}

        {/* Sistemas de Bombeo Solar */}
        {activeCategory === "bombeo" && (
          <div id="bombeo" className="mb-24 relative z-10">
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-500 text-xs font-mono font-bold tracking-widest uppercase mb-4">
              <Droplets size={14} /> Bombeo de Agua
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight mb-6">
              Sistemas de Bombeo <span className="text-sky-500">Solar</span>
            </h2>
            <p className="text-gray-400 font-light max-w-4xl mx-auto text-lg leading-relaxed">
              La solución más eficiente para el bombeo de agua en zonas sin red eléctrica. Abastecen bombas trifásicas comunes estándar sumergibles o de superficie, siendo ideales para reemplazar grupos electrógenos o viejos molinos de chapa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
               className="bg-[#0b0e14] border border-white/10 hover:border-sky-500/50 transition-colors p-8 rounded-3xl relative overflow-hidden group shadow-2xl flex flex-col justify-between"
             >
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-sky-500/10 transition-colors duration-700" />
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 flex items-center gap-3">
                     <Settings size={24} className="text-sky-500" />
                     Sistemas SOLARTEC-AGUA SA-T
                  </h3>
                  <div className="space-y-4 text-gray-400 font-light text-sm">
                     <p>
                       <strong className="text-white">SA-T220:</strong> Convenientes para sistemas nuevos y bombas de hasta 3 Hp de potencia. En caso de requerir mayor caudal diario, pueden funcionar con un grupo electrógeno monofásico de 220 Vca de la potencia adecuada.
                     </p>
                     <div className="h-px w-full bg-white/10 my-4" />
                     <p>
                       <strong className="text-white">SA-T380:</strong> Sistemas diseñados para mayores exigencias. En caso de apoyo, requieren un grupo electrógeno trifásico de 3 x 380 Vca.
                     </p>
                  </div>
                </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
               className="bg-[#0b0e14] border border-white/10 hover:border-sky-500/50 transition-colors p-8 rounded-3xl relative overflow-hidden group shadow-2xl flex flex-col justify-between"
             >
                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-sky-500/10 transition-colors duration-700" />
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 flex items-center gap-3">
                     <CheckCircle2 size={24} className="text-sky-500" />
                     Ventajas Principales
                  </h3>
                  <ul className="space-y-3 font-mono text-xs text-gray-300">
                     <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-sky-500 rounded-full shrink-0"/> Abastecen bombas trifásicas estándar de cualquier marca.</li>
                     <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-sky-500 rounded-full shrink-0"/> Alta confiabilidad con módulos fotovoltaicos SOLARTEC y variadores SIEMENS.</li>
                     <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-sky-500 rounded-full shrink-0"/> Sistemas 100% autónomos, ecológicos y silenciosos.</li>
                     <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-sky-500 rounded-full shrink-0"/> Soluciones simples, transportables y de bajo mantenimiento.</li>
                   </ul>
                </div>
             </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0b0e14] border border-white/10 rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 to-transparent pointer-events-none" />
            
            <div className="text-center mb-10">
              <h4 className="text-2xl font-black text-white mb-3 tracking-tight">Para proyectar un sistema de bombeo de agua, necesitamos conocer:</h4>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">Reuní esta información básica para que nuestro equipo técnico pueda dimensionar la solución exacta para tu campo o industria.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {/* Step 1 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-sky-500/30 transition-colors group">
                <div className="w-16 h-16 mx-auto bg-sky-500/10 rounded-full flex items-center justify-center mb-4 text-sky-500 group-hover:scale-110 transition-transform">
                   <MapPin size={32} />
                </div>
                <h5 className="text-white font-bold mb-2">Lugar</h5>
                <p className="text-xs text-gray-400">Lugar geográfico de instalación.</p>
              </div>

              {/* Step 2 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-sky-500/30 transition-colors group">
                <div className="w-16 h-16 mx-auto bg-sky-500/10 rounded-full flex items-center justify-center mb-4 text-sky-500 group-hover:scale-110 transition-transform">
                   <Mountain size={32} />
                </div>
                <h5 className="text-white font-bold mb-2">Altitud</h5>
                <p className="text-xs text-gray-400">Altura total de elevación del agua (metros).</p>
              </div>

              {/* Step 3 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-sky-500/30 transition-colors group">
                <div className="w-16 h-16 mx-auto bg-sky-500/10 rounded-full flex items-center justify-center mb-4 text-sky-500 group-hover:scale-110 transition-transform">
                   <Ruler size={32} />
                </div>
                <h5 className="text-white font-bold mb-2">Distancia</h5>
                <p className="text-xs text-gray-400">Distancia lineal de traslado del agua (metros).</p>
              </div>

              {/* Step 4 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-sky-500/30 transition-colors group">
                <div className="w-16 h-16 mx-auto bg-sky-500/10 rounded-full flex items-center justify-center mb-4 text-sky-500 group-hover:scale-110 transition-transform">
                   <Droplet size={32} />
                </div>
                <h5 className="text-white font-bold mb-2">Caudal</h5>
                <p className="text-xs text-gray-400">Caudal requerido en Verano y/o Invierno (litros/día).</p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleContactWhatsApp}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-mono font-bold uppercase tracking-widest text-sm transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
              >
                Cotizar Bombeo Solar
              </button>
            </div>
          </motion.div>
        </div>
        )}

        {/* Alumbrados Autónomos */}
        {activeCategory === "alumbrado" && (
          <div id="alumbrado" className="mb-24 relative z-10">
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-xs font-mono font-bold tracking-widest uppercase mb-4">
              <Zap size={14} /> Iluminación Inteligente
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight mb-6">
              Alumbrados <span className="text-emerald-500">Autónomos</span>
            </h2>
            <p className="text-gray-400 font-light max-w-4xl mx-auto text-lg leading-relaxed">
              Los módulos fotovoltaicos convierten directamente la luz solar en energía eléctrica de corriente continua, almacenada en baterías de bajo mantenimiento. El dispositivo electrónico enciende y apaga automáticamente la luminaria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#0b0e14] border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full group-hover:bg-emerald-500/20 transition-colors" />
              <h3 className="text-xl font-bold text-white uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Funcionamiento
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
                Tensión nominal de operación 24 volts. Lámparas de LED de muy bajo consumo con vida superior a las 50.000 horas.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <h4 className="text-emerald-400 font-bold mb-1 font-mono text-sm uppercase">Continua</h4>
                  <p className="text-xs text-gray-400">Mayor consumo. Se enciende al anochecer y se apaga al amanecer.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <h4 className="text-emerald-400 font-bold mb-1 font-mono text-sm uppercase">Discontinua</h4>
                  <p className="text-xs text-gray-400">Menor consumo. Enciende un número determinado de horas al anochecer y antes del amanecer (ajustable).</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#0b0e14] border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full group-hover:bg-emerald-500/20 transition-colors" />
              <h3 className="text-xl font-bold text-white uppercase mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> ¿Dónde es aconsejable?
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {/* Sin acceso a red */}
                 <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:border-emerald-500/30 transition-colors group/item">
                    <div className="w-12 h-12 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center mb-3 text-emerald-500 group-hover/item:scale-110 transition-transform">
                       <ZapOff size={24} />
                    </div>
                    <h5 className="text-white font-bold mb-1 text-sm">Sin acceso a Red</h5>
                    <p className="text-[10px] text-gray-400 leading-tight">Donde no existe red de distribución y los mantenimientos son costosos.</p>
                 </div>

                 {/* Costos */}
                 <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:border-emerald-500/30 transition-colors group/item">
                    <div className="w-12 h-12 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center mb-3 text-emerald-500 group-hover/item:scale-110 transition-transform">
                       <CircleDollarSign size={24} />
                    </div>
                    <h5 className="text-white font-bold mb-1 text-sm">Costos</h5>
                    <p className="text-[10px] text-gray-400 leading-tight">Donde el zanjado y rotura de pavimentos no es deseable o es muy costoso.</p>
                 </div>

                 {/* Seguridad */}
                 <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:border-emerald-500/30 transition-colors group/item">
                    <div className="w-12 h-12 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center mb-3 text-emerald-500 group-hover/item:scale-110 transition-transform">
                       <ShieldCheck size={24} />
                    </div>
                    <h5 className="text-white font-bold mb-1 text-sm">Seguridad</h5>
                    <p className="text-[10px] text-gray-400 leading-tight">Donde el robo de cables de cobre es frecuente.</p>
                 </div>

                 {/* Ecológicos */}
                 <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:border-emerald-500/30 transition-colors group/item">
                    <div className="w-12 h-12 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center mb-3 text-emerald-500 group-hover/item:scale-110 transition-transform">
                       <Leaf size={24} />
                    </div>
                    <h5 className="text-white font-bold mb-1 text-sm">Ecológicos</h5>
                    <p className="text-[10px] text-gray-400 leading-tight">Para mostrar el empleo de energías renovables y no convencionales.</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
        )}

        {/* Electrificadores */}
        {activeCategory === "electrificadores" && (
          <div id="electrificadores" className="mb-24 relative z-10">
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-mono font-bold tracking-widest uppercase mb-4">
              <BatteryCharging size={14} /> Soluciones Rurales
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight mb-6">
              Generadores para <span className="text-amber-500">Electrificadores</span>
            </h2>
            <p className="text-gray-400 font-light max-w-4xl mx-auto text-lg leading-relaxed">
              Autonomía y eficiencia para sistemas de boyeros eléctricos en campos y zonas rurales. Evitan el traslado constante de las baterías para su recarga periódica, ahorrando tiempo y dinero.
            </p>
          </div>

          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-[#0b0e14] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-amber-500/50 transition-colors max-w-5xl mx-auto"
          >
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[100px] rounded-full group-hover:bg-amber-500/10 transition-colors duration-700 pointer-events-none" />
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
               <div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight mb-6 flex items-center gap-3">
                     <Settings size={24} className="text-amber-500" />
                     Instalación Simple y Robusta
                  </h3>
                  <div className="space-y-4 text-gray-400 font-light text-sm leading-relaxed">
                     <p>
                        Los generadores deben ser instalados a la intemperie <strong className="text-white">sin necesidad de ninguna protección adicional</strong>. La estructura soporte permite dar al generador solar la posición adecuada:
                     </p>
                     <ul className="space-y-2 mt-4 ml-2">
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" /> Orientación Norte.</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" /> Inclinación de acuerdo al lugar geográfico.</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" /> Libre de sombras entre las 9 y 17 hs.</li>
                     </ul>
                     <p className="mt-4">
                        Los módulos fotovoltaicos se fijan a la estructura soporte, la cual se coloca en el extremo superior de un caño galvanizado de 2 pulgadas (enterrado, amurado a una pared, techo o torre).
                     </p>
                     <p className="text-xs text-amber-500/80 font-mono mt-6 uppercase tracking-wider">
                        * El generador a instalar dependerá de la marca, modelo del electrificador y ubicación.
                     </p>
                  </div>
               </div>
               
               <div className="relative">
                 <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 relative">
                    {/* Fallback image if actual image is not provided, representing a solar panel on a post in a field */}
                    <img 
                      src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=1000&auto=format&fit=crop" 
                      alt="Generador Solar para Electrificador Rural" 
                      className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-transparent to-transparent" />
                 </div>
                 
                 {/* Floating badge */}
                 <div className="absolute -bottom-6 -left-6 bg-[#0b0e14] border border-amber-500/30 p-4 rounded-2xl shadow-xl flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                      <Sun size={24} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm uppercase">Carga Directa</p>
                      <p className="text-[10px] text-gray-400 font-mono">100% Autonomía</p>
                    </div>
                 </div>
               </div>
             </div>
          </motion.div>
        </div>
        )}

        {/* BATERÍAS */}
        {activeCategory === "baterias" && (
          <>
            <div id="baterias" className="mb-24 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-500 text-xs font-mono font-bold tracking-widest uppercase mb-4">
                  <Battery size={14} /> Almacenamiento Avanzado
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight mb-6">
                  Baterías
                </h2>
                <div className="text-gray-400 font-light max-w-5xl mx-auto text-base md:text-lg leading-relaxed space-y-6 text-left">
                  <p>
                    Todo sistema de generación autónomo requiere de baterías para la acumulación de la energía generada durante las horas de insolación. El tamaño de estas baterías puede ser desde un simple acumulador monoblock de 12 Volts nominales, hasta un banco de baterías de gran capacidad en 48 Volts nominales.
                  </p>
                  <p>
                    La capacidad de almacenaje de energía del banco de baterías se calcula teniendo en cuenta, entre otros, los siguientes factores: voltaje y demanda de energía de la carga a alimentar (expresado en Ampere-hora / día), lugar geográfico de la instalación (radiación solar y temperatura ambiente), autonomía pretendida para el sistema (expresada en la cantidad de días consecutivos de muy baja radiación solar – días nublados – en los cuales el sistema es capaz de alimentar la carga). Esta capacidad de almacenaje se calcula para un régimen de descarga de la batería de 100 horas, que es la habitual en los sistemas solares y para una profundidad de descarga de aproximadamente el 70% de esa capacidad total. Existen en el mercado una gran variedad de tipos de baterías y la gerencia de ingeniería de SOLARTEC selecciona para cada proyecto particular el tipo más adecuado.
                  </p>
                  <p>
                    Las baterías que se utilizan son las denominadas del tipo solar, es decir baterías de una baja auto descarga, por lo general con electrodos de plomo-antimonio, con bajo contenido de antimonio, o de plomo-calcio. Las placas pueden ser planas, en los casos de baterías mono block de 12 Volts de baja capacidad unitaria o tubulares para capacidades mayores. En el caso de las tubulares la batería está integrada por vasos individuales de de 2 Volts cada uno. Según el voltaje de la carga a alimentar y la capacidad deseada, tanto los monoblocks como los vasos tubulares se conectan en serie- paralelo.
                  </p>
                  <p>
                    Para asegurar una carga homogénea de los bancos y una mayor vida útil no se aconseja instalar más de 4 líneas en paralelo. Las baterías pueden ser abiertas, cerradas (con válvulas de regeneración) o selladas. El electrolito puede ser líquido o estar absorbido o gelificado. Los bancos de baterías se disponen sobre estanterías (racks) y se alojan en contenedores especiales, en locales o en gabinetes que deben tener una adecuada ventilación.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10 mt-12">
                {[
                  {
                    title: "Monobloc Inundado (6V / 12V)",
                    desc: "Diseñadas para ofrecer una corriente confiable y de bajo mantenimiento para aplicaciones de energía renovable en aquellos sitios donde se requieren frecuentes ciclos profundos.",
                    icon: <BatteryCharging size={20} />,
                    image: imgMonoblocInundada,
                    colorClass: "sky-500",
                    bgHoverClass: "hover:border-sky-500/40 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]",
                    blurClass: "bg-sky-500/10 group-hover:bg-sky-500/20",
                    iconBgClass: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
                    bulletClass: "text-sky-400",
                    features: ["Caja de Polipropileno de alto impacto", "Separadores de polietileno microporoso", "Baja autodescarga (4% mes)"]
                  },
                  {
                    title: "Gel Monobloc (6V / 12V)",
                    desc: "Baterías Solares de Gel Monobloc con Válvula Reguladora (VRLA). Ofrecen una corriente confiable, versátil y libre de mantenimiento. A prueba de derrames.",
                    icon: <Battery size={20} />,
                    image: imgMonoblocGel,
                    colorClass: "amber-500",
                    bgHoverClass: "hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
                    blurClass: "bg-amber-500/10 group-hover:bg-amber-500/20",
                    iconBgClass: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
                    bulletClass: "text-amber-400",
                    features: ["Electrolito gelificado sin estratificación", "Placas formadas con tecnología IPF™", "Menos de 2% pérdida al mes"]
                  },
                  {
                    title: "Sistema Inundado (2V)",
                    desc: "Los sistemas de voltajes más altos tienen mayores requisitos de corriente. Diseñadas para ofrecer una corriente confiable y de bajo mantenimiento con vaso Maintenance Saver™.",
                    icon: <Layers size={20} />,
                    image: imgSistemaInundada2v,
                    colorClass: "emerald-500",
                    bgHoverClass: "hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
                    blurClass: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
                    iconBgClass: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                    bulletClass: "text-emerald-400",
                    features: ["Celdas individuales o sistema de alta resistencia", "Aleación de Plomo-antimonio robusta", "Recipiente grande para mayor volumen de electrolito"]
                  },
                  {
                    title: "Sistema de Gel (2V)",
                    desc: "La batería solar de electrolito Deka Dominator® con válvula reguladora (VRLA) está diseñada para ofrecer una corriente confiable, segura y libre de mantenimiento.",
                    icon: <ShieldCheck size={20} />,
                    image: imgSistemaGel2v,
                    colorClass: "rose-500",
                    bgHoverClass: "hover:border-rose-500/40 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]",
                    blurClass: "bg-rose-500/10 group-hover:bg-rose-500/20",
                    iconBgClass: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
                    bulletClass: "text-rose-400",
                    features: ["A prueba de derrames y libre de mantenimiento", "Placas IPF™ formadas individualmente", "Ideal para ciclos severos de descarga profunda"]
                  },
                  {
                    title: "Módulos AGM (2V)",
                    desc: "Línea Deka Unigy® II disponible en diseños de una sola celda o sistema modular. Diseñados para una larga vida útil y máxima conductividad en rack sísmico.",
                    icon: <Zap size={20} />,
                    image: imgModulosAgm2v,
                    colorClass: "blue-500",
                    bgHoverClass: "hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
                    blurClass: "bg-blue-500/10 group-hover:bg-blue-500/20",
                    iconBgClass: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
                    bulletClass: "text-blue-400",
                    features: ["Diseño de apilamiento horizontal ultra-compacto", "Bornes y terminales de cobre sólido enchapados", "Catalizador Microcat™ que disminuye desecación"]
                  }
                ].map((model, idx) => (
                  <motion.div
                    key={idx}
                    onClick={() => setIsBatteryModalOpen(true)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`bg-[#0b0e14]/65 backdrop-blur-md border border-white/5 ${model.bgHoverClass} rounded-2xl p-6 relative overflow-hidden group transition-all duration-300 cursor-pointer flex flex-col justify-between`}
                  >
                    <div>
                      {/* Card Glow and Top bar */}
                      <div className={`absolute top-0 right-0 w-36 h-36 ${model.blurClass} blur-[45px] rounded-full transition-all duration-500`} />
                      
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className={`w-10 h-10 rounded-xl ${model.iconBgClass} flex items-center justify-center`}>
                          {model.icon}
                        </div>
                        <span className="text-[9px] font-mono font-bold tracking-widest text-gray-500 bg-white/[0.03] border border-white/5 px-2 py-0.5 rounded uppercase">
                          Deka Solar
                        </span>
                      </div>

                      {/* Real Image Canvas Visualizer inside the Card */}
                      <div className="w-full h-44 rounded-xl bg-slate-950/80 border border-slate-900/60 p-2 my-4 relative flex items-center justify-center overflow-hidden group-hover:border-white/10 transition-colors">
                        {/* Atmospheric grid inside */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                        
                        {/* Ambient Aura behind image */}
                        <div className={`absolute w-24 h-24 ${model.blurClass} blur-xl rounded-full transition-opacity opacity-50 group-hover:opacity-85`} />
                        
                        <img 
                          src={model.image} 
                          alt={model.title} 
                          className="h-full w-auto object-contain relative z-10 max-h-[140px] transform group-hover:scale-105 transition-transform duration-500 filter brightness-105 contrast-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <h3 className="text-lg font-display font-bold text-white mb-2 tracking-tight group-hover:text-amber-400 transition-colors relative z-10">{model.title}</h3>
                      <p className="text-xs text-gray-400 font-light mb-4 leading-relaxed relative z-10 h-16 overflow-hidden">
                        {model.desc}
                      </p>
                    </div>

                    <div className="border-t border-white/5 pt-4 mt-2 relative z-10">
                      <ul className="space-y-1.5 mb-4">
                        {model.features.slice(0, 2).map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-[11px] font-mono text-gray-500">
                            <span className={`${model.bulletClass} mt-0.5`}>•</span>
                            <span className="truncate">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-500 group-hover:translate-x-1 transition-transform">
                        <span>EXPLORAR CATÁLOGO</span>
                        <ArrowUpDown size={12} className="rotate-90" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

        {/* Ultimate Call to Action Button */}
        <div className="flex justify-center mt-12 relative z-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glowing orb behind button */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-[#FF5665] blur-2xl opacity-50 animate-pulse rounded-full" />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactWhatsApp}
              className="group relative px-10 py-6 rounded-full bg-gradient-to-r from-amber-500 to-[#FF5665] text-black font-display font-black text-lg md:text-xl uppercase tracking-widest flex items-center gap-4 overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:shadow-[0_0_80px_rgba(255,86,101,0.8)] border-b-4 border-black/30 hover:border-b-2 active:border-b-0 transition-all cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
              <Zap
                className="relative z-10 fill-black animate-pulse"
                size={28}
              />
              <span className="relative z-10 drop-shadow-md">
                SOLICITAR COTIZACIÓN DE PROYECTO
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </motion.button>
          </motion.div>
        </div>
          </>
        )}
        
        {/* Controladores de Carga */}
        {activeCategory === "controladores" && (
          <div id="controladores" className="mb-24 relative z-10">
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-mono font-bold tracking-widest uppercase mb-4">
              <Zap size={14} /> Gestión de Energía
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight mb-6">
              Controladores de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-[#FF5665] filter drop-shadow-[0_0_15px_rgba(255,86,101,0.4)]">Carga</span>
            </h2>
            <p className="text-gray-400 font-light max-w-3xl mx-auto text-lg leading-relaxed mb-10">
              Reguladores MPPT y PWM de alta eficiencia para maximizar la recolección de energía solar y proteger los bancos de baterías.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                model: "MPPT 40A / 60A",
                desc: "Seguimiento del punto de máxima potencia. Hasta 30% más eficiencia. Ideal para sistemas de 12V/24V/48V con alta tensión de entrada.",
                features: ["Eficiencia 99.5%", "Pantalla LCD", "Monitoreo Bluetooth"],
                color: "amber"
              },
              {
                model: "PWM 20A / 30A",
                desc: "Solución económica y confiable para sistemas aislados pequeños y medianos. Protección contra sobrecargas y cortocircuitos.",
                features: ["Carga en 3 etapas", "Detección auto 12/24V", "Doble USB"],
                color: "sky"
              },
              {
                model: "Híbrido Integrado",
                desc: "Controlador + Inversor en un solo equipo. Gestión inteligente de energía solar, red eléctrica y banco de baterías.",
                features: ["Onda senoidal pura", "Priorización solar", "Bypass automático"],
                color: "emerald"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-[#0b0e14]/90 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors shadow-2xl flex flex-col h-full"
              >
                <div className="h-48 relative overflow-hidden flex items-center justify-center p-6">
                   <div className={`absolute inset-0 bg-${item.color}-500/10`} />
                   <Zap size={64} className={`text-${item.color}-500 relative z-10 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]`} />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-3 font-display">{item.model}</h3>
                  <p className="text-sm text-gray-400 mb-6 flex-grow">{item.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {item.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-300 font-mono">
                        <CheckCircle2 size={12} className={`text-${item.color}-500`} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button onClick={handleContactWhatsApp} className={`w-full py-2.5 rounded-lg bg-${item.color}-500/10 hover:bg-${item.color}-500/20 border border-${item.color}-500/30 text-${item.color}-400 font-mono text-xs uppercase tracking-wider font-bold transition-all`}>
                    Cotizar Modelo
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        )}

        {/* Tableros Eléctricos */}
        {activeCategory === "tableros" && (
          <div id="tableros" className="mb-24 relative z-10">
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-500 text-xs font-mono font-bold tracking-widest uppercase mb-4">
              <Layers size={14} /> Integración Segura
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight mb-6">
              Tableros <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-[#0088cc] filter drop-shadow-[0_0_15px_rgba(0,136,204,0.4)]">Eléctricos</span>
            </h2>
            <p className="text-gray-400 font-light max-w-3xl mx-auto text-lg leading-relaxed mb-10">
              Tableros de protección CC y CA armados a medida bajo normas de seguridad. Seccionadores, termomagnéticas y descargadores de sobretensión.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#0b0e14]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-amber-500/50 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">Tableros de Corriente Continua (CC)</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Protección esencial entre los paneles solares y el inversor. Incluye llaves de corte bajo carga, fusibles NH específicos para solar y protectores atmosféricos (DPS).
              </p>
              <ul className="grid grid-cols-2 gap-3 text-xs text-gray-300 font-mono">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Tensión hasta 1000V DC</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Seccionadores Rotativos</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Gabinetes IP65</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Fusibles Cilíndricos</li>
              </ul>
            </div>
            <div className="bg-[#0b0e14]/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-sky-500/50 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-500">
                  <Zap size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">Tableros de Corriente Alterna (CA)</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Protección a la salida del inversor hacia las cargas y conexión a red. Equipados con termomagnéticas, disyuntores diferenciales y selectoras de transferencia.
              </p>
              <ul className="grid grid-cols-2 gap-3 text-xs text-gray-300 font-mono">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-500" /> Transferencia Manual/Auto</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-500" /> Protector de Alta/Baja</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-500" /> Relé de Asimetría</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-500" /> Analizador de Redes</li>
              </ul>
            </div>
          </div>
        </div>
        )}

        </div>
      </div>

      {/* Floating Toggle Tab for Sliding Sidebar */}
      <div className="fixed right-0 top-1/3 z-40 flex flex-col items-end pointer-events-none">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="pointer-events-auto bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-[#06080c] font-mono text-[11px] font-black tracking-[0.2em] uppercase py-6 px-4 rounded-l-2xl shadow-[0_0_40px_rgba(245,158,11,0.35)] flex items-center gap-2.5 transition-all cursor-pointer select-none group border border-amber-400/20 active:scale-95"
          style={{ writingMode: 'vertical-rl' }}
        >
          <Sun size={15} className="animate-spin-slow rotate-90 text-[#06080c] group-hover:scale-110 transition-transform" />
          <span>CATEGORÍAS DE ENERGÍA</span>
        </button>
      </div>

      {/* Backdrop overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sliding Sidebar Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isSidebarOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 180 }}
        className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#06080c]/95 border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.9)] z-[60] backdrop-blur-2xl flex flex-col"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="text-amber-500 animate-spin-slow" size={20} />
            <span className="font-display font-black text-xs tracking-widest uppercase text-white">CATÁLOGO SOLAR</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-grow overflow-y-auto p-6 space-y-3 custom-scrollbar">
          {solarCategories.map((cat, i) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={i}
                onClick={() => {
                  setIsSidebarOpen(false);
                  setActiveCategory(cat.id);
                  setTimeout(() => {
                    const el = document.getElementById(cat.id);
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 150;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }, 100);
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                  isActive
                    ? 'border-amber-500/40 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                    : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.08] hover:border-amber-500/20'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    isActive ? 'bg-amber-500/20' : 'bg-white/5 group-hover:bg-amber-500/10'
                  }`}>
                    <span className={`${cat.color} group-hover:scale-110 transition-transform`}>{cat.icon}</span>
                  </div>
                  <div>
                    <p className={`font-bold text-xs uppercase tracking-wider ${isActive ? 'text-white font-black' : 'text-gray-300'}`}>{cat.name}</p>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">{cat.desc}</p>
                  </div>
                </div>
                <ChevronRight size={14} className={`group-hover:translate-x-1 transition-all ${isActive ? 'text-amber-500' : 'text-gray-500 group-hover:text-amber-500'}`} />
              </button>
            );
          })}
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-white/5 bg-black/40">
          <div 
            className="bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-2xl p-5 text-center group cursor-pointer hover:border-amber-500/40 transition-colors relative overflow-hidden" 
            onClick={() => {
              setIsSidebarOpen(false);
              handleContactWhatsApp();
            }}
          >
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <CircleDollarSign size={64} className="text-amber-500" />
            </div>
            <Zap size={24} className="text-amber-500 mx-auto mb-3 animate-pulse relative z-10" />
            <p className="text-[#06080c] font-black text-xs uppercase tracking-widest mb-1 relative z-10">Cotización Mayorista</p>
            <p className="text-gray-800 font-mono text-[9px] leading-relaxed relative z-10">Atención a empresas, licitaciones y dimensionamiento de ingeniería.</p>
          </div>
        </div>
      </motion.div>
    </section>
    <BatteryModal isOpen={isBatteryModalOpen} onClose={() => setIsBatteryModalOpen(false)} />
    </>
  );
}
