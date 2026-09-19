import Navbar from "@/components/Navbar";
import CosmicBackground from "@/components/CosmicBackground";
import Work from "@/components/Work";
import Footer from "@/components/Footer";
export const metadata = { title: "Selected Work", description: "Brand identity, campaign, packaging and motion projects by Vansh Bajaj." };
export default function WorkPage(){return <main className="relative min-h-screen bg-cosmic text-hud-text"><CosmicBackground/><Navbar/><div id="main-content" className="pt-20"><Work/></div><Footer/></main>}
