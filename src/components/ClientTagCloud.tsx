import { motion } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  CheckCircle, 
  FileText,
  Users,
  Lock,
  Globe2,
  PhoneCall
} from 'lucide-react';

interface ClientLogoItem {
  name: string;
  category: string;
  isOfficial?: boolean;
}

const TRACK_1: ClientLogoItem[] = [
  { name: "Poder Judicial Salta", category: "Estado / Justicia", isOfficial: true },
  { name: "EDESA S.A.", category: "Red Eléctrica / Energía" },
  { name: "Vialidad de Salta", category: "Caminos Nacionales", isOfficial: true },
  { name: "Finca Las Nubes", category: "Turismo / Cafayate" },
  { name: "Tren a las Nubes", category: "Vía Turística S.E.", isOfficial: true },
  { name: "Bodega El Esteco", category: "Industria Vitivinícola" },
  { name: "Kaizen Ingeniería", category: "Radio Enlaces" },
  { name: "Aguas del Norte", category: "Control Hídrico S.E.", isOfficial: true }
];

const TRACK_2: ClientLogoItem[] = [
  { name: "911 Emergencias Salta", category: "Seguridad Ciudadana", isOfficial: true },
  { name: "Min. de Salud Salta", category: "Sanidad Parajes", isOfficial: true },
  { name: "Rentas de Salta", category: "Obras Solares", isOfficial: true },
  { name: "Estancia Santa Anita", category: "Agroalimentación" },
  { name: "La Veloz del Norte", category: "Transporte de Flotas" },
  { name: "Coop. Tabacaleros", category: "Servicios Agrícolas" },
  { name: "Tower SRL", category: "Mástiles e Infr." },
  { name: "Control Loop S.A.", category: "Wi-Fi Industrial" }
];

export default function ClientTagCloud() {
  // Duplicate tracks to achieve seamless loop animation
  const track1Loop = [...TRACK_1, ...TRACK_1, ...TRACK_1];
  const track2Loop = [...TRACK_2, ...TRACK_2, ...TRACK_2];

  return (
    <section className="py-20 bg-transparent relative border-b border-white/5 overflow-hidden">
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        @keyframes marqueeRight {
          0% { transform: translate3d(-33.333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .anim-marquee-left {
          animation: marqueeLeft 38s linear infinite;
        }
        .anim-marquee-right {
          animation: marqueeRight 42s linear infinite;
        }
      `}</style>
      
      {/* Decorative background ambient glows */}
      <div className="absolute top-[30%] left-[-200px] w-[500px] h-[500px] bg-[#FF5665]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-200px] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FF5665]/20 bg-[#FF5665]/5 text-[#FF5665] text-[10px] font-mono uppercase tracking-[0.2em] font-extrabold">
            <Users size={12} className="text-[#FF5665]" />
            Clientes Certificados
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white uppercase">
            Trayectoria en Altura
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto font-light leading-relaxed">
            Proveemos equipamiento de radiocomunicación, soportes de fabricación propia e infraestructura satelital a las empresas e instituciones líderes del Norte Argentino.
          </p>
        </div>

        {/* --- INFINITE AUTO-SCROLLING CLIENTS BANNER (Double-Track) --- */}
        <div className="space-y-6 my-10 relative overflow-hidden py-6 bg-white/[0.01] border-y border-white/5">
          
          {/* Edge gradient mask for luxury fading effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-[#030508] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-[#030508] to-transparent z-20 pointer-events-none" />

          {/* Row 1: Scrolling Left */}
          <div className="flex overflow-hidden whitespace-nowrap">
            <div className="flex items-center shrink-0 anim-marquee-left">
              {track1Loop.map((client, idx) => (
                <div 
                  key={`track1-${idx}`}
                  className="inline-flex items-center select-none"
                >
                  <span className="text-sm sm:text-base font-display font-black text-white uppercase tracking-wider">
                    {client.name}
                  </span>
                  <span className="text-xs font-mono text-gray-500 ml-2 font-normal lowercase tracking-wide">
                     ({client.category})
                  </span>
                  <span className="text-xl text-[#FF5665] mx-8 select-none font-bold select-none">•</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Scrolling Right */}
          <div className="flex overflow-hidden whitespace-nowrap">
            <div className="flex items-center shrink-0 anim-marquee-right">
              {track2Loop.map((client, idx) => (
                <div 
                  key={`track2-${idx}`}
                  className="inline-flex items-center select-none"
                >
                  <span className="text-sm sm:text-base font-display font-black text-white uppercase tracking-wider">
                    {client.name}
                  </span>
                  <span className="text-xs font-mono text-gray-500 ml-2 font-normal lowercase tracking-wide">
                     ({client.category})
                  </span>
                  <span className="text-xl text-emerald-400 mx-8 select-none font-bold select-none">•</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Trust Stats & Corporate Certification Panel */}
        <div className="mt-12 grid md:grid-cols-12 gap-6 items-center bg-[#07090e]/85 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Red line top accent */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF5665]/35 to-transparent" />

          {/* Left Column (State Credentials) */}
          <div className="md:col-span-8 space-y-4">
            <span className="inline-block px-2.5 py-1 rounded bg-[#FF5665]/10 border border-[#FF5665]/20 text-[#FF5665] text-[9px] font-mono font-bold tracking-widest uppercase">
              REPUTACIÓN COMPROBABLE
            </span>
            <h3 className="font-display text-2xl font-extrabold text-white uppercase tracking-tight leading-snug">
              PROVEEDOR HOMOLOGADO DEL ESTADO PROVINCIAL
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-3xl font-light">
              Participamos activamente de licitaciones públicas y contrataciones directas ligadas al rubro de telecomunicaciones complejas, suministros tácticos y desarrollo metalmecánico certificado en el NOA.
            </p>
            
            {/* Trust factors badge counters */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white/[0.01] border border-white/5 hover:border-white/10 rounded-xl transition-all">
                <span className="text-[9px] font-mono text-gray-500 uppercase block mb-1">REGISTRO OFICIAL</span>
                <div className="flex items-center gap-2 text-[#FF5665]">
                  <ShieldCheck size={16} />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Prov. Nº 29.345</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  Inscripto formalmente bajo el régimen técnico de Proveedores del Estado Provincial de Salta.
                </p>
              </div>

              <div className="p-4 bg-white/[0.01] border border-white/5 hover:border-white/10 rounded-xl transition-all">
                <span className="text-[9px] font-mono text-gray-500 uppercase block mb-1">ASOCIACIÓN SECTORIAL</span>
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle size={16} />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">CÁMARA Nº 4963</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  Miembro asociado activo a la prestigiosa Cámara de Comercio e Industria de Salta.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (Direct Contact Profile card) */}
          <div className="md:col-span-4 p-5 rounded-2xl bg-black/60 border border-white/5 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[9px] font-mono text-gray-500 uppercase block">REPRESENTANTE EJECUTIVO</span>
              <span className="text-base font-bold text-white font-display block mt-0.5">José Luis Sarapura</span>
              <span className="text-[10px] text-[#FF5665] font-mono font-bold uppercase tracking-wider">Gerente Comercial • Servidor Satelital</span>
            </div>
            
            <p className="text-[11px] text-gray-400 leading-normal font-light">
              ¿Requiere pliegos técnicos, condiciones comerciales específicas, presupuestos oficiales o soporte de ingeniería? Coordinamos de forma presencial u remota de inmediato.
            </p>

            <button
              onClick={() => window.openWhatsAppSelector?.('soporte-tecnico')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-[#FF5665]/10 border border-white/10 hover:border-[#FF5665]/30 text-white hover:text-[#FF5665] rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <PhoneCall size={12} />
              <span>Contacto Directo</span>
            </button>
          </div>
        </div>

        {/* Small footer text */}
        <div className="text-center pt-8">
          <span className="inline-block text-[10px] font-mono text-gray-500">
            * Soporte local y homologación de equipamiento aplicable en toda la provincia de Salta, Jujuy y Tucumán.
          </span>
        </div>

      </div>
    </section>
  );
}
