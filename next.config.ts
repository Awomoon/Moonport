import type { NextConfig } from "next";

/**
 * Set when building for GitHub Pages (see .github/workflows/deploy.yml).
 * A project site is served from /<repo>/, so assets need that prefix; local
 * dev and any normal `next build` leave it empty and behave as usual.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export",
        basePath,
        // Pages has no image optimiser in front of it.
        images: { unoptimized: true },
        // Emit directories with index.html so /path resolves without a server.
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
