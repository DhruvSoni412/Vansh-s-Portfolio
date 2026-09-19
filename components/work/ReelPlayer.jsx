"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

// Only one reel plays at a time.
let activeVideo = null;
// Browsers only allow autoplay with sound after a click/tap, so reels start muted. Once the visitor
// turns sound on (a real click), every reel after that starts with sound too.
let soundPreferred = false;

/**
 * Large vertical reel. It starts by itself when scrolled into view and pauses when scrolled away.
 * Small controls let the visitor pause it or switch sound on. Visitors who prefer reduced motion
 * (and browsers that block autoplay) get the poster with a play button instead.
 */
export default function ReelPlayer({ video, title, size = "lg" }) {
  const ref = useRef(null);
  const inView = useRef(false);
  const pausedByUser = useRef(false);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [showingVideo, setShowingVideo] = useState(false); // first frame is on screen -> hide the poster
  const [muted, setMuted] = useState(true);
  const [blocked, setBlocked] = useState(false); // the browser refused to start playback
  const [userPaused, setUserPaused] = useState(false); // mirrors pausedByUser for rendering

  // Frame width follows the viewport height so the whole reel fits on screen.
  const cap = size === "xl" ? "30rem" : "25rem";
  const vh = size === "xl" ? 88 : 82;

  const play = () => {
    const el = ref.current;
    if (!el) return;
    if (activeVideo && activeVideo !== el) activeVideo.pause();
    activeVideo = el;
    el.muted = !soundPreferred;
    setMuted(el.muted);
    el.play().then(() => setBlocked(false)).catch((error) => {
      if (error?.name !== "NotAllowedError") return; // AbortError etc.: a pause() raced the play(), nothing to do
      if (!el.muted) {
        el.muted = true; // sound not allowed yet -> fall back to silent playback
        setMuted(true);
        el.play().then(() => setBlocked(false)).catch(() => setBlocked(true));
      } else {
        setBlocked(true);
      }
    });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio >= 0.55) {
        inView.current = true;
        if (!pausedByUser.current && document.visibilityState === "visible") play();
      } else if (entry.intersectionRatio < 0.25) {
        inView.current = false;
        pausedByUser.current = false; // re-entering the section starts it again
        setUserPaused(false);
        el.pause();
      }
    }, { threshold: [0, 0.25, 0.55] });
    observer.observe(el);

    const onVisibility = () => {
      if (document.visibilityState !== "visible") el.pause();
      else if (inView.current && !pausedByUser.current) play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (activeVideo === el) activeVideo = null;
    };
  }, [reduced]);

  const togglePlay = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      pausedByUser.current = false;
      setUserPaused(false);
      if (reduced || blocked) soundPreferred = true; // this click is a real gesture, so sound is allowed
      play();
    } else {
      pausedByUser.current = true;
      setUserPaused(true);
      el.pause();
    }
  };

  const toggleSound = () => {
    const el = ref.current;
    if (!el) return;
    soundPreferred = el.muted; // clicking while muted = "I want sound"
    el.muted = !soundPreferred;
    setMuted(el.muted);
  };

  const showBigPlay = !playing && (reduced || blocked || userPaused);

  return (
    <div
      className="relative mx-auto overflow-hidden rounded-[1.5rem] bg-black shadow-2xl shadow-black/40 md:rounded-[2rem]"
      style={{ width: `min(100%, calc(${vh}vh * 9 / 16), ${cap})`, aspectRatio: "9 / 16" }}
    >
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={video.src}
        preload="metadata"
        playsInline
        loop
        muted
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onPlaying={() => setShowingVideo(true)}
        aria-label={`${title} reel`}
      />

      {/* poster covers the frame until playback actually starts (no black flash while the video loads) */}
      <Image
        src={video.poster.src}
        alt={video.poster.alt}
        fill
        sizes={`(min-width: 768px) ${size === "xl" ? 480 : 400}px, 100vw`}
        placeholder={video.poster.blurDataURL ? "blur" : "empty"}
        blurDataURL={video.poster.blurDataURL}
        className={`pointer-events-none object-cover transition-opacity duration-500 ${showingVideo ? "opacity-0" : "opacity-100"}`}
      />

      {showBigPlay && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={`Play ${title} reel`}
          className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[color:var(--pj-accent)] text-black shadow-xl transition duration-300 hover:scale-110 md:h-24 md:w-24"
        >
          <Play size={30} className="translate-x-0.5 fill-current" aria-hidden="true" />
        </button>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/60 to-transparent p-4 md:p-5">
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          aria-pressed={!muted}
          className="inline-flex items-center gap-2 rounded-full bg-black/50 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-md transition hover:bg-black/70"
        >
          {muted ? <VolumeX size={14} aria-hidden="true" /> : <Volume2 size={14} aria-hidden="true" />}
          {muted ? "Sound off" : "Sound on"}
        </button>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? `Pause ${title} reel` : `Play ${title} reel`}
          className="grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:bg-black/70"
        >
          {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} className="translate-x-px" aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
