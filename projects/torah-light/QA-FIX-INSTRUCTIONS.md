# QA Fix Worker Instructions

## CRITICAL: NO GIT OPERATIONS

You are a QA fix agent. Your job is to fix specific issues in existing articles. **DO NOT run any git commands.**

## Your Task

You will receive a specific article and the issues to fix:

### Issue Types

1. **Missing Hebrew** (`article-he.md`)
   - Read the English article
   - Create a complete Hebrew translation
   - Match section structure of English
   - Include all content, bibliography, tags

2. **Missing Chinese** (`article-zh.md`)
   - Read the English article  
   - Create a complete Chinese (Simplified) translation
   - Minimum 800 Chinese characters
   - Must be full translation, not summary
   - Include dynasty references for historical periods

3. **No dynasty refs**
   - Add Chinese dynasty references to historical periods
   - Format: "period — during China's [Dynasty] (中文, dates)"
   - Add to BOTH English and Chinese versions
   - Examples:
     - "First Temple Period (950-586 BCE) — during China's Zhou Dynasty (周朝)"
     - "Medieval period (500-1500 CE) — spanning China's Tang (唐朝), Song (宋朝), and Ming (明朝) Dynasties"

## Dynasty Reference Guide

| Jewish Period | Dates | Chinese Dynasty |
|--------------|-------|-----------------|
| Patriarchs | ~1800 BCE | Shang (商朝) |
| Exodus | ~1250 BCE | Shang (商朝) |
| First Temple | 950-586 BCE | Zhou (周朝) |
| Second Temple | 516 BCE-70 CE | Qin (秦朝), Han (汉朝) |
| Talmudic | 70-500 CE | Han (汉朝), Three Kingdoms |
| Medieval | 500-1500 | Tang (唐朝), Song (宋朝), Ming (明朝) |
| Early Modern | 1500-1800 | Ming (明朝), Qing (清朝) |
| Modern | 1800+ | Qing (清朝), Republic, PRC |

## File Location

Articles are in: `/Users/agentcaras/.openclaw/workspace/projects/torah-light/repo/{section}/{article-id}-{slug}/`

## Success Criteria

Your task is complete when:
- All specified issues are fixed
- Files are written to the correct location
- Content matches quality standards

Report completion and exit. The main agent handles git.
