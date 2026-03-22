const fs = require("fs");
const path = require("path");
const https = require("https");
const { OpenAI } = require("openai");

const manifestPath = path.join(__dirname, "image-manifest.json");
const progressPath = path.join(__dirname, "generation-progress.json");
const outputDir = path.join(__dirname, "..", "public", "images", "articles", "full");

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is required");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const progress = fs.existsSync(progressPath)
  ? JSON.parse(fs.readFileSync(progressPath, "utf8"))
  : {};

fs.mkdirSync(outputDir, { recursive: true });

function saveProgress() {
  fs.writeFileSync(progressPath, JSON.stringify(progress, null, 2) + "\n");
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Download failed with status ${res.statusCode}`));
          return;
        }
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
      })
      .on("error", (err) => {
        fs.unlink(dest, () => reject(err));
      });
  });
}

async function generateImage(entry) {
  const pngPath = path.join(outputDir, entry.filename.replace(/\.webp$/, ".png"));

  if (progress[entry.id] === "done" && fs.existsSync(pngPath)) {
    console.log(`SKIP ${entry.id} ${entry.filename} (already done)`);
    return;
  }

  console.log(`GENERATING ${entry.id}: ${entry.filename} — ${entry.title}`);

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: entry.prompt,
      n: 1,
      size: "1792x1024",
      style: "vivid",
      quality: "hd",
    });

    const imageBase64 = response.data?.[0]?.b64_json;
    const imageUrl = response.data?.[0]?.url;

    if (imageBase64) {
      fs.writeFileSync(pngPath, Buffer.from(imageBase64, "base64"));
    } else if (imageUrl) {
      await downloadFile(imageUrl, pngPath);
    } else {
      throw new Error("No image payload returned by API");
    }

    progress[entry.id] = "done";
    saveProgress();
    console.log(`  ✓ Saved ${pngPath}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    progress[entry.id] = `error: ${message}`;
    saveProgress();
    console.error(`  ✗ FAILED ${entry.id}: ${message}`);
  }

  await new Promise((resolve) => setTimeout(resolve, Number(process.env.IMAGE_DELAY_MS || 9000)));
}

(async () => {
  console.log(`Generating ${manifest.length} image(s)...`);
  for (const entry of manifest) {
    await generateImage(entry);
  }

  const values = Object.values(progress);
  const done = values.filter((value) => value === "done").length;
  const failed = values.filter((value) => String(value).startsWith("error:")).length;
  console.log(`\nComplete: ${done} done, ${failed} failed`);
})();
