import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, Compass, Radio, Snowflake, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export default function WhatsAppModal({ isOpen, onClose, initialCategory }: WhatsAppModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(initialCategory || null);
    }
  }, [isOpen, initialCategory]);

  const WHATSAPP_NUMBERS = {
    standard: '5493875843438',
    sales: '5493875843438'
  };

  const options = [
    {
      id: 'kit-mini',
      title: 'Kit Starlink Mini (Nativo DC)',
      desc: 'Sistemas a 12V/24V ideales para camionetas, vehículos todoterreno y caravanas en movimiento.',
      icon: Compass,
      color: 'from-[#FF5665]/20 to-transparent',
      phone: WHATSAPP_NUMBERS.sales,
      message: 'Hola Servidor Satelital, estoy interesado en consultarle sobre el Kit Starlink Mini adaptado a 12V/24V para mi camioneta / caravana en movimiento.'
    },
    {
      id: 'soportes-magneticos',
      title: 'Soporte Magnético Avanzado',
      desc: 'Bases imantadas de neodimio de alta sujeción homologadas para +140 km/h y antivibración.',
      icon: Radio,
      color: 'from-amber-500/10 to-transparent',
      phone: WHATSAPP_NUMBERS.sales,
      message: 'Hola Servidor Satelital, me interesa solicitar una cotización de soportes imantados antivibración de neodimio homologados.'
    },
    {
      id: 'parajes-alta-montana',
      title: 'Mástiles, Torres y Parajes de Alta Montaña',
      desc: 'Diseño estructural de mástiles, soportes antiviento reforzados, enlaces IP67 y backup satelital.',
      icon: Snowflake,
      color: 'from-blue-500/10 to-transparent',
      phone: WHATSAPP_NUMBERS.sales,
      message: 'Hola Servidor Satelital, requiero coordinar asesoramiento o presupuesto para un proyecto de infraestructura de mástiles y telecomunicaciones en alta montaña.'
    },
    {
      id: 'agro-fincas',
      title: 'Conectividad Rural (Fincas y Agro)',
      desc: 'Establecimientos agropecuarios, repetidoras de señal radial y comunicación en zonas aisladas.',
      icon: ShieldCheck,
      color: 'from-emerald-500/10 to-transparent',
      phone: WHATSAPP_NUMBERS.standard,
      message: 'Hola Servidor Satelital, quiero consultar sobre soluciones de internet satelital, repetidoras de radio y enlaces rurales para mi finca o agro.'
    },
    {
      id: 'soporte-tecnico',
      title: 'Soporte Técnico y Reorientación',
      desc: 'Diagnóstico en terreno, misiones, sellado de conectores, re-instalación y asesoría.',
      icon: MessageSquare,
      color: 'from-[#FF5665]/10 to-transparent',
      phone: WHATSAPP_NUMBERS.standard,
      message: 'Hola Servidor Satelital, preciso soporte técnico especializado para diagnóstico, reorientación o reconfiguración de mi antena.'
    },
    {
      id: 'consulta-general',
      title: 'Consulta General / Presupuesto',
      desc: 'Otra inquietud técnica o comercial para nuestro equipo de ingenieros.',
      icon: HelpCircle,
      color: 'from-gray-500/10 to-transparent',
      phone: WHATSAPP_NUMBERS.standard,
      message: 'Hola Servidor Satelital, quiero hacer una consulta general sobre sus servicios de conectividad y disponibilidad de equipamiento.'
    }
  ];

  const handleSend = (phone: string, message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blurring the bg */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#040609]/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="bg-[#0b0e14] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative z-10 flex flex-col max-h-[90vh] md:max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-white/10 flex items-start justify-between bg-gradient-to-r from-[#FF5665]/5 to-transparent shrink-0">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#FF5665] font-bold block uppercase mb-1">
                  MANDO DIRECTO WHATSAPP
                </span>
                <h3 className="text-xl md:text-2xl font-display font-black text-white">
                  ¿Sobre qué servicio deseas consultar?
                </h3>
                <p className="text-gray-400 text-xs md:text-sm font-light mt-1">
                  Elegí una opción para autocompletar tu consulta técnica con ingeniería local.
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-xl transition-all cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content list (Scrollable) */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-3.5 flex-1 custom-scrollbar">
              {options.map((opt) => {
                const isSelected = selectedCategory === opt.id;
                const IconComponent = opt.icon;

                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedCategory(opt.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? 'bg-[#FF5665]/5 border-[#FF5665] shadow-[0_0_15px_rgba(255,86,101,0.08)]'
                        : 'bg-black/35 border-white/5 hover:border-white/15 hover:bg-white/[0.02]'
                    }`}
                  >
                    {/* Background tint accent */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${opt.color} opacity-30 pointer-events-none`} />

                    {/* Left Icon */}
                    <div className={`p-3 rounded-xl shrink-0 transition-all border ${
                      isSelected
                        ? 'bg-[#FF5665]/20 border-[#FF5665] text-[#FF5665]'
                        : 'bg-white/5 border-white/10 text-gray-400 group-hover:text-[#FF5665] group-hover:border-[#FF5665]/30'
                    }`}>
                      <IconComponent size={20} />
                    </div>

                    {/* Text block */}
                    <div className="flex-1 min-w-0 pr-4">
                      <h4 className="font-bold text-sm md:text-base text-white flex items-center gap-2">
                        {opt.title}
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5665] animate-pulse" />
                        )}
                      </h4>
                      <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>

                    {/* Selected state tick indicator */}
                    <div className="self-center shrink-0">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-[#FF5665] bg-[#FF5665] text-[#06080c]'
                          : 'border-white/10 bg-transparent text-transparent group-hover:border-white/20'
                      }`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer with dispatch action */}
            <div className="p-6 md:p-8 bg-[#090b10] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="text-center sm:text-left">
                {selectedCategory ? (
                  <span className="text-xs text-emerald-400 font-mono flex items-center justify-center sm:justify-start gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Listo para redirigir vía WhatsApp
                  </span>
                ) : (
                  <span className="text-xs text-gray-500 font-mono">
                    Selecciona una opción de arriba para continuar
                  </span>
                )}
              </div>

              <motion.button
                whileHover={selectedCategory ? { scale: 1.02 } : {}}
                whileTap={selectedCategory ? { scale: 0.98 } : {}}
                disabled={!selectedCategory}
                onClick={() => {
                  const curr = options.find(o => o.id === selectedCategory);
                  if (curr) {
                    handleSend(curr.phone, curr.message);
                  }
                }}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2.5 shadow-lg transition-all font-mono text-xs tracking-wider uppercase ${
                  selectedCategory
                    ? 'bg-[#FF5665] text-[#06080c] hover:bg-white hover:text-[#06080c] shadow-[#FF5665]/10 cursor-pointer'
                    : 'bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed'
                }`}
              >
                Enviar a WhatsApp <ArrowRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
