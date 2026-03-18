describe("i18n routing configuration", () => {
  // next-intl uses ESM which Jest can't import directly,
  // so we test the routing config by reading the source file
  const fs = require("fs");
  const path = require("path");

  const routingSource = fs.readFileSync(
    path.join(process.cwd(), "src/i18n/routing.ts"),
    "utf-8"
  );

  test("defines en, zh, he as supported locales", () => {
    expect(routingSource).toContain("'en'");
    expect(routingSource).toContain("'zh'");
    expect(routingSource).toContain("'he'");
  });

  test("sets English as default locale", () => {
    expect(routingSource).toContain("defaultLocale: 'en'");
  });

  test("uses defineRouting from next-intl", () => {
    expect(routingSource).toContain("defineRouting");
  });

  test("exports routing config", () => {
    expect(routingSource).toContain("export const routing");
  });
});
