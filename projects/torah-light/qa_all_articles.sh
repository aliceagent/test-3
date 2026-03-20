#!/bin/bash
# Comprehensive QA for all 100 Torah Light articles

REPO_DIR="/Users/agentcaras/.openclaw/workspace/projects/torah-light/repo"
RESULTS_FILE="/Users/agentcaras/.openclaw/workspace/projects/torah-light/qa-results.json"

echo "{"
echo '  "qa_date": "'$(date -Iseconds)'",'
echo '  "articles": ['

TOTAL=0
PASSED=0
FAILED=0
ISSUES_LIST=""
FIRST=1

# Find all article directories (those containing article-en.md)
for en_file in $(find "$REPO_DIR" -name "article-en.md" -type f 2>/dev/null | sort); do
    DIR=$(dirname "$en_file")
    FOLDER_NAME=$(basename "$DIR")
    SECTION=$(basename $(dirname "$DIR"))
    
    TOTAL=$((TOTAL + 1))
    
    # Check files exist
    HAS_EN=false
    HAS_ZH=false
    HAS_HE=false
    HAS_META=false
    
    [ -f "$DIR/article-en.md" ] && HAS_EN=true
    [ -f "$DIR/article-zh.md" ] && HAS_ZH=true
    [ -f "$DIR/article-he.md" ] && HAS_HE=true
    [ -f "$DIR/metadata.json" ] && HAS_META=true
    
    # Count Chinese chars
    ZH_CHARS=0
    if [ "$HAS_ZH" = true ]; then
        ZH_CHARS=$(cat "$DIR/article-zh.md" 2>/dev/null | perl -CSD -ne 'print' | grep -oE '[\x{4e00}-\x{9fff}]' | wc -l | tr -d ' ')
    fi
    ZH_PASS=false
    [ "$ZH_CHARS" -ge 800 ] && ZH_PASS=true
    
    # Check header image
    HAS_HEADER=false
    if grep -qi "dall-e\|header image\|image prompt\|illustration" "$DIR/article-en.md" 2>/dev/null | head -1; then
        HAS_HEADER=true
    fi
    # Alternative check for image block at start
    if head -30 "$DIR/article-en.md" 2>/dev/null | grep -qi "山水\|brushstroke\|chinese.*art\|watercolor\|ink"; then
        HAS_HEADER=true
    fi
    
    # Check dynasty refs in EN
    HAS_DYNASTY_EN=false
    if grep -qE "Dynasty|朝|商|周|汉|唐|宋|元|明|清|秦|战国|春秋" "$DIR/article-en.md" 2>/dev/null; then
        HAS_DYNASTY_EN=true
    fi
    
    # Check tags
    HAS_TAGS=false
    if grep -qi "## tags\|#torah\|#jewish\|#犹太\|#תורה" "$DIR/article-en.md" 2>/dev/null; then
        HAS_TAGS=true
    fi
    
    # Check bibliography and URLs
    HAS_BIBLIO=false
    DEAD_URLS=""
    if grep -qi "bibliography\|references\|sources\|further reading" "$DIR/article-en.md" 2>/dev/null; then
        HAS_BIBLIO=true
    fi
    
    # Collect issues
    ISSUES=""
    [ "$HAS_EN" = false ] && ISSUES="$ISSUES missing article-en.md;"
    [ "$HAS_ZH" = false ] && ISSUES="$ISSUES missing article-zh.md;"
    [ "$HAS_HE" = false ] && ISSUES="$ISSUES missing article-he.md;"
    [ "$ZH_PASS" = false ] && ISSUES="$ISSUES Chinese too short ($ZH_CHARS chars);"
    [ "$HAS_META" = false ] && ISSUES="$ISSUES missing metadata.json;"
    
    # Determine pass/fail
    STATUS="FAIL"
    if [ "$HAS_EN" = true ] && [ "$HAS_ZH" = true ] && [ "$HAS_HE" = true ] && [ "$ZH_PASS" = true ]; then
        STATUS="PASS"
        PASSED=$((PASSED + 1))
    else
        FAILED=$((FAILED + 1))
        ISSUES_LIST="$ISSUES_LIST\n$SECTION/$FOLDER_NAME: $ISSUES"
    fi
    
    # Output JSON
    [ $FIRST -eq 0 ] && echo ","
    FIRST=0
    
    echo "    {"
    echo "      \"path\": \"$SECTION/$FOLDER_NAME\","
    echo "      \"status\": \"$STATUS\","
    echo "      \"files\": { \"en\": $HAS_EN, \"zh\": $HAS_ZH, \"he\": $HAS_HE, \"meta\": $HAS_META },"
    echo "      \"zh_chars\": $ZH_CHARS,"
    echo "      \"has_header_image\": $HAS_HEADER,"
    echo "      \"has_dynasty_refs\": $HAS_DYNASTY_EN,"
    echo "      \"has_tags\": $HAS_TAGS,"
    echo "      \"has_bibliography\": $HAS_BIBLIO,"
    echo "      \"issues\": \"${ISSUES:-none}\""
    echo -n "    }"
done

echo ""
echo "  ],"
echo "  \"summary\": {"
echo "    \"total\": $TOTAL,"
echo "    \"passed\": $PASSED,"
echo "    \"failed\": $FAILED,"
echo "    \"pass_rate\": \"$(echo "scale=1; $PASSED * 100 / $TOTAL" | bc)%\""
echo "  }"
echo "}"
