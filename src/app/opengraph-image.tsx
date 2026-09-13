import { ImageResponse } from "next/og";
import { site, hero } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Required so the card can be baked out during a static export.
export const dynamic = "force-static";

/** Social card, generated at build time so it always matches the content file. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(120% 90% at 20% 0%, #1c1b3a 0%, #080a14 55%, #04050a 100%)",
          color: "#e9edfb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#5eead4",
            }}
          />
          <div style={{ fontSize: 26, letterSpacing: 6, color: "#a3abc9" }}>
            {site.name.toUpperCase()}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 84,
            lineHeight: 1.05,
            letterSpacing: -3,
            fontWeight: 600,
          }}
        >
          {hero.headline.map((line, i) => (
            <div
              key={line}
              style={{ color: i === hero.headline.length - 1 ? "#5eead4" : "#e9edfb" }}
            >
              {line}
            </div>
          ))}
        </div>

        <div style={{ fontSize: 28, color: "#a3abc9", maxWidth: 900 }}>
          {site.description}
        </div>
      </div>
    ),
    size,
  );
}
