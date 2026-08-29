import os
import urllib.request
import json

# Standard, open-source URLs for India boundaries
STATES_URL = "https://raw.githubusercontent.com/datameet/maps/master/website/docs/data/geojson/states.geojson"
DISTRICTS_URL = "https://raw.githubusercontent.com/geohacker/india/master/district/india_district.geojson"

# Ensure the data directory exists
DATA_DIR = os.path.join("static", "data")
os.makedirs(DATA_DIR, exist_ok=True)

def download_and_verify(url, filename):
    filepath = os.path.join(DATA_DIR, filename)
    print(f"Downloading {filename} (this might take a moment)...")
    
    try:
        # Download the file
        urllib.request.urlretrieve(url, filepath)
        
        # Verify it is valid JSON
        with open(filepath, 'r', encoding='utf-8') as f:
            json.load(f)
            
        # Get file size to confirm it downloaded completely
        size_mb = os.path.getsize(filepath) / (1024 * 1024)
        print(f"✅ Successfully downloaded {filename} ({size_mb:.2f} MB)")
        
    except Exception as e:
        print(f"❌ Error downloading {filename}: {e}")

if __name__ == "__main__":
    print(f"Setting up map data in /{DATA_DIR}/")
    print("-" * 40)
    
    download_and_verify(STATES_URL, "india_states.geojson")
    download_and_verify(DISTRICTS_URL, "india_districts.geojson")
    
    print("-" * 40)
    print("Done! Your MVP can now render maps entirely offline.")
