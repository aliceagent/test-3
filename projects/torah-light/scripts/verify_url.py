#!/usr/bin/env python3

import sys
import requests

def verify_url(url):
    """Verify that a URL returns 200 status"""
    try:
        response = requests.get(url, timeout=10)
        print(f"URL: {url}")
        print(f"Status: {response.status_code}")
        print(f"Valid: {'Yes' if response.status_code == 200 else 'No'}")
        return response.status_code == 200
    except Exception as e:
        print(f"URL: {url}")
        print(f"Error: {str(e)}")
        print("Valid: No")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 verify_url.py <url>")
        sys.exit(1)
    
    url = sys.argv[1]
    is_valid = verify_url(url)
    sys.exit(0 if is_valid else 1)