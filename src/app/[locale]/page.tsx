"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { supabase } from "@/lib/supabase";

const featuredSections = [
  {
    href: "/torah-study",
    icon: "📖",
    nameKey: "torahStudy",
    description: "Explore the Five Books of Moses and Jewish scripture",
  },
  {
    href: "/shabbat",
    icon: "🕯️",
    nameKey: "shabbat",
    description: "Learn about the Jewish day of rest and its observance",
  },
  {
    href: "/holidays",
    icon: "✡️",
    nameKey: "holidays",
    description: "Discover the meaning of Jewish festivals and holy days",
  },
  {
    href: "/kosher-food",
    icon: "🍽️",
    nameKey: "kosherFood",
    description: "Understand the laws and practice of kosher eating",
  },
  {
    href: "/prayer",
    icon: "🙏",
    nameKey: "prayer",
    description: "Guide to Jewish prayer, synagogue, and daily blessings",
  },
  {
    href: "/philosophy",
    icon: "💡",
    nameKey: "philosophy",
    description: "Jewish thought, ethics, and philosophical traditions",
  },
];

export default function HomePage() {
  const tHome = useTranslations("home");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const [articleCount, setArticleCount] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from("articles")
      .select("*", { count: "exact", head: true })
      .then(({ count }) => {
        if (count != null) setArticleCount(count);
      });
  }, []);

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--color-cream)" }}>
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center px-4 py-20 text-center md:py-32"
        style={{
          background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl">
          <h1
            className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
          >
            {tHome("hero")}
          </h1>
          <p
            className="mb-10 text-lg leading-relaxed md:text-xl"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            {tHome("heroSub")}
          </p>
          {articleCount != null && (
            <p
              className="mb-8 inline-block rounded-full px-5 py-2 text-sm font-medium"
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(4px)",
              }}
            >
              {articleCount} {tHome("articlesAvailable")}
            </p>
          )}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/torah-study"
              className="inline-block rounded-full px-8 py-4 text-base font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-lg"
              style={{
                backgroundColor: "var(--color-gold)",
                color: "#1a1a1a",
              }}
            >
              {tHome("startLearning")}
            </Link>
            <Link
              href="/community"
              className="inline-block rounded-full border-2 border-white px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-white"
              style={{ color: "#ffffff" }}
            >
              {tHome("joinCommunity")}
            </Link>
          </div>
        </div>
        {/* Decorative overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.05) 20px, rgba(255,255,255,0.05) 40px)",
          }}
        />
      </section>

      {/* Featured Sections Grid */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-4 text-center text-3xl font-bold md:text-4xl"
            style={{ color: "var(--color-text)" }}
          >
            {tHome("featuredSections")}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group flex flex-col rounded-2xl p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                style={{ backgroundColor: "#ffffff" }}
              >
                <div className="mb-4 text-4xl">{section.icon}</div>
                <h3
                  className="mb-2 text-xl font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {tNav(section.nameKey)}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-light)" }}
                >
                  {section.description}
                </p>
                <span
                  className="mt-4 self-start text-sm font-medium transition-colors duration-200 group-hover:underline"
                  style={{ color: "var(--color-primary)" }}
                >
                  {tCommon("learnMore")} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Banner */}
      <section
        className="px-4 py-14"
        style={{ backgroundColor: "var(--color-bg-alt)" }}
      >
        <div
          className="mx-auto flex max-w-4xl flex-col items-center rounded-3xl px-8 py-12 text-center shadow-md md:flex-row md:gap-10 md:text-left"
          style={{ backgroundColor: "var(--color-gold)" }}
        >
          <div className="mb-6 text-5xl md:mb-0 md:text-6xl">💬</div>
          <div className="flex-1">
            <h2
              className="mb-3 text-2xl font-bold md:text-3xl"
              style={{ color: "#1a1a1a" }}
            >
              {tHome("whatsappJoin")}
            </h2>
            <p
              className="mb-6 text-base leading-relaxed"
              style={{ color: "rgba(0,0,0,0.75)" }}
            >
              {tHome("whatsappDesc")}
            </p>
            <a
              href="https://chat.whatsapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-8 py-3 text-base font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg"
              style={{ backgroundColor: "#25D366" }}
            >
              {tHome("joinCommunity")}
            </a>
          </div>
        </div>
      </section>

      {/* Video Highlights Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-4 text-center text-3xl font-bold md:text-4xl"
            style={{ color: "var(--color-text)" }}
          >
            {tHome("videoHighlights")}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden rounded-2xl shadow-sm"
                style={{ backgroundColor: "#ffffff" }}
              >
                {/* Video placeholder */}
                <div
                  className="relative flex items-center justify-center"
                  style={{
                    aspectRatio: "16/9",
                    backgroundColor: "var(--color-bg-alt)",
                  }}
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full text-3xl"
                    style={{ backgroundColor: "var(--color-primary)", color: "#ffffff" }}
                  >
                    ▶
                  </div>
                </div>
                <div className="p-4">
                  <div
                    className="mb-2 h-4 rounded"
                    style={{ backgroundColor: "var(--color-bg-alt)", width: "75%" }}
                  />
                  <div
                    className="h-3 rounded"
                    style={{ backgroundColor: "var(--color-bg-alt)", width: "55%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
