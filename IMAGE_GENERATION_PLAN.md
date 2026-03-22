# Image Generation Plan — Torah Light Article Header Images

## Current State

- **363 articles** across 35 sections
- **All 363 articles** have DALL-E prompt descriptions embedded in the English body text as markdown blockquotes:
  ```
  > **Header Image Description (DALL-E prompt):** A majestic Chinese brushstroke landscape...
  ```
- **14 articles** also have descriptions in Chinese/Hebrew bodies
- Images are **not rendered** — the description text is displayed as a styled blockquote to the reader
- The article page already has a custom `<img>` component in `react-markdown` that applies `rounded-xl shadow-md max-w-full h-auto my-6`

---

## Step 1: Generate the Images

### Extraction Script
Write a Node.js script (`scripts/extract-prompts.js`) that:
1. Reads `src/data/articles.json`
2. Extracts the DALL-E prompt text from each article's `body_en` using regex:
   ```
   /> \*\*Header Image Description \(DALL-E prompt\):\*\* (.*?)(?:\n\n|\n(?!>))/s
   ```
3. Outputs a JSON manifest (`scripts/image-manifest.json`) mapping each article to its prompt:
   ```json
   [
     { "id": 1, "section": "weekly-parsha", "filename": "weekly-parsha-001.webp", "prompt": "A majestic Chinese brushstroke..." },
     { "id": 2, "section": "weekly-parsha", "filename": "weekly-parsha-002.webp", "prompt": "..." }
   ]
   ```

### Image Specifications

| Property | Value | Rationale |
|----------|-------|-----------|
| **Format** | WebP | Best compression-to-quality ratio, supported by all modern browsers |
| **Aspect Ratio** | **16:9** | Standard hero/banner ratio, works well on both desktop and mobile |
| **Full-size dimensions** | **1920 × 1080 px** | Covers full-width desktop layouts at high quality |
| **Quality** | 80% WebP quality | Good balance of file size (~80-150 KB) and visual quality |
| **Color profile** | sRGB | Web standard |
| **Max file size target** | < 200 KB per image | Keeps page load fast |

### DALL-E Generation Settings
- **Model**: DALL-E 3
- **Size**: 1792 × 1024 (closest DALL-E 3 option to 16:9, then resize to 1920×1080)
- **Style**: Vivid (the prompts already describe artistic Chinese brushstroke styles)
- **Output**: Download the PNG, then convert to WebP

### Responsive Variants
Generate **3 sizes** from each source image using a script (sharp/ImageMagick):

| Variant | Dimensions | Suffix | Use Case |
|---------|-----------|--------|----------|
| **Desktop** | 1920 × 1080 | `-desktop.webp` | Screens ≥ 1024px wide |
| **Tablet** | 1024 × 576 | `-tablet.webp` | Screens 640px–1023px |
| **Mobile** | 640 × 360 | `-mobile.webp` | Screens < 640px |

Also generate a **blur placeholder** (32 × 18 px, base64-encoded) for each image to use as a loading placeholder. Store these in the manifest.

### Conversion Script
Write a script (`scripts/resize-images.js`) that:
1. Takes the full-size images from `public/images/articles/full/`
2. Uses `sharp` to resize to the 3 variants
3. Outputs to `public/images/articles/{desktop,tablet,mobile}/`
4. Generates base64 blur placeholders and updates `scripts/image-manifest.json`

---

## Step 2: Store Images in the Repository

### Directory Structure
```
public/
  images/
    articles/
      desktop/          # 1920×1080 WebP
        weekly-parsha-001.webp
        weekly-parsha-002.webp
        torah-study-001.webp
        ...
      tablet/            # 1024×576 WebP
        weekly-parsha-001.webp
        ...
      mobile/            # 640×360 WebP
        weekly-parsha-001.webp
        ...
```

### Naming Convention
```
{section}-{3-digit-zero-padded-index}.webp
```
Examples:
- `weekly-parsha-001.webp` (article ID 1)
- `holidays-003.webp` (3rd holidays article)

The mapping between article IDs and filenames lives in `scripts/image-manifest.json`.

### Git LFS (Recommended)
Since there will be ~363 × 3 = **1,089 image files**, configure Git LFS:
```bash
git lfs install
git lfs track "public/images/articles/**/*.webp"
git add .gitattributes
```

---

## Step 3: Create an ArticleHeroImage Component

Create `src/components/ArticleHeroImage.tsx`:

```tsx
import Image from "next/image";

interface ArticleHeroImageProps {
  section: string;
  articleIndex: number; // 1-based index within section
  alt: string;
  blurDataURL?: string;
}

export default function ArticleHeroImage({
  section,
  articleIndex,
  alt,
  blurDataURL,
}: ArticleHeroImageProps) {
  const filename = `${section}-${String(articleIndex).padStart(3, "0")}.webp`;

  return (
    <div className="w-full aspect-video relative rounded-xl overflow-hidden shadow-md mb-8">
      <Image
        src={`/images/articles/desktop/${filename}`}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 1024px, 1920px"
        className="object-cover"
        priority // hero image — load eagerly
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
      />
    </div>
  );
}
```

**Why `next/image` instead of `<img>`:** Automatic responsive `srcset` generation, lazy loading, WebP serving, and blur placeholder support.

**Alternative approach (without next/image):** Use a `<picture>` element with explicit `<source>` tags:
```html
<picture>
  <source media="(max-width: 639px)" srcSet="/images/articles/mobile/{file}" />
  <source media="(max-width: 1023px)" srcSet="/images/articles/tablet/{file}" />
  <img src="/images/articles/desktop/{file}" alt="..." class="..." />
</picture>
```

---

## Step 4: Create an Image Lookup Map

Create `src/data/image-map.ts` — a static map from article ID to image path:

```ts
// Auto-generated by scripts/build-image-map.js
export const articleImageMap: Record<number, {
  filename: string;
  blurDataURL: string;
} | undefined> = {
  1: { filename: "weekly-parsha-001.webp", blurDataURL: "data:image/webp;base64,..." },
  2: { filename: "weekly-parsha-002.webp", blurDataURL: "data:image/webp;base64,..." },
  // ...
};
```

Write `scripts/build-image-map.js` to auto-generate this file from the manifest.

---

## Step 5: Update the Article Page

**File:** `src/app/[locale]/articles/[id]/page.tsx`

### 5a. Strip the image description from rendered body
Before passing `body` to `<ReactMarkdown>`, remove the blockquote:
```ts
const bodyWithoutImageDesc = body.replace(
  /> \*\*Header Image Description \(DALL-E prompt\):\*\*.*?(?=\n\n|\n(?!>))/s,
  ""
).trim();
```

### 5b. Render the hero image above the article body
```tsx
import { articleImageMap } from "@/data/image-map";
import ArticleHeroImage from "@/components/ArticleHeroImage";

// Inside the component, before the prose div:
{articleImageMap[article.id] && (
  <ArticleHeroImage
    section={article.section}
    articleIndex={/* lookup from map */}
    alt={title}
    blurDataURL={articleImageMap[article.id]?.blurDataURL}
  />
)}
```

### 5c. Fallback for articles without images
All 363 articles now have DALL-E prompts. If any future articles are added without prompts, render nothing (no broken image) — the article displays as it does today.

---

## Step 6: Strip Image Descriptions from Article Data

After all images are generated and placed, run a cleanup script (`scripts/strip-image-descriptions.js`) that:
1. Reads `src/data/articles.json`
2. Removes the `> **Header Image Description...**` blockquote from `body_en`, `body_zh`, `body_he`
3. Writes back the cleaned JSON
4. This ensures the text description no longer shows on the page

---

## Step 7: Optional — Article Card Thumbnails

For article listing pages (`ContentPage.tsx`), optionally add small thumbnail images to cards:
- Reuse the mobile variant (640×360) with `next/image` at a smaller display size
- Add to the card above the title
- This is a nice-to-have, not required for the initial implementation

---

## Execution Checklist

1. [ ] Run extraction script → `scripts/image-manifest.json` (363 entries)
2. [ ] Generate images via DALL-E 3 API using each prompt (batch process)
3. [ ] Convert PNGs to WebP and resize to 3 variants using `sharp`
4. [ ] Generate blur placeholders
5. [ ] Place images in `public/images/articles/{desktop,tablet,mobile}/`
6. [ ] Set up Git LFS for the images directory
7. [ ] Build `src/data/image-map.ts` from manifest
8. [ ] Create `ArticleHeroImage` component
9. [ ] Update article page to render hero image + strip description text
10. [ ] Strip image descriptions from `articles.json`
11. [ ] Test on desktop, tablet, and mobile viewports
12. [ ] Run `npm run build` to verify no errors

---

## Cost & Size Estimates

- **DALL-E 3 cost**: ~363 images × $0.08/image (1792×1024) = **~$29**
- **Storage**: 363 × 3 variants × ~100 KB avg = **~106 MB total**
- **Build impact**: Images in `public/` are served statically, no build-time processing needed
