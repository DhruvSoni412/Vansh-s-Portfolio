"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let frame;
    const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    // Lenis measures the page's scrollable height once and doesn't notice it growing as images finish loading in
    // below the fold, so it silently caps how far it'll scroll at that stale height until something recalculates
    // it — recheck a few times after mount and again once every asset has actually loaded.
    const resizes = [300, 1000, 2000].map((delay) => setTimeout(() => lenis.resize(), delay));
    window.addEventListener("load", lenis.resize);
    return () => { cancelAnimationFrame(frame); resizes.forEach(clearTimeout); window.removeEventListener("load", lenis.resize); lenis.destroy(); delete window.__lenis; };
  }, []);
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) { window.__lenis?.scrollTo(0, { immediate: true }); return; }
    // On a client-side route change the new page's DOM (e.g. the footer's #contact) can still be mounting when
    // this effect fires, and images loading in below/above the target keep shifting its position for a moment
    // after that — so keep re-aligning for a bit instead of jumping once to a position that goes stale.
    let cancelled = false;
    const alignToHash = () => {
      const target = document.querySelector(hash);
      if (!target) return;
      window.__lenis?.resize();
      window.__lenis?.scrollTo(target, { immediate: true });
    };
    const timers = [0, 50, 150, 300, 600, 1000, 1600].map((delay) => setTimeout(() => { if (!cancelled) alignToHash(); }, delay));
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [pathname]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sections = [...document.querySelectorAll("section")];
    sections.forEach(section => section.classList.add("section-entrance"));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);
  return children;
}
