"""
Deez Prints -- One-time Cloudinary upload script.
Uploads all processed front/back images and saves a JSON manifest.
"""
import os
import sys
import json
import time
import requests
from pathlib import Path

PROCESSED_ROOT = Path(r"D:\DEEZ SHIT\outputs\processed")
MANIFEST_PATH = Path(r"D:\DEEZ SHIT\outputs\upload_manifest.json")

CLOUD_NAME = "okcxaese"
UPLOAD_PRESET = "deez_prints"
UPLOAD_URL = f"https://api.cloudinary.com/v1_1/{CLOUD_NAME}/image/upload"

CATEGORIES = ["regular", "drops", "acid"]

# Delay between uploads to avoid rate limiting (seconds)
UPLOAD_DELAY = 0.3


def upload_image(file_path: Path, folder: str) -> str:
    """Upload a single image to Cloudinary and return the secure URL."""
    with open(file_path, "rb") as f:
        resp = requests.post(
            UPLOAD_URL,
            data={
                "upload_preset": UPLOAD_PRESET,
                "folder": folder,
            },
            files={"file": (file_path.name, f, "image/jpeg")},
            timeout=60,
        )
    
    if resp.status_code != 200:
        raise Exception(f"Upload failed ({resp.status_code}): {resp.text[:200]}")
    
    data = resp.json()
    return data["secure_url"]


def main():
    manifest = {}
    total_uploaded = 0
    total_skipped = 0
    
    # Load existing manifest to resume interrupted uploads
    if MANIFEST_PATH.exists():
        with open(MANIFEST_PATH, "r") as f:
            manifest = json.load(f)
        print(f"Loaded existing manifest with {len(manifest)} entries")
    
    for cat in CATEGORIES:
        cat_dir = PROCESSED_ROOT / cat
        if not cat_dir.exists():
            print(f"[WARN] Processed directory not found: {cat_dir}")
            continue
        
        files = sorted([f for f in cat_dir.iterdir() if f.suffix.lower() in (".jpg", ".jpeg")])
        print(f"\n{'='*60}")
        print(f"Uploading {cat}: {len(files)} files")
        print(f"{'='*60}")
        
        for i, fpath in enumerate(files, 1):
            # Build a manifest key like "regular/aizen-white-front"
            manifest_key = f"{cat}/{fpath.stem}"
            
            # Skip if already uploaded
            if manifest_key in manifest:
                total_skipped += 1
                sys.stdout.write(f"\r  [{i}/{len(files)}] SKIP {fpath.name} (already uploaded)")
                sys.stdout.flush()
                continue
            
            sys.stdout.write(f"\r  [{i}/{len(files)}] Uploading {fpath.name}...")
            sys.stdout.flush()
            
            try:
                folder = f"deez-prints/{cat}"
                url = upload_image(fpath, folder)
                manifest[manifest_key] = url
                total_uploaded += 1
                
                # Save manifest after each upload for crash recovery
                if total_uploaded % 10 == 0:
                    with open(MANIFEST_PATH, "w") as f:
                        json.dump(manifest, f, indent=2)
                
                time.sleep(UPLOAD_DELAY)
                
            except Exception as e:
                print(f"\n  [ERROR] Failed to upload {fpath.name}: {e}")
                # Save manifest before stopping
                with open(MANIFEST_PATH, "w") as f:
                    json.dump(manifest, f, indent=2)
                print(f"  Manifest saved. Re-run to resume.")
                continue
        
        print(f"\n  [OK] {cat} uploads complete")
    
    # Final save
    with open(MANIFEST_PATH, "w") as f:
        json.dump(manifest, f, indent=2)
    
    print(f"\n{'='*60}")
    print(f"SUMMARY")
    print(f"{'='*60}")
    print(f"  Uploaded: {total_uploaded}")
    print(f"  Skipped (already done): {total_skipped}")
    print(f"  Total in manifest: {len(manifest)}")
    print(f"  Manifest saved to: {MANIFEST_PATH}")


if __name__ == "__main__":
    main()
