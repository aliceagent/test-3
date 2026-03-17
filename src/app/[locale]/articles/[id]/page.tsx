"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@/i18n/navigation";
import { supabase } from "@/lib/supabase";
import ArticleFeedback from "@/components/ArticleFeedback";

interface Article {
  id: number;
  section: string;
  title_en: string;
  title_zh: string;
  title_he: string;
  body_en: string;
  body_zh: string;
  body_he: string;
  created_at: string;
  updated_at: string;
}

export default function ArticlePage() {
  const params = useParams();
  const locale = useLocale();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    let cancelled = false;
    const articleId = params.id as string;

    supabase
      .from("articles")
      .select("*")
      .eq("id", articleId)
      .single()
      .then(({ data }) => {
        if (cancelled) return;
        if (data) {
          setArticle(data);
          // Fetch related articles from same section
          supabase
            .from("articles")
            .select("id, section, title_en, title_zh, title_he, created_at")
            .eq("section", data.section)
            .neq("id", data.id)
            .order("created_at", { ascending: false })
            .limit(5)
            .then(({ data: related }) => {
              if (!cancelled && related) {
                setRelatedArticles(related as Article[]);
              }
            });
        }
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [params.id]);

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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-[var(--color-cream)] rounded w-2/3 mx-auto mb-4" />
          <div className="h-4 bg-[var(--color-cream)] rounded w-1/3 mx-auto" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4">
          Article not found
        </h1>
        <p className="text-[var(--color-text-light)] mb-6">
          This article may have been removed or the link is incorrect.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-light)] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const title = getTitle(article);
  const body = getBody(article);
  const isRtl = locale === "he";
  const sectionLabel = article.section
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-[var(--color-text-light)]">
        <Link href="/" className="hover:text-[var(--color-primary)]">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/${article.section}`}
          className="hover:text-[var(--color-primary)]"
        >
          {sectionLabel}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-text)]">{title}</span>
      </nav>

      {/* Article Header */}
      <header className="mb-8" dir={isRtl ? "rtl" : "ltr"}>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-[var(--color-cream)] rounded-full text-xs text-[var(--color-text-light)]">
            {sectionLabel}
          </span>
          {article.updated_at && (
            <span className="text-xs text-[var(--color-text-light)]">
              {new Date(article.updated_at).toLocaleDateString()}
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-3">
          {title}
        </h1>
        <div className="h-1 w-20 bg-[var(--color-gold)] rounded" />
      </header>

      {/* Article Body */}
      <div
        className="prose prose-lg max-w-none text-[var(--color-text)] prose-headings:text-[var(--color-primary)] prose-a:text-[var(--color-primary-light)] prose-img:rounded-xl prose-img:shadow-md prose-blockquote:border-[var(--color-gold)] prose-strong:text-[var(--color-primary)] mb-10"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            img: ({ src, alt, ...props }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt || ""}
                loading="lazy"
                className="rounded-xl shadow-md max-w-full h-auto my-6"
                {...props}
              />
            ),
          }}
        >
          {body}
        </ReactMarkdown>
      </div>

      {/* Feedback */}
      <div className="border-t border-[var(--color-cream-dark)] pt-6 mb-10">
        <ArticleFeedback
          sectionId={`article-${article.id}`}
          sectionTitle={title}
        />
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="bg-[var(--color-cream)] rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-[var(--color-primary)] mb-4">
            More in {sectionLabel}
          </h3>
          <div className="space-y-2">
            {relatedArticles.map((related) => (
              <Link
                key={related.id}
                href={`/articles/${related.id}`}
                className="block px-4 py-3 bg-white rounded-lg hover:shadow-sm transition-shadow text-sm text-[var(--color-text)] hover:text-[var(--color-primary)]"
              >
                {getTitle(related)}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="text-center">
        <Link
          href={`/${article.section}`}
          className="text-sm text-[var(--color-primary-light)] hover:text-[var(--color-primary)]"
        >
          &larr; Back to {sectionLabel}
        </Link>
      </div>
    </div>
  );
}
