"use client";

import { useState, useEffect, useCallback } from "react";

const REPORT_EMAIL = "Jonathancaras+chinesetorah@gmail.com";

interface ArticleFeedbackProps {
  sectionId: string;
  sectionTitle: string;
  pageUrl?: string;
}

function getVotes(sectionId: string): { up: number; down: number } {
  if (typeof window === "undefined") return { up: 0, down: 0 };
  const stored = localStorage.getItem(`tl-votes-${sectionId}`);
  return stored ? JSON.parse(stored) : { up: 0, down: 0 };
}

function saveVotes(sectionId: string, votes: { up: number; down: number }) {
  localStorage.setItem(`tl-votes-${sectionId}`, JSON.stringify(votes));
}

function getUserVote(sectionId: string): "up" | "down" | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(`tl-uservote-${sectionId}`) as
    | "up"
    | "down"
    | null;
}

function saveUserVote(sectionId: string, vote: "up" | "down" | null) {
  if (vote) {
    localStorage.setItem(`tl-uservote-${sectionId}`, vote);
  } else {
    localStorage.removeItem(`tl-uservote-${sectionId}`);
  }
}

export default function ArticleFeedback({
  sectionId,
  sectionTitle,
  pageUrl,
}: ArticleFeedbackProps) {
  const [votes, setVotes] = useState({ up: 0, down: 0 });
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    setVotes(getVotes(sectionId));
    setUserVote(getUserVote(sectionId));
  }, [sectionId]);

  const handleVote = useCallback(
    (direction: "up" | "down") => {
      const current = getVotes(sectionId);
      const currentUserVote = getUserVote(sectionId);

      const newVotes = { ...current };

      if (currentUserVote === direction) {
        // Undo vote
        newVotes[direction] = Math.max(0, newVotes[direction] - 1);
        saveUserVote(sectionId, null);
        setUserVote(null);
      } else {
        // Remove previous vote if switching
        if (currentUserVote) {
          newVotes[currentUserVote] = Math.max(
            0,
            newVotes[currentUserVote] - 1
          );
        }
        newVotes[direction] = newVotes[direction] + 1;
        saveUserVote(sectionId, direction);
        setUserVote(direction);
      }

      saveVotes(sectionId, newVotes);
      setVotes(newVotes);
    },
    [sectionId]
  );

  const handleReport = useCallback(() => {
    const currentUrl =
      pageUrl || (typeof window !== "undefined" ? window.location.href : "");

    const subject = encodeURIComponent(sectionTitle);
    const body = encodeURIComponent(
      `Article: ${sectionTitle}\n` +
        `Link: ${currentUrl}\n\n` +
        `---\n\n` +
        `This article needs to be reviewed for accuracy or generally updated.\n\n` +
        `יש לבדוק מאמר זה מחדש לדיוק או לעדכן אותו באופן כללי.\n\n` +
        `本文需要审核其准确性或进行更新。\n\n` +
        `---\n\n` +
        `Please describe the issue below / אנא תארו את הבעיה למטה / 请在下方描述问题:\n\n`
    );

    window.location.href = `mailto:${REPORT_EMAIL}?subject=${subject}&body=${body}`;
  }, [sectionTitle, pageUrl]);

  return (
    <div className="mt-4 flex items-center gap-3 flex-wrap">
      {/* Thumbs Up */}
      <button
        onClick={() => handleVote("up")}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors ${
          userVote === "up"
            ? "bg-green-100 text-green-700 border border-green-300"
            : "bg-[var(--color-bg-alt)] text-[var(--color-text-light)] hover:bg-green-50 hover:text-green-600 border border-transparent"
        }`}
        aria-label="Thumbs up"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
          />
        </svg>
        <span className="font-medium">{votes.up}</span>
      </button>

      {/* Thumbs Down */}
      <button
        onClick={() => handleVote("down")}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors ${
          userVote === "down"
            ? "bg-red-100 text-red-700 border border-red-300"
            : "bg-[var(--color-bg-alt)] text-[var(--color-text-light)] hover:bg-red-50 hover:text-red-600 border border-transparent"
        }`}
        aria-label="Thumbs down"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10zM17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"
          />
        </svg>
        <span className="font-medium">{votes.down}</span>
      </button>

      {/* Report / Alert Button */}
      <button
        onClick={handleReport}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-[var(--color-bg-alt)] text-[var(--color-text-light)] hover:bg-amber-50 hover:text-amber-600 transition-colors border border-transparent"
        aria-label="Report article"
        title="Report an issue with this article"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </button>
    </div>
  );
}
