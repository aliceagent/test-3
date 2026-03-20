#!/usr/bin/env python3
"""
Torah Research Fetch Tool
Fetches content from Sefaria API for Torah Light articles
"""

import sys
import requests
import json
from urllib.parse import quote

def fetch_sefaria(reference):
    """Fetch text from Sefaria API"""
    try:
        # Clean the reference for URL
        ref_encoded = quote(reference)
        url = f"https://www.sefaria.org/api/texts/{ref_encoded}"
        
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            
            print(f"=== SEFARIA: {reference} ===")
            print(f"Source: {url}")
            print(f"Hebrew Title: {data.get('heTitle', 'N/A')}")
            print(f"English Title: {data.get('title', 'N/A')}")
            
            # Get the text content
            if 'text' in data:
                text = data['text']
                if isinstance(text, list):
                    for i, verse in enumerate(text, 1):
                        if verse:
                            print(f"\n{i}. {verse}")
                else:
                    print(f"\n{text}")
            
            # Get Hebrew text if available
            if 'he' in data:
                he_text = data['he']
                print(f"\n=== HEBREW TEXT ===")
                if isinstance(he_text, list):
                    for i, verse in enumerate(he_text, 1):
                        if verse:
                            print(f"{i}. {verse}")
                else:
                    print(he_text)
            
            return True
        else:
            print(f"Error fetching from Sefaria: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"Error: {e}")
        return False

def verify_url(url):
    """Verify if a URL is accessible"""
    try:
        response = requests.head(url, timeout=10)
        status = response.status_code
        print(f"URL: {url}")
        print(f"Status: {status}")
        if status == 200:
            print("✅ URL is accessible")
            return True
        else:
            print("❌ URL is not accessible")
            return False
    except Exception as e:
        print(f"❌ Error checking URL: {e}")
        return False

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 torah_research_fetch.py <command> <reference/url>")
        print("Commands:")
        print("  sefaria <reference>  - Fetch text from Sefaria")
        print("  verify <url>         - Verify if URL is accessible")
        sys.exit(1)
    
    command = sys.argv[1]
    target = sys.argv[2]
    
    if command == "sefaria":
        fetch_sefaria(target)
    elif command == "verify":
        verify_url(target)
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)

if __name__ == "__main__":
    main()