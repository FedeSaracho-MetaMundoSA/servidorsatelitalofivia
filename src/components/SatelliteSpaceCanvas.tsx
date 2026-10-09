import React, { useEffect, useRef, useState } from 'react';
import { Radio, Wifi, Globe, Shield, Sparkles } from 'lucide-react';

export default function SatelliteSpaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Real HD high-resolution space Earth & Starlink satellite images
  const spaceEarthBg = "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=2000&auto=format&fit=crop"; // Earth from space HD
  const starlinkSatImage = "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1000&auto=format&fit=crop"; // Space satellite HD

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse parallax tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Stars background
    const starCount = 150;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
    }));

    let pulseTime = 0;

    const render = () => {
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      const offsetX = (mouseX - width / 2) * 0.02;
      const offsetY = (mouseY - height / 2) * 0.02;

      pulseTime += 0.03;

      ctx.clearRect(0, 0, width, height);

      // Render stars overlay
      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.1) {
          star.speed = -star.speed;
        }
        ctx.fillStyle = star.size > 1.5 ? '#FF1E42' : '#FFFFFF';
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.beginPath();
        ctx.arc(star.x + offsetX, star.y + offsetY, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Draw Starlink satellite laser beam to Salta, Argentina
      const satX = width * 0.72 + offsetX * 1.5;
      const satY = height * 0.28 + offsetY * 1.5;
      const saltaX = width * 0.42 + offsetX * 0.5;
      const saltaY = height * 0.72 + offsetY * 0.5;

      // Laser Beam outer glow
      ctx.strokeStyle = 'rgba(255, 30, 66, 0.6)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(satX, satY);
      ctx.lineTo(saltaX, saltaY);
      ctx.stroke();

      // Laser Core Line
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(satX, satY);
      ctx.lineTo(saltaX, saltaY);
      ctx.stroke();

      // Pulse traveling on laser
      const beamProgress = (pulseTime * 0.8) % 1;
      const pX = satX + (saltaX - satX) * beamProgress;
      const pY = satY + (saltaY - satY) * beamProgress;

      ctx.fillStyle = '#FF1E42';
      ctx.shadowColor = '#FF1E42';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(pX, pY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Salta Ground Station Indicator
      const pulseRadius = (pulseTime * 18) % 45;
      ctx.strokeStyle = `rgba(255, 30, 66, ${1 - pulseRadius / 45})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(saltaX, saltaY, pulseRadius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#FF1E42';
      ctx.beginPath();
      ctx.arc(saltaX, saltaY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Ground HUD Label
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '700 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('ESTACIÓN TERRENA SALTA', saltaX, saltaY + 22);

      ctx.fillStyle = '#FF1E42';
      ctx.font = '600 9px monospace';
      ctx.fillText('COORD: 24°46\'S 65°25\'W', saltaX, saltaY + 34);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#030509]">
      {/* High Definition Real Earth Outer Space Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.45] contrast-[1.15] saturate-[1.1] transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url(${spaceEarthBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#030509]/80 via-transparent to-[#030509]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_20%,#030509_90%)]" />
      </div>

      {/* Stars background canvas */}
      <canvas ref={canvasRef} className="block absolute inset-0 w-full h-full z-10" />
    </div>
  );
}

