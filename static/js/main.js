// ==========================================
// 1. Map Initialization & Custom Panes
// ==========================================

const map = L.map('india-map').setView([22.5937, 78.9629], 5);

// Create custom panes to prevent borders from being occluded by fills
map.createPane('fillPane');
map.getPane('fillPane').style.zIndex = 400; 

map.createPane('outlinePane');
map.getPane('outlinePane').style.zIndex = 450; // Borders sit ABOVE the fills
map.getPane('outlinePane').style.pointerEvents = 'none'; // Clicks pass through the borders

// Use CartoDB Borderless Base Map to ensure Survey of India compliance via GeoJSON
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    maxZoom: 12,
    attribution: '© OpenStreetMap contributors © CARTO'
}).addTo(map);


// ==========================================
// 2. Global Variables & Mock Data
// ==========================================
let stateLayer;
window.stateOutlineLayer = null;

let districtLayer;
window.districtOutlineLayer = null;

let activeState = null; // Tracks the currently zoomed-in state

// Mock Anomaly Scores for the MVP Demo
const stateAnomalyScores = {
    "Maharashtra": 85,
    "Uttar Pradesh": 65,
    "Karnataka": 20
};

// Target a specific district for our "Contract Splitting" MVP Demo
const districtAnomalyScores = {
    "Pune": 95,      // Red
    "Nashik": 60,    // Yellow
    "Lucknow": 80    // Red
};


// ==========================================
// 3. Styling Functions
// ==========================================
function getAnomalyColor(score) {
    if (score > 75) return '#dc2626'; // Red (High Risk)
    if (score > 50) return '#facc15'; // Yellow (Warning)
    return '#3b82f6'; // Blue (Safe)
}

function getStateStyle(feature) {
    const stateName = feature.properties.ST_NM || feature.properties.name;
    
    // If this is the active state, make its fill transparent so districts show clearly
    if (activeState && stateName.toLowerCase() === activeState.toLowerCase()) {
        return {
            fillColor: getAnomalyColor(stateAnomalyScores[stateName] || 0),
            weight: 0,
            opacity: 0,
            fillOpacity: 0 // Transparent!
        };
    }

    // Default style for all other states
    return {
        fillColor: getAnomalyColor(stateAnomalyScores[stateName] || 0),
        weight: 0,
        opacity: 0,
        fillOpacity: 0.6
    };
}


// ==========================================
// 4. State Level Map Loading
// ==========================================
async function loadStatesMap() {
    try {
        const response = await fetch('/static/data/india_states_lite.geojson');
        const geojsonData = await response.json();

        // LAYER 1: The colored fills (Interactive)
        stateLayer = L.geoJSON(geojsonData, {
            pane: 'fillPane',
            style: getStateStyle, // Uses dynamic function defined above
            onEachFeature: function (feature, layer) {
                const stateName = feature.properties.ST_NM || feature.properties.name;
                layer.bindTooltip(`<b>${stateName}</b><br>Risk Score: ${stateAnomalyScores[stateName] || 0}`);

                layer.on({
                    mouseover: (e) => {
                        // Don't highlight if it's the currently active transparent state
                        if (activeState && stateName.toLowerCase() === activeState.toLowerCase()) return;
                        e.target.setStyle({ fillOpacity: 0.9 });
                    },
                    mouseout: (e) => {
                        stateLayer.resetStyle(e.target);
                    },
                    click: (e) => {
                        L.DomEvent.stopPropagation(e); // Stop click from hitting the background map
                        const clickedState = feature.properties.ST_NM || feature.properties.name;
                        drillDownToState(clickedState, e.target.getBounds());
                    }
                });
            }
        }).addTo(map);

        // LAYER 2: The crisp white outlines (Non-interactive)
        window.stateOutlineLayer = L.geoJSON(geojsonData, {
            pane: 'outlinePane',
            interactive: false,
            style: {
                color: '#ffffff',
                weight: 1.5,
                opacity: 1,
                fill: false // Borders only
            }
        }).addTo(map);

    } catch(err) {
        console.error("Error loading State GeoJSON data:", err);
    }
}


// ==========================================
// 5. District Level Drill-down Logic
// ==========================================
async function drillDownToState(stateName, bounds) {
    // 1. Zoom into the state
    map.fitBounds(bounds);
    
    // 2. Update active state and refresh styles (turns clicked state transparent)
    activeState = stateName;
    if (stateLayer) stateLayer.setStyle(getStateStyle);
    
    // 3. Clear ONLY existing District Layers
    if (districtLayer) map.removeLayer(districtLayer);
    if (window.districtOutlineLayer) map.removeLayer(window.districtOutlineLayer);

    const backBtn = document.getElementById('back-button');
    if (backBtn) backBtn.style.display = 'inline-block';

    const stateSlug = stateName.toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9\s_]/g, '')
        .trim()
        .replace(/\s+/g, '_');

    // 4. Change cursor to loading
    document.getElementById('india-map').style.cursor = 'wait';

    try {
        const response = await fetch(`/static/data/districts/${stateSlug}.json`);
        
        // 5. If the district file doesn't exist for this state, throw an error
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const stateDistrictGeoJSON = await response.json();

        // Check to ensure the user hasn't clicked another state while this was downloading
        if (activeState !== stateName) return; 

        // LAYER 1: District Fills
        districtLayer = L.geoJSON(stateDistrictGeoJSON, {
            pane: 'fillPane',
            style: function(feature) {
                const districtName = feature.properties.DISTRICT || feature.properties.dtname || feature.properties.NAME_2;
                return {
                    fillColor: getAnomalyColor(districtAnomalyScores[districtName] || 0),
                    weight: 0, 
                    fillOpacity: 0.7
                };
            },
            onEachFeature: function(feature, layer) {
                const districtName = feature.properties.DISTRICT || feature.properties.dtname || feature.properties.NAME_2;
                const score = districtAnomalyScores[districtName] || 0;
                
                layer.bindTooltip(`<b>${districtName} District</b><br>Risk Score: ${score}`);
                
                layer.on({
                    mouseover: (e) => e.target.setStyle({ fillOpacity: 0.9 }),
                    mouseout: (e) => districtLayer.resetStyle(e.target),
                    click: (e) => {
                        L.DomEvent.stopPropagation(e);
                        if (score > 75) {
                            triggerInvestigation(districtName + ' District, ' + stateName);
                        } else {
                            alert(`No critical anomalies detected in ${districtName}.`);
                        }
                    }
                });
            }
        }).addTo(map);

        // LAYER 2: District Outlines
        window.districtOutlineLayer = L.geoJSON(stateDistrictGeoJSON, {
            pane: 'outlinePane',
            interactive: false,
            style: { color: '#ffffff', weight: 1, opacity: 1, fill: false }
        }).addTo(map);

    } catch (err) {
        console.warn(`District data missing or failed to load for ${stateName} (${stateSlug}.json)`);
        
        // REVERT THE UI: Make the state solid again so it doesn't look broken/blank
        if (activeState === stateName) {
            activeState = null;
            if (stateLayer) stateLayer.setStyle(getStateStyle);
            alert(`Detailed district data is not available for ${stateName} in this dataset.`);
        }
    } finally {
        // Remove loading cursor
        document.getElementById('india-map').style.cursor = '';
    }
}

// ==========================================
// 6. Reset Map Logic
// ==========================================
window.resetMap = function() {
    // Reset active state variable and refresh styles to make all states solid again
    activeState = null;
    if (stateLayer) stateLayer.setStyle(getStateStyle);

    // Remove District Layers
    if (districtLayer) map.removeLayer(districtLayer);
    if (window.districtOutlineLayer) map.removeLayer(window.districtOutlineLayer);
    
    // Reset view to entire India
    map.setView([22.5937, 78.9629], 5);
    
    // Hide Back Button safely
    const backBtn = document.getElementById('back-button');
    if (backBtn) backBtn.style.display = 'none';
};


// ==========================================
// 7. Map Background Click Handler (Reset to National)
// ==========================================
map.on('click', function(e) {
    const backBtn = document.getElementById('back-button');
    // If the back button is visible, it means we are zoomed into a state.
    // Clicking the empty background should reset the view.
    if (backBtn && backBtn.style.display !== 'none') {
        resetMap();
    }
});


// ==========================================
// 8. Agent Trigger & Backend API call
// ==========================================
async function triggerInvestigation(targetId) {
    const agentOutput = document.getElementById('agent-output');
    
    // UI Loading State
    agentOutput.innerHTML = `
        <p style="color: #dc2626; font-size: 1.1em;"><b>⚠ Anomaly detected in ${targetId}.</b></p>
        <p style="color: #4b5563;">Agent Orchestrator initializing...</p>
        <p style="color: #4b5563;"><i>🔍 Querying local SQLite database...</i></p>
    `;
    
    try {
        const response = await fetch('/api/investigate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ target_id: targetId })
        });
        const data = await response.json();
        
        // Render the Agent's response steps (Tool chain)
        let stepsHTML = data.steps.map(step => `
            <li style="margin-bottom: 8px;">
                <span style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; font-family: monospace;">
                    ${step.action}
                </span><br>
                <span style="color: #374151;">${step.result}</span>
            </li>
        `).join('');
        
        agentOutput.innerHTML = `
            <p style="color: #dc2626; font-size: 1.1em;"><b>⚠ Investigating ${targetId}</b></p>
            <ul style="list-style-type: none; padding-left: 0;">${stepsHTML}</ul>
            <div style="margin-top: 15px; padding: 15px; background: #fee2e2; border-left: 4px solid #ef4444; border-radius: 4px;">
                <h4 style="margin: 0 0 10px 0; color: #991b1b;">Audit Recommendation</h4>
                <p style="margin: 0; color: #7f1d1d; line-height: 1.5;">${data.final_finding}</p>
            </div>
        `;
    } catch (error) {
        console.error('Error connecting to AI Agent:', error);
        agentOutput.innerHTML = `<p style="color: red;">Failed to connect to the Investigation Engine API.</p>`;
    }
}


// ==========================================
// 9. Handle Window Resizing gracefully
// ==========================================
window.addEventListener('resize', function() {
    if (map) {
        // Tells Leaflet to recalculate its bounds based on the new flexbox size
        map.invalidateSize(); 
    }
});


// ==========================================
// 10. Bootstrap Application
// ==========================================
// Load the states map immediately on script execution
loadStatesMap();
