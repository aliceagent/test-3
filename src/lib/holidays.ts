import { getAllArticles } from "@/lib/articles";
import type { Article } from "@/lib/articles";

export interface HolidayDef {
  slug: string;
  nameEn: string;
  nameZh: string;
  nameHe: string;
  /** Sections to pull articles from */
  sections: string[];
  /** Keywords to match in title_en (case-insensitive). Empty = use all articles in the sections */
  keywords: string[];
}

export const holidays: HolidayDef[] = [
  {
    slug: "rosh-hashana",
    nameEn: "Rosh Hashana",
    nameZh: "犹太新年",
    nameHe: "ראש השנה",
    sections: ["holidays"],
    keywords: ["rosh hash", "shofar", "apple and honey", "simanim"],
  },
  {
    slug: "yom-kippur",
    nameEn: "Yom Kippur",
    nameZh: "赎罪日",
    nameHe: "יום כיפור",
    sections: ["holidays"],
    keywords: ["yom kippur", "kol nidrei", "kapparot", "five prohibitions", "tashlich"],
  },
  {
    slug: "sukkot",
    nameEn: "Sukkot",
    nameZh: "住棚节",
    nameHe: "סוכות",
    sections: ["holidays"],
    keywords: ["sukkah", "sukkot", "four species", "arba minim", "ushpizin", "shemini atzeret", "simchat torah"],
  },
  {
    slug: "chanukah",
    nameEn: "Chanukah",
    nameZh: "光明节",
    nameHe: "חנוכה",
    sections: ["holidays"],
    keywords: ["chanukah", "hanukkah", "menorah", "latkes", "sufganiyot"],
  },
  {
    slug: "purim",
    nameEn: "Purim",
    nameZh: "普珥节",
    nameHe: "פורים",
    sections: ["holidays"],
    keywords: ["purim", "megillah", "hamantaschen", "mishloach manot"],
  },
  {
    slug: "passover",
    nameEn: "Passover (Pesach)",
    nameZh: "逾越节",
    nameHe: "פסח",
    sections: ["passover-seder", "holidays"],
    keywords: [],
    // Special: uses all of passover-seder + keyword filter on holidays
  },
  {
    slug: "shavuot",
    nameEn: "Shavuot",
    nameZh: "五旬节",
    nameHe: "שבועות",
    sections: ["holidays"],
    keywords: ["shavuot", "tikkun leil", "dairy", "cheesecake", "blintzes", "book of ruth"],
  },
  {
    slug: "shabbat",
    nameEn: "Shabbat",
    nameZh: "安息日",
    nameHe: "שבת",
    sections: ["shabbat"],
    keywords: [],
  },
  {
    slug: "tu-bishvat",
    nameEn: "Tu BiShvat",
    nameZh: "树木新年",
    nameHe: "ט\"ו בשבט",
    sections: ["holidays"],
    keywords: ["tu bishvat", "tu b'shvat"],
  },
  {
    slug: "lag-baomer",
    nameEn: "Lag BaOmer",
    nameZh: "篝火节",
    nameHe: "ל\"ג בעומר",
    sections: ["holidays"],
    keywords: ["lag baomer", "lag b'omer"],
  },
  {
    slug: "tisha-bav",
    nameEn: "Tisha B'Av",
    nameZh: "圣殿被毁日",
    nameHe: "תשעה באב",
    sections: ["holidays"],
    keywords: ["tisha b'av", "tisha bav", "ninth of av"],
  },
];

// Passover-specific keywords for filtering articles from the "holidays" section
const passoverKeywords = [
  "pesach", "passover", "afikoman", "kitniyot", "chol hamoed",
  "seder", "chametz", "matzah", "haggadah",
];

export function getArticlesForHoliday(holiday: HolidayDef): Article[] {
  const all = getAllArticles();

  if (holiday.slug === "passover") {
    // All passover-seder articles + keyword-matched holidays articles
    return all.filter((a) => {
      if (a.section === "passover-seder") return true;
      if (a.section === "holidays") {
        const title = a.title_en.toLowerCase();
        return passoverKeywords.some((kw) => title.includes(kw));
      }
      return false;
    });
  }

  if (holiday.keywords.length === 0) {
    // Use all articles from the specified sections
    return all.filter((a) => holiday.sections.includes(a.section));
  }

  // Keyword-based filter
  return all.filter((a) => {
    if (!holiday.sections.includes(a.section)) return false;
    const title = a.title_en.toLowerCase();
    return holiday.keywords.some((kw) => title.includes(kw));
  });
}

export function getHolidayBySlug(slug: string): HolidayDef | undefined {
  return holidays.find((h) => h.slug === slug);
}
