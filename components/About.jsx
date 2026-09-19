"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Sparkles, Palette, Video, Layers, Award, GraduationCap, ArrowUpRight, Download, CheckCircle, Briefcase, UserCheck, Wrench, Mail } from "lucide-react";

const EASE = [0.76, 0, 0.24, 1];

const STATS = [
  { value: "02+", label: "Years Experience" },
  { value: "150+", label: "Creative Assets Delivered" },
  { value: "15+", label: "Premium Brands Managed" },
  { value: "100%", label: "Client Satisfaction" },
];

const EXPERIENCE_TIMELINE = [
  {
    period: "Feb 2026 – Present",
    role: "CBO & Co-Founder / Creative Project Lead",
    company: "SaltnPepper",
    desc: "Overseeing design projects across digital, print, and brand communication. Delivered ~150 creative assets for F&B & lifestyle brands, managing a team of designers, interns & freelancers.",
  },
  {
    period: "Aug 2025 – Jan 2026",
    role: "Graphic Designer / Social Media Manager",
    company: "Social Spork",
    desc: "Managed social strategy & creative execution for 7 simultaneous client accounts including La Isla, Clayoven, Drums of Heaven, Sethi Bakers, Pluto Pizza, and Tealogy.",
  },
  {
    period: "June 2025 – July 2025",
    role: "Graphic Designer & Video Editor",
    company: "Digital Palmy Inc.",
    desc: "Designed static & motion campaign content for Bluemoon Gin, Whiskey Sambha, Mezze Mambo, and Royal Biryani House.",
  },
  {
    period: "Aug 2024 – Jan 2025",
    role: "Graphic Designer & Video Editor",
    company: "Creator’s Commune",
    desc: "Created multi-channel graphic and video campaigns for clients including Millium, CarryKar, and Miniplex.",
  },
  {
    period: "Apr 2023 – Sep 2023",
    role: "Influencer Marketing Intern",
    company: "Utopic Network",
    desc: "Supported influencer campaigns for global brands including Coke Studio, Amazon, Nivea, Samsung, Dabur, Rapido, and Puma.",
  },
];

const BRANDS = [
  "Coke Studio", "Amazon", "Samsung", "Nivea", "Puma", "Bluemoon Gin",
  "Whiskey Sambha", "La Isla", "Clayoven", "Drums of Heaven", "Sethi Bakers", "Pluto Pizza"
];

const CORE_SKILLS = [
  "Graphic Design", "Brand Identity & Strategy", "Visual Communication",
  "Social Media Design", "Packaging Design", "Print & Layout Design",
  "Motion Graphics & Video Editing", "Typography & Pitch Decks", "Digital Campaigns"
];

const TOOLS = [
  "Adobe Photoshop", "Adobe Illustrator", "Adobe Premiere Pro",
  "Adobe After Effects", "Canva", "AI Design Tools"
];

const EDUCATION = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Amity University Online",
    year: "2023 – 2026",
  },
  {
    degree: "Diploma in Animation & Film Making",
    institution: "MAAC South Ex",
    year: "2024 – 2025",
  },
  {
    degree: "Diploma in Digital Video & Broadcast Animations",
    institution: "YMCA (Young Men's Christian Association)",
    year: "2023 – 2024",
  },
];

// 4 Component cards that pop out from behind the profile image on hover
const HOVER_BLOCKS = [
  {
    id: "work",
    title: "Selected Work",
    subtitle: "La Isla, Bluemoon Gin & SaltnPepper",
    icon: Briefcase,
    href: "/work",
    xOffset: -220,
    yOffset: -120,
    rotate: -6,
  },
  {
    id: "about",
    title: "About Vansh",
    subtitle: "2+ Years Experience & BCA",
    icon: UserCheck,
    href: "/about",
    xOffset: 220,
    yOffset: -120,
    rotate: 6,
  },
  {
    id: "skills",
    title: "Core Skills",
    subtitle: "Photoshop, Illustrator & Motion",
    icon: Wrench,
    href: "/about",
    xOffset: -210,
    yOffset: 130,
    rotate: -4,
  },
  {
    id: "contact",
    title: "Contact",
    subtitle: "bvansh418@gmail.com",
    icon: Mail,
    href: "/contact",
    xOffset: 210,
    yOffset: 130,
    rotate: 4,
  },
];

export default function About({ started, revealed, onReveal }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* ============ HERO SECTION ============ */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col justify-center items-center px-5 pb-16 pt-24 md:px-10 md:pt-28"
      >
        {/* Unrevealed Intro State: Central Bouncy Profile Focus */}
        <AnimatePresence>
          {!revealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.6 } }}
              className="z-30 relative flex items-center justify-center text-center cursor-pointer min-h-[500px] w-full"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Component Blocks Emerging Out From Behind the Image on Hover */}
              {HOVER_BLOCKS.map((block, i) => {
                const IconComponent = block.icon;
                return (
                  <motion.div
                    key={block.id}
                    initial={{ x: 0, y: 0, scale: 0.2, opacity: 0 }}
                    animate={
                      isHovered
                        ? {
                            x: block.xOffset,
                            y: block.yOffset,
                            scale: 1,
                            opacity: 1,
                            rotate: block.rotate,
                          }
                        : { x: 0, y: 0, scale: 0.2, opacity: 0, rotate: 0 }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 18,
                      delay: i * 0.06,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onReveal();
                    }}
                    className="absolute z-10 hidden md:flex items-center gap-3 glass-card rounded-2xl p-4 border border-gold/40 shadow-2xl shadow-gold/20 text-left hover:border-gold hover:scale-105 transition-transform"
                    style={{ width: "230px" }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold border border-gold/30">
                      <IconComponent size={20} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-hud-text uppercase tracking-wider flex items-center justify-between">
                        {block.title}
                        <ArrowUpRight size={12} className="text-gold" />
                      </p>
                      <p className="text-[10px] text-hud-muted truncate font-mono mt-0.5">
                        {block.subtitle}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

              {/* Central Bouncy Glowing Profile Frame (Front Layer z-20) */}
              <div
                className="relative z-20 group flex items-center justify-center"
                onClick={onReveal}
              >
                <motion.div
                  animate={{
                    y: [0, -16, 0],
                    boxShadow: isHovered
                      ? [
                          "0 0 50px rgba(226, 192, 114, 0.6)",
                          "0 0 90px rgba(226, 192, 114, 0.9)",
                          "0 0 50px rgba(226, 192, 114, 0.6)",
                        ]
                      : [
                          "0 0 35px rgba(226, 192, 114, 0.35)",
                          "0 0 70px rgba(226, 192, 114, 0.75)",
                          "0 0 35px rgba(226, 192, 114, 0.35)",
                        ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative h-56 w-56 rounded-full p-[3px] bg-gradient-to-tr from-gold via-cyan-accent to-gold-light md:h-72 md:w-72 flex items-center justify-center"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-cosmic bg-cosmic-card flex items-center justify-center">
                    <Image
                      src="/profile.jpg"
                      alt="Vansh Bajaj"
                      fill
                      priority
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </motion.div>

                {/* Orbit ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 rounded-full border border-dashed border-gold/40 pointer-events-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Revealed Hero Layout */}
        {revealed && (
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center z-10 pt-12 md:pt-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-widest text-hud-muted"
            >
              <span className="flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-gold font-mono">
                <span className="h-2 w-2 rounded-full bg-gold animate-ping" />
                Open for Branding & Creative Leadership Roles
              </span>
              <span className="text-white/20">•</span>
              <span className="font-mono text-hud-text">South Delhi, New Delhi</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="text-5xl font-extrabold uppercase tracking-tight text-hud-text md:text-8xl lg:text-9xl"
            >
              Vansh <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-cyan-accent">Bajaj</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-4 max-w-3xl text-lg font-light text-hud-muted md:text-2xl"
            >
              Graphic Designer, Brand Strategist & Creative Project Lead. Crafting high-converting visual communications for F&B, lifestyle, and consumer brands.
            </motion.p>

            {/* Central Profile Avatar Anchor */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
              className="my-10 relative group"
            >
              <div className="relative h-44 w-44 rounded-full p-[3px] bg-gradient-to-tr from-gold via-cyan-accent to-gold shadow-2xl shadow-gold/20 md:h-56 md:w-56">
                <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-cosmic bg-cosmic-card">
                  <Image
                    src="/profile.jpg"
                    alt="Vansh Bajaj Profile"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="absolute -bottom-2 right-0 rounded-full border border-gold/40 bg-cosmic-card/90 px-3 py-1.5 text-[11px] font-mono text-gold backdrop-blur-md shadow-lg flex items-center gap-1.5">
                <Palette size={13} /> Brand Identity
              </div>
              <div className="absolute -top-2 left-0 rounded-full border border-cyan-accent/40 bg-cosmic-card/90 px-3 py-1.5 text-[11px] font-mono text-cyan-accent backdrop-blur-md shadow-lg flex items-center gap-1.5">
                <Video size={13} /> Motion & Video
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4 my-8"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-2xl p-6 text-center border border-white/10 hover:border-gold/40 transition-all"
                >
                  <p className="text-3xl font-extrabold text-gold md:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-hud-muted">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Hero CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="flex flex-wrap items-center justify-center gap-4 mt-4"
            >
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.__lenis) window.__lenis.scrollTo("#work");
                  else document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-cosmic transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/30"
              >
                View Works ↓
              </a>
              <Link
                href="/about"
                className="rounded-full border border-gold/40 bg-cosmic-card px-8 py-4 text-sm font-semibold uppercase tracking-wider text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-cosmic flex items-center gap-2"
              >
                Open Full About Webpage <ArrowUpRight size={16} />
              </Link>
              <a
                href="mailto:bvansh418@gmail.com"
                className="rounded-full border border-white/20 bg-cosmic-card px-8 py-4 text-sm font-semibold uppercase tracking-wider text-hud-text transition-all duration-300 hover:border-gold hover:text-gold"
              >
                Direct Contact ✉
              </a>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-16 flex items-center gap-2 text-xs uppercase tracking-widest text-hud-muted"
            >
              <ArrowDown size={14} className="animate-bounce text-gold" />
              Scroll to explore full biography & career history
            </motion.div>
          </div>
        )}
      </section>

      {/* ============ ABOUT / EDITORIAL GRID ============ */}
      {revealed && (
        <section
          id="about"
          className="relative z-10 border-t border-gold/15 bg-cosmic-card/80 px-5 py-24 backdrop-blur-xl md:px-10 md:py-36"
        >
          <div className="max-w-7xl mx-auto grid gap-16 md:grid-cols-12">
            {/* Left Column */}
            <div className="md:col-span-5 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: EASE }}
                className="md:sticky md:top-32 space-y-6"
              >
                <span className="text-xs uppercase tracking-widest text-gold font-mono block">
                  (01) Professional Summary
                </span>
                <h2 className="text-3xl font-medium leading-snug tracking-tight text-hud-text md:text-5xl">
                  Translating brand briefs into high-impact visual stories & campaigns.
                </h2>
                <p className="text-sm leading-relaxed text-hud-muted font-light">
                  With 2+ years of agency & freelance experience, I specialize in digital social content, print, packaging, menus, pitch decks, and brand identity systems for top consumer brands.
                </p>

                {/* Brands worked with pills */}
                <div className="pt-4">
                  <span className="text-xs uppercase tracking-widest text-gold font-mono block mb-3">
                    Brands Worked With
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {BRANDS.map((b) => (
                      <span
                        key={b}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-hud-text"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-7 space-y-16">
              {/* Experience Timeline */}
              <div>
                <span className="text-xs uppercase tracking-widest text-gold font-mono mb-8 block">
                  (02) Work Experience History
                </span>
                <div className="space-y-10 border-l border-gold/20 pl-6 md:pl-8">
                  {EXPERIENCE_TIMELINE.map((item, i) => (
                    <motion.div
                      key={item.company + item.role}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                      className="relative group"
                    >
                      <span className="absolute -left-[31px] md:-left-[39px] top-1.5 h-3 w-3 rounded-full border-2 border-gold bg-cosmic group-hover:bg-gold transition-colors" />
                      <span className="text-xs font-mono text-gold">{item.period}</span>
                      <h3 className="text-xl font-bold text-hud-text mt-1 group-hover:text-gold transition-colors">
                        {item.role} <span className="text-hud-muted font-light">@ {item.company}</span>
                      </h3>
                      <p className="mt-2 text-xs md:text-sm text-hud-muted leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Core Skills & Tools Grid */}
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <span className="text-xs uppercase tracking-widest text-gold font-mono mb-4 block">
                    (03) Core Skills
                  </span>
                  <div className="space-y-2">
                    {CORE_SKILLS.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 text-xs font-mono text-hud-text">
                        <CheckCircle size={12} className="text-gold" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-gold font-mono mb-4 block">
                    (04) Software & Tools
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {TOOLS.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-xs font-mono text-gold"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Academic History */}
              <div className="border-t border-white/10 pt-10">
                <span className="text-xs uppercase tracking-widest text-gold font-mono mb-6 block flex items-center gap-2">
                  <GraduationCap size={16} /> (05) Academic Qualifications
                </span>
                <div className="space-y-4">
                  {EDUCATION.map((edu) => (
                    <div
                      key={edu.degree}
                      className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-2"
                    >
                      <div>
                        <h4 className="text-base font-bold text-hud-text">{edu.degree}</h4>
                        <p className="text-xs text-hud-muted">{edu.institution}</p>
                      </div>
                      <span className="text-xs font-mono text-gold">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dedicated Webpage Redirect Button */}
              <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-bold text-hud-text">Explore Full Biography & Case Studies</h4>
                  <p className="text-xs text-hud-muted">Visit the dedicated About webpage for complete details.</p>
                </div>
                <Link
                  href="/about"
                  className="rounded-full border border-gold/50 bg-gold/10 px-6 py-3 text-xs font-mono text-gold hover:bg-gold hover:text-cosmic transition-all shrink-0 flex items-center gap-2"
                >
                  Open Dedicated About Webpage <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
