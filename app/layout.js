import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export const metadata = {
  // Absolute base for the preview-image and canonical URLs that link-preview crawlers fetch.
  metadataBase: new URL("https://vanshbajaj.com"),
  title: { default: "Vansh Bajaj · Graphic Designer", template: "%s · Vansh Bajaj" },
  description: "Graphic designer in New Delhi creating brand identities, social campaigns, packaging and motion-led visual systems.",
  openGraph: { title: "Vansh Bajaj · Graphic Designer", description: "Brand identity, campaign design, packaging and motion with commercial intent.", type: "website", url: "/", siteName: "Vansh Bajaj" },
  twitter: { card: "summary_large_image", title: "Vansh Bajaj · Graphic Designer", description: "Brand identity, campaign design, packaging and motion with commercial intent." },
};

export default function RootLayout({ children }) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:`try{const root=document.documentElement;const media=window.matchMedia('(prefers-color-scheme: light)');const apply=()=>{root.dataset.theme=media.matches?'light':'dark'};apply();try{localStorage.removeItem('portfolio-theme')}catch(e){}media.addEventListener?.('change',()=>{root.classList.add('theme-switching');apply();void root.offsetWidth;requestAnimationFrame(()=>requestAnimationFrame(()=>root.classList.remove('theme-switching')))})}catch(e){document.documentElement.dataset.theme='dark'}`}}/></head><body className="bg-cosmic font-sans text-hud-text antialiased"><a className="skip-link" href="#main-content">Skip to content</a><CustomCursor/><SmoothScroll>{children}</SmoothScroll></body></html>;
}
