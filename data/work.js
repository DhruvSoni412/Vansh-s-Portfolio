/**
 * Full content for every project page (/work/[slug]).
 * Copy, section order and asset choices follow the Word briefs in /Brief.
 * Card-level fields (title, descriptor, categories…) live in ./work-index.js and are merged in below.
 *
 * Section types (rendered by components/work/ProjectPage.jsx):
 *   gallery   – 12-column image composition. item: { img, span, start, mt, rowSpan, caption, mobile }
 *               layout "contact" = compact even grid (cols)
 *   reel      – large vertical video with role / description / tags
 *   text      – short statement section
 *   board     – equal-size campaign board grouped in labelled rows (Royal Biryani House)
 *   identity  – brand-identity mosaic built from the guideline pages (Clayoven)
 *   compare   – two side-by-side directions with stills (Beyond the Footage)
 *   ending    – closing headline (+ optional image / CTA)
 */
import assets from "./work-assets.json";
import { projects as index } from "./work-index";

function image(key, alt, extra = {}) {
  const a = assets.images[key];
  if (!a) throw new Error(`Missing asset "${key}". Run: node scripts/build-work-assets.mjs`);
  return { src: a.src, width: a.width, height: a.height, blurDataURL: a.blur, alt, ...extra };
}

function video(key, alt) {
  const v = assets.videos[key];
  if (!v) throw new Error(`Missing video "${key}". Run: node scripts/build-work-assets.mjs`);
  return { src: v.src, width: v.width, height: v.height, duration: v.duration, poster: image(v.poster, alt) };
}

const still = (videoKey, name, alt) => image(assets.videos[videoKey].stills[name], alt);

/*
 * Palettes. Most projects keep to the colours already present in their own artwork (Brief: "do not force one background").
 * `site` is the website's own theme (see tailwind.config.js / globals.css: #111214 background, #EDEDED text, #C8FF4D accent,
 * default site typography) — Clayoven uses it so that page matches the rest of the site.
 */
const site = { bg: "#111214", surface: "#181a1d", fg: "#EDEDED", muted: "#9ca3af", line: "rgba(255,255,255,.15)", accent: "#C8FF4D" };
const themes = {
  basil: { bg: "#0b1a10", surface: "#11271a", fg: "#ecf3e4", muted: "rgba(236,243,228,.66)", line: "rgba(236,243,228,.16)", accent: "#c8f59b" },
  clayoven: site,
  laIsla: { bg: "#120e0a", surface: "#1b140e", fg: "#f1e6d4", muted: "rgba(241,230,212,.66)", line: "rgba(241,230,212,.16)", accent: "#d9a45b" },
  doh: { bg: "#0a0a0a", surface: "#141210", fg: "#efe9e1", muted: "rgba(239,233,225,.66)", line: "rgba(239,233,225,.16)", accent: "#e8722c" },
  rbh: { bg: "#150809", surface: "#1f0d10", fg: "#f2e6d2", muted: "rgba(242,230,210,.66)", line: "rgba(242,230,210,.16)", accent: "#d8b06a" },
  motion: { bg: "#0c0c0d", surface: "#151517", fg: "#ededed", muted: "rgba(237,237,237,.62)", line: "rgba(237,237,237,.14)", accent: "#c8ff4d" },
  personal: { bg: "#111214", surface: "#181a1d", fg: "#ededed", muted: "rgba(237,237,237,.62)", line: "rgba(237,237,237,.14)", accent: "#c8ff4d" },
};

const details = {
  /* ------------------------------------------------------------------ 01 */
  "built-to-scale": {
    theme: themes.basil,
    intro: "A visual communication system built across business presentations, packaging, menus, campaigns and everyday brand touchpoints.",
    hero: { layout: "wide", image: image("basil/hero", "Basil hero: “Made fresh. Every time.” — a Basil cup on a green photographic background") },
    sections: [
      {
        type: "gallery", id: "presentation", label: "02 — Presentation / Brand communication", layout: "free",
        items: [
          { img: image("basil/pres-partners", "Basil presentation slide: our strategic partners"), span: 12 },
          { img: image("basil/pres-system", "Basil presentation slide: kiosk, metrics and the six-point system"), span: 4 },
          { img: image("basil/pres-verticals", "Basil presentation slide: Jahan jahan log, wahan wahan Basil"), span: 4, mt: 8 },
          { img: image("basil/pres-quick", "Basil presentation slide: Har har Basil, ghar ghar Basil — quick commerce"), span: 4, mt: 16 },
        ],
      },
      {
        type: "gallery", id: "kiosk", label: "03 — Kiosk / Machine", layout: "free",
        items: [
          { img: image("basil/kiosk", "Basil kiosk presentation with render and supporting information"), span: 12 },
          { img: image("basil/machine", "Basil beverage machine presentation slide"), span: 7 },
          { img: image("basil/beverages", "Six Basil beverage and product visuals"), span: 5, mt: 16 },
        ],
      },
      {
        type: "gallery", id: "menu", label: "04 — Menu", layout: "free",
        items: [
          { img: image("basil/menu-digital", "Basil machine menu, digital"), span: 3, start: 2, caption: "Machine menu" },
          { img: image("basil/menu-physical", "Basil physical menu, 3 × 2 ft"), span: 6, start: 6, caption: "Physical menu · 3 × 2 ft" },
        ],
      },
      {
        type: "gallery", id: "campaigns", label: "05 — Campaigns / Retail", layout: "free",
        items: [
          { img: image("basil/retail-89", "Basil ₹89 summer menu poster"), span: 7, start: 1 },
          { img: image("basil/retail-standee", "Basil A0 standee: grand launch offer, 50% off"), span: 5, start: 8, mt: 24 },
          { img: image("basil/retail-tent", "Basil tent card: 15% off breakfast special"), span: 4, start: 1 },
          { img: image("basil/retail-desk", "Basil A4 stand: get your order at your desk"), span: 4, start: 5, mt: 12 },
          { img: image("basil/retail-bulk", "Basil tent card: go bulk, feed the crew"), span: 4, start: 9, mt: 24 },
          { img: image("basil/retail-franchise", "Basil Go franchise digital post"), span: 4, start: 1, mt: 16 },
          { img: image("basil/retail-banner", "Basil A0 banner: why does eating out mean compromising?"), span: 7, start: 6 },
        ],
      },
      {
        type: "gallery", id: "email", label: "06 — Email / Direct communication", layout: "contact", cols: 5,
        items: [
          { img: image("basil/email-1", "Basil emailer: 10% off — unlike your ex") },
          { img: image("basil/email-2", "Basil emailer: unlike your manager, we're transparent") },
          { img: image("basil/email-3", "Basil emailer: this health week, don't compromise") },
          { img: image("basil/email-4", "Basil emailer: summer menu is live") },
          { img: image("basil/email-5", "Basil emailer: join us for grand launch") },
        ],
      },
      {
        type: "gallery", id: "vouchers", label: "07 — Vouchers", layout: "contact", cols: 3, mobileCols: 1, narrow: true,
        items: [
          { img: image("basil/voucher-15", "Basil 15% off split voucher") },
          { img: image("basil/voucher-50", "Basil 50% off next-order voucher") },
          { img: image("basil/voucher-100", "Basil ₹100 off voucher with QR code") },
        ],
      },
      {
        type: "ending", id: "ending", label: "08 — Ending",
        headline: "One brand. Many touchpoints.",
        body: "From a business presentation to a kiosk, a product pack, a menu or a promotional voucher, the work was about carrying the same brand language into very different contexts, without making every format feel the same.",
        image: image("basil/ending", "Quiet closing visual: a Basil cup and the words thank you"), imageFirst: true, imageSpan: 12,
      },
    ],
  },

  /* ------------------------------------------------------------------ 02 */
  "nostalgia-reworked": {
    theme: themes.clayoven,
    intro: "A visual identity and content system built around Clayoven's restaurant heritage, translated into social content and motion.",
    hero: { layout: "portrait", image: image("clayoven/hero", "Clayoven identity artwork: vertical logo on cream textured paper with an ESTD. 1999 stamp"), imageSpan: 6 },
    sections: [
      {
        type: "identity", id: "identity", label: "02 — Brand identity",
        caption: "Navy, cream, gold and black, set in Playfair Display and Lato, with archival textures for the Nostalgia theme.",
        tiles: {
          logo: image("clayoven/id-logo", "The Clayoven logo on navy"),
          colours: image("clayoven/id-colours", "The Clayoven logo locked up on each of the four brand colours: navy, cream, gold and black"),
          palette: image("clayoven/id-palette", "Clayoven colour palette: navy, cream, gold, black"),
          type: image("clayoven/id-type", "Clayoven typography: Top Luxury, Lato, Arizona, The Seasons, Playfair Display"),
          tex1: image("clayoven/id-tex1", "Clayoven navy textures and patterns"),
          tex2: image("clayoven/id-tex2", "Clayoven Nostalgia-theme textures: aged paper"),
        },
      },
      {
        // Only one grid here on purpose. The second slot used to show clayoven/grid-2, but that asset's source
        // ("02. Clayoven/03. Social Media/Main grid 2.png") is La Isla artwork filed in the Clayoven folder, so it
        // was crediting another client's work to Clayoven. The genuine "Clayoven Grid 2 .png" exists but carries
        // "Reel Thumbnail" placeholder labels on three of its nine cells, so it is not shown either.
        type: "gallery", id: "social", label: "03 — Social media", layout: "free",
        items: [
          { img: image("clayoven/grid-1", "Clayoven social grid: a 3 × 3 grid of food and identity posts"), span: 8, start: 3, caption: "Social grid" },
        ],
      },
      {
        type: "gallery", id: "visual-language", label: "04 — Visual language",
        note: "Photography, typography, framing and heritage-led details were brought together into a repeatable social visual language.",
        layout: "free",
        items: [
          { img: image("clayoven/vl-dal", "Clayoven Dal Makhani post"), span: 7, start: 1 },
          { img: image("clayoven/vl-soya", "Clayoven Tandoori Soya Chap post"), span: 4, start: 8, mt: 32, mobile: "full" },
          { img: image("clayoven/vl-paneer", "Clayoven Paneer Tikka post"), span: 3, start: 1 },
          { img: image("clayoven/vl-bluerice", "Clayoven blue rice food visual, from social grid 01"), span: 3, start: 4, mt: 16 },
          { img: image("clayoven/vl-asian", "Clayoven Asian Green post"), span: 3, start: 7, mt: 8 },
          { img: image("clayoven/vl-kofta", "Clayoven Vegetable Kofta post"), span: 3, start: 10, mt: 24 },
          { img: image("clayoven/vl-seekh", "Clayoven Chicken Seekh Kebab post"), span: 3, start: 1, mt: 8 },
          { img: image("clayoven/vl-hyderabadi", "Clayoven Hyderabadi Paneer Tikka post"), span: 3, start: 4, mt: 24 },
          { img: image("clayoven/vl-exterior", "Clayoven restaurant exterior with logo"), span: 6, start: 7 },
        ],
      },
      {
        type: "reel", id: "motion", label: "05 — Motion / Reel", title: "Cocktail Reel",
        description: "Extending the visual language into motion through food, atmosphere and pacing.",
        video: video("clayoven/cocktail-reel", "Frame from the Clayoven cocktail reel"), size: "xl", side: "right",
      },
      {
        type: "ending", id: "ending", label: "06 — Ending",
        headline: "A legacy, recast.",
        image: image("clayoven/facade", "Illustrated Clayoven restaurant façade with the ESTD. 1999 identity"), imageSpan: 5, imageSide: "right",
      },
    ],
  },

  /* ------------------------------------------------------------------ 03 */
  "a-seat-at-the-table": {
    theme: themes.laIsla,
    intro: "Building a visual language for a hospitality brand across everyday content, seasonal campaigns and experiences.",
    hero: { layout: "portrait", image: image("la-isla/grid-hero", "La Isla Instagram grid: interiors, cocktails, table settings and dining moments"), imageSpan: 6 },
    sections: [
      {
        type: "gallery", id: "everyday", label: "02 — The everyday brand", layout: "free",
        items: [
          { img: image("la-isla/grid-everyday", "La Isla everyday-brand grid: a neon-lit corner, shared plates, dessert and the leaf-green menu"), span: 12 },
          { img: image("la-isla/crop-tequila", "La Isla post: Tequila is cheaper than therapy"), span: 3 },
          { img: image("la-isla/crop-food", "La Isla post: a food spread — taste the world, bite by bite"), span: 3, mt: 8 },
          { img: image("la-isla/crop-cocktail", "La Isla post: cocktail and dessert — an invitation to unwind"), span: 3 },
          { img: image("la-isla/crop-menu", "La Isla post: leaf-green menu on a table setting"), span: 3, mt: 8 },
        ],
      },
      {
        type: "gallery", id: "campaigns", label: "03 — Campaigns", layout: "free",
        items: [
          { img: image("la-isla/camp-diwali", "La Isla Diwali party invitation, dark purple and gold"), span: 6, start: 4 },
          { img: image("la-isla/camp-booktalk", "La Isla Book Talk Series invitation, soft illustrated Himalayan direction"), span: 5, start: 1, mt: 8 },
          { img: image("la-isla/camp-christmas", "La Isla Christmas brunch invitation, red botanical direction"), span: 5, start: 7, mt: 24 },
          { img: image("la-isla/camp-halloween", "La Isla Halloween party night poster, dark and theatrical"), span: 4, start: 5, mt: 8 },
        ],
      },
      {
        type: "gallery", id: "seasons", label: "04 — Seasons", title: "One brand. Different seasons.", layout: "contact", cols: 5,
        items: [
          { img: image("la-isla/season-winter-menu", "La Isla: Our winter's menu is waiting for you") },
          { img: image("la-isla/season-winter-served", "La Isla: Winter at La Isla is served") },
          { img: image("la-isla/season-christmas-menu", "La Isla: newly launched Christmas menu") },
          { img: image("la-isla/season-happy-hour", "La Isla: 1+1 winter cocktail happy hour tent card") },
          { img: image("la-isla/season-cocktail-menu", "La Isla: winter cocktail menu") },
        ],
      },
      {
        type: "gallery", id: "menu-design", label: "05 — Menu design", note: "Beyond the feed.", layout: "free",
        items: [
          { img: image("la-isla/menu-bar", "La Isla cocktail menu, “The Bar Called…” signature cocktails"), span: 6, start: 1, rowSpan: 2 },
          { img: image("la-isla/menu-afro", "La Isla Afro Brew cocktail and coffee menu"), span: 3, start: 7 },
          { img: image("la-isla/menu-diner", "La Isla food menu, “The Diner Is Served”"), span: 3, start: 10, mt: 16 },
          { img: image("la-isla/menu-hookah", "La Isla hookah menu"), span: 3, start: 7 },
        ],
      },
      {
        type: "gallery", id: "events", label: "06 — Event communication", layout: "free",
        items: [
          { img: image("la-isla/event-cricket", "La Isla cricket screening poster: India vs Pakistan"), span: 4, start: 1 },
          { img: image("la-isla/event-singer", "La Isla live singer poster featuring Yashni"), span: 4, start: 5, mt: 24 },
          { img: image("la-isla/event-halloween", "La Isla Halloween party night, costumes and cocktails"), span: 4, start: 9, mt: 8 },
        ],
      },
      { type: "ending", id: "ending", label: "07 — Ending", headline: "A place to eat. A place to experience." },
    ],
  },

  /* ------------------------------------------------------------------ 04 */
  "keeping-32-years-current": {
    theme: themes.doh,
    intro: "Keeping a long-standing Pan-Asian restaurant visually relevant across social content, campaigns and in-store communication.",
    hero: { layout: "portrait", image: image("doh/hero", "Drums of Heaven creative: Double the dumplings, double the delight"), imageSpan: 6 },
    sections: [
      {
        // doh/grid-1 is dropped: its source ("04. Doh/02. Social content/Grid 1 copy.png") is an unfinished layout
        // mockup whose cells are labelled "Sample", "Name", "Reel Thumbnail" and "Crousel". The October grid is the
        // finished deliverable, so it carries the section on its own.
        type: "gallery", id: "social", label: "02 — Social content", layout: "free",
        items: [
          { img: image("doh/grid-2", "Drums of Heaven October social grid: reels, carousels and promotions"), span: 6, start: 4, caption: "October grid" },
        ],
      },
      {
        type: "gallery", id: "heritage", label: "03 — Heritage", title: "31 years, still sizzling.", layout: "free",
        items: [
          { img: image("doh/anniversary", "Drums of Heaven: 31 years of sizzling flavors — 31% discount for 31 days"), span: 5, start: 2 },
          { img: image("doh/serving", "Drums of Heaven: largest prawns in Delhi — serving since 1994"), span: 4, start: 8, mt: 24 },
        ],
      },
      {
        type: "gallery", id: "campaigns", label: "04 — Campaign communication", layout: "free",
        items: [
          { img: image("doh/camp-step", "Drums of Heaven: Step into Drums of Heaven"), span: 3, start: 1 },
          { img: image("doh/camp-rice", "Drums of Heaven: egg fried sticky rice and Bangkok chicken rice"), span: 3, start: 4, mt: 16 },
          { img: image("doh/camp-exterior", "Drums of Heaven restaurant exterior — visit now"), span: 3, start: 7, mt: 8 },
          { img: image("doh/camp-evening", "Drums of Heaven: for evenings that deserve a little extra shine"), span: 3, start: 10, mt: 24 },
          { img: image("doh/camp-prawn", "Drums of Heaven: spicy pepper honey prawn"), span: 4, start: 1, mt: 8 },
          { img: image("doh/camp-chilli", "Drums of Heaven: crispy chilli chicken close-up"), span: 4, start: 5, mt: 24 },
          { img: image("doh/camp-dish", "Drums of Heaven: dish of the week — egg fried sticky rice"), span: 4, start: 9, mt: 12 },
        ],
      },
      { type: "ending", id: "ending", label: "05 — Ending", headline: "31 years. Still serving the experience." },
    ],
  },

  /* ------------------------------------------------------------------ 05 */
  "one-offer-four-frames": {
    theme: themes.rbh,
    format: "4-slide Meta campaign creative",
    intro: "A four-frame Meta campaign built around family feasts and office lunches, translating one food proposition into distinct audience moments.",
    hero: { layout: "portrait", image: image("rbh/frame-1", "Royal Biryani House: Weekend plans just got deliciously royal — Family Feast"), imageSpan: 6 },
    sections: [
      {
        type: "text", id: "idea", label: "02 — The campaign idea",
        body: ["The campaign uses the Royal Biryani House proposition across two everyday occasions: family meals and office lunches."],
        lines: ["Family / weekend", "Office / lunch break"],
      },
      {
        type: "board", id: "board", label: "03 — The four-frame system", kicker: "The campaign / 04 frames",
        rows: [
          {
            label: "Family / Weekend",
            frames: [
              { n: "01", img: image("rbh/frame-1", "Frame 01: Weekend plans just got deliciously royal — Family Feast") },
              { n: "02", img: image("rbh/frame-2", "Frame 02: Something royal for everyone in the family") },
            ],
          },
          {
            label: "Office / Lunch",
            frames: [
              { n: "03", img: image("rbh/frame-3", "Frame 03: Lunch break just got an upgrade — Office") },
              { n: "04", img: image("rbh/frame-4", "Frame 04: Be the office hero — Team Lunch") },
            ],
          },
        ],
      },
      {
        type: "ending", id: "ending", label: "04 — Ending",
        headline: "One idea. Four moments.",
        body: "A single food proposition carried across different occasions without losing the visual identity of the campaign.",
        image: image("rbh/detail", "Detail of the Royal Biryani House campaign: a hammered-copper handi of biryani"), imageSpan: 4, imageSide: "right",
      },
    ],
  },

  /* ------------------------------------------------------------------ 06 */
  "cut-to-the-rhythm": {
    theme: themes.motion,
    metaLabels: { context: "Context", type: "Type" },
    intro: "Short-form edits built around rhythm, atmosphere, visual pacing and brand personality.",
    hero: { layout: "text" },
    sections: [
      {
        type: "reel", id: "looks", label: "02 — Looks Salon", title: "Looks Salon", role: "Beauty / Transformation",
        description: "A refined, beat-driven edit built around movement, transformation and visual polish.",
        tagsLabel: "Editing character", tags: ["Model-led movement", "Hair movement / transformation", "Refined colour grading", "Beat-synced pacing"],
        video: video("reels/looks", "Frame from the Looks Salon reel"), size: "lg", side: "left",
      },
      {
        type: "reel", id: "cult", label: "03 — Cult Bhopal", title: "Cult Bhopal", role: "Voiceover / Storytelling",
        description: "A voice-led walkthrough shaped around the atmosphere and experience of the space.",
        tagsLabel: "Editing character", tags: ["Voiceover", "Ambience", "Storytelling"],
        video: video("reels/cult", "Frame from the Cult Bhopal reel"), size: "lg", side: "right",
      },
      {
        type: "reel", id: "whiskey-samba", label: "04 — Whiskey Samba", title: "Whiskey Samba", role: "Atmosphere / Rhythm",
        description: "A beat-led walkthrough designed to make the space feel as good on screen as it does in person.",
        tagsLabel: "Editing character", tags: ["Beat sync", "Ambience", "Walkthrough"],
        video: video("reels/whisky", "Frame from the Whiskey Samba interior reel"), size: "xl", side: "left",
      },
      {
        type: "reel", id: "bluemoon", label: "05 — Bluemoon Gin", title: "Bluemoon Gin", role: "Product / Motion",
        description: "A product-led edit combining bottle movement with a reveal-driven motion treatment.",
        note: "Rotating bottle shots combined with the wrapper-unwrapping effect and text reveal.",
        tagsLabel: "Editing character", tags: ["Product", "Motion", "Reveal"],
        video: video("reels/bluemoon", "Frame from the Bluemoon Gin reel"), size: "lg", side: "right",
      },
      {
        type: "ending", id: "ending", label: "06 — Ending",
        headline: "Every cut has a reason.",
        body: "From atmosphere to product, voiceover to beat-led edits, the cut changes with the story.",
      },
    ],
  },

  /* ------------------------------------------------------------------ 07 */
  "beyond-the-footage": {
    theme: themes.motion,
    metaLabels: { context: "Context", type: "Type" },
    intro: "Exploring AI-assisted workflows to turn concepts into cinematic short-form visuals.",
    hero: {
      layout: "reel",
      video: video("ai/elie-saab", "Frame from the Elie Saab AI-assisted reel"),
      videoTitle: "Elie Saab",
      videoDescriptor: "A cinematic luxury real-estate visual built through AI-generated environments and directed sequencing.",
    },
    sections: [
      {
        type: "reel", id: "fortunenest", label: "02 — FortuneNest", title: "FortuneNest",
        description: "An AI-assisted real-estate narrative combining location, scale and lifestyle into a short-form visual.",
        video: video("ai/fortunenest", "Frame from the FortuneNest AI-assisted reel"), size: "xl", side: "right",
      },
      {
        type: "compare", id: "directions", label: "03 — Two different directions",
        columns: [
          {
            name: "Elie Saab", tag: "Luxury / Atmosphere", flow: "City → Interior → Architecture",
            stills: [
              still("ai/elie-saab", "still-city", "Elie Saab reel: the city at dusk"),
              still("ai/elie-saab", "still-interior", "Elie Saab reel: a penthouse interior"),
              still("ai/elie-saab", "still-architecture", "Elie Saab reel: the tower at night"),
            ],
          },
          {
            name: "FortuneNest", tag: "Real estate / Communication", flow: "Location → Development → Lifestyle",
            stills: [
              still("ai/fortunenest", "still-location", "FortuneNest reel: the Yamuna Expressway"),
              still("ai/fortunenest", "still-development", "FortuneNest reel: the 101-hectare township"),
              still("ai/fortunenest", "still-lifestyle", "FortuneNest reel: a studio apartment balcony"),
            ],
          },
        ],
        closing: "Same tool. Different creative objective.",
      },
      {
        type: "ending", id: "ending", label: "04 — Ending",
        headline: "The tool changes. The taste doesn't.",
        image: image(assets.videos["ai/elie-saab"].poster, "Final frame of the Elie Saab reel: the tower lit against the night sky"), imageSpan: 4, imageSide: "right",
      },
    ],
  },

  /* ------------------------------------------------------------------ 08 */
  "just-because": {
    theme: themes.personal,
    metaLabels: { context: "Context", type: "Type" },
    intro: "Personal poster experiments and visual ideas made outside the brief.",
    hero: {
      layout: "portrait",
      image: image("personal/deadpool", "Fan-made Deadpool & Wolverine poster in red and yellow"),
      imageSpan: 5,
      caption: "01 / 02 · Deadpool & Wolverine · Fan-made poster",
    },
    sections: [
      {
        type: "gallery", id: "movies", label: "02 — Movies", title: "For the love of movies.", note: "Deadpool & Wolverine → John Wick", layout: "free",
        items: [
          { img: image("personal/johnwick", "Fan-made John Wick poster in black and red"), span: 6, start: 4, caption: "02 / 02 · John Wick · Fan-made poster" },
        ],
      },
      {
        type: "gallery", id: "polygons", label: "03 — Low poly", title: "Different ways to see.", layout: "free",
        items: [
          { img: image("personal/lowpoly", "Low-poly portrait built only from polygons"), span: 5, start: 2, caption: "Made with only polygons." },
        ],
      },
      {
        type: "gallery", id: "experiments", label: "04 — Other experiments", layout: "contact", cols: 4, narrow: true,
        items: [
          { img: image("personal/exp-tealogy-store", "Tealogy café storefront with an illustrated chai-drinking mascot"), caption: "Tealogy" },
          { img: image("personal/exp-tealogy-chai", "Tealogy chai creative: chai bina chain kahan re"), caption: "Tealogy" },
          { img: image("personal/exp-jyoti", "Jyoti Darshni Jewellers: a gold nath on red velvet"), caption: "Jyoti Darshni Jewellers" },
          { img: image("personal/exp-vrindavan", "Vrindavan visual: a Krishna figurine held up on a street"), caption: "Vrindavan" },
          { img: image("personal/exp-carrykar", "CarryKar: a low-poly car on a desert road — we move your assets with care"), caption: "CarryKar" },
          { img: image("personal/exp-sugarroom", "Sugarroom Christmas bento cakes"), caption: "Sugarroom" },
          { img: image("personal/exp-basil", "Basil machine visual: fresh, natural, on demand"), caption: "Basil" },
          { img: image("personal/exp-diabetes", "Information graphic: when diabetes is left untreated, it can lead to gum disease, dry mouth, slow healing, oral thrush and tooth loss"), caption: "Diabetes awareness" },
        ],
      },
      {
        type: "ending", id: "close", label: "05 — Close",
        headline: "Made without a brief.",
        lines: ["Some work starts with a client.", "Some starts with an idea."],
        cta: { label: "Let's talk", href: "/#contact" },
      },
    ],
  },
};

/** Everything a project page needs (card fields + story content). */
export const workProjects = index.map((card) => {
  const d = details[card.slug];
  if (!d) throw new Error(`No page content defined for "${card.slug}" in data/work.js`);
  return { ...card, ...d };
});

export function getWorkProject(slug) {
  return workProjects.find((p) => p.slug === slug);
}

/** The project shown in the "Next project" block. The last project has none (its page runs into the global contact footer). */
export function getNextWorkProject(slug) {
  const i = workProjects.findIndex((p) => p.slug === slug);
  return i >= 0 ? workProjects[i + 1] ?? null : null;
}

/**
 * Old placeholder slugs still referenced elsewhere (Home testimonials link to /work/la-isla etc.).
 * They redirect instead of 404-ing. A real project with the same slug always wins over an alias.
 */
export const legacySlugRedirects = {
  "la-isla": "/work/a-seat-at-the-table",
  "drums-of-heaven": "/work/keeping-32-years-current",
  saltnpepper: "/work/built-to-scale",
  "bluemoon-gin": "/work/cut-to-the-rhythm",
  "whiskey-sambha": "/work/cut-to-the-rhythm",
  "coke-studio": "/work",
};
