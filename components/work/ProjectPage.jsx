"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReelPlayer from "./ReelPlayer";
import { Caption, Eyebrow, ProjectImage, Reveal, displayFont } from "./WorkParts";

/* Tailwind only generates classes it can see as whole strings, so grid positions are looked up rather than interpolated. */
const SPAN = { 2: "md:col-span-2", 3: "md:col-span-3", 4: "md:col-span-4", 5: "md:col-span-5", 6: "md:col-span-6", 7: "md:col-span-7", 8: "md:col-span-8", 9: "md:col-span-9", 10: "md:col-span-10", 12: "md:col-span-12" };
const START = { 1: "md:col-start-1", 2: "md:col-start-2", 3: "md:col-start-3", 4: "md:col-start-4", 5: "md:col-start-5", 6: "md:col-start-6", 7: "md:col-start-7", 8: "md:col-start-8", 9: "md:col-start-9", 10: "md:col-start-10" };
const OFFSET = { 8: "md:mt-8", 12: "md:mt-12", 16: "md:mt-16", 20: "md:mt-20", 24: "md:mt-24", 32: "md:mt-32" };
const ROW_SPAN = { 2: "md:row-span-2" };
const CONTACT_COLS = { 3: "md:grid-cols-3", 4: "md:grid-cols-4", 5: "md:grid-cols-5", 6: "md:grid-cols-6" };
const CONTACT_COLS_MOBILE = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3" };

const HERO_PORTRAIT = {
  5: { text: "md:col-span-6", image: "md:col-span-5 md:col-start-8" },
  6: { text: "md:col-span-5", image: "md:col-span-6 md:col-start-7" },
};
const END_LAYOUT = {
  4: { right: { text: "md:col-span-7 md:col-start-1", image: "md:col-span-4 md:col-start-9" }, left: { image: "md:col-span-4 md:col-start-1", text: "md:col-span-7 md:col-start-6" } },
  5: { right: { text: "md:col-span-6 md:col-start-1", image: "md:col-span-5 md:col-start-8" }, left: { image: "md:col-span-5 md:col-start-1", text: "md:col-span-6 md:col-start-7" } },
};

/* ------------------------------------------------------------------ shared */

function Shell({ id, children, className = "" }) {
  return (
    <section id={id} className={`relative px-5 py-16 md:px-10 md:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function Head({ label, title, note }) {
  if (!label && !title && !note) return null;
  return (
    <div className="mb-10 max-w-3xl md:mb-14">
      {label && <Eyebrow>{label}</Eyebrow>}
      {title && (
        <h2 style={displayFont} className="mt-4 text-4xl font-semibold uppercase leading-[.95] tracking-[-0.03em] md:text-6xl">
          {title}
        </h2>
      )}
      {note && <p className="mt-4 text-lg leading-relaxed text-[color:var(--pj-muted)] md:text-xl">{note}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ hero */

function MetaList({ project }) {
  const labels = project.metaLabels ?? { context: "Client", type: "Industry" };
  const rows = project.type === project.context
    ? [[labels.type, project.type]]
    : [[labels.context, project.context], [labels.type, project.type]];
  if (project.format) rows.push(["Format", project.format]);
  rows.push(["Scope", project.scope.join(" · ")]);
  return (
    <dl className="mt-8 space-y-3 border-t border-[color:var(--pj-line)] pt-6 text-sm md:text-base">
      {rows.map(([term, value]) => (
        <div key={term} className="grid grid-cols-[6.5rem_1fr] gap-4">
          <dt className="pt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--pj-muted)]">{term}</dt>
          <dd className="leading-relaxed">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function TitleBlock({ project, titleClass }) {
  return (
    <>
      <Link href="/work" className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-[color:var(--pj-muted)] transition hover:text-[color:var(--pj-accent)]">
        <ArrowLeft size={16} /> All work
      </Link>
      <Eyebrow className="mt-10 md:mt-14">Project {project.number}</Eyebrow>
      <h1 style={displayFont} className={`mt-4 font-semibold uppercase leading-[.9] tracking-[-0.04em] ${titleClass}`}>
        {project.title}
      </h1>
    </>
  );
}

function Hero({ project }) {
  const { hero } = project;
  const intro = <p className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--pj-muted)] md:text-xl">{project.intro}</p>;

  if (hero.layout === "wide") {
    return (
      <header className="px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <TitleBlock project={project} titleClass="text-[14vw] md:text-[8.4vw]" />
          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
            <div className="md:col-span-5"><MetaList project={project} /></div>
            <div className="md:col-span-6 md:col-start-7">{intro}</div>
          </div>
          <Reveal className="mt-12 md:mt-16" y={24}>
            <ProjectImage img={hero.image} priority sizes="(min-width: 1280px) 1180px, 100vw" />
          </Reveal>
        </div>
      </header>
    );
  }

  if (hero.layout === "portrait") {
    const cols = HERO_PORTRAIT[hero.imageSpan ?? 6];
    return (
      <header className="px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12 md:items-start">
          <div className={cols.text}>
            <TitleBlock project={project} titleClass="text-[13vw] md:text-[5.2vw]" />
            <div className="hidden md:block"><MetaList project={project} />{intro}</div>
          </div>
          <div className={cols.image}>
            <Reveal y={24}>
              <ProjectImage img={hero.image} priority sizes="(min-width: 768px) 560px, 100vw" />
              {hero.caption && <Caption>{hero.caption}</Caption>}
            </Reveal>
          </div>
          <div className="md:hidden"><MetaList project={project} />{intro}</div>
        </div>
      </header>
    );
  }

  if (hero.layout === "reel") {
    return (
      <header className="px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <TitleBlock project={project} titleClass="text-[13vw] md:text-[5.6vw]" />
            <MetaList project={project} />
            {intro}
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal y={24}>
              <ReelPlayer video={hero.video} title={hero.videoTitle} size="xl" />
              <div className="mx-auto mt-6 max-w-[30rem]">
                <Eyebrow>{hero.videoTitle}</Eyebrow>
                <p className="mt-3 text-lg leading-relaxed text-[color:var(--pj-muted)]">{hero.videoDescriptor}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </header>
    );
  }

  // "text": no artwork — the reels themselves are the visual focus
  return (
    <header className="px-5 pb-10 pt-32 md:px-10 md:pb-16 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <TitleBlock project={project} titleClass="text-[14vw] md:text-[9vw]" />
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
          <div className="md:col-span-5"><MetaList project={project} /></div>
          <div className="md:col-span-6 md:col-start-7">{intro}</div>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ sections */

function Gallery({ section }) {
  const { items, layout } = section;

  if (layout === "contact") {
    const cols = section.cols ?? 3;
    return (
      <Shell id={section.id}>
        <Head label={section.label} title={section.title} note={section.note} />
        <div className={`grid items-start gap-3 md:gap-4 ${CONTACT_COLS_MOBILE[section.mobileCols ?? 2]} ${CONTACT_COLS[cols]} ${section.narrow ? "mx-auto max-w-5xl" : ""}`}>
          {items.map((item, i) => (
            <Reveal key={item.img.src} delay={(i % cols) * 0.06} y={28}>
              <figure>
                <ProjectImage img={item.img} sizes={`(min-width: 768px) ${Math.round(1180 / cols)}px, 50vw`} />
                {item.caption && <Caption>{item.caption}</Caption>}
              </figure>
            </Reveal>
          ))}
        </div>
      </Shell>
    );
  }

  // Phone widths: spans of 6+ go full width, smaller ones pair up two-across. A run of half-width items with an odd
  // count would leave a gap beside the last one, so that last item is widened instead.
  const fullOnPhone = items.map((item) => (item.mobile ? item.mobile === "full" : (item.span ?? 6) >= 6));
  let halfRun = 0;
  fullOnPhone.forEach((isFull, i) => {
    if (!isFull) { halfRun += 1; return; }
    if (halfRun % 2 === 1) fullOnPhone[i - 1] = true;
    halfRun = 0;
  });
  if (halfRun % 2 === 1) fullOnPhone[fullOnPhone.length - 1] = true;

  return (
    <Shell id={section.id}>
      <Head label={section.label} title={section.title} note={section.note} />
      <div className="grid grid-cols-12 items-start gap-3 md:gap-6">
        {items.map((item, i) => {
          const span = item.span ?? 6;
          const full = fullOnPhone[i];
          const cls = [
            full ? "col-span-12" : "col-span-6",
            SPAN[span],
            item.start ? START[item.start] : "",
            item.mt ? OFFSET[item.mt] : "",
            item.rowSpan ? ROW_SPAN[item.rowSpan] : "",
          ].join(" ");
          return (
            <Reveal key={item.img.src} className={cls} delay={(i % 3) * 0.06}>
              <figure>
                <ProjectImage img={item.img} sizes={`(min-width: 768px) ${Math.round((span / 12) * 1180)}px, ${full ? "100vw" : "50vw"}`} />
                {item.caption && <Caption>{item.caption}</Caption>}
              </figure>
            </Reveal>
          );
        })}
      </div>
    </Shell>
  );
}

function Tags({ label, tags }) {
  return (
    <div className="mt-8">
      {label && <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--pj-muted)]">{label}</p>}
      <ul className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag} className="rounded-full border border-[color:var(--pj-line)] px-3.5 py-1.5 text-xs uppercase tracking-wider md:text-[13px]">{tag}</li>
        ))}
      </ul>
    </div>
  );
}

function Reel({ section }) {
  const right = section.side === "right";
  const xl = section.size === "xl";
  // desktop: video and copy sit on opposite sides; on mobile the video always comes first
  const videoCls = xl ? (right ? "md:order-2 md:col-span-6 md:col-start-7" : "md:order-1 md:col-span-6 md:col-start-1") : (right ? "md:order-2 md:col-span-5 md:col-start-7" : "md:order-1 md:col-span-5 md:col-start-2");
  const textCls = xl ? (right ? "md:order-1 md:col-span-4 md:col-start-2" : "md:order-2 md:col-span-4 md:col-start-8") : (right ? "md:order-1 md:col-span-4 md:col-start-2" : "md:order-2 md:col-span-4 md:col-start-8");
  return (
    <Shell id={section.id} className="md:py-32">
      <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-8">
        <Reveal className={videoCls} y={28}>
          <ReelPlayer video={section.video} title={section.title} size={section.size} />
        </Reveal>
        <Reveal className={textCls} delay={0.1}>
          <Eyebrow>{section.label}</Eyebrow>
          <h2 style={displayFont} className="mt-4 text-4xl font-semibold uppercase leading-[.95] tracking-[-0.03em] md:text-6xl">{section.title}</h2>
          {section.role && <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--pj-accent)]">{section.role}</p>}
          <p className="mt-6 text-lg leading-relaxed text-[color:var(--pj-muted)] md:text-xl">{section.description}</p>
          {section.note && <p className="mt-4 text-base leading-relaxed text-[color:var(--pj-muted)]">{section.note}</p>}
          {section.tags && <Tags label={section.tagsLabel} tags={section.tags} />}
        </Reveal>
      </div>
    </Shell>
  );
}

function TextBlock({ section }) {
  return (
    <Shell id={section.id}>
      <Head label={section.label} />
      <div className="grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-8">
          {section.body.map((paragraph) => (
            <p key={paragraph} className="text-3xl leading-snug md:text-5xl md:leading-[1.1]" style={displayFont}>{paragraph}</p>
          ))}
        </Reveal>
        {section.lines && (
          <Reveal className="md:col-span-3 md:col-start-10" delay={0.1}>
            <ul>
              {section.lines.map((line) => (
                <li key={line} className="border-t border-[color:var(--pj-line)] py-4 font-mono text-xs uppercase tracking-[0.18em] last:border-b">{line}</li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </Shell>
  );
}

function Board({ section }) {
  return (
    <Shell id={section.id}>
      <Head label={section.label} />
      <Eyebrow className="mb-6 text-[color:var(--pj-muted)]">{section.kicker}</Eyebrow>
      <div className="mx-auto max-w-6xl space-y-6 md:space-y-8">
        {section.rows.map((row) => (
          <div key={row.label} className="grid grid-cols-2 gap-3 md:grid-cols-12 md:items-center md:gap-6">
            <p className="col-span-2 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--pj-accent)] md:col-span-2">{row.label}</p>
            {row.frames.map((frame, i) => (
              <Reveal key={frame.n} className="md:col-span-5" delay={i * 0.08} y={28}>
                <figure>
                  <ProjectImage img={frame.img} sizes="(min-width: 768px) 470px, 50vw" />
                  <Caption>Frame {frame.n}</Caption>
                </figure>
              </Reveal>
            ))}
          </div>
        ))}
      </div>
    </Shell>
  );
}

function IdentityTile({ img, className, sizes }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={img.src} alt={img.alt} fill sizes={sizes} placeholder="blur" blurDataURL={img.blurDataURL} className="object-cover" />
    </div>
  );
}

/** Clayoven identity: logo, colour, type and texture tiles cut from the brand guidelines and set as one board. */
function Identity({ section }) {
  const { tiles } = section;
  const Tile = IdentityTile;
  const wide = "aspect-[2.5/1] md:col-span-7 md:aspect-auto";
  const narrow = "aspect-video md:col-span-5";
  return (
    <Shell id={section.id}>
      <Head label={section.label} note={section.caption} />
      <Reveal y={28}>
        <div className="grid grid-cols-1 gap-[2px] overflow-hidden rounded-2xl bg-[color:var(--pj-line)] md:grid-cols-12 md:rounded-3xl">
          <Tile img={tiles.logo} className={wide} sizes="(min-width: 768px) 690px, 100vw" />
          <Tile img={tiles.colours} className={narrow} sizes="(min-width: 768px) 490px, 100vw" />
          <Tile img={tiles.palette} className={narrow} sizes="(min-width: 768px) 490px, 100vw" />
          <Tile img={tiles.type} className={wide} sizes="(min-width: 768px) 690px, 100vw" />
          <Tile img={tiles.tex1} className={narrow} sizes="(min-width: 768px) 490px, 100vw" />
          <Tile img={tiles.tex2} className={wide} sizes="(min-width: 768px) 690px, 100vw" />
        </div>
      </Reveal>
    </Shell>
  );
}

function Compare({ section }) {
  return (
    <Shell id={section.id}>
      <Head label={section.label} />
      <div className="grid gap-14 md:grid-cols-2 md:gap-16">
        {section.columns.map((column, i) => (
          <Reveal key={column.name} delay={i * 0.1}>
            <div className="border-t border-[color:var(--pj-line)] pt-6">
              <h3 style={displayFont} className="text-3xl font-semibold uppercase tracking-[-0.03em] md:text-5xl">{column.name}</h3>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--pj-accent)]">{column.tag}</p>
              <p className="mt-2 text-lg text-[color:var(--pj-muted)]">{column.flow}</p>
              <div className="mt-8 grid grid-cols-3 gap-2 md:gap-3">
                {column.stills.map((frame) => (
                  <div key={frame.src} className="relative aspect-[9/16] overflow-hidden rounded-lg md:rounded-xl">
                    <Image src={frame.src} alt={frame.alt} fill sizes="(min-width: 768px) 190px, 30vw" placeholder="blur" blurDataURL={frame.blurDataURL} className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      {section.closing && (
        <Reveal className="mt-20 md:mt-28">
          <p style={displayFont} className="text-center text-3xl font-semibold uppercase leading-[1] tracking-[-0.03em] md:text-6xl">{section.closing}</p>
        </Reveal>
      )}
    </Shell>
  );
}

function Ending({ section }) {
  const { headline, body, lines, image, cta, label } = section;
  const headlineEl = (
    <h2 style={displayFont} className="mt-4 text-[11vw] font-semibold uppercase leading-[.92] tracking-[-0.04em] md:text-[5.6vw]">{headline}</h2>
  );
  const copy = (
    <>
      {body && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--pj-muted)] md:text-xl">{body}</p>}
      {lines && (
        <div className="mt-6 space-y-1 text-xl text-[color:var(--pj-muted)] md:text-2xl">
          {lines.map((line) => <p key={line}>{line}</p>)}
        </div>
      )}
      {cta && (
        <Link href={cta.href} className="mt-10 inline-flex items-center gap-3 rounded-full bg-[color:var(--pj-accent)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition hover:brightness-110">
          {cta.label} <ArrowRight size={17} />
        </Link>
      )}
    </>
  );

  // big quiet image first, statement below (Basil)
  if (image && section.imageFirst) {
    return (
      <Shell id={section.id} className="md:py-32">
        <Reveal y={24}><ProjectImage img={image} sizes="(min-width: 1280px) 1180px, 100vw" /></Reveal>
        <Reveal className="mx-auto mt-16 max-w-4xl text-center md:mt-24" delay={0.1}>
          {label && <Eyebrow>{label}</Eyebrow>}
          {headlineEl}
          {body && <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--pj-muted)] md:text-xl">{body}</p>}
        </Reveal>
      </Shell>
    );
  }

  // statement beside an image
  if (image) {
    const layout = END_LAYOUT[section.imageSpan ?? 5][section.imageSide ?? "right"];
    return (
      <Shell id={section.id} className="md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          <Reveal className={layout.text}>
            {label && <Eyebrow>{label}</Eyebrow>}
            {headlineEl}
            {copy}
          </Reveal>
          <Reveal className={layout.image} delay={0.1} y={28}>
            <ProjectImage img={image} sizes="(min-width: 768px) 520px, 100vw" />
          </Reveal>
        </div>
      </Shell>
    );
  }

  // statement only
  return (
    <Shell id={section.id} className="md:py-40">
      <Reveal className="mx-auto max-w-5xl text-center">
        {label && <Eyebrow>{label}</Eyebrow>}
        {headlineEl}
        <div className="flex flex-col items-center [&_p]:mx-auto">{copy}</div>
      </Reveal>
    </Shell>
  );
}

function Section({ section }) {
  switch (section.type) {
    case "gallery": return <Gallery section={section} />;
    case "reel": return <Reel section={section} />;
    case "text": return <TextBlock section={section} />;
    case "board": return <Board section={section} />;
    case "identity": return <Identity section={section} />;
    case "compare": return <Compare section={section} />;
    case "ending": return <Ending section={section} />;
    default: return null;
  }
}

function NextProject({ next }) {
  return (
    <section className="px-5 pb-28 pt-8 md:px-10 md:pb-36">
      <div className="mx-auto max-w-7xl border-t border-[color:var(--pj-line)] pt-10">
        <Link href={`/work/${next.slug}`} className="group flex items-end justify-between gap-8">
          <span>
            <Eyebrow>Next project</Eyebrow>
            <span style={displayFont} className="mt-4 block text-4xl font-semibold uppercase leading-[.95] tracking-[-0.03em] transition group-hover:text-[color:var(--pj-accent)] md:text-7xl">{next.title}</span>
            <span className="mt-4 block text-lg text-[color:var(--pj-muted)]">{next.context}</span>
          </span>
          <ArrowRight className="mb-2 shrink-0 transition group-hover:translate-x-2 group-hover:text-[color:var(--pj-accent)]" size={36} />
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ page */

export default function ProjectPage({ project, next, fontClassName = "" }) {
  const t = project.theme;
  return (
    <article
      id="main-content"
      className={`relative z-10 ${fontClassName}`}
      style={{
        "--pj-bg": t.bg,
        "--pj-surface": t.surface,
        "--pj-fg": t.fg,
        "--pj-muted": t.muted,
        "--pj-line": t.line,
        "--pj-accent": t.accent,
        "--pj-font-display": t.fontDisplay ?? "inherit",
        background: t.bg,
        color: t.fg,
        ...(t.fontBody ? { fontFamily: t.fontBody } : {}),
      }}
    >
      <Hero project={project} />
      {project.sections.map((section) => <Section key={section.id} section={section} />)}
      {next && <NextProject next={next} />}
    </article>
  );
}
