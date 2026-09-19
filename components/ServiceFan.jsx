"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Clapperboard, Layers, Palette, Presentation } from "lucide-react";

const services = [
  {
    rank: "01",
    name: "Brand & Visual Identity",
    description: "Building the visual foundation a brand can actually grow on from positioning and logos to identity, packaging, print, and art direction.",
    details: "Brand Positioning · Visual Identity · Logo Design · Packaging · Print · Art Direction",
    icon: Layers,
    angle: -30,
  },
  {
    rank: "02",
    name: "Campaigns & Content",
    description: "Turning one idea into a visual system that works across campaigns, social, and every format in between built to stay consistent without feeling repetitive.",
    details: "Campaign Design · Social Creative · Content Systems · Creative Concepts · Art Direction",
    icon: Palette,
    angle: -10,
  },
  {
    rank: "03",
    name: "Decks & Visual Communication",
    description: "Presentations designed to make ideas land from pitch decks and brand presentations to reports and stories that are meant to be remembered.",
    details: "Pitch Decks · Brand Presentations · Sales Decks · Reports · Information Design",
    icon: Presentation,
    angle: 10,
  },
  {
    rank: "04",
    name: "Motion & Video",
    description: "Bringing visuals to life through purposeful motion, sharp editing, and content built to hold attention from kinetic graphics to short-form video.",
    details: "Motion Design · Kinetic Typography · Video Editing · Reels · Animated Brand Systems",
    icon: Clapperboard,
    angle: 30,
  },
];

export default function ServiceFan() {
  const [activeIndex, setActiveIndex] = useState(null);
  const reduced = useReducedMotion();

  const getAngle = (service, index) => {
    if (activeIndex === null) return service.angle;
    if (index < activeIndex) return service.angle - 12;
    if (index > activeIndex) return service.angle + 12;
    return service.angle;
  };

  return <section className="relative z-10 overflow-hidden border-t border-white/10 bg-cosmic px-5 py-24 md:px-10"><div className="mx-auto max-w-7xl">
    <p className="eyebrow">Service deck</p>
    <div className="mt-5 grid gap-5 md:grid-cols-12 md:items-end"><h2 className="text-4xl font-semibold uppercase tracking-[-0.04em] md:col-span-7 md:text-7xl">What I can build with you.</h2><p className="max-w-md text-hud-muted md:col-span-4 md:col-start-9">Four focused lanes for identity, campaigns, decks, and motion - shaped as systems, not one-off assets.</p></div>
    <div className="service-fan-stage" data-has-active={activeIndex !== null ? "true" : "false"} role="list" aria-label="Design services" onPointerLeave={() => setActiveIndex(null)}>
      {services.map((service,index)=>{const Icon=service.icon;const isActive=activeIndex===index;return <motion.div key={service.name} className="service-fan-pivot" style={{zIndex:isActive?50:index+1}} initial={reduced?{rotate:getAngle(service,index)}:{rotate:0}} animate={{rotate:getAngle(service,index)}} transition={{duration:reduced?0:.65,delay:activeIndex===null&& !reduced?index*.07:0,ease:[.2,.8,.2,1]}}><article className="service-fan-card" data-active={isActive ? "true" : "false"} role="listitem" tabIndex={0} onPointerEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onBlur={() => setActiveIndex(null)}><div className="service-fan-face"><span className="service-fan-rank">{service.rank}</span><Icon className="service-fan-icon" aria-hidden="true"/><div className="service-fan-copy"><h3>{service.name}</h3><p>{service.description}</p><p className="service-fan-details">{service.details}</p></div><span className="service-fan-rank service-fan-rank-bottom">{service.rank}</span></div></article></motion.div>})}
    </div>
  </div></section>;
}
