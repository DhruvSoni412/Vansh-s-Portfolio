"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Mail } from "lucide-react";
import Work from "./Work";
import ServiceFan from "./ServiceFan";
import { VelocityMarquee } from "./MotionText";

export default function HomeContent() {
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0); const rawY = useMotionValue(0);
  const heroX = useSpring(rawX, { stiffness: 120, damping: 18 });
  const heroY = useSpring(rawY, { stiffness: 120, damping: 18 });
  const enter = reduced ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };
  return <div id="main-content">
    <section id="home" className="relative z-10 flex min-h-screen items-center justify-center px-5 py-32 text-center md:px-10"><div className="mx-auto w-full max-w-5xl">
      <motion.p {...enter} className="mb-7 font-mono text-[10px] uppercase tracking-[0.3em] text-hud-muted md:text-xs">Graphic designer · New Delhi</motion.p>
      <motion.h1 {...enter} style={reduced?undefined:{x:heroX,y:heroY}} onMouseMove={(event)=>{if(reduced)return;const box=event.currentTarget.getBoundingClientRect();rawX.set(((event.clientX-box.left)/box.width-.5)*18);rawY.set(((event.clientY-box.top)/box.height-.5)*12)}} onMouseLeave={()=>{rawX.set(0);rawY.set(0)}} transition={{ delay: 0.08 }} className="text-[13vw] font-extrabold uppercase leading-[0.78] tracking-[-0.065em] md:text-[8.5vw] lg:text-[7.5vw]">Vansh<br/><span className="outline-word">Bajaj</span></motion.h1>
      <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-6 border-t border-white/15 pt-7"><p className="text-base leading-relaxed text-hud-muted md:text-xl">{"I don't design pretty. I design impossible to skip."}</p><div className="flex flex-col items-center gap-3 sm:flex-row"><a href="#work" className="inline-flex items-center gap-3 rounded-full bg-gold px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-cosmic transition hover:bg-gold-light md:text-sm">View selected work <ArrowDownRight size={17}/></a><a href="#contact" className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-cosmic/70 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-hud-text transition hover:border-gold hover:text-gold md:text-sm">Start a conversation <Mail size={16}/></a></div></div>
    </div></section>
    <VelocityMarquee text="GRAPHIC DESIGNER" />
    <ServiceFan />
    <Work featured />
    <section id="about" className="relative z-10 bg-cosmic px-5 py-24 md:px-10"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12 md:items-center"><div className="relative aspect-[4/5] overflow-hidden rounded-3xl md:col-span-5"><Image src="/profile.jpg" alt="Vansh Bajaj" fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover grayscale transition duration-700 hover:grayscale-0"/></div><div className="md:col-span-6 md:col-start-7"><p className="eyebrow">A little context</p><h2 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">Design craft, sharpened by two years inside marketing teams.</h2><p className="mt-7 max-w-xl text-lg leading-relaxed text-hud-muted">I work across brand identity, social campaigns, packaging and motion, connecting the visual decision to the job it needs to do for the brand.</p><Link href="/about" className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-bold uppercase tracking-wider text-cosmic">Read the full story <ArrowUpRight size={17}/></Link></div></div></section>
  </div>;
}
