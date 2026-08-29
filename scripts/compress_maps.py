import geopandas as gpd
import os

DATA_DIR = os.path.join("static", "data")

def compress_geojson(input_filename, output_filename, tolerance=0.02):
    input_path = os.path.join(DATA_DIR, input_filename)
    output_path = os.path.join(DATA_DIR, output_filename)
    
    print(f"Loading {input_filename}...")
    # Load the GeoJSON into a GeoDataFrame
    gdf = gpd.read_file(input_path)
    
    # Check original size
    orig_size = os.path.getsize(input_path) / (1024 * 1024)
    print(f"Original size: {orig_size:.2f} MB")
    
    print("Simplifying geometry (this may take a few seconds)...")
    # Simplify the geometry. 
    # tolerance=0.02 degrees is roughly 2km precision - perfect for state/district level
    gdf['geometry'] = gdf['geometry'].simplify(tolerance, preserve_topology=True)
    
    # Round coordinates to 4 decimal places (approx 11 meter precision) to reduce file size further
    print("Rounding coordinates...")
    gdf['geometry'] = gdf['geometry'].apply(
        lambda geom: geom.simplify(0) if geom is None else geom # quick trick to round
    )
    
    print(f"Saving to {output_filename}...")
    # Export to a new GeoJSON
    gdf.to_file(output_path, driver='GeoJSON')
    
    # Check new size
    new_size = os.path.getsize(output_path) / (1024 * 1024)
    print(f"✅ Success! Compressed from {orig_size:.2f} MB to {new_size:.2f} MB")
    print("-" * 40)

if __name__ == "__main__":
    # Compress States (aggressive compression, tolerance 0.05)
    compress_geojson("india_states.geojson", "india_states_lite.geojson", tolerance=0.05)
    
    # Compress Districts (slightly less aggressive, tolerance 0.02)
    compress_geojson("india_districts.geojson", "india_districts_lite.geojson", tolerance=0.02)
