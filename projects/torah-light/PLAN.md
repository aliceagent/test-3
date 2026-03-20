# Torah Light (Torah之光) — Article Production Plan

## Article Sets
| Set | Count | Source | Status |
|-----|-------|--------|--------|
| 100 | 100 | articles.json | IN PROGRESS |
| 200 | TBD | [ARTICLES_200.md](https://github.com/aliceagent/test-3/blob/claude/mandarin-jewish-learning-KnR7E/ARTICLES_200.md) | PENDING |
| 300 | TBD | Branch: claude/mandarin-jewish-learning-KnR7E | PENDING |
| 400 | TBD | Branch: claude/mandarin-jewish-learning-KnR7E | PENDING |

**⚠️ IMPORTANT**: All articles from ALL sets go into ONE unified folder structure organized by topic/section (torah-study/, shabbat/, holidays/, etc.) — NOT separated by batch number. Article numbering continues sequentially (101, 102... not 201, 202).

---

## Project Overview
**Goal**: Produce 100 high-quality educational articles about Orthodox Judaism for native Mandarin speakers with no prior Jewish knowledge.

**Target Audience**: Chinese native Mandarin speakers, no background in Judaism
**Tone**: Educational, warm, culturally sensitive
**Special Requirements**:
- Draw parallels to Chinese/Asian customs when relevant
- Reference equivalent Chinese historical periods when discussing Jewish history
- Full bibliographies citing sources
- Upload to: https://github.com/aliceagent/test-3/

---

## ⚠️ PIPELINE RELIABILITY (READ FIRST)

See **PIPELINE-RELIABILITY.md** for critical lessons learned.

**Key Rules:**
1. NEVER spawn writers from cron sessions (5-child limit)
2. ALWAYS verify actual file count before reporting progress
3. ALWAYS check `subagents list` before spawning more
4. Main session owns all production spawns
5. If gateway times out → stop and investigate, don't retry blindly

---

## Source Websites
1. **Aish.com** — Contemporary Jewish educational content
2. **Chabad.org** — Comprehensive Torah encyclopaedia and Chassidic teachings
3. **Sefaria.org** — Primary Jewish texts with translations

### ⚠️ CLOUDFLARE BYPASS REQUIRED
These sites block normal web_fetch requests. Use these tools:

**For Sefaria (API works directly):**
```bash
python3 scripts/torah_research_fetch.py sefaria "Genesis 22:1-10"
```

**For Aish.com and Chabad.org (use Scrapling):**
```bash
~/scrapling-env/bin/python3 scripts/scrapling_fetch.py "<url>"
```

**URL Verification (before adding to bibliography):**
```bash
python3 scripts/torah_research_fetch.py verify "<url>"
```

**CRITICAL:** All bibliography URLs MUST be verified as live (200 status) before including in the article. Dead URLs = QA failure.

---

## Sub-Agent Architecture

### 1. COORDINATOR AGENT (Alice/Main)
- Maintains master article queue in `articles/queue.json`
- Monitors overall progress
- Handles escalations from Watcher agents
- Reports to J on milestones

### 2. RESEARCH AGENTS (2 parallel)
**Model**: Sonnet
**Role**: Scrape and compile source material
- Research-Alpha: Handles odd-numbered articles (1, 3, 5...)
- Research-Beta: Handles even-numbered articles (2, 4, 6...)

**Output per article**:
```
research/{article-id}/
├── sources.json (URLs, quotes, page titles)
├── aish-content.md
├── chabad-content.md
├── sefaria-content.md
└── chinese-parallels.md (cultural/historical connections)
```

### 3. WRITER AGENTS (3 parallel)
**Model**: Sonnet
**Role**: Write articles from research packets
- Writer-Alpha: Articles 1-33
- Writer-Beta: Articles 34-66
- Writer-Gamma: Articles 67-100

**Output per article**:
```
drafts/{article-id}/
├── article-en.md (full article in English)
├── article-zh.md (Simplified Mandarin 简体中文)
├── article-he.md (Hebrew עברית)
├── bibliography.md
└── metadata.json (title, section, word count, status)
```

### Language Requirements
Each article MUST be written in THREE languages:
1. **English** (primary) — article-en.md
2. **Simplified Mandarin** (简体中文) — article-zh.md  
3. **Hebrew** (עברית) — article-he.md

### 4. QA AGENT (1)
**Model**: Sonnet
**Role**: Quality assurance
- Verify article completeness (intro, body, conclusion, bibliography)
- Check cultural parallels are accurate
- Verify historical date mappings to Chinese dynasties
- Ensure warm, educational tone
- Flag articles needing revision

**Actions**:
- APPROVE → moves to upload queue
- REVISE → returns to Writer with specific feedback
- ESCALATE → alerts Coordinator for manual review

### 5. UPLOAD AGENT (1)
**Model**: Sonnet
**Role**: Git operations
- Commits approved articles to `aliceagent/test-3`
- Creates proper folder structure
- Updates README with article index
- Verifies successful push

### 6. WATCHER AGENT (1)
**Model**: Sonnet (lightweight polling)
**Role**: Monitor progress, handle failures
- Polls every 5 minutes
- Detects stuck agents (no progress in 15 min)
- Restarts failed tasks
- Sends progress reports to Alice
- Ensures no article is skipped

---

## Workflow Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                        ARTICLE QUEUE                            │
│  [1] [2] [3] [4] [5] ... [100]                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1: RESEARCH                            │
│  Research-Alpha ──────────► research/001/                       │
│  Research-Beta  ──────────► research/002/                       │
│  (2 articles in parallel)                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 2: WRITING                             │
│  Writer-Alpha  ──────────► drafts/001/                          │
│  Writer-Beta   ──────────► drafts/034/                          │
│  Writer-Gamma  ──────────► drafts/067/                          │
│  (3 articles in parallel)                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 3: QA                                  │
│  QA-Agent reviews each article                                  │
│  APPROVE / REVISE / ESCALATE                                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 4: UPLOAD                              │
│  Upload-Agent commits to GitHub                                 │
│  Updates index, verifies push                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    WATCHER (continuous)                         │
│  Monitors all phases, restarts stuck agents                     │
│  Reports progress every 10 articles                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Article Structure Template

```markdown
# [Article Title in English]
# [Article Title in Chinese]

## Introduction
[Hook that connects to reader's life, ~150 words]
⚠️ RULE: When mentioning a time period (e.g., "four thousand years ago"), 
ALWAYS include the equivalent Chinese dynasty in parentheses.
Example: "Nearly four thousand years ago — during what corresponds to 
China's Shang Dynasty (商朝, ~1600-1046 BCE) — Abraham faced..."

## Main Content
[Educational content with subheadings, ~800-1200 words]

### Cultural Connection
[Parallel to Chinese/Asian culture when applicable]

### Historical Context
[Jewish historical period + equivalent Chinese dynasty]

## Practical Application
[How this applies to daily life, ~150 words]

## Key Takeaways
- Point 1
- Point 2
- Point 3

## Bibliography
⚠️ RULE: Every source MUST include a direct clickable URL.
Format:
1. **"Article Title"** — Source Name  
   https://full-url-here  
   *(Brief description of content)*
```

---

## MANDATORY REQUIREMENTS (Learned from Pilot)

### 1. Chinese Historical Context Rule
**EVERY time a historical period or date is mentioned**, include the equivalent Chinese dynasty:
- ❌ WRONG: "Nearly four thousand years ago, Abraham..."
- ✅ RIGHT: "Nearly four thousand years ago — during China's Shang Dynasty (商朝) — Abraham..."

### 2. Bibliography URL Rule
**EVERY bibliography entry MUST have a direct clickable URL:**
- ❌ WRONG: "Genesis Chapter 22, Hebrew Bible with commentary. Accessed via Sefaria.org"
- ✅ RIGHT: "**Genesis Chapter 22** — Sefaria.org\n   https://www.sefaria.org/Genesis.22"

### 3. Historical Figures Index
**All biblical/historical figures mentioned MUST be added to `/HISTORICAL_FIGURES_INDEX.md`** with:
- Name (English, Chinese, Hebrew)
- Era with Chinese dynasty equivalent
- Brief description
- Links to articles where they appear

### 4. Three-Language Consistency Rule
**ALL changes/fixes to any article MUST be applied to ALL 3 language versions:**
- ❌ WRONG: Fix only article-en.md and forget ZH/HE
- ✅ RIGHT: Fix article-en.md, article-zh.md, AND article-he.md

This includes:
- Content corrections
- Bibliography updates
- Historical context additions
- Any structural changes

**Before committing any article fix, verify all 3 files are updated.**

### 5. Tags Section Rule
**Every article MUST end with a Tags section** containing relevant hashtags for:
- Themes (e.g., #Faith, #Sacrifice, #FreeWill)
- People (e.g., #Abraham, #Rashi, #Hillel)
- Events (e.g., #BindingOfIsaac, #Creation, #Exodus)
- Chinese cultural parallels (e.g., #孝, #商朝, #道家)
- Section category (e.g., #TorahStudy, #Shabbat, #Holidays)

**Format:**
```markdown
## Tags

#Tag1 #Tag2 #Tag3 #ChineseTag #中文标签

---
```

Tags should be in English AND Chinese/Hebrew where applicable.

### 6. Header Image Description Rule
**Every article MUST have a DALL-E image description** placed immediately after the title, before the introduction. This will be used later to generate Chinese brushstroke style landscape header images.

**Format:**
```markdown
# Article Title

> **Header Image Description (DALL-E prompt):** [Detailed description of a Chinese brushstroke/shan shui (山水) style landscape image relevant to the article content. Include: scene, composition, key elements, style notes, color palette, and mood.]

---

## Introduction
```

**Image style requirements:**
- Traditional Chinese ink wash (水墨) / shan shui (山水) landscape style
- Relevant visual metaphors for the article's theme
- Muted earth tones with subtle accent colors
- Include any biblical figures/elements rendered in Chinese artistic style
- Specify mood: serene, dramatic, contemplative, etc.

---

## Chinese Historical Period Mapping

| Jewish Period | Approximate Dates | Chinese Equivalent |
|---------------|-------------------|-------------------|
| Patriarchs (Abraham-Jacob) | ~1800-1500 BCE | Shang Dynasty 商朝 |
| Exodus & Wilderness | ~1300-1260 BCE | Late Shang Dynasty |
| Judges Period | ~1200-1020 BCE | Early Zhou Dynasty 周朝 |
| United Monarchy (Saul-Solomon) | ~1020-930 BCE | Western Zhou |
| First Temple Period | 957-586 BCE | Spring & Autumn 春秋 |
| Babylonian Exile | 586-516 BCE | Late Spring & Autumn |
| Second Temple Period | 516 BCE - 70 CE | Warring States → Han Dynasty 汉朝 |
| Mishnaic Period | 70-200 CE | Han Dynasty |
| Talmudic Period | 200-500 CE | Three Kingdoms → Jin Dynasty |
| Medieval Rabbis (Rashi, etc.) | 1000-1500 CE | Song → Ming Dynasty 宋明 |

---

## Progress Tracking

### Status File: `progress.json`
```json
{
  "total": 100,
  "researched": 0,
  "drafted": 0,
  "qa_approved": 0,
  "uploaded": 0,
  "failed": [],
  "in_progress": {
    "research": [],
    "writing": [],
    "qa": [],
    "upload": []
  },
  "last_updated": "2026-03-16T22:00:00Z"
}
```

### Milestones & Notifications
- Every 10 articles completed → Telegram notification to J
- Every 25 articles → Summary report with quality samples
- 50 articles → Mid-project review checkpoint
- 100 articles → Final completion celebration 🎉

---

## Error Handling

### Stuck Agent Recovery
1. Watcher detects no progress for 15 minutes
2. Watcher kills stuck agent process
3. Watcher marks article as "needs_retry"
4. Watcher spawns replacement agent with same task
5. If 3 retries fail → escalate to Alice

### Quality Failures
1. QA rejects article with specific feedback
2. Article returns to Writer queue with revision notes
3. Writer revises and resubmits
4. If 2 revisions fail QA → escalate to Alice

### No Article Skipped Guarantee
- Master queue tracks all 100 articles
- Each article has explicit status
- Watcher runs daily audit: compare uploaded vs. queue
- Any missing articles get re-queued automatically

---

## Estimated Timeline

| Phase | Duration | Output |
|-------|----------|--------|
| Setup & Testing | 1 day | Pipeline tested with 3 articles |
| Batch 1 (1-25) | 2-3 days | 25 articles uploaded |
| Batch 2 (26-50) | 2-3 days | 50 articles uploaded |
| Batch 3 (51-75) | 2-3 days | 75 articles uploaded |
| Batch 4 (76-100) | 2-3 days | 100 articles uploaded |
| Final QA & Index | 1 day | Complete website content |

**Total: ~10-14 days** (running 24/7 with parallel agents)

---

## GitHub Repository Structure

```
aliceagent/test-3/
├── README.md (article index with links)
├── weekly-parsha/
│   ├── 001-what-is-dvar-torah/
│   │   ├── article-en.md (English)
│   │   ├── article-zh.md (Simplified Mandarin 简体中文)
│   │   ├── article-he.md (Hebrew עברית)
│   │   └── metadata.json
│   └── ...
├── torah-study/
├── shabbat/
├── kosher-food/
├── prayer/
├── blessings/
├── mitzvah-objects/
├── holidays/
├── passover-seder/
├── jewish-calendar/
├── conversion/
├── community/
├── philosophy/
├── jewish-texts/
├── mussar/
├── pirkei-avot/
├── jewish-history/
├── jews-in-asia/
├── israel/
├── life-cycle/
├── hebrew-learning/
├── messiah/
└── assets/
    └── images/
```

### Folder to Section Mapping
| Folder | Articles | Section |
|--------|----------|---------|
| weekly-parsha/ | 1-2, 5, 9-10 | Weekly Parsha |
| torah-study/ | 3-4, 6-8, 11-13, 15 | Torah Study |
| shabbat/ | 16-22 | Shabbat |
| kosher-food/ | 23-27 | Kosher Food |
| prayer/ | 14, 28-30 | Prayer |
| blessings/ | 31-33, 37-38 | Blessings |
| mitzvah-objects/ | 34-36, 39-40 | Mitzvah Objects |
| holidays/ | 41-46, 49-50, 53, 55 | Holidays |
| passover-seder/ | 47-48 | Passover Seder |
| jewish-calendar/ | 51-52, 54 | Jewish Calendar |
| conversion/ | 56-60, 64, 100 | Conversion |
| community/ | 61-63, 65 | Community |
| philosophy/ | 66-69, 76-77 | Philosophy |
| jewish-texts/ | 70-72, 80 | Jewish Texts |
| mussar/ | 73-75 | Mussar |
| pirkei-avot/ | 78-79 | Pirkei Avot |
| jewish-history/ | 81-82, 89-90 | Jewish History |
| jews-in-asia/ | 83-84 | Jews in Asia |
| israel/ | 85-88 | Israel |
| life-cycle/ | 91-96 | Life Cycle |
| hebrew-learning/ | 97-98 | Hebrew Learning |
| messiah/ | 99 | Messiah |

---

## First 11 Articles (Provided)

### WEEKLY PARSHA & TORAH STUDY (1-15)

| # | Title | Section |
|---|-------|---------|
| 1 | What is a Dvar Torah and How to Prepare One | Weekly Parsha |
| 2 | Bereishit: Why God Created the World — And What It Means for You | Weekly Parsha |
| 3 | The Binding of Isaac: Faith, Sacrifice, and the Test of Abraham | Torah Study |
| 4 | The Story of Joseph: Leadership, Forgiveness, and Family | Torah Study |
| 5 | The Ten Plagues: What Each Plague Teaches About Justice | Weekly Parsha |
| 6 | Why We Read the Torah in a One-Year Cycle | Torah Study |
| 7 | Moshe's Leadership Lessons: What the Greatest Prophet Can Teach Us | Torah Study |
| 8 | Understanding Rashi: A Beginner's Guide to the Most Famous Commentator | Torah Study |
| 9 | Five Discussion Questions for Every Parsha (A Family Template) | Weekly Parsha |
| 10 | The Song of the Sea: When the Jewish People First Sang Together | Weekly Parsha |
| 11 | What is the Oral Torah? Understanding the Mishnah and Talmud | Torah Study |

**Awaiting**: Articles 12-100 (remaining 89 titles)

---

## Approval Checklist

Please confirm:
- [ ] Sub-agent architecture is acceptable
- [ ] Article structure template is good
- [ ] Chinese historical mappings are appropriate
- [ ] Timeline expectations are realistic
- [ ] Ready to receive remaining 89 article titles
- [ ] Approve to begin pilot with first 3 articles

---

## Next Steps (Upon Approval)

1. Create `torah-light/` project folder with queue and tracking files
2. Clone `aliceagent/test-3` repo
3. Run pilot: Research + Write + QA + Upload articles 1-3
4. Review pilot output with J
5. If approved, launch full production pipeline
6. Set up Watcher cron for continuous monitoring
