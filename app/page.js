"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import CosmicBackground from "@/components/CosmicBackground";
import HomeContent from "@/components/HomeContent";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const seen = window.sessionStorage.getItem("portfolio-intro-seen");
      if (!seen && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setLoading(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const finishIntro = () => {
    window.sessionStorage.setItem("portfolio-intro-seen", "true");
    setLoading(false);
  };
  return (
    <main className="relative min-h-screen bg-cosmic text-hud-text">
      <CosmicBackground />
      <AnimatePresence>{loading && <Preloader onComplete={finishIntro} />}</AnimatePresence>
      <Navbar />
      <HomeContent />
      <Testimonials />
      <Footer />
    </main>
  );
}
