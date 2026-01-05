#!/usr/bin/env python3
"""
ATHLYNX COMPREHENSIVE PAGE AUDIT
Tests all pages and reports status
"""

import requests
from urllib.parse import urljoin

BASE_URL = "https://athlynx.manus.space"

# All pages to test
PAGES_TO_TEST = [
    # Main pages
    ("/", "Homepage"),
    
    # Authentication
    ("/admin/crm", "Founders CRM"),
    ("/login", "Portal Login"),
    ("/vip-access", "VIP Access"),
    
    # 10 Main Apps
    ("/portal", "Portal App"),
    ("/messenger", "Messenger App"),
    ("/diamond-grind", "Diamond Grind App"),
    ("/warriors-playbook", "Warriors Playbook App"),
    ("/transfer-portal", "Transfer Portal App"),
    ("/nil-vault", "NIL Vault App"),
    ("/ai-sales", "AI Sales App"),
    ("/faith", "Faith App"),
    ("/ai-recruiter", "AI Recruiter App"),
    ("/ai-content", "AI Content App"),
    
    # Dashboard & Features
    ("/dashboard", "Athlete Dashboard"),
    ("/nil-marketplace", "NIL Marketplace"),
    ("/messages", "Messages"),
    ("/all-apps", "All Apps"),
    ("/preview", "App Preview"),
    
    # Company Pages
    ("/dhg-empire", "DHG Empire"),
    ("/softmor", "Softmor Inc"),
    ("/team", "Team"),
    ("/investor-hub", "Investor Hub"),
    ("/careers", "Careers"),
    
    # About Pages
    ("/founder-story", "Founder Story"),
    ("/founder-dedication", "Founder Dedication"),
    ("/quick-links", "Quick Links Hub"),
    
    # Legal & Support
    ("/pricing", "Pricing"),
    ("/store", "Store"),
    ("/privacy", "Privacy Policy"),
    ("/terms", "Terms of Service"),
]

def test_page(path, name):
    """Test if a page exists and returns 200"""
    url = urljoin(BASE_URL, path)
    try:
        response = requests.get(url, timeout=10, allow_redirects=True)
        status = response.status_code
        
        if status == 200:
            return "✅ WORKS", status, len(response.content)
        elif status == 404:
            return "❌ NOT FOUND", status, 0
        elif status >= 500:
            return "⚠️  SERVER ERROR", status, 0
        else:
            return "⚠️  OTHER", status, 0
    except requests.exceptions.Timeout:
        return "⏱️  TIMEOUT", 0, 0
    except requests.exceptions.ConnectionError:
        return "🔌 CONNECTION ERROR", 0, 0
    except Exception as e:
        return f"❌ ERROR: {str(e)[:30]}", 0, 0

def main():
    print("=" * 80)
    print("ATHLYNX COMPREHENSIVE PAGE AUDIT")
    print(f"Testing {len(PAGES_TO_TEST)} pages on {BASE_URL}")
    print("=" * 80)
    print()
    
    results = []
    working = 0
    not_found = 0
    errors = 0
    
    for path, name in PAGES_TO_TEST:
        status_text, status_code, content_length = test_page(path, name)
        results.append((name, path, status_text, status_code, content_length))
        
        # Print result
        print(f"{status_text:20} | {name:30} | {path:30} | {status_code} | {content_length:,} bytes")
        
        # Count results
        if "✅" in status_text:
            working += 1
        elif "❌ NOT FOUND" in status_text:
            not_found += 1
        else:
            errors += 1
    
    print()
    print("=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"Total Pages Tested: {len(PAGES_TO_TEST)}")
    print(f"✅ Working: {working}")
    print(f"❌ Not Found: {not_found}")
    print(f"⚠️  Errors: {errors}")
    print(f"Success Rate: {(working / len(PAGES_TO_TEST) * 100):.1f}%")
    print("=" * 80)
    
    # Pages that need to be created
    print()
    print("PAGES THAT NEED TO BE CREATED:")
    print("-" * 80)
    for name, path, status_text, _, _ in results:
        if "NOT FOUND" in status_text:
            print(f"  • {path:30} - {name}")
    
    # Save results to file
    with open("/home/ubuntu/athlynx-vip-platform/AUDIT_RESULTS_AUTO.txt", "w") as f:
        f.write("ATHLYNX COMPREHENSIVE PAGE AUDIT\\n")
        f.write("=" * 80 + "\\n\\n")
        for name, path, status_text, status_code, content_length in results:
            f.write(f"{status_text:20} | {name:30} | {path:30} | {status_code} | {content_length:,} bytes\\n")
        f.write("\\n")
        f.write(f"Total: {len(PAGES_TO_TEST)} | Working: {working} | Not Found: {not_found} | Errors: {errors}\\n")
        f.write(f"Success Rate: {(working / len(PAGES_TO_TEST) * 100):.1f}%\\n")
    
    print()
    print("Results saved to: /home/ubuntu/athlynx-vip-platform/AUDIT_RESULTS_AUTO.txt")

if __name__ == "__main__":
    main()
