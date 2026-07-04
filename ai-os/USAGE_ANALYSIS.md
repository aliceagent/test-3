# How This Account Actually Uses Claude
*Analysis of the full claude.ai data export (216 conversations, Dec 2024 – Jun 2026), 19 design chats, Projects, account memory, Claude Code environments/triggers, Drive artifacts, and repo histories. Generated 2026-07-04.*

## Volume and trajectory

| Period | Conversations | What was happening |
|---|---|---|
| Dec 2024 – Feb 2025 | 3 | Trying Claude out |
| Mar 2025 | 33 | Game-dev experimentation burst (flappy bird, mazes, dungeon games) |
| Apr – Dec 2025 | 25 | Crypto/DeFi product mockups (Levana, Sailor Lend), HSK apps |
| Jan – Apr 2026 | 61 | Equity Earn ramp: SAFEs, legal, market sizing, decks |
| **May – Jun 2026** | **90** | **NewVoices role + peak usage: 42% of all-time volume in 2 months** |

Design chats (deck/visual work): 19, all Apr–Jun 2026 — one every ~3 days lately.
Claude Code: two remote environments ("Default", "New Voices"), an hourly autonomous
sprint-pipeline trigger (Fable reviews, Opus executes), and repo histories showing
industrial-scale batch content production (Torah Light: 500-article trilingual pipeline).

## Usage categories, by share of conversations

1. **Venture/business operations (~35%)** — NewVoices (voice-agent demo scripts,
   Heineken/Grab pitches, churn dashboards, sales strategy, CMO contact hunting),
   Equity Earn (SAFE drafting, RSU market sizing, legal quote comparison, REIT
   directory extraction, capital-flow structures, LinkedIn warm paths), plus
   investing research (BTC treasuries, peptides, longevity, Abraham Accords).
2. **Decks, docs & data chores (~20%)** — "put this into a pitch deck", "make this
   look nicer", org charts, roadmaps, spreadsheet cleanups for Monday.com,
   anonymizing statements/portfolios (often driven by Carla), PDF merging/format
   conversion.
3. **Chinese learning content (~12%)** — HSK 2/3 vocab lists, quiz websites,
   parallel-text files with exact repetition formats, subtitle extraction/shifting,
   the "十种…" YouTube series (50-topic planning, ~1,000 vocab words).
4. **Family & education (shared account, ~12%)** — kids' math/physics homework in
   Hebrew, worksheets, exam prep; wife's Brazil trip planning and rental contracts
   in Portuguese; Carla operating on Jonathan's behalf ("this is carla").
5. **Games & creative (~10%)** — browser games, D&D AI dungeon-master design,
   game music, retro racing polish loops.
6. **Jewish learning & community (~6%)** — Gemara summaries with mefarshim,
   World Center for Chinese Jews business plan, kosher workshop materials.
7. **Claude meta/tooling (~5%)** — CLI install, OpenClaw errors, cowork setup,
   permissions auto-approve, API keys, device sync. Notably conversation #205
   (2026-06-22): *"every website i make with claude code has a lot of the same
   overlap… how do i set up claude code with a skill"* — asked, never built.

## The five questions, answered

**1. What is Claude used for most?**
Running your ventures: research → strategy doc → deck → demo → outreach, on repeat.
NewVoices and Equity Earn dominate 2026. Second: transforming artifacts you already
have (notes→doc, doc→deck, sheet→clean sheet, script→client-specific script).

**2. What tasks repeat again and again?**
- Competitive-landscape research (≥6 times: funds, nursing homes, GEO, NewVoices B2B/B2C, voice agents)
- "Turn this into a pitch deck" / "make this look nicer" (≥8 times + 19 design chats)
- Chinese learning materials with precise output formats (≥10 times)
- Voice-agent script adaptation per client (Alpen → Heineken → MultiView → Grab)
- Anonymization/scrubbing of financial and legal documents (≥4 times)
- Website building with the same finishing checklist every time
- Cleaning raw meeting notes into structured Google Docs (the "Claude Instruction —---" header pattern)

**3. What instructions keep getting rewritten manually?**
- The Chinese text format spec ("English first, then Chinese twice, then English"; "no timestamps, no pinyin")
- Website finishing requirements (favicon, share card, mobile, no text overlap)
- Deck style direction (brand imagery, adventure/luxury aesthetics, bilingual needs)
- Anonymization rules (what to scrub, what structure to preserve)
- Voice-agent script conventions (objection handling, tone, call flow)
- Git/PR workflow in Claude Code (403 on main → PR flow) — Claude rediscovered this per session until it wrote itself MEMORY.md
- "Don't ask questions, decide and proceed" autonomy framing in trigger prompts
- Who's speaking: Carla vs. Jonathan vs. family members on a shared account

**4. What should become Skills?** → Built in `ai-os/skills/` (see README):
`website-baseline`, `pitch-deck`, `competitive-landscape`, `chinese-learning`,
`voice-agent-script`, `anonymize-docs`, `doc-cleanup`.

**5. What should Opus know?** → `OPUS_SYSTEM_PROMPT.md`: your ventures, people,
formats, defaults, and autonomy preferences distilled from the export, memory
profile, MEMORY.md, and the trigger prompt. With that context loaded, routine work
(categories 2, 3, and most of 1) doesn't need Fable; reserve Fable for
architecture, orchestration (the bolt-buddies pattern), deep research, and
judgment-heavy strategy.

## Notable single finding
You independently invented the "Fable orchestrates, Opus executes" pattern before
reading it in a post: the `bolt-buddies-pipeline-heartbeat` trigger has Fable
reviewing Opus sprint work against test gates on an hourly cron. The main gap is
that its rules (repo policy, review gates, authorship) live inside one giant
trigger prompt instead of reusable CLAUDE.md/Skill files — fixed by this package.
