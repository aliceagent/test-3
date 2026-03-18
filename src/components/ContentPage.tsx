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

// Map namespace camelCase to section slug
function namespaceToSlug(namespace: string): string {
  return namespace.replace(/([A-Z])/g, "-$1").toLowerCase();
}

function getPreview(body: string, maxLen = 160): string {
  // Strip markdown syntax for a clean preview
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-3">
          {t(titleKey)}
        </h1>
        <p className="text-lg text-[var(--color-text-light)]">
          {t(subtitleKey)}
        </p>
        <div className="h-1 w-20 bg-[var(--color-gold)] mt-4 rounded" />
      </div>

      {/* Table of Contents */}
      <div className="bg-[var(--color-cream)] rounded-xl p-6 mb-10">
        <h2 className="font-semibold text-[var(--color-primary)] mb-3">
          {tCommon("tableOfContents")}
        </h2>
        <ul className="space-y-2">
          {sections.map((section, i) => (
            <li key={i}>
              <a
                href={`#section-${i}`}
                className="text-[var(--color-primary-light)] hover:text-[var(--color-primary)] text-sm hover:underline"
              >
                {t(section.titleKey)}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Sections */}
      <div className="space-y-12">
        {sections.map((section, i) => (
          <article
            key={i}
            id={`section-${i}`}
            className="scroll-mt-20 border-b border-[var(--color-cream-dark)] pb-10 last:border-0"
          >
            <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4 flex items-center gap-2">
              <span className="text-[var(--color-gold)]">✡</span>
              {t(section.titleKey)}
            </h2>

            {section.descKey && (
              <p className="text-[var(--color-text-light)] mb-4 italic">
                {t(section.descKey)}
              </p>
            )}

            {section.content ? (
              <div className="prose max-w-none text-[var(--color-text)]">
                <p>{section.content}</p>
              </div>
            ) : (
              <div className="bg-[var(--color-bg-alt)] rounded-lg p-6 text-[var(--color-text-light)] text-sm">
                <p>
                  Content for this section is being prepared. Check back soon or
                  visit the admin panel to add content.
                </p>
                <p className="mt-2">
                  本节内容正在准备中。请稍后再来查看，或访问管理面板添加内容。
                </p>
              </div>
            )}

            {section.videoPlaceholder && (
              <div className="mt-4 bg-[var(--color-primary-dark)] rounded-xl aspect-video flex items-center justify-center text-white">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto mb-2 opacity-50"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <p className="text-sm opacity-70">Video coming soon</p>
                </div>
              </div>
            )}

            {section.audioPlaceholder && (
              <div className="mt-4 bg-[var(--color-cream)] rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--color-gold)] rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Audio recording</p>
                  <p className="text-xs text-[var(--color-text-light)]">
                    Audio content coming soon / 音频内容即将推出
                  </p>
                </div>
              </div>
            )}

            {section.imagePlaceholder && (
              <div className="mt-4 bg-[var(--color-cream)] rounded-xl aspect-[3/2] flex items-center justify-center">
                <div className="text-center text-[var(--color-text-light)]">
                  <svg
                    className="w-12 h-12 mx-auto mb-2 opacity-30"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                  </svg>
                  <p className="text-sm">Image gallery coming soon</p>
                </div>
              </div>
            )}

            <ArticleFeedback
              sectionId={`${namespace}-${section.titleKey}`}
              sectionTitle={t(section.titleKey)}
              pageUrl={typeof window !== "undefined" ? `${window.location.origin}${pathname}#section-${i}` : undefined}
            />
          </article>
        ))}
      </div>

      {/* Articles from Supabase — shown as linkable cards */}
      {articles.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6 flex items-center gap-2">
            <span className="text-[var(--color-gold)]">✡</span>
            Articles
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {articles.map((article) => {
              const title = getArticleTitle(article);
              const body = getArticleBody(article);
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
                  <div className="flex items-center justify-between">
                    {article.updated_at && (
                      <span className="text-xs text-[var(--color-text-light)]">
                        {new Date(article.updated_at).toLocaleDateString()}
                      </span>
                    )}
                    <span className="text-xs text-[var(--color-primary-light)] group-hover:text-[var(--color-primary)] transition-colors">
                      Read more &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Related Topics */}
      {relatedLinks && relatedLinks.length > 0 && (
        <div className="mt-12 bg-[var(--color-cream)] rounded-xl p-6">
          <h3 className="font-semibold text-[var(--color-primary)] mb-3">
            {tCommon("relatedTopics")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {relatedLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="px-4 py-2 bg-white rounded-full text-sm text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors shadow-sm"
              >
                {link.labelKey}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back to top */}
      <div className="mt-8 text-center">
        <a
          href="#"
          className="text-sm text-[var(--color-primary-light)] hover:text-[var(--color-primary)]"
        >
          {tCommon("backToTop")} ↑
        </a>
      </div>
    </div>
  );
}
