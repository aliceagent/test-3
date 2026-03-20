import en from "../../messages/en.json";
import zh from "../../messages/zh.json";
import he from "../../messages/he.json";

const locales = { en, zh, he } as Record<string, Record<string, unknown>>;

function getKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  const keys: string[] = [];
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...getKeys(obj[key] as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

describe("i18n message files", () => {
  const enKeys = getKeys(en);
  const zhKeys = getKeys(zh);
  const heKeys = getKeys(he);

  test("en.json has translation keys", () => {
    expect(enKeys.length).toBeGreaterThan(0);
  });

  test("zh.json has all keys from en.json", () => {
    const missing = enKeys.filter((k) => !zhKeys.includes(k));
    expect(missing).toEqual([]);
  });

  test("he.json has all keys from en.json", () => {
    const missing = enKeys.filter((k) => !heKeys.includes(k));
    expect(missing).toEqual([]);
  });

  test("no extra keys in zh.json that are missing from en.json", () => {
    const extra = zhKeys.filter((k) => !enKeys.includes(k));
    expect(extra).toEqual([]);
  });

  test("no extra keys in he.json that are missing from en.json", () => {
    const extra = heKeys.filter((k) => !enKeys.includes(k));
    expect(extra).toEqual([]);
  });

  test("no empty string values in en.json", () => {
    const empty = enKeys.filter((k) => {
      const parts = k.split(".");
      let val: unknown = en;
      for (const p of parts) val = (val as Record<string, unknown>)[p];
      return val === "";
    });
    expect(empty).toEqual([]);
  });

  test("no empty string values in zh.json", () => {
    const empty = zhKeys.filter((k) => {
      const parts = k.split(".");
      let val: unknown = zh;
      for (const p of parts) val = (val as Record<string, unknown>)[p];
      return val === "";
    });
    expect(empty).toEqual([]);
  });

  test("no empty string values in he.json", () => {
    const empty = heKeys.filter((k) => {
      const parts = k.split(".");
      let val: unknown = he;
      for (const p of parts) val = (val as Record<string, unknown>)[p];
      return val === "";
    });
    expect(empty).toEqual([]);
  });

  test("all locale files have the same top-level namespaces", () => {
    const enNamespaces = Object.keys(en).sort();
    const zhNamespaces = Object.keys(zh).sort();
    const heNamespaces = Object.keys(he).sort();
    expect(zhNamespaces).toEqual(enNamespaces);
    expect(heNamespaces).toEqual(enNamespaces);
  });

  test("required namespaces exist", () => {
    const required = [
      "site",
      "nav",
      "navCategories",
      "home",
      "common",
      "torahStudy",
      "admin",
    ];
    for (const ns of required) {
      expect(en).toHaveProperty(ns);
      expect(zh).toHaveProperty(ns);
      expect(he).toHaveProperty(ns);
    }
  });

  test("nav has all required page keys", () => {
    const navKeys = [
      "home", "torahStudy", "holidays", "shabbat", "kosherFood",
      "clothingModesty", "jewishTexts", "thirteenPrinciples",
      "tenCommandments", "fiveMegillot", "philosophy", "prayer",
      "jewishHistory", "messiah", "chabad", "hebrewLearning",
      "matchmaking", "lifeCycle", "familyPurity", "moneyLaws",
      "antisemitism", "ashkenaziSephardi", "jewsInAsia", "tabernacle",
      "nonJewishRelations", "community", "mentorship", "admin",
      "passoverSeder",
    ];
    for (const key of navKeys) {
      expect(en.nav).toHaveProperty(key);
    }
  });
});
