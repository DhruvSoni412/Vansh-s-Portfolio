import { Lato, Playfair_Display } from "next/font/google";

// CURRENTLY UNUSED. The Clayoven page now follows the site theme (see `site` in data/work.js), so nothing imports this file
// and no fonts are downloaded. To bring the brand-guideline type back (Playfair Display for headings, Lato for text):
// import getFontClasses in app/work/[slug]/page.js, pass fontClassName={getFontClasses(project.slug)} to <ProjectPage>,
// and give the theme fontDisplay: "var(--font-playfair), Georgia, serif" and fontBody: "var(--font-lato), system-ui, sans-serif".
// preload:false => other project pages wouldn't download these fonts.
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap", variable: "--font-playfair", preload: false });
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700"], display: "swap", variable: "--font-lato", preload: false });

export function getFontClasses(slug) {
  return slug === "nostalgia-reworked" ? `${playfair.variable} ${lato.variable}` : "";
}
