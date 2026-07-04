# AI Operating System — Jonathan Caras

Built by analyzing the full claude.ai export (216 conversations), design chats,
Projects, account memory, Claude Code environments/triggers, Drive artifacts, and
repo histories. See `USAGE_ANALYSIS.md` for the evidence.

## What's here

```
ai-os/
  USAGE_ANALYSIS.md        # How this account actually uses Claude (the study)
  OPUS_SYSTEM_PROMPT.md    # Paste-in context so Opus ≈ 90% of Fable on routine work
  README.md                # This file
  skills/
    website-baseline/      # Finishing checklist for every site (the skill you asked
    pitch-deck/            #   for on 2026-06-22 and never built)
    competitive-landscape/
    chinese-learning/
    voice-agent-script/
    anonymize-docs/
    doc-cleanup/
```

## How to install

**Claude Code (any machine):** copy the skill folders into `~/.claude/skills/` for
global use, or a repo's `.claude/skills/` for per-project use:

```bash
cp -r ai-os/skills/* ~/.claude/skills/
```

**claude.ai / Cowork:** Settings → Capabilities → Skills → upload each skill folder
(each `SKILL.md` is self-contained). Or paste `OPUS_SYSTEM_PROMPT.md` into a
Project's instructions and keep the skills as project knowledge docs.

**Model routing rule of thumb:**
- Opus + these skills → decks, docs, scripts, anonymization, Chinese content,
  website builds, competitor reports. (~80% of your historical volume.)
- Fable → orchestration (your bolt-buddies pipeline pattern), architecture,
  deep research, high-stakes strategy.

## Maintenance

When you catch yourself re-typing an instruction for the second time in a week,
it belongs in a skill. Add it to the relevant `SKILL.md` and re-upload/re-copy —
that's the whole system.
