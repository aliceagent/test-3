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

### Dimensions & Aspect Ratio
- **Aspect ratio**: 16:9 (landscape)
- **Resolution**: 1200 x 675 pixels (optimal for web hero images)
- **Retina variant** (optional): 2400 x 1350 pixels, saved as `{name}@2x.webp`

### Compression & File Size
- **Target file size**: 80-150 KB per image (standard), 200-300 KB (retina)
- **WebP quality**: 80-85 (good balance of quality and size)
- **Maximum file size**: 300 KB (standard), 500 KB (retina)

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
└── header.webp        ← NEW: the generated image
```

**File name in directory**: `header.webp` (consistent across all articles)

### Alternative (for batch delivery via PR)

If delivering all images in a single PR before integration, use a flat structure:

```
images/headers/
├── 401-messiah-torah-sources.webp
├── 402-maimonides-13th-principle.webp
├── ...
└── 499-finding-jewish-mentor.webp
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
- Format: WebP, quality 80-85
- Dimensions: 1200x675 (16:9)
- Style: Chinese shan shui ink wash with Jewish themes
- Average file size: ~XXX KB

### Checklist
- [ ] All images match their DALL-E prompts
- [ ] File sizes under 300 KB each
- [ ] Correct naming convention
- [ ] No NSFW or inappropriate content
- [ ] Images placed in `images/headers/` directory
```

---

## 6. Integration Process (After PR Merge)

Once images are merged, a follow-up commit will:

1. **Move images** from `images/headers/` into each article's directory as `header.webp`
2. **Update `metadata.json`** to add the image reference:
   ```json
   {
     "headerImage": "header.webp",
     "headerImageAlt": "Article title - shan shui style illustration"
   }
   ```
3. **Update article display components** to render the header image above the article body
4. **Optimize for production** via Next.js `<Image>` component with lazy loading

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
