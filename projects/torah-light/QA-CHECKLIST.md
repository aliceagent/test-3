# Torah Light QA Checklist

## Requirements (All Must Pass)

### 1. Three Languages Present
- [ ] `article-en.md` exists
- [ ] `article-zh.md` exists  
- [ ] `article-he.md` exists

### 2. Chinese Translation Quality
- [ ] article-zh.md has minimum 800 Chinese characters
- [ ] It's a FULL translation, not a summary
- Count with: `grep -o '[\u4e00-\u9fff]' article-zh.md | wc -l`

### 3. Header Image Description
- [ ] DALL-E prompt present after title, before introduction
- [ ] Describes Chinese brushstroke/shan shui (山水) style
- [ ] Relevant to article content

### 4. Chinese Dynasty References (EN and ZH only)
- [ ] Historical periods include Chinese dynasty equivalents
- [ ] Format: "period — during China's [Dynasty] (中文, dates)"
- Keywords to check for: 商朝, 周朝, 汉朝, 宋朝, 明朝, etc.

### 5. Tags Section
- [ ] Tags section exists at end of article
- [ ] Contains English hashtags
- [ ] Contains Chinese/Hebrew hashtags where applicable

### 6. Bibliography
- [ ] Bibliography section exists
- [ ] All entries have clickable URLs
- [ ] ALL URLs return 200 status (CRITICAL)
- Verify with: `curl -sI "<url>" | grep "HTTP/"`

### 7. metadata.json
- [ ] File exists
- [ ] Contains: title, section, article_id

### 8. Three-Language Consistency
- [ ] All three versions have same major sections
- [ ] Bibliography consistent across versions

---

## QA Agent Instructions

For each article folder:

1. **Check files exist**: ls the folder for all 4 required files
2. **Count Chinese chars**: `cat article-zh.md | grep -o '.' | grep -E '[\x{4e00}-\x{9fff}]' | wc -l` (must be ≥800)
3. **Check header image**: grep for "DALL-E" or "Header Image" in first 50 lines
4. **Check dynasty refs**: grep for dynasty keywords (商朝|周朝|汉朝|春秋|战国|宋|明|唐)
5. **Check tags**: grep for "## Tags" or "#" patterns at end
6. **Verify URLs**: Extract all http(s) URLs from bibliography, curl each one
7. **Check metadata.json**: Verify JSON is valid and has required fields

## Output Format

```json
{
  "article_id": "041",
  "article_path": "holidays/041-rosh-hashana",
  "status": "PASS" | "FAIL",
  "checks": {
    "files_exist": true/false,
    "chinese_chars": 1234,
    "chinese_chars_pass": true/false,
    "header_image": true/false,
    "dynasty_refs": true/false,
    "tags_section": true/false,
    "urls_verified": true/false,
    "dead_urls": [],
    "metadata_json": true/false
  },
  "issues": ["list of specific issues to fix"]
}
```

## Fixes Required

If an article fails QA:
1. Create fix task with specific issues
2. Spawn fix agent with targeted instructions
3. Re-run QA after fix
4. Only mark complete when all checks pass
