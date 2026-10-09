import { useState } from 'react';
import { MapPin, Phone, Smartphone, Clock, Facebook, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { CustomLogo } from './Logo';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      return;
    }
    const textMessage = `📋 *CONSULTA DESDE PORTAL WEB*\n` +
                        `-------------------------------------------\n` +
                        `• *Nombre:* ${formData.name}\n` +
                        `• *Email:* ${formData.email || 'No proporcionado'}\n` +
                        `• *Mensaje:* ${formData.message}`;
    
    window.open(`https://wa.me/5493875843438?text=${encodeURIComponent(textMessage)}`, '_blank');
  };

  return (
    <footer className="bg-transparent border-t border-white/5 pt-32 pb-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF5665]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FF5665]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full max-w-6xl">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-16 mb-20 backdrop-blur-md">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Formulario */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 text-gray-300 mb-8">
                <MapPin size={16} className="text-[#FF5665]" />
                <span className="text-xs font-mono tracking-wider font-bold uppercase">Soporte Técnico Especializado</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6 leading-tight">
                Empecemos tu proyecto de <span className="text-gradient font-black">Conectividad</span>
              </h2>
              <p className="text-gray-400 mb-10 max-w-md font-light text-lg">
                Contactá a nuestro equipo de ingenieros. Estamos listos para llevar la mejor tecnología satelital a tu hogar o empresa.
              </p>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="sr-only">Nombre Completo</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Tu nombre completo *"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5665]/50 focus:border-[#FF5665] transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Tu correo electrónico (opcional)"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5665]/50 focus:border-[#FF5665] transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Mensaje</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    required
                    value={formData.message || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="¿En qué podemos ayudarte? *"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF5665]/50 focus:border-[#FF5665] transition-all resize-none"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#FF5665] text-[#06080c] px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,86,101,0.3)] hover:shadow-[0_0_30px_rgba(255,86,101,0.5)] transition-all font-mono uppercase text-xs tracking-wider cursor-pointer"
                >
                  Enviar Mensaje <ArrowRight size={20} />
                </motion.button>
              </form>
            </div>

            {/* Datos de contacto */}
            <div className="space-y-12 lg:pl-10">
              <div>
                <h3 className="text-white font-mono text-[10px] tracking-widest uppercase mb-6 opacity-50 flex items-center gap-2">
                  <span className="w-4 h-[1px] bg-white text-opacity-50"></span>
                  Información de Contacto
                </h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-5 text-gray-300 group">
                    <div className="p-4 bg-black/50 rounded-2xl border border-white/10 group-hover:border-[#FF5665] group-hover:text-[#FF5665] transition-colors">
                      <MapPin size={24} />
                    </div>
                    <div className="pt-1">
                      <p className="font-bold text-white mb-1">Dirección</p>
                      <p className="font-light leading-relaxed">Avda. Usandivaras 1358<br/>Salta | Argentina</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5 text-gray-300 group">
                    <div className="p-4 bg-black/50 rounded-2xl border border-white/10 group-hover:border-[#FF5665] group-hover:text-[#FF5665] transition-colors">
                      <Phone size={24} />
                    </div>
                    <div className="pt-1">
                      <p className="font-bold text-white mb-1">Teléfono / Fax</p>
                      <p className="font-light">(0387) 4341073</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 text-gray-300 group">
                    <div className="p-4 bg-black/50 rounded-2xl border border-white/10 group-hover:border-[#25D366] group-hover:text-[#25D366] transition-colors">
                      <Smartphone size={24} />
                    </div>
                    <div className="pt-1">
                      <p className="font-bold text-white mb-1">Móvil (WhatsApp)</p>
                      <p className="font-light">387 5843438</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 text-gray-300 group">
                    <div className="p-4 bg-black/50 rounded-2xl border border-white/10 group-hover:border-[#FF5665] group-hover:text-[#FF5665] transition-colors">
                      <Clock size={24} />
                    </div>
                    <div className="pt-1">
                      <p className="font-bold text-white mb-1">Horarios de Atención</p>
                      <p className="font-light">Lunes a Viernes<br/>de 9:00 a 13:00 hs y de 16:00 a 20:00 hs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 px-4 border-t border-white/10">
          <CustomLogo className="w-32 opacity-80 mix-blend-screen hover:scale-105 transition-all duration-300" />
          
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <div className="flex gap-3 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              <span>Soporte Técnico en Campo</span>
              <span className="text-[#FF5665]">•</span>
              <span>Infraestructura Satelital</span>
              <span className="text-[#FF5665]">•</span>
              <span>Obras Civiles NOA</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#FF5665] transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <span className="text-[11px] font-mono text-[#FF5665] bg-[#FF5665]/10 px-2.5 py-0.5 rounded-full border border-[#FF5665]/25">
                SLA VIP 24/7
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-mono text-center md:text-right">
              © {new Date().getFullYear()} Servidor Satelital. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
