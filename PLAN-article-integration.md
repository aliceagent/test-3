# Plan: Integrate 44 Missing Articles into Torah Light Website

## Problem
There are **44 articles** with full trilingual content (EN/ZH/HE) on disk that are NOT appearing on the website. Two root causes:
1. **16 articles** lack `metadata.json` files → the build script skips them
2. **~20 articles** live under `projects/torah-light/` → the build script skips `projects/` directory
3. **Some overlap** — articles in `projects/` that also lack metadata

## Solution
For each article:
1. Create `metadata.json` if missing (with id, title, section, tags, description, sources)
2. Move/copy article files to the correct top-level section directory so the build script finds them
3. Update `bibliography-index.json` with translated descriptions
4. Run `generate-articles-json.ts` to rebuild `articles.json`
5. Run `build-bibliography.js` to rebuild bibliography index
6. Test build succeeds, commit, push, merge to main

## Batches (5 articles each, 9 batches)

### Batch 1: Prayer & Blessings
| ID | Title | Issue |
|----|-------|-------|
| 28 | Modeh Ani: First Words Every Morning | In `prayer/` but skipped (no meta in build?) |
| 29 | Beginner's Guide to Jewish Prayer | In `projects/` — needs move |
| 30 | Understanding the Amidah | In `projects/` — needs move |
| 32 | Morning Blessings: Starting Your Day with Gratitude | In `projects/` — needs move |
| 33 | Asher Yatzar: Blessing for Your Body | In `projects/` — needs move |

### Batch 2: Shabbat & Blessings
| ID | Title | Issue |
|----|-------|-------|
| 16 | Your First Shabbat: Step-by-Step Guide | In `projects/` — needs move |
| 19 | Kiddush: Full Text, Translation, Meaning | In `projects/` — needs move |
| 35 | Tefillin for Beginners | In `projects/` — needs move |
| 37 | Birkat HaMazon: Grace After Meals | Has metadata, in `blessings/` — check why skipped |
| 41 | Rosh Hashana for Beginners | In `projects/` — needs move |

### Batch 3: Holidays I
| ID | Title | Issue |
|----|-------|-------|
| 43 | Building a Sukkah: Practical Guide | Has metadata but maybe missing ID |
| 45 | Chanukah: Beyond the Dreidel | In `projects/` — needs move |
| 49 | Shavuot: The Night We Stayed Up | In `holidays/` — check metadata |
| 50 | Tisha B'Av: Saddest Day in Jewish History | In `projects/` — needs move |
| 51 | The Jewish Month of Elul | In `torah-light-articles/` — needs move |

### Batch 4: Holidays II & Calendar
| ID | Title | Issue |
|----|-------|-------|
| 53 | Fast Days in Judaism | In `projects/` — needs move |
| 56 | Thinking About Converting? | Has metadata, in `conversion/` — check |
| 60 | Finding a Rabbi in Asia | In `torah-light-articles/` — needs move |
| 61 | The Noahide Laws | Has metadata, in `non-jewish-relations/` — check |
| 62 | Mentorship Program | Has metadata, in `community/` — check |

### Batch 5: Conversion & Community
| ID | Title | Issue |
|----|-------|-------|
| 57 | The Story of Ruth | No metadata — needs creation |
| 58 | What is a Beit Din? | No metadata — needs creation |
| 59 | Life as a Ger (Convert) | No metadata — needs creation |
| 64 | Navigating Family Relationships After Conversion | Has metadata — check |
| 66 | Does God Exist? Jewish Arguments | Has metadata — check (duplicate of id 66?) |

### Batch 6: Philosophy & Texts
| ID | Title | Issue |
|----|-------|-------|
| 71 | The Kuzari: A King's Search for Truth | No metadata — needs creation |
| 72 | Mesillat Yesharim: Roadmap to Spiritual Growth | No metadata — needs creation |
| 75 | Cheshbon HaNefesh: Daily Self-Reflection | In `projects/` — needs move |
| 76 | What is Olam HaBa? The World to Come | In `projects/` — needs move |
| 80 | Rambam's Mishneh Torah Guide | In `projects/` — needs move |

### Batch 7: History & Israel
| ID | Title | Issue |
|----|-------|-------|
| 81 | Abraham: The First Jew | Has metadata — check why skipped |
| 82 | The Exodus: Greatest Liberation Story | In `projects/` — needs move |
| 84 | Shanghai Jewish Refugees | No metadata — needs creation |
| 86 | Jerusalem Through the Ages | No metadata — needs creation |
| 87 | What is Zionism? | Has metadata — check |

### Batch 8: Life Cycle & Special Topics
| ID | Title | Issue |
|----|-------|-------|
| 91 | Planning a Jewish Wedding | No metadata — needs creation |
| 92 | Bar/Bat Mitzvah Preparation | No metadata — needs creation |
| 93 | Sitting Shiva: Jewish Mourning | No metadata — needs creation |
| 94 | Creating a Jewish Home | No metadata — needs creation |
| 95 | Taharat HaMishpacha: Family Purity | In `projects/` — needs move |

### Batch 9: Remaining Articles
| ID | Title | Issue |
|----|-------|-------|
| 1 | What is a D'var Torah? | No metadata — needs creation |
| 3 | The Binding of Isaac | No metadata — needs creation |
| 5 | The Ten Plagues: Justice and Mercy | No metadata — needs creation |
| 96 | Tzedakah: The Commandment of Giving | In `projects/`, no metadata |
| 97 | Learning Hebrew as a Mandarin Speaker | In `projects/`, no metadata |

### Batch 10 (Final): Last 2 + Cleanup
| ID | Title | Issue |
|----|-------|-------|
| 98 | The Aleph-Bet: Hebrew Alphabet Guide | No metadata — needs creation |
| 99 | What is the Messiah? | No metadata — needs creation |
| -- | Fix duplicate articles in articles.json | Remove 7 duplicate entries |
| -- | Final rebuild + verify all 115 articles load | Full test |

## Process for Each Batch
1. **Chat update**: "Starting Batch X — [list of 5 articles]"
2. For each article:
   - Create/fix `metadata.json` with proper id, title, section, tags, description
   - Move files to correct top-level directory if needed
   - Ensure bibliography-index.json entry has translated description
3. Run `npx tsx scripts/generate-articles-json.ts` to rebuild
4. Run `node scripts/build-bibliography.js` to rebuild index
5. Validate JSON: `node -e "JSON.parse(...)"`
6. Run `npm run build` to verify no errors
7. **Chat update**: "Batch X complete — [count] articles now live. Moving to Batch Y."
8. Commit, push, create PR, merge to main
9. **Chat update**: "Batch X deployed. Verify at [URL]."

## Also Fix: Build Script
Update `scripts/generate-articles-json.ts` to:
- Also scan `projects/torah-light/` subdirectories
- Handle articles without metadata.json by creating minimal entries
- De-duplicate articles by ID (keep the one with most content)

## Expected Result
- **115+ unique articles** on the website (up from 71)
- All articles have proper metadata, tags, and trilingual descriptions
- No duplicate entries
- Bibliography index is complete and accurate
