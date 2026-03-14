import { useEffect, useRef, useId } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

// Premium sacred geometry logo with layered glow, GSAP-driven animations, framer-motion entrance

interface SacredLogoProps {
  className?: string;
  showText?: boolean;
  showTagline?: boolean;
  large?: boolean;
  stacked?: boolean;
  animate?: boolean;
}

export default function SacredLogo({
  className = "",
  showText = false,
  showTagline = false,
  large = false,
  stacked = false,
  animate = true,
}: SacredLogoProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    if (!animate || !svgRef.current) return;
    const svg = svgRef.current;
    const ctx = gsap.context(() => {
      // Outer ring slow rotation
      gsap.to(`.${uid}-outer-ring`, {
        rotation: 360,
        transformOrigin: "center center",
        duration: 90,
        repeat: -1,
        ease: "none",
      });

      // Inner ring counter-rotation
      gsap.to(`.${uid}-inner-ring`, {
        rotation: -360,
        transformOrigin: "center center",
        duration: 60,
        repeat: -1,
        ease: "none",
      });

      // Vine branches gentle sway
      gsap.to(`.${uid}-vine-left`, {
        x: -1.5,
        y: 1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(`.${uid}-vine-right`, {
        x: 1.5,
        y: 1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      // Center star pulse
      gsap.to(`.${uid}-star-core`, {
        scale: 1.3,
        opacity: 1,
        transformOrigin: "center center",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Center glow pulse
      gsap.to(`.${uid}-center-glow`, {
        attr: { stdDeviation: 8 },
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Star rays shimmer
      gsap.to(`.${uid}-star-rays`, {
        opacity: 0.4,
        scale: 1.1,
        transformOrigin: "center center",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Cardinal arrows subtle pulse
      gsap.to(`.${uid}-cardinal`, {
        opacity: 0.9,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4,
      });

      // Diamond inner shimmer
      gsap.to(`.${uid}-diamond`, {
        strokeOpacity: 0.5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Draw-on effect for main triangle on load
      const mainTriangle = svg.querySelector(`.${uid}-main-tri`) as SVGPathElement;
      if (mainTriangle) {
        const len = mainTriangle.getTotalLength?.() || 600;
        gsap.set(mainTriangle, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(mainTriangle, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power2.inOut",
          delay: 0.3,
        });
      }

      // Draw-on for inverted triangle
      const invertedTri = svg.querySelector(`.${uid}-inv-tri`) as SVGPathElement;
      if (invertedTri) {
        const len2 = invertedTri.getTotalLength?.() || 400;
        gsap.set(invertedTri, { strokeDasharray: len2, strokeDashoffset: len2 });
        gsap.to(invertedTri, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          delay: 0.8,
        });
      }
    }, svg);

    return () => ctx.revert();
  }, [animate, uid]);

  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.85 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={
        (stacked ? "flex flex-col items-center gap-4 " : "flex items-center gap-3 ") +
        className
      }
    >
      <svg
        ref={svgRef}
        viewBox="0 0 300 300"
        fill="none"
        className="h-full w-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Multi-layer glow filter */}
          <filter id={`${uid}-glow-strong`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur className={`${uid}-center-glow`} stdDeviation="4" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft outer glow for geometry */}
          <filter id={`${uid}-line-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="lineBlur" />
            <feMerge>
              <feMergeNode in="lineBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Radial gold gradient for center */}
          <radialGradient id={`${uid}-gold-radial`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5E6B8" stopOpacity="1" />
            <stop offset="40%" stopColor="#C9A84C" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </radialGradient>

          {/* Gold gradient for strokes */}
          <linearGradient id={`${uid}-gold-stroke`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A08535" />
            <stop offset="50%" stopColor="#E2C97E" />
            <stop offset="100%" stopColor="#A08535" />
          </linearGradient>

          {/* Warm white for star center */}
          <radialGradient id={`${uid}-star-center`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDF5" stopOpacity="1" />
            <stop offset="60%" stopColor="#F5E6B8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        <g transform="translate(150, 150)">
          {/* === AMBIENT GLOW BACKGROUND === */}
          <circle r="100" fill={`url(#${uid}-gold-radial)`} opacity="0.06" />

          {/* === OUTER RINGS === */}
          <circle
            className={`${uid}-outer-ring`}
            r="140"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
            opacity="0.12"
            strokeDasharray="3 8"
          />
          <circle
            className={`${uid}-inner-ring`}
            r="125"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.4"
            opacity="0.15"
            strokeDasharray="1 6"
          />
          <circle r="120" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          <circle
            r="110"
            fill="none"
            stroke={`url(#${uid}-gold-stroke)`}
            strokeWidth="1.2"
            opacity="0.5"
            filter={`url(#${uid}-line-glow)`}
          />

          {/* === VINE / BRANCH PATTERNS — LEFT === */}
          <g
            className={`${uid}-vine-left`}
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.55"
            fill="none"
            strokeLinecap="round"
          >
            <path d="M-5,-110 Q-40,-112 -60,-90 Q-80,-60 -75,-30 Q-70,10 -50,40 Q-30,60 -10,65" />
            <path d="M-35,-100 Q-50,-95 -55,-80" />
            <path d="M-55,-80 Q-45,-75 -40,-65" />
            <path d="M-65,-70 Q-80,-55 -75,-40" />
            <path d="M-75,-40 Q-65,-35 -60,-25" />
            <path d="M-50,-50 Q-65,-40 -70,-25" />
            <path d="M-40,-30 Q-55,-15 -55,5" />
            <path d="M-30,-15 Q-45,0 -40,20" />
            {/* Leaf-like flourishes */}
            <path d="M-60,-85 Q-72,-80 -68,-70" strokeWidth="0.6" opacity="0.4" />
            <path d="M-72,-55 Q-85,-45 -80,-35" strokeWidth="0.6" opacity="0.4" />
            <path d="M-55,-20 Q-68,-10 -62,5" strokeWidth="0.6" opacity="0.35" />
          </g>

          {/* === VINE / BRANCH PATTERNS — RIGHT === */}
          <g
            className={`${uid}-vine-right`}
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.55"
            fill="none"
            strokeLinecap="round"
          >
            <path d="M5,-110 Q40,-112 60,-90 Q80,-60 75,-30 Q70,10 50,40 Q30,60 10,65" />
            <path d="M35,-100 Q50,-95 55,-80" />
            <path d="M55,-80 Q45,-75 40,-65" />
            <path d="M65,-70 Q80,-55 75,-40" />
            <path d="M75,-40 Q65,-35 60,-25" />
            <path d="M50,-50 Q65,-40 70,-25" />
            <path d="M40,-30 Q55,-15 55,5" />
            <path d="M30,-15 Q45,0 40,20" />
            {/* Leaf-like flourishes */}
            <path d="M60,-85 Q72,-80 68,-70" strokeWidth="0.6" opacity="0.4" />
            <path d="M72,-55 Q85,-45 80,-35" strokeWidth="0.6" opacity="0.4" />
            <path d="M55,-20 Q68,-10 62,5" strokeWidth="0.6" opacity="0.35" />
          </g>

          {/* === MAIN GEOMETRIC STRUCTURE === */}
          <g stroke={`url(#${uid}-gold-stroke)`} fill="none" filter={`url(#${uid}-line-glow)`}>
            {/* Main outer triangle — draw-on animated */}
            <path
              className={`${uid}-main-tri`}
              d="M0,-130 L-100,50 L100,50 Z"
              strokeWidth="2"
              opacity="0.9"
            />
            {/* Inner chevron */}
            <path d="M-100,50 L0,-40 L100,50" strokeWidth="1.2" opacity="0.6" />
            {/* Vertical bisector */}
            <path d="M0,-130 L0,50" strokeWidth="0.6" opacity="0.3" strokeDasharray="4 6" />

            {/* Inverted inner triangle — draw-on animated */}
            <path
              className={`${uid}-inv-tri`}
              d="M-60,-50 L60,-50 L0,110 Z"
              strokeWidth="1"
              opacity="0.7"
            />

            {/* Inner diamond */}
            <path
              className={`${uid}-diamond`}
              d="M0,-40 L-30,10 L0,50 L30,10 Z"
              strokeWidth="1"
              opacity="0.8"
            />

            {/* Base line */}
            <line x1="-100" y1="50" x2="100" y2="50" strokeWidth="0.6" opacity="0.4" />

            {/* Subtle inner cross-hatching */}
            <line x1="-50" y1="-50" x2="50" y2="-50" strokeWidth="0.4" opacity="0.2" />
            <line x1="-30" y1="10" x2="30" y2="10" strokeWidth="0.3" opacity="0.15" />
          </g>

          {/* === CARDINAL DIRECTION ARROWS === */}
          <g fill="currentColor" opacity="0.6">
            <path className={`${uid}-cardinal`} d="M0,-148 L5,-134 L0,-138 L-5,-134 Z" />
            <path className={`${uid}-cardinal`} d="M0,148 L5,134 L0,138 L-5,134 Z" />
            <path className={`${uid}-cardinal`} d="M148,0 L134,5 L138,0 L134,-5 Z" />
            <path className={`${uid}-cardinal`} d="M-148,0 L-134,5 L-138,0 L-134,-5 Z" />
          </g>

          {/* === GLOWING CENTER STAR === */}
          <g filter={`url(#${uid}-glow-strong)`}>
            {/* Ambient glow disc */}
            <circle r="12" fill={`url(#${uid}-star-center)`} opacity="0.25" />

            {/* Core star dot */}
            <circle
              className={`${uid}-star-core`}
              r="3.5"
              fill={`url(#${uid}-star-center)`}
              opacity="0.95"
            />

            {/* Star rays — 8-pointed */}
            <path
              className={`${uid}-star-rays`}
              d="M0,-22 L1.5,-4 L22,0 L1.5,1.5 L0,22 L-1.5,1.5 L-22,0 L-1.5,-4 Z"
              fill={`url(#${uid}-star-center)`}
              opacity="0.7"
            />

            {/* Secondary diagonal rays */}
            <path
              className={`${uid}-star-rays`}
              d="M-12,-12 L-1,-1 L12,-12 L1,-1 L12,12 L1,1 L-12,12 L-1,1 Z"
              fill={`url(#${uid}-star-center)`}
              opacity="0.3"
            />
          </g>

          {/* === TINY DECORATIVE DOTS around geometry === */}
          <g fill="currentColor" opacity="0.3">
            <circle cx="-100" cy="50" r="1.5" />
            <circle cx="100" cy="50" r="1.5" />
            <circle cx="0" cy="-130" r="1.5" />
            <circle cx="-60" cy="-50" r="1" />
            <circle cx="60" cy="-50" r="1" />
            <circle cx="0" cy="110" r="1" />
          </g>
        </g>
      </svg>

      {/* === TEXT === */}
      {showText && (
        <motion.div
          initial={animate ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className={stacked ? "text-center" : ""}
        >
          <span
            className={
              (large ? "text-2xl md:text-3xl" : "text-sm") +
              " font-medium tracking-[0.25em] uppercase text-current opacity-85 block"
            }
          >
            Cortexuum
          </span>
          {showTagline && (
            <motion.span
              initial={animate ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className={
                (large ? "text-xs md:text-sm mt-3" : "text-[9px] mt-1") +
                " block tracking-[0.2em] uppercase text-current opacity-35"
              }
            >
              Engineering Growth & Transformation
            </motion.span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
