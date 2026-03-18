# Torah Light: Lessons Learned from the First 100 Articles

**Created**: 2026-03-18
**Articles 1-100 completed**: 2026-03-17

---

## 🎯 Executive Summary

We produced 100 trilingual articles (EN/ZH/HE) about Orthodox Judaism for Mandarin speakers in approximately 3 days of active work. Key success factors: separation of concerns in the pipeline, strict QA criteria, and learning to work WITH the gateway's constraints rather than against them.

---

## 📐 Architecture That Worked

### The Golden Rule: Workers Write, Main Commits

```
┌─────────────────┐     ┌─────────────────┐
│  Main Session   │────▶│  Worker Agents  │
│  (Coordinator)  │     │  (Stateless)    │
│                 │     │                 │
│  • Spawns       │     │  • Write files  │
│  • Commits      │     │  • NO git ops   │
│  • Pushes       │     │  • Exit when    │
│  • QA checks    │     │    files done   │
└─────────────────┘     └─────────────────┘
```

**Why it works:**
- No git conflicts (only one entity touches git)
- No spawn limits (main session has unlimited children)
- Easy to monitor (one source of truth)
- Recovery is simple (just respawn workers)

### Worker Instructions Template
Give workers EXPLICIT constraints:
- ✅ Read source material
- ✅ Write 3-4 files to specific path
- ❌ NO git add/commit/push
- ❌ NO updating progress files
- Exit when files exist

---

## 🚫 Anti-Patterns to Avoid

### 1. Cron Sessions Spawning Workers
**Problem**: Cron sessions have a 5-child limit. We tried spawning 8 parallel workers.

**Result**: Silent failures. Progress.json showed "6 in progress" while 0 agents actually ran.

**Fix**: Cron should MONITOR and ALERT. Main session spawns.

### 2. Trusting progress.json as Ground Truth
**Problem**: We reported progress based on a JSON file that got stale.

**Result**: 2+ hours of "pipeline running" with zero actual progress.

**Fix**: Always verify with actual file counts:
```bash
find repo -name "article-en.md" | wc -l
```

### 3. Retry Loops on Gateway Timeout
**Problem**: When spawn failed, we immediately retried.

**Result**: Gateway overload, cascading failures.

**Fix**: On timeout → STOP → investigate → wait 30s → single test spawn.

### 4. Workers Doing Git Operations
**Problem**: Multiple agents running `git push` simultaneously.

**Result**: Merge conflicts, rejected pushes, lost work.

**Fix**: Workers write files ONLY. Main session commits in batches.

---

## ✅ QA Checklist (The Hard-Won List)

Every article must have:

### File Structure
```
{section}/{article-id}-{slug}/
├── article-en.md    # English version
├── article-zh.md    # Simplified Chinese (≥800 chars)
├── article-he.md    # Hebrew version
└── metadata.json    # Article metadata
```

### Content Requirements

| Check | Requirement | How to Verify |
|-------|-------------|---------------|
| Chinese length | ≥ 800 Chinese characters | `grep -oP '[\x{4e00}-\x{9fff}]' \| wc -l` |
| Header image | DALL-E prompt in first 50 lines | grep for "DALL-E", "山水", "brushstroke" |
| Dynasty refs | Chinese dynasty equivalents for dates | grep for 商朝, 周朝, 汉朝, etc. |
| Tags section | Hashtags in all 3 languages | Look for `## Tags` at end |
| Bibliography | Live URLs (200 status) | curl -sI each URL |
| metadata.json | Valid JSON with title, section, id | jq parse test |

### Common QA Failures
1. **Chinese too short** — Writers produced summaries instead of translations
2. **Missing Hebrew** — Often forgotten as third language
3. **Dead URLs** — Sites changed or went down during production
4. **No dynasty refs** — Easy to forget the Chinese historical context requirement

---

## 🔧 Useful Scripts

### Chinese Character Counter (Python)
```python
import re
def count_chinese(text):
    return len(re.findall(r'[\u4e00-\u9fff]', text))
```

### Batch QA Runner
```bash
for dir in repo/*/article-*; do
  en=$([ -f "$dir/article-en.md" ] && echo "✅" || echo "❌")
  zh=$([ -f "$dir/article-zh.md" ] && echo "✅" || echo "❌")
  he=$([ -f "$dir/article-he.md" ] && echo "✅" || echo "❌")
  echo "$dir: EN$en ZH$zh HE$he"
done
```

### URL Verifier
```bash
grep -oE 'https?://[^ ]+' article-en.md | while read url; do
  status=$(curl -sI "$url" | head -1 | grep -oE '[0-9]{3}')
  echo "$status $url"
done
```

---

## 🌐 Source Website Tips

### Cloudflare-Protected Sites (Aish, Chabad)
Normal `web_fetch` gets blocked. Use:
```bash
~/scrapling-env/bin/python3 scripts/scrapling_fetch.py "<url>"
```

### Sefaria API (Works Directly)
```bash
python3 scripts/torah_research_fetch.py sefaria "Genesis 22:1-10"
```

### Always Verify URLs Before Publishing
Sites go down, pages move. Every URL in bibliography must return 200:
```bash
python3 scripts/torah_research_fetch.py verify "<url>"
```

---

## 📊 Pipeline Monitoring

### What to Check Every 15 Minutes
1. **Actual agents running**: `subagents list`
2. **Actual file count**: `find repo -name "article-en.md" | wc -l`
3. **Last completion time**: Check git log
4. **Compare against progress.json**: If mismatch → investigate

### Stall Detection
If two consecutive progress reports show the same numbers:
- **This is a bug, not normal**
- Expected: 2-3 completions per 15 min cycle
- Zero progress = pipeline broken

### Recovery Steps
1. Check `subagents list` — how many actually running?
2. If 0 but work remains → spawn from main session
3. If gateway timeout → restart gateway, wait 30s
4. Don't retry blindly — understand what broke first

---

## 📝 Content Guidelines That Worked

### For Chinese Audiences
- **Dynasty mapping**: "During the Tang Dynasty (618-907 CE), Jewish communities..."
- **Cultural parallels**: Compare concepts to Confucian values when relevant
- **No assumptions**: Explain everything, even "basic" Jewish concepts
- **Romanization**: Include pinyin for key Hebrew terms

### Article Structure
```markdown
# Title (English)

> **Header Image Description (DALL-E prompt):** 
> Chinese brushstroke style...

## Introduction
Hook the reader with a relatable scenario

## Main Content
3-5 sections with clear headers

## Practical Application
How does this apply to daily life?

## Bibliography
- [Source Name](https://verified-url.com)

## Tags
#Torah #犹太教 #תורה
```

---

## 🔢 Numbers That Matter

| Metric | Target | Actual |
|--------|--------|--------|
| Total articles | 100 | 100 ✅ |
| Languages per article | 3 | 3 ✅ |
| Min Chinese chars | 800 | 2,000-8,000 avg |
| Parallel workers | 5 | 5 (optimal) |
| Articles/hour | 8-10 | ~10 |
| QA pass rate (final) | 100% | 100% ✅ |

---

## 🚀 Recommendations for Next 100

### 1. Pre-flight Checklist
Before starting batch:
- [ ] Source article list exists and is validated
- [ ] QA script tested and working
- [ ] Worker instructions clear and specific
- [ ] Main session ready (not in middle of other work)
- [ ] Git branch created and clean

### 2. Batch Strategy
- Run 5 parallel workers (sweet spot)
- Commit every 5-10 articles (not every 1)
- QA check after each batch of 10
- Fix issues immediately (don't accumulate debt)

### 3. Communication
- Post milestone updates to designated thread (not DMs)
- Report actual numbers, not progress.json numbers
- Escalate stalls immediately (don't wait for next cycle)

### 4. Article Numbering
Articles 101-200 continue sequential numbering.
**Same folder structure** — organized by topic, not batch:
```
repo/holidays/101-new-holiday/
repo/shabbat/102-new-shabbat-topic/
```

---

## 💡 Key Insight

> "A monitoring cron that spawns agents is not monitoring — it's a second control plane competing with the main session. Keep control in one place."

The moment we separated "writing" from "coordinating" and gave each a single owner, everything started working.

---

## Files to Keep

| File | Purpose |
|------|---------|
| `WORKER-INSTRUCTIONS.md` | Template for writer agents |
| `QA-CHECKLIST.md` | Quality requirements |
| `qa_full.py` | Automated QA script |
| `articles.json` | Article source list |
| `LESSONS-LEARNED-100.md` | This document |

---

*End of lessons learned. Ready for articles 101-200!*
