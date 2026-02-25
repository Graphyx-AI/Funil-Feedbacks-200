import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __rootDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: __rootDir,
  },
};

export default nextConfig;
