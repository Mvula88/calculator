# -*- coding: utf-8 -*-
"""Compress the user's imported-car photos in-place (1080px max, JPEG q85)."""
from pathlib import Path
from PIL import Image

MAX_EDGE = 1080
QUALITY = 85
ROOT = Path(r"c:\Users\ismae\Desktop\calculator\public\Cars Imported Images")

files = sorted([p for p in ROOT.iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png"}])
before = sum(f.stat().st_size for f in files)
after = 0

for f in files:
    pre = f.stat().st_size
    with Image.open(f) as im:
        # Honor EXIF orientation so portrait phone shots stay upright
        try:
            from PIL import ImageOps
            im = ImageOps.exif_transpose(im)
        except Exception:
            pass
        im = im.convert("RGB")
        w, h = im.size
        scale = MAX_EDGE / max(w, h)
        if scale < 1:
            im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
        im.save(f, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    post = f.stat().st_size
    after += post
    print(f"  {f.name}: {pre/1024:.0f}KB -> {post/1024:.0f}KB")

print(f"\nTotal: {before/1024/1024:.1f} MB -> {after/1024/1024:.1f} MB")
