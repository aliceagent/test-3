#!/usr/bin/env python3
"""
Import article folders into src/data/articles.json and src/data/bibliography-index.json.

Usage:
    python3 scripts/import_articles.py --dry-run          # Show what would be imported
    python3 scripts/import_articles.py --section holidays  # Import one section
    python3 scripts/import_articles.py --ids 43,49,136,137,138  # Import specific IDs
    python3 scripts/import_articles.py --all               # Import everything
"""

import json
import os
import sys
import glob
import argparse
from pathlib import Path

ROOT = Path(__file__).parent.parent
ARTICLES_JSON = ROOT / "src" / "data" / "articles.json"
BIBLIOGRAPHY_JSON = ROOT / "src" / "data" / "bibliography-index.json"

# Folders to skip
SKIP_DIRS = {'projects', 'node_modules', 'src', '.next', 'public', '.git', 'scripts', 'supabase'}

# Section name mapping (folder name -> website section slug)
SECTION_MAP = {
    'jewish-philosophy-big-questions': 'jewish-philosophy-big-questions',
    'practical-halacha-for-daily-life': 'practical-halacha-for-daily-life',
    'money-business': 'money-business',
    'jewish-values': 'jewish-values',
    'jewish-stories-and-inspiration': 'jewish-stories-and-inspiration',
    'jews-in-asia-expanded': 'jews-in-asia-expanded',
    'jewish-home': 'jewish-home',
    'ashkenazi-sephardi': 'ashkenazi-sephardi',
    # Keep all others as-is
}

# Next ID for articles without numeric IDs
NEXT_AUTO_ID = 500


def discover_articles():
    """Find all article folders at root level (section/ID-slug/)."""
    articles = []
    for md_path in sorted(glob.glob(str(ROOT / '*' / '*' / 'article-en.md'))):
        rel = os.path.relpath(md_path, ROOT)
        parts = rel.split(os.sep)
        if parts[0] in SKIP_DIRS:
            continue

        folder = os.path.dirname(md_path)
        section_dir = parts[0]
        article_dir = parts[1]

        # Check file size (skip tiny stubs)
        if os.path.getsize(md_path) < 100:
            continue

        # Extract ID from folder name
        id_part = article_dir.split('-', 1)[0]
        try:
            article_id = int(id_part)
        except (ValueError, IndexError):
            article_id = None

        articles.append({
            'folder': folder,
            'section_dir': section_dir,
            'article_dir': article_dir,
            'id': article_id,
        })

    # Also handle articles directly in section folder (e.g., ./philosophy/article-en.md)
    for md_path in sorted(glob.glob(str(ROOT / '*' / 'article-en.md'))):
        rel = os.path.relpath(md_path, ROOT)
        parts = rel.split(os.sep)
        if parts[0] in SKIP_DIRS:
            continue
        if os.path.getsize(md_path) < 100:
            continue

        folder = os.path.dirname(md_path)
        section_dir = parts[0]

        articles.append({
            'folder': folder,
            'section_dir': section_dir,
            'article_dir': section_dir,
            'id': None,
        })

    return articles


def read_file(path):
    """Read a file, return empty string if missing."""
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    except (FileNotFoundError, IOError):
        return ''


def load_metadata(folder):
    """Load metadata.json from article folder."""
    meta_path = os.path.join(folder, 'metadata.json')
    if not os.path.exists(meta_path):
        return {}
    try:
        with open(meta_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        # Handle case where metadata is a list
        if isinstance(data, list):
            return data[0] if data else {}
        return data
    except (json.JSONDecodeError, IOError):
        return {}


def get_title(meta, lang='en'):
    """Extract title from metadata (handles both string and dict formats)."""
    # Try title_en / title_zh / title_he format
    key = f'title_{lang}'
    if key in meta and meta[key]:
        return meta[key]

    # Try title: {en: ..., zh: ..., he: ...} format
    title = meta.get('title', '')
    if isinstance(title, dict):
        return title.get(lang, '')
    elif isinstance(title, str) and lang == 'en':
        return title

    return ''


def get_description(meta):
    """Extract description from metadata."""
    desc = meta.get('description', '')
    if isinstance(desc, dict):
        return desc
    elif isinstance(desc, str):
        return {'en': desc, 'zh': '', 'he': ''}
    return {'en': '', 'zh': '', 'he': ''}


def generate_tags(meta, section, title_en):
    """Generate tags from metadata fields when tags are missing."""
    tags = []
    # Add section as tag
    section_tag = section.replace('-', ' ').title().replace(' ', '')
    tags.append(section_tag)

    # Add key concepts
    for concept in meta.get('key_concepts', []):
        if isinstance(concept, str):
            # Take first few words as tag
            tag = concept.split(' - ')[0].strip()
            if len(tag) < 40:
                tags.append(tag)

    # Add from key_topics
    for topic in meta.get('key_topics', []):
        if isinstance(topic, str) and len(topic) < 40:
            tags.append(topic)

    # Add from talmudic_sources
    for src in meta.get('talmudic_sources', []):
        if isinstance(src, str):
            ref = src.split(' - ')[0].strip()
            if len(ref) < 40:
                tags.append(ref)

    # Extract key words from title
    skip_words = {'the', 'a', 'an', 'and', 'or', 'of', 'in', 'for', 'to', 'is', 'it', 'on', 'at', 'by', 'why', 'how', 'what', 'when', 'your', 'you'}
    for word in title_en.replace(':', '').replace('—', '').replace('?', '').split():
        clean = word.strip('.,!()[]')
        if clean.lower() not in skip_words and len(clean) > 2 and clean[0].isupper():
            tags.append(clean)

    # Deduplicate while preserving order
    seen = set()
    unique = []
    for t in tags:
        if t.lower() not in seen:
            seen.add(t.lower())
            unique.append(t)

    return unique[:16]  # Cap at 16 tags


def extract_sources(meta):
    """Extract source URLs from metadata."""
    sources = meta.get('sources', [])
    if isinstance(sources, list):
        # Handle both string lists and object lists
        result = []
        for s in sources:
            if isinstance(s, str):
                result.append(s)
            elif isinstance(s, dict):
                url = s.get('url', s.get('link', ''))
                if url:
                    result.append(url)
        return result
    return []


def extract_cultural_parallels(meta):
    """Extract cultural parallels from metadata."""
    parallels = meta.get('cultural_parallels', [])
    if isinstance(parallels, list):
        result = []
        for p in parallels:
            if isinstance(p, str):
                result.append(p)
            elif isinstance(p, dict):
                jewish = p.get('jewish', '')
                chinese = p.get('chinese', '')
                if jewish and chinese:
                    result.append(f"{jewish} ↔ {chinese}")
                elif jewish:
                    result.append(jewish)
                elif chinese:
                    result.append(chinese)
        return result
    return []


def extract_dynasty_refs(meta):
    """Extract Chinese dynasty references from metadata."""
    refs = meta.get('chinese_dynasty_references', [])
    if isinstance(refs, list):
        result = []
        for r in refs:
            if isinstance(r, dict):
                result.append(r)
            elif isinstance(r, str):
                result.append({'dynasty': r, 'chinese': '', 'years': '', 'context': ''})
        return result
    return []


def build_article_entry(folder, article_id, section):
    """Build an articles.json entry from an article folder."""
    body_en = read_file(os.path.join(folder, 'article-en.md'))
    body_zh = read_file(os.path.join(folder, 'article-zh.md'))
    body_he = read_file(os.path.join(folder, 'article-he.md'))
    meta = load_metadata(folder)

    title_en = get_title(meta, 'en')
    title_zh = get_title(meta, 'zh')
    title_he = get_title(meta, 'he')

    # Fallback: extract title from first H1 in markdown
    if not title_en and body_en:
        for line in body_en.split('\n'):
            if line.startswith('# '):
                title_en = line[2:].strip()
                break

    return {
        'id': article_id,
        'section': section,
        'title_en': title_en,
        'title_zh': title_zh,
        'title_he': title_he,
        'body_en': body_en,
        'body_zh': body_zh,
        'body_he': body_he,
    }


def build_bibliography_entry(folder, article_id, section):
    """Build a bibliography-index.json entry from an article folder."""
    meta = load_metadata(folder)
    rel_folder = os.path.relpath(folder, ROOT)

    title_en = get_title(meta, 'en')
    title_zh = get_title(meta, 'zh')
    title_he = get_title(meta, 'he')

    # Fallback title from markdown
    if not title_en:
        body = read_file(os.path.join(folder, 'article-en.md'))
        for line in body.split('\n'):
            if line.startswith('# '):
                title_en = line[2:].strip()
                break

    description = get_description(meta)
    tags = meta.get('tags', [])
    if not tags:
        tags = generate_tags(meta, section, title_en)
    sources = extract_sources(meta)
    cultural_parallels = extract_cultural_parallels(meta)
    dynasty_refs = extract_dynasty_refs(meta)
    status = meta.get('status', 'complete')

    return {
        'id': article_id,
        'title': {
            'en': title_en,
            'zh': title_zh,
            'he': title_he,
        },
        'section': section,
        'description': description,
        'tags': tags,
        'sources': sources,
        'cultural_parallels': cultural_parallels,
        'chinese_dynasty_references': dynasty_refs,
        'status': status,
        'filePath': os.path.join(rel_folder, 'metadata.json'),
    }


def main():
    parser = argparse.ArgumentParser(description='Import articles into website data files')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be imported without changing files')
    parser.add_argument('--section', type=str, help='Import only articles from this section')
    parser.add_argument('--ids', type=str, help='Comma-separated list of article IDs to import')
    parser.add_argument('--all', action='store_true', help='Import all new articles')
    parser.add_argument('--report', action='store_true', help='Show full discovery report')
    args = parser.parse_args()

    # Load existing data
    with open(ARTICLES_JSON, 'r', encoding='utf-8') as f:
        existing_articles = json.load(f)
    with open(BIBLIOGRAPHY_JSON, 'r', encoding='utf-8') as f:
        existing_bib = json.load(f)

    existing_ids = {a['id'] for a in existing_articles}
    existing_bib_ids = {b['id'] for b in existing_bib}

    # Discover all article folders
    all_discovered = discover_articles()

    # Assign IDs to articles without them
    next_id = NEXT_AUTO_ID
    for art in all_discovered:
        if art['id'] is None:
            meta = load_metadata(art['folder'])
            if meta.get('id'):
                art['id'] = meta['id']
            else:
                art['id'] = next_id
                next_id += 1

    # Filter to only new articles
    new_articles = [a for a in all_discovered if a['id'] not in existing_ids]

    if args.report:
        print(f"=== Discovery Report ===")
        print(f"Total article folders found: {len(all_discovered)}")
        print(f"Already on website: {len(all_discovered) - len(new_articles)}")
        print(f"New to import: {len(new_articles)}")
        print()

        from collections import Counter
        sections = Counter(a['section_dir'] for a in new_articles)
        print("New articles by section:")
        for section, count in sections.most_common():
            print(f"  {count:3d}  {section}")

        print("\nArticles missing metadata.json:")
        for a in new_articles:
            meta = load_metadata(a['folder'])
            if not meta:
                print(f"  ID {a['id']}: {a['folder']}")

        print("\nArticles missing tags:")
        for a in new_articles:
            meta = load_metadata(a['folder'])
            if not meta.get('tags'):
                print(f"  ID {a['id']}: {a['folder']}")

        return

    # Filter based on args
    if args.ids:
        target_ids = set(int(x) for x in args.ids.split(','))
        to_import = [a for a in new_articles if a['id'] in target_ids]
    elif args.section:
        to_import = [a for a in new_articles if a['section_dir'] == args.section]
    elif args.all:
        to_import = new_articles
    else:
        print("Specify --ids, --section, --all, or --report")
        sys.exit(1)

    if not to_import:
        print("No articles to import matching criteria.")
        return

    # Build entries
    new_article_entries = []
    new_bib_entries = []

    for art in sorted(to_import, key=lambda x: x['id']):
        section = SECTION_MAP.get(art['section_dir'], art['section_dir'])

        article_entry = build_article_entry(art['folder'], art['id'], section)
        bib_entry = build_bibliography_entry(art['folder'], art['id'], section)

        new_article_entries.append(article_entry)
        if art['id'] not in existing_bib_ids:
            new_bib_entries.append(bib_entry)

        status = "OK"
        if not article_entry['title_en']:
            status = "WARN: no title_en"
        if not article_entry['body_en']:
            status = "WARN: no body_en"
        if not bib_entry['tags']:
            status = "WARN: no tags"

        if args.dry_run:
            print(f"  ID {art['id']:>4} | {section:<40} | {article_entry['title_en'][:60]:<60} | {status}")
        else:
            print(f"  Imported ID {art['id']:>4}: {article_entry['title_en'][:70]}")

    if args.dry_run:
        print(f"\nWould import {len(new_article_entries)} articles and {len(new_bib_entries)} bibliography entries.")
        return

    # Write updated files
    updated_articles = existing_articles + new_article_entries
    updated_bib = existing_bib + new_bib_entries

    with open(ARTICLES_JSON, 'w', encoding='utf-8') as f:
        json.dump(updated_articles, f, ensure_ascii=False, indent=2)

    with open(BIBLIOGRAPHY_JSON, 'w', encoding='utf-8') as f:
        json.dump(updated_bib, f, ensure_ascii=False, indent=2)

    print(f"\nDone! Imported {len(new_article_entries)} articles, {len(new_bib_entries)} bibliography entries.")
    print(f"Total articles now: {len(updated_articles)}")
    print(f"Total bibliography entries now: {len(updated_bib)}")


if __name__ == '__main__':
    main()
