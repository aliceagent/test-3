# Torah Light — Mandarin Orthodox Jewish Learning Platform

## Project Overview
A bilingual (English/Chinese/Hebrew) Orthodox Jewish educational website built with Next.js 15, Tailwind CSS, and Supabase. The site teaches Torah, Jewish law, holidays, and traditions to Mandarin-speaking learners.

## Tech Stack
- **Framework**: Next.js 15 (App Router) with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables
- **Database**: Supabase (PostgreSQL)
- **i18n**: next-intl with 3 locales: `en`, `zh`, `he`
- **Deployment**: Vercel
- **Markdown**: react-markdown + remark-gfm for article content

## Supabase Config
- **Project ID**: wzlltffbbpdalaauibpy
- **MCP Server**: Configured in `.claude/settings.local.json` — allows direct SQL access
- **Client**: `src/lib/supabase.ts` (uses anon key, public client)

## Database Tables
1. **articles** — Main content (section, title/body in en/zh/he)
2. **article_votes** — Aggregate thumbs up/down per section
3. **user_votes** — Individual votes by fingerprint (anonymous)
4. **forum_posts** — Community forum posts
5. **forum_replies** — Replies to forum posts
6. **mentorship_requests** — Mentor/mentee signup
7. **article_edits** — Community edit suggestions (pending/accepted/rejected) with admin review

## Key Features
- **30+ content sections**: torah-study, holidays, shabbat, kosher-food, jewish-texts, etc.
- **Admin panel** (`/admin`): Password-protected (torahlight2026), manage articles, import/export JSON
- **Community edit suggestions**: Users can suggest edits on any article → admin reviews with line-by-line diff → accept/reject
- **Forum**: Community discussion board with categories
- **Mentorship**: Mentor/mentee matching system
- **Voting**: Anonymous thumbs up/down on article sections
- **RTL support**: Hebrew content renders right-to-left

## Project Structure
```
src/
  app/[locale]/           # Locale-based routing (en, zh, he)
    admin/page.tsx         # Admin dashboard with articles + pending edits tabs
    articles/[id]/page.tsx # Article view with "Suggest Edit" button
    forum/page.tsx         # Community forum
    mentorship/page.tsx    # Mentorship program
  components/              # Shared components (Navbar, Footer, ArticleFeedback, etc.)
  i18n/                    # Internationalization config
  lib/
    supabase.ts            # Supabase client
    diff.ts                # Line-by-line diff utility for edit review
  messages/                # Translation files (en.json, zh.json, he.json)
supabase/
  schema.sql               # Full database schema (run in Supabase SQL Editor)
```

## Admin Panel Features
- **Articles tab**: CRUD articles, filter by section, language tabs (EN/中文/עברית), markdown preview, import/export JSON
- **Pending Edits tab**: Review community edit suggestions with red/green diff view, accept (applies changes) or reject

## Development
```bash
npm run dev     # Start dev server
npm run build   # Production build
```

## Owner
Jonathan Caras (@jonathancaras)
