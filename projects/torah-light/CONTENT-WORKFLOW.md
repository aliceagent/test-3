# Torah Light Content Workflow

**Created**: 2026-03-18
**Purpose**: Manage content independently from app development

---

## Branch Strategy

```
main (Claude Code owns)
├── App code (Next.js, React, Supabase)
├── Deploys to Vercel
└── DO NOT PUSH DIRECTLY

claude/mandarin-jewish-learning-* (Claude Code working branches)
├── Feature development
└── Merges to main when ready

content/articles (Alice owns)
├── All article markdown files
├── Safe to push anytime
└── Merged to main by Claude Code when needed
```

## My Rules (Alice/Content Agent)

### ✅ DO
- Push all content to `content/articles` branch
- Organize files by section: `articles/{section}/{id}-{slug}/`
- Include all 4 files per article: `article-en.md`, `article-zh.md`, `article-he.md`, `metadata.json`
- Commit frequently with clear messages
- Tag milestones (e.g., `content-v1.0-100-articles`)

### ❌ DO NOT
- Push directly to `main`
- Push directly to any `claude/*` branch
- Touch app files (package.json, src/, etc.)
- Run `git push origin main`

---

## Directory Structure for Content

All articles go into a flat structure by section:

```
articles/
├── weekly-parsha/
│   ├── 101-noach-flood-second-chances/
│   │   ├── article-en.md
│   │   ├── article-zh.md
│   │   ├── article-he.md
│   │   └── metadata.json
│   └── 102-lech-lecha-leaving-homeland/
├── prayer/
├── blessings/
├── holidays/
├── conversion/
├── mussar/
├── pirkei-avot/
├── israel/
├── jewish-calendar/
├── jewish-texts/
├── life-cycle/
├── shabbat/
└── ...
```

---

## Workflow: Adding New Articles

### 1. Ensure on content branch
```bash
git checkout content/articles
git pull origin content/articles
```

### 2. Workers write files
- Workers write to `articles/{section}/{id}-{slug}/`
- Workers do NOT run git commands

### 3. Main session commits
```bash
git add articles/
git commit -m "Add articles 111-115: Weekly Parsha (Bamidbar through Devarim)"
git push origin content/articles
```

### 4. Notify Claude Code (optional)
When a batch is ready for integration, post in the project thread:
> "Content batch ready: Articles 101-120 pushed to `content/articles` branch"

Claude Code can then merge when appropriate.

---

## Workflow: Editing Existing Articles

Same process — all edits go to `content/articles` branch:

```bash
git checkout content/articles
# Make edits
git add articles/
git commit -m "Fix: Update bibliography URLs for articles 101-105"
git push origin content/articles
```

---

## Integration with App

Claude Code is responsible for:
1. Merging `content/articles` into main when ready
2. Ensuring the app reads from the correct article paths
3. Handling any path/structure changes in the app

I am responsible for:
1. Keeping content organized and QA-verified
2. Not breaking the app by pushing to wrong branches
3. Communicating when batches are ready

---

## Recovery if I Accidentally Push to Main

If I ever push to main by mistake:

1. **STOP** — don't push more
2. **Alert J and Claude Code** immediately
3. Claude Code can:
   - `git revert` the bad commits, OR
   - `git reset --hard` to a known good commit and force push

---

## Current State

| Branch | Owner | Purpose | Status |
|--------|-------|---------|--------|
| `main` | Claude Code | App deployment | Has old article content (needs cleanup) |
| `claude/mandarin-jewish-learning-KnR7E` | Claude Code | App development | Active |
| `torah-light-articles` | Alice | Legacy content branch | 100 articles complete |
| `content/articles` | Alice | NEW content branch | To be created |

---

## Action Items

1. [x] Document this workflow
2. [ ] Create `content/articles` branch from clean state
3. [ ] Move existing articles to proper structure
4. [ ] Update worker instructions to use new paths
5. [ ] Resume article production (111-200)

---

## Communication Protocol

**When to notify Claude Code:**
- After completing a batch of 20+ articles
- When changing article structure/schema
- If any issues with integration

**How to notify:**
- Post in the project Telegram thread
- Tag the specific batch and branch

---

*This workflow ensures content and app development can proceed in parallel without conflicts.*
