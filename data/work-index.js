/**
 * Card-level data for the Work index (/work and the Home "Recent work" strip).
 * Copy comes from Brief/00..docx (master structure). Story content for each project page lives in ./work.js.
 *
 * Images/videos are produced by `node scripts/build-work-assets.mjs` from the raw files in /data.
 */
import covers from "./work-covers.json";

const cover = (key, alt) => {
  const a = covers.images[key];
  if (!a) throw new Error(`Missing cover asset "${key}". Run: node scripts/build-work-assets.mjs`);
  return { src: a.src, width: a.width, height: a.height, blurDataURL: a.blur, alt };
};
const preview = (name) => covers.videos[`preview/${name}`]?.src ?? null;

export const FILTERS = [
  "All",
  "Brand & Identity",
  "Campaigns & Content",
  "Decks & Visual Communication",
  "Motion & Video",
  "Personal",
];

/**
 * Order here = order on the Work page, and the order of "Next project" links.
 * `featured` = shown in the Home page "Selected Work" strip (Brief: 01, 02, 03 and 06).
 * `categories` decide which filter chips a project appears under (a project can sit under several).
 * Numbers are generated from position, so adding the missing projects later (e.g. The Grind Theory,
 * SaltnPepper) renumbers everything automatically.
 */
export const projects = [
  {
    slug: "built-to-scale",
    title: "Built to Scale",
    context: "Basil",
    type: "Healthy Food / QSR",
    scope: ["Brand Communication", "Packaging", "Print", "Presentation", "Campaign"],
    descriptor: "Building a visual system for a healthy food brand across every touchpoint.",
    categories: ["Brand & Identity", "Campaigns & Content", "Decks & Visual Communication"],
    featured: true,
    cover: cover("basil/cover", "Basil cup on a green photographic background — Made fresh. Every time."),
    previewVideo: null,
  },
  {
    slug: "nostalgia-reworked",
    title: "Nostalgia, Reworked",
    context: "Clayoven",
    type: "Restaurant / Food & Beverage",
    scope: ["Brand Identity", "Social Media", "Content Design", "Reel Editing"],
    descriptor: "Reworking a legacy restaurant's identity into a distinctive social visual language.",
    categories: ["Brand & Identity", "Campaigns & Content", "Motion & Video"],
    featured: true,
    cover: cover("clayoven/hero", "The Clayoven identity: vertical logo on cream textured paper with an ESTD. 1999 stamp"),
    previewVideo: preview("nostalgia-reworked"),
  },
  {
    slug: "a-seat-at-the-table",
    title: "A Seat at the Table",
    context: "La Isla",
    type: "Restaurant / Bar & Café",
    scope: ["Social Creative", "Campaign Design", "Menu Design", "Invitations", "3D / Conceptual"],
    descriptor: "Building a visual language for a hospitality brand across everyday content, seasonal campaigns and experiences.",
    categories: ["Campaigns & Content"],
    featured: true,
    cover: cover("la-isla/grid-hero", "La Isla Instagram grid: interiors, cocktails, table settings and dining moments"),
    previewVideo: null,
  },
  {
    slug: "keeping-32-years-current",
    title: "Keeping 31 Years Current",
    context: "Drums of Heaven",
    type: "Pan-Asian Kitchen & Bar",
    scope: ["Social Creative", "Campaigns", "Content Design", "Art Direction"],
    descriptor: "Keeping a long-standing Pan-Asian restaurant visually relevant across social content, campaigns and in-store communication.",
    categories: ["Campaigns & Content"],
    featured: false,
    cover: cover("doh/hero", "Drums of Heaven — Double the dumplings, double the delight creative"),
    previewVideo: null,
  },
  {
    slug: "one-offer-four-frames",
    title: "One Offer. Four Frames.",
    context: "Royal Biryani House",
    type: "Food / Biryani & Indian Cuisine",
    scope: ["Campaign Concept", "Social Creative", "Art Direction", "Visual Design"],
    descriptor: "Turning a single food proposition into a connected four-frame Meta campaign.",
    categories: ["Campaigns & Content"],
    featured: false,
    cover: cover("rbh/cover", "Royal Biryani House — Weekend plans just got deliciously royal"),
    previewVideo: null,
  },
  {
    slug: "cut-to-the-rhythm",
    title: "Cut to the Rhythm",
    context: "Selected Reel Edits",
    type: "Selected Reel Edits",
    scope: ["Video Editing", "Motion", "Short-Form Content", "Creative Pacing"],
    descriptor: "Short-form edits built around rhythm, atmosphere, visual pacing and brand personality.",
    categories: ["Motion & Video"],
    featured: true,
    cover: cover("reels/cover", "Frame from the Looks Salon reel edit"),
    previewVideo: preview("cut-to-the-rhythm"),
  },
  {
    slug: "beyond-the-footage",
    title: "Beyond the Footage",
    context: "AI-Assisted Visual Content",
    type: "AI-Assisted Visual Content",
    scope: ["Concept Development", "AI Generation", "Art Direction", "Video Editing"],
    descriptor: "Exploring AI-assisted workflows to turn concepts into cinematic short-form visuals.",
    categories: ["Motion & Video"],
    featured: false,
    cover: cover("ai/cover", "Frame from the Elie Saab AI-assisted real-estate reel"),
    previewVideo: preview("beyond-the-footage"),
  },
  {
    slug: "just-because",
    title: "Just Because",
    context: "Personal Work",
    type: "Personal Visual Experiments",
    scope: ["Poster Design", "Visual Experiments", "Personal Exploration"],
    descriptor: "Personal poster experiments and visual ideas made outside the brief.",
    categories: ["Personal"],
    featured: false,
    cover: cover("personal/cover", "Fan-made Deadpool & Wolverine poster"),
    previewVideo: null,
  },
].map((project, index) => ({ ...project, number: String(index + 1).padStart(2, "0") }));

/** "Basil · Healthy Food / QSR" — the metadata line on cards (context and type are de-duplicated). */
export const metaLine = (project) => [...new Set([project.context, project.type])].join(" · ");
