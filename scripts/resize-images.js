const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const manifestPath = path.join(__dirname, "image-manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const fullDir = path.join(__dirname, "..", "public", "images", "articles", "full");
const outputRoot = path.join(__dirname, "..", "public", "images", "articles");
const variants = [
  { name: "desktop", width: 1920, height: 1080, qualityStart: 72, qualityMin: 42, maxBytes: 195 * 1024 },
  { name: "tablet", width: 1024, height: 576, qualityStart: 76, qualityMin: 50, maxBytes: 185 * 1024 },
  { name: "mobile", width: 640, height: 360, qualityStart: 78, qualityMin: 55, maxBytes: 120 * 1024 },
];

for (const variant of variants) {
  fs.mkdirSync(path.join(outputRoot, variant.name), { recursive: true });
}

async function encodeVariant(pngPath, variant) {
  let bestBuffer = null;
  let bestQuality = variant.qualityStart;

  for (let quality = variant.qualityStart; quality >= variant.qualityMin; quality -= 4) {
    const buffer = await sharp(pngPath)
      .resize(variant.width, variant.height, { fit: "cover", position: "attention" })
      .webp({ quality, effort: 6 })
      .toBuffer();

    bestBuffer = buffer;
    bestQuality = quality;

    if (buffer.length <= variant.maxBytes) {
      return { buffer, quality, hitTarget: true };
    }
  }

  return { buffer: bestBuffer, quality: bestQuality, hitTarget: false };
}

async function processImage(entry) {
  const pngPath = path.join(fullDir, entry.filename.replace(/\.webp$/, ".png"));
  if (!fs.existsSync(pngPath)) {
    throw new Error(`Missing source image: ${pngPath}`);
  }

  const blurBuf = await sharp(pngPath)
    .resize(32, 18, { fit: "cover" })
    .webp({ quality: 20 })
    .toBuffer();
  const blurDataURL = `data:image/webp;base64,${blurBuf.toString("base64")}`;

  for (const variant of variants) {
    const outPath = path.join(outputRoot, variant.name, entry.filename);
    const result = await encodeVariant(pngPath, variant);
    fs.writeFileSync(outPath, result.buffer);
    const stat = fs.statSync(outPath);
    console.log(
      `${variant.name}: ${entry.filename} (${Math.round(stat.size / 1024)} KB, q=${result.quality}${
        result.hitTarget ? "" : ", over-target"
      })`
    );
  }

  return blurDataURL;
}

(async () => {
  console.log(`Resizing ${manifest.length} image(s) into responsive variants...`);
  for (const entry of manifest) {
    console.log(`Processing ${entry.filename}...`);
    entry.blurDataURL = await processImage(entry);
  }
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log("Done. Updated manifest with blur placeholders.");
})();
