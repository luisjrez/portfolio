import type { NextConfig } from "next";

// GitHub Pages serves project sites under /<repo-name>; the CI workflow
// injects that prefix here. Locally it stays empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
