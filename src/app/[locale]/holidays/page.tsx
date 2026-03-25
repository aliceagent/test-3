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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-3">
          {t("title")}
        </h1>
        <p className="text-lg text-[var(--color-text-light)]">
          {t("subtitle")}
        </p>
        <div className="h-1 w-20 bg-[var(--color-gold)] mt-4 rounded" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {holidays.map((h) => {
          const count = getArticlesForHoliday(h).length;
          return (
            <Link
              key={h.slug}
              href={`/holidays/${h.slug}`}
              className="group block bg-white border border-[var(--color-cream-dark)] rounded-xl p-6 hover:shadow-md hover:border-[var(--color-gold)] transition-all"
            >
              <h2 className="font-semibold text-lg text-[var(--color-primary)] group-hover:text-[var(--color-primary-light)] mb-2 transition-colors">
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
