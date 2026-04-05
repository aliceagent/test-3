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
    category: "holidays",
    items: [
      { key: "allHolidays", href: "/holidays" },
      { key: "navShabbat", href: "/holidays/shabbat" },
      { key: "navRoshHashana", href: "/holidays/rosh-hashana" },
      { key: "navYomKippur", href: "/holidays/yom-kippur" },
      { key: "navSukkot", href: "/holidays/sukkot" },
      { key: "navChanukah", href: "/holidays/chanukah" },
      { key: "navPurim", href: "/holidays/purim" },
      { key: "navPassover", href: "/holidays/passover" },
      { key: "navShavuot", href: "/holidays/shavuot" },
      { key: "navTuBishvat", href: "/holidays/tu-bishvat" },
      { key: "navLagBaomer", href: "/holidays/lag-baomer" },
      { key: "navTishaBav", href: "/holidays/tisha-bav" },
    ],
  },
  {
    category: "dailyLiving",
    items: [
      { key: "prayer", href: "/prayer" },
      { key: "kosherFood", href: "/kosher-food" },
      { key: "blessings", href: "/blessings" },
      { key: "mitzvahObjects", href: "/mitzvah-objects" },
      { key: "jewishCalendar", href: "/jewish-calendar" },
      { key: "clothingModesty", href: "/clothing-modesty" },
      { key: "familyPurity", href: "/family-purity" },
      { key: "moneyLaws", href: "/money-laws" },
      { key: "moneyBusiness", href: "/money-business" },
      { key: "practicalHalacha", href: "/practical-halacha-for-daily-life" },
      { key: "jewishHome", href: "/jewish-home" },
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
      { key: "jewishValues", href: "/jewish-values" },
      { key: "chabad", href: "/chabad" },
      { key: "hebrewLearning", href: "/hebrew-learning" },
      { key: "jewishPhilosophyBigQuestions", href: "/jewish-philosophy-big-questions" },
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
      { key: "jewsInAsiaExpanded", href: "/jews-in-asia-expanded" },
      { key: "jewishStoriesAndInspiration", href: "/jewish-stories-and-inspiration" },
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
    <header className="bg-[var(--color-primary)] text-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-lg tracking-tight">
          <span className="text-[var(--color-gold)] text-xl">&#x2721;</span>
          <span className="hidden sm:inline">Torah Light</span>
          <span className="sm:hidden text-base">Torah Light</span>
        </Link>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="hidden lg:block border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-0.5">
          {navSections.map((section) => (
            <div key={section.category} className="relative group">
              <button className="px-3 py-2.5 text-[13px] font-medium text-white/80 hover:text-white transition-colors">
                {tCat(section.category)}
              </button>
              <div className="absolute start-0 top-full invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 bg-white text-[var(--color-text)] rounded-lg min-w-[220px] z-50 shadow-elevated overflow-hidden mt-0.5">
                {section.items.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`block px-4 py-2 text-[13px] hover:bg-[var(--color-cream)] transition-colors ${
                      pathname === item.href
                        ? "bg-[var(--color-cream)] text-[var(--color-primary)] font-medium"
                        : "text-[var(--color-text)]"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="ms-auto flex items-center gap-0.5">
            {[
              { key: "bibliography", href: "/bibliography" },
              { key: "about", href: "/about" },
            ].map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`px-3 py-2.5 text-[13px] font-medium transition-colors ${
                  pathname === link.href
                    ? "text-[var(--color-gold)]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile nav */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-200 ${
          mobileOpen ? "max-h-[80vh] border-t border-white/8" : "max-h-0"
        }`}
      >
        <nav className="bg-[var(--color-primary-dark)] overflow-y-auto max-h-[80vh] pb-4">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block px-5 py-3 text-sm font-medium hover:bg-white/5 border-b border-white/5"
          >
            {t("home")}
          </Link>
          {navSections.map((section) => (
            <div key={section.category}>
              <button
                onClick={() =>
                  setOpenCategory(
                    openCategory === section.category ? null : section.category
                  )
                }
                className="w-full text-start px-5 py-3 text-sm font-medium text-[var(--color-gold-light)] hover:bg-white/5 flex justify-between items-center"
              >
                {tCat(section.category)}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openCategory === section.category ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openCategory === section.category ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                {section.items.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block ps-10 pe-5 py-2 text-sm transition-colors ${
                      pathname === item.href
                        ? "text-[var(--color-gold)] bg-white/5"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="border-t border-white/5 mt-2 pt-2">
            {[
              { key: "bibliography", href: "/bibliography" },
              { key: "about", href: "/about" },
              { key: "admin", href: "/admin" },
            ].map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-5 py-2.5 text-sm transition-colors ${
                  link.key === "admin"
                    ? "text-[var(--color-gold-light)]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
