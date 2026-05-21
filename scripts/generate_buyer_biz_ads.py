# -*- coding: utf-8 -*-
"""Generate 10 Facebook ad designs covering two audiences:

  Group A — Personal buyers ('Buy your own car from Japan')   5 designs
  Group B — Aspiring importers ('Start your import business') 5 designs

Same editorial template + your actual imported-car photos as backgrounds,
same N$200 once-off price point. Headlines + ledes are tuned per audience.
Uses car photos AFTER the first 10 (which the Namibia ads already use), so
the two ad sets are visually distinct.
"""
from pathlib import Path

ROOT = Path(r"c:\Users\ismae\Desktop\calculator\public\designs")
CARS_FOLDER = Path(r"c:\Users\ismae\Desktop\calculator\public\Cars Imported Images")

all_photos = sorted([p.name for p in CARS_FOLDER.iterdir() if p.suffix.lower() in {".jpg", ".jpeg"}])
if len(all_photos) < 20:
    car_photos = all_photos          # fall back to cycling
else:
    car_photos = all_photos[10:]     # use photos 11+ to avoid overlap with ad-na-*


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
    <h1>{h1}</h1>
    <div class="arrow-row">
      <span class="arrow" aria-hidden>&#8627;</span>
      <span class="sub">{sub}</span>
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

# Group A — Personal buyers
BUYER_POSTS = [
    {
        "file": "ad-buyer-01-hero.html",
        "title": "IMPOTA Ad — Buyer 01 · Hero",
        "cat": "Buy Direct From Japan",
        "h1": 'Buy your own car.<br>From <span class="it">Japan.</span>',
        "sub": "Direct from auction to <b>your driveway.</b>",
        "lede": "Skip the dealer markup. Choose your own car from over <b>70,000 lots</b> on Japanese auctions. Step-by-step guide for first-time importers in Namibia. <em>N$200 once-off · lifetime access.</em>",
        "meta": "N$200 once-off · Lifetime · Walvis Bay",
    },
    {
        "file": "ad-buyer-02-save-70k.html",
        "title": "IMPOTA Ad — Buyer 02 · Save N$70,000",
        "cat": "The Dealer Margin, Kept",
        "h1": 'Save <span class="it">N$70,000.</span><br>Buy direct.',
        "sub": "The dealer's margin, <b>kept by you.</b>",
        "lede": "Local dealers add an average of <b>N$70,000</b> to every Japanese import. Cut them out. Buy the car you want, at the auction price. <em>N$200 once-off · lifetime guide.</em>",
        "meta": "Dealer markup · N$70,000 · N$200 once-off",
    },
    {
        "file": "ad-buyer-03-your-choice.html",
        "title": "IMPOTA Ad — Buyer 03 · Your Choice",
        "cat": "Your Car, Your Spec",
        "h1": 'Pick <span class="it">your</span> car.<br>Not theirs.',
        "sub": "Exact spec, exact colour, <b>exact year.</b>",
        "lede": "Dealers sell what they have. You choose from <b>70,000+ Japanese auction lots</b> — exact model, exact options, exact condition. <em>N$200 once-off · lifetime guide.</em>",
        "meta": "70,000 lots · Your spec · N$200 once-off",
    },
    {
        "file": "ad-buyer-04-auction-quality.html",
        "title": "IMPOTA Ad — Buyer 04 · Auction Quality",
        "cat": "Quality At Auction Prices",
        "h1": 'Quality cars,<br>at <span class="it">auction</span> prices.',
        "sub": "Real grades. Real photos. <b>Real savings.</b>",
        "lede": "Japanese auction cars are graded, photographed, and inspector-noted. <b>Better information</b> than any local dealer — and 30–40% cheaper. <em>N$200 once-off · lifetime.</em>",
        "meta": "Graded · Photographed · N$200 once-off",
    },
    {
        "file": "ad-buyer-05-first-import.html",
        "title": "IMPOTA Ad — Buyer 05 · First Import",
        "cat": "Your First Import",
        "h1": 'Your first<br>Japanese <span class="it">import.</span>',
        "sub": "Step-by-step for <b>Namibia.</b>",
        "lede": "Most first-timers worry about getting it wrong. We walk you through every step — auction, payment, shipping, NaTIS, registration. <em>N$200 once-off · lifetime access.</em>",
        "meta": "First-timer · Step-by-step · N$200",
    },
]

# Group B — Aspiring importers / business starters
BIZ_POSTS = [
    {
        "file": "ad-biz-01-hero.html",
        "title": "IMPOTA Ad — Biz 01 · Hero",
        "cat": "Start Your Import Business",
        "h1": 'Start your own<br>import <span class="it">business.</span>',
        "sub": "Be the dealer <b>in your town.</b>",
        "lede": "Import cars from Japan, sell them in Namibia. The blueprint: sourcing, shipping, clearance, registration, pricing. <em>N$200 once-off · lifetime access.</em>",
        "meta": "Import business · Namibia · N$200 once-off",
    },
    {
        "file": "ad-biz-02-profit.html",
        "title": "IMPOTA Ad — Biz 02 · Profit Per Car",
        "cat": "Your Profit Per Car",
        "h1": '<span class="it">N$70,000</span><br>profit per car.',
        "sub": "The dealer margin — <b>now yours.</b>",
        "lede": "Average dealer markup on a Japanese import in Namibia: <b>N$70,000</b>. That's your profit margin when you import and sell direct. <em>N$200 once-off · lifetime.</em>",
        "meta": "Per car · N$70,000 · N$200 once-off",
    },
    {
        "file": "ad-biz-03-one-to-fleet.html",
        "title": "IMPOTA Ad — Biz 03 · One Car To Fleet",
        "cat": "Start Small. Scale.",
        "h1": 'From <span class="it">1 car</span><br>to a fleet.',
        "sub": "Start small, scale <b>at your pace.</b>",
        "lede": "Most car-import businesses begin with a single car — and the same systems handle ten. Documents, container sharing, agent contacts — all reusable. <em>N$200 once-off · lifetime.</em>",
        "meta": "1 car · 10 cars · N$200 once-off",
    },
    {
        "file": "ad-biz-04-side-hustle.html",
        "title": "IMPOTA Ad — Biz 04 · Side Hustle to Business",
        "cat": "Side Hustle → Business",
        "h1": 'Side hustle.<br>Full <span class="it">business.</span>',
        "sub": "Same skills, different <b>scale.</b>",
        "lede": "One car a year covers the guide. Two pays for the next. Five funds the business. The complete import system for serious side-hustlers in Namibia. <em>N$200 once-off · lifetime.</em>",
        "meta": "1/year · Side hustle · N$200 once-off",
    },
    {
        "file": "ad-biz-05-be-the-agent.html",
        "title": "IMPOTA Ad — Biz 05 · Be The Agent",
        "cat": "Be The Agent They Trust",
        "h1": 'Be the agent<br>they <span class="it">trust.</span>',
        "sub": "Friends, family, <b>your community.</b>",
        "lede": "Once you've imported one car, three more people will ask you to do theirs. Turn one success into a small business — agent contacts, documents, clearance, all reusable. <em>N$200 once-off · lifetime.</em>",
        "meta": "Community · Reputation · N$200 once-off",
    },
]

# Personal story ads — founder/owner-first-person
STORY_POSTS = [
    {
        "file": "ad-story-01-golf-7r.html",
        "title": "IMPOTA Ad — Story 01 · My Golf 7R (saved N$150k)",
        "cat": "How I Saved N$150,000",
        "h1": 'I saved over<br><span class="it">N$150,000.</span>',
        "sub": "Importing my <b>Golf 7R</b> direct from Japan.",
        "lede": "No agent. No dealer markup. I wrote down exactly how I did it — the auction, the shipping, the duties, the documents. <em>N$200 · Lifetime access · impota.com</em>",
        "meta": "Real story · Golf 7R · N$150,000 saved",
        "bg_override": "20250329_123546.jpg",
    },
]

POSTS = BUYER_POSTS + BIZ_POSTS + STORY_POSTS

count = 0
for i, p in enumerate(POSTS):
    bg = p.get("bg_override") or car_photos[i % len(car_photos)]
    out = ROOT / p["file"]
    rendered = TEMPLATE.format(
        title=p["title"],
        cat=p["cat"],
        h1=p["h1"],
        sub=p["sub"],
        lede=p["lede"],
        meta=p["meta"],
        bg=encode_filename(bg),
    )
    out.write_text(rendered, encoding="utf-8")
    print(f"  OK  {p['file']}  ->  {bg}")
    count += 1

print(f"\nGenerated {count} buyer + biz ad designs in {ROOT}")
