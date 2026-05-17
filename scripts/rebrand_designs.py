"""
Rebrand all 53 design files from ViewNam → IMPOTA.

- Swaps green/gold palette for zinc/amber palette
- Swaps logo + brand mast + URL
- Updates background image path
- Replaces ViewNam content with IMPOTA messaging per-design
- Picks a background image from /public/Background Images/ for each design

Run from repo root: python scripts/rebrand_designs.py
"""

import os
import re
import random
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DESIGNS_DIR = ROOT / "public" / "designs"
BG_DIR = ROOT / "public" / "Background Images"

# Seed for reproducible BG image assignment
random.seed(42)

# Available background images
bg_images = sorted([f.name for f in BG_DIR.iterdir() if f.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp")])
print(f"Found {len(bg_images)} background images")

# ────────────────────────────────────────────────────────────────────
# GLOBAL replacements (apply to all files)
# ────────────────────────────────────────────────────────────────────

# Color value replacements (used both as CSS vars and inline rgba)
GLOBAL_REPLACEMENTS = [
    # CSS variable values — keep variable names, swap colors
    ("--green-deep:#062A1F", "--green-deep:#09090b"),
    ("--green-mid:#0B3D2C", "--green-mid:#18181b"),
    ("--green-bright:#2EA876", "--green-bright:#f59e0b"),
    ("--gold:#D4A843", "--gold:#fbbf24"),
    ("--cream:#F5EFDE", "--cream:#fafaf9"),

    # RGBA literals used inline in gradients (have to swap RGB triplets)
    # green-deep 6,42,31 → zinc-950 9,9,11
    ("rgba(6,42,31,", "rgba(9,9,11,"),
    # green-mid 11,61,44 → zinc-900 24,24,27
    ("rgba(11,61,44,", "rgba(24,24,27,"),
    # green-bright 46,168,118 → amber-500 245,158,11
    ("rgba(46,168,118,", "rgba(245,158,11,"),
    # gold 212,168,67 → amber-400 251,191,36
    ("rgba(212,168,67,", "rgba(251,191,36,"),
    # cream 245,239,222 → stone-50 250,250,249
    ("rgba(245,239,222,", "rgba(250,250,249,"),

    # Logo
    ("../images/ViewNam logo white.png", "/impota-logo.png"),
    ("../images/ViewNam logo.png", "/impota-logo.png"),

    # Background images path
    ("../images/Background%20Images/", "/Background%20Images/"),

    # URL
    ("www.viewnam.com", "impota.com"),
    ("viewnam.com", "impota.com"),

    # Brand text
    ("ViewNam", "IMPOTA"),
    ("Vehicle Inspection", "Car Import Guide"),
]

# ────────────────────────────────────────────────────────────────────
# PER-DESIGN content map
# Each entry replaces: category text, h1 HTML, lede HTML, footer meta
# ────────────────────────────────────────────────────────────────────

DESIGN_MAP = {
    "fb-01-shocking-stat.html": {
        "title": "IMPOTA 01 — Hidden Stat",
        "cat": "The Hidden Truth",
        "headline": '<span class="it">9</span><span style="color:#fff">/</span><span class="it">10</span> first-time importers<br>overpay.',
        "lede": "Most discover the real cost <em>after</em> the dealer keeps the difference.",
        "footer": "Hidden markups · Real numbers · Better math",
    },
    "fb-02-cost-math.html": {
        "title": "IMPOTA 02 — Real Cost",
        "cat": "Real Cost Breakdown",
        "headline": '2015 Audi A5:<br><span class="it">N$80,229</span> landed.',
        "lede": "Auction <em>+</em> Japan fees <em>+</em> ocean freight <em>+</em> duties. <b>No surprises.</b>",
        "footer": "ICD · ENV · ADV · VAT",
    },
    "fb-03-red-flags.html": {
        "title": "IMPOTA 03 — Red Flags",
        "cat": "Dealer Red Flags",
        "headline": "Six dealer<br><span class=\"it\">red flags.</span>",
        "lede": "If you spot any of these, <em>walk away</em> — and import yourself.",
        "footer": "Inflated quotes · Vague paperwork · No invoices",
    },
    "fb-04-natis-codes.html": {
        "title": "IMPOTA 04 — Customs Codes",
        "cat": "Customs & Duties",
        "headline": '<span class="it">ICD · ENV · ADV · VAT.</span>',
        "lede": "The <em>four taxes</em> that decide your landed cost. Know them, calculate them, plan for them.",
        "footer": "Namibia · South Africa · Botswana · Zambia",
    },
    "fb-05-how-it-works.html": {
        "title": "IMPOTA 05 — How It Works",
        "cat": "The Process",
        "headline": "Find. Calculate.<br><span class=\"it\">Ship. Drive.</span>",
        "lede": "Five steps from Japanese auction to your driveway. We walk you through every one.",
        "footer": "Auction · Calculator · Shipping · Clearance · Registration",
    },
    "fb-06-what-we-check.html": {
        "title": "IMPOTA 06 — What's Included",
        "cat": "Everything Included",
        "headline": "Calculator. Guides.<br><span class=\"it\">Agents. Documents.</span>",
        "lede": "Everything a first-time importer needs — in <em>one place</em>, with lifetime access.",
        "footer": "4 countries · 20+ docs · 25+ agents · Lifetime",
    },
    "fb-07-buyer-first.html": {
        "title": "IMPOTA 07 — Buyer First",
        "cat": "Independent Education",
        "headline": "Buyer first.<br><span class=\"it\">Never the dealer.</span>",
        "lede": "We don't sell cars. We don't take commissions. We just <em>teach you the math.</em>",
        "footer": "No middlemen · No commissions · No upsells",
    },
    "fb-08-nationwide.html": {
        "title": "IMPOTA 08 — Multi-Country",
        "cat": "Southern Africa",
        "headline": "Namibia. South Africa.<br><span class=\"it\">Botswana. Zambia.</span>",
        "lede": "Country-specific guides for the four countries that import most from Japan.",
        "footer": "🇳🇦 NA · 🇿🇦 ZA · 🇧🇼 BW · 🇿🇲 ZM",
    },
    "fb-09-question.html": {
        "title": "IMPOTA 09 — Simple Question",
        "cat": "Worth Asking",
        "headline": "Why are dealers<br><span class=\"it\">worried</span> about IMPOTA?",
        "lede": "Because <em>N$200</em> can save you <em>N$70,000</em> — the same N$70,000 they were making on your car.",
        "footer": "Conflict of interest · Named publicly",
    },
    "fb-10-mission.html": {
        "title": "IMPOTA 10 — Mission",
        "cat": "Our Mission",
        "headline": "Cheaper imports<br><span class=\"it\">for everyone.</span>",
        "lede": "Independent education for first-time importers across Southern Africa.",
        "footer": "Built by an importer · For importers",
    },
    "fb-11-seller-lies.html": {
        "title": "IMPOTA 11 — Dealer Lies",
        "cat": "What You're Told",
        "headline": 'Six lies your<br><span class="it">dealer</span> tells you.',
        "lede": "About used cars from Japan. About your 'import-ready' option. About the real costs.",
        "footer": "We name them · We disprove them",
    },
    "fb-12-code3-story.html": {
        "title": "IMPOTA 12 — Wrong Age",
        "cat": "Real Case",
        "headline": "Wrong vehicle age =<br><span class=\"it\">total loss.</span>",
        "lede": "One importer brought a 13-year-old Toyota to Namibia. The car stayed at port. They <em>lost everything.</em>",
        "footer": "12-year limit · No exceptions",
    },
    "fb-13-from-your-couch.html": {
        "title": "IMPOTA 13 — From Home",
        "cat": "From Your Home",
        "headline": "Import from<br><span class=\"it\">your couch.</span>",
        "lede": "Browse Japan auctions, calculate duties, message your agent — all from home.",
        "footer": "Online tools · Verified contacts · WhatsApp ready",
    },
    "fb-14-family-savings.html": {
        "title": "IMPOTA 14 — Family Savings",
        "cat": "What You Keep",
        "headline": '<span class="it">N$70,000</span> stays<br>in your family.',
        "lede": "That's the average difference between <em>buying local</em> and importing yourself.",
        "footer": "Real savings · Real families · Real math",
    },
    "fb-15-imports.html": {
        "title": "IMPOTA 15 — From Japan",
        "cat": "Direct From Japan",
        "headline": "From Japan to<br><span class=\"it\">Walvis Bay.</span>",
        "lede": "Through one of Africa's most efficient ports — <em>24–48 hour</em> container turnaround.",
        "footer": "Tokyo · Yokohama · Kobe → Walvis Bay",
    },
    "fb-16-cousin.html": {
        "title": "IMPOTA 16 — Cousin Story",
        "cat": "The Open Secret",
        "headline": 'Your cousin already<br><span class="it">imported one.</span>',
        "lede": "But he won't tell you how because his neighbour will too. <em>We will.</em>",
        "footer": "No secrets · Just the math",
    },
    "fb-17-pricing.html": {
        "title": "IMPOTA 17 — Pricing",
        "cat": "Lifetime Access",
        "headline": "Pay once.<br><span class=\"it\">Use forever.</span>",
        "lede": "Lifetime access. No subscription. No expiry.",
        "footer": "One-time payment · Instant access · 7-day refund",
        # Special: this design has a menu — we'll override differently below
    },
    "fb-18-checks-buyers-skip.html": {
        "title": "IMPOTA 18 — Steps Skipped",
        "cat": "Easy to Skip",
        "headline": "Steps first-time<br><span class=\"it\">importers skip.</span>",
        "lede": "Vehicle age check. RHD check. Auction grade check. Each one can <em>cost you the car.</em>",
        "footer": "9 deal-breakers · All in the guide",
    },
    "fb-19-what-sellers-hide.html": {
        "title": "IMPOTA 19 — What Dealers Hide",
        "cat": "Behind the Counter",
        "headline": "What your dealer<br><span class=\"it\">hides.</span>",
        "lede": "The <em>real</em> auction price. The <em>real</em> shipping cost. The <em>real</em> duty calculation.",
        "footer": "Full transparency · Inside the guide",
    },
    "fb-20-first-car.html": {
        "title": "IMPOTA 20 — First Import",
        "cat": "Your First Import",
        "headline": "Your first<br><span class=\"it\">import.</span>",
        "lede": "Most expensive lesson — <em>or</em> the smartest purchase of your life. Depends on what you know before you bid.",
        "footer": "Get it right the first time",
    },
    "fb-21-the-report.html": {
        "title": "IMPOTA 21 — Auction Sheet",
        "cat": "The Auction Sheet",
        "headline": "The auction sheet<br><span class=\"it\">decides it.</span>",
        "lede": "Grade 4, scratch codes, interior letter. <em>Learn to read it</em>, or trust someone who can.",
        "footer": "Grade · Codes · Inspector notes",
    },
    "fb-22-inspectors.html": {
        "title": "IMPOTA 22 — Inspectors",
        "cat": "The Reality",
        "headline": "Inspectors check<br><span class=\"it\">100+ cars in 2 hours.</span>",
        "lede": "That's <em>1 minute per car</em>. The auction sheet is your only protection.",
        "footer": "Why cars arrive different · Inside the guide",
    },
    "fb-23-no-commission.html": {
        "title": "IMPOTA 23 — No Commission",
        "cat": "Aligned With You",
        "headline": "No commissions.<br><span class=\"it\">No upsells.</span>",
        "lede": "IMPOTA doesn't take a cut of your import. We just teach you the process.",
        "footer": "Independent · Transparent · One price",
    },
    "fb-24-same-day.html": {
        "title": "IMPOTA 24 — Quick Estimate",
        "cat": "In Four Minutes",
        "headline": "Cost estimate<br><span class=\"it\">in 4 minutes.</span>",
        "lede": "Enter the auction price, pick your country, see the duty <em>+</em> landed total.",
        "footer": "Multi-country calculator · Live now",
    },
    "fb-25-walk-away.html": {
        "title": "IMPOTA 25 — Walk Away",
        "cat": "Spot the Bad Ones",
        "headline": "Walk away from<br><span class=\"it\">bad exporters.</span>",
        "lede": "Won't show invoices? Won't translate the auction sheet? Won't name their port? <em>Walk.</em>",
        "footer": "Red flags · Verified exporters · Inside",
    },
    "fb-26-negotiate.html": {
        "title": "IMPOTA 26 — Negotiate",
        "cat": "Most Don't Ask",
        "headline": "Negotiate your<br><span class=\"it\">exporter fees.</span>",
        "lede": "Bundle 2+ cars and save <em>5–10%</em> on FOB. Most importers never ask.",
        "footer": "Bundle discount · Free consolidation · Better terms",
    },
    "fb-27-marketplace.html": {
        "title": "IMPOTA 27 — Exporters",
        "cat": "Verified Directory",
        "headline": "10+ verified<br><span class=\"it\">Japanese exporters.</span>",
        "lede": "We list them. We rate them. <em>You pick.</em> No referral fees.",
        "footer": "Integrity · SAT · MOL · Nikkyo · TAU · Hanamaru",
    },
    "fb-28-obd-scan.html": {
        "title": "IMPOTA 28 — Auction Scan",
        "cat": "Before You Bid",
        "headline": "Scan the auction sheet<br><span class=\"it\">first.</span>",
        "lede": "Before you bid. Before you pay. <em>Before</em> the auction even starts.",
        "footer": "Grades · Codes · Modifications",
    },
    "fb-29-testimonial.html": {
        "title": "IMPOTA 29 — Testimonial",
        "cat": "From a Member",
        "headline": '<q>It paid for itself<br>on the first import.</q>',
        "lede": "<em>— D. Coetzee, Namibia</em>",
        "footer": "Real members · Real imports · Real savings",
    },
    "fb-30-second-opinion.html": {
        "title": "IMPOTA 30 — Second Opinion",
        "cat": "Data, Not Opinions",
        "headline": "Get a second opinion.<br><span class=\"it\">From data, not dealers.</span>",
        "lede": "Calculator runs on <em>real duty formulas</em>. Real CIF math. Real customs rates.",
        "footer": "Independent calculator · Updated rates",
    },
    "fb-31-thinking-of-buying.html": {
        "title": "IMPOTA 31 — Thinking Of It",
        "cat": "Considering an Import?",
        "headline": "Thinking of<br><span class=\"it\">importing?</span>",
        "lede": "Spend N$200 first. Read the guide. <em>Then</em> decide if it's for you.",
        "footer": "Lifetime access · N$200 · 7-day refund",
    },
    "fb-32-before-you-call.html": {
        "title": "IMPOTA 32 — Before You Call",
        "cat": "Be Prepared",
        "headline": "Before you call<br><span class=\"it\">any exporter.</span>",
        "lede": "Know what to ask. Know what they should answer. <em>Know what their fee should be.</em>",
        "footer": "8 must-ask questions · Inside",
    },
    "fb-33-looks-good.html": {
        "title": "IMPOTA 33 — Salvage Warning",
        "cat": "Too Good To Be True?",
        "headline": "Too cheap?<br><span class=\"it\">Probably salvage.</span>",
        "lede": "Accident-damaged cars from Hanamaru and TAU exist — but only if you <em>know what you're buying.</em>",
        "footer": "Salvage exporters · Grade R/RA · Read first",
    },
    "fb-34-every-buyer-wishes.html": {
        "title": "IMPOTA 34 — Wish They Knew",
        "cat": "Hindsight",
        "headline": "Things every importer<br><span class=\"it\">wishes they'd known.</span>",
        "lede": "We collected the <em>15 most expensive mistakes</em>. They're in the guide.",
        "footer": "Common mistakes · Avoidable · Documented",
    },
    "fb-35-check-not-deposit.html": {
        "title": "IMPOTA 35 — Calculate First",
        "cat": "Before You Commit",
        "headline": "Calculate before<br><span class=\"it\">you commit.</span>",
        "lede": "Vehicle price × 1.95 ≈ rough landed cost in Namibia. <em>We do the exact math.</em>",
        "footer": "Calculator · Country-specific · Free preview",
    },
    "fb-36-tiny-cost.html": {
        "title": "IMPOTA 36 — Tiny Cost",
        "cat": "The Math is Simple",
        "headline": '<span class="it">N$200</span> to save<br><span class="it">N$70,000.</span>',
        "lede": "The math is hard to argue with.",
        "footer": "0.3% of one import · Lifetime returns",
    },
    "fb-37-insurance-gap.html": {
        "title": "IMPOTA 37 — Insurance",
        "cat": "Often Missed",
        "headline": "Most imports arrive<br><span class=\"it\">uninsured.</span>",
        "lede": "We cover marine insurance, transit insurance, and <em>what happens if the ship sinks.</em>",
        "footer": "Insurance · Liability · Coverage gaps",
    },
    "fb-38-dealer-conflict.html": {
        "title": "IMPOTA 38 — Dealer Conflict",
        "cat": "Conflict of Interest",
        "headline": "Conflict of interest,<br><span class=\"it\">named.</span>",
        "lede": "Dealers make <em>N$60,000+</em> per import. Of course they say it's complicated. It's not.",
        "footer": "Their margin · Your savings · Same number",
    },
    "fb-39-four-minutes.html": {
        "title": "IMPOTA 39 — Four Minutes",
        "cat": "Quick Estimate",
        "headline": '<span class="it">Four minutes.</span><br>Full cost estimate.',
        "lede": "Open the calculator. Pick your country. <em>See your number.</em>",
        "footer": "Calculator · Free preview · No signup",
    },
    "fb-40-caveat-emptor.html": {
        "title": "IMPOTA 40 — Importer Beware",
        "cat": "Caveat Emptor",
        "headline": '<span class="it">Importer</span> beware.',
        "lede": "Not because importing is dangerous — because nobody teaches the math. <em>We do.</em>",
        "footer": "Education before risk · Always",
    },
    "fb-41-fifty-photos.html": {
        "title": "IMPOTA 41 — 50 Photos",
        "cat": "Standard Now",
        "headline": "Auction sheet<br><span class=\"it\">+ 50 photos.</span>",
        "lede": "Standard from real exporters. If yours won't share, <em>find a new exporter.</em>",
        "footer": "Photos · Auction sheet · Inspector notes",
    },
    "fb-42-never-trust.html": {
        "title": "IMPOTA 42 — Get It In Writing",
        "cat": "Never Verbal",
        "headline": "Never trust<br><span class=\"it\">'verbal' fees.</span>",
        "lede": "Get everything in writing. The <em>exporter</em> quote. The <em>shipping</em> quote. The <em>clearing</em> quote.",
        "footer": "In writing · Or no deal",
    },
    "fb-43-average-saved.html": {
        "title": "IMPOTA 43 — Average Saved",
        "cat": "What Members Save",
        "headline": "Average member saves<br><span class=\"it\">N$60,000+.</span>",
        "lede": "Per import. Per family. Per lifetime. <em>That's the math.</em>",
        "footer": "Real numbers · Real members · Real savings",
    },
    "fb-44-walkaround.html": {
        "title": "IMPOTA 44 — Full Walkthrough",
        "cat": "End To End",
        "headline": "Full walkthrough<br><span class=\"it\">from auction to driveway.</span>",
        "lede": "Step-by-step. Country-by-country. With <em>real numbers</em>, real documents, real timelines.",
        "footer": "5 steps · 4 countries · 1 platform",
    },
    "fb-45-ask-the-car.html": {
        "title": "IMPOTA 45 — Ask The Sheet",
        "cat": "Ask The Right Thing",
        "headline": "Ask the auction sheet.<br><span class=\"it\">Not the dealer.</span>",
        "lede": "It tells you grade, mileage, damage codes, modifications, and inspector notes. <em>In writing.</em>",
        "footer": "The truth · In one page",
    },
    "fb-cover-wecheck.html": {
        "title": "IMPOTA — Facebook Cover (Coverage)",
        "cat": "IMPOTA Covers",
        "headline": 'Calculator. Guides.<br><span class="it">Agents. Documents.</span>',
        "lede": "Everything for your import — lifetime access for N$200.",
        "footer": "impota.com · NA · ZA · BW · ZM",
    },
    "fb-cover.html": {
        "title": "IMPOTA — Facebook Cover",
        "cat": "Import Education",
        "headline": "Import cars from Japan.<br><span class=\"it\">Without the costly mistakes.</span>",
        "lede": "Independent education · Lifetime access · N$200",
        "footer": "impota.com",
    },
    "fb-post-pricing.html": {
        "title": "IMPOTA — Pricing Post",
        "cat": "Lifetime Access",
        "headline": '<span class="it">N$200.</span><br>One payment.',
        "lede": "Lifetime access to the complete import system. <em>No subscription.</em>",
        "footer": "Visa · Mastercard · Amex · Secure",
    },
    "fb-profile.html": {
        "title": "IMPOTA — Profile",
        "cat": "IMPOTA",
        "headline": '<span class="it">IMPOTA</span>',
        "lede": "Car import education for Southern Africa.",
        "footer": "impota.com",
    },
    "ig-dont-buy-blind.html": {
        "title": "IMPOTA IG — Don't Import Blind",
        "cat": "Don't Import Blind",
        "headline": "Don't import<br><span class=\"it\">blind.</span>",
        "lede": "Calculate. Verify. <em>Then</em> bid.",
        "footer": "impota.com · N$200 lifetime",
    },
    "ig-full-package.html": {
        "title": "IMPOTA IG — Full Package",
        "cat": "Complete Package",
        "headline": "Calculator. Guides.<br><span class=\"it\">Agents. Documents.</span>",
        "lede": "Everything for your first import — <em>N$200 lifetime.</em>",
        "footer": "impota.com",
    },
    "ig-testimonial.html": {
        "title": "IMPOTA IG — Testimonial",
        "cat": "Member Voice",
        "headline": '<q>It paid for itself on<br>the <span class="it">first import.</span></q>',
        "lede": "<em>— D. Coetzee, Namibia</em>",
        "footer": "Real members · Real imports · impota.com",
    },
    "story-checklist.html": {
        "title": "IMPOTA Story — Checklist",
        "cat": "Before You Import",
        "headline": "Five checks<br><span class=\"it\">before you bid.</span>",
        "lede": "Vehicle age · RHD · Grade · Exporter · Port. <em>Get them all right.</em>",
        "footer": "5 checks · 1 platform · impota.com",
    },
}

# ────────────────────────────────────────────────────────────────────
# Helpers
# ────────────────────────────────────────────────────────────────────

def apply_global(text: str) -> str:
    """Apply all global find/replace patterns."""
    for old, new in GLOBAL_REPLACEMENTS:
        text = text.replace(old, new)
    return text


def replace_background(text: str, bg_filename: str) -> str:
    """Swap the .photo background-image url to the chosen file."""
    encoded = bg_filename.replace(" ", "%20").replace("(", "%28").replace(")", "%29")
    return re.sub(
        r"\.photo\{[^}]*background:url\([^)]+\)",
        lambda m: re.sub(r"url\([^)]+\)", f"url('/Background%20Images/{encoded}')", m.group(0)),
        text,
        count=1,
    )


def replace_title(text: str, title: str) -> str:
    return re.sub(r"<title>[^<]*</title>", f"<title>{title}</title>", text, count=1)


def replace_top_mast(text: str) -> str:
    """Replace the top-mast brand line content."""
    return re.sub(
        r'(<div class="top-mast">)[^<]*(<span class="dot">&middot;</span>)[^<]*(</div>)',
        r'\1IMPOTA \2 Car Import Guide\3',
        text,
        count=1,
    )


def replace_cat(text: str, cat: str) -> str:
    return re.sub(r'(<div class="cat">)[^<]*(</div>)', lambda m: f'{m.group(1)}{cat}{m.group(2)}', text, count=1)


def replace_h1(text: str, h1_inner: str) -> str:
    """Replace h1 contents — match the FIRST h1 only."""
    return re.sub(r"<h1([^>]*)>.*?</h1>", lambda m: f"<h1{m.group(1)}>{h1_inner}</h1>", text, count=1, flags=re.DOTALL)


def replace_lede(text: str, lede: str) -> str:
    return re.sub(r'(<div class="lede">).*?(</div>)', lambda m: f'{m.group(1)}{lede}{m.group(2)}', text, count=1, flags=re.DOTALL)


def replace_meta(text: str, meta_html: str) -> str:
    """Replace the .meta block in footer (preserve dot separators if present)."""
    parts = [p.strip() for p in meta_html.replace(" · ", "·").split("·")]
    inner = ' '.join(parts[:1]) + (' <span>·</span> ' + ' <span>·</span> '.join(parts[1:]) if len(parts) > 1 else '')
    return re.sub(r'(<div class="meta">).*?(</div>)', lambda m: f'{m.group(1)}{inner}{m.group(2)}', text, count=1, flags=re.DOTALL)


def replace_url(text: str) -> str:
    return re.sub(r'(<div class="url">)[^<]*(</div>)', lambda m: f'{m.group(1)}impota.com{m.group(2)}', text, count=1)


# ────────────────────────────────────────────────────────────────────
# Run
# ────────────────────────────────────────────────────────────────────

count_changed = 0
count_skipped = 0

for filename in sorted(DESIGN_MAP.keys()):
    filepath = DESIGNS_DIR / filename
    if not filepath.exists():
        print(f"  ⚠ skip (missing): {filename}")
        count_skipped += 1
        continue

    text = filepath.read_text(encoding="utf-8")
    spec = DESIGN_MAP[filename]

    # Pick a background image — deterministic but varied
    bg = bg_images[abs(hash(filename)) % len(bg_images)]

    # Apply transformations
    text = apply_global(text)
    text = replace_background(text, bg)
    text = replace_title(text, spec["title"])
    text = replace_top_mast(text)
    text = replace_cat(text, spec["cat"])
    text = replace_h1(text, spec["headline"])
    text = replace_lede(text, spec["lede"])
    text = replace_meta(text, spec["footer"])
    text = replace_url(text)

    filepath.write_text(text, encoding="utf-8")
    print(f"  OK {filename}  ->  bg={bg}")
    count_changed += 1

print(f"\nDone. {count_changed} updated, {count_skipped} skipped.")
