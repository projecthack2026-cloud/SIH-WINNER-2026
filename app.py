from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import os

# from agent.orchestrator import run_investigation

load_dotenv()
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('dashboard.html')

@app.route('/api/investigate', methods=['POST'])
def investigate():
    data = request.json
    trigger_id = data.get('target_id')
    # result = run_investigation(trigger_id)
    return jsonify({
        'status': 'success',
        'steps': [
            {'action': 'Called query_database', 'result': 'Found 5 suspicious works...'},
            {'action': 'Called devil_advocate', 'result': 'Tested innocent explanations...'}
        ],
        'final_finding': 'Probable contract fragmentation detected.'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
