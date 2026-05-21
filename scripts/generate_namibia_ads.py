# -*- coding: utf-8 -*-
"""Generate 10 highly-engaging Facebook ad designs for boosting.

Core message — 'Import cars from Japan. A step-by-step guide for Namibia' —
stays in every design. The supporting category + tagline rotate across
10 different conversion angles. Each design uses one of the user's
actual imported car photos as background (from public/Cars Imported Images/).
"""
from pathlib import Path

ROOT = Path(r"c:\Users\ismae\Desktop\calculator\public\designs")
CARS_FOLDER = Path(r"c:\Users\ismae\Desktop\calculator\public\Cars Imported Images")

# Pick 10 distinct car photos. Sorted for determinism; cycles if folder has <10.
car_photos = sorted([p.name for p in CARS_FOLDER.iterdir() if p.suffix.lower() in {".jpg", ".jpeg"}])
if not car_photos:
    raise SystemExit("No car photos found.")


def encode_filename(name: str) -> str:
    return name.replace(" ", "%20").replace("(", "%28").replace(")", "%29")


TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;0,800;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet">
<title>{title}</title>
<style>
  *{{margin:0;padding:0;box-sizing:border-box}}
  :root{{--green-deep:#09090b;--green-mid:#18181b;--green-bright:#f59e0b;--gold:#fbbf24;--cream:#fafaf9}}
  body{{width:1080px;height:1080px;overflow:hidden;font-family:'Inter',sans-serif;background:#000;color:var(--cream);position:relative}}

  .photo{{position:absolute;inset:0;background:url('/Cars%20Imported%20Images/{bg}') center center / cover no-repeat;filter:saturate(0.96) contrast(1.06) brightness(1.04);z-index:1}}
  .vignette{{position:absolute;inset:0;background:radial-gradient(ellipse 95% 95% at 60% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.20) 78%, rgba(0,0,0,0.38) 100%);z-index:2;pointer-events:none}}
  .anchor{{position:absolute;inset:0;background:linear-gradient(0deg,rgba(9,9,11,0.96) 0%,rgba(24,24,27,0.85) 18%,rgba(24,24,27,0.45) 32%,rgba(24,24,27,0) 46%),linear-gradient(125deg,rgba(24,24,27,0.94) 0%,rgba(24,24,27,0.82) 22%,rgba(24,24,27,0.45) 45%,rgba(24,24,27,0.12) 65%,rgba(24,24,27,0) 82%);z-index:3;pointer-events:none}}
  .shine{{position:absolute;inset:0;background:radial-gradient(ellipse 62% 50% at 22% 60%, rgba(245,158,11,0.55) 0%, rgba(245,158,11,0.28) 28%, rgba(245,158,11,0.08) 55%, rgba(245,158,11,0) 75%);z-index:4;pointer-events:none}}
  .grain{{position:absolute;inset:0;background-image:radial-gradient(rgba(251,191,36,0.06) 1px, transparent 1px);background-size:32px 32px;opacity:0.5;z-index:5;pointer-events:none}}

  .shield{{position:absolute;top:70px;right:70px;z-index:8;font-family:'Inter',sans-serif;font-weight:900;font-size:52px;letter-spacing:-2.4px;line-height:1;color:var(--cream);filter:drop-shadow(0 4px 20px rgba(0,0,0,0.55))}}
  .shield .dot{{color:var(--gold)}}
  .top-mast{{position:absolute;top:88px;left:90px;z-index:7;font-family:'Inter',sans-serif;font-size:11px;font-weight:700;letter-spacing:3.4px;text-transform:uppercase;color:rgba(250,250,249,0.8)}}
  .top-mast .dot{{color:var(--gold);margin:0 12px;opacity:0.8}}

  .content{{position:absolute;left:90px;top:50%;transform:translateY(-50%);right:90px;z-index:7;max-width:880px}}
  .cat{{font-family:'Inter',sans-serif;font-size:13px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--gold);margin-bottom:32px}}
  .cat::before{{content:'';display:inline-block;width:42px;height:1px;background:var(--gold);vertical-align:middle;margin-right:18px;margin-top:-4px}}
  h1{{font-family:'Playfair Display',serif;font-weight:700;font-size:102px;line-height:0.94;letter-spacing:-2.8px;color:#fff;margin-bottom:0;text-shadow:0 2px 24px rgba(0,0,0,0.55)}}
  h1 .it{{font-style:italic;font-weight:700;color:var(--gold)}}
  .arrow-row{{margin-top:28px;display:flex;align-items:flex-start;gap:20px;max-width:820px}}
  .arrow-row .arrow{{color:var(--gold);font-size:40px;line-height:1;flex-shrink:0;margin-top:-4px}}
  .arrow-row .sub{{font-family:'Playfair Display',serif;font-style:italic;font-weight:400;font-size:38px;line-height:1.25;color:#fff;letter-spacing:-0.4px;text-shadow:0 1px 14px rgba(0,0,0,0.7)}}
  .arrow-row .sub b{{font-weight:700;color:var(--gold);font-style:normal}}

  .rule{{width:54px;height:1px;background:var(--gold);margin:38px 0 26px;opacity:0.95}}
  .lede{{font-family:'Inter',sans-serif;font-weight:400;font-size:22px;line-height:1.55;color:rgba(255,255,255,0.94);max-width:780px;text-shadow:0 1px 14px rgba(0,0,0,0.7)}}
  .lede em{{font-style:normal;font-weight:700;color:var(--gold)}}
  .lede b{{color:#fff;font-weight:700}}

  .footer{{position:absolute;bottom:54px;left:90px;right:90px;z-index:7;display:flex;justify-content:space-between;align-items:center}}
  .meta{{font-family:'Inter',sans-serif;font-size:11px;font-weight:700;letter-spacing:3.2px;text-transform:uppercase;color:rgba(250,250,249,0.85)}}
  .meta span{{color:var(--gold);margin:0 12px;opacity:0.7}}
  .url{{font-family:'Inter',sans-serif;font-size:11px;font-weight:700;letter-spacing:3.2px;text-transform:uppercase;color:rgba(250,250,249,0.85)}}
</style>
</head>
<body>
  <div class="photo"></div>
  <div class="vignette"></div>
  <div class="anchor"></div>
  <div class="shine"></div>
  <div class="grain"></div>
  <div class="shield" aria-label="IMPOTA">impota<span class="dot">.</span></div>
  <div class="top-mast">IMPOTA <span class="dot">&middot;</span> Car Import Guide</div>
  <div class="content">
    <div class="cat">{cat}</div>
    <h1>Import cars<br>from <span class="it">Japan.</span></h1>
    <div class="arrow-row">
      <span class="arrow" aria-hidden>&#8627;</span>
      <span class="sub">A step-by-step guide for <b>Namibia.</b></span>
    </div>
    <div class="rule"></div>
    <div class="lede">{lede}</div>
  </div>
  <div class="footer">
    <div class="meta">{meta}</div>
    <div class="url">impota.com</div>
  </div>
</body>
</html>
"""

POSTS = [
    {
        "file": "ad-na-01-intro.html",
        "title": "IMPOTA Ad NA 01 — Intro",
        "cat": "Educational Guide",
        "lede": "Educational resources and guides to help you understand the process of importing a <b>quality used car</b> from Japan to Namibia — from research to documentation. <em>N$200 once-off · lifetime access.</em>",
        "meta": "N$200 once-off · Lifetime · Walvis Bay",
    },
    {
        "file": "ad-na-02-save-70k.html",
        "title": "IMPOTA Ad NA 02 — Save N$70,000",
        "cat": "Save Per Import",
        "lede": "The average importer saves <em>N$70,000</em> per car versus buying from a local dealer. <b>Learn how</b> with our full step-by-step guide — <em>N$200 once-off.</em>",
        "meta": "Avg saving · N$70,000 · N$200 once-off",
    },
    {
        "file": "ad-na-03-real-numbers.html",
        "title": "IMPOTA Ad NA 03 — Real Numbers",
        "cat": "Real Numbers",
        "lede": "Auction <b>N$110,000</b>. Landed in Walvis Bay <b>N$185,000</b>. Same car at a dealer: <em>N$250,000+</em>. The full math, on every page. <em>N$200 once-off.</em>",
        "meta": "Auction · Landed · Dealer · N$200 once-off",
    },
    {
        "file": "ad-na-04-no-guessing.html",
        "title": "IMPOTA Ad NA 04 — No Guessing",
        "cat": "Knowledge, Not Guesses",
        "lede": "NaTIS codes. Duty math. Port choices. Container sharing. <b>Every step explained</b> for first-time Namibian importers — in plain English. <em>N$200 once-off · lifetime.</em>",
        "meta": "NaTIS · ICD · ENV · VAT · N$200",
    },
    {
        "file": "ad-na-05-real-importer.html",
        "title": "IMPOTA Ad NA 05 — Built By An Importer",
        "cat": "Built By An Importer",
        "lede": "Written by a Namibian who imported through Walvis Bay first — then wrote down <b>what worked</b>, what failed, and what every first-time importer should know. <em>N$200 once-off.</em>",
        "meta": "Real experience · Walvis Bay · N$200 once-off",
    },
    {
        "file": "ad-na-06-4-minutes.html",
        "title": "IMPOTA Ad NA 06 — 4 Minutes",
        "cat": "Start In 4 Minutes",
        "lede": "Open the calculator. Enter the auction price. See your full landed cost in Namibia — <em>before</em> you bid on a single car. <em>N$200 once-off · lifetime.</em>",
        "meta": "Calculator · 4 minutes · N$200 once-off",
    },
    {
        "file": "ad-na-07-questions.html",
        "title": "IMPOTA Ad NA 07 — Before You Bid",
        "cat": "Before You Bid",
        "lede": "Can you import this car legally? What duty will you pay? Which exporter is honest? Which port is cheapest? <b>All answered, in one guide.</b> <em>N$200 once-off.</em>",
        "meta": "Eligibility · Duty · Exporter · N$200 once-off",
    },
    {
        "file": "ad-na-08-skip-dealer.html",
        "title": "IMPOTA Ad NA 08 — Skip The Dealer",
        "cat": "Skip The Middleman",
        "lede": "A complete walkthrough from Japanese auctions to NaTIS registration. <b>Buy direct</b>, skip the dealer markup, drive your car home for less. <em>N$200 once-off · lifetime.</em>",
        "meta": "Auction · Shipping · Clearance · N$200 once-off",
    },
    {
        "file": "ad-na-09-whats-inside.html",
        "title": "IMPOTA Ad NA 09 — What's Inside",
        "cat": "Inside The Guide",
        "lede": "Calculator. <b>20+ document templates.</b> 25+ verified agents. 4 country playbooks. Auction-sheet decoder. <em>N$200 once-off · lifetime updates.</em>",
        "meta": "Calculator · Docs · Agents · N$200 once-off",
    },
    {
        "file": "ad-na-10-risk-free.html",
        "title": "IMPOTA Ad NA 10 — One Payment, Forever",
        "cat": "One Payment, Forever",
        "lede": "<em>N$200 once-off · lifetime access.</em> No subscription. No expiry. Read the free guide first at <b>impota.com</b>, then upgrade when you're ready.",
        "meta": "N$200 once-off · Lifetime · No subscription",
    },
]

count = 0
for i, p in enumerate(POSTS):
    bg = car_photos[i % len(car_photos)]
    out = ROOT / p["file"]
    rendered = TEMPLATE.format(
        title=p["title"],
        cat=p["cat"],
        lede=p["lede"],
        meta=p["meta"],
        bg=encode_filename(bg),
    )
    out.write_text(rendered, encoding="utf-8")
    print(f"  OK  {p['file']}  ->  {bg}")
    count += 1

print(f"\nGenerated {count} Namibia ad designs in {ROOT}")
