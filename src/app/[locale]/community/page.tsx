"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

interface ForumPost {
  id: string;
  author: string;
  title: string;
  body: string;
  timestamp: string;
  replies: { author: string; body: string; timestamp: string }[];
}

function getStoredPosts(): ForumPost[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("torahlight-forum-posts");
  return stored ? JSON.parse(stored) : samplePosts;
}

const samplePosts: ForumPost[] = [
  {
    id: "1",
    author: "Sarah L.",
    title: "How do I start keeping Shabbat?",
    body: "I am new to Judaism and want to begin observing Shabbat. Where should I start? What are the most essential things to do first?",
    timestamp: "2026-03-14",
    replies: [
      {
        author: "Rabbi Chen",
        body: "Welcome! Start with lighting candles on Friday evening, and try to have a special meal. Don't try to do everything at once.",
        timestamp: "2026-03-14",
      },
    ],
  },
  {
    id: "2",
    author: "Wei Zhang",
    title: "Finding kosher food in China",
    body: "I live in Chengdu and it's hard to find kosher food. Any tips for maintaining kashrut in areas without Jewish communities?",
    timestamp: "2026-03-12",
    replies: [],
  },
  {
    id: "3",
    author: "David M.",
    title: "Best way to learn Hebrew?",
    body: "As a native Mandarin speaker, what approach works best for learning Hebrew? The alphabet seems manageable but grammar is challenging.",
    timestamp: "2026-03-10",
    replies: [
      {
        author: "Li Wei",
        body: "I found that learning through prayers was the most motivating approach. Start with the Shema and blessings.",
        timestamp: "2026-03-11",
      },
    ],
  },
];

export default function CommunityPage() {
  const t = useTranslations("community");
  const [posts, setPosts] = useState<ForumPost[]>(getStoredPosts);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState("");
  const [replyAuthor, setReplyAuthor] = useState("");

  function addPost() {
    if (!newTitle.trim() || !newBody.trim() || !newAuthor.trim()) return;
    const post: ForumPost = {
      id: Date.now().toString(),
      author: newAuthor,
      title: newTitle,
      body: newBody,
      timestamp: new Date().toISOString().split("T")[0],
      replies: [],
    };
    const updated = [post, ...posts];
    setPosts(updated);
    localStorage.setItem("torahlight-forum-posts", JSON.stringify(updated));
    setNewTitle("");
    setNewBody("");
    setShowForm(false);
  }

  function addReply(postId: string) {
    if (!replyBody.trim() || !replyAuthor.trim()) return;
    const updated = posts.map((p) =>
      p.id === postId
        ? {
            ...p,
            replies: [
              ...p.replies,
              {
                author: replyAuthor,
                body: replyBody,
                timestamp: new Date().toISOString().split("T")[0],
              },
            ],
          }
        : p
    );
    setPosts(updated);
    localStorage.setItem("torahlight-forum-posts", JSON.stringify(updated));
    setReplyingTo(null);
    setReplyBody("");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-3">
          {t("title")}
        </h1>
        <p className="text-lg text-[var(--color-text-light)]">{t("subtitle")}</p>
        <div className="h-1 w-20 bg-[var(--color-gold)] mt-4 rounded" />
      </div>

      {/* WhatsApp CTA */}
      <a
        href="https://chat.whatsapp.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-green-600 text-white rounded-xl p-6 mb-8 hover:bg-green-700 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl">💬</span>
          <div>
            <h3 className="text-xl font-bold">{t("whatsappGroup")}</h3>
            <p className="text-green-100 text-sm mt-1">
              Click here to join our active WhatsApp community
            </p>
          </div>
        </div>
      </a>

      {/* Community Guidelines */}
      <div className="bg-[var(--color-cream)] rounded-xl p-6 mb-8">
        <h2 className="font-semibold text-[var(--color-primary)] mb-2">
          {t("guidelines")}
        </h2>
        <ul className="text-sm text-[var(--color-text-light)] space-y-1 list-disc list-inside">
          <li>Be respectful and kind to all community members</li>
          <li>Questions about Judaism at any level are welcome</li>
          <li>Share your experiences and insights</li>
          <li>No proselytizing for other religions</li>
          <li>Posts can be in English, Chinese, or Hebrew</li>
        </ul>
      </div>

      {/* Post button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-light)] transition-colors font-medium"
      >
        {t("postQuestion")}
      </button>

      {/* New post form */}
      {showForm && (
        <div className="bg-white border rounded-xl p-6 mb-8 shadow-sm">
          <input
            type="text"
            placeholder="Your name / 您的名字"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mb-3 text-sm"
          />
          <input
            type="text"
            placeholder="Question title / 问题标题"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mb-3 text-sm"
          />
          <textarea
            placeholder="Your question or discussion topic / 您的问题或讨论话题"
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg mb-3 text-sm"
          />
          <div className="flex gap-2">
            <button
              onClick={addPost}
              className="px-4 py-2 bg-[var(--color-gold)] text-white rounded-lg text-sm font-medium hover:opacity-90"
            >
              Post / 发布
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
            >
              Cancel / 取消
            </button>
          </div>
        </div>
      )}

      {/* Forum Posts */}
      <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">
        {t("recentDiscussions")}
      </h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-[var(--color-primary)]">
                  {post.title}
                </h3>
                <p className="text-xs text-[var(--color-text-light)]">
                  {post.author} · {post.timestamp}
                </p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text)] mb-4">{post.body}</p>

            {/* Replies */}
            {post.replies.length > 0 && (
              <div className="border-l-2 border-[var(--color-gold)] pl-4 space-y-3 mb-4">
                {post.replies.map((reply, i) => (
                  <div key={i} className="bg-[var(--color-cream)] rounded-lg p-3">
                    <p className="text-xs text-[var(--color-text-light)] mb-1">
                      {reply.author} · {reply.timestamp}
                    </p>
                    <p className="text-sm">{reply.body}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply form */}
            {replyingTo === post.id ? (
              <div className="bg-[var(--color-bg-alt)] rounded-lg p-4">
                <input
                  type="text"
                  placeholder="Your name / 您的名字"
                  value={replyAuthor}
                  onChange={(e) => setReplyAuthor(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg mb-2 text-sm"
                />
                <textarea
                  placeholder="Your reply / 您的回复"
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-lg mb-2 text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => addReply(post.id)}
                    className="px-3 py-1.5 bg-[var(--color-gold)] text-white rounded text-xs font-medium"
                  >
                    Reply / 回复
                  </button>
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="px-3 py-1.5 bg-gray-200 rounded text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setReplyingTo(post.id)}
                className="text-sm text-[var(--color-primary-light)] hover:text-[var(--color-primary)]"
              >
                Reply / 回复
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
