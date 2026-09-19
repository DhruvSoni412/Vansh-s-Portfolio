import { Lato, Playfair_Display } from "next/font/google";

// Clayoven's brand guidelines specify Playfair Display (expressive moments) + Lato (supporting text).
// Only the Clayoven project page applies them; every other page keeps the site typography.
// preload:false => other project pages don't download these fonts.
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap", variable: "--font-playfair", preload: false });
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700"], display: "swap", variable: "--font-lato", preload: false });

export function getFontClasses(slug) {
  return slug === "nostalgia-reworked" ? `${playfair.variable} ${lato.variable}` : "";
}
