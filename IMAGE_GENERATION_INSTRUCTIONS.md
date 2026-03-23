# Image Generation Instructions for Torah Light Articles

## Overview

Each article in the Torah Light platform has a DALL-E image prompt embedded in its `article-en.md` file. An agent needs to generate these images and deliver them in a structured PR so they can be integrated into the site.

---

## 1. Finding the DALL-E Prompts

Every article file contains a blockquote near the top with the image description:

```markdown
# Article Title

---

> **Header Image Description (DALL-E prompt):** A traditional Chinese shan shui ink wash painting...

Article body begins here...
```

### How to extract all prompts

```bash
# List all articles with DALL-E prompts
grep -rl "Header Image Description" */*/article-en.md

# Extract prompt text for a specific article
grep -A1 "Header Image Description" messiah/401-messiah-torah-sources/article-en.md

# Extract ALL prompts with article paths (for batch processing)
grep -r "Header Image Description" */*/article-en.md | sed 's/article-en.md:> \*\*Header Image Description (DALL-E prompt):\*\* /\t/'
```

Each prompt is a single paragraph starting with `> **Header Image Description (DALL-E prompt):**`.

### Scope

- **Articles 401-499**: 99 new articles that need images generated
- **Existing articles (001-400)**: ~274 already have prompts; check if images exist before regenerating

---

## 2. Image Specifications

### Format
- **File type**: WebP (primary), with PNG fallback for transparency needs
- **Why WebP**: Best compression-to-quality ratio for web; supported by all modern browsers

### Responsive Image Variants

Generate **3 size variants** per article for different screen sizes, plus a retina option:

| Variant | Dimensions | Aspect Ratio | Target Size | Filename |
|---------|-----------|--------------|-------------|----------|
| **Desktop** (default) | 1200 x 675 | 16:9 | 80-150 KB | `header.webp` |
| **Tablet** | 800 x 450 | 16:9 | 50-100 KB | `header-800.webp` |
| **Mobile** | 480 x 270 | 16:9 | 25-60 KB | `header-480.webp` |
| **Desktop Retina** (optional) | 2400 x 1350 | 16:9 | 200-300 KB | `header@2x.webp` |

All variants should be generated from the same source image (generate at highest resolution, then downscale).

### Mobile-Specific Considerations
- **Mobile crop alternative**: For articles where the 16:9 crop loses important detail on small screens, also generate a **4:3 mobile variant** (480 x 360) named `header-480-4x3.webp`. This is optional and only needed when the main subject is too small at 16:9 on mobile.
- **Art direction**: Ensure the main visual subject (Torah scroll, menorah, central figure, etc.) is centered in the composition so it remains visible when cropped or displayed at smaller sizes.
- **Text legibility**: If any Hebrew/Chinese text is part of the image composition, it does not need to be legible at mobile sizes — it serves as a decorative element.

### How the Site Will Use These

The Next.js `<Image>` component will serve these responsively:

```html
<picture>
  <source media="(max-width: 480px)" srcSet="/images/header-480.webp" />
  <source media="(max-width: 800px)" srcSet="/images/header-800.webp" />
  <source media="(min-width: 801px)" srcSet="/images/header.webp" />
  <img src="/images/header.webp" alt="..." loading="lazy" />
</picture>
```

### Compression & File Size
- **WebP quality**: 80-85 for desktop, 75-80 for tablet/mobile (slightly more aggressive)
- **Maximum file sizes**: Desktop 300 KB, Tablet 150 KB, Mobile 80 KB, Retina 500 KB

### Color Profile
- sRGB color space
- The prompts specify muted earth tones — ensure generated images aren't oversaturated

---

## 3. Naming Convention

```
{article-id}-{slug}.webp
```

Examples:
```
401-messiah-torah-sources.webp
402-maimonides-13th-principle.webp
450-shanghai-ghetto-china-saved-refugees.webp
499-finding-jewish-mentor.webp
```

The slug matches the article's directory name. To get the correct slug:

```bash
# List all article directories with their IDs
ls -d */[0-4][0-9][0-9]-*/ | sed 's/.*\///' | sed 's/\/$//'
```

---

## 4. File Storage Location

Place generated images in the article's own directory:

```
{section}/{id}-{slug}/
├── article-en.md
├── article-zh.md      (if translated)
├── article-he.md      (if translated)
├── metadata.json
├── header.webp        ← Desktop (1200x675)
├── header-800.webp    ← Tablet (800x450)
├── header-480.webp    ← Mobile (480x270)
└── header@2x.webp     ← Retina (2400x1350, optional)
```

### Alternative (for batch delivery via PR)

If delivering all images in a single PR before integration, use a flat structure with subdirectories per size:

```
images/headers/
├── desktop/
│   ├── 401-messiah-torah-sources.webp
│   ├── 402-maimonides-13th-principle.webp
│   └── ...
├── tablet/
│   ├── 401-messiah-torah-sources.webp
│   └── ...
├── mobile/
│   ├── 401-messiah-torah-sources.webp
│   └── ...
└── retina/  (optional)
    ├── 401-messiah-torah-sources.webp
    └── ...
```

---

## 5. Pull Request Format

### Branch naming
```
images/article-headers-401-499
```

### PR structure

Deliver in batches of ~25 images per PR to keep file sizes manageable:

| PR | Articles | Branch |
|----|----------|--------|
| 1  | 401-425  | `images/headers-401-425` |
| 2  | 426-450  | `images/headers-426-450` |
| 3  | 451-475  | `images/headers-451-475` |
| 4  | 476-499  | `images/headers-476-499` |

### PR body template

```markdown
## Article Header Images — Articles {start}-{end}

### Images included
- [ ] {id} - {title} ({file size})
- [ ] {id} - {title} ({file size})
...

### Specs
- Format: WebP
- Variants per article: desktop (1200x675), tablet (800x450), mobile (480x270)
- Quality: 80-85 desktop, 75-80 tablet/mobile
- Style: Chinese shan shui ink wash with Jewish themes
- Total images per batch: ~75 (25 articles × 3 variants)

### Checklist
- [ ] All images match their DALL-E prompts
- [ ] All 3 responsive variants included per article (desktop, tablet, mobile)
- [ ] File sizes under 300 KB each
- [ ] Correct naming convention
- [ ] No NSFW or inappropriate content
- [ ] Images placed in `images/headers/` directory
```

---

## 6. Integration Process (After PR Merge)

Once images are merged, a follow-up commit will:

1. **Move images** from `images/headers/{desktop,tablet,mobile}/` into each article's directory:
   - `header.webp` (desktop)
   - `header-800.webp` (tablet)
   - `header-480.webp` (mobile)
2. **Update `metadata.json`** to add the image references:
   ```json
   {
     "headerImage": {
       "desktop": "header.webp",
       "tablet": "header-800.webp",
       "mobile": "header-480.webp"
     },
     "headerImageAlt": "Article title - shan shui style illustration"
   }
   ```
3. **Update article display components** to render responsive header images using `<picture>`:
   ```tsx
   <picture>
     <source media="(max-width: 480px)" srcSet={images.mobile} type="image/webp" />
     <source media="(max-width: 800px)" srcSet={images.tablet} type="image/webp" />
     <source media="(min-width: 801px)" srcSet={images.desktop} type="image/webp" />
     <Image src={images.desktop} alt={alt} width={1200} height={675} loading="lazy" />
   </picture>
   ```
4. **Optimize for production** via Next.js `<Image>` component with lazy loading and priority hints for above-the-fold articles

---

## 7. Style Guide Summary

All images follow a consistent artistic vision:

- **Primary style**: Traditional Chinese shan shui (山水) ink wash painting
- **Color palette**: Muted earth tones — ochre, sepia, charcoal, sage green, soft grey
- **Accent colors**: Gold (for sacred elements), indigo (for sky/water), amber (for warmth)
- **Common elements**: Misty mountains, pine trees, flowing water, stone paths
- **Jewish elements**: Menorahs, Torah scrolls, Stars of David, Hebrew letters — woven subtly into the Chinese landscape aesthetic
- **Mood**: Contemplative, reverent, harmonious — bridging Jewish and Chinese visual traditions
- **Avoid**: Photorealistic faces, modern objects, bright/neon colors, cartoonish styles

---

## 8. Quality Checklist Per Image

Before including in a PR, verify each image:

- [ ] Matches the specific DALL-E prompt for that article
- [ ] Follows the shan shui ink wash style consistently
- [ ] Contains relevant Jewish and/or Chinese cultural elements
- [ ] Is 1200x675 pixels, 16:9 aspect ratio
- [ ] Is WebP format, under 300 KB
- [ ] Has no text overlays, watermarks, or artifacts
- [ ] Named correctly: `{id}-{slug}.webp`
- [ ] Color palette is muted/earthy (not oversaturated)
