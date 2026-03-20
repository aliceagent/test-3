# Article Integration Plan — Torah Light

## Current State

### On the Website Now
- **78 articles** in `src/data/articles.json` (only **36 with actual content**, 42 are empty stubs)
- **99 bibliography entries** in `src/data/bibliography-index.json`
- **40 section route pages** under `src/app/[locale]/`

### On the `torah-light-articles` Branch (Not Yet Integrated)

**Source A — 53 numbered articles with real markdown content** (trilingual EN/ZH/HE):
These have full article text in markdown files and most have metadata.json with tags, sources, and cultural parallels.

| Section | IDs | Count |
|---------|-----|-------|
| shabbat | 16, 19 | 2 |
| prayer | 28, 29, 30 | 3 |
| blessings | 32, 33, 37 | 3 |
| mitzvah-objects | 35 | 1 |
| holidays | 41, 43, 45, 49, 50, 53 | 6 |
| conversion | 56, 57, 59, 60, 64 | 5 |
| jewish-calendar | 51 | 1 |
| jewish-history | 82 | 1 |
| jewish-texts | 80 | 1 |
| mussar | 75 | 1 |
| philosophy | 76 | 1 |
| life-cycle | 94 | 1 |
| family-purity | 95 | 1 |
| money-business | 96 | 1 |
| hebrew-learning | 97, 98 | 2 |
| jewish-stories (NEW section) | 379-385 | 7 |
| chinese-jewish-bridge (NEW section) | 386-401 | 16 |

**Source B — 33 comprehensive content plan pages** (trilingual, with metadata):
Full-length guides mapping to existing sections. These don't have numeric IDs yet — each needs an ID assigned.

| Category | Topics |
|----------|--------|
| daily-living | shabbat, blessings, clothing-modesty, family-purity, holidays, jewish-calendar, kosher-food, mitzvah-objects, money-laws, non-jewish-relations, passover-seder, prayer |
| community-life | conversion, life-cycle, matchmaking |
| foundations | five-megillot, ten-commandments, thirteen-principles, torah-study, weekly-parsha |
| history-identity | antisemitism, ashkenazi-sephardi, israel, jewish-history, jews-in-asia, messiah, tabernacle |
| texts-philosophy | chabad, hebrew-learning, jewish-texts, mussar, philosophy, pirkei-avot |

---

## Integration Approach

### Per-Article Checklist
For each article, I will:
1. **Read** the markdown content (EN/ZH/HE) from the branch
2. **Extract/generate tags** from metadata.json (or create tags if missing)
3. **Map to correct section** — match to existing website section slugs
4. **Assign ID** — use existing numeric ID, or assign next available for content plan pages
5. **Add to `src/data/articles.json`** — with title_en/zh/he and body_en/zh/he
6. **Add to `src/data/bibliography-index.json`** — with tags, sources, cultural_parallels, chinese_dynasty_references
7. **Verify** the section route page exists (create if needed)

### New Section Routes Needed
These 2 new sections need route pages created:
- `chinese-jewish-bridge` → for IDs 386-401
- `jewish-stories` → for IDs 379-385

### Section Mapping Fixes
Some branch articles use slightly different section names than the website:
- `money-business` → map to `money-laws` (existing route)
- `jews-in-asia-expanded` → map to `jews-in-asia` (existing route)
- `chinese-jewish-bridge-topics` → `chinese-jewish-bridge` (new route)
- `jewish-stories-and-inspiration` → `jewish-stories` (new route)

---

## Batch Plan (5 articles max per batch)

### Phase 1: Setup (1 batch)
**Batch 0 — Infrastructure**
- Create `chinese-jewish-bridge` section route page
- Create `jewish-stories` section route page
- Add translation keys for new sections to `messages/en.json`, `messages/zh.json`, `messages/he.json`
- Fix section name inconsistencies (`mitzvahobjects` → `mitzvah-objects`, `ashkenazi--sephardi` → `ashkenazi-sephardi`)
- **Commit & push, report to you**

### Phase 2: Numbered Articles — Existing Sections (11 batches)

**Batch 1 — Shabbat & Prayer (5 articles)**
- ID 16: Your First Shabbat
- ID 19: Kiddush
- ID 28: Prayer basics
- ID 29: Beginner's Guide to Jewish Prayer
- ID 30: The Amidah
- **Commit & push, report status to you**

**Batch 2 — Blessings & Mitzvah Objects (4 articles)**
- ID 32: Morning Blessings & Gratitude
- ID 33: Asher Yatzar
- ID 37: Blessings article
- ID 35: Tefillin for Beginners
- **Commit & push, report status to you**

**Batch 3 — Holidays Part 1 (5 articles)**
- ID 41: Rosh Hashana
- ID 43: Holidays article
- ID 45: Chanukah Beyond the Dreidel
- ID 49: Holidays article
- ID 50: Tisha B'Av
- **Commit & push, report status to you**

**Batch 4 — Holidays Part 2 & Calendar (2 articles)**
- ID 53: Fast Days in Judaism
- ID 51: Elul Preparation
- **Commit & push, report status to you**

**Batch 5 — Conversion (5 articles)**
- ID 56: Conversion article
- ID 57: Ruth — Famous Convert
- ID 59: Life as a Ger
- ID 60: Conversion article
- ID 64: Navigating Family Relationships
- **Commit & push, report status to you**

**Batch 6 — Texts, History, Philosophy (3 articles)**
- ID 80: Rambam & Mishneh Torah
- ID 82: Exodus Liberation Story
- ID 76: What is Olam HaBa?
- **Commit & push, report status to you**

**Batch 7 — Mussar, Life Cycle, Family Purity (3 articles)**
- ID 75: Cheshbon HaNefesh
- ID 94: The Jewish Home
- ID 95: Family Purity
- **Commit & push, report status to you**

**Batch 8 — Money, Hebrew Learning (3 articles)**
- ID 96: Tzedakah Commandment
- ID 97: Learning Hebrew as a Mandarin Speaker
- ID 98: Aleph-Bet in One Week
- **Commit & push, report status to you**

**Batch 9 — Jewish Stories Part 1 (5 articles)**
- ID 379: Bruriah — Brilliant Woman
- ID 380: Lost Ten Tribes
- ID 381: Baal Shem Tov Stories
- ID 382: Kamtza & Bar Kamtza
- ID 383: Rachel & Leah
- **Commit & push, report status to you**

**Batch 10 — Jewish Stories Part 2 (2 articles)**
- ID 384: Esther's Courage
- ID 385: The Rebbe's Dollar
- **Commit & push, report status to you**

**Batch 11 — Chinese-Jewish Bridge Part 1 (5 articles)**
- ID 386: Filial Piety & Kibud Av Va'Em
- ID 387: Concept of Heaven
- ID 388: Study as Worship
- ID 389: Food as Culture
- ID 390: Jewish-Chinese Family
- **Commit & push, report status to you**

**Batch 12 — Chinese-Jewish Bridge Part 2 (5 articles)**
- ID 391: Matchmaking
- ID 392: New Year Compared
- ID 393: Mourning Traditions
- ID 394: Humility
- ID 395: Tea & Torah
- **Commit & push, report status to you**

**Batch 13 — Chinese-Jewish Bridge Part 3 (5 articles)**
- ID 396: Chinese Medicine & Halacha
- ID 397: Translating Concepts
- ID 398: Red Envelopes & Tzedakah
- ID 399: Zodiac & Calendar
- ID 400: Being Jewish in China
- **Commit & push, report status to you**

**Batch 14 — Chinese-Jewish Bridge Part 4 (1 article)**
- ID 401: Three New Years
- **Commit & push, report status to you**

### Phase 3: Content Plan Comprehensive Pages (7 batches)

These are the 33 full-length guide articles. Each needs a new numeric ID assigned (starting from ID 402).

**Batch 15 — Daily Living Guides Part 1 (4 articles)**
- ID 402: Shabbat Complete Guide
- ID 403: Blessings Complete Guide
- ID 404: Prayer Complete Guide
- ID 405: Kosher Food Complete Guide
- **Commit & push, report status to you**

**Batch 16 — Daily Living Guides Part 2 (5 articles)**
- ID 406: Holidays Complete Guide
- ID 407: Jewish Calendar Complete Guide
- ID 408: Passover Seder Complete Guide
- ID 409: Mitzvah Objects Complete Guide
- ID 410: Clothing & Modesty Complete Guide
- **Commit & push, report status to you**

**Batch 17 — Daily Living Guides Part 3 (3 articles)**
- ID 411: Family Purity Complete Guide
- ID 412: Money Laws Complete Guide
- ID 413: Non-Jewish Relations Complete Guide
- **Commit & push, report status to you**

**Batch 18 — Foundations (5 articles)**
- ID 414: Torah Study Complete Guide
- ID 415: Weekly Parsha Complete Guide
- ID 416: Ten Commandments Complete Guide
- ID 417: Thirteen Principles Complete Guide
- ID 418: Five Megillot Complete Guide
- **Commit & push, report status to you**

**Batch 19 — Community Life (3 articles)**
- ID 419: Conversion Complete Guide
- ID 420: Life Cycle Complete Guide
- ID 421: Matchmaking Complete Guide
- **Commit & push, report status to you**

**Batch 20 — History & Identity (5 articles)**
- ID 422: Jewish History Complete Guide
- ID 423: Jews in Asia Complete Guide
- ID 424: Israel Complete Guide
- ID 425: Ashkenazi & Sephardi Complete Guide
- ID 426: Antisemitism Complete Guide
- **Commit & push, report status to you**

**Batch 21 — History & Identity Part 2 + Texts (5 articles)**
- ID 427: Messiah Complete Guide
- ID 428: Tabernacle Complete Guide
- ID 429: Jewish Texts Complete Guide
- ID 430: Chabad Complete Guide
- ID 431: Hebrew Learning Complete Guide
- **Commit & push, report status to you**

**Batch 22 — Texts & Philosophy (3 articles)**
- ID 432: Mussar Complete Guide
- ID 433: Philosophy Complete Guide
- ID 434: Pirkei Avot Complete Guide
- **Commit & push, report status to you**

### Phase 4: Verification & Cleanup (1 batch)

**Batch 23 — Final QA**
- Verify all 86 new articles render correctly in each locale (en/zh/he)
- Verify bibliography index has entries for all new articles
- Fix any section mapping issues or broken references
- Run `npm run build` to confirm no errors
- **Final commit & push, report complete summary to you**

---

## Communication Plan

After **every batch** I will report to you with:
1. Which articles were added (IDs and titles)
2. Which sections they went into
3. Whether tags and bibliography entries were created
4. Any issues encountered (missing translations, metadata gaps, etc.)
5. Running total of articles integrated vs remaining

After **every 5 batches** I will provide a summary checkpoint so you can review progress.

---

## Summary

| Phase | Batches | Articles | Description |
|-------|---------|----------|-------------|
| 1: Setup | 1 | 0 | Infrastructure, new routes, fixes |
| 2: Numbered | 14 | 53 | Articles with existing IDs from branch |
| 3: Content Plans | 8 | 33 | Comprehensive guide pages |
| 4: QA | 1 | 0 | Verification and cleanup |
| **Total** | **24 batches** | **86 articles** | |
