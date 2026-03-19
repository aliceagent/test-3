"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState } from "react";

const navSections = [
  {
    category: "foundations",
    items: [
      { key: "torahStudy", href: "/torah-study" },
      { key: "weeklyParsha", href: "/weekly-parsha" },
      { key: "thirteenPrinciples", href: "/thirteen-principles" },
      { key: "tenCommandments", href: "/ten-commandments" },
      { key: "fiveMegillot", href: "/five-megillot" },
    ],
  },
  {
    category: "dailyLiving",
    items: [
      { key: "shabbat", href: "/shabbat" },
      { key: "holidays", href: "/holidays" },
      { key: "passoverSeder", href: "/passover-seder" },
      { key: "prayer", href: "/prayer" },
      { key: "kosherFood", href: "/kosher-food" },
      { key: "blessings", href: "/blessings" },
      { key: "mitzvahObjects", href: "/mitzvah-objects" },
      { key: "jewishCalendar", href: "/jewish-calendar" },
      { key: "clothingModesty", href: "/clothing-modesty" },
      { key: "familyPurity", href: "/family-purity" },
      { key: "moneyLaws", href: "/money-laws" },
      { key: "nonJewishRelations", href: "/non-jewish-relations" },
    ],
  },
  {
    category: "textsPhilosophy",
    items: [
      { key: "jewishTexts", href: "/jewish-texts" },
      { key: "philosophy", href: "/philosophy" },
      { key: "pirkeiAvot", href: "/pirkei-avot" },
      { key: "mussar", href: "/mussar" },
      { key: "chabad", href: "/chabad" },
      { key: "hebrewLearning", href: "/hebrew-learning" },
    ],
  },
  {
    category: "historyIdentity",
    items: [
      { key: "jewishHistory", href: "/jewish-history" },
      { key: "messiah", href: "/messiah" },
      { key: "tabernacle", href: "/tabernacle" },
      { key: "ashkenaziSephardi", href: "/ashkenazi-sephardi" },
      { key: "jewsInAsia", href: "/jews-in-asia" },
      { key: "israel", href: "/israel" },
      { key: "antisemitism", href: "/antisemitism" },
    ],
  },
  {
    category: "communityLife",
    items: [
      { key: "lifeCycle", href: "/life-cycle" },
      { key: "conversion", href: "/conversion" },
      { key: "matchmaking", href: "/matchmaking" },
      { key: "community", href: "/community" },
      { key: "mentorship", href: "/mentorship" },
    ],
  },
];

export default function Navigation() {
  const t = useTranslations("nav");
  const tCat = useTranslations("navCategories");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <header className="bg-[var(--color-primary)] text-white sticky top-0 z-50 shadow-lg">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-[var(--color-gold)] text-2xl">✡</span>
          <span className="hidden sm:inline">Torah Light</span>
          <span className="sm:hidden">TL</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/about"
            className="hidden lg:inline-block text-sm text-white/80 hover:text-white transition-colors"
          >
            {t("about")}
          </Link>
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded hover:bg-[var(--color-primary-light)]"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="hidden lg:block bg-[var(--color-primary-dark)] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex gap-1">
          {navSections.map((section) => (
            <div key={section.category} className="relative group">
              <button className="px-3 py-3 text-sm font-medium hover:bg-[var(--color-primary-light)] rounded-t transition-colors">
                {tCat(section.category)}
              </button>
              <div className="absolute left-0 top-full hidden group-hover:block bg-white text-[var(--color-text)] shadow-xl rounded-b-lg min-w-[220px] z-50">
                {section.items.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`block px-4 py-2.5 text-sm hover:bg-[var(--color-cream)] transition-colors ${
                      pathname === item.href
                        ? "bg-[var(--color-cream)] text-[var(--color-primary)] font-semibold"
                        : ""
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden bg-[var(--color-primary-dark)] border-t border-white/10 max-h-[80vh] overflow-y-auto">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 text-sm font-semibold hover:bg-[var(--color-primary-light)] border-b border-white/10"
          >
            {t("home")}
          </Link>
          {navSections.map((section) => (
            <div key={section.category}>
              <button
                onClick={() =>
                  setOpenCategory(
                    openCategory === section.category
                      ? null
                      : section.category
                  )
                }
                className="w-full text-left px-4 py-3 text-sm font-semibold text-[var(--color-gold)] hover:bg-[var(--color-primary-light)] flex justify-between items-center"
              >
                {tCat(section.category)}
                <svg
                  className={`w-4 h-4 transition-transform ${
                    openCategory === section.category ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openCategory === section.category &&
                section.items.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-8 py-2.5 text-sm hover:bg-[var(--color-primary-light)] ${
                      pathname === item.href ? "text-[var(--color-gold)]" : ""
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                ))}
            </div>
          ))}
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 text-sm hover:bg-[var(--color-primary-light)] border-t border-white/10"
          >
            {t("about")}
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 text-sm text-[var(--color-gold)] hover:bg-[var(--color-primary-light)] border-t border-white/10"
          >
            {t("admin")}
          </Link>
        </nav>
      )}
    </header>
  );
}
