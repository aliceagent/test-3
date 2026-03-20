# Article Import Plan — Torah Light

## Scope

**291 new articles** to import from article folders on `main` into the website.
- Website currently has **78 articles** in `src/data/articles.json`
- After import: **~369 articles**
- Each article has trilingual markdown (EN/ZH/HE), metadata.json with tags, sources, and cultural parallels
- All 291 need entries in both `articles.json` and `bibliography-index.json`

---

## Phase 0: Build Import Script + New Section Pages (2 batches)

**Batch 0.1 — Import Script**
Build a Python script that reads article folders and outputs updated JSON files:
- Reads `metadata.json`, `article-en.md`, `article-zh.md`, `article-he.md` from each folder
- Extracts: id, section, titles, body, tags, sources, cultural_parallels, chinese_dynasty_references
- Maps section names to website conventions
- Assigns IDs to 3 articles missing them (starting from 500)
- Validates: title_en, body_en, section, tags present
- **Checkpoint: Share dry-run report before importing anything**

**Batch 0.2 — New Section Pages + Navigation**
Create route pages for 7 new sections not currently on the website:
1. `jewish-philosophy-big-questions` (13 articles)
2. `practical-halacha-for-daily-life` (12 articles)
3. `money-business` (9 articles)
4. `jewish-values` (6 articles)
5. `jewish-stories-and-inspiration` (8 articles)
6. `jews-in-asia-expanded` (10 articles)
7. `jewish-home` (1 article)

Add to Navbar, admin panel, translation files (en.json, zh.json, he.json).
- **Checkpoint: Show new pages and translation keys**
- **Commit & push**

---

## Phase 1: Import Holidays (29 articles — 6 batches)

**Batch 1.1** (5 articles)
- ID 43: Building a Sukkah: A Practical Guide
- ID 49: Shavuot: The Night We Stayed Up to Receive the Torah
- ID 136: The Shofar: How a Ram's Horn Wakes Up Your Soul
- ID 137: Tashlich: Casting Away Your Sins at the Water
- ID 138: The Five Prohibitions of Yom Kippur
- **Commit & push, report to you**

**Batch 1.2** (5 articles)
- ID 139: Kol Nidrei
- ID 140: Living in the Sukkah
- ID 141: Simchat Torah
- ID 142: The Chanukah Menorah
- ID 143: Mishloach Manot
- **Commit & push, report to you**

**Batch 1.3** (5 articles)
- ID 146: The Omer Period
- ID 147: Shavuot All-Night Learning
- ID 148: Shemini Atzeret
- ID 150: Fast of Gedaliah
- ID 321: Apple and Honey Simanim
- **Commit & push, report to you**

**Batch 1.4** (5 articles)
- ID 322: How to Blow the Shofar
- ID 323: Kapparot
- ID 324: Building a Sukkah on a Chinese Balcony
- ID 325: Ushpizin
- ID 326: Latkes vs. Sufganiyot
- **Commit & push, report to you**

**Batch 1.5** (5 articles)
- ID 327: The Megillah Reading
- ID 328: Hamantaschen
- ID 329: The Afikoman
- ID 330: Kitniyot
- ID 331: Cheesecake and Blintzes on Shavuot
- **Commit & push, report to you**

**Batch 1.6** (4 articles)
- ID 332: Book of Ruth on Shavuot
- ID 333: Lag BaOmer Bonfires
- ID 334: Isru Chag
- ID 335: Chol HaMoed
- **Checkpoint: "All 29 holidays articles imported." Commit & push.**

---

## Phase 2: Import Shabbat (23 articles — 5 batches)

**Batch 2.1** (5): IDs 200-204 (Hosting, Electricity, Elevator, Summer/Winter, Muktzeh)
**Batch 2.2** (5): IDs 205-209 (Eruv, Melaveh Malkah, Children, Games, Budget Cooking)
**Batch 2.3** (5): IDs 210-212, 301-302 (Spiritual Power, Night-Shift, Zemiros, Cholent, Sephardi Chamin)
**Batch 2.4** (5): IDs 303-307 (Challah Shapes, Salads, Blech, Desserts, Oneg Shabbat)
**Batch 2.5** (3): IDs 308-310 (Shabbat Nap, Holiday Overlap, Non-Jewish Guests)
- **Checkpoint: "All 23 shabbat articles imported." Commit & push.**

---

## Phase 3: Import Life-Cycle (23 articles — 5 batches)

**Batch 3.1** (5): IDs 94, 199, 227-229 (Jewish Home, Names, Brit Milah, Pidyon HaBen, Bar/Bat Mitzvah)
**Batch 3.2** (5): IDs 230-233, 235 (Wedding, Mourning, Tahara, Yahrzeit, Upsherin)
**Batch 3.3** (5): IDs 236, 269-272 (Naming, Brit Milah deep, Pidyon HaBen deep, Upsherin deep, Bar Mitzvah Speech)
**Batch 3.4** (5): IDs 273-277 (Aufruf, Sheva Brachot, Funeral Guide, Shiva Call, Kaddish)
**Batch 3.5** (3): IDs 278-280 (Yahrzeit deep, Yizkor, Jewish Adoption)
- **Checkpoint: "All 23 life-cycle articles imported." Commit & push.**

---

## Phase 4: Import Prayer (19 articles — 4 batches)

**Batch 4.1** (5): IDs 28, 121-124 (Modeh Ani, Pray Without Hebrew, Bedtime Shema, Minyan, Tehillim)
**Batch 4.2** (5): IDs 130-133, 311 (Facing Jerusalem, Hallel, Selichot, Kaddish, Kavanah)
**Batch 4.3** (5): IDs 312-316 (Modim, Tachanun, Ashrei, Kedushah, Language)
**Batch 4.4** (4): IDs 317-320 (Power of Amen, Mincha, Mi Sheberach, 30-Day Plan)
- **Checkpoint: "All 19 prayer articles imported." Commit & push.**

---

## Phase 5: Import Conversion (16 articles — 4 batches)

**Batch 5.1** (5): IDs 56-60 (Thinking About Converting, Ruth, Beit Din, Life as Ger, Finding a Rabbi)
**Batch 5.2** (5): IDs 64, 159-162 (Family Relationships, Mikvah, Hebrew Name, Famous Converts, Study Checklist)
**Batch 5.3** (5): IDs 163-167 (Couple Converting, First High Holidays, Doubt, After Conversion, Raising Children)
**Batch 5.4** (1): ID 168 (Chinese Convert's Story)
- **Checkpoint: "All 16 conversion articles imported." Commit & push.**

---

## Phase 6: Import Jewish Philosophy (13 articles — 3 batches)

**Batch 6.1** (5): IDs 336-340
**Batch 6.2** (5): IDs 341-345
**Batch 6.3** (3): IDs 346-348
- **Checkpoint: "All 13 jewish-philosophy articles imported." Commit & push.**

---

## Phase 7: Import Practical Halacha (12 articles — 3 batches)

**Batch 7.1** (5): IDs 359-363
**Batch 7.2** (5): IDs 364-368
**Batch 7.3** (2): IDs 369-370
- **Checkpoint: "All 12 practical-halacha articles imported." Commit & push.**

---

## Phase 8: Import Israel + Jewish History (21 articles — 5 batches)

**Batch 8.1** (5): Israel IDs 86, 87, 187-189
**Batch 8.2** (5): Israel IDs 190-194, 262
**Batch 8.3** (5): Jewish History IDs 81, 253-256
**Batch 8.4** (5): Jewish History IDs 257-259, 261, 263
**Batch 8.5** (1): Israel ID 262
- **Checkpoint: "All 21 israel + jewish-history articles imported." Commit & push.**

---

## Phase 9: Import Mussar + Mitzvah-Objects (21 articles — 5 batches)

**Batch 9.1** (5): Mussar IDs 169-173
**Batch 9.2** (5): Mussar IDs 174-178, 282
**Batch 9.3** (5): Mitzvah-Objects IDs 196, 218-221
**Batch 9.4** (5): Mitzvah-Objects IDs 222-226
- **Checkpoint: "All 21 mussar + mitzvah-objects articles imported." Commit & push.**

---

## Phase 10: Import Jews-in-Asia + Jews-in-Asia-Expanded (17 articles — 4 batches)

**Batch 10.1** (5): Jews-in-Asia IDs 84, 260, 264-266
**Batch 10.2** (2): Jews-in-Asia IDs 267-268
**Batch 10.3** (5): Jews-in-Asia-Expanded IDs 349-353
**Batch 10.4** (5): Jews-in-Asia-Expanded IDs 354-358
- **Checkpoint: "All 17 jews-in-asia articles imported." Commit & push.**

---

## Phase 11: Import Money-Business + Jewish Values (15 articles — 3 batches)

**Batch 11.1** (5): Money-Business IDs 281, 283-286
**Batch 11.2** (4): Money-Business IDs 287-290
**Batch 11.3** (5): Jewish Values IDs 238-240, 242-243
**Batch 11.4** (1): Jewish Values ID 244
- **Checkpoint: "All 15 money-business + jewish-values articles imported." Commit & push.**

---

## Phase 12: Import Blessings + Hebrew Learning + Jewish Calendar (24 articles — 5 batches)

**Batch 12.1** (5): Blessings IDs 37, 125-128
**Batch 12.2** (3): Blessings IDs 129, 134-135
**Batch 12.3** (5): Hebrew Learning IDs 98, 198, 291-293
**Batch 12.4** (3): Hebrew Learning IDs 294-296
**Batch 12.5** (5): Jewish Calendar IDs 151-155
**Batch 12.6** (3): Jewish Calendar IDs 156-158
- **Checkpoint: "All 24 blessings + hebrew + calendar articles imported." Commit & push.**

---

## Phase 13: Import Pirkei Avot + Jewish Stories (16 articles — 4 batches)

**Batch 13.1** (5): Pirkei Avot IDs 179-183
**Batch 13.2** (3): Pirkei Avot IDs 184-186
**Batch 13.3** (5): Jewish Stories IDs 371-375
**Batch 13.4** (3): Jewish Stories IDs 376-378
- **Checkpoint: "All 16 pirkei-avot + jewish-stories articles imported." Commit & push.**

---

## Phase 14: Import Remaining Sections (28 articles — 6 batches)

**Batch 14.1** (5): Weekly-Parsha IDs 1, 5, 116-118
**Batch 14.2** (2): Weekly-Parsha IDs 119-120
**Batch 14.3** (5): Jewish Texts IDs 71, 72, 195, 197, 234 + 241
**Batch 14.4** (5): Chabad IDs 245-246, 250-252
**Batch 14.5** (5): Kosher-Food IDs 213-217
**Batch 14.6** (4): Antisemitism IDs 297-300
- **Commit & push, report to you**

**Batch 14.7** (5): Philosophy IDs 66, 247-249 + Passover IDs 144-145
**Batch 14.8** (5): Passover ID 149 + Torah-Light-Articles (3) + Community ID 62 + Jewish-Home ID 237
**Batch 14.9** (3): Messiah ID 99 + Non-Jewish-Relations ID 61 + Torah-Study ID 3
- **Checkpoint: "All remaining sections imported." Commit & push.**

---

## Phase 15: Validation & Final QA

- Verify `articles.json` has ~369 articles with title_en, body_en, section
- Verify `bibliography-index.json` has entries for all articles with tags and sources
- Verify all 7 new section pages render correctly
- Run `npm run build` to confirm no errors
- Spot-check 10 random articles across different sections
- **Final commit & push, full summary report**

---

## Communication Plan

After **every batch** I report:
1. Which articles were added (ID, title, section)
2. Running total (e.g., "56/291 imported")
3. Tags and bibliography entries created
4. Any issues (missing translations, metadata gaps)

After **each phase** I give a section summary.

After **phases 8 and 14** I give a full progress checkpoint.

---

## Summary

| Phase | Section(s) | Articles | Batches |
|-------|-----------|----------|---------|
| 0 | Setup + new pages | 0 | 2 |
| 1 | Holidays | 29 | 6 |
| 2 | Shabbat | 23 | 5 |
| 3 | Life-Cycle | 23 | 5 |
| 4 | Prayer | 19 | 4 |
| 5 | Conversion | 16 | 4 |
| 6 | Jewish Philosophy | 13 | 3 |
| 7 | Practical Halacha | 12 | 3 |
| 8 | Israel + Jewish History | 21 | 5 |
| 9 | Mussar + Mitzvah-Objects | 21 | 4 |
| 10 | Jews-in-Asia (both) | 17 | 4 |
| 11 | Money-Business + Jewish Values | 15 | 4 |
| 12 | Blessings + Hebrew + Calendar | 24 | 6 |
| 13 | Pirkei Avot + Stories | 16 | 4 |
| 14 | All remaining sections | 28 | 9 |
| 15 | Validation & QA | 0 | 1 |
| **Total** | **34 sections** | **291 articles** | **~69 batches** |

## What Each Article Gets

1. **articles.json entry**: id, section, title_en/zh/he, body_en/zh/he, created_at, updated_at
2. **bibliography-index.json entry**: id, title (3 langs), section, description, tags[], sources[], cultural_parallels[], chinese_dynasty_references[], status, filePath
3. **Correct section mapping** to website slug
4. **10-16 tags** from metadata.json
5. **5-7 bibliography sources** from metadata.json
6. **Cultural parallels** (Chinese-Jewish connections)
