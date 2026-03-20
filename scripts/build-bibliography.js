#!/usr/bin/env node
/**
 * Build bibliography index from all metadata.json files in the repo.
 * Outputs to src/data/bibliography-index.json
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT = path.join(ROOT, "src/data/bibliography-index.json");

// Find all metadata.json files, skipping node_modules, .next, scripts
function findMetadataFiles(dir, results = []) {
  const skip = new Set(["node_modules", ".next", ".git", "scripts"]);
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findMetadataFiles(full, results);
    } else if (entry.name === "metadata.json") {
      results.push(full);
    }
  }
  return results;
}

// Normalize title to {en, zh, he} shape
function normalizeTitle(raw) {
  if (!raw) return { en: "", zh: "", he: "" };
  if (typeof raw === "string") return { en: raw, zh: "", he: "" };
  return {
    en: raw.en || raw.title_en || "",
    zh: raw.zh || raw.title_zh || "",
    he: raw.he || raw.title_he || "",
  };
}

// Normalize tags to string array (handle mixed-language tag arrays)
function normalizeTags(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map(String).filter(Boolean);
  return [];
}

// Normalize sources to string array
function normalizeSources(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.map(String).filter(Boolean);
  return [];
}

const files = findMetadataFiles(ROOT);
console.log(`Found ${files.length} metadata.json files`);

// Deduplicate by article id (prefer files closer to root / not in projects/)
const byId = new Map();

for (const filePath of files) {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (e) {
    console.warn(`Skipping invalid JSON: ${filePath}`);
    continue;
  }

  const id = data.id;
  // description can be a string or a {en,zh,he} object
  let description = data.description || "";
  if (typeof description === "object") {
    description = description.en || description.zh || description.he || "";
  }

  const entry = {
    id: id || null,
    title: normalizeTitle(data.title || { en: data.title_en, zh: data.title_zh, he: data.title_he }),
    section: (data.section || data.folder || "").toLowerCase().replace(/\s+/g, "-"),
    description,
    tags: normalizeTags(data.tags),
    sources: normalizeSources(data.sources),
    cultural_parallels: normalizeTags(data.cultural_parallels),
    chinese_dynasty_references: normalizeTags(data.chinese_dynasty_references),
    status: data.status || "",
    filePath: path.relative(ROOT, filePath),
  };

  if (!id) {
    // No id — just push with a generated key
    byId.set(filePath, entry);
    continue;
  }

  // Prefer entries closer to root (fewer path segments)
  const existing = byId.get(id);
  if (!existing) {
    byId.set(id, entry);
  } else {
    // Prefer the one with more data (tags, sources)
    const existingScore = existing.tags.length + existing.sources.length;
    const newScore = entry.tags.length + entry.sources.length;
    if (newScore > existingScore) {
      byId.set(id, entry);
    }
  }
}

const index = Array.from(byId.values()).sort((a, b) => {
  if (a.id && b.id) return a.id - b.id;
  return 0;
});

fs.writeFileSync(OUTPUT, JSON.stringify(index, null, 2));
console.log(`Written ${index.length} entries to ${path.relative(ROOT, OUTPUT)}`);
