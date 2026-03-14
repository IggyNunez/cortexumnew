import { useEffect, useRef, useId } from "react";
import gsap from "gsap";

// Mystical AI orb — layered glowing sphere with orbiting particles, light rings, organic distortion

export default function MysticOrb({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;

    const ctx = gsap.context(() => {
      // === CORE ORB BREATHING ===
      gsap.to(`.${uid}-core`, {
        scale: 1.08,
        opacity: 0.95,
        transformOrigin: "center center",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // === INNER GLOW PULSE ===
      gsap.to(`.${uid}-inner-glow`, {
        attr: { r: 42 },
        opacity: 0.35,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // === OUTER AURA PULSE ===
      gsap.to(`.${uid}-aura`, {
        attr: { r: 85 },
        opacity: 0.08,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      // === RING ROTATIONS ===
      gsap.to(`.${uid}-ring1`, {
        rotation: 360,
        transformOrigin: "center center",
        duration: 20,
        repeat: -1,
        ease: "none",
      });
      gsap.to(`.${uid}-ring2`, {
        rotation: -360,
        transformOrigin: "center center",
        duration: 30,
        repeat: -1,
        ease: "none",
      });
      gsap.to(`.${uid}-ring3`, {
        rotation: 360,
        transformOrigin: "center center",
        duration: 45,
        repeat: -1,
        ease: "none",
      });

      // === ORBITING PARTICLES ===
      svg.querySelectorAll(`.${uid}-particle`).forEach((p, i) => {
        gsap.to(p, {
          rotation: 360,
          transformOrigin: "100px 100px",
          duration: 8 + i * 4,
          repeat: -1,
          ease: "none",
        });
        gsap.to(p, {
          opacity: 0.15,
          scale: 0.5,
          transformOrigin: "center center",
          duration: 1.5 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });

      // === FLOATING LIGHT MOTES ===
      svg.querySelectorAll(`.${uid}-mote`).forEach((m, i) => {
        const startY = 80 + Math.random() * 40;
        gsap.set(m, { attr: { cy: startY } });
        gsap.to(m, {
          attr: { cy: startY - 15 - Math.random() * 20 },
          opacity: 0,
          duration: 3 + Math.random() * 3,
          repeat: -1,
          ease: "power1.out",
          delay: i * 0.8,
          onRepeat: function () {
            gsap.set(m, {
              attr: {
                cx: 70 + Math.random() * 60,
                cy: 85 + Math.random() * 30,
              },
              opacity: 0.3 + Math.random() * 0.4,
            });
          },
        });
      });

      // === GLOW FILTER ANIMATION ===
      gsap.to(`.${uid}-blur-anim`, {
        attr: { stdDeviation: 12 },
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // === TURBULENCE DISTORTION ===
      gsap.to(`.${uid}-turb`, {
        attr: { baseFrequency: "0.015" },
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, svg);

    return () => ctx.revert();
  }, [uid]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Multi-layer orb glow */}
        <filter id={`${uid}-orb-glow`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur className={`${uid}-blur-anim`} stdDeviation="8" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Organic distortion for the outer aura */}
        <filter id={`${uid}-distort`} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            className={`${uid}-turb`}
            type="fractalNoise"
            baseFrequency="0.008"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="1.5" />
        </filter>

        {/* Subtle ring glow */}
        <filter id={`${uid}-ring-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="rBlur" />
          <feMerge>
            <feMergeNode in="rBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradients */}
        <radialGradient id={`${uid}-core-grad`} cx="45%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFFDF5" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#F5E6B8" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#C9A84C" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>

        <radialGradient id={`${uid}-inner-grad`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E2C97E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>

        <radialGradient id={`${uid}-aura-grad`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={`${uid}-ring-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A08535" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#E2C97E" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#A08535" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* === OUTER DISTORTED AURA === */}
      <circle
        className={`${uid}-aura`}
        cx="100"
        cy="100"
        r="75"
        fill={`url(#${uid}-aura-grad)`}
        filter={`url(#${uid}-distort)`}
        opacity="0.12"
      />

      {/* === ROTATING LIGHT RINGS === */}
      <g filter={`url(#${uid}-ring-glow)`}>
        {/* Ring 1 — wide elliptical orbit */}
        <ellipse
          className={`${uid}-ring1`}
          cx="100"
          cy="100"
          rx="65"
          ry="22"
          fill="none"
          stroke={`url(#${uid}-ring-grad)`}
          strokeWidth="0.5"
          opacity="0.4"
        />

        {/* Ring 2 — tilted orbit */}
        <ellipse
          className={`${uid}-ring2`}
          cx="100"
          cy="100"
          rx="55"
          ry="18"
          fill="none"
          stroke={`url(#${uid}-ring-grad)`}
          strokeWidth="0.4"
          opacity="0.3"
          transform="rotate(60 100 100)"
        />

        {/* Ring 3 — outer dashed orbit */}
        <ellipse
          className={`${uid}-ring3`}
          cx="100"
          cy="100"
          rx="75"
          ry="28"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="0.3"
          opacity="0.15"
          strokeDasharray="3 8"
          transform="rotate(-30 100 100)"
        />
      </g>

      {/* === INNER GLOW HALO === */}
      <circle
        className={`${uid}-inner-glow`}
        cx="100"
        cy="100"
        r="35"
        fill={`url(#${uid}-inner-grad)`}
        opacity="0.25"
      />

      {/* === CORE ORB === */}
      <g filter={`url(#${uid}-orb-glow)`}>
        <circle
          className={`${uid}-core`}
          cx="100"
          cy="100"
          r="14"
          fill={`url(#${uid}-core-grad)`}
          opacity="0.85"
        />
        {/* Hot white center */}
        <circle cx="98" cy="97" r="5" fill="#FFFDF5" opacity="0.6" />
        <circle cx="97" cy="96" r="2" fill="white" opacity="0.8" />
      </g>

      {/* === ORBITING PARTICLES === */}
      <circle className={`${uid}-particle`} cx="140" cy="100" r="1.5" fill="#E2C97E" opacity="0.6" />
      <circle className={`${uid}-particle`} cx="60" cy="100" r="1.2" fill="#F5E6B8" opacity="0.5" />
      <circle className={`${uid}-particle`} cx="100" cy="55" r="1" fill="#C9A84C" opacity="0.7" />
      <circle className={`${uid}-particle`} cx="130" cy="75" r="0.8" fill="#FFFDF5" opacity="0.5" />
      <circle className={`${uid}-particle`} cx="70" cy="130" r="1.3" fill="#E2C97E" opacity="0.4" />
      <circle className={`${uid}-particle`} cx="120" cy="140" r="0.9" fill="#F5E6B8" opacity="0.6" />

      {/* === FLOATING LIGHT MOTES (rising particles) === */}
      <circle className={`${uid}-mote`} cx="85" cy="95" r="0.8" fill="#FFFDF5" opacity="0.5" />
      <circle className={`${uid}-mote`} cx="110" cy="90" r="0.6" fill="#F5E6B8" opacity="0.4" />
      <circle className={`${uid}-mote`} cx="95" cy="100" r="0.7" fill="#E2C97E" opacity="0.6" />
      <circle className={`${uid}-mote`} cx="105" cy="95" r="0.5" fill="white" opacity="0.3" />
      <circle className={`${uid}-mote`} cx="90" cy="105" r="0.9" fill="#F5E6B8" opacity="0.5" />
      <circle className={`${uid}-mote`} cx="115" cy="100" r="0.6" fill="#FFFDF5" opacity="0.4" />
      <circle className={`${uid}-mote`} cx="100" cy="110" r="0.7" fill="#E2C97E" opacity="0.5" />
      <circle className={`${uid}-mote`} cx="80" cy="100" r="0.5" fill="white" opacity="0.35" />
    </svg>
  );
}
