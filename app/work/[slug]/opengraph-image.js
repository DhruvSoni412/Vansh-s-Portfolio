import { ImageResponse } from "next/og";
import { getWorkProject, workProjects } from "@/data/work";

// Per-project link-preview card, drawn in the project's own palette. One static PNG per project at build time.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return workProjects.map(({ slug }) => ({ slug }));
}

export async function generateImageMetadata({ params }) {
  const { slug } = await params;
  const project = getWorkProject(slug);
  return [{ id: "card", size, contentType, alt: project ? `${project.title} — ${project.context} · Vansh Bajaj` : "Vansh Bajaj" }];
}

export default async function ProjectOpengraphImage({ params }) {
  const { slug } = await params;
  const project = getWorkProject(slug);
  const t = project?.theme ?? { bg: "#111214", fg: "#EDEDED", muted: "#9ca3af", accent: "#C8FF4D" };

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: t.bg, color: t.fg, padding: 72 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: t.muted, letterSpacing: 4, textTransform: "uppercase" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 14, height: 14, borderRadius: 999, background: t.accent, marginRight: 16 }} />
            Vansh Bajaj · Work
          </div>
          {project && <div style={{ display: "flex" }}>{project.number}</div>}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {project && <div style={{ fontSize: 36, color: t.accent, marginBottom: 20 }}>{project.context}</div>}
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>{project?.title ?? "Selected Work"}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: t.muted, lineHeight: 1.4, maxWidth: 980 }}>{project?.descriptor ?? ""}</div>
      </div>
    ),
    size,
  );
}
