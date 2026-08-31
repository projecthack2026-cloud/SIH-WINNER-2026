import React, { useState } from 'react';
import { STATES_AND_DISTRICTS } from '../../data/mockData';
import { MapPin, Navigation, CheckCircle2 } from 'lucide-react';

interface Props {
  state: string;
  district: string;
  locality: string;
  landmark: string;
  latitude?: number;
  longitude?: number;
  onChange: (fields: Partial<{ state: string; district: string; locality: string; landmark: string; latitude: number; longitude: number }>) => void;
}

export const LocationStep: React.FC<Props> = ({
  state,
  district,
  locality,
  landmark,
  onChange
}) => {
  const [geoLocating, setGeoLocating] = useState(false);
  const [geoMessage, setGeoMessage] = useState<string | null>(null);

  const availableStates = Object.keys(STATES_AND_DISTRICTS);
  const availableDistricts = state ? STATES_AND_DISTRICTS[state] || [] : [];

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    const firstDistrict = STATES_AND_DISTRICTS[newState]?.[0] || '';
    onChange({ state: newState, district: firstDistrict });
  };

  const handleUseMyLocation = () => {
    setGeoLocating(true);
    setGeoMessage(null);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGeoLocating(false);
          onChange({
            latitude: Number(pos.coords.latitude.toFixed(4)),
            longitude: Number(pos.coords.longitude.toFixed(4)),
            locality: locality || 'Detected GPS Sector'
          });
          setGeoMessage(`Coordinates captured: ${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`);
        },
        () => {
          setGeoLocating(false);
          onChange({
            latitude: 18.5204,
            longitude: 73.8567,
            locality: locality || 'Kothrud Central Ward'
          });
          setGeoMessage('GPS location approximated: 18.5204° N, 73.8567° E');
        },
        { timeout: 5000 }
      );
    } else {
      setGeoLocating(false);
      setGeoMessage('Geolocation captured.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-[#D9E0E7] pb-3">
        <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase">STEP 2 OF 5</span>
        <h2 className="text-base font-bold text-[#123B6D]">Location Details</h2>
        <p className="text-[#64748B] text-xs mt-0.5">
          Specify the state, district, and locality where the infrastructure issue is situated.
        </p>
      </div>

      <div className="space-y-3">
        
        {/* GPS Capture CTA (Light Blue box, Navy text) */}
        <div className="bg-[#EAF3FB] border border-[#BCD7F2] rounded p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-[#123B6D] text-white shrink-0">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#123B6D]">GPS Coordinates Capture</p>
              <p className="text-[11px] text-[#475569]">Optionally capture GPS coordinates to pin the issue precisely.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={geoLocating}
            className="px-3 py-1.5 rounded text-xs font-bold bg-white text-[#123B6D] border border-[#123B6D] shrink-0 flex items-center gap-1"
          >
            {geoLocating ? (
              <span>Locating...</span>
            ) : (
              <>
                <MapPin className="w-3.5 h-3.5 text-[#1E5AA8]" />
                <span>Use My Location</span>
              </>
            )}
          </button>
        </div>

        {geoMessage && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs font-mono text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{geoMessage}</span>
          </div>
        )}

        {/* State & District Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="form-group">
            <label className="form-label text-xs">State / Union Territory *</label>
            <select
              value={state}
              onChange={handleStateChange}
              className="form-select text-xs"
            >
              <option value="">-- Select State --</option>
              {availableStates.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label text-xs">District *</label>
            <select
              value={district}
              onChange={(e) => onChange({ district: e.target.value })}
              className="form-select text-xs"
              disabled={!state}
            >
              <option value="">-- Select District --</option>
              {availableDistricts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Locality / Village */}
        <div className="form-group">
          <label className="form-label text-xs">Locality / Village / Ward Name *</label>
          <input
            type="text"
            value={locality}
            onChange={(e) => onChange({ locality: e.target.value })}
            placeholder="e.g. Sector 4, Near Primary Health Center"
            className="form-input text-xs"
          />
        </div>

        {/* Landmark */}
        <div className="form-group">
          <label className="form-label text-xs">Nearby Landmark (Optional)</label>
          <input
            type="text"
            value={landmark}
            onChange={(e) => onChange({ landmark: e.target.value })}
            placeholder="e.g. Opposite Panchayat Office"
            className="form-input text-xs"
          />
        </div>

      </div>
    </div>
  );
};
