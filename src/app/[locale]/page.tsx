"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getAllArticles } from "@/lib/articles";

const featuredSections = [
  { href: "/torah-study", nameKey: "torahStudy", desc: "Explore the Five Books of Moses and Jewish scripture" },
  { href: "/holidays", nameKey: "holidays", desc: "Discover Jewish festivals, their meaning and observance" },
  { href: "/shabbat", nameKey: "shabbat", desc: "Learn about the Jewish day of rest" },
  { href: "/kosher-food", nameKey: "kosherFood", desc: "Understand the laws and practice of kosher eating" },
  { href: "/prayer", nameKey: "prayer", desc: "Guide to Jewish prayer and daily blessings" },
  { href: "/philosophy", nameKey: "philosophy", desc: "Jewish thought, ethics, and philosophical traditions" },
];

export default function HomePage() {
  const tHome = useTranslations("home");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const articleCount = getAllArticles().length;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-primary)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[#0a0f18]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }} />
        <div className="relative mx-auto max-w-4xl px-6 py-20 md:py-28 text-center">
          <p className="text-[var(--color-gold)] text-sm font-medium tracking-widest uppercase mb-6">
            Torah &#x4E4B;&#x5149;
          </p>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {tHome("hero")}
          </h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
            {tHome("heroSub")}
          </p>
          {articleCount > 0 && (
            <p className="inline-block rounded-full px-4 py-1.5 text-sm text-white/60 bg-white/[0.06] border border-white/[0.08] mb-8">
              {articleCount} {tHome("articlesAvailable")}
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <Link
              href="/torah-study"
              className="inline-flex items-center rounded-full px-7 py-3 text-[15px] font-semibold bg-[var(--color-gold)] text-[var(--color-primary-dark)] hover:bg-[var(--color-gold-light)] transition-colors"
            >
              {tHome("startLearning")}
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center rounded-full px-7 py-3 text-[15px] font-medium text-white border border-white/20 hover:bg-white/10 transition-colors"
            >
              {tHome("joinCommunity")}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="px-6 py-16 md:py-24 bg-[var(--color-bg)]">
        <div className="mx-auto max-w-5xl">
          <h2 className="heading-section text-2xl md:text-3xl font-bold text-[var(--color-text)] text-center mb-3">
            {tHome("featuredSections")}
          </h2>
          <p className="text-[var(--color-text-light)] text-center mb-12 max-w-xl mx-auto">
            Begin your journey into Torah and Jewish wisdom
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group relative flex flex-col rounded-xl p-6 bg-[var(--color-surface)] shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 border border-[var(--color-border)]"
              >
                <h3 className="text-base font-semibold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {tNav(section.nameKey)}
                </h3>
                <p className="text-sm text-[var(--color-text-light)] leading-relaxed flex-1">
                  {section.desc}
                </p>
                <span className="mt-4 text-sm font-medium text-[var(--color-gold)] group-hover:text-[var(--color-gold-light)] transition-colors">
                  {tCommon("learnMore")} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] p-8 md:p-12 text-center">
          <h2 className="heading-section text-2xl md:text-3xl font-bold text-white mb-3">
            {tHome("whatsappJoin")}
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto leading-relaxed">
            {tHome("whatsappDesc")}
          </p>
          <a
            href="https://chat.whatsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full px-7 py-3 text-[15px] font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] transition-colors"
          >
            {tHome("joinCommunity")}
          </a>
        </div>
      </section>
    </main>
  );
}
