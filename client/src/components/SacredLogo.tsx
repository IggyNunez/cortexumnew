import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.85 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={
        (stacked ? "flex flex-col items-center gap-2 " : "flex items-center gap-3 ") +
        className
      }
    >
      <img
        src="/assets/cortexuum-hero-logo.png"
        alt="Cortexuum"
        className="h-full w-auto object-contain mix-blend-screen"
      />

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
              " font-body font-medium tracking-[0.25em] uppercase text-current opacity-85 block"
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
              Engineering Growth &amp;&nbsp;Transformation
            </motion.span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
