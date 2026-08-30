from flask import Flask, render_template, request, jsonify
from data_service import get_dashboard_stats  # Import your new service
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('dashboard.html')

@app.route('/investigate')
def investigate_page():
    target = request.args.get('target', '')
    return render_template('investigate.html', target_region=target)

# --- NEW ROUTE ---
@app.route('/api/stats', methods=['GET'])
def api_stats():
    """
    Returns dynamic dashboard stats based on the region and house.
    Example: /api/stats?house=LS&region=Pune
    """
    house = request.args.get('house', 'LS')
    region = request.args.get('region', 'National')
    
    stats = get_dashboard_stats(house, region)
    return jsonify(stats)


@app.route('/api/investigate', methods=['POST'])
def api_investigate():
    """Backend API for the LLM."""
    data = request.json
    trigger_id = data.get('target_id')
    
    # Mock response for UI testing
    return jsonify({
        "status": "success",
        "steps": [
            {"action": "Called query_database", "result": f"Fetching records for {trigger_id}..."},
            {"action": "Called check_vendor_history", "result": "Vendor X has 65% concentration in this region."},
            {"action": "Called find_similar_works", "result": "Found 5 identically priced works sanctioned on same day."},
            {"action": "Called devil_advocate", "result": "Tested innocent explanations (phased project). Rejected due to ₹4.95L exact threshold clustering."}
        ],
        "final_finding": "Probable contract fragmentation (smurfing) detected to bypass ₹5.0L e-tendering limit."
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
