const fs = require("fs");
const path = require("path");

const articlesPath = path.join(__dirname, "..", "src", "data", "articles.json");
const outPath = path.join(__dirname, "image-manifest.json");

const articles = JSON.parse(fs.readFileSync(articlesPath, "utf8"));

const promptPatterns = {
  en: [
    /^>\s*\*\*Header Image Description \(DALL-E prompt\):\*\*\s*([\s\S]*?)(?=\n\n|\n(?!(?:>\s*)?$)|$)/m,
    /^\*Header Image Description:\s*([\s\S]*?)\*(?=\n\n|$)/m,
  ],
  zh: [
    /^>\s*\*\*题图描述（DALL-E提示）：\*\*\s*([\s\S]*?)(?=\n\n|\n(?!(?:>\s*)?$)|$)/m,
    /^\*标题图片描述：\s*([\s\S]*?)\*(?=\n\n|$)/m,
    /^\*标题图像描述：\s*([\s\S]*?)\*(?=\n\n|$)/m,
    /^\*头图描述：\s*([\s\S]*?)\*(?=\n\n|$)/m,
  ],
  he: [
    /^>\s*\*\*תיאור תמונת כותרת \(DALL-E prompt\):\*\*\s*([\s\S]*?)(?=\n\n|\n(?!(?:>\s*)?$)|$)/m,
    /^\*תיאור תמונת הכותרת:\s*([\s\S]*?)\*(?=\n\n|$)/m,
    /^\*תיאור תמונה לכותרת:\s*([\s\S]*?)\*(?=\n\n|$)/m,
    /^\*תיאור תמונת כותרת:\s*([\s\S]*?)\*(?=\n\n|$)/m,
  ],
};

function matchFirst(text, patterns) {
  for (const pattern of patterns) {
    const match = text?.match(pattern)?.[1]?.trim();
    if (match) return match;
  }
  return null;
}

function extractPrompt(article) {
  const en = matchFirst(article.body_en, promptPatterns.en);
  const zh = matchFirst(article.body_zh, promptPatterns.zh);
  const he = matchFirst(article.body_he, promptPatterns.he);

  return {
    prompt: en || zh || he || null,
    sourceLocale: en ? "en" : zh ? "zh" : he ? "he" : null,
  };
}

const sectionCounters = {};
const missing = [];

const manifest = articles
  .map((article) => {
    sectionCounters[article.section] = (sectionCounters[article.section] || 0) + 1;
    const idx = String(sectionCounters[article.section]).padStart(3, "0");
    const filename = `${article.section}-${idx}.webp`;
    const { prompt, sourceLocale } = extractPrompt(article);

    if (!prompt) {
      missing.push({ id: article.id, section: article.section, title: article.title_en, filename });
      return null;
    }

    return {
      id: article.id,
      section: article.section,
      title: article.title_en,
      filename,
      prompt,
      sourceLocale,
    };
  })
  .filter(Boolean);

fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + "\n");

console.log(`Extracted ${manifest.length} prompts → ${path.relative(process.cwd(), outPath)}`);
if (missing.length) {
  console.log(`Missing prompts for ${missing.length} article(s):`);
  for (const item of missing) {
    console.log(`- ${item.id} ${item.filename} — ${item.title}`);
  }
  process.exitCode = 2;
}
