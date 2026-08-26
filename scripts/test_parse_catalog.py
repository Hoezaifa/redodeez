"""
Test and build product catalog from upload manifest and processed file names.
"""
import os
import re
import json

KNOWN_COLORS = {
    'black': 'Black',
    'white': 'White',
    'whte': 'White',
    'whiet': 'White',
    'wite': 'White',
    'beige': 'Beige',
    'biege': 'Beige',
    'grey': 'Grey',
    'gray': 'Grey',
    'gre': 'Grey',
    'blue': 'Blue',
    'navy': 'Navy',
    'maroon': 'Maroon',
    'red': 'Red',
    'olive': 'Olive',
    'sand': 'Sand',
    'green': 'Green',
    'yellow': 'Yellow',
    'purple': 'Purple',
    'acid': 'Acid Wash',
    'acidblack': 'Acid Wash',
}

def parse_filename(stem):
    """
    Parse stem like 'ace-1-black-back' or 'anime1beige-front' or 'berserk2--black-front'
    Returns (design_id, color, side)
    """
    # Determine side (front or back)
    side = 'front'
    if stem.endswith('-back'):
        side = 'back'
        stem = stem[:-5]
    elif stem.endswith('-front'):
        side = 'front'
        stem = stem[:-6]
    
    # Normalize double dashes or strange trailing chars
    stem = re.sub(r'-+', '-', stem).strip('-')
    
    # Try matching color at the end or embedded
    color = 'Black'  # default fallback
    design = stem
    
    # Check for color matching at the end of stem
    found_color = None
    
    # Check words separated by hyphen
    parts = stem.split('-')
    if len(parts) > 1 and parts[-1].lower() in KNOWN_COLORS:
        found_color = KNOWN_COLORS[parts[-1].lower()]
        design = '-'.join(parts[:-1])
    else:
        # Check if color is attached to design without hyphen, e.g. anime1beige, berserkbeige
        for c_key, c_val in KNOWN_COLORS.items():
            if stem.lower().endswith(c_key) and len(stem) > len(c_key):
                found_color = c_val
                design = stem[:-len(c_key)].rstrip('-')
                break
    
    if found_color:
        color = found_color
        
    # Clean up design name
    design = re.sub(r'-+', '-', design).strip('-').lower()
    
    return design, color, side

def test_parse():
    processed_dir = r"D:\DEEZ SHIT\outputs\processed"
    categories = ["regular", "drops", "acid"]
    
    products_grouped = {}
    
    for cat in categories:
        cat_path = os.path.join(processed_dir, cat)
        if not os.path.exists(cat_path):
            continue
        for fn in os.listdir(cat_path):
            if not fn.endswith('.jpg'):
                continue
            stem = fn[:-4]
            design, color, side = parse_filename(stem)
            
            key = (cat, design)
            if key not in products_grouped:
                products_grouped[key] = {}
            if color not in products_grouped[key]:
                products_grouped[key][color] = {}
            products_grouped[key][color][side] = fn

    print(f"Total unique products grouped: {len(products_grouped)}")
    for (cat, design), colors in list(products_grouped.items())[:15]:
        color_list = list(colors.keys())
        print(f"[{cat}] {design} -> Colors: {color_list}")

if __name__ == '__main__':
    test_parse()
