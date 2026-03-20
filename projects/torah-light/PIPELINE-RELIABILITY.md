# Torah Light Pipeline Reliability Guide

**Created**: 2026-03-17
**Updated**: 2026-03-17 20:50 - Architecture v2

---

## Architecture v2: The Fix

**Separation of concerns:**

| Component | Responsibility | Git Access |
|-----------|---------------|------------|
| Workers | Write files ONLY | ❌ NONE |
| Main Session | Commit/push batches, spawn workers | ✅ Full |
| Pipeline Cron | Trigger main session every 5 min | N/A |

**Why this works:**
- No git conflicts (only main session touches git)
- No spawn limits (main session has no child limit)
- No silent failures (systemEvent triggers main directly)
- Uncommitted work gets committed on next check

**Cron ID:** `77e96dfe-dc5c-4b70-93bb-c6c86690bfb9`

**Worker template:** `/Users/agentcaras/.openclaw/workspace/projects/torah-light/WORKER-INSTRUCTIONS.md`

---

## What Went Wrong (Post-Mortem v1)

### Root Causes
1. **Cron session spawn limit**: Isolated cron sessions have a 5-child limit, but we targeted 8 parallel writers
2. **Phantom agents**: progress.json showed "6 in_progress" when actually 0 agents were running
3. **Gateway overload**: Repeated failed spawn attempts (every 5 min) flooded the gateway
4. **Stale state**: Cron trusted progress.json instead of verifying actual agent status
5. **No ground truth**: Never verified by counting actual files in repo

### Timeline
- 13:35 - Last successful article completion
- 13:35 to 15:18 - Pipeline reported "5-6 in progress" while 0 agents ran
- ~2 hours lost

---

## Prevention Rules

### Rule 1: NEVER Spawn from Cron Sessions
Cron sessions have `maxActiveChildren: 5` limit. Spawning from cron will hit this limit.

**Instead:**
- Use cron to DETECT issues and ALERT
- Use `sessions_send` to request main session spawn writers
- Or have cron call a script that uses the CLI

```
# BAD (cron spawning directly)
sessions_spawn(label='torah-writer-X', ...)

# GOOD (cron alerts main session)
sessions_send(sessionKey='agent:main:main', message='Spawn 3 writers for articles 74-76')
```

### Rule 2: Verify Before Reporting
Before sending any progress update, verify ground truth:

```bash
# Count actual article files
find /path/to/repo -name "article-en.md" -type f | wc -l
```

**Never trust progress.json alone** - it can be stale or corrupted.

### Rule 3: Check Agent Status Before Spawning
Before attempting to spawn new agents:

```
1. Call `subagents list` to get ACTUAL running count
2. If count is 0 but progress.json shows in_progress → ALERT, don't spawn more
3. Wait for gateway health before batch spawns
```

### Rule 4: Rate Limit Spawns
Gateway can get overwhelmed by rapid spawn requests.

- **Max 3 spawns per cycle** (not 6-8)
- **Wait 2-3 seconds between spawns** if doing manually
- **If spawn fails with timeout**: Stop and investigate, don't retry immediately

### Rule 5: Main Session Owns Production Spawns
All production article writers should be spawned from **main session**, not cron sessions.

- Main session has higher/no child limits
- Completion events route back to main session
- Easier to monitor and intervene

### Rule 6: Include Health Check in Progress Updates
Every progress update must include:

```
1. Actual file count in repo (ground truth)
2. subagents list count (actual running)
3. progress.json counts (may be stale)
4. If mismatch → flag and investigate
```

### Rule 7: Atomic Progress Updates
When marking article complete:

```
1. Verify files exist at correct path
2. Verify git commit succeeded
3. THEN update progress.json
4. If any step fails → don't mark complete
```

---

## Recommended Pipeline Architecture

### Option A: Main Session Direct (Simple)
```
Main Session
├── Spawns writers directly
├── Receives completion events
├── Spawns replacements on completion
└── No cron needed for spawning
```

### Option B: Cron Monitor + Main Session Spawner (Robust)
```
Monitor Cron (every 15 min)
├── Reads progress.json
├── Counts actual files in repo
├── Calls subagents list
├── If mismatch OR stalled → sends alert to main session
└── NEVER spawns directly

Main Session
├── Receives alerts from cron
├── Spawns replacement writers
├── Handles all production work
└── Updates progress.json
```

### Option C: Script-Based Runner (Most Reliable)
```bash
# torah-light-runner.sh
while [ $COMPLETED -lt 100 ]; do
  RUNNING=$(openclaw sessions list --filter="torah-writer" --count)
  if [ $RUNNING -lt 5 ]; then
    NEXT=$(get_next_pending_article)
    openclaw sessions spawn --task="Write article $NEXT" --timeout=900
  fi
  sleep 300
done
```

---

## Rule 8: Two Identical Updates = INVESTIGATE

If you see two progress updates in a row with no change (e.g., "55/100" twice in 15 minutes):

**DO NOT** send another update with the same numbers.

**IMMEDIATELY:**
1. Run `subagents list` — are agents actually running?
2. Count files: `find repo -name "article-en.md" | wc -l`
3. If 0 agents but work remains → spawn from main session
4. Alert J: "⚠️ Pipeline was stalled (0 agents running). Respawned X writers."

**This is a bug, not normal operation.** 10 articles/hour means ~2-3 completions per 15 minutes. Zero progress = something broke.

---

## Quick Reference: When Pipeline Stalls

1. **Check actual agents**: `subagents list`
2. **Check actual files**: `find repo -name "article-en.md" | wc -l`
3. **If 0 agents but work remains**: Spawn from main session
4. **If gateway timeout**: Restart gateway, wait 30s, try single spawn
5. **If cron is causing issues**: Disable it (`cron update --enabled=false`)

---

## Monitoring Checklist

Before stepping away from pipeline:

- [ ] `subagents list` shows expected number of active writers
- [ ] Last completion was < 15 min ago
- [ ] File count matches progress.json completed count
- [ ] No gateway timeouts in recent spawns
- [ ] Cron (if enabled) is monitoring-only, not spawning

---

## Lesson Learned

> "A monitoring cron that spawns agents is not monitoring - it's a second control plane competing with the main session. Keep control in one place."

