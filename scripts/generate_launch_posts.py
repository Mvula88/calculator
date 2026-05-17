# -*- coding: utf-8 -*-
"""Generate 3 launch posts — the opening sequence for a brand-new Facebook page.

  Post 1 — Introduction (Who we are)
  Post 2 — Founder note (Why we exist)
  Post 3 — The offer (What you get for N$200)

Drop them in order, one per day, before any other content.
"""
from pathlib import Path

ROOT = Path(r"c:\Users\ismae\Desktop\calculator\public\designs")

TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;0,800;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet">
<title>{title}</title>
<style>
  *{{margin:0;padding:0;box-sizing:border-box}}
  :root{{--green-deep:#09090b;--green-mid:#18181b;--green-bright:#f59e0b;--gold:#fbbf24;--cream:#fafaf9}}
  body{{width:1080px;height:1080px;overflow:hidden;font-family:'Inter',sans-serif;background:#000;color:var(--cream);position:relative}}

  .photo{{position:absolute;inset:0;background:url('/Background%20Images/{bg}') center center / cover no-repeat;filter:saturate(0.96) contrast(1.06) brightness(1.06);z-index:1}}
  .vignette{{position:absolute;inset:0;background:radial-gradient(ellipse 95% 95% at 60% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.20) 78%, rgba(0,0,0,0.38) 100%);z-index:2;pointer-events:none}}
  .anchor{{position:absolute;inset:0;background:linear-gradient(0deg,rgba(9,9,11,0.94) 0%,rgba(24,24,27,0.78) 18%,rgba(24,24,27,0.38) 32%,rgba(24,24,27,0) 46%),linear-gradient(125deg,rgba(24,24,27,0.94) 0%,rgba(24,24,27,0.82) 22%,rgba(24,24,27,0.45) 45%,rgba(24,24,27,0.12) 65%,rgba(24,24,27,0) 82%);z-index:3;pointer-events:none}}
  .shine{{position:absolute;inset:0;background:radial-gradient(ellipse 62% 50% at 22% 60%, rgba(245,158,11,0.58) 0%, rgba(245,158,11,0.30) 28%, rgba(245,158,11,0.10) 55%, rgba(245,158,11,0) 75%);z-index:4;pointer-events:none}}
  .grain{{position:absolute;inset:0;background-image:radial-gradient(rgba(251,191,36,0.06) 1px, transparent 1px);background-size:32px 32px;opacity:0.55;z-index:5;pointer-events:none}}

  .shield{{position:absolute;top:70px;right:70px;z-index:8;filter:drop-shadow(0 4px 20px rgba(0,0,0,0.55))}}
  .shield img{{height:66px;display:block}}
  .top-mast{{position:absolute;top:88px;left:90px;z-index:7;font-family:'Inter',sans-serif;font-size:11px;font-weight:700;letter-spacing:3.4px;text-transform:uppercase;color:rgba(250,250,249,0.7)}}
  .top-mast .dot{{color:var(--gold);margin:0 12px;opacity:0.8}}

  .content{{position:absolute;left:90px;bottom:130px;right:120px;z-index:7;max-width:780px}}
  .cat{{font-family:'Inter',sans-serif;font-size:12px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--gold);margin-bottom:36px}}
  .cat::before{{content:'';display:inline-block;width:38px;height:1px;background:var(--gold);vertical-align:middle;margin-right:18px;margin-top:-4px}}
  h1{{font-family:'Playfair Display',serif;font-weight:700;font-size:{h1_size}px;line-height:0.94;letter-spacing:-2.6px;color:#fff;margin-bottom:0;text-shadow:0 2px 24px rgba(0,0,0,0.45)}}
  h1 .it,h1 .a{{font-style:italic;font-weight:700;color:var(--gold)}}
  h1 q{{quotes:'\\201C' '\\201D';font-style:italic;font-weight:700}}
  h1 em{{font-style:italic;font-weight:700;color:var(--gold)}}
  .rule{{width:48px;height:1px;background:var(--gold);margin:42px 0 30px;opacity:0.95}}
  .lede{{font-family:'Playfair Display',serif;font-style:italic;font-weight:400;font-size:25px;line-height:1.55;color:#fff;max-width:660px;letter-spacing:-0.2px;text-shadow:0 1px 14px rgba(0,0,0,0.65)}}
  .lede em{{font-style:normal;font-weight:700;color:var(--gold)}}
  .lede b{{color:#fff;font-weight:700;font-style:italic}}

  .footer{{position:absolute;bottom:54px;left:90px;right:90px;z-index:7;display:flex;justify-content:space-between;align-items:center}}
  .meta{{font-family:'Inter',sans-serif;font-size:11px;font-weight:700;letter-spacing:3.2px;text-transform:uppercase;color:rgba(250,250,249,0.8)}}
  .meta span{{color:var(--gold);margin:0 12px;opacity:0.7}}
  .url{{font-family:'Inter',sans-serif;font-size:11px;font-weight:700;letter-spacing:3.2px;text-transform:uppercase;color:rgba(250,250,249,0.8)}}
</style>
</head>
<body>
  <div class="photo"></div>
  <div class="vignette"></div>
  <div class="anchor"></div>
  <div class="shine"></div>
  <div class="grain"></div>
  <div class="shield"><img src="/impota-logo.png" alt="IMPOTA"></div>
  <div class="top-mast">IMPOTA <span class="dot">&middot;</span> Car Import Guide</div>
  <div class="content">
    <div class="cat">{cat}</div>
    <h1>{headline}</h1>
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
        # POST 1 — Day 1: "Hello, here we are"
        "file": "fb-launch-01-hello.html",
        "title": "IMPOTA Launch 01 — Hello",
        "cat": "We're Live",
        "headline": 'Hello,<br><span class="it">Southern Africa.</span>',
        "lede": "We're IMPOTA — independent car-import education for <em>first-time importers</em> in Namibia, South Africa, Botswana and Zambia.",
        "meta": "NA · ZA · BW · ZM · Built by importers",
        "bg": "pexels-tomfisk-3856433.jpg",
        "h1_size": 130,
    },
    {
        # POST 2 — Day 2: Founder note, why this exists
        "file": "fb-launch-02-built-by.html",
        "title": "IMPOTA Launch 02 — Built By An Importer",
        "cat": "A Note From The Founder",
        "headline": 'Built by<br><span class="it">an importer.</span>',
        "lede": "Not a dealer. Not a broker. Not a marketer. <em>Just someone who shipped through Walvis Bay</em> and wrote down what worked — and what didn't.",
        "meta": "Independent · First-hand · No commissions",
        "bg": "pexels-mikhail-nilov-6964174.jpg",
        "h1_size": 140,
    },
    {
        # POST 3 — Day 3: The offer
        "file": "fb-launch-03-200-forever.html",
        "title": "IMPOTA Launch 03 — N$200 Forever",
        "cat": "Lifetime Access",
        "headline": '<span class="it">N$200.</span><br>Once.<br><span class="it">Forever.</span>',
        "lede": "Calculator. Guides. Agents. Documents. Across <em>4 countries.</em> One payment, lifetime access. <b>7-day refund if it's not worth it.</b>",
        "meta": "One-time · Lifetime · 7-day refund",
        "bg": "pexels-n-voitkevich-7172786.jpg",
        "h1_size": 130,
    },
]

count = 0
for p in POSTS:
    out = ROOT / p["file"]
    out.write_text(TEMPLATE.format(**p), encoding="utf-8")
    print(f"  OK  {p['file']}")
    count += 1

print(f"\nGenerated {count} launch posts in {ROOT}")
