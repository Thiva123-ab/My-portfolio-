import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    {
      name: "github-api-dev-middleware",
      configureServer(server) {
        server.middlewares.use("/api/github", (req, res) => {
          try {
            const snapshotPath = path.resolve(__dirname, "src/data/github-snapshot.json");
            const data = fs.readFileSync(snapshotPath, "utf8");
            res.setHeader("Content-Type", "application/json");
            res.end(data);
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
        });

        server.middlewares.use("/api/contact", (req, res) => {
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              success: true,
              delivered: true,
              message: "Local dev mode: Message received! In production on Vercel, this is processed by api/contact.js.",
            })
          );
        });
      },
    },
  ],
  base: "/",
});
