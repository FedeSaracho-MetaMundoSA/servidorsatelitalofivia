import { useState } from "react";
import { motion } from "motion/react";
import { panelData } from "../data/panelData";
import {
  Sun,
  Shield,
  Zap,
  Wind,
  Settings,
  Check,
  Copy,
  Search,
  Cpu,
  X
} from "lucide-react";

import panelSolarSol72pe from "../assets/images/panel_solar_sol_72pe.png";
import panelSolarSol6p72 from "../assets/images/sol_6p_72_panel_solar.png";
import curvaIvTemperatura from "../assets/images/curva_iv_temperatura.png";
import curvaIvPvIrradiacion from "../assets/images/curva_iv_pv_irradiacion.png";
import graficoAnalisisSol6p72Termico from "../assets/images/grafico_analisis_sol_6p_72_termico.png";
import graficoAnalisisSol6p72Temperatura from "../assets/images/grafico_analisis_sol_6p_72_temperatura.png";

export default function SolarCatalogConsole() {
  // Advanced Interactive Web4 Configurator States
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

  // Enriched panel data mapping (22+ modules)
  const enrichedPanelData = panelData.map((item) => {
    const isSolartec = item.model.startsWith("SOLARTEC") || item.model.startsWith("SOL-72PE") || item.model.startsWith("SOL-6P");
    const brand = isSolartec ? "SOLARTEC" : "LÍNEA SOL";
    const modelName = (isSolartec && item.model.startsWith("SOLARTEC ")) ? item.model.replace("SOLARTEC ", "") : item.model;
    
    // Determine cell type based on industry models
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

  // Filter logic
  const filteredPanels = enrichedPanelData.filter((item) => {
    const matchesSearch = searchQuery
      ? (item.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
         item.pp.toString().includes(searchQuery))
      : true;

    const matchesCellType = cellTypeFilter === "TODOS" || item.cellType === cellTypeFilter;

    let matchesPower = true;
    if (powerRangeFilter === "ALTA") {
      matchesPower = item.pp >= 300;
    } else if (powerRangeFilter === "MEDIA") {
      matchesPower = item.pp >= 100 && item.pp < 300;
    } else if (powerRangeFilter === "BAJA") {
      matchesPower = item.pp < 100;
    }

    return matchesSearch && matchesCellType && matchesPower;
  });

  // Keep them sorted by power descending by default
  const sortedPanels = [...filteredPanels].sort((a, b) => b.pp - a.pp);

  const activeRowIndex = Math.min(selectedRow, Math.max(0, sortedPanels.length - 1));
  const selectedPanel = sortedPanels[activeRowIndex] || null;

  const handleCopyClipboard = () => {
    if (!selectedPanel) return;
    const formattedText = `PANEL SELECCIONADO: ${selectedPanel.brand} ${selectedPanel.modelName}\n` +
      `Tipo: ${selectedPanel.cellType}\n` +
      `Potencia Pico: ${selectedPanel.pp} W\n` +
      `Imp: ${selectedPanel.imp} A\n` +
      `Vmp: ${selectedPanel.vmp} V\n` +
      `Isc: ${selectedPanel.isc} A\n` +
      `Voc: ${selectedPanel.voc} V\n` +
      `Dimensiones: ${selectedPanel.dim} mm\n` +
      `Peso: ${selectedPanel.weight} kg`;
    
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuoteModel = (modelName: string) => {
    const text = encodeURIComponent(
      `Hola Servidor Satelital, estoy revisando su planilla de ingeniería y me gustaría cotizar específicamente el panel solar modelo: ${modelName}. ¿Tienen stock inmediato?`
    );
    window.open(`https://wa.me/5493875843438?text=${text}`, "_blank");
  };

  const handleQuoteSystem = (modelName: string, qty: number, conn: string) => {
    if (!selectedPanel) return;
    const totalPower = selectedPanel.pp * qty;
    const cellTypeDesc = selectedPanel.cellType === "MONOCRISTALINO" ? "Monocristalino PERC" : "Policristalino";
    const text = encodeURIComponent(
      `Hola Servidor Satelital, acabo de diseñar un arreglo solar en su Cotizador Inteligente Web4:\n\n` +
      `☀️ MÓDULO SELECCIONADO: ${modelName} (${cellTypeDesc})\n` +
      `🔢 CANTIDAD DE PANELES: ${qty} unidades\n` +
      `⚙️ CONFIGURACIÓN DE CONEXIÓN: En ${conn.toUpperCase()}\n` +
      `⚡ POTENCIA PICO INSTALADA: ${totalPower} Wp (${(totalPower / 1000).toFixed(2)} kWp)\n` +
      `📐 SUPERFICIE EN TECHADO: ${(parseFloat(selectedPanel.dim.split("x")[0]) * parseFloat(selectedPanel.dim.split("x")[1]) * qty / 1000000).toFixed(2)} m²\n` +
      `⚖️ PESO TOTAL DEL ARREGLO: ${(selectedPanel.weight * qty).toFixed(1)} kg\n` +
      `📊 ESTIMACIÓN DE GENERACIÓN: ${(totalPower * 5).toFixed(0)} Wh/día (Calculado a 5 HSP en Salta)\n\n` +
      `¿Me podrían enviar la cotización de este kit junto con la estructura de montaje de aluminio GST correspondiente? ¡Muchas gracias!`
    );
    window.open(`https://wa.me/5493875843438?text=${text}`, "_blank");
  };

  return (
    <div className="relative z-10 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Premium List of 22+ Panels & Futuristic Filters */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.01] to-transparent pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              {/* Header / Configurator Tag */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="text-left">
                  <span className="text-[10px] text-amber-500 font-mono uppercase tracking-widest font-black block">CONFIGURADOR WEB4</span>
                  <h4 className="text-white text-lg font-bold uppercase tracking-tight">Catálogo de Paneles</h4>
                </div>
                <span className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono py-1 px-2.5 rounded-full font-bold">
                  {filteredPanels.length} Modelos
                </span>
              </div>

              {/* Interactive Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar modelo o potencia (ej: 350, SOL-72)..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedRow(0); // Reset selection
                  }}
                  className="w-full bg-slate-950/80 border border-slate-800/80 focus:border-amber-500/50 rounded-xl px-4 py-3 pl-10 text-xs font-mono text-white placeholder-slate-500 outline-none transition-all duration-300"
                />
                <Search className="absolute left-3.5 top-3.5 text-slate-500" size={14} />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedRow(0);
                    }}
                    className="absolute right-3 top-3 text-slate-400 hover:text-white"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Filter Group 1: Cell Type (Monocristalino vs Policristalino) */}
              <div className="space-y-2 text-left">
                <label className="text-[9px] text-slate-400 font-mono uppercase tracking-widest font-bold">Tipo de Celda:</label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                  {(["TODOS", "MONOCRISTALINO", "POLICRISTALINO"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setCellTypeFilter(type);
                        setSelectedRow(0);
                      }}
                      className={`py-2 px-1 text-[9px] font-mono font-bold rounded-lg transition-all duration-300 cursor-pointer ${
                        cellTypeFilter === type
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                          : "text-slate-400 hover:text-white bg-transparent"
                      }`}
                    >
                      {type === "TODOS" ? "TODOS" : type === "MONOCRISTALINO" ? "MONO PERC" : "POLI"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Group 2: Power Range (Alta vs Media vs Baja) */}
              <div className="space-y-2 text-left">
                <label className="text-[9px] text-slate-400 font-mono uppercase tracking-widest font-bold">Rango de Potencia:</label>
                <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                  {(["TODOS", "ALTA", "MEDIA", "BAJA"] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        setPowerRangeFilter(range);
                        setSelectedRow(0);
                      }}
                      className={`py-2 px-1 text-[8.5px] font-mono font-bold rounded-lg transition-all duration-300 cursor-pointer ${
                        powerRangeFilter === range
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                          : "text-slate-400 hover:text-white bg-transparent"
                      }`}
                    >
                      {range === "TODOS" ? "TODOS" : range === "ALTA" ? "≥300W" : range === "MEDIA" ? "100W-299W" : "<100W"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable List of Panels */}
              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-track-slate-950 scrollbar-thumb-slate-800 rounded-xl">
                {sortedPanels.length > 0 ? (
                  sortedPanels.map((panel, idx) => {
                    const isSelected = idx === activeRowIndex;
                    const isMono = panel.cellType === "MONOCRISTALINO";
                    return (
                      <motion.div
                        key={panel.model}
                        onClick={() => setSelectedRow(idx)}
                        whileHover={{ x: 2 }}
                        className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer text-left relative group ${
                          isSelected
                            ? "bg-gradient-to-r from-amber-500/10 to-[#FF5665]/10 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.12)]"
                            : "bg-slate-950/40 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700/60"
                        }`}
                      >
                        {/* Silicon cell micro representation overlay background */}
                        <div className="absolute right-3 bottom-2 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-300 pointer-events-none">
                          <svg width="40" height="40" viewBox="0 0 40 40" stroke="currentColor" strokeWidth="1" fill="none" className={isMono ? "text-amber-500" : "text-sky-400"}>
                            <rect x="2" y="2" width="36" height="36" rx="2" />
                            <line x1="14" y1="2" x2="14" y2="38" />
                            <line x1="26" y1="2" x2="26" y2="38" />
                            <line x1="2" y1="14" x2="38" y2="14" />
                            <line x1="2" y1="26" x2="38" y2="26" />
                          </svg>
                        </div>

                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${isMono ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" : "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"}`} />
                              <h5 className="text-xs font-mono font-bold text-white uppercase tracking-tight">
                                {panel.brand} {panel.modelName}
                              </h5>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                                isMono 
                                  ? "bg-amber-500/5 border-amber-500/20 text-amber-400" 
                                  : "bg-sky-500/5 border-sky-500/20 text-sky-400"
                              }`}>
                                {panel.cellType === "MONOCRISTALINO" ? "Monocristalino PERC" : "Policristalino"}
                              </span>
                              <span className="text-[9px] font-mono text-slate-500">
                                {panel.weight} kg
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-sm font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200">
                              {panel.pp}W
                            </span>
                            <div className="text-[8px] font-mono text-slate-500">
                              {panel.vmp}V / {panel.imp}A
                            </div>
                          </div>
                        </div>

                        {/* Micro progress line inside selected card */}
                        {isSelected && (
                          <div className="absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-amber-500 to-[#FF5665] w-full" />
                        )}
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-10 text-slate-500 font-mono text-xs">
                    No se encontraron paneles con los filtros seleccionados.
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Futuristic Telemetry Console, Technical Ficha, Curves, Plans & live system calculations */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF5665]/30 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FF5665]/[0.01] to-transparent pointer-events-none" />
            
            {selectedPanel ? (
              <div className="space-y-6 relative z-10">
                
                {/* Upper spec header & tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div className="text-left">
                    <span className="text-[9px] text-amber-500 uppercase font-mono tracking-widest font-black block">CONSULTA DE INGENIERÍA TELEMÉTRICA</span>
                    <h4 className="text-white text-xl font-display font-black uppercase tracking-tight mt-0.5">
                      {selectedPanel.brand} {selectedPanel.modelName}
                    </h4>
                  </div>
                  
                  {/* Nav Tabs */}
                  <div className="flex gap-1 p-0.5 bg-slate-950/80 border border-slate-800/80 rounded-xl overflow-x-auto scrollbar-none shrink-0">
                    {(["telemetria", "ficha", "curvas", "planos"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setConsoleTab(tab)}
                        className={`py-1.5 px-3 rounded-lg text-[9px] font-mono font-bold uppercase transition-all duration-300 cursor-pointer ${
                          consoleTab === tab
                            ? "bg-gradient-to-r from-amber-500/20 to-[#FF5665]/20 text-white border border-amber-500/30"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {tab === "telemetria" ? "Live Telemetría" : tab === "ficha" ? "Ficha Técnica" : tab === "curvas" ? "Curvas I-V" : "Planos CAD"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TAB CONTENT */}
                <div className="min-h-[480px]">
                  {consoleTab === "telemetria" && (
                    <div className="space-y-6">
                      {/* Live parameters schematic panel */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* SVG Blueprint schematic representation */}
                        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between items-center relative overflow-hidden h-[240px]">
                          {/* Inject self-contained shimmer keyframe animation */}
                          <style>{`
                            @keyframes shimmerEffect {
                              0% { transform: translateX(-100%); }
                              100% { transform: translateX(100%); }
                            }
                            .animate-shimmer-fast {
                              animation: shimmerEffect 2.5s infinite ease-in-out;
                            }
                          `}</style>
                          
                          {/* Header label */}
                          <div className="w-full flex justify-between items-center relative z-20 pb-2 border-b border-slate-900/50">
                            <span className="text-[8px] font-mono text-amber-500 uppercase tracking-widest font-bold">
                              FOLLETO TÉCNICO OFICIAL REGISTRADO
                            </span>
                            <span className="text-[8px] font-mono text-slate-500 uppercase">
                              PREVISUALIZACIÓN REAL
                            </span>
                          </div>

                          {/* HIGH-FIDELITY FLYER CARD: Exact digital twin of the user-provided catalog image or dynamic CSS visual */}
                          <div className="w-full flex-1 mt-2.5 relative rounded-xl overflow-hidden bg-slate-950/40 border border-slate-800/80 flex items-center justify-center p-3">
                            
                            {/* Background glossy glow */}
                            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400/10 blur-[50px] rounded-full pointer-events-none" />
                            
                            {selectedPanel.model.startsWith("SOL-72PE") ? (
                              /* Render the exact real panel flyer image uploaded by the user */
                              <img
                                src={panelSolarSol72pe}
                                alt="Módulo Fotovoltaico Monocristalino SOL-72PE"
                                className="w-full h-full object-contain rounded-lg transition-transform duration-300 hover:scale-[1.03] z-10"
                                referrerPolicy="no-referrer"
                              />
                            ) : selectedPanel.model.startsWith("SOL-6P") ? (
                              /* Render the exact real panel image uploaded by the user for SOL-6P series */
                              <img
                                src={panelSolarSol6p72}
                                alt="Módulo Fotovoltaico Policristalino SOL-6P"
                                className="w-full h-full object-contain rounded-lg transition-transform duration-300 hover:scale-[1.03] z-10"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              /* Render high-fidelity dynamic CSS digital twin for other panels */
                              <div className="w-full h-full flex flex-col justify-between items-center relative z-10 p-2">
                                {/* Micro title / series */}
                                <div className="w-full flex justify-between items-center text-[8px] font-mono text-slate-500 tracking-wider">
                                  <span>SERIE: {selectedPanel.model.includes("-60") ? "60 CELDAS" : "72 CELDAS"}</span>
                                  <span>{selectedPanel.brand} PHOTOVOLTAIC</span>
                                </div>

                                {/* Center visual: Dynamic CSS digital twin panel representation */}
                                <div className="w-full flex-1 flex justify-between items-center my-2 gap-4">
                                  {/* Left side: specs overlay */}
                                  <div className="text-left flex flex-col justify-center space-y-1">
                                    <span className="text-[10px] font-sans font-bold text-slate-300 uppercase leading-none">
                                      MÓDULO SOLAR
                                    </span>
                                    <span className="text-xs font-black text-amber-500 tracking-tight leading-none uppercase">
                                      {selectedPanel.cellType}
                                    </span>
                                    <div className="text-3xl font-black text-white tracking-tighter leading-none py-0.5">
                                      {selectedPanel.pp}W
                                    </div>
                                    <span className="text-[8.5px] font-mono font-bold text-slate-400 bg-slate-900/60 px-1 py-0.5 rounded border border-slate-800 w-fit">
                                      {selectedPanel.model}
                                    </span>
                                  </div>

                                  {/* Right side: Realistic 3D perspective rotated solar panel */}
                                  <div className="flex-1 h-full flex items-center justify-center relative" style={{ perspective: '800px' }}>
                                    <div 
                                      className="w-[85px] h-[135px] bg-[#02050a] border-[1.5px] border-slate-600 rounded shadow-[5px_10px_20px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col p-[2.5px] transition-all duration-300 hover:scale-105"
                                      style={{
                                        transform: 'rotateY(-24deg) rotateX(12deg) rotateZ(-2deg)',
                                        transformStyle: 'preserve-3d'
                                      }}
                                    >
                                      {/* Shimmer / light sweep overlay */}
                                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full rotate-45 animate-shimmer-fast pointer-events-none" />
                                      
                                      {/* Inner cell grid */}
                                      <div className="w-full h-full border border-slate-800 rounded-[1px] grid grid-cols-6 gap-[1px] bg-slate-950 p-[1px]">
                                        {Array.from({ length: selectedPanel.model.includes("-60") ? 60 : 72 }).map((_, cIdx) => (
                                          <div 
                                            key={cIdx} 
                                            className="border-[0.2px] border-[#1e3a8a]/20 rounded-[0.5px] relative overflow-hidden"
                                            style={{
                                              backgroundColor: selectedPanel.cellType === "MONOCRISTALINO" ? "#0a0f1d" : "#0d2047"
                                            }}
                                          >
                                            {/* Silver busbars/conductive lines */}
                                            <div className="absolute top-0 bottom-0 left-[25%] w-[0.2px] bg-slate-400/30" />
                                            <div className="absolute top-0 bottom-0 left-[50%] w-[0.2px] bg-slate-400/30" />
                                            <div className="absolute top-0 bottom-0 left-[75%] w-[0.2px] bg-slate-400/30" />
                                            <div className="absolute left-0 right-0 top-[35%] h-[0.2px] bg-slate-400/15" />
                                            <div className="absolute left-0 right-0 top-[70%] h-[0.2px] bg-slate-400/15" />
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Micro details footer */}
                                <div className="w-full flex justify-between text-[8px] font-mono text-slate-500 pt-1 border-t border-slate-900/30">
                                  <span>DIM: {selectedPanel.dim} mm</span>
                                  <span>PESO: {selectedPanel.weight} kg</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Micro specifications list */}
                        <div className="space-y-3 flex flex-col justify-between">
                          <div className="grid grid-cols-2 gap-2.5">
                            <div className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl text-left font-mono">
                              <span className="text-[8px] text-slate-500 uppercase tracking-widest">Pmax (Nominal)</span>
                              <div className="text-xl font-black text-white mt-1">{selectedPanel.pp} W</div>
                            </div>
                            <div className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl text-left font-mono">
                              <span className="text-[8px] text-slate-500 uppercase tracking-widest">Eficiencia Est.</span>
                              <div className="text-xl font-black text-emerald-400 mt-1">
                                {selectedPanel.efficiency || (selectedPanel.cellType === "MONOCRISTALINO" ? "18.6%" : "14.2%")}
                              </div>
                            </div>
                            <div className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl text-left font-mono">
                              <span className="text-[8px] text-slate-500 uppercase tracking-widest">Vmp (Pico)</span>
                              <div className="text-base font-bold text-white mt-1">{selectedPanel.vmp} V</div>
                            </div>
                            <div className="bg-slate-950/40 border border-slate-800 p-3 rounded-xl text-left font-mono">
                              <span className="text-[8px] text-slate-500 uppercase tracking-widest">Imp (Pico)</span>
                              <div className="text-base font-bold text-white mt-1">{selectedPanel.imp} A</div>
                            </div>
                          </div>

                          {/* Parameter Dials text layout */}
                          <div className="bg-slate-950/40 border border-slate-800 p-3.5 rounded-xl space-y-2 text-left font-mono text-[11px]">
                            <div className="flex justify-between border-b border-slate-900 pb-1 text-slate-400">
                              <span>Tensión Voc (Circuito Abierto):</span>
                              <span className="text-white font-bold">{selectedPanel.voc} V</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900 pb-1 text-slate-400">
                              <span>Corriente Isc (Cortocircuito):</span>
                              <span className="text-white font-bold">{selectedPanel.isc} A</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-900 pb-1 text-slate-400">
                              <span>Dimensiones Físicas:</span>
                              <span className="text-white font-bold">{selectedPanel.dim} mm</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                              <span>Peso Estructural:</span>
                              <span className="text-white font-bold">{selectedPanel.weight} kg</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* INTERACTIVE WEB4 COTIZADOR SIMULATOR PANEL */}
                      <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 text-left relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 text-slate-500 pointer-events-none">
                          <Cpu size={16} />
                        </div>

                        <span className="text-[9px] text-amber-500 font-mono uppercase tracking-widest font-black block mb-4">
                          ⚡ SIMULADOR DE ARREGLO SOLAR Y RENDIMIENTO EN TIEMPO REAL
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* Configuration controls */}
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                                <span>Cantidad de Módulos:</span>
                                <span className="text-white font-black bg-slate-800 px-2 py-0.5 rounded text-xs">{panelQuantity} Paneles</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setPanelQuantity(Math.max(1, panelQuantity - 1))}
                                  className="w-10 h-9 bg-slate-900 hover:bg-slate-850 text-white rounded-lg border border-slate-800 hover:border-slate-700 transition-all text-sm font-bold flex items-center justify-center cursor-pointer select-none"
                                >
                                  -
                                </button>
                                <input
                                  type="range"
                                  min="1"
                                  max="48"
                                  value={panelQuantity}
                                  onChange={(e) => setPanelQuantity(parseInt(e.target.value))}
                                  className="flex-1 accent-amber-500 bg-slate-900 rounded-lg cursor-pointer h-1.5"
                                />
                                <button
                                  onClick={() => setPanelQuantity(Math.min(48, panelQuantity + 1))}
                                  className="w-10 h-9 bg-slate-900 hover:bg-slate-850 text-white rounded-lg border border-slate-800 hover:border-slate-700 transition-all text-sm font-bold flex items-center justify-center cursor-pointer select-none"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <span className="text-[10px] font-mono text-slate-400 block text-left">Esquema de Acoplamiento:</span>
                              <div className="grid grid-cols-3 gap-1.5 bg-slate-900/60 border border-slate-850 rounded-xl p-1">
                                {(["serie", "paralelo", "mixto"] as const).map((mode) => (
                                  <button
                                    key={mode}
                                    onClick={() => setConnectionMode(mode)}
                                    className={`py-1.5 text-[9px] font-mono font-bold rounded-lg transition-all duration-300 cursor-pointer uppercase ${
                                      connectionMode === mode
                                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                        : "text-slate-500 hover:text-white bg-transparent"
                                    }`}
                                  >
                                    {mode}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Calculated Metrics */}
                          <div className="bg-slate-900/40 border border-slate-850/80 rounded-xl p-3.5 space-y-2.5 font-mono text-[10px]">
                            <div className="flex justify-between items-center pb-1.5 border-b border-slate-900/50">
                              <span className="text-slate-400">Potencia del Sistema:</span>
                              <span className="text-white font-black text-sm">
                                {(selectedPanel.pp * panelQuantity)} Wp ({((selectedPanel.pp * panelQuantity)/1000).toFixed(2)} kWp)
                              </span>
                            </div>
                            <div className="flex justify-between items-center pb-1.5 border-b border-slate-900/50">
                              <span className="text-slate-400">Corriente Total (Imp):</span>
                              <span className="text-white font-bold text-[11px]">
                                {connectionMode === "serie" 
                                  ? `${selectedPanel.imp} A` 
                                  : connectionMode === "paralelo"
                                    ? `${(selectedPanel.imp * panelQuantity).toFixed(1)} A`
                                    : `${(selectedPanel.imp * Math.ceil(panelQuantity / 2)).toFixed(1)} A`}
                              </span>
                            </div>
                            <div className="flex justify-between items-center pb-1.5 border-b border-slate-900/50">
                              <span className="text-slate-400">Tensión Total (Vmp):</span>
                              <span className="text-white font-bold text-[11px]">
                                {connectionMode === "serie" 
                                  ? `${(selectedPanel.vmp * panelQuantity).toFixed(1)} V` 
                                  : connectionMode === "paralelo"
                                    ? `${selectedPanel.vmp} V`
                                    : `${(selectedPanel.vmp * Math.ceil(panelQuantity / 2)).toFixed(1)} V`}
                              </span>
                            </div>
                            <div className="flex justify-between items-center pb-1.5 border-b border-slate-900/50">
                              <span className="text-slate-400">Superficie Cubierta:</span>
                              <span className="text-amber-400 font-bold">
                                {(parseFloat(selectedPanel.dim.split("x")[0]) * parseFloat(selectedPanel.dim.split("x")[1]) * panelQuantity / 1000000).toFixed(2)} m²
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-400">Rendimiento Diario Promedio:</span>
                              <span className="text-emerald-400 font-black">
                                {((selectedPanel.pp * panelQuantity * 5) / 1000).toFixed(1)} kWh/día
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* CTA Action button to quote the structured kit directly on WhatsApp */}
                        <div className="pt-4 border-t border-slate-850/60 mt-4 flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={() => handleCopyClipboard()}
                            className="flex-1 py-3 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                            {copied ? "Copiado" : "Copiar Ficha"}
                          </button>
                          
                          <button
                            onClick={() => handleQuoteSystem(`${selectedPanel.brand} ${selectedPanel.modelName}`, panelQuantity, connectionMode)}
                            className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-[#FF5665] hover:brightness-110 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer select-none"
                          >
                            <Sun size={14} className="animate-spin-slow" />
                            Cotizar Arreglo Web4
                          </button>
                        </div>

                      </div>
                    </div>
                  )}

                  {consoleTab === "ficha" && (
                    <div className="space-y-4 text-left font-mono">
                      {/* Summary Header */}
                      <div className="border-b border-slate-850 pb-3">
                        <span className="text-[9px] text-amber-500 uppercase font-black tracking-widest block">FICHA DE INGENIERÍA COMPLETA</span>
                        <h5 className="text-white text-base font-bold mt-0.5 uppercase tracking-tight">
                          {selectedPanel.brand} {selectedPanel.modelName}
                        </h5>
                        <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                          {selectedPanel.model.startsWith("SOL-6P") ? (
                            "Tecnología: Módulos fotovoltaicos policristalinos de alto rendimiento de la marca SOLARTEC, diseñados para aplicaciones industriales y residenciales (montaje sobre techo o suelo). Ofrecen certificación PID Free (Degradación por Potencia Inducida) según IEC 62804, alta resistencia al amoníaco y niebla salina."
                          ) : selectedPanel.model.startsWith("SOL-72PE") ? (
                            "Ficha de diseño oficial para la serie de módulos monocristalinos de alta eficiencia con tecnología PERC pasivada trasera. Óptimo desempeño en climas extremos, ambientes marinos, y baja irradiación solar."
                          ) : (
                            "Módulo fotovoltaico de alto rendimiento y robustez física para electrificación profesional, telecomunicaciones, y generación distribuida."
                          )}
                        </p>
                      </div>

                      {/* Section 1: Electrical Parameters (STC) */}
                      <div className="space-y-1.5">
                        <div className="text-[9px] text-amber-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Zap size={11} className="text-amber-500 shrink-0" />
                          1. Parámetros Eléctricos (@ STC*)
                        </div>
                        <div className="bg-slate-950/60 border border-slate-800/70 rounded-xl p-3 text-[10px] space-y-1">
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Potencia Máxima [Pmax]</span>
                            <span className="text-amber-400 font-bold">{selectedPanel.pp} W</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Tolerancia de Potencia</span>
                            <span className="text-emerald-400 font-bold">
                              {selectedPanel.model.startsWith("SOL-6P-60") ? "0% ~ +3%" : selectedPanel.model.startsWith("SOL-6P-72") ? "+3%" : "+5 W"}
                            </span>
                          </div>
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Tensión Pmax [Vmp]</span>
                            <span className="text-white">{selectedPanel.vmp} V</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Corriente Pmax [Imp]</span>
                            <span className="text-white">{selectedPanel.imp} A</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Tensión Circuito Abierto [Voc]</span>
                            <span className="text-white">{selectedPanel.voc} V</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Corriente Cortocircuito [Isc]</span>
                            <span className="text-white">{selectedPanel.isc} A</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Eficiencia del Módulo [%]</span>
                            <span className="text-emerald-400 font-bold">{selectedPanel.efficiency || (selectedPanel.model.startsWith("SOL-72PE") ? "18.6%" : "14.2%")}</span>
                          </div>
                          <div className="text-[8px] text-slate-500 pt-1 leading-normal">
                            *En condiciones estándar de ensayo (STC): Irradiancia 1000 W/m², Temperatura de módulo 25°C, AM 1.5 distribución espectral según EN 60904-3.
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Mechanical Parameters */}
                      <div className="space-y-1.5">
                        <div className="text-[9px] text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Settings size={11} className="text-slate-400 shrink-0" />
                          2. Características Mecánicas Detalladas
                        </div>
                        <div className="bg-slate-950/60 border border-slate-800/70 rounded-xl p-3 text-[10px] space-y-1">
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Dimensiones Totales</span>
                            <span className="text-white font-bold">{selectedPanel.dim.replace("x", " x ").replace("x", " x ")} mm</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Peso Estructural</span>
                            <span className="text-white">{selectedPanel.weight} kg</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Celdas Integradas</span>
                            <span className="text-white">
                              {selectedPanel.model.includes("SOL-6P-72") ? (
                                "72 celdas policristalinas (156x156 mm) con 4 Busbars (4BB)"
                              ) : selectedPanel.model.includes("SOL-6P-60") ? (
                                "60 celdas policristalinas (156x156 mm) con 4 Busbars (4BB)"
                              ) : selectedPanel.model.startsWith("SOL-72PE") ? (
                                "72 celdas monocristalinas PERC de alta eficiencia"
                              ) : (
                                "Celdas de silicio cristalino de alta eficiencia"
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Materiales Frontales / Marco</span>
                            <span className="text-white">
                              {selectedPanel.model.startsWith("SOL-6P") ? (
                                "Vidrio templado antirreflectivo de 3.2 mm, película compuesta trasera y marco de aluminio anodizado"
                              ) : (
                                "Vidrio templado transparente de alta transmitancia y marco de aluminio anodizado"
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Caja de Conexión</span>
                            <span className="text-white font-bold">
                              {selectedPanel.model.includes("SOL-6P-60") ? (
                                "Clasificación IP67, incluye 3 diodos de bypass"
                              ) : selectedPanel.model.includes("SOL-6P-72") ? (
                                "Clasificación IP65, incluye 3 diodos de bypass"
                              ) : (
                                "Clasificación IP67 con diodos de bypass integrados"
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Cableado de Salida</span>
                            <span className="text-white">
                              {selectedPanel.model.startsWith("SOL-6P") ? (
                                "Longitud de cables de 1000 mm (1.0 m) de sección 4 mm²"
                              ) : (
                                "Cable de sección 4 mm² con longitud de 1.2 metros"
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Conectores</span>
                            <span className="text-white">
                              {selectedPanel.model.startsWith("SOL-6P") ? "Compatibles con Tyco o MC4" : "Tipo MC4 o totalmente compatibles"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Thermal Characteristics */}
                      <div className="space-y-1.5">
                        <div className="text-[9px] text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Cpu size={11} className="text-slate-400 shrink-0" />
                          3. Características Térmicas y Coeficientes
                        </div>
                        <div className="bg-slate-950/60 border border-slate-800/70 rounded-xl p-3 text-[10px] space-y-1.5">
                          <div className="border-b border-slate-900/50 pb-1">
                            <div className="flex justify-between">
                              <span className="text-slate-400 font-bold">NOCT (Temp. Nominal Celda)</span>
                              <span className="text-amber-400 font-bold">
                                {selectedPanel.model.startsWith("SOL-6P") ? "45.3°C ± 2°C" : "45°C ± 2°C"}
                              </span>
                            </div>
                            <span className="text-[7.5px] text-slate-500 block leading-tight mt-0.5">
                              (Medido a 800 W/m² de Irradiancia, AM 1.5, 20°C de temp. ambiente y 1 m/s de velocidad de viento)
                            </span>
                          </div>
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Coef. de temperatura para Pmax</span>
                            <span className="text-red-400 font-bold">
                              {selectedPanel.model.startsWith("SOL-6P") ? "-0.41% / °C" : "-0.380% / °C"}
                            </span>
                          </div>
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Coef. de temperatura para Voc</span>
                            <span className="text-red-400">
                              {selectedPanel.model.startsWith("SOL-6P") ? "-0.30% / °C" : "-0.286% / °C"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Coef. de temperatura para Isc</span>
                            <span className="text-emerald-400">
                              {selectedPanel.model.startsWith("SOL-6P") ? "+0.05% / °C" : "+0.057% / °C"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Section 4: Operating Limits */}
                      <div className="space-y-1.5">
                        <div className="text-[9px] text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Shield size={11} className="text-amber-500/80 shrink-0" />
                          4. Condiciones de Operación y Carga
                        </div>
                        <div className="bg-slate-950/60 border border-slate-800/70 rounded-xl p-3 text-[10px] space-y-1">
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Temperatura de Operación</span>
                            <span className="text-white">-40°C a 85°C</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Máxima Tensión del Sistema</span>
                            <span className="text-white">1000V DC (IEC)</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Corriente Inversa Máx (Fusible)</span>
                            <span className="text-white">15A</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Carga de Presión Máxima (Nieve)</span>
                            <span className="text-white">5400 Pa</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Carga de Succión Máxima (Viento)</span>
                            <span className="text-white">
                              {selectedPanel.model.startsWith("SOL-6P-60") ? (
                                "2400 Pa (o 5400 Pa según variante de marco)"
                              ) : (
                                "5400 Pa"
                              )}
                            </span>
                          </div>
                          <div className="flex flex-col pt-0.5">
                            <span className="text-slate-400">Resistencia Ambiental Certificada</span>
                            <span className="text-slate-200 mt-0.5 text-[8.5px] leading-relaxed">
                              {selectedPanel.model.startsWith("SOL-6P") ? (
                                "Certificación PID Free (Resistencia a la Degradación por Potencia Inducida) de acuerdo a la norma IEC 62804. Resistencia al amoníaco (NH3) según IEC 62716 Ed. 1 y corrosión por niebla salina según IEC 61701 Ed. 2 (Nivel 6)."
                              ) : (
                                "Certificado 100% Libre de PID (Power Induced Degradation). Ensayado rigurosamente ante agentes corrosivos como niebla salina, amoníaco (NH₃) y humedad."
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Section 5: Official Certifications */}
                      <div className="space-y-1.5">
                        <div className="text-[9px] text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Check size={11} className="text-emerald-400 shrink-0" />
                          5. Certificaciones Oficiales
                        </div>
                        <div className="bg-slate-950/60 border border-slate-800/70 rounded-xl p-3 text-[10px] space-y-1">
                          <div>
                            <span className="text-slate-400">Estándares Internacionales:</span>
                            <div className="text-white font-bold mt-0.5">IEC 61215, IEC 61730</div>
                          </div>
                          <div className="pt-1 border-t border-slate-900/40">
                            <span className="text-slate-400">Gestión de Calidad:</span>
                            <div className="text-white font-bold mt-0.5">ISO 9001:2008</div>
                          </div>
                          <div className="pt-1 border-t border-slate-900/40">
                            <span className="text-slate-400">Guía de Diseño y Calificación:</span>
                            <div className="text-white font-bold mt-0.5">TS62941</div>
                          </div>
                          <div className="pt-1 border-t border-slate-900/40">
                            <span className="text-slate-400">Sellos de Certificación Visibles:</span>
                            <div className="text-amber-400 font-bold mt-0.5">SGS, CE, TÜV</div>
                          </div>
                        </div>
                      </div>

                      {/* Section 6: Structured Warranties */}
                      <div className="space-y-1.5">
                        <div className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <Shield size={11} className="text-emerald-400 shrink-0" />
                          6. Garantías Estructuradas
                        </div>
                        <div className="bg-slate-950/60 border border-slate-800/70 rounded-xl p-3 text-[10px] space-y-1">
                          <div className="flex justify-between border-b border-slate-900/50 pb-1">
                            <span className="text-slate-400">Garantía de Producto</span>
                            <span className="text-emerald-400 font-bold">10 Años Limitada</span>
                          </div>
                          <div className="border-b border-slate-900/50 pb-1">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Garantía de Potencia Lineal</span>
                              <span className="text-emerald-400 font-bold">25 Años Limitada</span>
                            </div>
                            <span className="text-[8px] text-slate-500 block leading-tight mt-0.5">
                              Pérdida de eficiencia anual máxima de solo el -0.55%
                            </span>
                          </div>
                          <div className="pt-0.5">
                            <span className="text-slate-400">Rendimiento Asegurado a 25 Años:</span>
                            <span className="text-slate-200 mt-0.5 text-[8.5px] leading-relaxed block">
                              Se mantiene en un nivel confiable con curvas de degradación optimizadas que ofrecen un rendimiento extra de hasta <strong className="text-emerald-400">+4.10%</strong> en comparación con módulos estándar.
                            </span>
                          </div>
                        </div>
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
                            className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer ${
                              curveMode === "irradiacion"
                                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                : "text-slate-400 hover:text-white"
                            }`}
                          >
                            ☀️ Irradiación (W/m²)
                          </button>
                          <button
                            onClick={() => setCurveMode("temperatura")}
                            className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer ${
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

                            {/* Real Catalog Graph Image */}
                            {selectedPanel.model.startsWith("SOL-72PE") && (
                              <div className="bg-slate-950/60 border border-slate-800/70 rounded-xl p-3.5 space-y-2">
                                <div className="text-[9px] text-slate-300 font-bold uppercase tracking-wider flex items-center justify-between">
                                  <span>📈 Gráfico Real del Catálogo Oficial</span>
                                  <span className="text-emerald-400 font-normal">Variación de Potencia y Corriente</span>
                                </div>
                                <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-900/50 p-1">
                                  <img
                                    src={curvaIvPvIrradiacion}
                                    alt="Curva IV y PV por Irradiación"
                                    className="w-full h-auto object-contain rounded"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <p className="text-[8.5px] text-slate-400 leading-normal font-sans">
                                  Gráfico escaneado oficial que muestra la familia de curvas de corriente (A) y potencia (W) frente a tensión (V) para cinco niveles de radiación solar (1000 W/m² a 200 W/m²).
                                </p>
                              </div>
                            )}

                            {selectedPanel.model.startsWith("SOL-6P") && (
                              <div className="bg-slate-950/60 border border-slate-800/70 rounded-xl p-3.5 space-y-2">
                                <div className="text-[9px] text-slate-300 font-bold uppercase tracking-wider flex items-center justify-between">
                                  <span>📈 Gráfico Real del Catálogo Oficial SOL 6P 72</span>
                                  <span className="text-emerald-400 font-normal">Variación de Potencia y Corriente (Térmico/Rendimiento)</span>
                                </div>
                                <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-900/50 p-1">
                                  <img
                                    src={graficoAnalisisSol6p72Termico}
                                    alt="Análisis de Rendimiento SOL 6P 72"
                                    className="w-full h-auto object-contain rounded"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <p className="text-[8.5px] text-slate-400 leading-normal font-sans">
                                  Gráfico escaneado oficial que muestra el comportamiento de corriente (A) y potencia (W) frente a la variación solar para la serie SOL-6P.
                                </p>
                              </div>
                            )}

                            <div className="border-t border-slate-900/40 my-1 pt-2">
                              <span className="text-[8.5px] text-amber-500 uppercase font-bold block">🕹️ Simulador Dinámico de Celda</span>
                            </div>

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
                              <p className="text-[8px] text-slate-500 italic text-left">
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

                            {/* Real Catalog Graph Image */}
                            {selectedPanel.model.startsWith("SOL-72PE") && (
                              <div className="bg-slate-950/60 border border-slate-800/70 rounded-xl p-3.5 space-y-2">
                                <div className="text-[9px] text-slate-300 font-bold uppercase tracking-wider flex items-center justify-between">
                                  <span>📈 Gráfico Real del Catálogo Oficial</span>
                                  <span className="text-red-400 font-normal">Efecto de la Temperatura en el Rendimiento</span>
                                </div>
                                <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-900/50 p-1">
                                  <img
                                    src={curvaIvTemperatura}
                                    alt="Curva IV por Temperatura"
                                    className="w-full h-auto object-contain rounded"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <p className="text-[8.5px] text-slate-400 leading-normal font-sans">
                                  Gráfico escaneado oficial que ilustra cómo la tensión de circuito abierto (Voc) y la tensión de máxima potencia se reducen drásticamente a medida que la celda aumenta su temperatura desde 25°C hasta 75°C.
                                </p>
                              </div>
                            )}

                            {selectedPanel.model.startsWith("SOL-6P") && (
                              <div className="bg-slate-950/60 border border-slate-800/70 rounded-xl p-3.5 space-y-2">
                                <div className="text-[9px] text-slate-300 font-bold uppercase tracking-wider flex items-center justify-between">
                                  <span>📈 Análisis de Temperatura SOL 6P 72</span>
                                  <span className="text-red-400 font-normal">Variación por Temperatura</span>
                                </div>
                                <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-900/50 p-1">
                                  <img
                                    src={graficoAnalisisSol6p72Temperatura}
                                    alt="Análisis de Temperatura SOL 6P 72"
                                    className="w-full h-auto object-contain rounded"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                <p className="text-[8.5px] text-slate-400 leading-normal font-sans">
                                  Gráfico escaneado oficial que ilustra el comportamiento detallado y la variación de tensión y corriente ante el cambio de temperatura de la celda de la serie SOL-6P.
                                </p>
                              </div>
                            )}

                            <div className="border-t border-slate-900/40 my-1 pt-2">
                              <span className="text-[8.5px] text-red-400 uppercase font-bold block">🕹️ Simulador Dinámico de Celda</span>
                            </div>

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
                      </div>
                    );
                  })()}

                  {consoleTab === "planos" && (() => {
                    const dims = selectedPanel.dim.split("x");
                    const pLength = dims[0] || "1956";
                    const pWidth = dims[1] || "991";
                    const pThick = dims[2] || "45";
                    const brand = selectedPanel.brand;

                    return (
                      <div className="space-y-4 text-left font-mono text-xs">
                        {/* Title banner */}
                        <div className="border-b border-slate-800 pb-2">
                          <span className="text-[9px] text-cyan-400 uppercase font-bold tracking-widest block">PLANO MECÁNICO E INGENIERÍA DE DISEÑO</span>
                          <h5 className="text-white text-sm font-bold mt-0.5 uppercase tracking-tight">
                            DIAGRAMA DE MEDIDAS Y COTAS {brand}
                          </h5>
                        </div>

                        {/* Custom CAD/Blueprint SVG */}
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

                            {/* Dimension vertical: Height */}
                            <line x1="16" y1="24" x2="16" y2="164" stroke="#00e5ff" strokeWidth="0.5" markerStart="url(#cad-arrow)" markerEnd="url(#cad-arrow)" />
                            <line x1="16" y1="24" x2="30" y2="24" stroke="#00e5ff" strokeWidth="0.3" strokeDasharray="1,1" opacity="0.5" />
                            <line x1="16" y1="164" x2="30" y2="164" stroke="#00e5ff" strokeWidth="0.3" strokeDasharray="1,1" opacity="0.5" />
                            <text x="11" y="94" fill="#00e5ff" fontSize="6.5" fontFamily="monospace" textAnchor="middle" transform="rotate(-90,11,94)">{pLength} mm</text>

                            {/* Dimension horizontal: Width */}
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

                            {/* Dimension frame thickness */}
                            <line x1="154" y1="178" x2="166" y2="178" stroke="#00e5ff" strokeWidth="0.5" markerStart="url(#cad-arrow)" markerEnd="url(#cad-arrow)" />
                            <line x1="154" y1="164" x2="154" y2="178" stroke="#00e5ff" strokeWidth="0.3" strokeDasharray="1,1" opacity="0.5" />
                            <line x1="166" y1="164" x2="166" y2="178" stroke="#00e5ff" strokeWidth="0.3" strokeDasharray="1,1" opacity="0.5" />
                            <text x="160" y="187" fill="#00e5ff" fontSize="6.5" fontFamily="monospace" textAnchor="middle">{pThick} mm</text>

                            {/* Technical pointer labels / Callouts */}
                            <g opacity="0.8">
                              <path d="M 85 45 L 120 35 L 210 35" fill="none" stroke="#1e3a8a" strokeWidth="0.5" />
                              <circle cx="85" cy="45" r="1.5" fill="#00e5ff" />
                              <text x="215" y="37" fill="#94a3b8" fontSize="5.5" fontFamily="monospace">Vidrio Templado (3.2 mm)</text>

                              <path d="M 65 110 L 115 100 L 210 100" fill="none" stroke="#1e3a8a" strokeWidth="0.5" />
                              <circle cx="65" cy="110" r="1.5" fill="#00e5ff" />
                              <text x="215" y="102" fill="#94a3b8" fontSize="5.5" fontFamily="monospace">Celdas PERC alta ef.</text>

                              <path d="M 162 70 L 185 60 L 210 60" fill="none" stroke="#1e3a8a" strokeWidth="0.5" />
                              <circle cx="162" cy="70" r="1.5" fill="#00e5ff" />
                              <text x="215" y="62" fill="#94a3b8" fontSize="5.5" fontFamily="monospace">Aluminio Anodizado ({pThick}mm)</text>
                            </g>
                          </svg>
                        </div>

                        {/* Mechanical text callouts list */}
                        <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5 text-[10px] space-y-2 leading-relaxed text-slate-400">
                          <div>
                            <strong className="text-white">● Cotas y Dimensiones de Marco:</strong> El largo total está acotado en <span className="text-cyan-400 font-bold">{pLength} mm</span>, el ancho total en <span className="text-cyan-400 font-bold">{pWidth} mm</span>, y el ancho interno del perfil de aluminio en <span className="text-slate-300 font-bold">949 mm</span>.
                          </div>
                          <div>
                            <strong className="text-white">● Orificios de Montaje e Instalación:</strong> Dispone de un total de <span className="text-white font-bold">8 orificios de montaje</span> de precisión con dimensiones normalizadas de <span className="text-cyan-400 font-bold">14 x 9 mm</span>.
                          </div>
                          <div>
                            <strong className="text-white">● Canalización y Drenaje:</strong> Cuenta con <span className="text-white font-bold">8 orificios de drenaje</span> de <span className="text-slate-300 font-bold">8 x 3 mm</span> estratégicamente distribuidos para evitar la condensación y acumulación de agua en el interior del perfil.
                          </div>
                          <div>
                            <strong className="text-white">● Conectores y Puesta a Tierra:</strong> Ubicación exacta de la Caja de Conexión IP67 trasera, con salidas de cables (+) y (-) de 1,2 metros, y puntos específicos con orificios dedicados para la puesta a tierra de seguridad de la estructura.
                          </div>
                          <div>
                            <strong className="text-white">● Puntos de Anclaje Estructural:</strong> Distancias internas de montaje estandarizadas de <span className="text-cyan-400 font-bold">1200 mm</span>, <span className="text-cyan-400 font-bold">846 mm</span> y <span className="text-cyan-400 font-bold">578 mm</span> para optimizar la sujeción según la carga de viento y nieve.
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

              </div>
            ) : (
              <div className="text-center py-20 text-slate-500 font-mono text-xs">
                No hay ningún panel seleccionado que coincida con los filtros activos.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
