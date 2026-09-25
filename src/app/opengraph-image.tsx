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
            "radial-gradient(120% 85% at 50% -12%, #16202c 0%, #0d1219 46%, #0b0d10 100%)",
          color: "#efeae0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="52" height="52" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="21" stroke="#d6a93c" strokeWidth="1.4" opacity="0.4" />
            <path
              d="M24 1.6v5.2M24 41.2v5.2M1.6 24h4.2M42.2 24h4.2"
              stroke="#d6a93c"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M24.6 13.6a10.5 10.5 0 1 0 0 20.8 9.4 9.4 0 1 1 0-20.8Z"
              fill="#d6a93c"
            />
            <path
              d="M14.5 17.5 8.8 24l5.7 6.5M33.5 17.5 39.2 24l-5.7 6.5"
              stroke="#d6a93c"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, letterSpacing: 2, fontWeight: 600 }}>
              {site.name.toUpperCase()}
            </div>
            <div style={{ fontSize: 20, letterSpacing: 7, color: "#d6a93c" }}>
              {site.alias.toUpperCase()}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 82,
            lineHeight: 1.05,
            letterSpacing: -3,
            fontWeight: 600,
          }}
        >
          {hero.headline.map((line, i) => (
            <div
              key={line}
              style={{ color: i === hero.headline.length - 1 ? "#d6a93c" : "#efeae0" }}
            >
              {line}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9aa7b6" }}>
          <div>{site.fullName}</div>
          <div style={{ color: "#d6a93c", letterSpacing: 3 }}>{site.coordinates}</div>
        </div>
      </div>
    ),
    size,
  );
}
