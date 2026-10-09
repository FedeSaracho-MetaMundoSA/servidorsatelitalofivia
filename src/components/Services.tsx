import { motion } from 'motion/react';
import { TowerControl, SatelliteDish, Wrench, Check } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: "Torres de Comunicación",
      description: "Construcción de Sitios de Telecomunicaciones y obras civiles.",
      icon: TowerControl,
      features: ["Instalación de Monopostes", "Anclajes con Planos Aprobados", "Sistemas de Pararrayos y Balizamiento"],
      highlight: false,
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Orientación de Antenas",
      description: "Servicio especializado de orientación para TV, Internet, Audio, Radios FM, ARSAT, Televisión FTA, Direct TV e INTV.",
      icon: SatelliteDish,
      features: ["Precisión Milimétrica", "Análisis de Cobertura", "Equipos de todas las marcas"],
      highlight: true,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Soporte Técnico",
      description: "Soporte técnico garantizado para todos nuestros productos. Más de 20 años de experiencia.",
      icon: Wrench,
      features: ["Diagnóstico en Terreno", "Reparación Especializada", "Mantenimiento Preventivo"],
      highlight: false,
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-32 bg-transparent relative border-b border-white/5 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[#0F172A]/10 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full max-w-6xl">
        <div className="text-center mb-24">
           <h2 className="text-sm font-mono tracking-[0.2em] text-[#FF5665] mb-4 uppercase">Nuestros Servicios</h2>
           <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold max-w-3xl mx-auto">
             Tecnología de punta <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5665] to-white">
               Aterrizada en tu campo
             </span>
           </h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative group rounded-3xl overflow-hidden flex flex-col h-full 
                ${svc.highlight 
                  ? 'bg-gradient-to-br from-[#0B1330]/40 to-black border-[#FF5665]/50 shadow-[0_0_30px_rgba(255,86,101,0.15)] ring-1 ring-[#FF5665]' 
                  : 'bg-black/40 border-white/10 hover:border-white/30 backdrop-blur-md'} border transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(255,86,101,0.25)]`}
            >
              {svc.highlight && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF5665] to-rose-400 z-20" />
              )}
              
              <div className="h-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10 z-10 animate-pulse-slow" />
                <img 
                   src={svc.image} 
                  alt={svc.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.32] contrast-[1.12] saturate-[0.4]" 
                />
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black via-black/85 to-transparent z-10" />
                
                <div className={`absolute bottom-4 left-6 z-20 p-3 rounded-2xl backdrop-blur-md ${svc.highlight ? 'bg-[#FF5665]/20 text-[#FF5665] border border-[#FF5665]/30' : 'bg-white/10 text-white border border-white/20'}`}>
                  <svc.icon size={24} />
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                {svc.highlight && (
                  <span className="inline-block text-[#FF5665] text-[10px] font-bold uppercase tracking-widest mb-3">PRODUCTO ESTRELLA</span>
                )}
                <h4 className="text-2xl font-display font-medium text-white mb-4">{svc.title}</h4>
                <p className="text-gray-400 font-light mb-8 flex-1 leading-relaxed text-sm">
                  {svc.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {svc.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-gray-300 animate-pulse-slow">
                      <Check size={16} className="text-[#FF5665]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => {
                    const category = idx === 0 ? 'parajes-alta-montana' : 'soporte-tecnico';
                    window.openWhatsAppSelector?.(category);
                  }}
                  className={`w-full py-4 text-center font-bold uppercase tracking-wider rounded-xl transition-all border-b-4 hover:-translate-y-0.5 active:translate-y-0.5 active:border-b-0 cursor-pointer ${
                    svc.highlight 
                      ? 'bg-[#FF5665] text-[#06080c] hover:bg-white hover:text-[#06080c] border-rose-700 font-mono text-xs shadow-lg shadow-[#FF5665]/15' 
                      : 'bg-white/5 border border-white/10 border-b-white/10 text-white hover:bg-white hover:text-black font-mono text-xs'
                  }`}
                >
                  Consultar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
