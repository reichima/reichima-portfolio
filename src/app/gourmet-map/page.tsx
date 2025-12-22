"use client";

import Header from "@/app/(portfolio)/header";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Activity, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 35.6895,
  lng: 139.6917,
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      elementType: "geometry",
      stylers: [{ color: "#242f3e" }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#242f3e" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ],
};

export default function GourmetMapPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [loadError, setLoadError] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-900 text-white">
      <Header />
      <main className="relative h-screen w-full pt-24">
        <Activity mode={apiKey ? "visible" : "hidden"}>
          <LoadScript
            googleMapsApiKey={apiKey || ""}
            onError={() => setLoadError(true)}
          >
            <Activity mode={loadError ? "hidden" : "visible"}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
                options={mapOptions}
              >
                {/* Example Marker */}
                <Marker position={center} />
              </GoogleMap>
            </Activity>

            <Activity mode={loadError ? "visible" : "hidden"}>
              <div className="flex h-full w-full items-center justify-center">
                <div className="rounded-xl border border-white/10 bg-black/60 p-8 backdrop-blur-md">
                  <h2 className="font-orbitron mb-2 text-xl font-bold text-white">
                    Map Load Error
                  </h2>
                  <p className="text-gray-300">
                    Failed to load Google Maps. Please check your API key.
                  </p>
                </div>
              </div>
            </Activity>
          </LoadScript>
        </Activity>

        <Activity mode={!apiKey ? "visible" : "hidden"}>
          <div className="flex h-full w-full items-center justify-center">
            <div className="rounded-xl border border-white/10 bg-black/60 p-8 backdrop-blur-md">
              <h2 className="font-orbitron mb-2 text-xl font-bold text-white">
                API Key Missing
              </h2>
              <p className="text-gray-300">
                Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file.
              </p>
            </div>
          </div>
        </Activity>

        {/* Overlay Content - only show when map is loaded */}
        <Activity mode={apiKey && !loadError ? "visible" : "hidden"}>
          <div className="absolute top-32 left-8 z-10 max-w-md rounded-xl border border-white/10 bg-black/60 p-6 backdrop-blur-md">
            <h1 className="font-orbitron mb-2 text-2xl font-bold text-white">
              Gourmet Map
            </h1>
            <p className="text-gray-300">
              Explore the best gourmet spots in the city.
            </p>
          </div>
        </Activity>
      </main>
    </div>
  );
}
