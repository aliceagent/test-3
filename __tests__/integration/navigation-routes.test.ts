import fs from "fs";
import path from "path";

describe("Route and Navigation Consistency", () => {
  const pagesDir = path.join(process.cwd(), "src/app/[locale]");
  const pageDirs = fs
    .readdirSync(pagesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  // Navigation sections from Navigation.tsx
  const navRoutes = [
    "/torah-study",
    "/thirteen-principles",
    "/ten-commandments",
    "/five-megillot",
    "/shabbat",
    "/holidays",
    "/passover-seder",
    "/prayer",
    "/kosher-food",
    "/clothing-modesty",
    "/family-purity",
    "/money-laws",
    "/non-jewish-relations",
    "/jewish-texts",
    "/philosophy",
    "/chabad",
    "/hebrew-learning",
    "/jewish-history",
    "/messiah",
    "/tabernacle",
    "/ashkenazi-sephardi",
    "/jews-in-asia",
    "/antisemitism",
    "/life-cycle",
    "/matchmaking",
    "/community",
    "/mentorship",
  ];

  test("every navigation route has a corresponding page directory", () => {
    const missing: string[] = [];
    for (const route of navRoutes) {
      const dir = route.slice(1); // remove leading /
      if (!pageDirs.includes(dir)) {
        missing.push(route);
      }
    }
    expect(missing).toEqual([]);
  });

  test("every page directory has a page.tsx file", () => {
    const missingPages: string[] = [];
    for (const dir of pageDirs) {
      const pagePath = path.join(pagesDir, dir, "page.tsx");
      if (!fs.existsSync(pagePath)) {
        missingPages.push(dir);
      }
    }
    expect(missingPages).toEqual([]);
  });

  test("admin page exists", () => {
    expect(pageDirs).toContain("admin");
  });

  test("[locale]/page.tsx (home) exists", () => {
    const homePage = path.join(pagesDir, "page.tsx");
    expect(fs.existsSync(homePage)).toBe(true);
  });

  test("root page.tsx exists for redirect", () => {
    const rootPage = path.join(process.cwd(), "src/app/page.tsx");
    expect(fs.existsSync(rootPage)).toBe(true);
  });

  test("middleware.ts exists for locale routing", () => {
    const middleware = path.join(process.cwd(), "src/middleware.ts");
    expect(fs.existsSync(middleware)).toBe(true);
  });

  test("message files exist for all locales", () => {
    const messagesDir = path.join(process.cwd(), "messages");
    expect(fs.existsSync(path.join(messagesDir, "en.json"))).toBe(true);
    expect(fs.existsSync(path.join(messagesDir, "zh.json"))).toBe(true);
    expect(fs.existsSync(path.join(messagesDir, "he.json"))).toBe(true);
  });

  test("all message files are valid JSON", () => {
    const messagesDir = path.join(process.cwd(), "messages");
    for (const file of ["en.json", "zh.json", "he.json"]) {
      const content = fs.readFileSync(
        path.join(messagesDir, file),
        "utf-8"
      );
      expect(() => JSON.parse(content)).not.toThrow();
    }
  });

  test("locale layout exists with generateStaticParams", () => {
    const layoutPath = path.join(pagesDir, "layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    expect(content).toContain("generateStaticParams");
  });

  test("locale layout validates locale", () => {
    const layoutPath = path.join(pagesDir, "layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    expect(content).toContain("notFound");
  });
});
