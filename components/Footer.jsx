"use client";
import { Mail, Phone, Linkedin, Instagram, MessageCircle } from "lucide-react";
import CurvedTransition from "./CurvedTransition";
import { Magnetic, RevealText } from "./MotionText";

const channels = [
  { label: "Email", href: "mailto:hello@vanshbajaj.com", icon: Mail, primary: true },
  { label: "WhatsApp", href: "https://wa.me/919555779616?text=Hello%20I%20would%20like%20to%20book%20a%20call%20to%20discuss%20my%20project", icon: MessageCircle },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vansh-bajaj-b2bba625a", icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/vansh.media/", icon: Instagram },
  { label: "Call", href: "tel:+919555779616", icon: Phone },
];

export default function Footer() {
  return <><CurvedTransition/><footer id="contact" className="relative z-30 bg-cosmic px-5 pb-10 pt-16 md:px-10"><div className="mx-auto max-w-7xl">
    <p className="eyebrow">Have a brief worth opening?</p>
    <RevealText as="h2" text="Send it my way." className="mt-5 block max-w-5xl text-[13vw] font-extrabold uppercase leading-[.82] tracking-[-.06em] md:text-[8vw]"/>
    <div className="mt-14 flex flex-wrap gap-3" aria-label="Contact channels">{channels.map(({label,href,icon:Icon,primary}) => href ? <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className={`inline-flex items-center gap-3 rounded-2xl border px-5 py-4 font-semibold transition ${primary ? "border-gold bg-gold text-cosmic" : "border-white/15 bg-white/5 hover:border-gold hover:text-gold"}`}><Icon size={20}/><Magnetic>{label}</Magnetic></a> : <span key={label} aria-disabled="true" className="inline-flex cursor-not-allowed items-center gap-3 rounded-2xl border border-white/10 px-5 py-4 text-hud-muted opacity-50"><Icon size={20}/>{label}</span>)}</div>
    <div className="mt-20 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-hud-muted md:flex-row md:justify-between"><p>© {new Date().getFullYear()} Vansh Bajaj</p><p>Graphic designer · New Delhi, India</p></div>
  </div></footer></>;
}
