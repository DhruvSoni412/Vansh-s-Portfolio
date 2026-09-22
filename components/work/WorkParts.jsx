"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/** Fade + rise on scroll. Skipped entirely for reduced-motion users. */
export function Reveal({ children, className = "", delay = 0, y = 36 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, className = "" }) {
  return <p className={`font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--pj-accent)] md:text-xs ${className}`}>{children}</p>;
}

/** Display face for headings. Inherits the site font; a project theme can override it via --pj-font-display. */
export const displayFont = { fontFamily: "var(--pj-font-display)" };

/** A project image at its natural aspect ratio, with a blur-up placeholder. */
export function ProjectImage({ img, sizes, priority = false, className = "" }) {
  return (
    <span className="block overflow-hidden rounded-xl bg-[color:var(--pj-surface)] md:rounded-2xl">
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        sizes={sizes}
        priority={priority}
        placeholder={img.blurDataURL ? "blur" : "empty"}
        blurDataURL={img.blurDataURL}
        className={`block h-auto w-full ${className}`}
      />
    </span>
  );
}

export function Caption({ children }) {
  return <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--pj-muted)] md:text-[11px]">{children}</p>;
}
