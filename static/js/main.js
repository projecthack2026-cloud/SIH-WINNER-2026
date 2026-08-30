// ==========================================
// 1. Chart.js Initialization
// ==========================================
let sectorChart;
let statusChart; // Add this new variable

function initCharts() {
    // Sector Bar Chart
    const ctx1 = document.getElementById('sectorChart').getContext('2d');
    sectorChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['No Data'],
            datasets: [{
                label: 'Expenditure (Cr)',
                data: [0],
                backgroundColor: '#3b82f6',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });

    // Work Status Doughnut Chart
    const ctx2 = document.getElementById('statusChart').getContext('2d');
    statusChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['No Data'],
            datasets: [{
                data: [1],
                backgroundColor: ['#94a3b8', '#3b82f6', '#f59e0b', '#10b981', '#6366f1', '#ec4899'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'right', labels: { boxWidth: 12 } } },
            cutout: '70%'
        }
    });
}
initCharts();

// ==========================================
// 2. Global Variables & Mock Data
// ==========================================
// Works/Projects Globals
let worksLayerGroup = L.layerGroup();
let currentWorksData = [];
let targetForInvestigation = ""; // Stores the current region name

// Mock database to simulate different regions
const mockData = {
    "National": { alloc: "3,950", anom: "124", chart: [450, 250, 150, 100, 50] },
    "Maharashtra": { alloc: "420", anom: "18", chart: [60, 40, 25, 10, 5] },
    "Pune": { alloc: "25", anom: "5", chart: [10, 5, 2, 1, 0] }, 
    "RS_Maharashtra": { alloc: "110", anom: "2", chart: [30, 20, 10, 5, 2] } 
};

// ==========================================
// 2. Dynamic Data Update Logic (Backend Connected)
// ==========================================
async function updateDashboardStats(regionName, houseType) {
    document.getElementById('dashboard-title').innerText = `${regionName} Overview (${houseType})`;
    
    try {
        const response = await fetch(`/api/stats?house=${houseType}&region=${encodeURIComponent(regionName)}`);
        const rawText = await response.text(); 
        
        let data;
        try {
            data = JSON.parse(rawText);
        } catch (e) {
            console.error("Server returned non-JSON response. Raw text:", rawText);
            throw new Error("Invalid JSON from server. Check Flask terminal for Python tracebacks.");
        }

        // --- NEW: Handle MP Name Display ---
        const subtitleEl = document.getElementById('dashboard-subtitle');
        const mpNameEl = document.getElementById('mp-name');
        
        if (houseType === 'LS' && data.mp_name && data.mp_name !== "N/A") {
            mpNameEl.innerText = data.mp_name;
            subtitleEl.style.display = 'block'; // Show the MP name
        } else {
            subtitleEl.style.display = 'none'; // Hide if looking at State or National level
        }
        
        // Update KPI Cards
        document.getElementById('kpi-allocated').innerText = `₹${data.kpis.allocated_cr} Cr`;
        document.getElementById('kpi-anomalies').innerText = data.kpis.anomalies;
        
        const utilEl = document.getElementById('kpi-utilization');
        if(utilEl) utilEl.innerText = `${data.kpis.utilization_pct}%`;
        
        const unspentEl = document.getElementById('kpi-unspent');
        if(unspentEl) unspentEl.innerText = `₹${data.kpis.unspent_cr} Cr`;

        const anomalyCard = document.getElementById('kpi-anomalies').parentElement;
        if (parseInt(data.kpis.anomalies) > 0) anomalyCard.classList.add('alert');
        else anomalyCard.classList.remove('alert');

// Update Chart 2: Work Statuses
        if (data.charts.statuses.labels.length > 0) {
            statusChart.data.labels = data.charts.statuses.labels;
            statusChart.data.datasets[0].data = data.charts.statuses.data;
            statusChart.update();
        } else {
            statusChart.data.labels = ['No Data'];
            statusChart.data.datasets[0].data = [1];
            statusChart.update();
        }

    } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
    }
}


// ==========================================
// 3. Map Initialization & Setup
// ==========================================
let currentHouse = 'LS'; // Default to Lok Sabha

window.setHouse = function(house) {
    currentHouse = house;
    
    // Update Toggle UI
    document.getElementById('btn-ls').classList.toggle('active', house === 'LS');
    document.getElementById('btn-rs').classList.toggle('active', house === 'RS');

    // Reset Map to apply new logic
    resetMap();
};

const map = L.map('india-map').setView([22.5937, 78.9629], 5);
map.createPane('fillPane'); map.getPane('fillPane').style.zIndex = 400; 
map.createPane('outlinePane'); map.getPane('outlinePane').style.zIndex = 450; 
map.getPane('outlinePane').style.pointerEvents = 'none';

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    maxZoom: 12, attribution: '© CARTO'
}).addTo(map);

let stateLayer; window.stateOutlineLayer = null;
let constLayer; window.constOutlineLayer = null; 
let activeState = null;

// Mock State Scores
const stateAnomalyScores = { "Maharashtra": 85, "Uttar Pradesh": 65 };

// Dynamic PC Risk Scorer & Name Extractor
function getConstituencyName(properties) {
    // Looks for pc_name primarily, falls back to common variations
    return properties.pc_name || properties.PC_NAME || properties.PC_NM || properties.name || "Unknown PC";
}

function getConstituencyScore(pcName) {
    if (!pcName) return 0;
    
    const normalizedName = pcName.toString().trim().toLowerCase();
    
    const explicitScores = {
        "pune": 95,      // Red 
        "lucknow": 85,   // Red
        "baramati": 20,  // Blue
        "shirur": 60     // Yellow
    };

    if (explicitScores[normalizedName] !== undefined) {
        return explicitScores[normalizedName];
    }

    // Pseudo-random generation for all other constituencies
    let hash = 0;
    for (let i = 0; i < normalizedName.length; i++) {
        hash = normalizedName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    let pseudoRandom = Math.abs(hash) % 100;
    if (pseudoRandom > 95) return 85; // 5% chance of Red
    if (pseudoRandom > 80) return 60; // 15% chance of Yellow
    return 15; // 80% chance of Blue
}

function getAnomalyColor(score) {
    if (score > 75) return '#dc2626'; // Red
    if (score > 50) return '#facc15'; // Yellow
    return '#3b82f6'; // Blue
}

function getStateStyle(feature) {
    const stateName = feature.properties.ST_NM || feature.properties.name;
    const isTransparent = (activeState && stateName.toLowerCase() === activeState.toLowerCase() && currentHouse === 'LS');
    
    return {
        fillColor: getAnomalyColor(stateAnomalyScores[stateName] || 0),
        weight: 0, opacity: 0,
        fillOpacity: isTransparent ? 0 : 0.6
    };
}


// ==========================================
// 4. Map Loading & Drill-down
// ==========================================
async function loadStatesMap() {
    try {
        const response = await fetch('/static/data/india_states_lite.geojson');
        const geojsonData = await response.json();

        stateLayer = L.geoJSON(geojsonData, {
            pane: 'fillPane',
            style: getStateStyle,
            onEachFeature: function (feature, layer) {
                const stateName = feature.properties.ST_NM || feature.properties.name;
                layer.bindTooltip(`<b>${stateName}</b>`);

                layer.on({
                    click: (e) => {
                        L.DomEvent.stopPropagation(e);
                        // Update the Dashboard Stats for the clicked State
                        updateDashboardStats(stateName, currentHouse);
                        
                        if (currentHouse === 'LS') {
                            drillDownToConstituencies(stateName, e.target.getBounds());
                        } else {
                            map.fitBounds(e.target.getBounds());
                            document.getElementById('back-button').style.display = 'inline-block';
                        }
                    }
                });
            }
        }).addTo(map);

        window.stateOutlineLayer = L.geoJSON(geojsonData, {
            pane: 'outlinePane', interactive: false,
            style: { color: '#ffffff', weight: 1.5, fill: false }
        }).addTo(map);

    } catch(err) { console.error(err); }
}

async function drillDownToConstituencies(stateName, bounds) {
    map.fitBounds(bounds);
    activeState = stateName;
    if (stateLayer) stateLayer.setStyle(getStateStyle);
    
    if (constLayer) map.removeLayer(constLayer);
    if (window.constOutlineLayer) map.removeLayer(window.constOutlineLayer);

    document.getElementById('back-button').style.display = 'inline-block';
    document.getElementById('india-map').style.cursor = 'wait';

    // Exact slug match for python setup_maps.py output
    const stateSlug = stateName.toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9\s_]/g, '')
        .trim()
        .replace(/\s+/g, '_');

    try {
        const response = await fetch(`/static/data/constituencies/${stateSlug}.json`);
        if (!response.ok) throw new Error(`File not found: ${stateSlug}.json`);
        
        const pcGeoJSON = await response.json();
        if (activeState !== stateName) return; 

        constLayer = L.geoJSON(pcGeoJSON, {
            pane: 'fillPane',
            style: function(f) {
                const pcName = getConstituencyName(f.properties);
                const score = getConstituencyScore(pcName);
                return { fillColor: getAnomalyColor(score), weight: 0, fillOpacity: 0.7 };
            },
            onEachFeature: function(f, layer) {
                const pcName = getConstituencyName(f.properties);
                const score = getConstituencyScore(pcName);
                
                layer.bindTooltip(`<b>${pcName} PC</b><br>Risk Score: ${score}`);
                
                layer.on({
                    mouseover: (e) => e.target.setStyle({ fillOpacity: 0.9 }),
                    mouseout: (e) => constLayer.resetStyle(e.target),
                    click: (e) => {
                        L.DomEvent.stopPropagation(e);
                        
                        // 1. Zoom Map exactly to this constituency
                        map.fitBounds(e.target.getBounds());
                        
                        // 2. Update Stats
                        updateDashboardStats(pcName, 'LS');
                        
                        // 3. Load Project Locations (Works)
                        loadMockWorks(e.target.getBounds(), pcName);
                        
                        // 4. Update and Show Investigation Button
                        targetForInvestigation = `${pcName} Constituency`;
                        const invBtn = document.getElementById('investigate-btn');
                        invBtn.style.display = 'block';
                        invBtn.innerHTML = `🚨 Run AI Audit on ${pcName}`;
                        
                        // Style button based on risk
                        if (score > 75) {
                            invBtn.style.backgroundColor = '#dc2626'; // Red for high risk
                        } else {
                            invBtn.style.backgroundColor = '#2563eb'; // Blue for normal
                        }
                    }
                });
            }
        }).addTo(map);

        window.constOutlineLayer = L.geoJSON(pcGeoJSON, {
            pane: 'outlinePane', interactive: false,
            style: { color: '#ffffff', weight: 1, fill: false }
        }).addTo(map);

    } catch (err) {
        console.warn(`Constituency data missing for ${stateName}`, err);
        if (activeState === stateName) {
            activeState = null;
            if (stateLayer) stateLayer.setStyle(getStateStyle);
            alert(`Detailed constituency data is not available for ${stateName}. Did you run python setup_maps.py?`);
        }
    } finally {
        document.getElementById('india-map').style.cursor = '';
    }
}

// Function attached to the new Investigate Button
window.executeInvestigation = function() {
    if (targetForInvestigation) {
        triggerInvestigation(targetForInvestigation);
    }
};

window.resetMap = function() {
    activeState = null;
    if (stateLayer) stateLayer.setStyle(getStateStyle);
    if (constLayer) map.removeLayer(constLayer);
    if (window.constOutlineLayer) map.removeLayer(window.constOutlineLayer);
    
    // Clear the works layer and hide the filter
    worksLayerGroup.clearLayers();
    document.getElementById('work-filter').style.display = 'none';
    document.getElementById('investigate-btn').style.display = 'none';
    
    map.setView([22.5937, 78.9629], 5);
    document.getElementById('back-button').style.display = 'none';
    
    updateDashboardStats('National', currentHouse);
};

map.on('click', function(e) {
    if (document.getElementById('back-button').style.display !== 'none') resetMap();
});

// ==========================================
// 5. Agent Trigger
// ==========================================
function triggerInvestigation(targetId) {
    // Redirect to the new page and pass the target region in the URL query string
    window.location.href = `/investigate?target=${encodeURIComponent(targetId)}`;
}

// ==========================================
// 6. Works/Projects Rendering Logic
// ==========================================
function loadMockWorks(bounds, regionName) {
    currentWorksData = [];
    const categories = ['Roads', 'Water', 'Education', 'Health', 'Power'];
    
    // Generate ~20-40 random project locations within the bounding box of the constituency
    const numWorks = Math.floor(Math.random() * 20) + 20;
    
    const latMin = bounds.getSouth();
    const latMax = bounds.getNorth();
    const lngMin = bounds.getWest();
    const lngMax = bounds.getEast();
    
    for(let i=0; i<numWorks; i++) {
        currentWorksData.push({
            id: i,
            lat: latMin + Math.random() * (latMax - latMin),
            lng: lngMin + Math.random() * (lngMax - lngMin),
            category: categories[Math.floor(Math.random() * categories.length)],
            amount: (Math.random() * 15 + 2).toFixed(2) // Fake Lakhs amount
        });
    }
    
    // Show the filter dropdown now that we have data
    document.getElementById('work-filter').style.display = 'block';
    
    worksLayerGroup.addTo(map);
    renderWorks();
}

window.renderWorks = function() {
    worksLayerGroup.clearLayers();
    const filterVal = document.getElementById('work-filter').value;
    
    currentWorksData.forEach(work => {
        // Skip if filtered out
        if(filterVal !== 'All' && work.category !== filterVal) return;
        
        // Color-code the markers
        let color = '#64748b'; // Default grey
        if(work.category === 'Roads') color = '#3b82f6'; 
        if(work.category === 'Water') color = '#06b6d4'; 
        if(work.category === 'Education') color = '#f59e0b'; 
        if(work.category === 'Health') color = '#10b981';
        
        // Create a precise dot marker
        const marker = L.circleMarker([work.lat, work.lng], {
            radius: 6,
            fillColor: color,
            color: '#ffffff',
            weight: 1.5,
            fillOpacity: 0.9
        });
        
        marker.bindTooltip(`
            <b>${work.category} Project</b><br>
            Sanctioned: ₹${work.amount} Lakhs<br>
            <i>Click to view details (Mock)</i>
        `);
        
        worksLayerGroup.addLayer(marker);
    });
};

// ==========================================
// 7. Handle Window Resizing gracefully
// ==========================================
window.addEventListener('resize', function() {
    if (map) {
        map.invalidateSize(); 
    }
});


// Bootstrap Application
loadStatesMap();
updateDashboardStats('National', 'LS');
