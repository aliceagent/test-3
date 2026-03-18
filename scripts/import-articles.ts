/**
 * Import all article files from disk into Supabase.
 *
 * Usage: npx tsx scripts/import-articles.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

// Load env from .env.local
const envPath = path.join(__dirname, "..", ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const env: Record<string, string> = {};
for (const line of envContent.split("\n")) {
  const match = line.match(/^([^=]+)=(.+)$/);
  if (match) env[match[1].trim()] = match[2].trim();
}

const supabaseUrl = env["NEXT_PUBLIC_SUPABASE_URL"];
const supabaseKey = env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const ROOT = path.join(__dirname, "..");

// Map metadata section names to app section slugs
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

async function main() {
  // Find all metadata.json files
  const articleDirs: string[] = [];
  const sections = fs.readdirSync(ROOT).filter((f) => {
    const fullPath = path.join(ROOT, f);
    return (
      fs.statSync(fullPath).isDirectory() &&
      !f.startsWith(".") &&
      !f.startsWith("_") &&
      ![
        "node_modules", "src", "public", "messages", "supabase",
        "scripts", "projects",
      ].includes(f)
    );
  });

  for (const section of sections) {
    const sectionPath = path.join(ROOT, section);
    const subdirs = fs.readdirSync(sectionPath).filter((f) =>
      fs.statSync(path.join(sectionPath, f)).isDirectory()
    );
    for (const sub of subdirs) {
      const metaPath = path.join(sectionPath, sub, "metadata.json");
      if (fs.existsSync(metaPath)) {
        articleDirs.push(path.join(sectionPath, sub));
      }
    }
  }

  console.log(`Found ${articleDirs.length} articles to import.\n`);

  // Check existing articles to avoid duplicates
  const { data: existing } = await supabase
    .from("articles")
    .select("section, title_en");
  const existingSet = new Set(
    (existing || []).map((a: { section: string; title_en: string }) => `${a.section}::${a.title_en}`)
  );

  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (const dir of articleDirs) {
    try {
      const meta = JSON.parse(fs.readFileSync(path.join(dir, "metadata.json"), "utf-8"));
      const section = toSlug(meta.section || path.basename(path.dirname(dir)));
      const titleEn = meta.title?.en || meta.title_en || "";
      const titleZh = meta.title?.zh || meta.title_zh || "";
      const titleHe = meta.title?.he || meta.title_he || "";

      const bodyEn = readFileOrEmpty(path.join(dir, "article-en.md"));
      const bodyZh = readFileOrEmpty(path.join(dir, "article-zh.md"));
      const bodyHe = readFileOrEmpty(path.join(dir, "article-he.md"));

      const key = `${section}::${titleEn}`;
      if (existingSet.has(key)) {
        skipped++;
        continue;
      }

      const { error } = await supabase.from("articles").insert({
        section,
        title_en: titleEn,
        title_zh: titleZh,
        title_he: titleHe,
        body_en: bodyEn,
        body_zh: bodyZh,
        body_he: bodyHe,
      });

      if (error) {
        console.error(`  ERROR importing ${titleEn}: ${error.message}`);
        errors++;
      } else {
        imported++;
        console.log(`  ✓ [${section}] ${titleEn}`);
      }
    } catch (e) {
      console.error(`  ERROR reading ${dir}: ${e}`);
      errors++;
    }
  }

  console.log(`\nDone! Imported: ${imported}, Skipped (already exists): ${skipped}, Errors: ${errors}`);
}

main();
