"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import bibliographyIndex from "@/data/bibliography-index.json";

type BibEntry = {
  id: number | null;
  title: { en: string; zh: string; he: string };
  section: string;
  description: string;
  tags: string[];
  sources: string[];
  cultural_parallels: string[];
  chinese_dynasty_references: string[];
  status: string;
  filePath: string;
};

const entries = bibliographyIndex as BibEntry[];

// Normalize section slug → display name & href
const SECTION_MAP: Record<string, { label: string; href: string }> = {
  shabbat: { label: "Shabbat", href: "/shabbat" },
  "torah-study": { label: "Torah Study", href: "/torah-study" },
  "weekly-parsha": { label: "Weekly Parsha", href: "/weekly-parsha" },
  holidays: { label: "Holidays", href: "/holidays" },
  "kosher-food": { label: "Kosher Food", href: "/kosher-food" },
  prayer: { label: "Prayer", href: "/prayer" },
  conversion: { label: "Conversion", href: "/conversion" },
  "jewish-history": { label: "Jewish History", href: "/jewish-history" },
  "jewish-texts": { label: "Classic Texts", href: "/jewish-texts" },
  blessings: { label: "Blessings", href: "/blessings" },
  community: { label: "Community", href: "/community" },
  mentorship: { label: "Mentorship", href: "/mentorship" },
  mussar: { label: "Mussar", href: "/mussar" },
  philosophy: { label: "Philosophy", href: "/philosophy" },
  israel: { label: "Israel", href: "/israel" },
  "jewish-calendar": { label: "Jewish Calendar", href: "/jewish-calendar" },
  "life-cycle": { label: "Life Cycle", href: "/life-cycle" },
  "mitzvah-objects": { label: "Mitzvah Objects", href: "/mitzvah-objects" },
  mitzvah_objects: { label: "Mitzvah Objects", href: "/mitzvah-objects" },
  chabad: { label: "Chabad", href: "/chabad" },
  "ashkenazi-&-sephardi": {
    label: "Ashkenazi & Sephardi",
    href: "/ashkenazi-sephardi",
  },
  "ashkenazi-sephardi": {
    label: "Ashkenazi & Sephardi",
    href: "/ashkenazi-sephardi",
  },
  "pirkei-avot": { label: "Pirkei Avot", href: "/pirkei-avot" },
  "passover-seder": { label: "Passover Seder", href: "/passover-seder" },
  "jews-in-asia": { label: "Jews in Asia", href: "/jews-in-asia" },
  "hebrew-learning": { label: "Hebrew Learning", href: "/hebrew-learning" },
};

function getSectionInfo(section: string) {
  return (
    SECTION_MAP[section] ||
    SECTION_MAP[section.toLowerCase()] || {
      label: section || "General",
      href: `/${section}`,
    }
  );
}

function entryMatchesQuery(entry: BibEntry, query: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  const haystack = [
    entry.title.en,
    entry.title.zh,
    entry.title.he,
    entry.description,
    entry.section,
    ...entry.tags,
    ...entry.sources,
    ...entry.cultural_parallels,
    ...entry.chinese_dynasty_references,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

export default function BibliographyPage() {
  const t = useTranslations("bibliography");
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState<string>("all");

  const allSections = useMemo(() => {
    const seen = new Set<string>();
    entries.forEach((e) => {
      const s = getSectionInfo(e.section);
      if (e.section) seen.add(e.section);
    });
    return ["all", ...Array.from(seen).sort()];
  }, []);

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      const matchesQuery = entryMatchesQuery(e, query);
      const matchesSection =
        activeSection === "all" || e.section === activeSection;
      return matchesQuery && matchesSection;
    });
  }, [query, activeSection]);

  function getTitle(entry: BibEntry) {
    if (locale === "zh" && entry.title.zh) return entry.title.zh;
    if (locale === "he" && entry.title.he) return entry.title.he;
    return entry.title.en || entry.title.zh || entry.title.he || t("untitled");
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-3">
          {t("title")}
        </h1>
        <p className="text-lg text-[var(--color-text-light)]">
          {t("subtitle")}
        </p>
        <div className="h-1 w-20 bg-[var(--color-gold)] mt-4 rounded" />
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            dir="auto"
          />
          <svg
            className="absolute left-3 top-3.5 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-lg leading-none"
            >
              ×
            </button>
          )}
        </div>
        <p className="mt-2 text-sm text-[var(--color-text-light)]">
          {t("searchHint")}
        </p>
      </div>

      {/* Section filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {allSections.map((sec) => {
          const info = sec === "all" ? { label: t("allSections") } : getSectionInfo(sec);
          return (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                activeSection === sec
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-cream)] text-[var(--color-text)] hover:bg-[var(--color-cream-dark)]"
              }`}
            >
              {info.label}
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <p className="text-sm text-[var(--color-text-light)] mb-4">
        {filtered.length === entries.length
          ? t("showingAll", { count: entries.length })
          : t("showingFiltered", { count: filtered.length, total: entries.length })}
      </p>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-[var(--color-text-light)]">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-lg">{t("noResults")}</p>
          <p className="text-sm mt-1">{t("noResultsHint")}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((entry, idx) => {
            const sectionInfo = getSectionInfo(entry.section);
            const articleHref = entry.id ? `/articles/${entry.id}` : null;
            return (
              <div
                key={entry.id ?? `no-id-${idx}`}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Title row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    {articleHref ? (
                      <Link
                        href={articleHref}
                        className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-gold)] transition-colors"
                      >
                        {getTitle(entry)}
                      </Link>
                    ) : (
                      <span className="font-semibold text-[var(--color-primary)]">
                        {getTitle(entry)}
                      </span>
                    )}
                    {/* Show alternate language title if different locale */}
                    {locale !== "en" && entry.title.en && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {entry.title.en}
                      </p>
                    )}
                  </div>
                  <Link
                    href={sectionInfo.href}
                    className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-[var(--color-cream)] text-[var(--color-primary)] hover:bg-[var(--color-cream-dark)] transition-colors"
                  >
                    {sectionInfo.label}
                  </Link>
                </div>

                {/* Description */}
                {entry.description && (
                  <p className="text-sm text-[var(--color-text-light)] mb-3">
                    {entry.description}
                  </p>
                )}

                {/* Tags */}
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {entry.tags.map((tag, ti) => {
                      const isMatch =
                        query.trim() &&
                        tag.toLowerCase().includes(query.toLowerCase().trim());
                      return (
                        <button
                          key={ti}
                          onClick={() => setQuery(tag)}
                          className={`text-xs px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                            isMatch
                              ? "bg-[var(--color-gold)] text-white font-medium"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Sources */}
                {entry.sources.length > 0 && (
                  <details className="mt-2">
                    <summary className="text-xs text-[var(--color-text-light)] cursor-pointer hover:text-[var(--color-primary)] transition-colors">
                      {t("sources", { count: entry.sources.length })}
                    </summary>
                    <ul className="mt-2 space-y-1">
                      {entry.sources.map((src, si) => (
                        <li key={si}>
                          <a
                            href={src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline break-all"
                          >
                            {src}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}

                {/* Cultural parallels */}
                {entry.cultural_parallels.length > 0 && (
                  <details className="mt-2">
                    <summary className="text-xs text-[var(--color-text-light)] cursor-pointer hover:text-[var(--color-primary)] transition-colors">
                      {t("culturalParallels", {
                        count: entry.cultural_parallels.length,
                      })}
                    </summary>
                    <ul className="mt-2 space-y-1">
                      {entry.cultural_parallels.map((cp, ci) => (
                        <li key={ci} className="text-xs text-gray-600 flex items-start gap-1">
                          <span className="text-[var(--color-gold)] mt-0.5">✦</span>
                          {cp}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
