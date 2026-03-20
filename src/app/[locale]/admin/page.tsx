"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "@/lib/supabase";
import { diffLines, hasChanges } from "@/lib/diff";

interface Article {
  id?: number;
  section: string;
  title_en: string;
  title_zh: string;
  title_he: string;
  body_en: string;
  body_zh: string;
  body_he: string;
  created_at?: string;
  updated_at?: string;
}

interface ArticleEdit {
  id: number;
  article_id: number;
  editor_name: string;
  title_en: string;
  title_zh: string;
  title_he: string;
  body_en: string;
  body_zh: string;
  body_he: string;
  status: string;
  created_at: string;
  reviewed_at: string | null;
  articles?: Article;
}

const SECTIONS = [
  "torah-study",
  "holidays",
  "shabbat",
  "kosher-food",
  "clothing-modesty",
  "jewish-texts",
  "thirteen-principles",
  "ten-commandments",
  "five-megillot",
  "philosophy",
  "prayer",
  "jewish-history",
  "messiah",
  "chabad",
  "hebrew-learning",
  "matchmaking",
  "life-cycle",
  "family-purity",
  "money-laws",
  "antisemitism",
  "ashkenazi-sephardi",
  "jews-in-asia",
  "tabernacle",
  "non-jewish-relations",
  "weekly-parsha",
  "blessings",
  "mitzvah-objects",
  "conversion",
  "pirkei-avot",
  "israel",
  "mussar",
  "jewish-calendar",
  "jewish-philosophy-big-questions",
  "practical-halacha-for-daily-life",
  "money-business",
  "jewish-values",
  "jewish-stories-and-inspiration",
  "jews-in-asia-expanded",
  "jewish-home",
];

const ADMIN_PASSWORD = "torahlight2026";

export default function AdminPage() {
  const t = useTranslations("admin");
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Article | null>(null);
  const [filterSection, setFilterSection] = useState("all");
  const [showSaved, setShowSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"en" | "zh" | "he">("en");
  const [showPreview, setShowPreview] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Pending edits state
  const [adminView, setAdminView] = useState<"articles" | "edits">("articles");
  const [pendingEdits, setPendingEdits] = useState<ArticleEdit[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [reviewingEdit, setReviewingEdit] = useState<ArticleEdit | null>(null);
  const [reviewDiffLang, setReviewDiffLang] = useState<"en" | "zh" | "he">("en");
  const [processingEdit, setProcessingEdit] = useState(false);

  // Fetch articles
  useEffect(() => {
    if (!authenticated) return;
    let cancelled = false;
    const load = async () => {
      const { data } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });
      if (!cancelled) {
        if (data) setArticles(data);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [authenticated, refreshKey]);

  // Fetch pending edits + count
  useEffect(() => {
    if (!authenticated) return;
    let cancelled = false;
    const load = async () => {
      const { data, count } = await supabase
        .from("article_edits")
        .select("*, articles(*)", { count: "exact" })
        .eq("status", "pending")
        .order("created_at", { ascending: false });
      if (!cancelled) {
        if (data) setPendingEdits(data as ArticleEdit[]);
        if (count !== null) setPendingCount(count);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [authenticated, refreshKey]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  }

  function createNewArticle() {
    const article: Article = {
      section: SECTIONS[0],
      title_en: "",
      title_zh: "",
      title_he: "",
      body_en: "",
      body_zh: "",
      body_he: "",
    };
    setEditing(article);
  }

  async function saveArticle() {
    if (!editing) return;

    if (editing.id) {
      await supabase
        .from("articles")
        .update({
          section: editing.section,
          title_en: editing.title_en,
          title_zh: editing.title_zh,
          title_he: editing.title_he,
          body_en: editing.body_en,
          body_zh: editing.body_zh,
          body_he: editing.body_he,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editing.id);
    } else {
      await supabase.from("articles").insert({
        section: editing.section,
        title_en: editing.title_en,
        title_zh: editing.title_zh,
        title_he: editing.title_he,
        body_en: editing.body_en,
        body_zh: editing.body_zh,
        body_he: editing.body_he,
      });
    }

    setEditing(null);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
    setRefreshKey((k) => k + 1);
  }

  async function deleteArticle(id: number) {
    if (!confirm(t("confirmDelete"))) return;
    await supabase.from("articles").delete().eq("id", id);
    setRefreshKey((k) => k + 1);
  }

  async function exportArticles() {
    const blob = new Blob([JSON.stringify(articles, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "torahlight-articles.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importArticles(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const imported = JSON.parse(ev.target?.result as string);
        if (Array.isArray(imported)) {
          const toInsert = imported.map((a: Article) => ({
            section: a.section,
            title_en: a.title_en || "",
            title_zh: a.title_zh || "",
            title_he: a.title_he || "",
            body_en: a.body_en || "",
            body_zh: a.body_zh || "",
            body_he: a.body_he || "",
          }));
          await supabase.from("articles").insert(toInsert);
          alert(`Imported ${imported.length} articles`);
          setRefreshKey((k) => k + 1);
        }
      } catch {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  }

  async function acceptEdit(edit: ArticleEdit) {
    if (processingEdit) return;
    setProcessingEdit(true);

    // Update the article with suggested content
    await supabase
      .from("articles")
      .update({
        title_en: edit.title_en,
        title_zh: edit.title_zh,
        title_he: edit.title_he,
        body_en: edit.body_en,
        body_zh: edit.body_zh,
        body_he: edit.body_he,
        updated_at: new Date().toISOString(),
      })
      .eq("id", edit.article_id);

    // Mark edit as accepted
    await supabase
      .from("article_edits")
      .update({
        status: "accepted",
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", edit.id);

    setProcessingEdit(false);
    setReviewingEdit(null);
    setRefreshKey((k) => k + 1);
  }

  async function rejectEdit(edit: ArticleEdit) {
    if (processingEdit) return;
    setProcessingEdit(true);

    await supabase
      .from("article_edits")
      .update({
        status: "rejected",
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", edit.id);

    setProcessingEdit(false);
    setReviewingEdit(null);
    setRefreshKey((k) => k + 1);
  }

  const filteredArticles =
    filterSection === "all"
      ? articles
      : articles.filter((a) => a.section === filterSection);

  // --- Login screen ---
  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-white border rounded-xl p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-2 text-center">
            {t("title")}
          </h1>
          <p className="text-sm text-[var(--color-text-light)] mb-6 text-center">
            {t("loginPrompt")}
          </p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("password")}
              className="w-full px-4 py-3 border rounded-lg mb-4"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-3 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-light)] transition-colors"
            >
              {t("login")}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Article editing screen ---
  if (editing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[var(--color-primary)]">
            {editing.id ? t("editContent") : t("addArticle")}
          </h1>
          <button
            onClick={() => setEditing(null)}
            className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
          >
            {t("cancel")}
          </button>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              {t("section")}
            </label>
            <select
              value={editing.section}
              onChange={(e) =>
                setEditing({ ...editing, section: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg text-sm"
            >
              {SECTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-1 bg-[var(--color-cream)] rounded-lg p-1">
            {(["en", "zh", "he"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveTab(lang)}
                className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${
                  activeTab === lang
                    ? "bg-white text-[var(--color-primary)] shadow-sm"
                    : "text-[var(--color-text-light)]"
                }`}
              >
                {lang === "en" ? "English" : lang === "zh" ? "中文" : "עברית"}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t("articleTitle")} (
              {activeTab === "en" ? "English" : activeTab === "zh" ? "中文" : "עברית"})
            </label>
            <input
              type="text"
              value={editing[`title_${activeTab}` as keyof Article] as string}
              onChange={(e) =>
                setEditing({ ...editing, [`title_${activeTab}`]: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg text-sm"
              dir={activeTab === "he" ? "rtl" : "ltr"}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium">
                {t("articleBody")} (
                {activeTab === "en" ? "English" : activeTab === "zh" ? "中文" : "עברית"})
              </label>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="text-xs px-3 py-1 rounded-full border hover:bg-gray-50 transition-colors"
              >
                {showPreview ? "Write" : "Preview"}
              </button>
            </div>

            {showPreview ? (
              <div
                className="w-full min-h-[360px] px-4 py-3 border rounded-lg text-sm bg-white prose prose-sm max-w-none prose-headings:text-[var(--color-primary)] prose-img:rounded-xl prose-blockquote:border-[var(--color-gold)]"
                dir={activeTab === "he" ? "rtl" : "ltr"}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {(editing[`body_${activeTab}` as keyof Article] as string) || "*No content yet*"}
                </ReactMarkdown>
              </div>
            ) : (
              <textarea
                value={editing[`body_${activeTab}` as keyof Article] as string}
                onChange={(e) =>
                  setEditing({ ...editing, [`body_${activeTab}`]: e.target.value })
                }
                rows={15}
                className="w-full px-4 py-2 border rounded-lg text-sm font-mono"
                dir={activeTab === "he" ? "rtl" : "ltr"}
                placeholder="Write in Markdown. Examples:&#10;## Heading&#10;**bold** *italic*&#10;- bullet list&#10;![alt text](https://example.com/image.jpg)&#10;[link text](https://example.com)&#10;> blockquote"
              />
            )}

            <div className="mt-2 text-xs text-[var(--color-text-light)] bg-[var(--color-bg-alt)] rounded-lg p-3">
              <span className="font-medium">Markdown supported:</span>{" "}
              <code className="bg-gray-200 px-1 rounded">## Heading</code>{" "}
              <code className="bg-gray-200 px-1 rounded">**bold**</code>{" "}
              <code className="bg-gray-200 px-1 rounded">*italic*</code>{" "}
              <code className="bg-gray-200 px-1 rounded">![alt](url)</code>{" "}
              <code className="bg-gray-200 px-1 rounded">[link](url)</code>{" "}
              <code className="bg-gray-200 px-1 rounded">- list</code>{" "}
              <code className="bg-gray-200 px-1 rounded">&gt; quote</code>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={saveArticle}
              className="px-6 py-3 bg-[var(--color-gold)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              {t("save")}
            </button>
            <button
              onClick={() => setEditing(null)}
              className="px-6 py-3 bg-gray-200 rounded-lg text-sm"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Review a single edit ---
  if (reviewingEdit) {
    const original = reviewingEdit.articles as Article | undefined;
    const langLabel =
      reviewDiffLang === "en" ? "English" : reviewDiffLang === "zh" ? "中文" : "עברית";

    const origTitle = original?.[`title_${reviewDiffLang}` as keyof Article] as string || "";
    const editTitle = reviewingEdit[`title_${reviewDiffLang}` as keyof ArticleEdit] as string || "";
    const origBody = original?.[`body_${reviewDiffLang}` as keyof Article] as string || "";
    const editBody = reviewingEdit[`body_${reviewDiffLang}` as keyof ArticleEdit] as string || "";

    const titleDiff = diffLines(origTitle, editTitle);
    const bodyDiff = diffLines(origBody, editBody);
    const titleChanged = hasChanges(origTitle, editTitle);
    const bodyChanged = hasChanges(origBody, editBody);

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-primary)]">
              Review Edit Suggestion
            </h1>
            <p className="text-sm text-[var(--color-text-light)] mt-1">
              Submitted by <span className="font-medium">{reviewingEdit.editor_name}</span> on{" "}
              {new Date(reviewingEdit.created_at).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => setReviewingEdit(null)}
            className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
          >
            Back
          </button>
        </div>

        {/* Language tabs for diff */}
        <div className="flex gap-1 bg-[var(--color-cream)] rounded-lg p-1 mb-6 max-w-xs">
          {(["en", "zh", "he"] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setReviewDiffLang(lang)}
              className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${
                reviewDiffLang === lang
                  ? "bg-white text-[var(--color-primary)] shadow-sm"
                  : "text-[var(--color-text-light)]"
              }`}
            >
              {lang === "en" ? "EN" : lang === "zh" ? "中文" : "עב"}
            </button>
          ))}
        </div>

        {/* Title diff */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[var(--color-primary)] mb-2">
            Title ({langLabel})
            {!titleChanged && (
              <span className="ml-2 text-xs font-normal text-[var(--color-text-light)]">
                No changes
              </span>
            )}
          </h3>
          {titleChanged ? (
            <div className="bg-white border rounded-lg p-4 font-mono text-sm space-y-1">
              {titleDiff.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.type === "removed"
                      ? "bg-red-50 text-red-800 px-2 py-0.5 rounded"
                      : line.type === "added"
                      ? "bg-green-50 text-green-800 px-2 py-0.5 rounded"
                      : "px-2 py-0.5"
                  }
                >
                  <span className="select-none mr-2 text-gray-400">
                    {line.type === "removed" ? "-" : line.type === "added" ? "+" : " "}
                  </span>
                  {line.text}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[var(--color-bg-alt)] rounded-lg p-3 text-sm text-[var(--color-text-light)]">
              {origTitle || "(empty)"}
            </div>
          )}
        </div>

        {/* Body diff */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[var(--color-primary)] mb-2">
            Body ({langLabel})
            {!bodyChanged && (
              <span className="ml-2 text-xs font-normal text-[var(--color-text-light)]">
                No changes
              </span>
            )}
          </h3>
          {bodyChanged ? (
            <div className="bg-white border rounded-lg p-4 font-mono text-sm space-y-0.5 max-h-[600px] overflow-y-auto">
              {bodyDiff.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.type === "removed"
                      ? "bg-red-50 text-red-800 px-2 py-0.5 rounded"
                      : line.type === "added"
                      ? "bg-green-50 text-green-800 px-2 py-0.5 rounded"
                      : "px-2 py-0.5"
                  }
                >
                  <span className="select-none mr-2 text-gray-400">
                    {line.type === "removed" ? "-" : line.type === "added" ? "+" : " "}
                  </span>
                  {line.text || "\u00A0"}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[var(--color-bg-alt)] rounded-lg p-3 text-sm text-[var(--color-text-light)] max-h-[200px] overflow-y-auto">
              <pre className="whitespace-pre-wrap">{origBody || "(empty)"}</pre>
            </div>
          )}
        </div>

        {/* Accept / Reject */}
        <div className="flex gap-3 pt-4 border-t">
          <button
            onClick={() => acceptEdit(reviewingEdit)}
            disabled={processingEdit}
            className={`px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors ${
              processingEdit ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Accept &amp; Apply Changes
          </button>
          <button
            onClick={() => rejectEdit(reviewingEdit)}
            disabled={processingEdit}
            className={`px-6 py-3 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors ${
              processingEdit ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Reject
          </button>
          <button
            onClick={() => setReviewingEdit(null)}
            className="px-6 py-3 bg-gray-200 rounded-lg text-sm"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  // --- Main dashboard ---
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-primary)]">
          {t("dashboard")}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={createNewArticle}
            className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--color-primary-light)] transition-colors"
          >
            + {t("addArticle")}
          </button>
          <button
            onClick={exportArticles}
            className="px-4 py-2 bg-[var(--color-gold)] text-white rounded-lg text-sm font-medium hover:opacity-90"
          >
            Export JSON
          </button>
          <label className="px-4 py-2 bg-gray-200 rounded-lg text-sm cursor-pointer hover:bg-gray-300 transition-colors">
            Import JSON
            <input
              type="file"
              accept=".json"
              onChange={importArticles}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {showSaved && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-3 mb-4 text-sm">
          {t("saved")}
        </div>
      )}

      {/* Tab bar: Articles / Pending Edits */}
      <div className="flex gap-1 bg-[var(--color-cream)] rounded-lg p-1 mb-6">
        <button
          onClick={() => setAdminView("articles")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            adminView === "articles"
              ? "bg-white text-[var(--color-primary)] shadow-sm"
              : "text-[var(--color-text-light)] hover:text-[var(--color-text)]"
          }`}
        >
          Articles ({articles.length})
        </button>
        <button
          onClick={() => setAdminView("edits")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors relative ${
            adminView === "edits"
              ? "bg-white text-[var(--color-primary)] shadow-sm"
              : "text-[var(--color-text-light)] hover:text-[var(--color-text)]"
          }`}
        >
          Pending Edits
          {pendingCount > 0 && (
            <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
              {pendingCount}
            </span>
          )}
        </button>
      </div>

      {/* ===== Articles Tab ===== */}
      {adminView === "articles" && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[var(--color-cream)] rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-[var(--color-primary)]">
                {articles.length}
              </div>
              <div className="text-sm text-[var(--color-text-light)]">Total Articles</div>
            </div>
            <div className="bg-[var(--color-cream)] rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-[var(--color-primary)]">
                {SECTIONS.length}
              </div>
              <div className="text-sm text-[var(--color-text-light)]">Sections</div>
            </div>
            <div className="bg-[var(--color-cream)] rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-[var(--color-primary)]">3</div>
              <div className="text-sm text-[var(--color-text-light)]">Languages</div>
            </div>
            <div className="bg-[var(--color-cream)] rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-[var(--color-primary)]">
                {new Set(articles.map((a) => a.section)).size}
              </div>
              <div className="text-sm text-[var(--color-text-light)]">Sections with Content</div>
            </div>
          </div>

          {/* Filter */}
          <div className="mb-4">
            <select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
              className="px-4 py-2 border rounded-lg text-sm"
            >
              <option value="all">All Sections</option>
              {SECTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Articles list */}
          {filteredArticles.length === 0 ? (
            <div className="bg-[var(--color-bg-alt)] rounded-xl p-12 text-center">
              <p className="text-[var(--color-text-light)] mb-4">
                No articles yet. Click &quot;Add New Article&quot; to create your first piece of content.
              </p>
              <p className="text-[var(--color-text-light)] text-sm">
                还没有文章。点击&ldquo;添加新文章&rdquo;创建您的第一篇内容。
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white border rounded-xl p-4 shadow-sm flex items-center justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-[var(--color-cream)] rounded text-xs text-[var(--color-text-light)]">
                        {article.section}
                      </span>
                      {article.updated_at && (
                        <span className="text-xs text-[var(--color-text-light)]">
                          {new Date(article.updated_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium truncate">
                      {article.title_en || article.title_zh || article.title_he || "(Untitled)"}
                    </h3>
                    {article.title_zh && (
                      <p className="text-sm text-[var(--color-text-light)] truncate">
                        {article.title_zh}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => setEditing(article)}
                      className="px-3 py-1.5 bg-[var(--color-primary)] text-white rounded text-xs hover:bg-[var(--color-primary-light)]"
                    >
                      {t("editContent")}
                    </button>
                    <button
                      onClick={() => deleteArticle(article.id!)}
                      className="px-3 py-1.5 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200"
                    >
                      {t("delete")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ===== Pending Edits Tab ===== */}
      {adminView === "edits" && (
        <>
          {pendingEdits.length === 0 ? (
            <div className="bg-[var(--color-bg-alt)] rounded-xl p-12 text-center">
              <svg className="w-12 h-12 mx-auto mb-3 text-[var(--color-text-light)] opacity-30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <p className="text-[var(--color-text-light)] font-medium">
                No pending edit suggestions
              </p>
              <p className="text-[var(--color-text-light)] text-sm mt-1">
                When visitors suggest edits to articles, they will appear here for your review.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingEdits.map((edit) => {
                const originalArticle = edit.articles as Article | undefined;
                const articleTitle =
                  originalArticle?.title_en ||
                  originalArticle?.title_zh ||
                  `Article #${edit.article_id}`;

                return (
                  <div
                    key={edit.id}
                    className="bg-white border border-amber-200 rounded-xl p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-medium">
                            Pending Review
                          </span>
                          <span className="text-xs text-[var(--color-text-light)]">
                            {new Date(edit.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="font-medium text-[var(--color-primary)]">
                          Edit suggested for: {articleTitle}
                        </h3>
                        <p className="text-sm text-[var(--color-text-light)] mt-1">
                          By <span className="font-medium">{edit.editor_name}</span>
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => {
                            setReviewingEdit(edit);
                            setReviewDiffLang("en");
                          }}
                          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-xs font-medium hover:bg-[var(--color-primary-light)] transition-colors"
                        >
                          Review Diff
                        </button>
                        <button
                          onClick={() => acceptEdit(edit)}
                          className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => rejectEdit(edit)}
                          className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
