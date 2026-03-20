#!/usr/bin/env python3

import sys
import scrapling
import time

def fetch_page(url):
    """Fetch page content using scrapling to bypass Cloudflare"""
    try:
        print(f"Fetching: {url}")
        
        # Use StealthyFetcher for Cloudflare bypass
        response = scrapling.StealthyFetcher.fetch(url, headless=True, timeout=30000)
        
        print(f"Status: 200 (fetched successfully)")
        content = response.get_all_text()
        print(f"Content length: {len(content)} characters")
        return content
            
    except Exception as e:
        print(f"Error fetching {url}: {str(e)}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 scrapling_fetch.py <url>")
        sys.exit(1)
    
    url = sys.argv[1]
    content = fetch_page(url)
    
    if content:
        print("\n--- CONTENT START ---")
        print(content)
        print("--- CONTENT END ---")
    else:
        print("Failed to fetch content")
        sys.exit(1)