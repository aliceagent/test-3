/**
 * Generate a static JSON file from all article markdown files.
 * Usage: npx tsx scripts/generate-articles-json.ts
 */

import * as fs from "fs";
import * as path from "path";

const ROOT = path.join(__dirname, "..");
const OUTPUT = path.join(ROOT, "src", "data", "articles.json");

function toSlug(section: string): string {
  return section
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function readFileOrEmpty(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return "";
  }
}

const SKIP_DIRS = new Set([
  "node_modules", "src", "public", "messages", "supabase",
  "scripts", "projects", ".git", ".claude", ".next", "__tests__",
]);

interface Article {
  id: number;
  section: string;
  title_en: string;
  title_zh: string;
  title_he: string;
  body_en: string;
  body_zh: string;
  body_he: string;
}

const articles: Article[] = [];
let nextId = 1;

const sections = fs.readdirSync(ROOT).filter((f) => {
  const fullPath = path.join(ROOT, f);
  return (
    fs.statSync(fullPath).isDirectory() &&
    !f.startsWith(".") &&
    !f.startsWith("_") &&
    !SKIP_DIRS.has(f)
  );
});

for (const section of sections) {
  const sectionPath = path.join(ROOT, section);
  let subdirs: string[];
  try {
    subdirs = fs.readdirSync(sectionPath).filter((f) =>
      fs.statSync(path.join(sectionPath, f)).isDirectory()
    );
  } catch {
    continue;
  }

  for (const sub of subdirs) {
    const dir = path.join(sectionPath, sub);
    const metaPath = path.join(dir, "metadata.json");
    if (!fs.existsSync(metaPath)) continue;

    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
      const sectionSlug = toSlug(meta.section || section);
      const titleEn = meta.title || "";
      const titleZh = meta.title_zh || "";
      const titleHe = meta.title_he || "";
      const bodyEn = readFileOrEmpty(path.join(dir, "article-en.md"));
      const bodyZh = readFileOrEmpty(path.join(dir, "article-zh.md"));
      const bodyHe = readFileOrEmpty(path.join(dir, "article-he.md"));

      // Use the article number from metadata if available
      const id = meta.id || meta.article_number || nextId;
      nextId = Math.max(nextId, id + 1);

      articles.push({
        id,
        section: sectionSlug,
        title_en: titleEn,
        title_zh: titleZh,
        title_he: titleHe,
        body_en: bodyEn,
        body_zh: bodyZh,
        body_he: bodyHe,
      });
    } catch (e) {
      console.error(`Error reading ${dir}: ${e}`);
    }
  }
}

// Sort by id
articles.sort((a, b) => a.id - b.id);

// Ensure output directory exists
fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, JSON.stringify(articles, null, 2));

console.log(`Generated ${articles.length} articles → ${OUTPUT}`);
