"use client";

import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import { getHolidayBySlug, getArticlesForHoliday } from "@/lib/holidays";
import type { Article } from "@/lib/articles";

function getPreview(body: string, maxLen = 160): string {
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
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-4">
          Holiday not found
        </h1>
        <Link href="/holidays" className="text-[var(--color-primary-light)] hover:underline">
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/holidays"
        className="text-sm text-[var(--color-primary-light)] hover:text-[var(--color-primary)] mb-6 inline-block"
      >
        &larr; All Holidays
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-3">
          {name}
        </h1>
        <div className="h-1 w-20 bg-[var(--color-gold)] mt-2 rounded" />
      </div>

      {articles.length === 0 ? (
        <p className="text-[var(--color-text-light)]">
          No articles yet for this holiday.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {articles.map((article) => {
            const title = getTitle(article);
            const body = getBody(article);
            if (!title) return null;

            return (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                className="group block bg-white border border-[var(--color-cream-dark)] rounded-xl p-5 hover:shadow-md hover:border-[var(--color-gold)] transition-all"
              >
                <h3 className="font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-primary-light)] mb-2 transition-colors">
                  {title}
                </h3>
                {body && (
                  <p className="text-sm text-[var(--color-text-light)] line-clamp-3 mb-3">
                    {getPreview(body)}
                  </p>
                )}
                <span className="text-xs text-[var(--color-primary-light)] group-hover:text-[var(--color-primary)] transition-colors">
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
