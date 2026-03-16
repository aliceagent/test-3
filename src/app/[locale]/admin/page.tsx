"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

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
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

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
      // Update existing
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
      // Insert new
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
          // Insert all imported articles
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

  const filteredArticles =
    filterSection === "all"
      ? articles
      : articles.filter((a) => a.section === filterSection);

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

          {/* Language tabs */}
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
              {activeTab === "en"
                ? "English"
                : activeTab === "zh"
                ? "中文"
                : "עברית"}
              )
            </label>
            <input
              type="text"
              value={
                editing[`title_${activeTab}` as keyof Article] as string
              }
              onChange={(e) =>
                setEditing({
                  ...editing,
                  [`title_${activeTab}`]: e.target.value,
                })
              }
              className="w-full px-4 py-2 border rounded-lg text-sm"
              dir={activeTab === "he" ? "rtl" : "ltr"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t("articleBody")} (
              {activeTab === "en"
                ? "English"
                : activeTab === "zh"
                ? "中文"
                : "עברית"}
              )
            </label>
            <textarea
              value={
                editing[`body_${activeTab}` as keyof Article] as string
              }
              onChange={(e) =>
                setEditing({
                  ...editing,
                  [`body_${activeTab}`]: e.target.value,
                })
              }
              rows={15}
              className="w-full px-4 py-2 border rounded-lg text-sm font-mono"
              dir={activeTab === "he" ? "rtl" : "ltr"}
              placeholder="You can use HTML or plain text. Supports <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em> tags."
            />
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

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[var(--color-cream)] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[var(--color-primary)]">
            {articles.length}
          </div>
          <div className="text-sm text-[var(--color-text-light)]">
            Total Articles
          </div>
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
          <div className="text-sm text-[var(--color-text-light)]">
            Sections with Content
          </div>
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
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Articles list */}
      {loading ? (
        <div className="bg-[var(--color-bg-alt)] rounded-xl p-12 text-center">
          <p className="text-[var(--color-text-light)]">Loading articles...</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="bg-[var(--color-bg-alt)] rounded-xl p-12 text-center">
          <p className="text-[var(--color-text-light)] mb-4">
            No articles yet. Click &quot;Add New Article&quot; to create your
            first piece of content.
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
    </div>
  );
}
