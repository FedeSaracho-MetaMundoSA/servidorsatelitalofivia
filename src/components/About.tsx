import { motion } from 'motion/react';
import { Target, Globe2, Antenna, CheckCircle2, Compass, MapPin } from 'lucide-react';

export default function About() {
  const fieldExps = [
    { 
      type: "CAMPO & AGRO", 
      title: "Gente de Campo Conectada", 
      desc: "Instalación del Starlink Mini sobre cosechadoras y camionetas de rastro, garantizando facturación electrónica y comunicación fluida en medio de cosechas sin cobertura.",
      image: "https://images.unsplash.com/photo-1625246143195-6b292e00713b?q=80&w=800&auto=format&fit=crop"
    },
    { 
      type: "TRANSPORTE & CAMIONEROS", 
      title: "CCTV Móvil en Cabina", 
      desc: "Camioneros del NOA operando con cámaras inteligentes autoportantes que transmiten video en vivo a través de Wi-Fi Starlink satelital en pases cordilleranos.",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const regionalCoverage = [
    { area: "La Puna Salteña", detail: "Salar de Pocitos, Arizaro, San Antonio de los Cobres." },
    { area: "Valles Calchaquíes", detail: "Cafayate, Cachi, Molinos, San Carlos." },
    { area: "Zona Productiva / Agro", detail: "Metán, Rosario de la Frontera, Las Lajitas." },
    { area: "Yungas y Frontera", detail: "Orán, Tartagal, General Mosconi, Salvador Mazza." }
  ];

  return (
    <section className="py-24 bg-transparent relative border-b border-white/5 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#FF5665]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Corporate Presentation Box */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-[2px] bg-[#FF5665]" />
              <h2 className="text-sm font-mono tracking-[0.2em] text-[#FF5665] uppercase font-bold">Institucional</h2>
            </div>
            
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white uppercase">
              Alta Calidad Tecnológica <br />
              <span className="text-gradient">
                Marcas Líderes NOA
              </span>
            </h3>
            
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed bg-[#07090e]/85 backdrop-blur-md p-6 rounded-2xl border border-white/5">
              <strong className="text-white">Servidor Satelital</strong> es una empresa dedicada a la ingeniería, provisión e instalación de comunicaciones satelitales complejas. Somos distribuidores autorizados de marcas líderes en todo el Norte Argentino, brindando soluciones reales con soporte inmediato en campo.
            </p>
            
            <div className="space-y-4">
              {[
                { icon: Target, title: "Stock Permanente Certificado", desc: "Equipamiento Starlink Mini y estándar listo para entrega inmediata en Salta Capital sin demoras de importación." },
                { icon: Globe2, title: "Soporte Técnico de Alta Montaña", desc: "Monitoreo remoto de enlace 24/7 y respuesta técnica ágil directa en cualquier punto de la región." },
                { icon: Antenna, title: "Anclajes Físicos Homologados", desc: "Diseño y fabricación de mástiles, soportes imantados de alta sujeción y sistemas antivibración en el NOA." }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 group bg-black/45 backdrop-blur-md p-4 rounded-xl border border-white/5 hover:bg-[#FF5665]/5 hover:border-[#FF5665]/20 transition-all duration-300">
                  <div className="p-2.5 bg-black/60 rounded-lg text-[#FF5665] group-hover:scale-105 transition-transform duration-300 shrink-0 border border-white/5">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm leading-tight uppercase font-display">{item.title}</h4>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Dynamic Regional Map Info Box & Operations */}
          <div className="space-y-8">
            
            {/* Elegant Cobertura Panel */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden"
            >
              {/* Abs decorative background graph */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#FF5665]/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="p-2 bg-[#FF5665]/10 text-[#FF5665] rounded-lg border border-[#FF5665]/20">
                  <Compass size={18} className="animate-spin" style={{ animationDuration: '30s' }} />
                </div>
                <div>
                  <span className="text-[9px] font-mono uppercase text-[#FF5665] font-bold block">PRESENCIA ACTIVA PROVINCIAL</span>
                  <h4 className="text-xs font-mono font-bold text-white tracking-widest uppercase">COBERTURA GEOGRÁFICA EN SALTA</h4>
                </div>
              </div>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Desplegamos infraestructura de comunicaciones robusta en sitios remotos de la provincia, garantizando el correcto funcionamiento del Kit Starlink Mini según el terreno:
              </p>

              {/* Grid of coverage points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {regionalCoverage.map((cov, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-[#FF5665]/25 transition-all">
                    <div className="flex items-center gap-1.5 text-[#FF5665] mb-1 font-mono text-[10px] font-bold uppercase">
                      <MapPin size={12} className="shrink-0" />
                      <span>{cov.area}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-tight">
                      {cov.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* SLA details */}
              <div className="bg-[#FF5665]/5 border border-[#FF5665]/15 p-4 rounded-xl flex items-center gap-3">
                <CheckCircle2 size={16} className="text-[#FF5665] shrink-0" />
                <span className="text-[11px] text-gray-300 leading-normal font-sans">
                  <strong>Garantía de Altura:</strong> Diseñado para soportar vientos de hasta 140 km/h, granizo, hielo andino y temperaturas inferiores a -20°C en toda la cordillera.
                </span>
              </div>
            </motion.div>

            {/* Realistic human-experience grids */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fieldExps.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-[#07090e]/85 border border-white/10 hover:border-[#FF5665]/30 rounded-2xl overflow-hidden group transition-all shadow-xl"
                >
                  <div className="h-28 overflow-hidden relative">
                    <img 
                      src={exp.image} 
                      alt={exp.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.35] contrast-[1.15] saturate-[0.45]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-black/60 to-black/30 animate-pulse-slow" />
                    <span className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-[#FF5665]/15 border border-[#FF5665]/30 text-[#FF5665] text-[8px] font-mono font-bold tracking-widest uppercase">
                      {exp.type}
                    </span>
                  </div>
                  <div className="p-4 bg-transparent font-light">
                    <h4 className="text-white font-bold text-xs tracking-tight uppercase font-display">{exp.title}</h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed mt-1">
                      {exp.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
