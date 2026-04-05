"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useState, useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@/i18n/navigation";
import { supabase } from "@/lib/supabase";
import { getArticleById, getArticlesBySection } from "@/lib/articles";
import type { Article } from "@/lib/articles";
import ArticleFeedback from "@/components/ArticleFeedback";
import ArticleHeroImage from "@/components/ArticleHeroImage";
import { articleImageMap } from "@/data/image-map";

export default function ArticlePage() {
  const params = useParams();
  const locale = useLocale();
  const articleId = Number(params.id);

  // Load from static data immediately
  const article = useMemo(() => getArticleById(articleId) || null, [articleId]);
  const relatedArticles = useMemo(
    () =>
      article
        ? getArticlesBySection(article.section)
            .filter((a) => a.id !== article.id)
            .slice(0, 5)
        : [],
    [article]
  );
  const loading = false;

  // Edit suggestion state
  const [editing, setEditing] = useState(false);
  const [editTab, setEditTab] = useState<"en" | "zh" | "he">("en");
  const [editPreview, setEditPreview] = useState(false);
  const [editorName, setEditorName] = useState("");
  const [editData, setEditData] = useState({
    title_en: "",
    title_zh: "",
    title_he: "",
    body_en: "",
    body_zh: "",
    body_he: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function getTitle(a: Article): string {
    if (locale === "zh") return a.title_zh || a.title_en;
    if (locale === "he") return a.title_he || a.title_en;
    return a.title_en;
  }

  function getBody(a: Article): string {
    if (locale === "zh") return stripImageDescription(a.body_zh || a.body_en);
    if (locale === "he") return stripImageDescription(a.body_he || a.body_en);
    return stripImageDescription(a.body_en);
  }

  function stripImageDescription(body: string): string {
    // Remove any blockquote block that mentions DALL-E (covers all language variants)
    const lines = body.split("\n");
    const result: string[] = [];
    let skipping = false;

    for (const line of lines) {
      const isBlockquote = line.startsWith(">");
      const isDallE = /dall-e/i.test(line);

      if (isBlockquote && isDallE) {
        skipping = true;
        continue;
      }
      if (skipping) {
        // Continue skipping continuation lines of the same blockquote
        if (isBlockquote || line.trim() === "") {
          continue;
        }
        skipping = false;
      }

      // Also strip non-blockquote italic DALL-E descriptions: *Header Image Description: ...*
      if (/^\*[^*]*dall-e/i.test(line) || /^\*.*image\s*description/i.test(line)) {
        skipping = true;
        continue;
      }

      result.push(line);
    }

    return result.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  }

  function startEditing() {
    if (!article) return;
    setEditData({
      title_en: article.title_en,
      title_zh: article.title_zh,
      title_he: article.title_he,
      body_en: article.body_en,
      body_zh: article.body_zh,
      body_he: article.body_he,
    });
    setEditTab(locale === "zh" ? "zh" : locale === "he" ? "he" : "en");
    setEditing(true);
    setSubmitted(false);
  }

  async function submitEdit() {
    if (!article || submitting) return;
    setSubmitting(true);

    const { error } = await supabase.from("article_edits").insert({
      article_id: article.id,
      editor_name: editorName.trim() || "Anonymous",
      title_en: editData.title_en,
      title_zh: editData.title_zh,
      title_he: editData.title_he,
      body_en: editData.body_en,
      body_zh: editData.body_zh,
      body_he: editData.body_he,
    });

    setSubmitting(false);
    if (!error) {
      setEditing(false);
      setSubmitted(true);
    }
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-[var(--color-text-light)]">
        <Link href="/" className="hover:text-[var(--color-text)] transition-colors">
          Home
        </Link>
        <span className="mx-1.5 text-[var(--color-border)]">/</span>
        <Link
          href={`/${article.section}`}
          className="hover:text-[var(--color-text)] transition-colors"
        >
          {sectionLabel}
        </Link>
      </nav>

      {/* Article Header */}
      <header className="mb-10" dir={isRtl ? "rtl" : "ltr"}>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-0.5 bg-[var(--color-bg-alt)] rounded-full text-xs font-medium text-[var(--color-text-light)] border border-[var(--color-border)]">
            {sectionLabel}
          </span>
          {article.updated_at && (
            <span className="text-xs text-[var(--color-text-light)]">
              {new Date(article.updated_at).toLocaleDateString()}
            </span>
          )}
        </div>
        <h1 className="heading-display text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
          {title}
        </h1>
        <div className="h-0.5 w-16 bg-[var(--color-gold)] rounded-full" />
        {!editing && !submitted && (
          <button
            onClick={startEditing}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-sm text-[var(--color-text-light)] hover:text-[var(--color-text)] rounded-lg transition-colors border border-[var(--color-border)] hover:border-[var(--color-text-light)]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              Suggest Edit
            </button>
          )}
      </header>

      {articleImageMap[article.id] && (
        <ArticleHeroImage
          filename={articleImageMap[article.id]!.filename}
          alt={title}
        />
      )}

      {/* Submitted confirmation */}
      {submitted && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <div>
              <h3 className="font-semibold mb-1">Thank you for your suggestion!</h3>
              <p className="text-sm">
                Your edit has been submitted for review. An admin will review it and decide whether to accept or reject the changes.
              </p>
              <p className="text-sm mt-1">
                感谢您的修改建议！管理员将审核您的更改。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Inline Edit Form */}
      {editing && (
        <div className="bg-white border-2 border-[var(--color-gold)] rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[var(--color-primary)]">
              Suggest an Edit
            </h2>
            <button
              onClick={() => setEditing(false)}
              className="text-sm text-[var(--color-text-light)] hover:text-[var(--color-text)] px-3 py-1"
            >
              Cancel
            </button>
          </div>

          <p className="text-sm text-[var(--color-text-light)] mb-4">
            Make your changes below. Your edit will be submitted for admin review — it won&apos;t be published immediately.
          </p>

          {/* Editor name */}
          <input
            type="text"
            placeholder="Your name (optional) / 您的名字（可选）"
            value={editorName}
            onChange={(e) => setEditorName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mb-4 text-sm"
          />

          {/* Language tabs */}
          <div className="flex gap-1 bg-[var(--color-cream)] rounded-lg p-1 mb-4">
            {(["en", "zh", "he"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setEditTab(lang)}
                className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${
                  editTab === lang
                    ? "bg-white text-[var(--color-primary)] shadow-sm"
                    : "text-[var(--color-text-light)]"
                }`}
              >
                {lang === "en" ? "English" : lang === "zh" ? "中文" : "עברית"}
              </button>
            ))}
          </div>

          {/* Title */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={editData[`title_${editTab}`]}
              onChange={(e) =>
                setEditData({ ...editData, [`title_${editTab}`]: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg text-sm"
              dir={editTab === "he" ? "rtl" : "ltr"}
            />
          </div>

          {/* Body */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium">Body (Markdown)</label>
              <button
                type="button"
                onClick={() => setEditPreview(!editPreview)}
                className="text-xs px-3 py-1 rounded-full border hover:bg-gray-50 transition-colors"
              >
                {editPreview ? "Write" : "Preview"}
              </button>
            </div>

            {editPreview ? (
              <div
                className="w-full min-h-[300px] px-4 py-3 border rounded-lg text-sm bg-white prose prose-sm max-w-none prose-headings:text-[var(--color-primary)] prose-img:rounded-xl"
                dir={editTab === "he" ? "rtl" : "ltr"}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {editData[`body_${editTab}`] || "*No content yet*"}
                </ReactMarkdown>
              </div>
            ) : (
              <textarea
                value={editData[`body_${editTab}`]}
                onChange={(e) =>
                  setEditData({ ...editData, [`body_${editTab}`]: e.target.value })
                }
                rows={12}
                className="w-full px-4 py-2 border rounded-lg text-sm font-mono"
                dir={editTab === "he" ? "rtl" : "ltr"}
                placeholder="Write in Markdown..."
              />
            )}

            <div className="mt-2 text-xs text-[var(--color-text-light)] bg-[var(--color-bg-alt)] rounded-lg p-3">
              <span className="font-medium">Markdown:</span>{" "}
              <code className="bg-gray-200 px-1 rounded">## Heading</code>{" "}
              <code className="bg-gray-200 px-1 rounded">**bold**</code>{" "}
              <code className="bg-gray-200 px-1 rounded">*italic*</code>{" "}
              <code className="bg-gray-200 px-1 rounded">![alt](url)</code>{" "}
              <code className="bg-gray-200 px-1 rounded">[link](url)</code>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-2">
            <button
              onClick={submitEdit}
              disabled={submitting}
              className={`px-6 py-3 bg-[var(--color-gold)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? "Submitting..." : "Submit Suggestion"}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-6 py-3 bg-gray-200 rounded-lg text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Article Body */}
      {!editing && (
        <div
          className="prose prose-lg max-w-none text-[var(--color-text)] prose-headings:text-[var(--color-text)] prose-headings:font-bold prose-a:text-[var(--color-primary-light)] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-card prose-blockquote:border-[var(--color-gold)] prose-blockquote:text-[var(--color-text-light)] prose-strong:text-[var(--color-text)] prose-strong:font-semibold mb-12"
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
      )}

      {/* Feedback */}
      <div className="border-t border-[var(--color-border)] pt-8 mb-12">
        <ArticleFeedback
          sectionId={`article-${article.id}`}
          sectionTitle={title}
        />
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="bg-[var(--color-bg-alt)] rounded-xl p-6 mb-10 border border-[var(--color-border)]">
          <h3 className="text-sm font-medium text-[var(--color-text-light)] uppercase tracking-wider mb-4">
            More in {sectionLabel}
          </h3>
          <div className="space-y-1">
            {relatedArticles.map((related) => (
              <Link
                key={related.id}
                href={`/articles/${related.id}`}
                className="block px-4 py-2.5 rounded-lg text-sm text-[var(--color-text)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-colors"
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
          className="text-sm text-[var(--color-text-light)] hover:text-[var(--color-text)] transition-colors"
        >
          &larr; Back to {sectionLabel}
        </Link>
      </div>
    </div>
  );
}
