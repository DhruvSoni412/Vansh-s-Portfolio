import { notFound, redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectPage from "@/components/work/ProjectPage";
import { getNextWorkProject, getWorkProject, legacySlugRedirects, workProjects } from "@/data/work";

// Project pages carry their own palettes and are always dark. Pinning the site's colour tokens here keeps the shared
// Navbar/Footer readable on them even when a visitor's OS is in light mode.
const DARK_TOKENS = {
  "--bg": "#111214",
  "--bg-rgb": "17 18 20",
  "--surface-rgb": "24 26 29",
  "--text": "#EDEDED",
  "--text-rgb": "237 237 237",
  "--muted-rgb": "156 163 175",
  "--line-rgb": "255 255 255",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return workProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getWorkProject(slug);
  return project ? { title: project.title, description: project.descriptor } : {};
}

export default async function ProjectRoute({ params }) {
  const { slug } = await params;
  const project = getWorkProject(slug);

  if (!project) {
    const legacy = legacySlugRedirects[slug];
    if (legacy) redirect(legacy);
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-cosmic text-hud-text" style={DARK_TOKENS}>
      <Navbar />
      <ProjectPage project={project} next={getNextWorkProject(slug)} />
      <Footer />
    </main>
  );
}
