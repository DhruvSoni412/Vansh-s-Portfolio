"use client";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";

export function RevealText({ text, as = "span", className = "" }) {
  const Tag = motion[as] || motion.span; const reduced = useReducedMotion();
  return <Tag className={className} initial="hidden" whileInView="shown" viewport={{once:true,margin:"-10%"}} variants={{hidden:{},shown:{transition:{staggerChildren:.035}}}}><span className="sr-only">{text}</span><span aria-hidden="true">{text.split(" ").map((word,index)=><span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[.08em]"><motion.span className="inline-block" variants={reduced?{hidden:{},shown:{}}:{hidden:{y:"115%",rotate:2},shown:{y:0,rotate:0,transition:{duration:.72,ease:[.16,1,.3,1]}}}}>{word}&nbsp;</motion.span></span>)}</span></Tag>;
}

export function Magnetic({ children, className = "", strength = .22 }) {
  const x=useSpring(0,{stiffness:280,damping:20}), y=useSpring(0,{stiffness:280,damping:20}); const reduced=useReducedMotion();
  return <motion.span className={`inline-flex ${className}`} style={reduced?undefined:{x,y}} onPointerMove={event=>{if(reduced)return;const box=event.currentTarget.getBoundingClientRect();x.set((event.clientX-box.left-box.width/2)*strength);y.set((event.clientY-box.top-box.height/2)*strength)}} onPointerLeave={()=>{x.set(0);y.set(0)}}>{children}</motion.span>;
}

export function VelocityMarquee({ text }) {
  const track=useRef(null), offset=useRef(0), velocity=useRef(0), lastScroll=useRef(0); const reduced=useReducedMotion();
  useEffect(()=>{if(reduced)return;let frame;const node=track.current;node?.classList.remove("is-fallback");const scroll=()=>{const next=window.scrollY;velocity.current+=(next-lastScroll.current)*.035;lastScroll.current=next};const tick=()=>{velocity.current*=.91;const direction=velocity.current<0?-1:1;offset.current-=direction*(.08+Math.min(Math.abs(velocity.current),7));if(offset.current<=-50)offset.current=0;if(offset.current>0)offset.current=-50;if(node)node.style.transform=`translate3d(${offset.current}%,0,0)`;frame=requestAnimationFrame(tick)};lastScroll.current=window.scrollY;window.addEventListener("scroll",scroll,{passive:true});frame=requestAnimationFrame(tick);return()=>{window.removeEventListener("scroll",scroll);cancelAnimationFrame(frame);node?.classList.add("is-fallback")}},[reduced]);
  return <div className="marquee-container relative z-10 border-y border-white/10" aria-hidden="true"><div ref={track} className="marquee-track is-fallback">{[0,1].map(i=><div className="marquee-item" key={i}><p className={`marquee-text ${i===1?"text-outline":""}`}>{text}</p><span className="marquee-separator">•</span></div>)}</div></div>;
}
