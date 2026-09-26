import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  // Relative base makes the build work whether it is served from /, /docs, or a subpath.
  base: "./",
  build: {
    // Emit the production build straight into the sibling `docs/` folder that GitHub Pages serves.
    outDir: "../docs",
    emptyOutDir: true,
    sourcemap: true,
    target: "es2020",
  },
  server: {
    port: 5173,
    open: true,
  },
});
