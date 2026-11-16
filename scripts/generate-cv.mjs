import { copyFileSync, existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcPdf = join(__dirname, "..", "src", "assets", "Thivanka_Tharuka_CV.pdf");
const pubDir = join(__dirname, "..", "public");
mkdirSync(pubDir, { recursive: true });
const destPdf = join(pubDir, "Thivanka_Tharuka_CV.pdf");

if (existsSync(srcPdf)) {
  copyFileSync(srcPdf, destPdf);
  console.log("Synced official CV:", destPdf);
} else {
  console.warn("Source CV not found at", srcPdf);
}
