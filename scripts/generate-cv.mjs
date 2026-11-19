import { copyFileSync, existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const pubDir = join(rootDir, "public");
const assetsDir = join(rootDir, "src", "assets");
mkdirSync(pubDir, { recursive: true });
mkdirSync(assetsDir, { recursive: true });

// Files to sync to public for web access and downloads
const files = [
  "Thivanka_Tharuka_CV.pdf",
  "Thivanka_Tharuka_CV.docx",
];

for (const file of files) {
  const assetPath = join(assetsDir, file);
  const rootPath = join(rootDir, file);
  const pubPath = join(pubDir, file);

  // If file exists in root or assets, ensure it's synced to public
  if (existsSync(rootPath) && !existsSync(pubPath)) {
    copyFileSync(rootPath, pubPath);
    console.log(`Synced ${file} from root to public`);
  } else if (existsSync(assetPath) && !existsSync(pubPath)) {
    copyFileSync(assetPath, pubPath);
    console.log(`Synced ${file} from assets to public`);
  } else if (existsSync(pubPath)) {
    // Also keep asset copy in sync
    if (!existsSync(assetPath)) {
      copyFileSync(pubPath, assetPath);
    }
    console.log(`Verified ${file} in public/`);
  } else {
    console.warn(`Warning: ${file} not found in root, assets, or public.`);
  }
}

console.log("CV assets verified for build.");
