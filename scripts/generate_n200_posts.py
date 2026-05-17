# -*- coding: utf-8 -*-
"""Generate 10 high-persuasion Facebook posts for IMPOTA at N$200.

Each post hits a different psychological lever (loss aversion, anchoring,
risk reversal, social proof, etc) and prominently features the N$200
price point. Output files land in public/designs/ and follow the same
1080x1080 editorial template as the existing fb-NN designs.
"""
from pathlib import Path

ROOT = Path(r"c:\Users\ismae\Desktop\calculator\public\designs")

# Pure-template; placeholders get formatted in below.
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

# 10 high-persuasion posts, each with a different psychological lever.
POSTS = [
    {
        "file": "fb-46-200-saves-70k.html",
        "title": "IMPOTA 46 — N$200 saves N$70,000",
        "cat": "The Simple Math",
        "headline": '<span class="it">N$200</span> in.<br><span class="it">N$70,000</span> saved.',
        "lede": "Average member savings on their first import. <em>That's 350× the price of the guide.</em>",
        "meta": "One-time payment · Lifetime access · 350× return",
        "bg": "pexels-n-voitkevich-7172981.jpg",
        "h1_size": 96,
    },
    {
        "file": "fb-47-pay-once-use-forever.html",
        "title": "IMPOTA 47 — Pay Once, Use Forever",
        "cat": "One Payment",
        "headline": 'Pay once.<br><span class="it">N$200.</span><br>Use forever.',
        "lede": "No subscription. No monthly fee. No expiry. <em>One payment, lifetime access.</em>",
        "meta": "N$200 · No subscription · No expiry",
        "bg": "pexels-mikhail-nilov-6964174.jpg",
        "h1_size": 110,
    },
    {
        "file": "fb-48-7day-refund.html",
        "title": "IMPOTA 48 — 7-Day Refund",
        "cat": "Zero Risk",
        "headline": 'Read it for 7 days.<br><span class="it">Hate it? N$200 back.</span>',
        "lede": "Open the calculator. Read the guides. Browse the agents. If it's not worth N$200, <em>we refund every cent.</em>",
        "meta": "7-day refund · No questions · No fine print",
        "bg": "pexels-thirdman-5060985.jpg",
        "h1_size": 78,
    },
    {
        "file": "fb-49-one-mistake-costs.html",
        "title": "IMPOTA 49 — One Mistake",
        "cat": "Cost Of Not Knowing",
        "headline": 'One mistake:<br><span class="it">N$50,000+.</span><br>IMPOTA: <span class="it">N$200.</span>',
        "lede": "Wrong vehicle age. Wrong port. Wrong duty math. <em>One slip costs 250× the guide.</em>",
        "meta": "N$200 to avoid · N$50K+ to skip",
        "bg": "pexels-dar-ius-1051256061-35011130.jpg",
        "h1_size": 78,
    },
    {
        "file": "fb-50-before-the-car.html",
        "title": "IMPOTA 50 — Before The Car",
        "cat": "Reverse The Order",
        "headline": 'Spend <span class="it">N$200</span><br>before the<br><span class="it">N$200,000.</span>',
        "lede": "Most importers spend nothing on knowledge — then spend everything on lessons. <em>Reverse the order.</em>",
        "meta": "0.1% of one import · Saves you ~30%",
        "bg": "pexels-tomfisk-3856433.jpg",
        "h1_size": 100,
    },
    {
        "file": "fb-51-what-200-buys.html",
        "title": "IMPOTA 51 — What N$200 Buys",
        "cat": "Everything Included",
        "headline": 'What <span class="it">N$200</span><br>buys you.',
        "lede": "Calculator. <b>4 country guides.</b> 25+ vetted agents. 20+ import documents. <em>All of it. Forever.</em>",
        "meta": "1 calculator · 4 countries · 25 agents · 20 docs",
        "bg": "pexels-n-voitkevich-7172786.jpg",
        "h1_size": 120,
    },
    {
        "file": "fb-52-less-than-fuel.html",
        "title": "IMPOTA 52 — Less Than A Tank",
        "cat": "Cheaper Than You Think",
        "headline": '<span class="it">N$200.</span><br>Less than a<br>tank of fuel.',
        "lede": "One tank gets you home tonight. <em>One IMPOTA gets you a car at half the dealer price.</em>",
        "meta": "One-time · Fills the gap dealers won't",
        "bg": "pexels-omar-ramadan-1739260-9355450.jpg",
        "h1_size": 100,
    },
    {
        "file": "fb-53-guide-or-lesson.html",
        "title": "IMPOTA 53 — Guide or Lesson",
        "cat": "Choose Your Price",
        "headline": '<span class="it">N$200</span> guide.<br>Or <span class="it">N$50,000</span> lesson.',
        "lede": "Every first-time importer pays one of these two prices. <em>You choose which.</em>",
        "meta": "Pay to learn · Or pay to fail",
        "bg": "pexels-kelly-2530310.jpg",
        "h1_size": 88,
    },
    {
        "file": "fb-54-take-control.html",
        "title": "IMPOTA 54 — Take Control",
        "cat": "Your Money. Your Import.",
        "headline": 'Take control.<br><span class="it">N$200.</span><br>Done.',
        "lede": "Stop trusting dealers with your savings. <em>Start trusting the math.</em>",
        "meta": "Independent · Transparent · Yours",
        "bg": "pexels-altaf-shah-3143825-29512511.jpg",
        "h1_size": 120,
    },
    {
        "file": "fb-55-stop-researching.html",
        "title": "IMPOTA 55 — Stop Researching",
        "cat": "Decide Today",
        "headline": 'Stop researching.<br><span class="it">Start importing.</span>',
        "lede": "4 minutes. <em>N$200.</em> Everything you need. <em>Before your next bid.</em>",
        "meta": "N$200 · Lifetime · impota.com",
        "bg": "pexels-danmds-11291781.jpg",
        "h1_size": 86,
    },
]

count = 0
for p in POSTS:
    out = ROOT / p["file"]
    out.write_text(TEMPLATE.format(**p), encoding="utf-8")
    print(f"  OK  {p['file']}")
    count += 1

print(f"\nGenerated {count} posts in {ROOT}")
