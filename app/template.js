"use client";
import { motion, useReducedMotion } from "framer-motion";
export default function Template({ children }) {
  const reduced = useReducedMotion();
  if (reduced) return children;
  return <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.65,delay:.16,ease:[.76,0,.24,1]}}><motion.div aria-hidden="true" className="fixed inset-0 z-[190] bg-cosmic" initial={{y:0,borderBottomLeftRadius:"0%",borderBottomRightRadius:"0%"}} animate={{y:"-110%",borderBottomLeftRadius:"50%",borderBottomRightRadius:"50%"}} transition={{duration:.9,ease:[.76,0,.24,1]}}/>{children}</motion.div>;
}
