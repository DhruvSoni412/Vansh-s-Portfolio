/**
 * Builds web-ready assets for the Work section from the raw files in /data.
 *
 *   node scripts/build-work-assets.mjs                     (skips anything already built)
 *   node scripts/build-work-assets.mjs --force             (rebuild everything)
 *   node scripts/build-work-assets.mjs --only=clayoven/id  (only keys containing that text; implies --force
 *                                                           and skips the video stage, so ffmpeg is not needed)
 *
 * Reads  : data/<project folders>/...            (originals — never modified)
 * Writes : public/work/**                        (WebP images, MP4 reels, posters)
 *          data/work-assets.json                 (sizes + blur placeholders used by data/work.js)
 *
 * Videos need ffmpeg. Put it on PATH, or set FFMPEG=C:\path\to\ffmpeg.exe
 */
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");
sharp.cache(false);
sharp.concurrency(2);

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Raw files are read from the first of these that exists: $WORK_SOURCE, the consolidated download folder
// (its "Data" folder), or /data. Only /data ever holds code (work.js etc.), so it is never deleted or moved.
const SOURCE_CANDIDATES = [
  process.env.WORK_SOURCE,
  path.join(ROOT, "drive-download-20260919T175701Z-1-001", "Data"),
  path.join(ROOT, "data"),
].filter(Boolean);
const SRC = SOURCE_CANDIDATES.find((dir) => fs.existsSync(path.join(dir, "01. Basil"))) ?? path.join(ROOT, "data");
const OUT = path.join(ROOT, "public", "work");
const MANIFEST = path.join(ROOT, "data", "work-assets.json");
const FFMPEG = process.env.FFMPEG || "ffmpeg";
// --only=<text> re-crops just the matching image keys. Handy when one crop is wrong and everything else is fine.
const ONLY = process.argv.find((a) => a.startsWith("--only="))?.slice(7) || null;
const FORCE = process.argv.includes("--force") || Boolean(ONLY);

const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : { images: {}, videos: {} };
manifest.images ||= {};
manifest.videos ||= {};

/* ------------------------------------------------------------------ */
/* Image list: key -> { file, w (max output width), crop?, cover? }     */
/*   crop  = { x, y, w, h } as fractions of the source image           */
/*   cover = { ratio, fx, fy } centre-crop to ratio around focal point  */
/* ------------------------------------------------------------------ */
const B = "01. Basil", C = "02. Clayoven", L = "03. La isla", D = "04. Doh", R = "05. RBh", P = "08. Personal";
const slide = (n) => `${C}/02. Brand Identity/The Clayoven Brand Guidlines (1)-${n}.png`;

const IMAGES = {
  /* ---- 01 Basil ---- */
  "basil/hero": { file: `${B}/01. Hero/01.png`, w: 1920 },
  "basil/cover": { file: `${B}/01. Hero/01.png`, w: 1000, cover: { ratio: 0.8, fx: 0.68, fy: 0.5 } },
  "basil/pres-partners": { file: `${B}/02. Presentation/02.png`, w: 1920 },
  "basil/pres-system": { file: `${B}/02. Presentation/03.png`, w: 1600 },
  "basil/pres-verticals": { file: `${B}/02. Presentation/05.png`, w: 1600 },
  "basil/pres-quick": { file: `${B}/02. Presentation/04.png`, w: 1600 },
  "basil/kiosk": { file: `${B}/03. Kiosk/06.png`, w: 1920 },
  "basil/machine": { file: `${B}/03. Kiosk/07.png`, w: 1600 },
  "basil/beverages": { file: `${B}/03. Kiosk/08.png`, w: 1600 },
  "basil/menu-digital": { file: `${B}/05. Menu/Machine Menu (1330_370) (4) copy.jpg`, w: 1100 },
  "basil/menu-physical": { file: `${B}/05. Menu/menu (3_2 Ft).png`, w: 1400 },
  "basil/retail-89": { file: `${B}/06. Campaign & Retail/@89 poster d2.png`, w: 1400 },
  "basil/retail-banner": { file: `${B}/06. Campaign & Retail/A0 Banner (Updated)(2).png`, w: 1400 },
  "basil/retail-standee": { file: `${B}/06. Campaign & Retail/A0 Standee (3).png`, w: 1200 },
  "basil/retail-tent": { file: `${B}/06. Campaign & Retail/15_ off tent card (4).png`, w: 1000 },
  "basil/retail-desk": { file: `${B}/06. Campaign & Retail/A4 Stande .png`, w: 1000 },
  "basil/retail-bulk": { file: `${B}/06. Campaign & Retail/Go Bulk Tent card (3)_.jpg`, w: 1000 },
  "basil/retail-franchise": { file: `${B}/06. Campaign & Retail/Franchise Digital Post (3).jpg`, w: 1000 },
  "basil/email-1": { file: `${B}/07. Email/10_ off Emailer (6).jpg`, w: 700 },
  "basil/email-2": { file: `${B}/07. Email/Brand Emailer.png`, w: 700 },
  "basil/email-3": { file: `${B}/07. Email/Emailer .png`, w: 700 },
  "basil/email-4": { file: `${B}/07. Email/Emailer Summer Menu d1.png`, w: 700 },
  "basil/email-5": { file: `${B}/07. Email/Grand Opening Emailer (2).png`, w: 700 },
  "basil/voucher-15": { file: `${B}/08. Voucher/15_ off split voucher(4).png`, w: 1200 },
  "basil/voucher-50": { file: `${B}/08. Voucher/Discount Voucher 50_off.png`, w: 1200 },
  "basil/voucher-100": { file: `${B}/08. Voucher/voucher [4].png`, w: 1200 },
  "basil/ending": { file: `${B}/09. Ending/Untitled-112.png`, w: 1920 },

  /* ---- 02 Clayoven ---- */
  "clayoven/hero": { file: `${C}/01. Hero/7.png`, w: 1080 },
  "clayoven/facade": { file: `${C}/01. Hero/Clayoven Stamp.png`, w: 1080 },
  // identity board — tiles cut from the brand-guideline pages
  // wide tiles (~2.5:1) are cropped around the artwork; narrow tiles keep the full 16:9 page
  "clayoven/id-logo": { file: slide(2), w: 1500, crop: { x: 0, y: 0.24, w: 0.92, h: 0.615 } },
  "clayoven/id-colours": { file: slide(3), w: 1500 },
  // the raw slide is a full 16:9 deck page (navy bg, "Color Palette" heading, lots of dead air) -> crop down to just the swatch bar
  "clayoven/id-palette": { file: slide(4), w: 1500, crop: { x: 0.04, y: 0.44, w: 0.92, h: 0.36 } },
  "clayoven/id-type": { file: slide(5), w: 1500, crop: { x: 0, y: 0.28, w: 1, h: 0.684 } },
  // same deck-page problem, and on white (not navy) bg -> crop past the stamp-shaped swatch (its scalloped edges leave white
  // slivers against any crop box) to the two plain texture swatches only.
  // Both texture crops hug the swatches with an equal margin on all four sides. The slides are 16:9, so a margin of
  // m in x needs m * 16/9 in y to look the same: 0.012 / 0.0213 here.
  "clayoven/id-tex1": { file: slide(6), w: 1500, crop: { x: 0.307, y: 0.311, w: 0.63, h: 0.526 } },
  // y must clear the slide heading, whose descenders reach 0.258 — the old 0.27 pulled a sliver of gold type in at the top
  "clayoven/id-tex2": { file: slide(7), w: 1500, crop: { x: 0.013, y: 0.276, w: 0.951, h: 0.603 } },
  "clayoven/grid-1": { file: `${C}/03. Social Media/Grid of 9 copy.png`, w: 1800 },
  // The second social grid. Note this is "Clayoven Grid 2 .png", not the neighbouring "Main grid 2.png" — that
  // one lives in the Clayoven folder but is La Isla artwork (it feeds la-isla/grid-everyday).
  "clayoven/grid-social": { file: `${C}/03. Social Media/Clayoven Grid 2 .png`, w: 1800 },
  "clayoven/vl-dal": { file: `${C}/04. Visual LAnguage/2 2.png`, w: 1080 },
  "clayoven/vl-soya": { file: `${C}/04. Visual LAnguage/2.png`, w: 1080 },
  "clayoven/vl-seekh": { file: `${C}/04. Visual LAnguage/4.png`, w: 1080 },
  "clayoven/vl-paneer": { file: `${C}/04. Visual LAnguage/6.png`, w: 1080 },
  "clayoven/vl-asian": { file: `${C}/04. Visual LAnguage/6 2.png`, w: 1080 },
  "clayoven/vl-kofta": { file: `${C}/04. Visual LAnguage/8.png`, w: 1080 },
  "clayoven/vl-hyderabadi": { file: `${C}/04. Visual LAnguage/8 2.png`, w: 1080 },
  "clayoven/vl-exterior": { file: `${C}/04. Visual LAnguage/Grid 2 Reel 1 TCO.png`, w: 1080 },
  // "blue rice food visual" is named in the brief but only exists as the centre tile of Grid 01 -> cut it out
  "clayoven/vl-bluerice": { file: `${C}/03. Social Media/Grid of 9 copy.png`, w: 1080, crop: { x: 0.3376, y: 0.3368, w: 0.3249, h: 0.3266 } },

  /* ---- 03 La Isla ---- */
  // bottom-left cell of the same "everyday" grid export (cocktail + coffee, "An Invitation to Unwind") -> a clean,
  // placeholder-free, portrait-friendly single shot for the hero
  // The 3x3 grid of finished lifestyle shots, serving as both the project hero and the /work card cover. Source is
  // the full-size "Grid View" export from 01. Hero — the older "La Isla Grid 3.webp" was a 1610x2000 re-save whose
  // bottom row was clipped ~6% short of a full cell. At 0.805:1 it is within half a percent of the card's 4:5 box,
  // so object-cover trims almost nothing, and it stands on its own at natural ratio in the portrait hero slot.
  "la-isla/grid-hero": { file: `${L}/01. Hero/Grid View La Isla.png`, w: 2000 },
  // The six-cell "everyday brand" grid, from the clean export (the V3 file of the same artwork carries
  // "Reel Thumbnail" placeholder labels). Filed under 02. Clayoven in the source folders, but it is La Isla work.
  "la-isla/grid-everyday": { file: `${C}/03. Social Media/Main grid 2.png`, w: 2200 },
  "la-isla/crop-tequila": { file: `${L}/02. THE EVERYFDAY BRND/Generative Fill 2.png`, w: 1080 },
  "la-isla/crop-food": { file: `${L}/02. THE EVERYFDAY BRND/Layer 3.png`, w: 1080 },
  "la-isla/crop-cocktail": { file: `${L}/02. THE EVERYFDAY BRND/Layer 2.png`, w: 1080 },
  "la-isla/crop-menu": { file: `${L}/02. THE EVERYFDAY BRND/Generative Fill.png`, w: 1080 },
  "la-isla/camp-diwali": { file: `${L}/03. Campaoigns/900_1200 Diwali Creative.png`, w: 900 },
  "la-isla/camp-booktalk": { file: `${L}/03. Campaoigns/Book talks d2.png`, w: 1200 },
  "la-isla/camp-christmas": { file: `${L}/03. Campaoigns/Christmas Brunch Invite d3.png`, w: 1200 },
  "la-isla/camp-halloween": { file: `${L}/03. Campaoigns/Halloween Creative La Isla.png`, w: 1080 },
  "la-isla/season-winter-menu": { file: `${L}/04, 1 Bran diff seasons/Artboard 1.png`, w: 1080 },
  "la-isla/season-winter-served": { file: `${L}/04, 1 Bran diff seasons/Artboard 8.png`, w: 1080 },
  "la-isla/season-christmas-menu": { file: `${L}/04, 1 Bran diff seasons/Artboard 3.png`, w: 1080 },
  "la-isla/season-happy-hour": { file: `${L}/04, 1 Bran diff seasons/1+1 Winter Cocktail d4.png`, w: 1200 },
  "la-isla/season-cocktail-menu": { file: `${L}/04, 1 Bran diff seasons/Cocktail Menu la isla D3 copy.jpg`, w: 1200 },
  "la-isla/menu-bar": { file: `${L}/05. Menu Design/Cocktail Menu Lawyers theme.png`, w: 1400 },
  "la-isla/menu-afro": { file: `${L}/05. Menu Design/Cocktail n Coffee menu copy.png`, w: 1100 },
  "la-isla/menu-diner": { file: `${L}/05. Menu Design/FOOD MENU D6.png`, w: 1100 },
  "la-isla/menu-hookah": { file: `${L}/05. Menu Design/hookah menu la isla.png`, w: 1100 },
  "la-isla/event-cricket": { file: `${L}/06. Event Communication/La isla Cricket v4.png`, w: 1080 },
  "la-isla/event-singer": { file: `${L}/06. Event Communication/Live Singer Yashni La Isla.png`, w: 1080 },
  "la-isla/event-halloween": { file: `${L}/06. Event Communication/Halloween Creative d5.png`, w: 1080 },

  /* ---- 04 Drums of Heaven ---- */
  "doh/hero": { file: `${D}/01. Hero/1.png`, w: 1080 },
  // Built but not shown (see data/work.js, Doh "Social content"): "Grid 1 copy.png" is an unfinished mockup,
  // its cells labelled "Sample" / "Name" / "Reel Thumbnail" / "Crousel".
  "doh/grid-1": { file: `${D}/02. Social content/Grid 1 copy.png`, w: 1800 },
  "doh/grid-2": { file: `${D}/02. Social content/Oct Grid Drums of Heaven copy.png`, w: 1500 },
  "doh/anniversary": { file: `${D}/03. 31 yesr/31 years of doh .png`, w: 720 },
  "doh/serving": { file: `${D}/03. 31 yesr/Untitled-1 copyv3.png`, w: 1080 },
  "doh/camp-step": { file: `${D}/04. Campaign communication/C 1.png`, w: 1080 },
  "doh/camp-rice": { file: `${D}/04. Campaign communication/13-10 Post DOH.png`, w: 1080 },
  "doh/camp-exterior": { file: `${D}/04. Campaign communication/DOH Reel 2.png`, w: 1080 },
  "doh/camp-evening": { file: `${D}/04. Campaign communication/Artboard 18.png`, w: 1080 },
  "doh/camp-prawn": { file: `${D}/04. Campaign communication/1 copy.png`, w: 1080 },
  "doh/camp-chilli": { file: `${D}/04. Campaign communication/Artboard 9.png`, w: 1080 },
  "doh/camp-dish": { file: `${D}/04. Campaign communication/Dish of the week post.png`, w: 1080 },

  /* ---- 05 Royal Biryani House ---- */
  "rbh/frame-1": { file: `${R}/i1 s1 d3.png`, w: 1080 },
  "rbh/frame-2": { file: `${R}/i1 s2 d3.png`, w: 1080 },
  "rbh/frame-3": { file: `${R}/i2 s1 d2.png`, w: 1080 },
  "rbh/frame-4": { file: `${R}/i2 s2 d2.png`, w: 1080 },
  // 1:1 artwork in a 4:5 card: keep the whole headline + bowl (the small logo at far left is the part that gets cropped)
  "rbh/cover": { file: `${R}/i1 s1 d3.png`, w: 1000, cover: { ratio: 0.8, fx: 0.6, fy: 0.5 } },
  // tight on the bowl; stops short of the phone number printed at the bottom-right of the artwork
  "rbh/detail": { file: `${R}/i2 s2 d2.png`, w: 1080, crop: { x: 0.22, y: 0.44, w: 0.46, h: 0.42 } },

  /* ---- 08 Just Because ---- */
  "personal/deadpool": { file: `${P}/deadpool.jpg`, w: 1440 },
  "personal/johnwick": { file: `${P}/jnwck.jpg`, w: 1440 },
  "personal/lowpoly": { file: `${P}/Low Poly Art.png`, w: 683 },
  // Card cover for "Just Because". The card is 4:5 and this poster is 0.76:1, so it cannot reach 4:5 on height alone:
  // the lorem-ipsum strip starts at y .944, and a full-width 4:5 window is taller than the artwork above it. Cutting
  // the bottom at .938 and taking ~9px off each side (flat red/yellow margin) lands on 4:5 exactly, keeping the
  // Marvel lockup, both faces and the whole DEADPOOL / WOLVERINE title, with the lorem copy out of frame.
  "personal/cover": { file: `${P}/deadpool.jpg`, w: 1000, crop: { x: 0.00625, y: 0, w: 0.98681, h: 0.9377 } },
  "personal/exp-tealogy-store": { file: `${P}/Sm posts/Place Holder 02y.png`, w: 1080 },
  "personal/exp-tealogy-chai": { file: `${P}/Sm posts/Place Holder 3.png`, w: 1080 },
  "personal/exp-sugarroom": { file: `${P}/Sm posts/Place Holder 5.png`, w: 1080 },
  "personal/exp-jyoti": { file: `${P}/Sm posts/Place Holder 6y.png`, w: 1080 },
  "personal/exp-vrindavan": { file: `${P}/Sm posts/Place Holder copy.png`, w: 1080 },
  "personal/exp-carrykar": { file: `${P}/Sm posts/draft 1 copy.png`, w: 1200 },
  "personal/exp-basil": { file: `${P}/Sm posts/Place Holder 4.png`, w: 1080 },
  "personal/exp-diabetes": { file: `${P}/Sm posts/trial 2.jpg`, w: 1000 },
};

/* ------------------------------------------------------------------ */
/* Video list: key -> { file, poster: seconds, stills?: [seconds] }    */
/* ------------------------------------------------------------------ */
const VIDEOS = {
  "clayoven/cocktail-reel": { file: `${C}/05. motion/Cocktail Reel Clayoven.mp4`, poster: 4.99 },
  "reels/looks": { file: "06. reels/Looks Reel Edit.mp4", poster: 6.69 },
  "reels/cult": { file: "06. reels/Cult bhopal .mp4", poster: 24.84 },
  "reels/whisky": { file: "06. reels/Whisky samba interior reel.mp4", poster: 20.91 },
  "reels/bluemoon": { file: "06. reels/Blue moon Gin.mp4", poster: 13.46 },
  "ai/elie-saab": { file: "07. Ai reels/Elie Saab Ai d2.mp4", poster: 19.86, stills: { "still-city": 1.27, "still-interior": 10.56, "still-architecture": 16.9 } },
  "ai/fortunenest": { file: "07. Ai reels/fortune nest ai 03.mp4", poster: 11.16, stills: { "still-location": 6.01, "still-development": 8.59, "still-lifestyle": 11.16 } },
};

// short silent loops for the hover preview on Work cards
const PREVIEWS = {
  "nostalgia-reworked": { file: `${C}/05. motion/Cocktail Reel Clayoven.mp4`, start: 1.5, dur: 6 },
  "cut-to-the-rhythm": { file: "06. reels/Whisky samba interior reel.mp4", start: 1.5, dur: 6 },
  "beyond-the-footage": { file: "07. Ai reels/Elie Saab Ai d2.mp4", start: 0.4, dur: 6 },
};
const COVERS_FROM_VIDEO = {
  "reels/cover": { video: "06. reels/Looks Reel Edit.mp4", at: 6.69, cover: { ratio: 0.8, fx: 0.5, fy: 0.36 } },
  "ai/cover": { video: "07. Ai reels/Elie Saab Ai d2.mp4", at: 19.86, cover: { ratio: 0.8, fx: 0.5, fy: 0.5 } },
};

/* ------------------------------------------------------------------ */
const abs = (rel) => path.join(SRC, rel);
const outPath = (key, ext) => path.join(OUT, `${key}.${ext}`);
const publicUrl = (key, ext) => `/work/${key}.${ext}`;
const ensureDir = (file) => fs.mkdirSync(path.dirname(file), { recursive: true });
const upToDate = (out, src) => !FORCE && fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs;

async function encode(pipeline, key, alphaOK = true) {
  const out = outPath(key, "webp");
  ensureDir(out);
  const info = await pipeline.webp({ quality: 84, effort: 5, alphaQuality: 90, smartSubsample: true }).toFile(out);
  const blur = await sharp(out).resize({ width: 14 }).webp({ quality: 40 }).toBuffer();
  manifest.images[key] = { src: publicUrl(key, "webp"), width: info.width, height: info.height, blur: `data:image/webp;base64,${blur.toString("base64")}` };
  return info;
}

function cropBox(meta, crop) {
  return {
    left: Math.round(meta.width * crop.x),
    top: Math.round(meta.height * crop.y),
    width: Math.round(meta.width * crop.w),
    height: Math.round(meta.height * crop.h),
  };
}
function coverBox(meta, { ratio, fx, fy }) {
  let w = meta.width, h = Math.round(w / ratio);
  if (h > meta.height) { h = meta.height; w = Math.round(h * ratio); }
  const left = Math.min(meta.width - w, Math.max(0, Math.round(meta.width * fx - w / 2)));
  const top = Math.min(meta.height - h, Math.max(0, Math.round(meta.height * fy - h / 2)));
  return { left, top, width: w, height: h };
}

async function buildImage(key, spec) {
  const src = abs(spec.file);
  if (!fs.existsSync(src)) throw new Error(`Missing source for ${key}: ${spec.file}`);
  if (manifest.images[key] && upToDate(outPath(key, "webp"), src)) return "skip";
  const base = sharp(src, { limitInputPixels: false, sequentialRead: true });
  const meta = await sharp(src, { limitInputPixels: false }).metadata();
  let p = base;
  if (spec.crop) p = p.extract(cropBox(meta, spec.crop));
  else if (spec.cover) p = p.extract(coverBox(meta, spec.cover));
  p = p.resize({ width: spec.w, withoutEnlargement: true });
  const info = await encode(p, key);
  return `${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`;
}

const ffmpeg = (args) => execFileSync(FFMPEG, ["-y", "-hide_banner", "-loglevel", "error", ...args], { stdio: ["ignore", "inherit", "inherit"] });

function probeDuration(file) {
  try {
    execFileSync(FFMPEG, ["-hide_banner", "-i", file], { stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    const m = /Duration: (\d+):(\d+):(\d+\.\d+)/.exec(String(e.stderr));
    if (m) return +m[1] * 3600 + +m[2] * 60 + +m[3];
  }
  return 0;
}

async function frameToImage(videoFile, at, key, extra = {}) {
  const tmp = path.join(OUT, "_tmp_frame.png");
  ensureDir(tmp);
  ffmpeg(["-ss", String(at), "-i", videoFile, "-frames:v", "1", tmp]);
  let p = sharp(tmp);
  const meta = await sharp(tmp).metadata();
  if (extra.cover) p = p.extract(coverBox(meta, extra.cover));
  p = p.resize({ width: extra.w || 720, withoutEnlargement: true });
  await encode(p, key);
  fs.rmSync(tmp, { force: true });
}

async function buildVideo(key, spec) {
  const src = abs(spec.file);
  if (!fs.existsSync(src)) throw new Error(`Missing video for ${key}: ${spec.file}`);
  const mp4 = outPath(key, "mp4");
  ensureDir(mp4);
  const done = manifest.videos[key] && upToDate(mp4, src);
  if (!done) {
    ffmpeg([
      "-i", src,
      "-vf", "scale=720:1280:flags=lanczos",
      "-c:v", "libx264", "-preset", "medium", "-crf", "27", "-profile:v", "main", "-pix_fmt", "yuv420p",
      "-c:a", "aac", "-b:a", "96k", "-ac", "2",
      "-movflags", "+faststart",
      mp4,
    ]);
  }
  await frameToImage(src, spec.poster, `${key}-poster`, { w: 720 });
  const stills = {};
  for (const [name, at] of Object.entries(spec.stills || {})) {
    const sk = `${key}-${name}`;
    await frameToImage(src, at, sk, { w: 640 });
    stills[name] = sk;
  }
  manifest.videos[key] = {
    src: publicUrl(key, "mp4"),
    poster: `${key}-poster`,
    stills,
    width: 720,
    height: 1280,
    duration: +probeDuration(src).toFixed(1),
    sizeKB: Math.round(fs.statSync(mp4).size / 1024),
  };
  return done ? "skip (poster/stills refreshed)" : `${manifest.videos[key].sizeKB}KB`;
}

function buildPreview(name, spec) {
  const src = abs(spec.file);
  const mp4 = path.join(OUT, "previews", `${name}.mp4`);
  ensureDir(mp4);
  if (manifest.videos[`preview/${name}`] && upToDate(mp4, src)) return "skip";
  ffmpeg([
    "-ss", String(spec.start), "-t", String(spec.dur), "-i", src,
    "-vf", "crop=iw:iw*5/4,scale=520:650:flags=lanczos",
    "-an", "-c:v", "libx264", "-preset", "medium", "-crf", "30", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    mp4,
  ]);
  manifest.videos[`preview/${name}`] = { src: `/work/previews/${name}.mp4`, sizeKB: Math.round(fs.statSync(mp4).size / 1024) };
  return `${manifest.videos[`preview/${name}`].sizeKB}KB`;
}

// Cards on Home and /work only need these few entries, so they get their own small file
// (keeps the full manifest out of the client bundle).
const COVER_KEYS = ["basil/cover", "clayoven/hero", "la-isla/grid-hero", "doh/hero", "rbh/cover", "reels/cover", "ai/cover", "personal/cover"];

function save() {
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1) + "\n");
  const covers = {
    images: Object.fromEntries(COVER_KEYS.filter((k) => manifest.images[k]).map((k) => [k, manifest.images[k]])),
    videos: Object.fromEntries(Object.keys(PREVIEWS).filter((n) => manifest.videos[`preview/${n}`]).map((n) => [`preview/${n}`, manifest.videos[`preview/${n}`]])),
  };
  fs.writeFileSync(path.join(ROOT, "data", "work-covers.json"), JSON.stringify(covers, null, 1) + "\n");
}

/* ------------------------------------------------------------------ */
console.log(`Building Work assets -> ${path.relative(ROOT, OUT)}  (force=${FORCE}${ONLY ? `, only=${ONLY}` : ""})`);
let n = 0;
for (const [key, spec] of Object.entries(IMAGES)) {
  if (ONLY && !key.includes(ONLY)) continue;
  const r = await buildImage(key, spec);
  console.log(`  img  ${key.padEnd(34)} ${r}`);
  if (++n % 10 === 0) save();
}
if (ONLY) {
  save();
  console.log(`\nDone. ${n} image(s) rebuilt.`);
  process.exit(0);
}
for (const [key, spec] of Object.entries(COVERS_FROM_VIDEO)) {
  await frameToImage(abs(spec.video), spec.at, key, { cover: spec.cover, w: 1000 });
  console.log(`  img  ${key.padEnd(34)} from video frame`);
}
save();
for (const [name, spec] of Object.entries(PREVIEWS)) {
  console.log(`  prev ${name.padEnd(34)} ${buildPreview(name, spec)}`);
}
save();
for (const [key, spec] of Object.entries(VIDEOS)) {
  console.log(`  vid  ${key.padEnd(34)} ${await buildVideo(key, spec)}`);
  save();
}
save();

const mb = (p) => {
  let t = 0;
  (function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); e.isDirectory() ? walk(f) : (t += fs.statSync(f).size); } })(p);
  return (t / 1048576).toFixed(1);
};
console.log(`\nDone. public/work = ${mb(OUT)} MB, ${Object.keys(manifest.images).length} images, ${Object.keys(manifest.videos).length} videos.`);
