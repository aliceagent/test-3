# Claude Session Memory

## Git Workflow for This Repo

### Pushing to Main
- **Cannot push directly to `origin/main`** — returns 403.
- **Must use a PR workflow:**
  1. Create a clean branch from `origin/main`: `git checkout -b claude/branch-name origin/main`
  2. Make changes, commit
  3. Push branch: `git push -u origin claude/branch-name`
  4. Create PR: `gh pr create --title "..." --base main --head claude/branch-name --repo aliceagent/test-3 --body "..."`
  5. Merge PR: `gh pr merge <number> --repo aliceagent/test-3 --merge`
- **If PR has merge conflicts:** Don't try to rebase a branch with many old commits. Instead, create a fresh branch from `origin/main`, copy in just your changed files, and make a new clean PR.
- **Branch naming:** Must start with `claude/` and match the session pattern.

### Common Pitfalls
- `gh` CLI works for GitHub API but the local git proxy (`127.0.0.1:*`) is git-only — no REST API.
- Old feature branches may have unrelated commits that cause merge conflicts. Always branch from fresh `origin/main`.
- The `GH_HOST` env var approach doesn't work with the local proxy. Use `--repo aliceagent/test-3` flag instead.

## Project Structure Notes
- **Article list files**: `ARTICLES_100.md` through `ARTICLES_500.md` (100 articles each, 500 total planned)
- **Article format**: `**N. Title**\nDescription\n*Section: SectionName*`
- **Article data**: `src/data/articles.json` has 363 articles across 35 sections
- **Underrepresented sections** (as of 2026-03-23): mentorship (1), messiah (1), jewish-home (1), ashkenazi-sephardi (2), non-jewish-relations (2), community (3), antisemitism (4), passover-seder (5), chabad (5)

## Key Commands
- `npm run dev` — dev server
- `npm run build` — production build
- Admin password: torahlight2026
