import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Cpu, ShieldCheck, Wifi, Radio, Download, CheckCircle, AlertCircle, Play, Eye, HardDrive, Zap, Server } from 'lucide-react';

interface TechSpecRow {
  parameter: string;
  factorySpec: string;
  serverSatelitalSpec: string;
}

export default function TelematicsSpecSection() {
  const [activeTab, setActiveTab] = useState<'flow' | 'specs'>('flow');
  const [selectedClipStatus, setSelectedClipStatus] = useState<'yellow' | 'blue' | 'green'>('yellow');

  const specsData: TechSpecRow[] = [
    {
      parameter: "Canales de Cámara",
      factorySpec: "Frontal carretera (Full HD) e Interna de cabina con visión nocturna IR.",
      serverSatelitalSpec: "Carcasa reforzada antivibración apta para caminos de ripio en la Puna y alta montaña."
    },
    {
      parameter: "Memoria y Retención",
      factorySpec: "72 a 96 horas de grabación continua en bucle local.",
      serverSatelitalSpec: "Memoria industrial con protección contra corrupción por corte repentino de energía."
    },
    {
      parameter: "Transmisión en Vivo",
      factorySpec: "Módulo Live Stream (~1 min por solicitud).",
      serverSatelitalSpec: "Operable cuando la unidad está con Contacto ON o en circulación vía 4G o Wi-Fi satelital."
    },
    {
      parameter: "Alertas IA (DMS/ADAS)",
      factorySpec: "Sensor de eventos en tiempo real.",
      serverSatelitalSpec: "Configuración de umbrales para fatiga, uso de celular, distracción, colisión frontal y frenadas."
    },
    {
      parameter: "Alimentación Eléctrica",
      factorySpec: "12V-24V DC Nativo.",
      serverSatelitalSpec: "Regulador DC-DC con supresor de picos de tensión del alternador hasta 35V."
    }
  ];

  const clipStatuses = [
    {
      id: 'yellow',
      code: '🟨 AMARILLO',
      badgeBg: 'bg-amber-500/10 border-amber-500/40 text-amber-400',
      dotColor: 'bg-amber-400 animate-ping',
      title: 'Solicitud Enviada',
      desc: 'Comando de descarga remota de clip de 1 min emitido hacia la memoria industrial de la dashcam.',
      action: 'Esperando acoplamiento de red en unidad'
    },
    {
      id: 'blue',
      code: '🟦 AZUL',
      badgeBg: 'bg-blue-500/10 border-blue-500/40 text-blue-400',
      dotColor: 'bg-blue-400 animate-pulse',
      title: 'Descarga en Proceso',
      desc: 'Transferencia directa de video HD comprimido H.265 vía red 4G LTE o Wi-Fi Starlink Móvil.',
      action: 'Canal criptográfico de datos activo'
    },
    {
      id: 'green',
      code: '🟩 VERDE',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400',
      dotColor: 'bg-emerald-400',
      title: 'Video Disponible HD',
      desc: 'Evidencia resguardada en servidor satelital lista para reproducción continua y auditoría legal.',
      action: 'Evidencia blindada y descargada'
    }
  ];

  return (
    <section id="especificaciones-telematica" className="py-20 bg-[#06080e] border-b border-white/5 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5665]/10 border border-[#FF5665]/30 text-[#FF5665] text-xs font-mono font-bold uppercase tracking-widest mb-3">
              <Video size={14} />
              <span>Ficha Técnica 3.0 • Ubitrack Pro</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              Sistema de Video Telemática & <span className="text-[#FF5665]">Dashcams IA</span>
            </h2>
            <p className="text-gray-400 font-light text-xs sm:text-sm mt-2 max-w-2xl">
              Arquitectura de flujo de datos en tiempo real, transmisión en vivo vía Starlink / 4G y matriz comparativa de optimización especial para ambientes extremos.
            </p>
          </div>

          <div className="flex bg-[#0d111a] p-1.5 rounded-xl border border-white/10 self-stretch sm:self-auto">
            <button
              onClick={() => setActiveTab('flow')}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'flow'
                  ? 'bg-[#FF5665] text-[#040609] shadow-lg shadow-[#FF5665]/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Arquitectura de Flujo
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-[#FF5665] text-[#040609] shadow-lg shadow-[#FF5665]/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Especificaciones de Ingeniería
            </button>
          </div>
        </div>

        {activeTab === 'flow' ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-10"
          >
            {/* Visual Interactive Pipeline */}
            <div className="bg-[#090d16] border border-white/10 rounded-2xl p-6 sm:p-10 relative">
              <div className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-6 flex items-center justify-between">
                <span>Diagrama de Flujo e Integración Antisiniestros</span>
                <span className="text-[#FF5665] font-bold">4G LTE + STARLINK 12V/24V</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {/* Step 1 */}
                <div className="bg-[#0d121f] border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-[#FF5665]/40 transition-colors">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
                      <Video size={20} />
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block mb-1">CAPTURA DUAL IA</span>
                    <h3 className="text-sm font-bold text-white uppercase mb-2">Cámara Dual IA</h3>
                    <p className="text-xs text-gray-400 font-light">
                      Frontal 1080p Full HD + Cabina IR Visión Nocturna. Detección continua.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-[#FF5665]">
                    MEMORIA 72-96HS
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-[#0d121f] border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-[#FF5665]/40 transition-colors">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                      <Cpu size={20} />
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block mb-1">EVENTOS & G-SENSOR</span>
                    <h3 className="text-sm font-bold text-white uppercase mb-2">Analíticas ADAS / DMS</h3>
                    <p className="text-xs text-gray-400 font-light">
                      Detección automática de fatiga, distracción, frenadas bruscas e impactos.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-amber-400">
                    DISPARO AUTOMÁTICO
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-[#0d121f] border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-[#FF5665]/40 transition-colors">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                      <Wifi size={20} />
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block mb-1">CONECTIVIDAD HÍBRIDA</span>
                    <h3 className="text-sm font-bold text-white uppercase mb-2">4G LTE / Wi-Fi Starlink</h3>
                    <p className="text-xs text-gray-400 font-light">
                      Enlace satelital 12V-24V nativo en ruta para transmisión sin importar la cobertura celular.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-blue-400">
                    SWR REDUNDANTE
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-[#0d121f] border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-[#FF5665]/40 transition-colors">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                      <Server size={20} />
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block mb-1">CONTROL 24/7</span>
                    <h3 className="text-sm font-bold text-white uppercase mb-2">Plataforma Ubitrack Pro</h3>
                    <p className="text-xs text-gray-400 font-light">
                      Centro de monitoreo central, streaming en vivo y descarga remota de evidencia.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-emerald-400">
                    EVIDENCIA DISPONIBLE
                  </div>
                </div>
              </div>

              {/* Module Media - Remote Download Statuses (Color Codes) */}
              <div className="mt-10 bg-[#0d121e] border border-white/10 rounded-xl p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-[#FF5665] uppercase tracking-widest font-bold block">
                      MÓDULO MEDIA • CLIPS DE 1 MINUTO
                    </span>
                    <h4 className="text-base font-display font-bold text-white uppercase">
                      Códigos de Color de Descarga Remota
                    </h4>
                  </div>
                  <p className="text-xs text-gray-400 max-w-md">
                    Seleccione un estado para verificar el proceso de descarga directa desde el vehículo en movimiento.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {clipStatuses.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setSelectedClipStatus(st.id as any)}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        selectedClipStatus === st.id
                          ? `${st.badgeBg} shadow-lg`
                          : 'bg-[#090d15] border-white/10 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold uppercase">{st.code}</span>
                        <div className={`w-2.5 h-2.5 rounded-full ${st.dotColor}`} />
                      </div>
                      <h5 className="text-sm font-bold text-white mb-1">{st.title}</h5>
                      <p className="text-xs text-gray-400 font-light leading-relaxed mb-3">{st.desc}</p>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-gray-400 pt-2 border-t border-white/10 flex items-center gap-1.5">
                        <Download size={12} />
                        <span>{st.action}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#090d16] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 bg-[#0d121f] border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-display font-bold text-white uppercase">
                  Tabla de Especificaciones de Ingeniería
                </h3>
                <p className="text-xs text-gray-400 font-light mt-1">
                  Comparativa de parámetros de fábrica vs. optimización especial realizada por Servidor Satelital.
                </p>
              </div>
              <span className="hidden sm:inline-block text-[10px] font-mono text-[#FF5665] bg-[#FF5665]/10 px-3 py-1.5 rounded-md border border-[#FF5665]/30 uppercase font-bold">
                Memoria Industrial 72-96hs
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0b0e17] border-b border-white/10 text-[11px] font-mono text-gray-400 uppercase tracking-wider">
                    <th className="p-4 sm:p-5 font-bold">Parámetro Técnico</th>
                    <th className="p-4 sm:p-5 font-bold">Especificación de Fábrica</th>
                    <th className="p-4 sm:p-5 font-bold text-[#FF5665]">Optimización Especial Servidor Satelital</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {specsData.map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 sm:p-5 font-bold text-white font-mono uppercase tracking-tight">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FF5665]" />
                          <span>{row.parameter}</span>
                        </div>
                      </td>
                      <td className="p-4 sm:p-5 text-gray-300 font-light leading-relaxed">
                        {row.factorySpec}
                      </td>
                      <td className="p-4 sm:p-5 text-emerald-200/90 font-medium leading-relaxed bg-emerald-500/[0.02]">
                        <div className="flex items-start gap-2">
                          <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{row.serverSatelitalSpec}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-[#0c101a] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3 text-gray-400">
                <HardDrive size={18} className="text-[#FF5665]" />
                <span>Memoria con protección contra corrupción por corte repentino de energía.</span>
              </div>
              <button
                onClick={() => {
                  window.openWhatsAppSelector?.('gestion-siniestros-coaching-flotas');
                }}
                className="px-5 py-2.5 bg-[#FF5665] text-[#040609] font-mono text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-white transition-colors cursor-pointer"
              >
                Solicitar Ficha Comercial
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
