"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FILTERS, metaLine, projects } from "@/data/work-index";
import { RevealText } from "./MotionText";

/**
 * Card format (Brief): conceptual title -> one-line descriptor -> client/context metadata -> visual preview.
 * A project with a short preview loop shows the loop and nothing else — it starts as soon as the card is on screen,
 * on every device, with no cover still stacked behind it to show through at the edges. The cover image is the
 * fallback for projects without a loop, and for reduced-motion users.
 */
function WorkCard({ project, number, reduced }) {
  const videoRef = useRef(null);
  const showVideo = Boolean(project.previewVideo) && !reduced;

  useEffect(() => {
    if (!showVideo) return;
    const video = videoRef.current;
    if (!video) return;
    // preload="none" means the file is only fetched once play() is called, so off-screen cards stay free.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.25 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [showVideo]);

  return (
    <Link href={`/work/${project.slug}`} className="group block" aria-label={`View ${project.title} · ${project.context}`}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[rgb(var(--surface-rgb))] md:rounded-[2rem]">
        {showVideo ? (
          <video
            ref={videoRef}
            src={project.previewVideo}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 768px) 46vw, 100vw"
            placeholder="blur"
            blurDataURL={project.cover.blurDataURL}
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
          />
        )}
        <span className="absolute left-5 top-5 rounded-full bg-black/45 px-3 py-1.5 font-mono text-xs text-white backdrop-blur-md md:left-6 md:top-6">{number}</span>
        <span className="absolute right-5 top-5 grid h-12 w-12 translate-y-2 place-items-center rounded-full bg-gold text-cosmic opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:right-6 md:top-6 md:h-14 md:w-14"><ArrowUpRight /></span>
      </div>
      <div className="mt-5 md:mt-6">
        <h3 className="text-3xl font-semibold uppercase leading-[.95] tracking-[-0.03em] transition group-hover:text-gold md:text-5xl">{project.title}</h3>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-hud-muted md:text-lg">{project.descriptor}</p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-hud-muted">{metaLine(project)}</p>
      </div>
    </Link>
  );
}

export default function Work({ featured = false }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(FILTERS[0]);

  const counts = useMemo(
    () => Object.fromEntries(FILTERS.map((filter) => [filter, filter === "All" ? projects.length : projects.filter((p) => p.categories.includes(filter)).length])),
    [],
  );
  const shown = featured
    ? projects.filter((p) => p.featured)
    : projects.filter((p) => active === "All" || p.categories.includes(active));

  // Two blocks on purpose: SmoothScroll hides every <section> until 8% of it is on screen, and the full card grid is far
  // taller than that allows on narrow screens (it would never appear). So only the short header/filter block is a
  // <section> (it keeps the #work anchor); the tall grid sits in a plain <div> with the same background and padding.
  return (
    <>
    <section id="work" className="relative z-10 bg-cosmic px-5 pt-24 md:px-10 md:pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 border-b border-white/15 pb-10 md:grid-cols-[0.32fr_1fr] md:items-end md:pb-12">
          <p className="eyebrow">Recent work</p>
          <RevealText as="h2" text="Work that answers a brief." className="block text-5xl font-bold uppercase leading-none md:text-8xl" />
        </div>

        {!featured && (
          <div className="mt-10 md:mt-12">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={active === filter}
                  onClick={() => setActive(filter)}
                  className={`rounded-full border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition md:text-xs ${active === filter ? "border-gold bg-gold text-cosmic" : "border-white/15 text-hud-muted hover:border-gold hover:text-gold"}`}
                >
                  {filter}<span className="ml-2 font-mono text-[10px] opacity-60">{String(counts[filter]).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
            <p className="sr-only" aria-live="polite">Showing {shown.length} {shown.length === 1 ? "project" : "projects"}</p>
          </div>
        )}
      </div>
    </section>

    <div className="relative z-10 bg-cosmic px-5 pb-24 md:px-10 md:pb-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          key={featured ? "featured" : active}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-12 grid items-start gap-x-7 gap-y-16 md:mt-14 md:grid-cols-2"
        >
          {shown.map((project, index) => (
            <motion.article
              key={project.slug}
              initial={reduced ? false : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.8, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Home strip counts 01-04 (per the brief); the full page uses each project's own number. */}
              <WorkCard project={project} number={featured ? String(index + 1).padStart(2, "0") : project.number} reduced={reduced} />
            </motion.article>
          ))}
        </motion.div>

        {featured && <div className="mt-16 flex justify-center"><Link href="/work" className="inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-bold uppercase tracking-wider text-cosmic transition hover:bg-gold-light">View all work <ArrowRight size={17} /></Link></div>}
      </div>
    </div>
    </>
  );
}
