"""
Deez Prints — One-time image splitting script.
Splits front+back composite mockups into individual images.
Detects blank sides and only keeps sides with actual artwork.
"""
import os
import sys
from pathlib import Path
from PIL import Image
import numpy as np

SOURCE_ROOT = Path(r"D:\DEEZ SHIT\outputs")
PROCESSED_ROOT = SOURCE_ROOT / "processed"
CATEGORIES = ["regular", "drops", "acid"]

# Minimum standard deviation threshold to consider a side as having artwork
# A blank garment side has very low color variance
BLANK_THRESHOLD = 25  # tuned for garment mockups on grey background


def has_artwork(img_array: np.ndarray) -> bool:
    """Check if an image region contains meaningful artwork beyond a plain garment."""
    # Sample the central region (where artwork would be on the garment)
    h, w = img_array.shape[:2]
    # Focus on the center 60% of the garment area
    y1, y2 = int(h * 0.15), int(h * 0.85)
    x1, x2 = int(w * 0.15), int(w * 0.85)
    center = img_array[y1:y2, x1:x2]
    
    # Convert to grayscale for analysis
    if len(center.shape) == 3:
        gray = np.mean(center, axis=2)
    else:
        gray = center
    
    # Calculate local standard deviation — artwork has high variance
    std_dev = np.std(gray)
    
    # Also check color variance (artwork typically has color variation)
    if len(center.shape) == 3:
        color_range = np.max(center, axis=2) - np.min(center, axis=2)
        color_var = np.mean(color_range)
    else:
        color_var = 0
    
    return std_dev > BLANK_THRESHOLD or color_var > 20


def process_image(src_path: Path, dest_dir: Path) -> dict:
    """Split a composite image and return info about what was created."""
    stem = src_path.stem  # e.g., "aizen-white"
    
    img = Image.open(src_path)
    w, h = img.size
    
    # Split at midpoint
    mid = w // 2
    left = img.crop((0, 0, mid, h))
    right = img.crop((mid, 0, w, h))
    
    left_arr = np.array(left)
    right_arr = np.array(right)
    
    left_has_art = has_artwork(left_arr)
    right_has_art = has_artwork(right_arr)
    
    result = {"source": src_path.name, "front": None, "back": None}
    
    dest_dir.mkdir(parents=True, exist_ok=True)
    
    if left_has_art and right_has_art:
        # Both sides have artwork — front + back
        front_path = dest_dir / f"{stem}-front.jpg"
        back_path = dest_dir / f"{stem}-back.jpg"
        left.save(front_path, "JPEG", quality=92)
        right.save(back_path, "JPEG", quality=92)
        result["front"] = front_path.name
        result["back"] = back_path.name
    elif left_has_art:
        # Only left side has artwork
        front_path = dest_dir / f"{stem}-front.jpg"
        left.save(front_path, "JPEG", quality=92)
        result["front"] = front_path.name
    elif right_has_art:
        # Only right side has artwork
        front_path = dest_dir / f"{stem}-front.jpg"
        right.save(front_path, "JPEG", quality=92)
        result["front"] = front_path.name
    else:
        # Neither side detected as having artwork — save both as fallback
        print(f"  [WARN] Neither side detected as artwork for {src_path.name}, saving both")
        front_path = dest_dir / f"{stem}-front.jpg"
        back_path = dest_dir / f"{stem}-back.jpg"
        left.save(front_path, "JPEG", quality=92)
        right.save(back_path, "JPEG", quality=92)
        result["front"] = front_path.name
        result["back"] = back_path.name
    
    return result


def main():
    total = 0
    results = {}
    
    for cat in CATEGORIES:
        src_dir = SOURCE_ROOT / cat
        dest_dir = PROCESSED_ROOT / cat
        
        if not src_dir.exists():
            print(f"[WARN] Source directory not found: {src_dir}")
            continue
        
        files = sorted([f for f in src_dir.iterdir() if f.suffix.lower() in (".jpg", ".jpeg", ".png")])
        print(f"\n{'='*60}")
        print(f"Processing {cat}: {len(files)} files")
        print(f"{'='*60}")
        
        cat_results = []
        for i, f in enumerate(files, 1):
            sys.stdout.write(f"\r  [{i}/{len(files)}] {f.name}...")
            sys.stdout.flush()
            result = process_image(f, dest_dir)
            cat_results.append(result)
            total += 1
        
        results[cat] = cat_results
        print(f"\n  [OK] {len(files)} images processed -> {dest_dir}")
    
    # Print summary
    print(f"\n{'='*60}")
    print(f"SUMMARY")
    print(f"{'='*60}")
    for cat in CATEGORIES:
        if cat in results:
            both = sum(1 for r in results[cat] if r["front"] and r["back"])
            front_only = sum(1 for r in results[cat] if r["front"] and not r["back"])
            print(f"  {cat}: {len(results[cat])} images -> {both} front+back, {front_only} front-only")
    print(f"  Total processed: {total}")
    print(f"\nProcessed files saved to: {PROCESSED_ROOT}")


if __name__ == "__main__":
    main()
