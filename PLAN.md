# Plan: Community Article Edit Suggestions with Admin Review

## Overview

Anyone visiting an article can click "Edit" to propose changes. Their edits are saved as a **pending suggestion** (not applied directly). Admins see a notification badge in the admin panel with a queue of suggestions they can preview as a diff and accept or reject.

---

## New Database Table

Add one new table: `article_edits`

| Column | Type | Description |
|--------|------|-------------|
| `id` | bigint (auto) | Primary key |
| `article_id` | bigint (FK → articles) | Which article is being edited |
| `editor_name` | text | Name of the person suggesting the edit |
| `title_en` | text | Suggested English title |
| `title_zh` | text | Suggested Chinese title |
| `title_he` | text | Suggested Hebrew title |
| `body_en` | text | Suggested English body (markdown) |
| `body_zh` | text | Suggested Chinese body (markdown) |
| `body_he` | text | Suggested Hebrew body (markdown) |
| `status` | text | `'pending'` / `'accepted'` / `'rejected'` |
| `created_at` | timestamptz | When submitted |
| `reviewed_at` | timestamptz | When admin acted on it (nullable) |

RLS: anyone can insert (submit suggestions) and read; updates restricted to status changes.

---

## Changes

### 1. Article Page (`/articles/[id]`) — Add "Suggest Edit" button

- Add an "Edit" button at the top of every article page
- Clicking it opens an **inline editor** below the article (or replaces the article view) with:
  - The current article content pre-filled in editable fields
  - Language tabs (EN / 中文 / עברית) — same as admin editor
  - Markdown textarea with preview toggle
  - A "Your name" field so the suggestion is attributed
  - "Submit Suggestion" and "Cancel" buttons
- On submit: inserts a row into `article_edits` with status `'pending'` and shows a "Thank you" confirmation message
- No login required — fully open to visitors

### 2. Admin Panel — Add "Pending Edits" tab with notification badge

- Add a tab/section to the admin dashboard: **"Pending Edits"** with a count badge (e.g., "Pending Edits (3)")
- Lists all `article_edits` where `status = 'pending'`, newest first
- Each pending edit shows:
  - The article title it's for
  - Who submitted it and when
  - A **side-by-side diff view** comparing current article content vs. suggested content (for whichever languages were changed)
  - Two buttons: **Accept** and **Reject**

#### Accept flow:
1. Copy the suggested title/body fields into the `articles` table (overwrite the current article)
2. Set `article_edits.status = 'accepted'` and `reviewed_at = now()`

#### Reject flow:
1. Set `article_edits.status = 'rejected'` and `reviewed_at = now()`
2. No changes to the article

### 3. Simple text diff display

- For the admin review, show a basic visual diff:
  - Lines removed highlighted in red
  - Lines added highlighted in green
- Implement a lightweight line-by-line diff function (no external library needed — just split by newline and compare)

---

## Files to Create / Modify

| File | Action |
|------|--------|
| `supabase/schema.sql` | Add `article_edits` table + RLS policies |
| `src/app/[locale]/articles/[id]/page.tsx` | Add "Suggest Edit" button + inline editor form |
| `src/app/[locale]/admin/page.tsx` | Add "Pending Edits" tab with diff view, accept/reject buttons, notification badge |
| `src/lib/diff.ts` | New file — simple line diff utility for the admin review view |

---

## What this does NOT include

- Email/push notifications to admins (they check the panel manually)
- Edit history or versioning beyond accept/reject
- User accounts or authentication for editors
