"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const testimonials = [
  {
    name: "Basil",
    role: "Marketing Strategist",
    text: "The pitch deck's conceptualization and execution were spot on, and he still hit the deadline without the design losing an ounce of our identity.",
    proofUrl: "/work/saltnpepper",
  },
  {
    name: "Founder",
    role: "Clayoven",
    text: "The grid and the brand identity system nailed it. That blue captures Clayoven's mood exactly.",
    proofUrl: "/work/nostalgia-reworked",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => setIndex((value) => (value + 1) % testimonials.length), 5200);
    return () => clearInterval(timer);
  }, [reduced]);

  return (
    <section id="testimonials" className="relative z-10 overflow-hidden border-t border-white/10 bg-cosmic px-5 py-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow">Testimonials</p>
            <h2 className="mt-5 text-4xl font-semibold uppercase leading-none md:text-7xl">{"Don't just take my word for it."}</h2>
          </div>
          <p className="max-w-sm text-hud-muted md:col-span-4 md:justify-self-end">A few words from the people who trusted me with their work.</p>
        </div>

        <div className="mt-14 overflow-hidden border-y border-white/10" aria-live="polite">
          <motion.div
            className="flex"
            animate={{ x: `${index * -100}%` }}
            transition={{ duration: reduced ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {testimonials.map((quote, quoteIndex) => (
              <article key={quote.name} className="min-w-full px-1 py-10 md:py-14">
                <Link href={quote.proofUrl} className="group grid gap-8 md:grid-cols-12 md:items-end" aria-label={`View linked work for ${quote.name}`}>
                  <div className="md:col-span-8">
                    <span className="font-mono text-xs text-gold">{String(quoteIndex + 1).padStart(2, "0")}</span>
                    <blockquote className="mt-6 text-3xl font-medium leading-tight md:text-6xl">{`"${quote.text}"`}</blockquote>
                  </div>
                  <div className="md:col-span-4">
                    <p className="text-xl font-semibold uppercase">{quote.name}</p>
                    <p className="mt-2 text-hud-muted">{quote.role}</p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gold">
                      View linked work <ArrowUpRight size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </motion.div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2.5" aria-label="Testimonial slides">
          {testimonials.map((quote, quoteIndex) => (
            <button
              key={quote.name}
              type="button"
              onClick={() => setIndex(quoteIndex)}
              aria-label={`Show testimonial from ${quote.name}`}
              aria-current={index === quoteIndex}
              className={`h-2 w-2 rounded-full border transition ${index === quoteIndex ? "scale-110 border-gold bg-gold" : "border-white/25 bg-white/10 hover:border-gold hover:bg-gold/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
