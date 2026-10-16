import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function devApiPlugin(): import("vite").Plugin {
  return {
    name: "dev-api-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith("/api/")) return next();
        const urlPath = req.url.split("?")[0];
        const routeMap: Record<string, string> = {
          "/api/orders": "/api/orders.ts",
          "/api/contact": "/api/contact.ts",
          "/api/products": "/api/products.ts",
          "/api/settings": "/api/settings.ts",
          "/api/telegram": "/api/telegram.ts",
        };

        const targetFile = routeMap[urlPath];
        if (!targetFile) return next();

        try {
          const mod = await server.ssrLoadModule(targetFile);
          if (typeof mod.default === "function") {
            return await mod.default(req, res);
          }
        } catch (err: any) {
          console.error(`[Dev API Error] ${urlPath}:`, err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: false, error: err.message || "Dev API error" }));
          }
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(({ command }) => ({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    ...(command === "serve" ? [devApiPlugin()] : []),
    ...(command === "build" ? [nitro()] : []),
    viteReact(),
  ],
}));
