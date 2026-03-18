import fs from "fs";
import path from "path";

describe("Build configuration", () => {
  test("next.config.ts exists", () => {
    expect(
      fs.existsSync(path.join(process.cwd(), "next.config.ts"))
    ).toBe(true);
  });

  test("next.config.ts uses next-intl plugin", () => {
    const content = fs.readFileSync(
      path.join(process.cwd(), "next.config.ts"),
      "utf-8"
    );
    expect(content).toContain("createNextIntlPlugin");
    expect(content).toContain("withNextIntl");
  });

  test("vercel.json exists for deployment", () => {
    expect(
      fs.existsSync(path.join(process.cwd(), "vercel.json"))
    ).toBe(true);
  });

  test("vercel.json has correct framework setting", () => {
    const content = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "vercel.json"),
        "utf-8"
      )
    );
    expect(content.framework).toBe("nextjs");
  });

  test("package.json has required scripts", () => {
    const pkg = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "package.json"),
        "utf-8"
      )
    );
    expect(pkg.scripts.build).toBeDefined();
    expect(pkg.scripts.dev).toBeDefined();
    expect(pkg.scripts.start).toBeDefined();
    expect(pkg.scripts.test).toBeDefined();
  });

  test("package.json has required dependencies", () => {
    const pkg = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "package.json"),
        "utf-8"
      )
    );
    expect(pkg.dependencies.next).toBeDefined();
    expect(pkg.dependencies["next-intl"]).toBeDefined();
    expect(pkg.dependencies.react).toBeDefined();
    expect(pkg.dependencies["react-dom"]).toBeDefined();
  });

  test("tsconfig.json has path alias for @/", () => {
    const tsconfig = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "tsconfig.json"),
        "utf-8"
      )
    );
    expect(tsconfig.compilerOptions.paths["@/*"]).toBeDefined();
  });

  test("globals.css exists", () => {
    expect(
      fs.existsSync(
        path.join(process.cwd(), "src/app/globals.css")
      )
    ).toBe(true);
  });

  test("globals.css has RTL support", () => {
    const content = fs.readFileSync(
      path.join(process.cwd(), "src/app/globals.css"),
      "utf-8"
    );
    expect(content).toContain("rtl");
  });

  test(".gitignore exists", () => {
    expect(
      fs.existsSync(path.join(process.cwd(), ".gitignore"))
    ).toBe(true);
  });
});
