import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  Search, 
  RotateCcw, 
  Maximize2, 
  RefreshCw, 
  AlertCircle, 
  ShieldCheck, 
  Info,
  X,
  FileQuestion,
  ExternalLink,
  SlidersHorizontal
} from 'lucide-react';
import { 
  api, 
  type ApiMapProject, 
  type ApiUnmappedProject,
  type ApiDistrictSummary, 
  type ApiDistrictItem, 
  type ApiStateItem, 
  type ApiBhuvanConfig,
  type ApiLocationQualitySummary
} from '../../services/api';
import type { MockProject } from '../../types/complaint';

// Standard Indian District Centroids (Real Geographical Coordinates)
const DISTRICT_CENTROIDS: Record<string, [number, number]> = {
  'pune': [18.5204, 73.8567],
  'mumbai': [18.9388, 72.8353],
  'mumbai suburban': [19.1176, 72.8481],
  'thane': [19.2183, 72.9781],
  'nagpur': [21.1458, 79.0882],
  'nashik': [19.9975, 73.7898],
  'kolhapur': [16.7050, 74.2433],
  'solapur': [17.6599, 75.9064],
  'satara': [17.6805, 74.0183],
  'sangli': [16.8524, 74.5815],
  'aurangabad': [19.8762, 75.3433],
  'chhatrapati sambhajinagar': [19.8762, 75.3433],
  'amravati': [20.9374, 77.7796],
  'bengaluru': [12.9716, 77.5946],
  'bengaluru urban': [12.9716, 77.5946],
  'mysuru': [12.2958, 76.6394],
  'hyderabad': [17.3850, 78.4867],
  'chennai': [13.0827, 80.2707],
  'delhi': [28.6139, 77.2090],
  'new delhi': [28.6139, 77.2090],
  'lucknow': [26.8467, 80.9462],
  'patna': [25.5941, 85.1376],
  'jaipur': [26.9124, 75.7873],
  'ahmedabad': [23.0225, 72.5714],
  'kolkata': [22.5726, 88.3639],
  'bhopal': [23.2599, 77.4126]
};

const INDIA_CENTER: [number, number] = [20.5937, 78.9629];
const DEFAULT_ZOOM = 5;
const DISTRICT_ZOOM = 10;

interface Props {
  initialDistrict?: string;
  initialState?: string;
  onDistrictSelect?: (district: string) => void;
  onSelectProjectDetail?: (project: MockProject) => void;
}

export const BhuvanGeospatialMap: React.FC<Props> = ({
  initialDistrict = 'Pune',
  initialState = '',
  onDistrictSelect,
  onSelectProjectDetail
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Filter & State Management
  const [selectedState, setSelectedState] = useState<string>(initialState);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(initialDistrict);
  const [locationQualityFilter, setLocationQualityFilter] = useState<string>('ALL');
  const [statesList, setStatesList] = useState<ApiStateItem[]>([]);
  const [districtsList, setDistrictsList] = useState<ApiDistrictItem[]>([]);
  
  // Layers & Map Mode
  const [mapMode, setMapMode] = useState<'map' | 'satellite'>('map');
  const [bhuvanConfig, setBhuvanConfig] = useState<ApiBhuvanConfig | null>(null);
  
  // Data States
  const [summary, setSummary] = useState<ApiDistrictSummary | null>(null);
  const [qualitySummary, setQualitySummary] = useState<ApiLocationQualitySummary | null>(null);
  const [mapProjects, setMapProjects] = useState<ApiMapProject[]>([]);
  
  // Unmapped Projects Modal State
  const [showUnmappedModal, setShowUnmappedModal] = useState<boolean>(false);
  const [unmappedProjects, setUnmappedProjects] = useState<ApiUnmappedProject[]>([]);
  const [loadingUnmapped, setLoadingUnmapped] = useState<boolean>(false);

  // UI Controls & Notifications
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusNotice, setStatusNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial configuration & state/district options
  useEffect(() => {
    const loadInitialMeta = async () => {
      try {
        const [configRes, statesRes] = await Promise.all([
          api.getBhuvanConfig(),
          api.getMapStates()
        ]);
        setBhuvanConfig(configRes);
        setStatesList(statesRes || []);
      } catch (err) {
        console.warn("Bhuvan config endpoint warning:", err);
      }
    };
    loadInitialMeta();
  }, []);

  // Update district dropdown options when state changes
  useEffect(() => {
    const loadDistricts = async () => {
      try {
        const dists = await api.getMapDistricts(selectedState || undefined);
        setDistrictsList(dists || []);
      } catch (err) {
        console.error("Failed to load district options:", err);
      }
    };
    loadDistricts();
  }, [selectedState]);

  // Load district statistics & projects with real coordinates
  const fetchMapData = async () => {
    setLoading(true);
    setError(null);
    setStatusNotice(null);
    try {
      const [sumRes, qualRes, projRes] = await Promise.all([
        api.getDistrictMapSummary(selectedDistrict, selectedState || undefined),
        api.getLocationQualitySummary({ state: selectedState || undefined, district: selectedDistrict || undefined }),
        api.getMapProjects({
          state: selectedState || undefined,
          district: selectedDistrict || undefined,
          location_quality: locationQualityFilter,
          search: searchQuery || undefined,
          limit: 300
        })
      ]);
      setSummary(sumRes);
      setQualitySummary(qualRes);
      setMapProjects(projRes || []);
    } catch (err: any) {
      console.error("Geospatial REST API error:", err);
      setError("Unable to connect to the monitoring API.");
      setMapProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMapData();
  }, [selectedDistrict, selectedState, locationQualityFilter]);

  // Initialize Leaflet Map Instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: INDIA_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Default Base Tile Layer: Public OpenStreetMap (Bhuvan configuration ready)
      const baseTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      L.tileLayer(baseTileUrl, {
        maxZoom: 19,
        attribution: '© OpenStreetMap | Bhuvan Configuration Ready'
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update tile layer based on map mode (Map vs Satellite)
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        mapInstanceRef.current?.removeLayer(layer);
      }
    });

    let tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let attr = '© OpenStreetMap | Bhuvan Configuration Ready';

    if (mapMode === 'satellite' && bhuvanConfig?.satellite_configured && bhuvanConfig?.wmts_url) {
      tileUrl = bhuvanConfig.wmts_url;
      attr = '© ISRO Bhuvan Satellite Imagery Layer';
    }

    L.tileLayer(tileUrl, { maxZoom: 19, attribution: attr }).addTo(mapInstanceRef.current);
  }, [mapMode, bhuvanConfig]);

  // Render markers and pan to district centroid when mapProjects or selectedDistrict changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    const distKey = selectedDistrict.toLowerCase().trim();
    if (DISTRICT_CENTROIDS[distKey]) {
      const [lat, lng] = DISTRICT_CENTROIDS[distKey];
      mapInstanceRef.current.flyTo([lat, lng], DISTRICT_ZOOM, { animate: true, duration: 1.2 });
    }

    if (mapProjects.length > 0) {
      const bounds = L.latLngBounds([]);

      mapProjects.forEach((proj) => {
        if (!proj.latitude || !proj.longitude) return;
        if (proj.latitude === 0.0 && proj.longitude === 0.0) return;

        const pos: [number, number] = [proj.latitude, proj.longitude];
        bounds.extend(pos);

        // Marker color by status
        let markerColor = '#10b981'; // Completed (Green)
        if (proj.status.toLowerCase().includes('ongoing') || proj.status.toLowerCase().includes('progress')) {
          markerColor = '#3b82f6'; // Ongoing (Blue)
        } else if (proj.status.toLowerCase().includes('partial')) {
          markerColor = '#f59e0b'; // Partial (Amber)
        } else if (proj.status.toLowerCase().includes('sanctioned')) {
          markerColor = '#6366f1'; // Sanctioned (Indigo)
        }

        const customHtml = `
          <div style="
            background-color: ${markerColor};
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 8px rgba(0,0,0,0.4);
            cursor: pointer;
          "></div>
        `;

        const customIcon = L.divIcon({
          html: customHtml,
          className: 'custom-map-marker',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        const locationLabel = proj.location_text || (proj.village ? `${proj.village}, ${proj.district}` : `${proj.district}, ${proj.state}`);
        const accuracyLabel = proj.verified ? 'Exact / Verified Official' : (proj.location_accuracy === 'VILLAGE_LEVEL' ? 'Village-level / Approximate' : 'Approximate Locality');
        const sourceLabel = proj.verified ? 'Official Data' : (proj.source === 'BHUVAN_GEOCODING' ? 'Bhuvan Geocoding' : 'Work Description Extraction');

        const popupContent = `
          <div style="font-family: system-ui, sans-serif; padding: 4px; min-width: 240px; max-width: 300px;">
            <div style="font-size: 10px; font-weight: 800; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.5px;">MPLADS PROJECT</div>
            <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-top: 2px; line-height: 1.3;">${proj.title}</div>
            <div style="font-size: 11px; font-family: monospace; color: #64748b; margin-top: 2px;">ID: ${proj.canonical_work_id}</div>
            
            <div style="margin-top: 8px; background: #f8fafc; padding: 6px 8px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 11px; line-height: 1.5;">
              <div><strong>Status:</strong> <span style="color: ${markerColor}; font-weight: bold;">${proj.status || 'Not Available'}</span></div>
              <div><strong>Location:</strong> ${locationLabel}</div>
              <div><strong>Location Accuracy:</strong> <span style="color: ${proj.verified ? '#15803d' : '#b45309'}; font-weight: bold;">${accuracyLabel}</span></div>
              <div><strong>Location Source:</strong> ${sourceLabel}</div>
              <div><strong>Verification:</strong> <span style="font-weight: bold;">${proj.verified ? 'Verified' : 'Pending'}</span></div>
              <div><strong>Sanctioned:</strong> ₹${(proj.sanctioned_amount / 100000).toFixed(2)} Lakh</div>
              <div><strong>Financial Util.:</strong> ${proj.financial_utilization}%</div>
            </div>

            <div style="margin-top: 6px; font-size: 10px; color: #64748b;">
              <div>State / District: <strong>${proj.state || ''} / ${proj.district || ''}</strong></div>
              <div>Constituency / MP: <strong>${proj.constituency || 'N/A'} (${proj.mp || 'N/A'})</strong></div>
            </div>

            <button id="popup-btn-${proj.project_id}" style="
              margin-top: 10px;
              width: 100%;
              background: #1e40af;
              color: white;
              border: none;
              padding: 6px 12px;
              border-radius: 6px;
              font-size: 11px;
              font-weight: 700;
              cursor: pointer;
            ">View Project</button>
          </div>
        `;

        const marker = L.marker(pos, { icon: customIcon }).addTo(markersLayerRef.current!);
        marker.bindPopup(popupContent);

        marker.on('popupopen', () => {
          const btn = document.getElementById(`popup-btn-${proj.project_id}`);
          if (btn && onSelectProjectDetail) {
            btn.onclick = () => {
              onSelectProjectDetail({
                id: proj.project_id.toString(),
                title: proj.title,
                category: proj.work_category || 'Infrastructure',
                status: (proj.status as any) || 'Ongoing',
                sanctionedAmount: `₹${(proj.sanctioned_amount / 100000).toFixed(2)} Lakh`,
                spentAmount: `₹${((proj.sanctioned_amount * proj.financial_utilization / 100) / 100000).toFixed(2)} Lakh`,
                financialUtilization: proj.financial_utilization,
                state: proj.state || '',
                district: proj.district || '',
                mpName: proj.mp || '',
                constituency: proj.constituency || ''
              });
            };
          }
        });
      });

      if (bounds.isValid() && mapProjects.length > 1 && !DISTRICT_CENTROIDS[distKey]) {
        mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
      }
    }
  }, [mapProjects, selectedDistrict]);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dist = e.target.value;
    setSelectedDistrict(dist);
    if (onDistrictSelect) {
      onDistrictSelect(dist);
    }
  };

  const handleSatelliteClick = () => {
    if (bhuvanConfig?.satellite_configured) {
      setMapMode('satellite');
    } else {
      setStatusNotice("Satellite layer not configured.");
    }
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusNotice(null);
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const results = await api.getMapProjects({
        state: selectedState || undefined,
        district: selectedDistrict || undefined,
        search: searchQuery.trim(),
        limit: 10
      });

      if (results && results.length > 0 && results[0].latitude && results[0].longitude) {
        const target = results[0];
        mapInstanceRef.current?.flyTo([target.latitude, target.longitude], 14, { animate: true });
        setStatusNotice(`Centered on project: ${target.canonical_work_id}`);
      } else {
        // Query unmapped search to check if description has extracted location
        const unmappedResults = await api.getUnmappedProjects({
          state: selectedState || undefined,
          district: selectedDistrict || undefined,
          limit: 10
        });

        const match = unmappedResults.find(u => 
          u.canonical_work_id.toLowerCase().includes(searchQuery.toLowerCase()) || 
          u.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (match && match.location_text) {
          setStatusNotice(`Location extracted: ${match.location_text}, but geocoding is pending/unconfigured.`);
        } else {
          setStatusNotice("Location could not be determined from available project information.");
        }
      }
    } catch (err) {
      setStatusNotice("Location could not be determined from available project information.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetView = () => {
    setSelectedDistrict(initialDistrict);
    setSelectedState(initialState);
    setLocationQualityFilter('ALL');
    setSearchQuery('');
    setStatusNotice(null);
    if (mapInstanceRef.current) {
      const distKey = initialDistrict.toLowerCase().trim();
      if (DISTRICT_CENTROIDS[distKey]) {
        mapInstanceRef.current.flyTo(DISTRICT_CENTROIDS[distKey], DISTRICT_ZOOM);
      } else {
        mapInstanceRef.current.flyTo(INDIA_CENTER, DEFAULT_ZOOM);
      }
    }
  };

  const handleFitDistrict = () => {
    if (mapProjects.length > 0) {
      const bounds = L.latLngBounds([]);
      mapProjects.forEach(p => {
        if (p.latitude && p.longitude && (p.latitude !== 0.0 || p.longitude !== 0.0)) {
          bounds.extend([p.latitude, p.longitude]);
        }
      });

      if (bounds.isValid() && mapInstanceRef.current) {
        mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
        return;
      }
    }

    const distKey = selectedDistrict.toLowerCase().trim();
    if (DISTRICT_CENTROIDS[distKey] && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(DISTRICT_CENTROIDS[distKey], DISTRICT_ZOOM);
    } else {
      setStatusNotice("District boundary data unavailable.");
    }
  };

  const handleTriggerExtraction = async () => {
    setIsProcessing(true);
    setStatusNotice("Processing MPLADS project locations...");
    try {
      const stats = await api.processLocations();
      await fetchMapData();
      setStatusNotice(`Location extraction completed. ${stats.locations_extracted} locations identified.`);
    } catch (err) {
      console.error("Failed to run location processing:", err);
      setStatusNotice("Location extraction could not be completed.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Open Unmapped Projects Modal
  const handleOpenUnmappedModal = async () => {
    setShowUnmappedModal(true);
    setLoadingUnmapped(true);
    try {
      const unmapped = await api.getUnmappedProjects({
        state: selectedState || undefined,
        district: selectedDistrict || undefined,
        limit: 100
      });
      setUnmappedProjects(unmapped || []);
    } catch (err) {
      console.error("Failed to load unmapped projects:", err);
      setUnmappedProjects([]);
    } finally {
      setLoadingUnmapped(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden text-slate-900 space-y-0">
      
      {/* 1. Header Card Title & Status Indicator */}
      <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-md tracking-wider">
              GEOSPATIAL MONITORING
            </span>
            <span className="text-xs text-slate-400 font-mono">Work Description NLP Location Pipeline</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight mt-1 text-white">
            MPLADS GEOSPATIAL MONITOR
          </h2>
          <p className="text-xs text-slate-400">
            Explore registered infrastructure works geographically.
          </p>
        </div>

        {/* Controls Bar: State, District, Quality Selectors & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs w-full md:w-auto">
          
          {/* State Selector */}
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 font-medium">State:</span>
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
            >
              <option value="" className="bg-slate-900 text-white">All States</option>
              {statesList.map((s) => (
                <option key={s.state} value={s.state} className="bg-slate-900 text-white">
                  {s.state} ({s.project_count})
                </option>
              ))}
            </select>
          </div>

          {/* District Selector */}
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
            <span className="text-slate-400 font-medium">District:</span>
            <select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
            >
              {districtsList.length > 0 ? (
                districtsList.map((d) => (
                  <option key={d.district} value={d.district} className="bg-slate-900 text-white">
                    {d.district} ({d.project_count})
                  </option>
                ))
              ) : (
                <option value={selectedDistrict} className="bg-slate-900 text-white">
                  {selectedDistrict}
                </option>
              )}
            </select>
          </div>

          {/* Location Quality Filter */}
          <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-slate-400 font-medium">Quality:</span>
            <select
              value={locationQualityFilter}
              onChange={(e) => setLocationQualityFilter(e.target.value)}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900 text-white">All Quality Layers</option>
              <option value="VERIFIED" className="bg-slate-900 text-white">Verified / Exact</option>
              <option value="VILLAGE_LEVEL" className="bg-slate-900 text-white">Village-level / Approx</option>
              <option value="APPROXIMATE" className="bg-slate-900 text-white">Approximate Locality</option>
            </select>
          </div>

          {/* Map / Satellite Toggle */}
          <div className="flex items-center bg-slate-800 rounded-xl p-0.5 border border-slate-700">
            <button
              onClick={() => setMapMode('map')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                mapMode === 'map' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Map
            </button>
            <button
              onClick={handleSatelliteClick}
              title={!bhuvanConfig?.satellite_configured ? 'Satellite layer not configured' : 'Switch to Satellite Layer'}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                mapMode === 'satellite' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Satellite
            </button>
          </div>

          {/* Fit District Button */}
          <button
            onClick={handleFitDistrict}
            title="Fit to Selected District"
            className="btn btn-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Fit District</span>
          </button>

          {/* Reset View Button */}
          <button
            onClick={handleResetView}
            title="Reset Map View"
            className="btn btn-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

        </div>
      </div>

      {/* 2. Real-Time Location Data Quality Metrics Panel */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        <div className="bg-white p-2.5 rounded-xl border border-blue-200 bg-blue-50/40 shadow-2xs">
          <span className="text-[10px] text-blue-800 font-mono uppercase block font-bold">Total Works</span>
          <span className="font-extrabold text-blue-900 text-sm">{qualitySummary ? qualitySummary.total_projects.toLocaleString() : '—'}</span>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/40 shadow-2xs">
          <span className="text-[10px] text-indigo-800 font-mono uppercase block font-bold">Location Identified</span>
          <span className="font-extrabold text-indigo-900 text-sm">{qualitySummary ? qualitySummary.locations_extracted.toLocaleString() : '—'}</span>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/40 shadow-2xs">
          <span className="text-[10px] text-emerald-800 font-mono uppercase block font-bold">Mapped Projects</span>
          <span className="font-extrabold text-emerald-900 text-sm">{qualitySummary ? (qualitySummary.village_level + qualitySummary.verified_exact).toLocaleString() : '0'}</span>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-amber-200 bg-amber-50/40 shadow-2xs">
          <span className="text-[10px] text-amber-800 font-mono uppercase block font-bold">Village-Level / Approx</span>
          <span className="font-extrabold text-amber-900 text-sm">{qualitySummary ? qualitySummary.village_level.toLocaleString() : '0'}</span>
        </div>

        {/* Interactive Unmapped Projects Button */}
        <button
          onClick={handleOpenUnmappedModal}
          className="bg-white p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs text-left transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono uppercase block font-bold">Unmapped / Pending</span>
            <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-slate-700" />
          </div>
          <span className="font-extrabold text-slate-700 text-sm">{qualitySummary ? qualitySummary.unmapped.toLocaleString() : '—'}</span>
        </button>
      </div>

      {/* 3. Search Bar, Pipeline Trigger & Disclaimer Notice */}
      <div className="px-6 py-2.5 bg-white border-b border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-3 text-xs">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full lg:w-auto flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search project by ID, description, MP, constituency..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            />
          </div>
          <button type="submit" className="btn btn-sm bg-blue-700 hover:bg-blue-800 text-white text-xs px-3 py-1.5 rounded-xl shrink-0 font-bold">
            Search
          </button>
        </form>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTriggerExtraction}
            disabled={isProcessing}
            className="btn btn-sm bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 text-xs px-3 py-1 rounded-xl font-semibold flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>{isProcessing ? 'Extracting NLP Locations...' : 'Run Location Extraction'}</span>
          </button>
        </div>

        {statusNotice && (
          <div className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
            statusNotice.includes('unavailable') || statusNotice.includes('not configured') || statusNotice.includes('could not be determined') ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'
          }`}>
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>{statusNotice}</span>
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] font-bold text-slate-600 shrink-0">
          <span className="text-slate-400 uppercase font-mono text-[10px]">STATUS:</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Completed</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Ongoing</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Partial</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Sanctioned</span>
        </div>
      </div>

      {/* Data Truthfulness Disclaimer Notice */}
      <div className="bg-amber-50/80 border-b border-amber-200 px-6 py-2 flex items-center gap-2 text-[11px] text-amber-950 font-medium leading-tight">
        <Info className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong>Data Provenance Notice:</strong> Locations derived from project descriptions represent approximate locality-level positions and should not be interpreted as exact construction-site coordinates until officially verified.
        </span>
      </div>

      {/* 4. Interactive Map Canvas */}
      <div className="relative w-full h-[480px] bg-slate-100">
        
        {/* Loading Indicator */}
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-3 text-xs font-bold text-slate-700">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
              <span>Loading project locations...</span>
            </div>
          </div>
        )}

        {/* Error Overlay */}
        {error && (
          <div className="absolute inset-0 bg-rose-50/90 z-50 flex items-center justify-center p-6 text-center">
            <div className="bg-white p-6 rounded-3xl border border-rose-200 shadow-2xl max-w-sm space-y-3">
              <AlertCircle className="w-8 h-8 text-rose-600 mx-auto" />
              <h4 className="font-extrabold text-slate-900 text-sm">Unable to connect to the monitoring API.</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Could not connect to the geospatial REST API. Dashboard tables remain fully active.
              </p>
              <button
                onClick={fetchMapData}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 rounded-xl text-xs transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Empty Mapped Coordinates State Overlay */}
        {!loading && !error && mapProjects.length === 0 && (
          <div className="absolute top-4 left-4 right-4 z-40 bg-white/95 border border-slate-200 shadow-lg rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-amber-500 shrink-0" />
              <div>
                <h5 className="font-bold text-slate-900">No mapped project locations available for {selectedDistrict}</h5>
                <p className="text-slate-500 text-[11px]">
                  Project records exist, but geographic coordinates have not yet been provided.
                </p>
              </div>
            </div>
            <button
              onClick={handleOpenUnmappedModal}
              className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl font-bold text-xs hover:bg-amber-100 shrink-0"
            >
              View Unmapped Projects ({summary?.unmapped_projects || 0})
            </button>
          </div>
        )}

        {/* Leaflet Map Container */}
        <div ref={mapContainerRef} className="w-full h-full z-10" />

      </div>

      {/* 5. Footer Provenance & Configuration Status */}
      <div className="bg-slate-900 text-slate-400 px-6 py-2.5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>Project data: <strong>MPLADS Connected Database</strong> • Map source: <strong>{bhuvanConfig?.active_map_provider || 'OpenStreetMap (Bhuvan configuration ready)'}</strong></span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[10px] text-slate-400">
          <span>Physical Progress: <em>Not Available</em></span>
          <span>Satellite Verification: <em>Not Available</em></span>
        </div>
      </div>

      {/* 6. Unmapped Projects Modal */}
      {showUnmappedModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base flex items-center gap-2">
                  <FileQuestion className="w-5 h-5 text-amber-400" />
                  <span>Unmapped Projects — Coordinates Unavailable ({unmappedProjects.length})</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Project records registered in database without verified latitude/longitude coordinates.
                </p>
              </div>
              <button
                onClick={() => setShowUnmappedModal(false)}
                className="p-1 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Table */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {loadingUnmapped ? (
                <div className="p-8 text-center text-xs font-bold text-slate-500 flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
                  <span>Loading unmapped project records...</span>
                </div>
              ) : unmappedProjects.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  No unmapped project records found. All projects have verified coordinates!
                </div>
              ) : (
                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase tracking-wider">
                        <th className="p-3">Work ID</th>
                        <th className="p-3">Work Description</th>
                        <th className="p-3">Extracted Location</th>
                        <th className="p-3">District / MP</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Sanctioned</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {unmappedProjects.map((p) => (
                        <tr key={p.project_id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-mono font-bold text-blue-700">{p.canonical_work_id}</td>
                          <td className="p-3 font-medium text-slate-900 max-w-xs">{p.description || p.title}</td>
                          <td className="p-3 text-slate-700">
                            {p.location_text ? (
                              <span className="font-semibold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                                {p.location_text}
                              </span>
                            ) : (
                              <span className="text-slate-400 italic">Not extracted</span>
                            )}
                          </td>
                          <td className="p-3 text-slate-600">
                            <div>{p.district}, {p.state}</div>
                            <div className="text-[10px] text-slate-400">MP: {p.mp || 'N/A'}</div>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                              {p.status}
                            </span>
                          </td>
                          <td className="p-3 font-semibold text-slate-900">₹{(p.sanctioned_amount / 100000).toFixed(2)} L</td>
                          <td className="p-3">
                            <button
                              onClick={() => {
                                setShowUnmappedModal(false);
                                if (onSelectProjectDetail) {
                                  onSelectProjectDetail({
                                    id: p.project_id.toString(),
                                    title: p.title,
                                    category: p.work_category || 'Infrastructure',
                                    status: (p.status as any) || 'Ongoing',
                                    sanctionedAmount: `₹${(p.sanctioned_amount / 100000).toFixed(2)} Lakh`,
                                    spentAmount: `₹${((p.sanctioned_amount * p.financial_utilization / 100) / 100000).toFixed(2)} Lakh`,
                                    financialUtilization: p.financial_utilization,
                                    state: p.state || '',
                                    district: p.district || '',
                                    mpName: p.mp || '',
                                    constituency: p.constituency || ''
                                  });
                                }
                              }}
                              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-[11px] transition-colors"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Showing up to 100 unmapped records</span>
              <button
                onClick={() => setShowUnmappedModal(false)}
                className="btn btn-sm btn-outline text-xs px-4 py-1.5 rounded-xl font-bold"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
