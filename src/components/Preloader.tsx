import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Wifi, 
  Cpu, 
  MapPin, 
  Compass, 
  Milestone,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle,
  Clock
} from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(15);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const logoImageRef = useRef<HTMLImageElement | null>(null);

  // Load the company logo for planet mapping
  useEffect(() => {
    const img = new Image();
    img.src = '/servidor_logo.jpeg';
    img.onload = () => {
      logoImageRef.current = img;
    };
    img.onerror = () => {
      console.warn("Could not load high fidelity logo image. Using procedurally generated digital sphere.");
    };
  }, []);

  // 15 seconds countdown and progress bar
  useEffect(() => {
    const totalDuration = 15000; // 15 seconds
    const intervalFrame = 50; // update speed
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / totalDuration) * 100);
      setProgress(pct);

      const secLeft = Math.max(0, Math.ceil((totalDuration - elapsed) / 1000));
      setSecondsRemaining(secLeft);

      // Slide navigation base
      // 0s to 3s -> Slide 0
      // 3s to 6s -> Slide 1
      // 6s to 9s -> Slide 2
      // 9s to 12s -> Slide 3
      // 12s to 15s -> Slide 4
      const currentSlideIndex = Math.min(4, Math.floor(elapsed / 3000));
      setActiveSlide(currentSlideIndex);

      if (elapsed >= totalDuration) {
        clearInterval(timer);
        onComplete();
      }
    }, intervalFrame);

    return () => clearInterval(timer);
  }, [onComplete]);

  // High-fidelity 3D Planet & Starlink Constellation Rendering on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let angle = 0;
    const particles: { x: number; y: number; z: number; size: number; alpha: number }[] = [];

    // Initialize starry outer-space telemetry grid particles
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 800,
        z: Math.random() * 800 - 400,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight || 450;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = 450;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    // 3D coordinate project helper with focal point depth
    const focalLength = 320;
    const project3D = (x: number, y: number, z: number, width: number, height: number) => {
      const scale = focalLength / (focalLength + z);
      const projX = x * scale + width / 2;
      const projY = y * scale + height / 2;
      return { x: projX, y: projY, scale };
    };

    const drawHorizonGrid = (w: number, h: number, cy: number, radius: number) => {
      // Perspective landscape lattice lines below the planet
      ctx.strokeStyle = 'rgba(255, 86, 101, 0.05)';
      ctx.lineWidth = 1;
      const count = 12;
      for (let i = 0; i <= count; i++) {
        const ratio = i / count;
        const xOffset = (ratio - 0.5) * w * 1.5;
        ctx.beginPath();
        ctx.moveTo(w / 2 + xOffset * 0.1, cy + radius * 1.2);
        ctx.lineTo(w / 2 + xOffset, h);
        ctx.stroke();
      }
      // Horizontal latitude rings
      for (let j = 0; j < 5; j++) {
        const yPos = cy + radius * 1.2 + (j * (h - (cy + radius * 1.2)) / 5);
        ctx.beginPath();
        ctx.ellipse(w / 2, yPos, (j + 1) * 120, (j + 1) * 18, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 86, 101, ${0.07 - j * 0.01})`;
        ctx.stroke();
      }
    };

    const renderLoop = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2 - 10;
      const baseRadius = Math.min(w, h) * 0.28; // Large majestic planet

      ctx.clearRect(0, 0, w, h);
      angle += 0.009; // orbit angle increment

      // 1. Draw space stars in high perspective
      particles.forEach(p => {
        // Simple z-based motion simulating flythrough
        p.z -= 0.6;
        if (p.z < -focalLength) p.z = 400; // reset
        const proj = project3D(p.x, p.y, p.z, w, h);
        if (proj.x >= 0 && proj.x <= w && proj.y >= 0 && proj.y <= h) {
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, p.size * proj.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * proj.scale})`;
          ctx.fill();
        }
      });

      // 2. Draw ground tactical reference lattice
      drawHorizonGrid(w, h, cy, baseRadius);

      // 3. Draw deep solar backdrop glows
      const planetBgGlow = ctx.createRadialGradient(cx, cy, baseRadius * 0.2, cx, cy, baseRadius * 1.8);
      planetBgGlow.addColorStop(0, 'rgba(255, 86, 101, 0.16)');
      planetBgGlow.addColorStop(0.5, 'rgba(16, 185, 129, 0.03)');
      planetBgGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = planetBgGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric outer aura
      const radialAtmosphere = ctx.createRadialGradient(cx, cy, baseRadius * 0.95, cx, cy, baseRadius * 1.15);
      radialAtmosphere.addColorStop(0, 'rgba(255, 86, 101, 0.6)');
      radialAtmosphere.addColorStop(0.3, 'rgba(16, 185, 129, 0.25)');
      radialAtmosphere.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialAtmosphere;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // 4. Draw Starlink Orbital Rings tilting in 3D
      const orbitalPlanes = [
        { radius: baseRadius * 1.6, tiltY: 0.22, rotSpeed: 0.8, color: "rgba(255, 86, 101, 0.25)", satColor: "#FF5665", count: 4, name: "STARLINK CONSTELLATION A" },
        { radius: baseRadius * 1.9, tiltY: -0.15, rotSpeed: -0.6, color: "rgba(16, 185, 129, 0.2)", satColor: "#10B981", count: 5, name: "STARLINK CONSTELLATION B" }
      ];

      // Draw active telemetry vectors inside orbits
      orbitalPlanes.forEach((plane, pIdx) => {
        ctx.beginPath();
        for (let i = 0; i <= 64; i++) {
          const t = (i / 64) * Math.PI * 2;
          const rx = Math.cos(t) * plane.radius;
          const rz = Math.sin(t) * plane.radius;
          // Apply horizontal tilt
          const ry = rz * plane.tiltY;
          const p = project3D(rx, ry, rz, w, h);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = plane.color;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw satellites floating on the orbit track
        for (let sSec = 0; sSec < plane.count; sSec++) {
          const baseOffset = (sSec / plane.count) * Math.PI * 2;
          const currentT = (angle * plane.rotSpeed + baseOffset) % (Math.PI * 2);
          const rx = Math.cos(currentT) * plane.radius;
          const rz = Math.sin(currentT) * plane.radius;
          const ry = rz * plane.tiltY;

          const pSat = project3D(rx, ry, rz, w, h);

          // Render only elements that aren't fully clipped by the planet sphere perspective
          const isBehind = rz > 50; 
          
          if (!isBehind || (isBehind && Math.abs(rx) > baseRadius * 0.95)) {
            // Shiny Core
            ctx.beginPath();
            ctx.arc(pSat.x, pSat.y, 4.5 * pSat.scale, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();

            // Colored Halo Ping
            ctx.beginPath();
            ctx.arc(pSat.x, pSat.y, (8 + Math.sin(Date.now() / 150 + sSec) * 3) * pSat.scale, 0, Math.PI * 2);
            ctx.strokeStyle = plane.satColor;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Solar Panels wings
            ctx.beginPath();
            ctx.moveTo(pSat.x - 12 * pSat.scale, pSat.y - 1.5 * pSat.scale);
            ctx.lineTo(pSat.x + 12 * pSat.scale, pSat.y + 1.5 * pSat.scale);
            ctx.strokeStyle = 'cyan';
            ctx.lineWidth = 2 * pSat.scale;
            ctx.stroke();

            // Laser beam emissions downwards to earth/NOA Target Central
            if (sSec === 0 && Math.floor(Date.now() / 1000) % 2 === 0) {
              ctx.beginPath();
              ctx.moveTo(pSat.x, pSat.y);
              ctx.lineTo(cx + Math.cos(angle * 3) * 20, cy + Math.sin(angle * 3) * 20);
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
              ctx.lineWidth = 1.5 * pSat.scale;
              ctx.stroke();

              // Laser impact flash
              ctx.beginPath();
              ctx.arc(cx + Math.cos(angle * 3) * 20, cy + Math.sin(angle * 3) * 20, 8, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
              ctx.fill();
            }
          }
        }
      });

      // 5. Draw the Majestic Planet Sphere
      ctx.save();
      // Mask sphere path
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
      ctx.clip();

      if (logoImageRef.current) {
        // Draw the image logo wrapped and centered inside the planet
        ctx.fillStyle = '#06080c';
        ctx.fillRect(cx - baseRadius, cy - baseRadius, baseRadius * 2, baseRadius * 2);

        // Draw multiple copies or shifted positions corresponding to rotation to mimic real planetary texture mapping rotation
        const movementShift = (angle * 60) % (baseRadius * 4);
        
        ctx.globalAlpha = 0.88;
        // Slide left logo
        ctx.drawImage(
          logoImageRef.current,
          cx - baseRadius * 2 + movementShift,
          cy - baseRadius,
          baseRadius * 2,
          baseRadius * 2
        );
        // Slide right logo
        ctx.drawImage(
          logoImageRef.current,
          cx - baseRadius * 4 + movementShift,
          cy - baseRadius,
          baseRadius * 2,
          baseRadius * 2
        );
        // Restoring normal alpha
        ctx.globalAlpha = 1.0;

      } else {
        // Procedural Planet grid if logo fails
        ctx.fillStyle = '#0a0d16';
        ctx.fillRect(cx - baseRadius, cy - baseRadius, baseRadius * 2, baseRadius * 2);
        
        ctx.strokeStyle = '#FF5665';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius * 0.7, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw overlay rotating 3D longitudes on the planet surface to achieve a photorealistic spherical simulation
      ctx.lineWidth = 1.5;
      const gridCount = 6;
      for (let j = 0; j < gridCount; j++) {
        const shapeAngle = (angle + (j * Math.PI / gridCount)) % Math.PI;
        const widthModifier = Math.cos(shapeAngle) * baseRadius;

        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(widthModifier), baseRadius, 0, 0, Math.PI * 2);
        ctx.strokeStyle = widthModifier >= 0 ? 'rgba(255, 86, 101, 0.45)' : 'rgba(16, 185, 129, 0.3)';
        ctx.stroke();
      }

      // Overlap latitudes
      const latCount = 5;
      for (let k = 1; k < latCount; k++) {
        const ratio = (k / latCount) * Math.PI;
        const latOffset = Math.cos(ratio) * baseRadius;
        const horizontalRadius = Math.sin(ratio) * baseRadius;

        ctx.beginPath();
        ctx.ellipse(cx, cy + latOffset, horizontalRadius, horizontalRadius * 0.18, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.stroke();
      }

      // Global lighting gradient of the Sphere (Realistic sun glare, shadow termination & glossiness)
      const specularShading = ctx.createRadialGradient(
        cx - baseRadius * 0.35,
        cy - baseRadius * 0.35,
        baseRadius * 0.1,
        cx,
        cy,
        baseRadius
      );
      specularShading.addColorStop(0, 'rgba(255, 255, 255, 0.25)'); // Gloss specular highlight
      specularShading.addColorStop(0.3, 'rgba(255, 86, 101, 0.08)');
      specularShading.addColorStop(0.8, 'rgba(3, 5, 8, 0.7)'); // Terminator shadow edge
      specularShading.addColorStop(1, 'rgba(2, 3, 5, 0.98)'); // Absolute dark side shadow
      
      ctx.fillStyle = specularShading;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Atmospheric outer edge rim light ring
      ctx.strokeStyle = '#FF5665';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Overlap target scanning crosshairs around the spinning planet logo
      ctx.strokeStyle = 'rgba(255, 86, 101, 0.35)';
      ctx.lineWidth = 1.2;
      const borderSize = baseRadius + 22;
      const cornerLength = 16;

      // TOP-LEFT
      ctx.beginPath();
      ctx.moveTo(cx - borderSize, cy - borderSize + cornerLength);
      ctx.lineTo(cx - borderSize, cy - borderSize);
      ctx.lineTo(cx - borderSize + cornerLength, cy - borderSize);
      ctx.stroke();

      // TOP-RIGHT
      ctx.beginPath();
      ctx.moveTo(cx + borderSize, cy - borderSize + cornerLength);
      ctx.lineTo(cx + borderSize, cy - borderSize);
      ctx.lineTo(cx + borderSize - cornerLength, cy - borderSize);
      ctx.stroke();

      // BOTTOM-LEFT
      ctx.beginPath();
      ctx.moveTo(cx - borderSize, cy + borderSize - cornerLength);
      ctx.lineTo(cx - borderSize, cy + borderSize);
      ctx.lineTo(cx - borderSize + cornerLength, cy + borderSize);
      ctx.stroke();

      // BOTTOM-RIGHT
      ctx.beginPath();
      ctx.moveTo(cx + borderSize, cy + borderSize - cornerLength);
      ctx.lineTo(cx + borderSize, cy + borderSize);
      ctx.lineTo(cx + borderSize - cornerLength, cy + borderSize);
      ctx.stroke();

      // Dynamic tech tag coordinates text
      ctx.fillStyle = 'rgba(255, 86, 101, 0.6)';
      ctx.font = '8px monospace';
      ctx.fillText("SATELITE: STARLINK CONSTELLATION ACTIVE", cx - borderSize, cy - borderSize - 8);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.6)';
      ctx.fillText(`GEO_POSITION: PY_NO_A_LAT: -24.78 y LON: -65.41`, cx - borderSize, cy + borderSize + 15);

      animationId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const slideContent = [
    {
      badge: "CONEXIÓN DE LIDERAZGO",
      title: "SERVIDOR SATELITAL",
      subtitle: "Líder regional absoluto en internet satelital de Starlink y telecomunicaciones complejas.",
      location: "SALTA - JUJUY - TUCUMÁN",
      icon: <Globe className="text-[#FF5665]" size={18} />
    },
    {
      badge: "STARLINK INTERNET",
      title: "ALTA VELOCIDAD SIN LÍMITES",
      subtitle: "Banda ancha satelital de baja latencia para hogares rústicos, campos, minas y logística andina.",
      location: "COBERTURA TOTAL RURAL",
      icon: <Wifi className="text-emerald-400" size={18} />
    },
    {
      badge: "SOPORTES DE ALTA MONTAÑA",
      title: "INGENIERÍA METALMECÁNICA PROPIA",
      subtitle: "Fabricación nativa con acero inoxidable ultra-rígido para vehículos en ruta y bases operativas.",
      location: "DISEÑO PROPIO HOMOLOGADO",
      icon: <Cpu className="text-[#FF5665]" size={18} />
    },
    {
      badge: "EQUIPAMIENTO DE ALTURA",
      title: "RADIOS MOTOROLA SOLUCIONES",
      subtitle: "Sistemas digitales y analógicos de alta fidelidad, repuestos homologados y el mayor stock local.",
      location: "FLOTAS Y SEGURIDAD",
      icon: <Compass className="text-emerald-400" size={18} />
    },
    {
      badge: "CONECTIVIDAD GARANTIZADA",
      title: "PREPARADO PARA EL FUTURO S.A.",
      subtitle: "Asistencia certificada 24/7 en campo, repuestos inmediatos y soporte técnico líder del NOA.",
      location: "INICIANDO ACCESO AL PORTAL",
      icon: <Milestone className="text-[#FF5665]" size={18} />
    }
  ];

  return (
    <div className="fixed inset-0 z-[10000] bg-[#020406] flex flex-col justify-between py-6 px-4 sm:px-8 overflow-hidden select-none">
      {/* Dynamic starfield cosmic background */}
      <div className="absolute inset-0 bg-[#030508]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,86,101,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:30px_30px] pointer-events-none opacity-25" />

      {/* Corporate tech header banner */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-between items-center border-b border-white/5 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5665] animate-ping" />
          <span className="font-mono text-[9px] sm:text-[11px] font-black text-white tracking-[0.25em] uppercase">
            SERVIDOR SATELITAL • CINEMATIC PRESENTATION
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right font-mono text-[9px] text-gray-500">
            <span>MODO: ENLACE SATELITAL ESTRELLA</span>
            <span className="text-emerald-400">DISPOSITIVOS CONFIGURADOS: APTO NOA</span>
          </div>
          <button 
            type="button"
            id="btn-skip-intro-top"
            onClick={onComplete}
            className="px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-[10px] tracking-wider font-extrabold uppercase rounded-lg transition-colors cursor-pointer"
          >
            Saltar Intro ↗
          </button>
        </div>
      </div>

      {/* Main cinematic grid - Perfectly Balanced Centerpiece */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 grid md:grid-cols-12 gap-8 items-center my-4 overflow-hidden">
        
        {/* Left Side: 3D Globe Simulator */}
        <div className="md:col-span-7 flex justify-center items-center h-full relative border border-white/5 bg-black/25 rounded-3xl overflow-hidden p-2 min-h-[260px] sm:min-h-[380px] max-h-[440px]">
          {/* Subtle radar scanline overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent h-1/2 w-full animate-pulse pointer-events-none" />
          <div className="absolute top-4 left-4 font-mono text-[9px] text-gray-400 p-2 bg-[#020406]/85 border border-white/5 rounded-md">
            <span className="text-[#FF5665] block font-bold">● SIMULACIÓN ORBITAL REAL</span>
            <span>ALTITUD: 550KM • LEOP PLANET</span>
          </div>
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>

        {/* Right Side: High-Impact Typography Declarations */}
        <div className="md:col-span-5 flex flex-col justify-center space-y-6 px-2 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="space-y-4"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/5 rounded-full">
                {slideContent[activeSlide].icon}
                <span className="text-[10px] sm:text-xs font-mono font-extrabold tracking-widest text-white uppercase">
                  {slideContent[activeSlide].badge}
                </span>
              </div>

              {/* Slide Title */}
              <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase leading-[0.95] drop-shadow-md">
                {activeSlide === 0 ? (
                  <>
                    LÍDER DEL <span className="text-[#FF5665]">NOA</span> EN INTERNET
                  </>
                ) : activeSlide === 1 ? (
                  <>
                    STARLINK <span className="text-emerald-400">SATELITAL</span> RURAL
                  </>
                ) : (
                  slideContent[activeSlide].title
                )}
              </h1>

              {/* Slide Subtitle Description */}
              <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed">
                {slideContent[activeSlide].subtitle}
              </p>

              {/* Geographic anchor tag info */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-gray-500">
                <MapPin size={12} className="text-[#FF5665]" />
                <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-gray-400">
                  {slideContent[activeSlide].location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Quick interactive dots system */}
          <div className="flex gap-2.5 pt-4">
            {slideContent.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                aria-label={`Ir al slide ${dotIdx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide === dotIdx ? 'w-8 bg-[#FF5665]' : 'w-2.5 bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Progressive Enlace Timeline & Quick Instant Loader Trigger */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5 pt-4 shrink-0">
        
        {/* Progress Bar Container */}
        <div className="w-full md:w-3/5 space-y-2">
          <div className="flex justify-between items-center text-[10px] font-mono font-bold text-gray-500">
            <span className="flex items-center gap-1.5">
              <Zap size={11} className="text-emerald-400 animate-bounce" />
              CONECTANDO RECURSOS SATELITALES EN TIEMPO REAL
            </span>
            <span className="text-white">ENLACE {Math.floor(progress)}% COMPLETO</span>
          </div>
          <div className="w-full h-2 bg-white/[0.02] border border-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#FF5665] via-amber-500 to-emerald-500 rounded-full transition-all duration-100 shadow-[0_0_12px_rgba(255,86,101,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Action Skip Counter Button */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3 justify-end shrink-0">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400 bg-white/[0.01] border border-white/5 px-3 py-1.5 rounded-lg">
            <Clock size={11} className="text-emerald-400" />
            <span>Ingreso automático en {secondsRemaining}s</span>
          </div>

          <button
            type="button"
            id="btn-skip-intro-bottom"
            onClick={onComplete}
            className="w-full sm:w-auto px-6 py-3 bg-[#FF5665] hover:bg-rose-500 text-black font-mono font-black text-xs uppercase tracking-widest rounded-xl hover:-translate-y-0.5 active:translate-y-0.5 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer border-b-4 border-rose-700"
          >
            <span>Omitir Intro e Ingresar</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
