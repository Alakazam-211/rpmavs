'use client';

import { useEffect, useRef, useState } from 'react';

interface Location {
  city: string;
  state: string;
  lat: number;
  lng: number;
}

interface LocationsMapProps {
  locations: Location[];
  className?: string;
}

export default function LocationsMap({ locations, className = '' }: LocationsMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapRef.current) return;

    let mapInstance: any = null;
    let markers: any[] = [];

    // Dynamically import Leaflet only on client side
    import('leaflet').then((L) => {
      import('leaflet/dist/leaflet.css');

      // Initialize map centered on Southeast US
      mapInstance = L.default.map(mapRef.current!, {
        center: [33.7677, -84.4183], // Center on Atlanta area
        zoom: 5,
        zoomControl: true,
        attributionControl: true,
      });

      // Add OpenStreetMap tiles (free, no API key needed)
      L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapInstance);

      // Add custom icon for markers
      const customIcon = L.default.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 24px;
            height: 24px;
            background-color: #2075bf;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            position: relative;
          ">
            <div style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 8px;
              height: 8px;
              background-color: white;
              border-radius: 50%;
            "></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24],
      });

      // Add markers for each location
      locations.forEach((location) => {
        const marker = L.default
          .marker([location.lat, location.lng], { icon: customIcon })
          .addTo(mapInstance)
          .bindPopup(`<strong>${location.city}, ${location.state}</strong>`);
        
        markers.push(marker);
      });

      // Fit map to show all markers
      if (locations.length > 0 && markers.length > 0) {
        const group = new L.default.FeatureGroup(markers);
        mapInstance.fitBounds(group.getBounds().pad(0.2));
      }
    });

    // Cleanup
    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
      markers = [];
    };
  }, [locations, isClient]);

  if (!isClient) {
    return (
      <div className={`rounded-xl overflow-hidden shadow-lg bg-gray-100 ${className}`}>
        <div className="w-full h-full min-h-[400px] flex items-center justify-center">
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`rounded-xl overflow-hidden shadow-lg ${className}`}>
        <div ref={mapRef} className="w-full h-full min-h-[400px]" />
      </div>
      <style jsx global>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-container {
          font-family: inherit;
          background-color: #f3f4f6;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .leaflet-popup-content {
          margin: 12px 16px;
          font-size: 14px;
          color: #1f2937;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
          border-radius: 8px !important;
          overflow: hidden;
        }
        .leaflet-control-zoom a {
          background-color: white !important;
          color: #2075bf !important;
          border: 1px solid #e5e7eb !important;
          width: 32px !important;
          height: 32px !important;
          line-height: 32px !important;
          font-size: 18px !important;
        }
        .leaflet-control-zoom a:hover {
          background-color: #f3f4f6 !important;
        }
        .leaflet-control-attribution {
          background-color: rgba(255, 255, 255, 0.9) !important;
          border-radius: 4px !important;
          font-size: 11px !important;
        }
      `}</style>
    </>
  );
}
