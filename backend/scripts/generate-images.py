"""Generate colorful topic illustration images for Sains Bijak app."""
from __future__ import annotations

import json
import math
import os
import random
import struct
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_BACKEND = ROOT / "public" / "images"
OUT_MOBILE = ROOT.parent / "mobile" / "assets" / "images"

YEAR_PALETTES = {
    1: [(76, 175, 80), (129, 199, 132), (255, 241, 118)],
    2: [(33, 150, 243), (100, 181, 246), (179, 229, 252)],
    3: [(255, 152, 0), (255, 183, 77), (255, 224, 178)],
    4: [(156, 39, 176), (186, 104, 200), (225, 190, 231)],
    5: [(233, 30, 99), (240, 98, 146), (248, 187, 208)],
    6: [(244, 67, 54), (239, 83, 80), (255, 205, 210)],
}

TOPIC_SHAPES = [
    "circle_cluster",
    "wave",
    "star_burst",
    "leaf",
    "atom",
    "planet",
]


def _png(w: int, h: int, rgba_pixels: list[tuple[int, int, int, int]]) -> bytes:
    def chunk(tag: bytes, data: bytes) -> bytes:
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    raw = b""
    for y in range(h):
        raw += b"\x00"
        for x in range(w):
            r, g, b, a = rgba_pixels[y * w + x]
            raw += bytes((r, g, b, a))

    return (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(raw, 9))
        + chunk(b"IEND", b"")
    )


def _lerp(a: int, b: int, t: float) -> int:
    return int(a + (b - a) * t)


def _gradient(w: int, h: int, c1: tuple[int, int, int], c2: tuple[int, int, int], c3: tuple[int, int, int]) -> list[tuple[int, int, int, int]]:
    px: list[tuple[int, int, int, int]] = []
    for y in range(h):
        ty = y / max(h - 1, 1)
        for x in range(w):
            tx = x / max(w - 1, 1)
            t = (ty * 0.7 + tx * 0.3)
            if t < 0.5:
                tt = t * 2
                r = _lerp(c1[0], c2[0], tt)
                g = _lerp(c1[1], c2[1], tt)
                b = _lerp(c1[2], c2[2], tt)
            else:
                tt = (t - 0.5) * 2
                r = _lerp(c2[0], c3[0], tt)
                g = _lerp(c2[1], c3[1], tt)
                b = _lerp(c2[2], c3[2], tt)
            px.append((r, g, b, 255))
    return px


def _draw_circle(px: list, w: int, h: int, cx: int, cy: int, radius: int, color: tuple[int, int, int, int]):
    for y in range(max(0, cy - radius), min(h, cy + radius + 1)):
        for x in range(max(0, cx - radius), min(w, cx + radius + 1)):
            if (x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2:
                px[y * w + x] = color


def _draw_soft_blobs(px: list, w: int, h: int, palette: tuple, seed: int, shape: str):
    rng = random.Random(seed)
    accents = [
        (min(255, palette[0][0] + 40), min(255, palette[0][1] + 40), min(255, palette[0][2] + 40), 180),
        (255, 255, 255, 120),
        (palette[2][0], palette[2][1], palette[2][2], 160),
    ]
    for i in range(8):
        cx = int(w * (0.2 + rng.random() * 0.6))
        cy = int(h * (0.2 + rng.random() * 0.6))
        r = int(min(w, h) * (0.08 + rng.random() * 0.15))
        _draw_circle(px, w, h, cx, cy, r, accents[i % len(accents)])

    if shape == "planet":
        _draw_circle(px, w, h, w // 2, h // 2, int(min(w, h) * 0.22), (255, 255, 255, 200))
        _draw_circle(px, w, h, w // 2 + 30, h // 2, int(min(w, h) * 0.28), (255, 255, 255, 80))
    elif shape == "atom":
        cx, cy = w // 2, h // 2
        for angle in range(0, 360, 60):
            rad = math.radians(angle)
            ex = int(cx + math.cos(rad) * w * 0.3)
            ey = int(cy + math.sin(rad) * h * 0.18)
            _draw_circle(px, w, h, ex, ey, 12, (255, 255, 255, 200))
        _draw_circle(px, w, h, cx, cy, 18, (255, 255, 255, 230))
    elif shape == "leaf":
        for i in range(5):
            _draw_circle(px, w, h, w // 2 - 40 + i * 20, h // 2 + 20, 35 - i * 3, (76, 175, 80, 150))
    elif shape == "star_burst":
        cx, cy = w // 2, h // 2
        for i in range(12):
            rad = math.radians(i * 30)
            ex = int(cx + math.cos(rad) * w * 0.35)
            ey = int(cy + math.sin(rad) * h * 0.35)
            _draw_circle(px, w, h, ex, ey, 10, (255, 235, 59, 200))


def create_topic_image(path: Path, title: str, year: int, slug: str):
    w, h = 512, 512
    palette = YEAR_PALETTES.get(year, YEAR_PALETTES[1])
    shape = TOPIC_SHAPES[hash(slug) % len(TOPIC_SHAPES)]
    px = _gradient(w, h, palette[0], palette[1], palette[2])
    _draw_soft_blobs(px, w, h, palette, hash(title), shape)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(_png(w, h, px))


def create_year_banner(path: Path, year: int):
    w, h = 800, 300
    palette = YEAR_PALETTES.get(year, YEAR_PALETTES[1])
    px = _gradient(w, h, palette[0], palette[1], palette[2])
    _draw_soft_blobs(px, w, h, palette, year * 17, "star_burst")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(_png(w, h, px))


def create_badge(path: Path, hue: int):
    w, h = 256, 256
    c1 = ((hue * 40) % 200 + 55, (hue * 25) % 180 + 75, (hue * 55) % 200 + 55)
    c2 = (min(255, c1[0] + 60), min(255, c1[1] + 60), min(255, c1[2] + 60))
    px = _gradient(w, h, c1, c2, (255, 255, 255))
    _draw_circle(px, w, h, w // 2, h // 2, 90, (255, 255, 255, 200))
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(_png(w, h, px))


def main():
    manifest_path = ROOT / "src" / "seed" / "image-manifest.json"
    topics_dir_b = OUT_BACKEND / "topics"
    topics_dir_m = OUT_MOBILE / "topics"
    years_dir_b = OUT_BACKEND / "years"
    years_dir_m = OUT_MOBILE / "years"
    badges_dir_b = OUT_BACKEND / "badges"
    badges_dir_m = OUT_MOBILE / "badges"

    # Load slugs from seed helper by importing via node
    import subprocess
    result = subprocess.run(
        ["npx", "tsx", "-e", """
import { getAllTopicSlugs } from './src/seed/content-data';
console.log(JSON.stringify(getAllTopicSlugs()));
"""],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
        shell=True,
    )
    topics = json.loads(result.stdout.strip() or "[]")

    for t in topics:
        slug = t["slug"]
        title = t["title"]
        year = t["year"]
        for out in [topics_dir_b / f"{slug}.png", topics_dir_m / f"{slug}.png"]:
            create_topic_image(out, title, year, slug)
        print(f"OK topic: {slug}")

    for year in range(1, 7):
        for out in [years_dir_b / f"year-{year}-banner.png", years_dir_m / f"year-{year}-banner.png"]:
            create_year_banner(out, year)
        print(f"OK year banner: {year}")

    badge_names = [
        "first-login", "first-note", "first-quiz", "quiz-perfect", "experiment",
        "flashcard", "year-complete", "streak", "kbat", "hero",
        "year-1", "year-2", "year-3", "year-4", "year-5", "year-6",
    ]
    for i, name in enumerate(badge_names):
        for out in [badges_dir_b / f"{name}.png", badges_dir_m / f"{name}.png"]:
            create_badge(out, i * 23 + 10)
        print(f"OK badge: {name}")

    manifest_path.write_text(json.dumps(topics, indent=2), encoding="utf-8")
    print(f"\nGenerated {len(topics)} topic images + banners + badges")


if __name__ == "__main__":
    main()