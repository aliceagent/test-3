"use client";

import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import { getHolidayBySlug, getArticlesForHoliday } from "@/lib/holidays";
import type { Article } from "@/lib/articles";

function getPreview(body: string, maxLen = 140): string {
  const plain = body
    .replace(/#{1,6}\s/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[(.+?)\]\(.*?\)/g, "$1")
    .replace(/>\s/g, "")
    .replace(/[-*]\s/g, "")
    .replace(/\n+/g, " ")
    .trim();
  return plain.length > maxLen ? plain.slice(0, maxLen) + "..." : plain;
}

export default function HolidayPage() {
  const params = useParams();
  const slug = params.holiday as string;
  const locale = useLocale();
  const holiday = getHolidayBySlug(slug);

  const articles = useMemo(() => {
    if (!holiday) return [];
    return getArticlesForHoliday(holiday);
  }, [holiday]);

  if (!holiday) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">
          Holiday not found
        </h1>
        <Link href="/holidays" className="text-sm text-[var(--color-text-light)] hover:text-[var(--color-text)] transition-colors">
          &larr; Back to all holidays
        </Link>
      </div>
    );
  }

  const name =
    locale === "zh" ? holiday.nameZh : locale === "he" ? holiday.nameHe : holiday.nameEn;

  function getTitle(a: Article): string {
    if (locale === "zh") return a.title_zh || a.title_en;
    if (locale === "he") return a.title_he || a.title_en;
    return a.title_en;
  }

  function getBody(a: Article): string {
    if (locale === "zh") return a.body_zh || a.body_en;
    if (locale === "he") return a.body_he || a.body_en;
    return a.body_en;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/holidays"
        className="text-sm text-[var(--color-text-light)] hover:text-[var(--color-text)] transition-colors mb-8 inline-block"
      >
        &larr; All Holidays
      </Link>

      <div className="mb-12">
        <h1 className="heading-display text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3">
          {name}
        </h1>
        <div className="h-0.5 w-16 bg-[var(--color-gold)] rounded-full" />
      </div>

      {articles.length === 0 ? (
        <p className="text-[var(--color-text-light)]">
          No articles yet for this holiday.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {articles.map((article) => {
            const title = getTitle(article);
            const body = getBody(article);
            if (!title) return null;

            return (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className="group block rounded-xl p-5 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
              >
                <h3 className="font-semibold text-[15px] text-[var(--color-text)] group-hover:text-[var(--color-primary)] mb-2 transition-colors leading-snug">
                  {title}
                </h3>
                {body && (
                  <p className="text-sm text-[var(--color-text-light)] line-clamp-2 mb-3 leading-relaxed">
                    {getPreview(body)}
                  </p>
                )}
                <span className="text-xs font-medium text-[var(--color-gold)] group-hover:text-[var(--color-gold-light)] transition-colors">
                  Read more &rarr;
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
