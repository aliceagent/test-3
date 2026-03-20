#!/usr/bin/env python3
"""Comprehensive QA for all 100 Torah Light articles"""

import os
import json
import re
from pathlib import Path
from datetime import datetime

REPO_DIR = Path("/Users/agentcaras/.openclaw/workspace/projects/torah-light/repo")

def count_chinese_chars(text):
    """Count Chinese characters in text"""
    return len(re.findall(r'[\u4e00-\u9fff]', text))

def check_article(article_dir):
    """Check a single article directory"""
    result = {
        "path": str(article_dir.relative_to(REPO_DIR)),
        "status": "FAIL",
        "files": {"en": False, "zh": False, "he": False, "meta": False},
        "zh_chars": 0,
        "issues": []
    }
    
    # Check files exist
    en_file = article_dir / "article-en.md"
    zh_file = article_dir / "article-zh.md"
    he_file = article_dir / "article-he.md"
    meta_file = article_dir / "metadata.json"
    
    result["files"]["en"] = en_file.exists()
    result["files"]["zh"] = zh_file.exists()
    result["files"]["he"] = he_file.exists()
    result["files"]["meta"] = meta_file.exists()
    
    if not result["files"]["en"]:
        result["issues"].append("missing article-en.md")
    if not result["files"]["zh"]:
        result["issues"].append("missing article-zh.md")
    if not result["files"]["he"]:
        result["issues"].append("missing article-he.md")
    if not result["files"]["meta"]:
        result["issues"].append("missing metadata.json")
    
    # Count Chinese chars
    if zh_file.exists():
        try:
            zh_content = zh_file.read_text(encoding='utf-8')
            result["zh_chars"] = count_chinese_chars(zh_content)
            if result["zh_chars"] < 800:
                result["issues"].append(f"Chinese too short ({result['zh_chars']} chars, need 800+)")
        except Exception as e:
            result["issues"].append(f"Error reading Chinese file: {e}")
    
    # Check EN for header image, dynasty refs, tags, bibliography
    if en_file.exists():
        try:
            en_content = en_file.read_text(encoding='utf-8')
            
            # Header image check
            first_50_lines = '\n'.join(en_content.split('\n')[:50])
            if not re.search(r'(DALL-E|Header Image|image prompt|illustration|山水|brushstroke)', first_50_lines, re.I):
                result["issues"].append("missing header image description")
            
            # Dynasty refs
            if not re.search(r'(Dynasty|朝|商|周|汉|唐|宋|元|明|清|秦|战国|春秋)', en_content):
                result["issues"].append("missing dynasty references")
            
            # Tags
            if not re.search(r'(## Tags|#torah|#jewish|#犹太|#תורה)', en_content, re.I):
                result["issues"].append("missing tags section")
            
            # Bibliography
            if not re.search(r'(Bibliography|References|Sources|Further Reading)', en_content, re.I):
                result["issues"].append("missing bibliography")
                
        except Exception as e:
            result["issues"].append(f"Error reading English file: {e}")
    
    # Determine pass/fail - core requirements
    core_pass = (
        result["files"]["en"] and 
        result["files"]["zh"] and 
        result["files"]["he"] and 
        result["zh_chars"] >= 800
    )
    
    if core_pass:
        result["status"] = "PASS"
    
    return result

def find_all_articles():
    """Find all article directories"""
    articles = []
    for md_file in REPO_DIR.rglob("article-en.md"):
        articles.append(md_file.parent)
    return sorted(set(articles))

def main():
    articles = find_all_articles()
    results = []
    passed = 0
    failed = 0
    
    for article_dir in articles:
        result = check_article(article_dir)
        results.append(result)
        if result["status"] == "PASS":
            passed += 1
        else:
            failed += 1
    
    # Output summary
    print(f"\n{'='*60}")
    print(f"TORAH LIGHT QA REPORT - {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"{'='*60}\n")
    
    print(f"📊 SUMMARY: {passed}/{len(results)} articles passed ({100*passed//len(results) if results else 0}%)\n")
    
    if failed > 0:
        print(f"❌ FAILED ARTICLES ({failed}):\n")
        for r in results:
            if r["status"] == "FAIL":
                issues = "; ".join(r["issues"]) if r["issues"] else "unknown"
                print(f"  • {r['path']}")
                print(f"    Issues: {issues}")
                print(f"    ZH chars: {r['zh_chars']}")
                print()
    
    print(f"\n✅ PASSED ARTICLES ({passed}):")
    for r in results:
        if r["status"] == "PASS":
            print(f"  • {r['path']} ({r['zh_chars']} ZH chars)")
    
    # Save detailed JSON
    output = {
        "qa_date": datetime.now().isoformat(),
        "summary": {
            "total": len(results),
            "passed": passed,
            "failed": failed,
            "pass_rate": f"{100*passed//len(results)}%" if results else "0%"
        },
        "articles": results
    }
    
    output_path = REPO_DIR.parent / "qa-results.json"
    with open(output_path, 'w') as f:
        json.dump(output, f, indent=2)
    print(f"\n📄 Detailed results saved to: {output_path}")

if __name__ == "__main__":
    main()
