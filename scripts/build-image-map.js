const fs = require("fs");
const path = require("path");

const manifestPath = path.join(__dirname, "image-manifest.json");
const outputPath = path.join(__dirname, "..", "src", "data", "image-map.ts");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const lines = manifest.map(
  (entry) =>
    `  ${entry.id}: { filename: ${JSON.stringify(entry.filename)}, blurDataURL: ${JSON.stringify(entry.blurDataURL || "")} }`
);

const output = `// Auto-generated — do not edit manually\n// Run: node scripts/build-image-map.js\nexport const articleImageMap: Record<number, {\n  filename: string;\n  blurDataURL: string;\n} | undefined> = {\n${lines.join(",\n")}\n};\n`;

fs.writeFileSync(outputPath, output);
console.log(`Generated ${path.relative(process.cwd(), outputPath)} with ${manifest.length} entries`);
