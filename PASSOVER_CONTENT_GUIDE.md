# Passover Content Guide — Torah Light Platform

## Overview

This guide directs an agent to produce a comprehensive Passover (Pesach) section for the Torah Light bilingual learning platform. All articles must be written from an **Orthodox Jewish perspective**, be accessible to Mandarin-speaking learners encountering Passover for the first time, and be produced in **English, Simplified Chinese (zh), and Hebrew (he)**.

Each article should be stored in the `passover-seder` section and follow the existing article JSON schema:

```json
{
  "id": <number>,
  "section": "passover-seder",
  "title_en": "...",
  "title_zh": "...",
  "title_he": "...",
  "body_en": "... (markdown)",
  "body_zh": "... (markdown)",
  "body_he": "... (markdown)"
}
```

Use IDs starting from **1400** for new articles to avoid collisions with existing content.

---

## Required Articles

### Article 1: How to Run a Passover Seder — Step-by-Step Guide

**File reference**: `passover-seder/1400-how-to-run-a-seder`

**Content requirements**:
- Walk through all **15 steps of the Seder** in order: Kadesh, Urchatz, Karpas, Yachatz, Maggid, Rachtzah, Motzi, Matzah, Maror, Korech, Shulchan Orech, Tzafun, Barech, Hallel, Nirtzah.
- For each step: explain what is done, what is said (include key Hebrew phrases with transliteration and Chinese translation), and the spiritual significance.
- Include practical tips: timing, who leads, when to lean left, how much matzah/maror to eat (shiurim in approximate measurements), how many cups of wine and when.
- Note differences between **first night and second night** (outside Israel both nights are observed; in Israel only one Seder).
- Mention that a **Haggadah** is followed — recommend having one per guest.
- Tone: warm, instructive, assume the reader has never attended a Seder before.

### Article 2: Divrei Torah for the Seder Table — A Collection

**File reference**: `passover-seder/1401-divrei-torah-seder-table`

**Content requirements**:
- Provide **8–10 short Divrei Torah** (Torah insights) suitable for sharing aloud at the Seder table.
- Each Dvar Torah should be 150–300 words, self-contained, and tied to a theme of Pesach: freedom, faith, gratitude, redemption, the Exodus narrative, matzah, maror, the four sons, etc.
- Draw from a range of classical sources: Chumash, Midrash, Talmud, Rambam, Maharal, Sfas Emes, Rav Kook, Chafetz Chaim, and Chassidic masters.
- For each Dvar Torah, include:
  - A short title (e.g., "Why We Start With Shame")
  - The source text or verse in Hebrew with transliteration
  - The insight explained clearly
  - A discussion question guests can talk about at the table
- Arrange them roughly in Seder order so the reader can share them at the appropriate moment during the meal.

### Article 3: Cleaning the House for Pesach — A Practical Guide

**File reference**: `passover-seder/1402-cleaning-house-pesach`

**Content requirements**:
- Explain the **halachic obligation** to remove chametz (leavened bread and products) from one's home before Pesach, citing the Torah source (Shemot 12:15, 13:7).
- Define what chametz is: the five grains (wheat, barley, spelt, rye, oats) mixed with water and left to rise for 18+ minutes. Distinguish chametz from **kitniyot** (legumes/rice — Ashkenazi stringency vs. Sephardi practice).
- Provide a **room-by-room cleaning guide**: kitchen (the most intensive — kashering counters, ovens, sinks, or covering them; switching dishes), bedrooms, living areas, car, office, bags/pockets, children's rooms and toys.
- Clarify what is and isn't required: Pesach cleaning is **not** spring cleaning — the goal is removing edible chametz, not achieving spotless perfection. Dust is not chametz. Dirt is not chametz. Quote the common saying.
- Cover **selling chametz (mechirat chametz)**: explain the halachic sale through a rabbi, what can be sold vs. what must be destroyed, and the sealed-off cabinet method.
- Include a **suggested timeline**: when to start (2–4 weeks before), daily/weekly milestones, and final tasks the day before Pesach.

### Article 4: Bedikat Chametz — Checking for Chametz

**File reference**: `passover-seder/1403-bedikat-chametz`

**Content requirements**:
- Explain the mitzvah of **bedikat chametz** (the search for chametz) performed on the **night before Erev Pesach** (14th of Nisan, after nightfall).
- Detail the procedure step by step:
  1. Say the **bracha**: "…al bi'ur chametz" (include Hebrew text, transliteration, and Chinese translation).
  2. Search by **candlelight** (or flashlight) with a candle, feather, wooden spoon, and paper bag (explain each item's role and the minhag of placing 10 pieces of bread).
  3. After the search, recite the **Kol Chamira** declaration (Aramaic nullification formula — include text, transliteration, and translation). Explain that this nullifies any chametz not found.
  4. The next morning: **bi'ur chametz** — burn the collected chametz and recite the second Kol Chamira declaration (broader nullification of all chametz).
- Explain the halachic reasoning: why searching isn't enough (we might miss some), why nullification isn't enough (we might eat chametz we find later), and why we need both.
- Cover edge cases: What if Erev Pesach falls on Shabbat? (Search is done Thursday night.) What about someone who will be away for Pesach?
- Tone: make the ritual feel meaningful and even fun (especially for families with children).

### Article 5: The Cup of Elijah — Why We Pour a Cup for Eliyahu HaNavi

**File reference**: `passover-seder/1404-cup-of-elijah`

**Content requirements**:
- Describe the custom: after Birkat HaMazon (Grace After Meals), a special cup of wine is poured for **Eliyahu HaNavi** (Elijah the Prophet) and the door is opened.
- Explain the **Talmudic background**: the four cups of wine correspond to four expressions of redemption in Shemot 6:6–7. There is a fifth expression ("v'heiveiti" — "and I will bring you"), and a dispute whether this warrants a fifth cup. Elijah, who will resolve all unresolved halachic questions, will settle this — so we pour the cup but do not drink it.
- Discuss **who Elijah is**: the prophet from Melachim (Kings) who never died but ascended to heaven in a chariot of fire, and who tradition says visits every Brit Milah and every Seder. He is the herald of the Mashiach (Messiah).
- Explain the **spiritual symbolism**: opening the door represents our faith and trust in God's protection on this night of guarding (Leil Shimurim). It also expresses our yearning for the final redemption.
- Mention the custom of **Kos Miriam** (the Cup of Miriam) — a cup of water placed on the table in honor of Miriam's Well that sustained the Israelites in the desert. Note this is a newer custom, primarily in some communities.
- Include the text of **"Shfoch Chamatcha"** (the passage recited when opening the door) with transliteration and translation, and explain its context.

---

## Five Additional Articles for First-Time Celebrants

### Article 6: What to Buy — A First-Timer's Pesach Shopping List

**File reference**: `passover-seder/1405-pesach-shopping-list`

**Content requirements**:
- Comprehensive shopping checklist for someone making Pesach for the first time.
- Cover: matzah (shmurah vs. regular, how much per person), wine/grape juice (enough for 4 cups per person per Seder), maror (romaine lettuce and/or horseradish), charoset ingredients, karpas (parsley/celery), zeroa (shank bone) and beitzah (roasted egg) for the Seder plate, salt water.
- Kosher-for-Passover staples: cooking oil, potato starch, sugar, spices, meat, chicken, fish, fruits, vegetables, dairy, snacks.
- Explain the **"Kosher for Passover" label** — what the hechsher/certification means, why regular kosher isn't sufficient.
- Note kitniyot considerations (Ashkenazi vs. Sephardi).
- Tips for shopping in areas with limited kosher availability (online ordering, what can be used without special certification like plain fresh fruits and vegetables).

### Article 7: The Seder Plate — What Goes on It and Why

**File reference**: `passover-seder/1406-seder-plate-explained-deep`

**Content requirements**:
- Detailed explanation of each item on the **ke'arah** (Seder plate): zeroa, beitzah, maror, charoset, karpas, chazeret.
- For each item: what it represents, how to prepare it, where it sits on the plate (include a diagram description referencing the Arizal's arrangement), and any relevant halachot.
- Explain the **three matzot** placed near/under the plate and their symbolism (Kohen, Levi, Yisrael).
- Discuss how the arrangement reflects kabbalistic concepts (briefly, accessibly).

### Article 8: The Four Questions (Mah Nishtanah) — Text, Meaning, and How to Teach Children

**File reference**: `passover-seder/1407-four-questions-deep`

**Content requirements**:
- Full text of Mah Nishtanah in Hebrew, transliteration, English, and Chinese.
- Explanation of each question and its answer from the Haggadah.
- Why the youngest child asks — the pedagogical philosophy of the Seder as a teaching experience.
- Tips for parents: how to help children learn the questions, how to make the Seder engaging for kids of different ages.
- Musical/melodic tradition notes (common tunes).

### Article 9: What Is the Haggadah? — A Guide to the Text We Read at the Seder

**File reference**: `passover-seder/1408-what-is-the-haggadah`

**Content requirements**:
- Explain what the Haggadah is: the text that guides the Seder, compiled over centuries.
- Brief history: Mishnaic origins (Pesachim ch. 10), Talmudic elaborations, medieval additions, printed editions.
- Walk through the structure and major sections: Kadesh through Nirtzah, with attention to Maggid (the storytelling core).
- The role of commentary: why there are thousands of Haggadah editions with different commentaries.
- Recommend approachable Haggadot for beginners (mention a few well-known ones without commercial endorsement).

### Article 10: Chol HaMoed and the Last Days — What Happens After the Seder

**File reference**: `passover-seder/1409-chol-hamoed-last-days`

**Content requirements**:
- Explain the structure of Pesach: first day(s) Yom Tov → Chol HaMoed (intermediate days) → last day(s) Yom Tov.
- What is permitted and restricted during Chol HaMoed (melacha guidelines, spirit of the holiday).
- **Shvi'i shel Pesach** (7th day): the miracle of the splitting of the Red Sea — why this day is significant, the custom of staying up to recite Shirat HaYam, the minhag of pouring water on the floor.
- **Sefirat HaOmer**: counting begins on the second night of Pesach — brief introduction, link to Shavuot.
- Transition out of Pesach: when chametz becomes permitted again (after nightfall + time for the rabbi's chametz to be "bought back"), the custom of eating chametz immediately, **Mimouna** celebration (Sephardi/Moroccan tradition).

---

## Writing Guidelines for the Agent

1. **Voice**: Authoritative but warm. Write as a knowledgeable Orthodox Jewish teacher speaking to an eager, intelligent student who may have zero background.
2. **Halachic standard**: Follow mainstream Orthodox halacha. Where Ashkenazi and Sephardi practices differ, present both and label them clearly.
3. **Transliteration**: Use Ashkenazi-style transliteration for liturgical terms (e.g., "Shabbos" is acceptable but "Shabbat" is also fine — be consistent within each article). Always include the Hebrew original.
4. **Chinese translation**: The `zh` version should be a true localization, not a mechanical translation. Use natural Mandarin. Translate Hebrew/Aramaic terms on first use and keep the transliteration in parentheses for reference.
5. **Hebrew version**: Write naturally in modern Hebrew. Include nikud (vowel points) for biblical and liturgical quotations.
6. **Markdown formatting**: Use headers (##, ###), bullet points, numbered lists, and blockquotes for source texts. Keep paragraphs short for mobile readability.
7. **Length**: Each article should be **1,000–2,500 words** in the English version. Chinese and Hebrew may be slightly shorter or longer as natural expression requires.
8. **Cross-references**: Where relevant, link to other Torah Light articles (e.g., "See our article on Shabbat for more on the concept of sacred time").
9. **Sensitivity**: Remember that readers may be non-Jewish, newly observant, or exploring Judaism from a Chinese cultural context. Be welcoming, never condescending. Avoid assuming prior knowledge of any Jewish concept without explaining it.
10. **Existing content**: Articles already exist in the `passover-seder` section (IDs 047, 048, 144, 145, 149, 452–460). Review them to avoid heavy duplication. Where overlap exists (e.g., the Seder plate), go deeper or take a different angle than the existing article.
