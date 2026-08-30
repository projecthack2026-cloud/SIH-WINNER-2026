import os
import re
import urllib.request
import geopandas as gpd

# Reliable raw URLs for States and 2019 Parliamentary Constituencies
STATES_URL = "https://raw.githubusercontent.com/datameet/maps/master/website/docs/data/geojson/states.geojson"
# Using an open-source repo that hosts the clean, post-2008 delimitation PC map in GeoJSON
PC_URL = "https://raw.githubusercontent.com/SaiSiddhardhaKalla/india-pc-stats/master/india_pc_2019.geojson"

BASE_DATA_DIR = os.path.join("static", "data")
RAW_DIR = os.path.join(BASE_DATA_DIR, "raw")
CONST_SPLIT_DIR = os.path.join(BASE_DATA_DIR, "constituencies") # Replaced districts with constituencies

def ensure_directories():
    os.makedirs(RAW_DIR, exist_ok=True)
    os.makedirs(CONST_SPLIT_DIR, exist_ok=True)

def download_file(url, target_path):
    print(f"Downloading {os.path.basename(target_path)}...")
    urllib.request.urlretrieve(url, target_path)
    size_mb = os.path.getsize(target_path) / (1024 * 1024)
    print(f"  └─ Downloaded ({size_mb:.2f} MB)")

def normalize_state_name(name):
    """Normalize legacy names or slight repository typos to current official spellings."""
    if not isinstance(name, str):
        return name
    
    # These mappings ensure the state names match exactly between the State Map and the PC Map
    mapping = {
        "Orissa": "Odisha",
        "Uttaranchal": "Uttarakhand",
        "Andaman & Nicobar Island": "Andaman and Nicobar Islands",
        "NCT OF Delhi": "Delhi",
        "Jammu & Kashmir": "Jammu and Kashmir"
    }
    
    # Title Case the name to fix issues like "MAHARASHTRA" vs "Maharashtra"
    name = name.title() 
    return mapping.get(name, name)

def slugify(text):
    """Converts state names like 'Jammu & Kashmir' -> 'jammu_and_kashmir' for clean filenames."""
    if not isinstance(text, str):
        return "unknown"
    text = text.replace("&", "and")
    text = re.sub(r'[^a-zA-Z0-9\s_]', '', text)
    text = text.strip().lower()
    return re.sub(r'[\s]+', '_', text)

def process_states():
    raw_path = os.path.join(RAW_DIR, "india_states_raw.geojson")
    output_path = os.path.join(BASE_DATA_DIR, "india_states_lite.geojson")
    
    if not os.path.exists(raw_path):
        download_file(STATES_URL, raw_path)
        
    print("Processing States map...")
    gdf = gpd.read_file(raw_path)
    
    # Detect State Column
    state_col = 'ST_NM' if 'ST_NM' in gdf.columns else 'name'
    if state_col in gdf.columns:
        gdf[state_col] = gdf[state_col].apply(normalize_state_name)

    # Simplify Geometry
    gdf['geometry'] = gdf['geometry'].simplify(0.03, preserve_topology=True)
    gdf.to_file(output_path, driver='GeoJSON')
    print(f"  └─ Saved normalized and compressed states map: {output_path}")

def process_and_split_constituencies():
    raw_path = os.path.join(RAW_DIR, "india_pc_raw.geojson")
    lite_path = os.path.join(BASE_DATA_DIR, "india_pc_lite.geojson")
    
    if not os.path.exists(raw_path):
        download_file(PC_URL, raw_path)
        
    print("Processing & Simplification of Parliamentary Constituencies map...")
    gdf = gpd.read_file(raw_path)
    
    # Simplify geometry for faster dashboard loading
    gdf['geometry'] = gdf['geometry'].simplify(0.001, preserve_topology=True)
    
    # Save a combined lite version just in case
    gdf.to_file(lite_path, driver='GeoJSON')

    # Detect the State Column Name (Different repos use ST_NAME, ST_NM, etc.)
    state_col = None
    for candidate in ['ST_NAME', 'ST_NM', 'st_name', 'state', 'STATE', 'State']:
        if candidate in gdf.columns:
            state_col = candidate
            break
            
    if not state_col:
        print("  └─ ⚠️ Could not identify state column for splitting. Available columns:", gdf.columns)
        return

    print(f"Normalizing state names and splitting constituencies using column: '{state_col}'...")
    
    # Normalize state names before splitting to prevent 404 errors on the frontend
    gdf[state_col] = gdf[state_col].apply(normalize_state_name)

    unique_states = gdf[state_col].dropna().unique()
    
    count = 0
    for state_name in unique_states:
        state_slug = slugify(state_name)
        if not state_slug or state_slug == "unknown":
            continue
            
        # Filter dataframe for just this state
        state_constituencies = gdf[gdf[state_col] == state_name]
        out_file = os.path.join(CONST_SPLIT_DIR, f"{state_slug}.json")
        
        # Save as a lightweight state-specific JSON
        state_constituencies.to_file(out_file, driver='GeoJSON')
        count += 1
        
    print(f"  └─ ✅ Successfully split into {count} state-level constituency files inside /{CONST_SPLIT_DIR}/")

if __name__ == "__main__":
    print("==================================================")
    print("   MPLADS Map Processor (Constituencies Update)")
    print("==================================================")
    ensure_directories()
    process_states()
    process_and_split_constituencies()
    print("==================================================")
    print("All tasks completed successfully!")
