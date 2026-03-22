const fs = require("fs");
const path = require("path");

const articlesPath = path.join(__dirname, "..", "src", "data", "articles.json");
const articles = JSON.parse(fs.readFileSync(articlesPath, "utf8"));

const patterns = [
  /^>\s*\*\*Header Image Description \(DALL-E prompt\):\*\*[\s\S]*?(?=\n\n|\n(?!(?:>\s*)?$)|$)/gm,
  /^>\s*\*\*题图描述（DALL-E提示）：\*\*[\s\S]*?(?=\n\n|\n(?!(?:>\s*)?$)|$)/gm,
  /^>\s*\*\*תיאור תמונת כותרת \(DALL-E prompt\):\*\*[\s\S]*?(?=\n\n|\n(?!(?:>\s*)?$)|$)/gm,
  /^\*Header Image Description:[\s\S]*?\*(?=\n\n|$)/gm,
  /^\*标题图片描述：[\s\S]*?\*(?=\n\n|$)/gm,
  /^\*标题图像描述：[\s\S]*?\*(?=\n\n|$)/gm,
  /^\*头图描述：[\s\S]*?\*(?=\n\n|$)/gm,
  /^\*תיאור תמונת הכותרת:[\s\S]*?\*(?=\n\n|$)/gm,
  /^\*תיאור תמונה לכותרת:[\s\S]*?\*(?=\n\n|$)/gm,
  /^\*תיאור תמונת כותרת:[\s\S]*?\*(?=\n\n|$)/gm,
];

let stripped = 0;
for (const article of articles) {
  for (const field of ["body_en", "body_zh", "body_he"]) {
    if (!article[field]) continue;
    const before = article[field];
    let after = before;
    for (const pattern of patterns) after = after.replace(pattern, "");
    after = after.replace(/\n{3,}/g, "\n\n").trim();
    if (after !== before) {
      article[field] = after;
      stripped += 1;
    }
  }
}

fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2) + "\n");
console.log(`Stripped ${stripped} localized image descriptions from articles.json`);
