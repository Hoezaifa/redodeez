"""
Deez Prints — Split & Filter New Regular T-Shirts Batch.
Splits composite mockups from 'D:\\DEEZ SHIT\\outputs\\new regular\\compressed'
into front & back images, drops plain sides, and outputs to 'D:\\DEEZ SHIT\\outputs\\new regular\\split'.
"""
import os
import sys
import json
from pathlib import Path
import numpy as np
from PIL import Image

SRC_DIR = Path(r"D:\DEEZ SHIT\outputs\new regular\compressed")
DEST_DIR = Path(r"D:\DEEZ SHIT\outputs\new regular\split")
MANIFEST_OUT = DEST_DIR / "split_manifest.json"

def is_plain_fabric(crop: Image.Image) -> tuple[float, float, bool]:
    """
    Check if a garment side crop is plain blank fabric.
    Returns (std_gray, range_gray, is_plain).
    """
    arr = np.array(crop.convert("RGB"))
    h, w = arr.shape[:2]
    # Sample center torso region (avoiding sleeves, collar, background)
    torso = arr[int(h * 0.22):int(h * 0.78), int(w * 0.28):int(w * 0.72)]
    gray = np.mean(torso, axis=2)
    std_val = float(np.std(gray))
    rng_val = float(np.max(gray) - np.min(gray))
    
    # Plain blank sides in this mockup batch have std < 4.0 and range < 50
    # Artwork sides have std >= 5.5 and range > 100
    is_plain = (std_val < 4.5) and (rng_val < 55.0)
    return std_val, rng_val, is_plain

def process_batch():
    DEST_DIR.mkdir(parents=True, exist_ok=True)
    
    files = sorted(list(SRC_DIR.glob("*.png")) + list(SRC_DIR.glob("*.jpg")))
    print(f"Processing {len(files)} composite images from:\n  {SRC_DIR}\n")
    print(f"Output directory:\n  {DEST_DIR}\n")
    
    manifest = []
    total_fronts = 0
    total_backs = 0
    dropped_backs = 0
    dropped_fronts = 0
    
    for i, file_path in enumerate(files, 1):
        im = Image.open(file_path)
        w, h = im.size
        mid = w // 2
        
        left_crop = im.crop((0, 0, mid, h))
        right_crop = im.crop((mid, 0, w, h))
        
        l_std, l_rng, l_plain = is_plain_fabric(left_crop)
        r_std, r_rng, r_plain = is_plain_fabric(right_crop)
        
        # Base naming: replace '--front-back' with '--front' and '--back'
        stem = file_path.stem
        if "--front-back" in stem:
            front_name = f"{stem.replace('--front-back', '--front')}.png"
            back_name = f"{stem.replace('--front-back', '--back')}.png"
        else:
            front_name = f"{stem}--front.png"
            back_name = f"{stem}--back.png"
            
        record = {
            "source": file_path.name,
            "front_saved": None,
            "back_saved": None,
            "front_stats": {"std": round(l_std, 2), "rng": round(l_rng, 2), "plain": l_plain},
            "back_stats": {"std": round(r_std, 2), "rng": round(r_rng, 2), "plain": r_plain},
        }
        
        # Front side (Left crop)
        if not l_plain:
            out_front = DEST_DIR / front_name
            left_crop.save(out_front, optimize=True)
            record["front_saved"] = front_name
            total_fronts += 1
        else:
            dropped_fronts += 1
            print(f"  [PLAIN FRONT DROPPED] {file_path.name}")
            
        # Back side (Right crop)
        if not r_plain:
            out_back = DEST_DIR / back_name
            right_crop.save(out_back, optimize=True)
            record["back_saved"] = back_name
            total_backs += 1
        else:
            dropped_backs += 1
            
        manifest.append(record)
        
        # Status line
        sides_str = []
        if record["front_saved"]:
            sides_str.append("FRONT")
        if record["back_saved"]:
            sides_str.append("BACK")
        status = "+".join(sides_str) if sides_str else "NONE"
        print(f"[{i:2d}/{len(files)}] {file_path.stem[:48]:48s} -> {status}")
        
    # Save manifest
    with open(MANIFEST_OUT, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
        
    print(f"\n{'='*70}")
    print(f"BATCH PROCESSING COMPLETE")
    print(f"{'='*70}")
    print(f"Total source mockups:       {len(files)}")
    print(f"Total front images saved:   {total_fronts}")
    print(f"Total back images saved:    {total_backs}")
    print(f"Total plain backs dropped:  {dropped_backs}")
    print(f"Total plain fronts dropped: {dropped_fronts}")
    print(f"Total resulting files:      {total_fronts + total_backs}")
    print(f"Saved split manifest to:    {MANIFEST_OUT}")
    print(f"All images ready at:        {DEST_DIR}")

if __name__ == "__main__":
    process_batch()
