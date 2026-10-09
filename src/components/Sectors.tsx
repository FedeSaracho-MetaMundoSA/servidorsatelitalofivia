import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Handshake, Bus, Landmark, ChevronRight, CheckCircle2, ShieldAlert, Video, BarChart3, MapPin, Activity, Flame } from 'lucide-react';

interface SectorDetail {
  id: string;
  name: string;
  icon: any;
  title: string;
  highlightTag: string;
  description: string;
  painPoints: string[];
  solutions: string[];
  image: string;
  sla: string;
}

export default function Sectors() {
  const [activeTab, setActiveTab] = useState<string>('rural');

  const sectors: SectorDetail[] = [
    {
      id: 'telematica',
      name: 'Video Telemática IA',
      icon: Video,
      title: 'Video Telemática Activa & Dashcams IA para Flotas NOA',
      highlightTag: 'MONITOREO IA & EVIDENCIA OBJETIVA',
      description: 'Mapeo por sector industrial especializado: Evidencia en video para agilizar reclamos ante aseguradoras, monitoreo en vivo de maniobras en pozos mineros a +4000 msnm y resguardo legal ante incidentes en rutas cordilleranas.',
      painPoints: [
        'Transporte Pesado y Logística: Disputas de responsabilidad prolongadas y demoras en liquidación de siniestros.',
        'Minería y Yacimientos: Dificultad para auditoría de reglas de cabina (uso de cinturón, distracción/fatiga) en zonas sin celular.',
        'Turismo y Flotas Comerciales: Exposición a reclamos fraudulentos de terceros en caminos de alta montaña.'
      ],
      solutions: [
        'Evidencia objetiva en video HD con descarga remota para reducir tiempos de informe e indemnización.',
        'Transmisión en vivo acoplada al Kit Starlink Mini Móvil operando a +4000 msnm.',
        'Resguardo legal y protección de la reputación corporativa ante aseguradoras e inspecciones.'
      ],
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=800&auto=format&fit=crop',
      sla: 'Retención Local: 72 a 96 horas continuas en memoria industrial'
    },
    {
      id: 'rural',
      name: 'Hogares y Rural',
      icon: Home,
      title: 'Internet Satelital para Casas de Campo y Parajes',
      highlightTag: 'COBERTURA EN LUGARES ALEJADOS',
      description: 'Ofrecemos conectividad veloz de banda ancha satelital, soportes metálicos reforzados fáciles de instalar e ingeniería de alimentación de calidad. Diseñado para que tengas internet rápido y estable en cualquier casa, campo, chalet rural, comercio local o paraje de montaña sin importar la distancia.',
      painPoints: [
        'Aislamiento total y nula señal celular o telefónica convencional en parajes rurales.',
        'Cortes de servicio constantes con otros prestadores durante vientos fuertes o lluvias.',
        'Imposibilidad de conectarse para estudiar, teletrabajar, mirar películas o comunicarse.'
      ],
      solutions: [
        'Kits de internet satelital instalados con soportes antiviento de alta resistencia.',
        'Asesoramiento completo desde cero para la compra, activación y configuración de la cuenta.',
        'Señal robusta y routers de gran calidad para cobertura Wi-Fi extendida en patios y galerías.'
      ],
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop', // Cozy cabin in the Andes/mountains
      sla: 'Soporte directo en Salta'
    },
    {
      id: 'cooperativas',
      name: 'Cooperativas',
      icon: Handshake,
      title: 'Cooperativas Eléctricas, Telefónicas y de Servicios Públicos',
      highlightTag: 'REDES DISTRIBUIDAS',
      description: 'Aliados tecnológicos en la provisión de seguridad física y canales redundantes. Apoyamos a cooperativas del NOA en el tendido urbano y rural de comunicaciones con facilidades financieras flexibles adaptadas a economías regionales.',
      painPoints: [
        'Alto costo en la contratación de abonos de conectividad satelital mayorista.',
        'Falta de repuestos y tardanza extrema en la entrega de stock de repuestos de radiocomunicación.',
        'Pérdida de monitoreo de subestaciones transformadoras aisladas.'
      ],
      solutions: [
        'Garantía de stock permanente de hardware en Salta y Jujuy sin esperas comerciales.',
        'Sistemas CCTV y cámaras domos con respaldo directo de grabación SSD local.',
        'Financiación adaptada mediante planes en Cheques de Pago Diferido (CPD).'
      ],
      image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=800&auto=format&fit=crop', // Urban utilities grids
      sla: 'Atención Técnica de Emergencias: 24 hs en campo'
    },
    {
      id: 'transporte',
      name: 'Transporte y Turismo',
      icon: Bus,
      title: 'Transporte de Carga Pesada y Turismo de Aventura NOA',
      highlightTag: 'CONEXIÓN EN TRÁNSITO',
      description: 'Hacemos que sus vehículos operen como oficinas rodantes con enlace permanente. El Kit Starlink Mini Móvil modificado por Servidor Satelital dota a colectivos, minibuses turísticos y camiones transportistas de internet a alta velocidad en pleno movimiento.',
      painPoints: [
        'Zonas rojas en mapas de ruta andina con nula señal móvil para los choferes y pasajeros.',
        'Sistemas de GPS tradicionales que "desaparecen" de las pantallas durante horas críticas.',
        'Fallas constantes en inversores genéricos de 220V instalados informalmente.'
      ],
      solutions: [
        'Sistemas Starlink Mini con alimentación 12V-24V directa (Bajo consumo vehicular).',
        'Montajes de neodimio industrial imantados de alta sujeción (Hasta 140 km/h).',
        'GPS satelital híbrido con cambio automático IP a Wi-Fi satelital ante la pérdida de señal 4G.'
      ],
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=800&auto=format&fit=crop', // Real heavy cargo truck on highway
      sla: 'Conectividad Móvil Promedio: +150 Mbps de descarga'
    },
    {
      id: 'empresas',
      name: 'Empresas y Agro',
      icon: Landmark,
      title: 'Establecimientos Agropecuarios y Pymes Regionales',
      highlightTag: 'RED DE RESPALDO EMPRESARIAL',
      description: 'Llevamos la oficina al campo de forma infalible. Implementamos redes robustas para la administración centralizada de estancias agrícolas, de ganadería o fincas vitivinícolas en cañadones profundos.',
      painPoints: [
        'Incapacidad de emitir guías de transporte o facturarse de manera ágil.',
        'Sistemas de cámaras perimetrales incapaces de alertar robos en tiempo real.',
        'Imposibilidad de realizar videollamadas de coordination técnica con agrónomos.'
      ],
      solutions: [
        'Sistemas conmutadores de failover activo que saltan a satelital en microsegundos.',
        'DVRs de CCTV inteligentes con análisis remoto del perímetro de sus depósitos.',
        'Planos y soportes estructurales aprobados para mástiles estáticos.'
      ],
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
      sla: 'Financiación Directa: Agro-Tarjetas y Convenios pyme'
    }
  ];

  const activeSector = sectors.find(s => s.id === activeTab) || sectors[0];

  const handleSectorContact = (sectorName: string) => {
    const text = encodeURIComponent(`Hola Servidor Satelital, me gustaría solicitar asesoramiento tecnológico enfocado específicamente en soluciones de conectividad de Servidor Satelital para mi sector: ${sectorName}.`);
    window.open(`https://wa.me/5493875843438?text=${text}`, '_blank');
  };

  return (
    <section className="py-32 bg-transparent relative border-b border-white/5 overflow-hidden">
      {/* Radial lighting blur */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#FF5665]/5 blur-[120px] rounded-full point-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full max-w-6xl">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#FF5665]/25 bg-[#FF5665]/5 text-[#FF5665] text-xs font-mono font-bold tracking-wider uppercase mb-4">
            INGENIERÍA APLICADA POR SECTOR
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white mb-4">
            Sectores que Transformamos
          </h2>
          <p className="text-gray-400 font-light max-w-2xl mx-auto text-base sm:text-lg">
            Desplegamos infraestructura de comunicaciones estable adaptándonos a los desafíos y normativas técnicas de cada industria.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SELECTOR TABS COLUMN */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none scroll-smooth">
            {sectors.map((sector) => {
              const IconComp = sector.icon;
              const isActive = sector.id === activeTab;
              return (
                <button
                  key={sector.id}
                  onClick={() => setActiveTab(sector.id)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 whitespace-nowrap lg:whitespace-normal w-auto lg:w-full shrink-0
                    ${isActive 
                      ? 'bg-gradient-to-r from-[#FF5665]/20 to-[#FF5665]/5 border-[#FF5665]/40 text-[#FF5665] shadow-lg shadow-[#FF5665]/5' 
                      : 'bg-black/40 border-white/5 text-gray-400 hover:text-white hover:bg-black/60 hover:border-white/10'}`}
                >
                  <div className={`p-2.5 rounded-xl border ${isActive ? 'bg-[#FF5665]/20 text-[#FF5665] border-[#FF5665]/30' : 'bg-white/5 text-gray-400 border-white/5'}`}>
                    <IconComp size={18} />
                  </div>
                  <div className="block">
                    <p className="text-sm font-bold tracking-tight">{sector.name}</p>
                    <span className="text-[9px] font-mono tracking-wider opacity-60 uppercase block lg:hidden xl:block">
                      {sector.highlightTag.slice(0, 22)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT DETAILED TRANSITION MODULE PANEL */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-black/45 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-10 flex flex-col justify-between min-h-[520px]"
              >
                <div>
                  {/* Photo & title section */}
                  <div className="grid sm:grid-cols-12 gap-6 items-start mb-8">
                    <div className="sm:col-span-4 h-32 rounded-2xl overflow-hidden relative border border-white/10">
                      <img 
                        src={activeSector.image} 
                        alt={activeSector.title} 
                        className="w-full h-full object-cover brightness-[0.35] contrast-[1.12] saturate-[0.45]" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/25 animate-pulse-slow" />
                    </div>
                    <div className="sm:col-span-8">
                      <span className="inline-block px-2.5 py-1 rounded bg-[#F97316]/15 border border-[#F97316]/30 text-[#F97316] text-[9px] font-mono font-bold tracking-widest uppercase mb-2">
                        {activeSector.highlightTag}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight font-sans">
                        {activeSector.title}
                      </h3>
                      <p className="text-rose-400 font-mono text-[10px] uppercase font-bold tracking-wider mt-1.5 flex items-center gap-1.5">
                        <CheckCircle2 size={12} /> {activeSector.sla}
                      </p>
                    </div>
                  </div>

                  {/* Pitch description */}
                  <p className="text-sm text-gray-300 font-light leading-relaxed mb-8">
                    {activeSector.description}
                  </p>

                  {/* Pain Points vs Solutions Split */}
                  <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    {/* Pain Points */}
                    <div className="space-y-3 p-5 rounded-2xl bg-red-500/5 border border-red-500/10">
                      <h4 className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                        <ShieldAlert size={14} /> Puntos Críticos de Dolor
                      </h4>
                      <ul className="space-y-2.5">
                        {activeSector.painPoints.map((pt, i) => (
                           <li key={i} className="text-xs text-gray-400 font-light leading-relaxed flex items-start gap-2">
                            <span className="text-red-500 text-[10px] mt-0.5">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Solutions */}
                    <div className="space-y-3 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.02)]">
                      <h4 className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                        <CheckCircle2 size={14} className="text-emerald-400" /> Solución Servidor Satelital
                      </h4>
                      <ul className="space-y-2.5">
                        {activeSector.solutions.map((sl, i) => (
                          <li key={i} className="text-xs text-white/90 font-medium leading-relaxed flex items-start gap-2">
                            <ChevronRight size={14} className="text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
                            <span>{sl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer and CTA */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="text-[10px] font-mono text-gray-500 text-center sm:text-left">
                    Todos los servicios incluyen garantía oficial de mano de obra y equipos homologados.
                  </span>
                  <button
                    onClick={() => handleSectorContact(activeSector.name)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-[#FF5665]/15 border border-white/10 hover:border-[#FF5665]/40 text-white hover:text-[#FF5665] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border-b-4 border-b-white/10 hover:-translate-y-0.5 active:translate-y-0.5 active:border-b-0 cursor-pointer"
                  >
                    Consultar por {activeSector.name} <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 4.2 INDICADORES CLAVE DE GESTIÓN (KPIs) */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5665]/10 border border-[#FF5665]/30 text-[#FF5665] text-xs font-mono font-bold uppercase tracking-widest mb-2">
              <BarChart3 size={14} />
              <span>4.2 Indicadores Clave de Gestión • Ubitrack Pro</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
              Métricas Operativas y <span className="text-[#FF5665]">KPIs de Flota</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-light mt-1">
              Indicadores objetivos para el control de riesgos, auditoría de seguridad e inteligencia predictiva de conducción.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#080c14] border border-white/10 rounded-2xl p-6 hover:border-[#FF5665]/40 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                  <Activity size={20} />
                </div>
                <span className="text-[10px] font-mono text-gray-500 uppercase font-bold">KPI 01</span>
              </div>
              <h4 className="text-base font-bold text-white uppercase mb-2">
                Eventos de Riesgo / 100 km
              </h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Tasa objetiva de maniobras bruscas, distracciones, giros violentos y alertas ADAS/DMS normalizadas por kilometraje recorrido.
              </p>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-red-400">
                <span>AUDITORÍA CONTINUA</span>
                <span className="font-bold">DESVIACIÓN TÍPICA</span>
              </div>
            </div>

            <div className="bg-[#080c14] border border-white/10 rounded-2xl p-6 hover:border-[#FF5665]/40 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <BarChart3 size={20} />
                </div>
                <span className="text-[10px] font-mono text-gray-500 uppercase font-bold">KPI 02</span>
              </div>
              <h4 className="text-base font-bold text-white uppercase mb-2">
                Evolución & Reincidencia
              </h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Trazabilidad histórica por conductor para coaching específico, reconocimiento de buenas prácticas e incentivos de conducción segura.
              </p>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-amber-400">
                <span>FORMACIÓN IMPARCIAL</span>
                <span className="font-bold">COACHING ADAPTATIVO</span>
              </div>
            </div>

            <div className="bg-[#080c14] border border-white/10 rounded-2xl p-6 hover:border-[#FF5665]/40 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Flame size={20} />
                </div>
                <span className="text-[10px] font-mono text-gray-500 uppercase font-bold">KPI 03</span>
              </div>
              <h4 className="text-base font-bold text-white uppercase mb-2">
                Mapas de Calor Críticos
              </h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Identificación de tramos viales, curvas peligrosas y franjas horarias de mayor incidencia en rutas del NOA para prevención logística.
              </p>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-blue-400">
                <span>GEOFENCING PREVENTIVO</span>
                <span className="font-bold">RUTAS CORDILLERANAS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
