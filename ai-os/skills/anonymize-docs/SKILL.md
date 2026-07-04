---
name: anonymize-docs
description: Scrub personal/confidential information from financial statements, portfolio snapshots, contracts, and reports while preserving structure and analytical value. Use for "anonymize", "scrub", "remove personal information" requests (often from Carla).
---

# Anonymize Documents

Common jobs: investor statements, portfolio position snapshots ("life of an
investment"), rental contracts, legal invoices. Often requested by Carla
(Jonathan's operations lead) preparing materials to show third parties.

## What to remove or replace
- Names of people and counterparties → consistent role placeholders ("Investor A", "Tenant", "Lender 1"). Keep the same placeholder for the same entity throughout — consistency is the point.
- Account numbers, addresses, phone numbers, emails, ID/passport numbers, signatures.
- Company names when they identify the client (ask if unclear whether a name is the *subject* or a *counterparty*).

## What to preserve
- All numbers needed for the story being told: amounts, dates (unless dates identify someone), percentages, performance over time.
- Document structure, column layout, and chronology — the output must still demonstrate what the original demonstrated (e.g., contributions → current value trajectory).
- Period scoping: if asked for "Q1 2026 only", strip rows/sections outside the period entirely rather than blanking them.

## Rules
- List every category of PII you removed at the end, so a human can verify nothing was missed.
- Check derived fields: totals, filenames, headers/footers, chart labels, and metadata often leak names after the body is scrubbed.
- Never fabricate replacement values that change the financial picture; redact, don't invent.
- If the file format matters (Excel stays Excel, PDF → clean PDF), deliver in kind.
