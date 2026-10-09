import { motion } from 'motion/react';
import { Wifi, Router, Cable, Zap, ChevronRight } from 'lucide-react';

export default function KitStarlink() {
  const kitParts = [
    {
      name: "Antena Starlink (Mini / Stand)",
      desc: "Diseño compacto ultra-ligero y aerodinámico, resistente a climas extremos (-30°C a 50°C). Optimizada con soporte magnético de neodimio de alta tracción para uso móvil.",
      icon: Wifi
    },
    {
      name: "Router integrado",
      desc: "Cobertura amplia de banda dual integrada de última gama (Wi-Fi 6) para conectar de forma fluida múltiples dispositivos sin pérdidas en caminos agrestes.",
      icon: Router
    },
    {
      name: "Cableado Reforzado",
      desc: "Cables de exterior con blindaje electromagnético y protección UV para evitar la erosión de nieve, sol andino o climas de alta montaña severos.",
      icon: Cable
    },
    {
      name: "Alimentación Nativa 12/24V",
      desc: "Fuente customizada de 12V-24V a 30V diseñada por nuestro equipo para conexión directa al encendedor vehicular, eliminando inversores ineficientes.",
      icon: Zap
    }
  ];

  return (
    <section className="py-32 bg-transparent relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0E14] via-[#0B0E14]/80 to-[#0B0E14] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full max-w-6xl">
        <div className="text-center mb-24">
          <h2 className="text-sm font-mono tracking-[0.2em] text-[#FF5665] mb-4 uppercase inline-flex items-center gap-2">
            <span className="w-8 h-[2px] bg-[#FF5665]"></span>
            Servicio Extra
            <span className="w-8 h-[2px] bg-[#FF5665]"></span>
          </h2>
          <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold max-w-4xl mx-auto mt-4">
            Internet Satelital: <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#F97316]">
              Kit Starlink
            </span>
          </h3>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto font-light text-lg">
            Para aquellos proyectos que requieren comunicación en sitios remotos, ofrecemos como servicio extra el Kit Starlink. Todo lo que necesitás para conectarte a internet de alta velocidad en cualquier lugar.
          </p>
        </div>

        <div className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {kitParts.map((part, idx) => (
               <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:border-[#FF5665]/50 hover:shadow-[0_10px_30px_rgba(255,86,101,0.1)] transition-all group backdrop-blur-sm flex flex-col justify-between">
                 <div>
                   <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:border-[#FF5665] group-hover:text-[#FF5665] transition-colors relative overflow-hidden">
                      <div className="absolute inset-0 bg-[#FF5665]/20 scale-0 group-hover:scale-100 transition-transform rounded-2xl" />
                      <part.icon className="text-white group-hover:text-[#FF5665] relative z-10 transition-colors" size={24} />
                   </div>
                   <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{part.name}</h4>
                 </div>
                 <p className="text-gray-400 text-sm leading-relaxed mt-2">{part.desc}</p>
               </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center"
          >
            <a href="#contacto" className="inline-flex items-center gap-2 text-[#0B0E14] font-extrabold bg-[#FF5665] hover:bg-white hover:text-[#FF5665] px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(255,86,101,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 text-base uppercase tracking-wider">
              Quiero mi Kit <ChevronRight size={18} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
