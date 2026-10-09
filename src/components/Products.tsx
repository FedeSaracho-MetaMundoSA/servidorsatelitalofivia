import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wifi, 
  Cpu, 
  Shield, 
  Search, 
  X, 
  CheckCircle2, 
  FileText, 
  ArrowRight,
  Sparkles,
  Layers,
  ArrowUpDown,
  Compass,
  Check,
  Tag,
  Award,
  AlertTriangle,
  Globe
} from 'lucide-react';
import { CATALOG_PRODUCTS } from '../data/productsData';
import { ProductSpec } from '../types';

export default function Products() {
  const [products] = useState<ProductSpec[]>(CATALOG_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedIndustry, setSelectedIndustry] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<ProductSpec | null>(null);

  // Hardcoded verified WhatsApp number
  const PRIMARY_WHATSAPP_NUMBER = "5493875843438";

  // Categories extracted dynamically from products + "Todos"
  const categories = useMemo(() => {
    return ["Todos", ...Array.from(new Set(products.map(p => p.category)))];
  }, [products]);

  // Industries list for filter
  const industries = ["Todos", "Rural", "Logística", "Turismo", "Residencial"];

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (product.tagline && product.tagline.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchCategory = selectedCategory === "Todos" || product.category === selectedCategory;
      const matchIndustry = selectedIndustry === "Todos" || product.industries.includes(selectedIndustry as any);
      
      return matchSearch && matchCategory && matchIndustry;
    });
  }, [products, searchTerm, selectedCategory, selectedIndustry]);

  // Dynamic WhatsApp pre-filled messages builder per product (pointing strictly to PRIMARY_WHATSAPP_NUMBER)
  const getWhatsAppURL = (product: ProductSpec, isDetailed: boolean = false) => {
    const typeLabel = isDetailed ? "FICHA COMPLETA" : "CONSULTA MERCADO";
    const isDisc = product.isDiscontinued;
    
    const message = isDisc 
      ? `📋 *CONSULTA DE REEMPLAZO TECNOLÓGICO*\n` +
        `-------------------------------------------\n` +
        `*Atn:* José Luis / Soporte Técnico\n` +
        `*Canal:* Servidor Satelital Salta (EQUIPO DESCONTINUADO)\n\n` +
        `📌 *MODELO HISTÓRICO:* _${product.title}_\n` +
        `• *SKU:* \`${product.sku}\`\n` +
        `• *Línea recomendada:* ${product.techSpecs.find(s => s.label === "Modelo Sucesor" || s.label === "Reemplazo de Línea" || s.label === "Sustituto Oficial")?.value || "MOTOTRBO R2 / R7"}\n\n` +
        `Hola José Luis, estoy buscando soporte, repuestos o el reemplazo ideal para el equipo ${product.title} que vi en su web. Solicito cotización formal de la línea nueva para actualizar nuestra flota.`
      : `📋 *CONSULTA DE HARDWARE - PORTAL WEB*\n` +
        `-------------------------------------------\n` +
        `*Atn:* José Luis / Soporte Técnico\n` +
        `*Canal:* Servidor Satelital Salta (${typeLabel})\n\n` +
        `📌 *PRODUCTO:* _${product.title}_\n` +
        `• *SKU:* \`${product.sku}\`\n` +
        `• *Categoría:* ${product.category}\n` +
        `• *Referencia:* Cotización a Convenir\n` +
        `• *Marca:* ${product.brand}\n\n` +
        `Hola José Luis, requiero recibir asesoría, stock disponible y cotización formal de este equipamiento para nuestra operación en el NOA.`;
    
    return `https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Conectividad": return <Wifi className="text-emerald-400" size={14} />;
      case "Seguridad": return <Shield className="text-cyan-400" size={14} />;
      case "Planes de Internet": return <Globe className="text-rose-400" size={14} />;
      default: return <Cpu className="text-amber-400" size={14} />;
    }
  };

  return (
    <section className="py-28 bg-transparent relative border-b border-white/5 overflow-hidden">
      {/* Dynamic graphic lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF5665]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full max-w-6xl">
        
        {/* Core Header Layout */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono tracking-widest font-extrabold uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Catálogo Oficial & Equipamiento
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-none uppercase font-black">
              PORTAL DE <span className="text-[#FF5665]">EQUIPAMIENTO</span>
            </h2>
            <p className="text-gray-400 font-light text-xs sm:text-sm mt-3 max-w-xl leading-relaxed">
              Equipamiento homologado original, soportes forjados en Salta e ingeniería de potencia dual certificada para entornos de máxima resistencia.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <span className="text-white font-bold">{filteredProducts.length}</span> productos encontrados
          </div>
        </div>

        {/* Motorola Authorized Agent Badge */}
        <div className="mb-10 bg-gradient-to-r from-[#0C152F] via-[#05070a] to-[#0C152F] border border-white/10 hover:border-[#FF5665]/30 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-5 transition-all shadow-[0_12px_30px_rgba(0,0,0,0.5)]">
          <div className="w-14 h-14 rounded-2xl bg-[#FF5665]/10 border border-[#FF5665]/30 flex items-center justify-center shrink-0 shadow-lg">
            <Award className="text-[#FF5665]" size={28} />
          </div>
          <div className="text-center md:text-left space-y-1">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
              <span className="px-2 py-0.5 text-[8px] font-mono tracking-widest font-extrabold uppercase rounded bg-blue-500/10 border border-blue-500/30 text-blue-400">
                DISTRIBUIDOR AUTORIZADO
              </span>
              <span className="px-2 py-0.5 text-[8px] font-mono tracking-widest font-extrabold uppercase rounded bg-rose-500/10 border border-[#FF5665]/30 text-[#FF5665]">
                CERTIFICACIÓN AGENTE N° 2
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-display font-extrabold text-white tracking-tight leading-snug uppercase">
              SERVIDOR SATELITAL ES AGENTE AUTORIZADO N° 2 DE MOTOROLA SOLUTIONS
            </h4>
            <p className="text-xs text-gray-400 font-light max-w-3xl leading-relaxed">
              Soporte homologado oficial, reprogramación certificada de subtonos de seguridad, habilitación de repetidoras y laboratorio de calibración directo por Jorge Alberto Sarapura en la provincia de Salta y todo el noroeste argentino (NOA).
            </p>
          </div>
        </div>

        {/* 2. ADVANCED ADIDAS-STYLE SEARCH & FILTER SUITE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* LEFT COLUMN: CONTROL INTERFACES / FILTER BAR */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* SEARCH COMPONENT */}
            <div className="bg-[#0b0e14]/90 border border-white/10 rounded-2xl p-5 shadow-lg relative overflow-hidden">
              <label htmlFor="catalog-search" className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-extrabold block mb-2.5">
                BUSCAR HARDWARE
              </label>
              <div className="relative">
                <input 
                  id="catalog-search"
                  type="text"
                  placeholder="Ej. Starlink Mini, soporte..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#040609] border border-white/10 focus:border-[#FF5665] focus:outline-none focus:ring-1 focus:ring-[#FF5665] rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder:text-gray-600 transition-all"
                />
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* CATEGORIES RADIO / ACCORDION */}
            <div className="bg-[#0b0e14]/90 border border-white/10 rounded-2xl p-5 shadow-lg">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold block mb-3">
                CATEGORÍAS
              </span>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between group cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-[#FF5665]/10 text-[#FF5665] border border-[#FF5665]/20 font-bold"
                        : "bg-transparent text-gray-400 hover:text-white hover:bg-white/[0.02] border border-transparent"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-1 h-1 rounded-full transition-all ${selectedCategory === cat ? 'bg-[#FF5665] scale-125' : 'bg-gray-700'}`} />
                      {cat}
                    </span>
                    {selectedCategory === cat && <Check size={12} />}
                  </button>
                ))}
              </div>
            </div>

            {/* SECTOR / INDUSTRIES SELECTOR */}
            <div className="bg-[#0b0e14]/90 border border-white/10 rounded-2xl p-5 shadow-lg">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold block mb-3">
                FILTRAR POR SECTOR
              </span>
              <div className="space-y-1.5">
                {industries.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setSelectedIndustry(ind)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between group cursor-pointer ${
                      selectedIndustry === ind
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-bold"
                        : "bg-transparent text-gray-400 hover:text-white hover:bg-white/[0.02] border border-transparent"
                    }`}
                  >
                    <span>{ind}</span>
                    {selectedIndustry === ind && <Check size={12} className="text-emerald-400" />}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: HIGH QUALITY RETAIL GRID (ADIDAS & MERCADO PAGO E-COMMERCE CONTEXT) */}
          <div className="lg:col-span-9">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => {
                  // Dynamic replacement model lookup from specifications for discontinued equipments
                  const getReplacementModel = () => {
                    const spec = product.techSpecs?.find(s => 
                      s.label === "Modelo Sucesor" || 
                      s.label === "Reemplazo de Línea" || 
                      s.label === "Sustituto Oficial"
                    );
                    return spec ? spec.value : "MOTOTRBO R2 / R7";
                  };

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      key={product.id}
                      className="rounded-xl overflow-hidden hover:shadow-[0_24px_50px_rgba(0,0,0,0.85)] transition-all duration-300 flex flex-col justify-between group relative border bg-[#0d0f14] border-zinc-800/85 hover:border-zinc-700"
                    >
                      
                      {/* Catalog Image Box with clean viewport aspect */}
                      <div className="aspect-[4/3] w-full bg-transparent overflow-hidden relative shrink-0 flex items-center justify-center p-8">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className={`w-full h-full object-contain relative z-10 transition-transform duration-500 ease-out group-hover:scale-105 drop-shadow-2xl ${product.isDiscontinued ? 'grayscale brightness-[0.8]' : 'brightness-100'}`} 
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Operational tags */}
                        <span className="absolute top-4 left-4 px-2 py-0.5 text-[8px] font-sans font-bold uppercase tracking-widest rounded-sm bg-black border border-white/10 text-gray-400 shadow-sm z-20">
                          {product.brand.toUpperCase()}
                        </span>

                        {/* Immediate Availability Pin */}
                        {product.isDiscontinued ? (
                          <span className="absolute bottom-4 right-4 px-2.5 py-0.5 text-[7px] font-mono font-bold uppercase rounded-full border border-amber-800 text-amber-500 flex items-center gap-1.5 bg-[#0a0000] z-20 shadow-md">
                            CONSULTAR REEMPLAZO
                          </span>
                        ) : (
                          <span className="absolute bottom-4 right-4 px-2.5 py-0.5 text-[7px] font-mono font-bold uppercase rounded-full border border-[#054a32] text-[#10b981] flex items-center gap-1.5 bg-[#001008] z-20 shadow-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                            ENTREGA INMEDIATA
                          </span>
                        )}
                      </div>

                      {/* Technical details block */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-3 text-left">
                          
                          <h3 className="text-[15px] font-black text-white leading-tight font-sans tracking-tight uppercase">
                            {product.title} {product.isDiscontinued && "(Discontinuado)"}
                          </h3>

                          {/* Bullets outline conforming perfectly with the mobile design dots */}
                          <ul className="space-y-1 text-[11px] text-gray-300 font-light font-sans text-left min-h-[58px]">
                            {product.bulletPoints.slice(0, 3).map((bullet, idx) => {
                              const bulletText = bullet.includes(':') ? bullet.split(':')[0] : bullet;
                              return (
                                <li key={idx} className="flex items-start gap-1.5 leading-tight">
                                  <span className="text-zinc-600 font-bold">•</span>
                                  <span className="line-clamp-1">{bulletText}</span>
                                </li>
                              )
                            })}
                            {product.isDiscontinued && (
                              <li className="flex items-start gap-1.5 leading-tight text-gray-400">
                                <span className="text-zinc-600 font-bold">•</span>
                                <span className="line-clamp-1">Consultar Reemplazo: {getReplacementModel()}</span>
                              </li>
                            )}
                          </ul>
                        </div>

                        {/* Display explicit pricing & actions */}
                        <div className="space-y-3.5 pt-1 text-left">
                          <span className="text-[11px] font-mono tracking-widest uppercase font-extrabold text-[#10b981] block leading-none">
                            Consulte Cotización
                          </span>

                          {/* Interactive actions for inquiry */}
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => setSelectedProduct(product)}
                              className="py-1.5 px-2 bg-[#0c1f17] border border-[#10b981]/20 text-[#10b981] rounded-md text-[10px] font-sans font-bold flex items-center justify-center cursor-pointer transition-colors hover:bg-[#10b981]/10"
                            >
                              Ver Detalles
                            </button>
                            
                            <a
                              href={getWhatsAppURL(product)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-1.5 px-2 bg-white hover:bg-gray-100 border border-white text-black rounded-md text-[10px] font-sans font-bold flex items-center justify-center cursor-pointer transition-colors"
                            >
                              Añadir al Carrito
                            </a>
                          </div>

                        </div>

                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Empty lookup indicator */}
            {filteredProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 px-4 bg-white/[0.01] border border-white/5 rounded-2xl"
              >
                <Tag size={32} className="text-gray-600 mx-auto mb-4 animate-bounce" />
                <h4 className="text-white font-bold text-sm uppercase font-mono">No se encontraron productos</h4>
                <p className="text-gray-500 text-xs mt-1 max-w-sm mx-auto font-light">
                  No hay equipos que coincidan con los filtros seleccionados. Intenta restablecer los términos de búsqueda o cambiar de categoría.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("Todos");
                    setSelectedIndustry("Todos");
                  }}
                  className="mt-5 px-4 py-2 bg-[#FF5665] hover:bg-rose-500 rounded-lg text-xs font-mono font-bold text-[#06080c] cursor-pointer"
                >
                  Restablecer Filtros
                </button>
              </motion.div>
            )}

          </div>

        </div>

        {/* Detailed Technical Specification Slide-over/Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
              />

              {/* Box frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 25 }}
                transition={{ type: "spring", duration: 0.45 }}
                className="bg-[#0b0e14] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative z-10 flex flex-col max-h-[90vh]"
              >
                {/* Header context */}
                <div className="h-72 sm:h-96 relative shrink-0 bg-transparent border-b border-white/5 flex items-center justify-center overflow-hidden p-8 sm:p-12">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.title} 
                    className={`w-full h-full object-contain relative z-10 drop-shadow-2xl transition-transform ${selectedProduct.isDiscontinued ? 'grayscale brightness-[0.8]' : 'brightness-100'}`} 
                  />
                  
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/50 hover:bg-white/10 border border-black/10 text-gray-800 hover:text-black transition-colors cursor-pointer z-20"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Info blocks scrollable */}
                <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 custom-scrollbar text-left relative z-20">
                  <div className="border-b border-white/5 pb-5">
                    <div className="flex flex-wrap gap-2 items-center mb-2">
                       <span className="px-2.5 py-0.5 text-[8px] font-mono font-extrabold uppercase rounded bg-emerald-400 text-[#06080c] tracking-wider inline-block">
                         {selectedProduct.brand.toUpperCase()}
                       </span>
                       {selectedProduct.badgeText && (
                         <span className="px-2.5 py-0.5 text-[8px] font-mono font-black uppercase rounded bg-amber-400 text-black tracking-wider inline-flex items-center gap-0.5 shadow-md">
                           ⚡ {selectedProduct.badgeText}
                         </span>
                       )}
                    </div>
                    <h3 className="text-xl sm:text-3xl font-display font-black text-white tracking-tight uppercase drop-shadow-md">
                      {selectedProduct.title}
                    </h3>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#FF5665] mb-2 font-bold">DESCRIPCIÓN COMERCIAL</h4>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#FF5665] mb-3 font-bold">PLIEGO TÉCNICO DE INGENIERÍA</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProduct.techSpecs.map((spec, i) => (
                        <div key={i} className="p-3 bg-black/40 border border-white/5 rounded-xl flex flex-col justify-between">
                          <span className="text-[8px] font-mono text-gray-500 uppercase block">{spec.label}</span>
                          <span className="text-xs font-semibold text-white mt-1 leading-tight">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#FF5665] mb-2.5 font-bold">APLICACIÓN REMOTA DE ALTA MONTAÑA</h4>
                    <ul className="space-y-2 text-xs text-gray-400">
                      {selectedProduct.operatividad.map((op, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-emerald-400 font-bold shrink-0">•</span>
                          <span>{op}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer specs */}
                <div className="p-6 bg-[#040609] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                  <div className="text-left font-mono">
                    <span className="text-[9px] text-gray-500 block uppercase leading-none">IDENTIFICACIÓN SKU</span>
                    <span className="text-xs text-gray-300 mt-1 block font-bold">{selectedProduct.sku}</span>
                  </div>
                  
                  <a
                    href={getWhatsAppURL(selectedProduct, true)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-6 bg-[#FF5665] hover:bg-rose-500 rounded-xl text-xs font-mono font-bold text-[#06080c] flex items-center gap-2 cursor-pointer transition-all border-b-4 border-rose-700 hover:-translate-y-0.5 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF5665]"
                  >
                    <span>Solicitar Asesoramiento Técnico</span>
                    <ArrowRight size={14} />
                  </a>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
