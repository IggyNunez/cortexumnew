import { useEffect, useRef } from "react";

export default function SandStorm() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const PARTICLE_COUNT = 200;
    let time = 0;

    interface Particle {
      x: number;
      y: number;
      size: number;
      alpha: number;
      baseAlpha: number;
      vx: number;
      vy: number;
      drift: number;
      phase: number;
      life: number;
      maxLife: number;
    }

    function spawnParticle(scattered?: boolean): Particle {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.4 + 0.1;
      return {
        x: scattered ? Math.random() * w : Math.random() * w,
        y: scattered ? Math.random() * h : Math.random() * h,
        size: Math.random() * 2.2 + 0.4,
        alpha: 0,
        baseAlpha: Math.random() * 0.35 + 0.08,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        drift: Math.random() * 2.5 + 0.8,
        phase: Math.random() * Math.PI * 2,
        life: 0,
        maxLife: Math.random() * 500 + 250,
      };
    }

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = spawnParticle(true);
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    function resetParticle(p: Particle) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.4 + 0.1;
      p.x = Math.random() * w;
      p.y = Math.random() * h;
      p.size = Math.random() * 2.2 + 0.4;
      p.baseAlpha = Math.random() * 0.35 + 0.08;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
      p.drift = Math.random() * 2.5 + 0.8;
      p.phase = Math.random() * Math.PI * 2;
      p.life = 0;
      p.maxLife = Math.random() * 500 + 250;
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      time += 0.006;

      // Multi-layered wind currents
      const windX = Math.sin(time * 0.5) * 0.3 + Math.sin(time * 1.1) * 0.2;
      const windY = Math.cos(time * 0.4) * 0.15 + Math.sin(time * 0.8) * 0.1;

      for (const p of particles) {
        p.life++;

        // Smooth fade in/out
        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio < 0.15) {
          p.alpha = p.baseAlpha * (lifeRatio / 0.15);
        } else if (lifeRatio > 0.75) {
          p.alpha = p.baseAlpha * ((1 - lifeRatio) / 0.25);
        } else {
          p.alpha = p.baseAlpha;
        }

        // Organic swirling drift using unique phase offsets
        const driftX = Math.sin(time * 1.0 + p.phase) * p.drift
                     + Math.sin(time * 0.6 + p.phase * 2.3) * p.drift * 0.4;
        const driftY = Math.cos(time * 0.8 + p.phase * 1.7) * p.drift * 0.7
                     + Math.cos(time * 1.4 + p.phase * 0.5) * p.drift * 0.3;

        p.x += p.vx + windX + driftX * 0.12;
        p.y += p.vy + windY + driftY * 0.12;

        // Wrap around screen edges
        if (p.x > w + 30) p.x = -30;
        if (p.x < -30) p.x = w + 30;
        if (p.y > h + 30) p.y = -30;
        if (p.y < -30) p.y = h + 30;

        // Reset if life ended
        if (p.life > p.maxLife) {
          resetParticle(p);
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.alpha})`;
        ctx.fill();

        // Soft glow on larger particles
        if (p.size > 1.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201, 168, 76, ${p.alpha * 0.12})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
