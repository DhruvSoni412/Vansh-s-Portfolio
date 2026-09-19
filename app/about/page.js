import Image from "next/image";
import Navbar from "@/components/Navbar";
import CosmicBackground from "@/components/CosmicBackground";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About",
  description: "The full story, brands, tools and selected experience of graphic designer Vansh Bajaj.",
};

const logoBrands = [
  { name: "La Isla", src: "/about/logos/La isla.png" },
  { name: "Basi", src: "/about/logos/Layer 8.png" },
  { name: "Clayoven", src: "/about/logos/The Clayoven.png" },
  { name: "Drums of Heaven", src: "/about/logos/Drums of Heaven.png" },
  { name: "Cult.fit", src: "/about/logos/Cultfit.png" },
  { name: "Bluemoon Gin", src: "/about/logos/Bluemoon.png" },
  { name: "Whisky Samba", src: "/about/logos/WhiskySamba.png" },
  { name: "Jimmy's Cocktails", src: "/about/logos/Jimmy_s Cocktails.png" },
  { name: "Looks Salon", src: "/about/logos/Looks.png" },
];

const tools = [
  { name: "Photoshop", src: "/about/tools/Asset 5.svg" },
  { name: "Illustrator", src: "/about/tools/Asset 6.svg" },
  { name: "After Effects", src: "/about/tools/Asset 7.svg" },
  { name: "Premiere Pro", src: "/about/tools/Asset 4.svg" },
];

const experience = [
  ["2026-Now", "SaltnPepper", "CBO, Co-Founder & Creative Project Lead"],
  ["Aug 2025-Jan 2026", "Social Spork", "Graphic Designer & Social Media Manager"],
  ["Jun-Jul 2025", "Digital Palmy Inc.", "Graphic Designer & Video Editor"],
  ["Aug 2024-Jan 2025", "Creator's Commune", "Graphic Designer & Video Editor"],
  ["Feb-Jul 2024", "Urbankala Enterprise Pvt Ltd", "Social Media Intern"],
  ["Apr-Sep 2023", "Utopic Network", "Influencer Marketing Intern"],
];

function SectionLabel({ children }) {
  return <p className="eyebrow">{children}</p>;
}

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-cosmic text-hud-text">
      <CosmicBackground />
      <Navbar />
      <div id="main-content" className="relative z-10 px-5 pb-24 pt-36 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>The full story</SectionLabel>
          <h1 className="mt-5 max-w-6xl text-5xl font-semibold leading-[.95] md:text-8xl">
            I got into design to make things look good. I stuck around because I got curious why some of it actually worked.
          </h1>

          <section className="mt-16 grid gap-12 md:grid-cols-12 md:items-start">
            <div className="md:sticky md:top-28 md:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
                <Image src="/profile.jpg" alt="Portrait of Vansh Bajaj" fill priority sizes="(max-width:768px) 100vw,42vw" className="object-cover" />
              </div>
            </div>
            <div className="space-y-7 text-lg leading-relaxed text-hud-muted md:col-span-6 md:col-start-7 md:text-xl">
              <p>{`It started with two diplomas in animation and film, and a BCA I was finishing on the side - not exactly the "went to design school" path, but it got me making things. The real shift happened at 19, interning in influencer marketing on campaigns for names like Coke Studio and Amazon. I wasn't leading anything yet, but I was close enough to see how a good visual and a working campaign are the same decision, made twice.`}</p>
              <p>{"From there it was social media, then video editing, then full creative ownership - Urbankala, Creator's Commune, Digital Palmy, Social Spork - each one handing me more of the actual decision-making, not just execution. By early 2026 I was co-founding saltnpeppr as CBO, running the creative side end to end."}</p>
              <p>{"That's the shape of it: design first, marketing instinct built in from watching it happen up close - not bolted on after the fact."}</p>
            </div>
          </section>

          <section className="mt-28 border-t border-white/10 pt-12">
            <SectionLabel>{"Brands I've worked with"}</SectionLabel>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {logoBrands.map((brand) => (
                <div key={brand.name} className="flex min-h-40 items-center justify-center rounded-2xl border border-white/10 bg-[#111214] p-8">
                  <Image src={brand.src} alt={`${brand.name} logo`} width={260} height={150} className="max-h-24 w-auto object-contain" />
                </div>
              ))}
            </div>
          </section>

          <section className="mt-28 grid gap-12 border-t border-white/10 pt-12 md:grid-cols-12">
            <div className="md:col-span-6">
              <SectionLabel>Tools</SectionLabel>
              <div className="mt-8 flex flex-wrap gap-4">
                {tools.map((tool) => (
                  <div key={tool.name} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <Image src={tool.src} alt={`${tool.name} icon`} width={40} height={40} className="h-10 w-10 rounded-lg" />
                    <span className="text-sm font-semibold uppercase tracking-wider">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-5 md:col-start-8">
              <SectionLabel>Generative AI</SectionLabel>
              <p className="mt-8 text-2xl leading-snug text-hud-muted">
                I use AI tools to move faster through ideation and iteration - the taste and final call are still mine.
              </p>
            </div>
          </section>

          <section className="mt-28 border-t border-white/10 pt-12">
            <SectionLabel>Selected experience</SectionLabel>
            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {experience.map(([years, company, role]) => (
                <article key={`${company}-${years}`} className="grid gap-4 py-7 md:grid-cols-12 md:items-baseline">
                  <p className="font-mono text-xs text-gold md:col-span-3">{years}</p>
                  <h2 className="text-2xl font-semibold md:col-span-4">{company}</h2>
                  <p className="leading-relaxed text-hud-muted md:col-span-5">{role}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
