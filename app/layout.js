import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export const metadata = {
  title: { default: "Vansh Bajaj · Graphic Designer", template: "%s · Vansh Bajaj" },
  description: "Graphic designer in New Delhi creating brand identities, social campaigns, packaging and motion-led visual systems.",
  openGraph: { title: "Vansh Bajaj · Graphic Designer", description: "Brand identity, campaign design, packaging and motion with commercial intent.", type: "website" },
};

export default function RootLayout({ children }) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:`try{const root=document.documentElement;const media=window.matchMedia('(prefers-color-scheme: light)');const stored=localStorage.getItem('portfolio-theme');const system=()=>media.matches?'light':'dark';root.dataset.theme=stored==='light'||stored==='dark'?stored:system();media.addEventListener?.('change',()=>{if(!localStorage.getItem('portfolio-theme'))root.dataset.theme=system()})}catch(e){document.documentElement.dataset.theme='dark'}`}}/></head><body className="bg-cosmic font-sans text-hud-text antialiased"><a className="skip-link" href="#main-content">Skip to content</a><CustomCursor/><SmoothScroll>{children}</SmoothScroll></body></html>;
}
