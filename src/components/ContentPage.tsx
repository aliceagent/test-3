"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useMemo } from "react";
import { getArticlesBySection } from "@/lib/articles";
import type { Article } from "@/lib/articles";
import ArticleFeedback from "./ArticleFeedback";

interface ContentSection {
  titleKey: string;
  descKey?: string;
  content?: string;
  videoPlaceholder?: boolean;
  audioPlaceholder?: boolean;
  imagePlaceholder?: boolean;
}

interface ContentPageProps {
  namespace: string;
  titleKey: string;
  subtitleKey: string;
  sections: ContentSection[];
  relatedLinks?: { href: string; labelKey: string; labelNs: string }[];
}

function namespaceToSlug(namespace: string): string {
  return namespace.replace(/([A-Z])/g, "-$1").toLowerCase();
}

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

export default function ContentPage({
  namespace,
  titleKey,
  subtitleKey,
  sections,
  relatedLinks,
}: ContentPageProps) {
  const t = useTranslations(namespace);
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const articles = useMemo(() => {
    const slug = namespaceToSlug(namespace);
    return getArticlesBySection(slug);
  }, [namespace]);

  function getArticleBody(article: Article): string {
    if (locale === "zh") return article.body_zh || article.body_en;
    if (locale === "he") return article.body_he || article.body_en;
    return article.body_en;
  }

  function getArticleTitle(article: Article): string {
    if (locale === "zh") return article.title_zh || article.title_en;
    if (locale === "he") return article.title_he || article.title_en;
    return article.title_en;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-12">
        <h1 className="heading-display text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3">
          {t(titleKey)}
        </h1>
        <p className="text-lg text-[var(--color-text-light)] leading-relaxed">
          {t(subtitleKey)}
        </p>
        <div className="h-0.5 w-16 bg-[var(--color-gold)] mt-5 rounded-full" />
      </div>

      {/* Articles grid */}
      {articles.length > 0 && (
        <div className="mb-14">
          <div className="grid gap-3 sm:grid-cols-2">
            {articles.map((article) => {
              const title = getArticleTitle(article);
              const body = getArticleBody(article);
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
        </div>
      )}

      {/* Content Sections */}
      <div className="space-y-10">
        {sections.map((section, i) => {
          const hasContent = section.content || section.videoPlaceholder || section.audioPlaceholder || section.imagePlaceholder;
          if (!hasContent && articles.length > 0) return null;

          return (
            <article
              key={i}
              id={`section-${i}`}
              className="scroll-mt-20 border-b border-[var(--color-border)] pb-10 last:border-0"
            >
              <h2 className="heading-section text-xl font-bold text-[var(--color-text)] mb-4">
                {t(section.titleKey)}
              </h2>

              {section.descKey && (
                <p className="text-[var(--color-text-light)] mb-4 italic text-sm">
                  {t(section.descKey)}
                </p>
              )}

              {section.content ? (
                <div className="prose max-w-none text-[var(--color-text)]">
                  <p>{section.content}</p>
                </div>
              ) : (
                <div className="bg-[var(--color-bg-alt)] rounded-lg p-5 text-[var(--color-text-light)] text-sm border border-[var(--color-border)]">
                  <p>Content for this section is being prepared.</p>
                  <p className="mt-1 text-xs">&#x672C;&#x8282;&#x5185;&#x5BB9;&#x6B63;&#x5728;&#x51C6;&#x5907;&#x4E2D;&#x3002;</p>
                </div>
              )}

              <ArticleFeedback
                sectionId={`${namespace}-${section.titleKey}`}
                sectionTitle={t(section.titleKey)}
                pageUrl={typeof window !== "undefined" ? `${window.location.origin}${pathname}#section-${i}` : undefined}
              />
            </article>
          );
        })}
      </div>

      {/* Related Topics */}
      {relatedLinks && relatedLinks.length > 0 && (
        <div className="mt-14 bg-[var(--color-bg-alt)] rounded-xl p-6 border border-[var(--color-border)]">
          <h3 className="font-semibold text-[var(--color-text)] mb-4 text-sm uppercase tracking-wider">
            {tCommon("relatedTopics")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {relatedLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="px-4 py-2 bg-[var(--color-surface)] rounded-full text-sm text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white transition-colors border border-[var(--color-border)]"
              >
                {link.labelKey}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back to top */}
      <div className="mt-10 text-center">
        <a href="#" className="text-sm text-[var(--color-text-light)] hover:text-[var(--color-text)] transition-colors">
          {tCommon("backToTop")} &uarr;
        </a>
      </div>
    </div>
  );
}
