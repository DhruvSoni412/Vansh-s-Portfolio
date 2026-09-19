"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const GREETINGS = [
  "Hello",
  "Bonjour",
  "स्वागत हे",
  "Ciao",
  "Olá",
];
const FLAT = "M0 0 L100 0 L100 0 Q50 0 0 0 Z";
const CURVED = "M0 0 L100 0 L100 30 Q50 112 0 30 Z";
const EASE = [0.76, 0, 0.24, 1];

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("greet"); // greet | curve
  const timerRef = useRef(null);

  useEffect(() => {
    let i = 0;
    const tick = () => {
      if (i < GREETINGS.length) {
        setIndex(i);
        i += 1;
        timerRef.current = setTimeout(tick, 150);
      } else {
        timerRef.current = setTimeout(() => setPhase("curve"), 220);
      }
    };
    timerRef.current = setTimeout(tick, 200);
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-cosmic border-b border-gold/30"
      initial={{ y: 0 }}
      animate={{ y: phase === "curve" ? "-100%" : 0 }}
      transition={{ duration: 1, ease: EASE }}
      onAnimationComplete={() => {
        if (phase === "curve") onComplete();
      }}
    >
      <div className="relative h-20 w-full overflow-hidden flex items-center justify-center">
        {GREETINGS.map((g, i) => (
          <motion.span
            key={g}
            className="absolute inset-0 flex items-center justify-center text-4xl font-extrabold tracking-widest uppercase text-gold md:text-6xl glow-text-gold"
            initial={{ opacity: 0, y: 16 }}
            animate={
              i === index && phase === "greet"
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: -16 }
            }
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {g}
          </motion.span>
        ))}
      </div>

      {/* Morphing curve reveal */}
      <svg
        className="absolute left-0 top-full h-[25vh] w-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          fill="var(--bg)"
          initial={{ d: FLAT }}
          animate={{ d: phase === "greet" ? FLAT : CURVED }}
          transition={{ duration: 1, ease: EASE }}
        />
      </svg>
    </motion.div>
  );
}
