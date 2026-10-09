import React, { useEffect, useRef } from 'react';

interface GlowCanvas3DProps {
  category: string;
}

export default function GlowCanvas3D({ category }: GlowCanvas3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Map category to RGB values for custom glow color
  const getColorRGB = (cat: string): [number, number, number] => {
    switch (cat) {
      case 'modulos':
        return [245, 158, 11]; // Amber
      case 'estructuras':
        return [148, 163, 184]; // Slate/Gray
      case 'baterias':
        return [6, 182, 212]; // Cyan
      case 'controladores':
        return [168, 85, 247]; // Purple
      case 'bombeo':
        return [59, 130, 246]; // Blue
      case 'tableros':
        return [14, 165, 233]; // Sky
      default:
        return [245, 158, 11];
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rgb = getColorRGB(category);
    let width = 0;
    let height = 0;

    // Use ResizeObserver to safely adjust canvas resolution to parent bounds without standard window stretching
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: entryWidth, height: entryHeight } = entry.contentRect;
        width = canvas.width = entryWidth;
        height = canvas.height = entryHeight || 500;
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 500;
    }

    const particles: Particle[] = [];
    const maxParticles = 65;

    // Mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      z: number; // Simulated depth for 3D effect
      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 2 + 0.5; // Depth level
        this.vx = (Math.random() - 0.5) * 0.5 * (1 / this.z);
        this.vy = (Math.random() - 0.5) * 0.5 * (1 / this.z);
        this.size = (Math.random() * 1.8 + 0.5) * this.z;
        this.alpha = Math.random() * 0.4 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Boundary bounce
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Interaction with mouse (subtle magnetic pull)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 0.8;
          this.y -= (dy / dist) * force * 0.8;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${this.alpha * this.z})`;
        ctx.shadowBlur = this.size * 3;
        ctx.shadowColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for line drawing
      }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    let animationFrameId: number;

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Draw constellation connections
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect nodes if close enough
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.15 * Math.min(particles[i].z, particles[j].z);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
            ctx.lineWidth = 0.8 * Math.min(particles[i].z, particles[j].z);
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    // Mouse listener on parent element
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [category]);

  return (
    <canvas
      ref={canvasRef}
      id={`canvas-glow-${category}`}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60 mix-blend-screen z-0"
    />
  );
}
