#!/usr/bin/env python3
"""
Simple URL verification tool to check if URLs return 200 status
Usage: python3 url_verify.py <url>
"""

import sys
import requests
from urllib.parse import urlparse

def verify_url(url):
    try:
        response = requests.head(url, timeout=10, allow_redirects=True)
        return response.status_code == 200, response.status_code
    except Exception as e:
        return False, str(e)

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 url_verify.py <url>")
        sys.exit(1)
    
    url = sys.argv[1]
    print(f"Verifying: {url}")
    
    is_live, status = verify_url(url)
    if is_live:
        print(f"✓ LIVE (Status: {status})")
        sys.exit(0)
    else:
        print(f"✗ DEAD (Status: {status})")
        sys.exit(1)

if __name__ == '__main__':
    main()