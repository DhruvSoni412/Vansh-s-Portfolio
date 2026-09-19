"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
export default function CustomCursor() {
  const reduced=useReducedMotion(); const [enabled,setEnabled]=useState(false); const [active,setActive]=useState(false);
  const x=useMotionValue(-40), y=useMotionValue(-40); const sx=useSpring(x,{stiffness:700,damping:45}), sy=useSpring(y,{stiffness:700,damping:45});
  useEffect(()=>{const fine=window.matchMedia("(pointer: fine)"); const frame=requestAnimationFrame(()=>setEnabled(fine.matches&&!reduced)); const move=e=>{x.set(e.clientX-8);y.set(e.clientY-8)}; const over=e=>setActive(Boolean(e.target.closest("a, button"))); window.addEventListener("pointermove",move);document.addEventListener("pointerover",over);return()=>{cancelAnimationFrame(frame);window.removeEventListener("pointermove",move);document.removeEventListener("pointerover",over)}},[reduced,x,y]);
  if(!enabled)return null;
  return <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[200] h-4 w-4 rounded-full bg-gold mix-blend-difference" style={{x:sx,y:sy}} animate={{scale:active?2.2:1}}/>;
}
