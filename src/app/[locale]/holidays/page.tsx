"use client";

import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { holidays, getArticlesForHoliday } from "@/lib/holidays";

export default function HolidaysPage() {
  const t = useTranslations("holidays");
  const locale = useLocale();

  function getName(h: (typeof holidays)[number]): string {
    if (locale === "zh") return h.nameZh;
    if (locale === "he") return h.nameHe;
    return h.nameEn;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-12">
        <h1 className="heading-display text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3">
          {t("title")}
        </h1>
        <p className="text-lg text-[var(--color-text-light)] leading-relaxed">
          {t("subtitle")}
        </p>
        <div className="h-0.5 w-16 bg-[var(--color-gold)] mt-5 rounded-full" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {holidays.map((h) => {
          const count = getArticlesForHoliday(h).length;
          return (
            <Link
              key={h.slug}
              href={`/holidays/${h.slug}`}
              className="group block rounded-xl p-5 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              <h2 className="font-semibold text-[15px] text-[var(--color-text)] group-hover:text-[var(--color-primary)] mb-1.5 transition-colors">
                {getName(h)}
              </h2>
              <p className="text-sm text-[var(--color-text-light)]">
                {count} {count === 1 ? "article" : "articles"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
