# -*- coding: utf-8 -*-
"""Generate 10 savings / anti-middleman posts.

Theme: how to save money on a Japanese car import by bypassing dealers,
brokers, and middlemen. Each post calls out a specific way the dealer
margin is built and how a DIY importer skips it.
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

  .content{{position:absolute;left:90px;bottom:130px;right:120px;z-index:7;max-width:760px}}
  .cat{{font-family:'Inter',sans-serif;font-size:12px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--gold);margin-bottom:36px}}
  .cat::before{{content:'';display:inline-block;width:38px;height:1px;background:var(--gold);vertical-align:middle;margin-right:18px;margin-top:-4px}}
  h1{{font-family:'Playfair Display',serif;font-weight:700;font-size:{h1_size}px;line-height:0.94;letter-spacing:-2.6px;color:#fff;margin-bottom:0;text-shadow:0 2px 24px rgba(0,0,0,0.45)}}
  h1 .it,h1 .a{{font-style:italic;font-weight:700;color:var(--gold)}}
  h1 q{{quotes:'\\201C' '\\201D';font-style:italic;font-weight:700}}
  h1 em{{font-style:italic;font-weight:700;color:var(--gold)}}
  .rule{{width:48px;height:1px;background:var(--gold);margin:42px 0 30px;opacity:0.95}}
  .lede{{font-family:'Playfair Display',serif;font-style:italic;font-weight:400;font-size:25px;line-height:1.55;color:#fff;max-width:620px;letter-spacing:-0.2px;text-shadow:0 1px 14px rgba(0,0,0,0.65)}}
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
        "file": "fb-66-middleman-tax.html",
        "title": "IMPOTA 66 — The Middleman Tax",
        "cat": "The Middleman Tax",
        "headline": 'Three middlemen.<br><span class="it">One car.</span>',
        "lede": "Dealer. Broker. Clearing agent. Each takes <em>10–15%</em> of the auction price. Skip them — keep the difference.",
        "meta": "Dealer · Broker · Clearing · Skip",
        "bg": "pexels-thirdman-5060985.jpg",
        "h1_size": 110,
    },
    {
        "file": "fb-67-dealer-markup.html",
        "title": "IMPOTA 67 — Dealer Markup",
        "cat": "Where The Money Goes",
        "headline": 'Auction <span class="it">N$110K.</span><br>Dealer <span class="it">N$185K.</span>',
        "lede": "Same car. Same auction. <em>N$75,000 of middleman tax.</em> That's what you pay for not knowing the process.",
        "meta": "Same car · Same auction · Different price",
        "bg": "pexels-n-voitkevich-7172786.jpg",
        "h1_size": 86,
    },
    {
        "file": "fb-68-its-legal.html",
        "title": "IMPOTA 68 — It's Legal",
        "cat": "It's Legal",
        "headline": 'Importing yourself is<br><span class="it">100% legal.</span>',
        "lede": "You don't need a dealer licence. You don't need a broker. <em>You need the paperwork.</em> We give you the paperwork.",
        "meta": "No licence · No middleman · Just paperwork",
        "bg": "pexels-towfiqu-barbhuiya-3440682-12001949.jpg",
        "h1_size": 88,
    },
    {
        "file": "fb-69-walvis-bay-private.html",
        "title": "IMPOTA 69 — Walvis Bay Is Open",
        "cat": "The Port Is Open",
        "headline": 'Walvis Bay clears<br><span class="it">private imports daily.</span>',
        "lede": "Dealers don't have a monopoly on the port. <em>Your container can land just like theirs.</em>",
        "meta": "Port · Private · Daily clearance",
        "bg": "pexels-tomfisk-5992514.jpg",
        "h1_size": 90,
    },
    {
        "file": "fb-70-three-steps.html",
        "title": "IMPOTA 70 — Three Steps",
        "cat": "Three Steps, No Dealer",
        "headline": 'Bid.<br>Ship.<br><span class="it">Clear.</span>',
        "lede": "That's the entire import. <em>Three steps. No salesman in the middle.</em>",
        "meta": "Auction · Shipping · Clearance · You",
        "bg": "pexels-tomfisk-3856433.jpg",
        "h1_size": 160,
    },
    {
        "file": "fb-71-not-complicated.html",
        "title": "IMPOTA 71 — Not Complicated",
        "cat": "The Complicated Lie",
        "headline": "It's not<br><span class=\"it\">complicated.</span>",
        "lede": "Dealers want you to think it is. <em>4 minutes with our calculator says otherwise.</em>",
        "meta": "Calculated · Documented · Doable",
        "bg": "pexels-mikhail-nilov-6964174.jpg",
        "h1_size": 130,
    },
    {
        "file": "fb-72-what-dealer-adds.html",
        "title": "IMPOTA 72 — What A Dealer Adds",
        "cat": "What A Dealer Adds",
        "headline": '<span class="it">N$70,000.</span><br>Per car.<br>Average.',
        "lede": "That's the dealer's margin on a single Japanese import. <em>Now you know.</em>",
        "meta": "Profit · Per car · Average",
        "bg": "pexels-rockwell-branding-agency-85164430-8910354.jpg",
        "h1_size": 130,
    },
    {
        "file": "fb-73-direct-saves-40.html",
        "title": "IMPOTA 73 — Direct Saves 40%",
        "cat": "Direct From Japan",
        "headline": 'Direct saves<br><span class="it">40%.</span>',
        "lede": "Skip the local dealer. Skip the broker. Skip the markup. <em>Buy direct from the auction.</em>",
        "meta": "40% saved · Same car · Same auction",
        "bg": "pexels-tomfisk-5972211.jpg",
        "h1_size": 140,
    },
    {
        "file": "fb-74-no-license-needed.html",
        "title": "IMPOTA 74 — The Licence Myth",
        "cat": "The Licence Myth",
        "headline": "You don't need<br><span class=\"it\">a licence.</span>",
        "lede": "Importing your own car requires <em>zero special permits.</em> The dealer myth is just that — a myth.",
        "meta": "No permit · No licence · Just paperwork",
        "bg": "pexels-danmds-11291781.jpg",
        "h1_size": 100,
    },
    {
        "file": "fb-75-three-markup-tricks.html",
        "title": "IMPOTA 75 — Three Markup Tricks",
        "cat": "How Dealers Inflate",
        "headline": "Markup. Fees.<br><span class=\"it\">'Consultation'.</span>",
        "lede": "Three ways dealers add to the auction price. <em>Each one disappears when you import yourself.</em>",
        "meta": "Margins · Fees · Consultations · All gone",
        "bg": "pexels-dar-ius-1051256061-35011130.jpg",
        "h1_size": 96,
    },
]

count = 0
for p in POSTS:
    out = ROOT / p["file"]
    out.write_text(TEMPLATE.format(**p), encoding="utf-8")
    print(f"  OK  {p['file']}")
    count += 1

print(f"\nGenerated {count} savings posts in {ROOT}")
