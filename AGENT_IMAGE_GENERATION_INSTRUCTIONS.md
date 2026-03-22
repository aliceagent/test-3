# Agent Instructions: Generate Header Images for Torah Light

## Overview

You are generating **363 header images** for a bilingual Orthodox Jewish learning website called Torah Light. Each article already contains a DALL-E prompt embedded in its English body text. Your job is to:

1. Extract all prompts from `src/data/articles.json`
2. Generate images via the DALL-E 3 API
3. Convert and resize each image to 3 responsive WebP variants
4. Name files using the convention below
5. Strip the prompt text from articles after images are placed
6. Submit everything as a **single pull request** for review

---

## Repository & Branch Setup

```bash
git clone https://github.com/jonathancaras/torah-light.git
cd torah-light
npm install
git checkout -b images/generate-all-363-headers
```

---

## Step 1: Extract Prompts

Run this to build the manifest of all 363 prompts:

```bash
node scripts/extract-prompts.js
```

If the script doesn't exist yet, create `scripts/extract-prompts.js`:

```js
const fs = require("fs");
const articles = JSON.parse(fs.readFileSync("src/data/articles.json", "utf8"));

// Track per-section index for naming
const sectionCounters = {};

const manifest = articles
  .map((art) => {
    const match = art.body_en?.match(
      /> \*\*Header Image Description \(DALL-E prompt\):\*\* ([\s\S]*?)(?:\n\n|\n(?!>)|$)/
    );
    if (!match) return null;

    if (!sectionCounters[art.section]) sectionCounters[art.section] = 0;
    sectionCounters[art.section]++;
    const idx = String(sectionCounters[art.section]).padStart(3, "0");

    return {
      id: art.id,
      section: art.section,
      title: art.title_en,
      filename: `${art.section}-${idx}.webp`,
      prompt: match[1].trim(),
    };
  })
  .filter(Boolean);

fs.writeFileSync("scripts/image-manifest.json", JSON.stringify(manifest, null, 2));
console.log(`Extracted ${manifest.length} prompts → scripts/image-manifest.json`);
```

**Verify output**: `scripts/image-manifest.json` should have exactly **363 entries**. If not, stop and investigate.

---

## Step 2: Generate Images via DALL-E 3

### API Settings

| Setting | Value |
|---------|-------|
| **Model** | `dall-e-3` |
| **Size** | `1792x1024` (closest to 16:9) |
| **Style** | `vivid` |
| **Quality** | `hd` |
| **Response format** | `url` (download the PNG) |

### Generation Script

Create `scripts/generate-images.js`:

```js
const fs = require("fs");
const path = require("path");
const https = require("https");
const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const manifest = JSON.parse(fs.readFileSync("scripts/image-manifest.json", "utf8"));
const outputDir = "public/images/articles/full";
fs.mkdirSync(outputDir, { recursive: true });

// Track progress for resumability
const progressFile = "scripts/generation-progress.json";
const progress = fs.existsSync(progressFile)
  ? JSON.parse(fs.readFileSync(progressFile, "utf8"))
  : {};

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (err) => { fs.unlink(dest, () => {}); reject(err); });
  });
}

async function generateImage(entry) {
  const pngPath = path.join(outputDir, entry.filename.replace(".webp", ".png"));

  // Skip if already generated
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

    const imageUrl = response.data[0].url;
    await downloadFile(imageUrl, pngPath);

    progress[entry.id] = "done";
    fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2));
    console.log(`  ✓ Saved ${pngPath}`);
  } catch (err) {
    console.error(`  ✗ FAILED ${entry.id}: ${err.message}`);
    progress[entry.id] = `error: ${err.message}`;
    fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2));
  }

  // Rate limit: DALL-E 3 allows ~7 images/min on tier 1
  await new Promise((r) => setTimeout(r, 9000));
}

(async () => {
  console.log(`Generating ${manifest.length} images...`);
  for (const entry of manifest) {
    await generateImage(entry);
  }
  const done = Object.values(progress).filter((v) => v === "done").length;
  const failed = Object.values(progress).filter((v) => v !== "done").length;
  console.log(`\nComplete: ${done} done, ${failed} failed`);
})();
```

### Running Generation

```bash
export OPENAI_API_KEY="sk-..."
node scripts/generate-images.js
```

**Important notes:**
- This takes ~55 minutes at ~7 images/min. The script is **resumable** — re-run it to retry failures.
- After completion, check `scripts/generation-progress.json` for any entries with `"error:"`. Re-run the script to retry them.
- All 363 images MUST succeed before proceeding. Zero tolerance for missing images.

---

## Step 3: Convert to WebP and Resize

### Install sharp

```bash
npm install --save-dev sharp
```

### Create `scripts/resize-images.js`:

```js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const manifest = JSON.parse(fs.readFileSync("scripts/image-manifest.json", "utf8"));
const fullDir = "public/images/articles/full";
const variants = [
  { name: "desktop", width: 1920, height: 1080 },
  { name: "tablet", width: 1024, height: 576 },
  { name: "mobile", width: 640, height: 360 },
];

// Create output directories
variants.forEach((v) => fs.mkdirSync(`public/images/articles/${v.name}`, { recursive: true }));

async function processImage(entry) {
  const pngPath = path.join(fullDir, entry.filename.replace(".webp", ".png"));
  if (!fs.existsSync(pngPath)) {
    console.error(`MISSING: ${pngPath}`);
    return null;
  }

  const blurBuf = await sharp(pngPath)
    .resize(32, 18)
    .webp({ quality: 20 })
    .toBuffer();
  const blurDataURL = `data:image/webp;base64,${blurBuf.toString("base64")}`;

  for (const v of variants) {
    const outPath = path.join(`public/images/articles/${v.name}`, entry.filename);
    await sharp(pngPath)
      .resize(v.width, v.height, { fit: "cover" })
      .webp({ quality: 80 })
      .toFile(outPath);
    const stat = fs.statSync(outPath);
    console.log(`  ${v.name}: ${outPath} (${Math.round(stat.size / 1024)} KB)`);
  }

  return blurDataURL;
}

(async () => {
  console.log(`Resizing ${manifest.length} images into 3 variants each...`);
  for (const entry of manifest) {
    console.log(`Processing ${entry.filename}...`);
    const blur = await processImage(entry);
    if (blur) entry.blurDataURL = blur;
  }
  fs.writeFileSync("scripts/image-manifest.json", JSON.stringify(manifest, null, 2));
  console.log("Done. Updated manifest with blur placeholders.");
})();
```

### Run it

```bash
node scripts/resize-images.js
```

### Verify

```bash
# Should be exactly 363 files in each directory
ls public/images/articles/desktop/ | wc -l   # expect 363
ls public/images/articles/tablet/ | wc -l    # expect 363
ls public/images/articles/mobile/ | wc -l    # expect 363

# Check file sizes are reasonable (< 200 KB each)
du -sh public/images/articles/desktop/    # expect ~30-50 MB total
du -sh public/images/articles/tablet/     # expect ~15-25 MB total
du -sh public/images/articles/mobile/     # expect ~8-15 MB total
```

---

## Step 4: Build the Image Lookup Map

Create `scripts/build-image-map.js`:

```js
const fs = require("fs");
const manifest = JSON.parse(fs.readFileSync("scripts/image-manifest.json", "utf8"));

const lines = manifest.map(
  (e) =>
    `  ${e.id}: { filename: "${e.filename}", blurDataURL: "${e.blurDataURL || ""}" }`
);

const output = `// Auto-generated — do not edit manually
// Run: node scripts/build-image-map.js
export const articleImageMap: Record<number, {
  filename: string;
  blurDataURL: string;
} | undefined> = {
${lines.join(",\n")}
};
`;

fs.writeFileSync("src/data/image-map.ts", output);
console.log(`Generated src/data/image-map.ts with ${manifest.length} entries`);
```

```bash
node scripts/build-image-map.js
```

---

## Step 5: Create the ArticleHeroImage Component

Create `src/components/ArticleHeroImage.tsx`:

```tsx
import Image from "next/image";

interface ArticleHeroImageProps {
  filename: string;
  alt: string;
  blurDataURL?: string;
}

export default function ArticleHeroImage({
  filename,
  alt,
  blurDataURL,
}: ArticleHeroImageProps) {
  return (
    <div className="w-full aspect-video relative rounded-xl overflow-hidden shadow-md mb-8">
      <picture>
        <source
          media="(max-width: 639px)"
          srcSet={`/images/articles/mobile/${filename}`}
        />
        <source
          media="(max-width: 1023px)"
          srcSet={`/images/articles/tablet/${filename}`}
        />
        <img
          src={`/images/articles/desktop/${filename}`}
          alt={alt}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </picture>
    </div>
  );
}
```

> **Note**: We use `<picture>` instead of `next/image` because this is a client component (`"use client"` in the article page). The `<picture>` element gives us explicit control over responsive sources.

---

## Step 6: Update the Article Page

Edit `src/app/[locale]/articles/[id]/page.tsx`:

### 6a. Add imports at the top

```ts
import { articleImageMap } from "@/data/image-map";
import ArticleHeroImage from "@/components/ArticleHeroImage";
```

### 6b. Strip the DALL-E prompt from rendered body

In the `getBody(a: Article)` function (or wherever the body text is prepared), add this regex replacement **before** the body is passed to `<ReactMarkdown>`:

```ts
function stripImageDescription(body: string): string {
  return body
    .replace(
      /> \*\*Header Image Description \(DALL-E prompt\):\*\*[\s\S]*?(?=\n\n|\n(?!>)|$)/,
      ""
    )
    .trim();
}
```

Apply it wherever `body_en`, `body_zh`, or `body_he` is used for rendering.

### 6c. Render the hero image above the article body

Find where the article title is rendered and add the hero image right below it, before the `<ReactMarkdown>` content:

```tsx
{/* Hero Image */}
{articleImageMap[article.id] && (
  <ArticleHeroImage
    filename={articleImageMap[article.id]!.filename}
    alt={title}
    blurDataURL={articleImageMap[article.id]!.blurDataURL}
  />
)}

{/* Article Body (existing ReactMarkdown block) */}
<ReactMarkdown ...>
  {stripImageDescription(body)}
</ReactMarkdown>
```

---

## Step 7: Strip Prompts from articles.json

After images are in place and rendering correctly, clean up the prompt text from the article data.

Create `scripts/strip-image-descriptions.js`:

```js
const fs = require("fs");
const articles = JSON.parse(fs.readFileSync("src/data/articles.json", "utf8"));

let stripped = 0;
articles.forEach((art) => {
  ["body_en", "body_zh", "body_he"].forEach((field) => {
    if (!art[field]) return;
    const before = art[field];
    art[field] = art[field]
      .replace(
        /> \*\*Header Image Description \(DALL-E prompt\):\*\*[\s\S]*?(?=\n\n|\n(?!>)|$)/,
        ""
      )
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    if (art[field] !== before) stripped++;
  });
});

fs.writeFileSync("src/data/articles.json", JSON.stringify(articles, null, 2));
console.log(`Stripped ${stripped} image descriptions from articles.json`);
```

```bash
node scripts/strip-image-descriptions.js
```

**IMPORTANT**: Only run this AFTER you've confirmed all images render correctly. This is a one-way operation.

---

## Step 8: Set Up Git LFS

```bash
git lfs install
git lfs track "public/images/articles/**/*.webp"
git add .gitattributes
```

---

## Step 9: Verify Everything Works

```bash
# Build must succeed
npm run build

# Check no broken images or import errors
npm run dev
# Manually check at least these pages:
#   /en/articles/1   (weekly-parsha)
#   /en/articles/200  (shabbat)
#   /en/articles/169  (mussar)
#   /zh/articles/1   (Chinese locale)
#   /he/articles/1   (Hebrew/RTL locale)
```

### Verification checklist before PR:

- [ ] All 363 images exist in `public/images/articles/desktop/`
- [ ] All 363 images exist in `public/images/articles/tablet/`
- [ ] All 363 images exist in `public/images/articles/mobile/`
- [ ] Every file is < 200 KB
- [ ] `src/data/image-map.ts` has 363 entries
- [ ] `npm run build` succeeds with zero errors
- [ ] Images render on article pages (spot check 5+ articles)
- [ ] DALL-E prompt blockquotes no longer appear in rendered articles
- [ ] Chinese and Hebrew locale articles also show images correctly
- [ ] No console errors in browser dev tools

---

## Step 10: Commit and Create Pull Request

### Commit structure (in order):

```bash
# Commit 1: Scripts
git add scripts/extract-prompts.js scripts/generate-images.js \
        scripts/resize-images.js scripts/build-image-map.js \
        scripts/strip-image-descriptions.js scripts/image-manifest.json
git commit -m "Add image generation and processing scripts"

# Commit 2: Git LFS tracking
git add .gitattributes
git commit -m "Configure Git LFS for article images"

# Commit 3: Images (this will be large)
git add public/images/articles/
git commit -m "Add 363 generated header images (desktop/tablet/mobile)"

# Commit 4: Component + map + article page changes
git add src/components/ArticleHeroImage.tsx \
        src/data/image-map.ts \
        src/app/\[locale\]/articles/\[id\]/page.tsx
git commit -m "Add ArticleHeroImage component and render on article pages"

# Commit 5: Strip prompts from article data
git add src/data/articles.json
git commit -m "Strip DALL-E prompt descriptions from article body text"
```

### Push and create PR:

```bash
git push -u origin images/generate-all-363-headers
```

### PR Template

**Title**: `Add 363 AI-generated header images to all articles`

**Body**:

```markdown
## Summary
- Generated 363 header images using DALL-E 3 from prompts embedded in each article
- Each image follows the site's Chinese brushstroke / ink wash art style blended with Jewish themes
- Created 3 responsive variants per image (desktop 1920×1080, tablet 1024×576, mobile 640×360)
- Added `ArticleHeroImage` component with `<picture>` element for responsive serving
- Stripped DALL-E prompt text from article bodies (no longer needed as visible text)

## File changes
- `scripts/` — 5 new generation/processing scripts + manifest
- `public/images/articles/` — 1,089 WebP images (363 × 3 sizes) via Git LFS
- `src/components/ArticleHeroImage.tsx` — new responsive hero image component
- `src/data/image-map.ts` — auto-generated article ID → filename lookup
- `src/app/[locale]/articles/[id]/page.tsx` — renders hero image, strips prompt text
- `src/data/articles.json` — prompt blockquotes removed from body text

## Image stats
- Total images: 1,089 (363 articles × 3 sizes)
- Desktop avg: ~100-150 KB each
- Tablet avg: ~50-80 KB each
- Mobile avg: ~25-40 KB each
- Total storage: ~106 MB (Git LFS)

## Test plan
- [ ] `npm run build` passes
- [ ] Spot check 10+ articles across different sections show header images
- [ ] Images load responsively (check mobile/tablet/desktop widths)
- [ ] DALL-E prompt text no longer visible in article body
- [ ] Chinese (zh) and Hebrew (he) locales show images correctly
- [ ] No console errors
- [ ] Page load time is acceptable (< 3s on 3G throttled)

## Cost
- DALL-E 3 generation: ~$29 (363 × $0.08/image HD)
```

### PR Labels
- `enhancement`
- `content`

### PR Reviewers
- `@jonathancaras`

---

## File Naming Convention

```
{section}-{NNN}.webp
```

- `{section}` = the article's `section` field exactly as-is (e.g., `weekly-parsha`, `kosher-food`, `practical-halacha-for-daily-life`)
- `{NNN}` = 3-digit zero-padded index **within that section**, based on the order articles appear in `articles.json`
- The first article in a section is `001`, the second is `002`, etc.

### Examples

| Article ID | Section | Index in Section | Filename |
|-----------|---------|-----------------|----------|
| 2 | weekly-parsha | 1st | `weekly-parsha-001.webp` |
| 9 | weekly-parsha | 2nd | `weekly-parsha-002.webp` |
| 4 | torah-study | 1st | `torah-study-001.webp` |
| 14 | prayer | 1st | `prayer-001.webp` |
| 136 | holidays | 1st in its position | per manifest |

**The canonical mapping is in `scripts/image-manifest.json`.** Always reference that file — never compute filenames independently.

---

## Error Handling & Edge Cases

1. **DALL-E content policy rejection**: Some prompts may be rejected. If so, simplify the prompt by removing any potentially sensitive terms and retry. Log the original and modified prompt.

2. **Rate limiting**: The script waits 9 seconds between requests. If you hit rate limits, increase the delay to 15 seconds.

3. **Resumability**: The generation script tracks progress in `scripts/generation-progress.json`. Re-running the script skips already-completed images.

4. **Large PR**: Since this PR includes ~106 MB of images, Git LFS is required. Make sure `git lfs` is installed and configured before committing images.

5. **Do NOT modify existing article content** beyond stripping the DALL-E prompt blockquote. Do not change article text, titles, translations, or any other data.

---

## Timeline Estimate

| Step | Duration |
|------|----------|
| Extract prompts | < 1 min |
| Generate 363 images | ~55 min |
| Resize + convert | ~10 min |
| Build image map | < 1 min |
| Create component + update page | ~15 min |
| Strip descriptions | < 1 min |
| Verify + test | ~15 min |
| Commit + PR | ~10 min |
| **Total** | **~2 hours** |

---

## Final Reminders

- **Quality check**: Before submitting the PR, visually inspect at least 20 images across different sections. Flag any that look wrong, off-topic, or low quality.
- **No placeholder images**: Every article gets a real generated image. No placeholders, no fallbacks, no "coming soon" images.
- **One PR**: Everything goes in a single pull request. Do not split across multiple PRs.
- **Branch name**: `images/generate-all-363-headers`
- **Base branch**: `main`
