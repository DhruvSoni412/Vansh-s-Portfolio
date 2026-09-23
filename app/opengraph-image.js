import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// The link-preview card shown when the site is shared (WhatsApp, LinkedIn, X, iMessage, Slack…).
// Rendered once at build time into a static PNG; child routes inherit it unless they define their own.
export const alt = "Vansh Bajaj · Graphic Designer, New Delhi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public/profile.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#111214", color: "#EDEDED", padding: 72 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingRight: 56 }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: "#9ca3af", letterSpacing: 4, textTransform: "uppercase" }}>
            <div style={{ width: 14, height: 14, borderRadius: 999, background: "#C8FF4D", marginRight: 16 }} />
            vanshbajaj.com
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 104, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>Vansh Bajaj</div>
            <div style={{ fontSize: 44, color: "#C8FF4D", marginTop: 20 }}>Graphic Designer</div>
          </div>
          <div style={{ fontSize: 24, color: "#9ca3af", lineHeight: 1.4 }}>
            Brand identity · Campaigns · Packaging · Motion
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={photoSrc} width={420} height={486} style={{ objectFit: "cover", borderRadius: 24 }} />
      </div>
    ),
    size,
  );
}
