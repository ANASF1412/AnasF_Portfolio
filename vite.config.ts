import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import { resolve } from "node:path";
import { portfolioAssetAudit } from "./scripts/vite-asset-audit";

export default defineConfig({
  resolve: {
    alias: { "@": resolve(import.meta.dirname, "./src") },
    dedupe: ["react", "react-dom"],
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    // Redirect TanStack Start's bundled server entry to src/server.ts (SSR error wrapper).
    tanstackStart({ server: { entry: "server" } }),
    nitro(),
    viteReact(),
    // Validates portfolio-data.ts against the files in public/ on every build.
    portfolioAssetAudit(),
  ],
});
