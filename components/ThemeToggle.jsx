"use client";
import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

/* data-theme on <html> is the single source of truth — the inline script in app/layout.js sets it before first paint.
 * The button subscribes to it rather than keeping its own copy, so it can never drift out of step: an effect that
 * synced a local copy would run late (or, inside requestAnimationFrame, not at all on a page that loads hidden in a
 * background tab), and the first click would then toggle the wrong way. */
const subscribe = (onChange) => {
  window.addEventListener("portfolio-theme-change", onChange);
  return () => window.removeEventListener("portfolio-theme-change", onChange);
};
const readTheme = () => document.documentElement.dataset.theme || "dark";

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark");
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("portfolio-theme", next);
    window.dispatchEvent(new CustomEvent("portfolio-theme-change", { detail: next }));
  };
  const isDark = theme === "dark";
  return <button type="button" onClick={toggle} aria-label={`Switch to ${isDark ? "light" : "dark"} mode`} aria-pressed={!isDark} className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-full border border-white/15 bg-cosmic/85 text-hud-text backdrop-blur-xl transition hover:border-gold hover:text-gold"><AnimatePresence mode="wait" initial={false}>{isDark ? <motion.span key="sun" initial={{y:18,rotate:-45,opacity:0}} animate={{y:0,rotate:0,opacity:1}} exit={{y:-18,rotate:45,opacity:0}}><Sun size={19}/></motion.span> : <motion.span key="moon" initial={{y:18,rotate:-45,opacity:0}} animate={{y:0,rotate:0,opacity:1}} exit={{y:-18,rotate:45,opacity:0}}><Moon size={19}/></motion.span>}</AnimatePresence></button>;
}
