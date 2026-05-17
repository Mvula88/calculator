# -*- coding: utf-8 -*-
"""Compress background images to 1080px max edge, JPEG quality 85, no metadata.

The designs render at 1080x1080 with background-size:cover, so anything
larger than 1080 on the longest side is wasted bytes. Quality 85 is
visually indistinguishable from quality 100 for backgrounds that sit
under a dark gradient overlay.
"""
from pathlib import Path
from PIL import Image

MAX_EDGE = 1080
QUALITY = 85
ROOT = Path(r"c:\Users\ismae\Desktop\calculator\public\Background Images")

files = sorted(ROOT.glob("*.jpg"))
before_total = sum(f.stat().st_size for f in files)
after_total = 0

for f in files:
    before = f.stat().st_size
    with Image.open(f) as im:
        im = im.convert("RGB")
        w, h = im.size
        scale = MAX_EDGE / max(w, h)
        if scale < 1:
            new_size = (round(w * scale), round(h * scale))
            im = im.resize(new_size, Image.LANCZOS)
        # Save with no exif, optimized, progressive JPEG
        im.save(f, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    after = f.stat().st_size
    after_total += after
    print(f"  {f.name}: {before/1024:.0f}KB -> {after/1024:.0f}KB  ({(1-after/before)*100:.0f}% smaller)")

print(f"\nTotal: {before_total/1024/1024:.1f} MB -> {after_total/1024/1024:.1f} MB")
print(f"Saved {(before_total - after_total)/1024/1024:.1f} MB ({(1-after_total/before_total)*100:.0f}%)")
