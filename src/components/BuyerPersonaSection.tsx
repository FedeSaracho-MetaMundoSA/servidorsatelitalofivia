import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, ShieldCheck, Users, TrendingUp, AlertTriangle, CheckCircle2, Video } from 'lucide-react';

interface Persona {
  role: string;
  icon: any;
  pain: string;
  solution: string;
  tag: string;
}

export default function BuyerPersonaSection() {
  const personas: Persona[] = [
    {
      role: "Gerente de Operaciones",
      icon: Briefcase,
      tag: "CONTINUIDAD OPERATIVA",
      pain: "Días de vehículo parado, fricción administrativa y disputas de responsabilidad.",
      solution: "Menos fricción, velocidad en armado de informes y decisiones ágiles para dar continuidad al servicio."
    },
    {
      role: "Seguridad e Higiene / Riesgos",
      icon: ShieldCheck,
      tag: "CUMPLIMIENTO & AUDITORÍA",
      pain: "Reclamos mal documentados, falta de pruebas y riesgo legal por versiones contradictorias.",
      solution: "Evidencia confiable, trazabilidad para auditorías y protección al conductor que actuó correctamente."
    },
    {
      role: "Recursos Humanos / Formación",
      icon: Users,
      tag: "COACHING DE CONDUCCIÓN",
      pain: "Sensación de \"persecución o vigilancia\" por parte de los choferes.",
      solution: "Coaching basado en hechos imparciales. Reconocimiento de buenas prácticas y prevención justa."
    },
    {
      role: "Dirección General",
      icon: TrendingUp,
      tag: "RENTABILIDAD & KPIs",
      pain: "Costos invisibles elevados e incremento en primas de seguro.",
      solution: "Reducción directa de frecuencia de siniestros, indicadores (KPIs) claros y menor desgaste de flota."
    }
  ];

  return (
    <section id="roles-corporativos" className="py-24 bg-transparent relative border-b border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5665]/10 border border-[#FF5665]/30 text-[#FF5665] text-xs font-mono font-bold uppercase tracking-widest">
            <Video size={14} className="animate-pulse" />
            <span>Fase V • Video Telemática & Dashcams IA</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
            Cuadro Argumental por <span className="text-[#FF5665]">Rol Corporativo</span>
          </h2>
          
          <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed">
            &ldquo;Los siniestros no solo cuestan por el choque: cuestan por el tiempo perdido y la incertidumbre.&rdquo; 
            Vea cómo la tecnología Ubitrack Pro resuelve el dolor específico de cada área directiva de su empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personas.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-black/35 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#FF5665]/50 transition-all duration-300 group shadow-xl"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF5665]/10 border border-[#FF5665]/30 flex items-center justify-center text-[#FF5665] group-hover:scale-110 transition-transform">
                      <p.icon size={20} />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono font-bold tracking-widest text-[#FF5665] uppercase block">
                        {p.tag}
                      </span>
                      <h3 className="text-lg font-display font-bold text-white uppercase tracking-tight">
                        {p.role}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
                      <AlertTriangle size={14} />
                      <span>El Dolor Principal</span>
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
                      {p.pain}
                    </p>
                  </div>

                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-1.5">
                      <CheckCircle2 size={14} />
                      <span>Solución Servidor Satelital + Ubitrack Pro</span>
                    </div>
                    <p className="text-emerald-100/90 text-xs sm:text-sm font-medium leading-relaxed">
                      {p.solution}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                <span>IMPACTO B2B DIRECTO</span>
                <span className="text-[#FF5665] font-bold">100% EVIDENCIA OBJETIVA</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#FF5665]/10 via-[#0a0d14] to-blue-500/10 border border-[#FF5665]/30 rounded-2xl p-6 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <p className="text-white font-display font-bold text-sm sm:text-base uppercase tracking-tight">
              ¿Desea realizar una prueba piloto de Video Telemática Activa en su flota?
            </p>
            <p className="text-gray-400 text-xs font-light">
              Instalación rápida en 45 minutos por unidad con soporte local en Salta, Jujuy y Catamarca.
            </p>
          </div>
          <button
            onClick={() => {
              window.openWhatsAppSelector?.('gestion-siniestros-coaching-flotas');
            }}
            className="whitespace-nowrap px-6 py-3 bg-[#FF5665] text-[#040609] font-mono text-xs font-black uppercase tracking-wider rounded-xl hover:bg-white transition-colors cursor-pointer border-b-4 border-b-rose-800"
          >
            Solicitar Demostración
          </button>
        </div>

      </div>
    </section>
  );
}
