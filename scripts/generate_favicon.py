# -*- coding: utf-8 -*-
"""Generate the IMPOTA favicon set.

  Design: black square (zinc-950 #09090b)
          white 'impota' wordmark
          amber dot at end (#fbbf24)

  Strategy:
    - Sizes >= 96px render the full 'impota.' wordmark
    - Sizes  < 96px render compact 'i.' so it's still legible in browser tabs

  Output goes to /public/, matching the filenames already referenced by
  app/layout.tsx (favicon-16x16.png, favicon-32x32.png, favicon.png,
  favicon.ico, icon-192/256/384/512x512.png).
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

PUBLIC = Path(r"c:\Users\ismae\Desktop\calculator\public")

BG = (9, 9, 11)          # zinc-950
TEXT = (250, 250, 249)   # stone-50 (off-white, same as Wordmark component)
DOT = (251, 191, 36)     # amber-400


# Inter Black is the IMPOTA brand wordmark font (matches Wordmark.tsx,
# which inherits Inter from app/layout.tsx + Tailwind font-black/900).
# Local copy lives next to this script. System fonts fall back if missing.
FONT_CANDIDATES = [
    str(Path(__file__).parent / "Inter-Black.woff2"),
    str(Path(__file__).parent / "Inter-Black.ttf"),
    r"C:\Windows\Fonts\arialbd.ttf",
    r"C:\Windows\Fonts\seguibl.ttf",
    r"C:\Windows\Fonts\segoeuib.ttf",
    r"C:\Windows\Fonts\arial.ttf",
]


def load_font(size_px: int) -> ImageFont.FreeTypeFont:
    for path in FONT_CANDIDATES:
        try:
            return ImageFont.truetype(path, size_px)
        except (OSError, IOError):
            continue
    return ImageFont.load_default()


def draw_wordmark(canvas: Image.Image, text: str, *, padding_ratio: float = 0.10) -> None:
    """Fit 'impota.' (or 'i.') inside the canvas with both colors,
       with 'impota' in TEXT and the trailing '.' in DOT."""
    W, H = canvas.size
    draw = ImageDraw.Draw(canvas)

    # Binary-search the font size that maximizes glyph height within padding
    target_h = int(H * (1 - 2 * padding_ratio))
    target_w = int(W * (1 - 2 * padding_ratio))

    lo, hi, best = 4, H * 2, 4
    while lo <= hi:
        mid = (lo + hi) // 2
        font = load_font(mid)
        bbox = font.getbbox(text)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        if tw <= target_w and th <= target_h:
            best = mid
            lo = mid + 1
        else:
            hi = mid - 1

    font = load_font(best)

    # Measure each part so we can color the dot differently
    head = text[:-1]  # 'impota' or 'i'
    tail = text[-1:]  # '.'
    head_bbox = font.getbbox(head)
    tail_bbox = font.getbbox(tail)
    full_bbox = font.getbbox(text)

    full_w = full_bbox[2] - full_bbox[0]
    full_h = full_bbox[3] - full_bbox[1]

    # Center the FULL string (head + tail) in the canvas
    x = (W - full_w) // 2 - full_bbox[0]
    y = (H - full_h) // 2 - full_bbox[1]

    draw.text((x, y), head, font=font, fill=TEXT)
    # Place the dot immediately after the head's right edge
    head_w = head_bbox[2] - head_bbox[0]
    dot_x = x + head_w
    draw.text((dot_x, y), tail, font=font, fill=DOT)


def make_icon(size: int) -> Image.Image:
    img = Image.new("RGB", (size, size), BG)
    text = "i." if size < 96 else "impota."
    # Slightly more padding on the wordmark version so it doesn't touch edges
    pad = 0.18 if size < 96 else 0.10
    draw_wordmark(img, text, padding_ratio=pad)
    return img


outputs = [
    ("favicon-16x16.png", 16),
    ("favicon-32x32.png", 32),
    ("favicon.png", 64),
    ("icon-192x192.png", 192),
    ("icon-256x256.png", 256),
    ("icon-384x384.png", 384),
    ("icon-512x512.png", 512),
]

for filename, size in outputs:
    img = make_icon(size)
    img.save(PUBLIC / filename, "PNG", optimize=True)
    print(f"  OK  {filename}  ({size}x{size})")

# favicon.ico — multi-resolution container (16, 32, 48)
ico_sizes = [(16, 16), (32, 32), (48, 48)]
ico_base = make_icon(64).resize((48, 48), Image.LANCZOS)
ico_base.save(PUBLIC / "favicon.ico", format="ICO", sizes=ico_sizes)
print(f"  OK  favicon.ico  (16/32/48)")

print(f"\nWrote {len(outputs) + 1} files to {PUBLIC}")
