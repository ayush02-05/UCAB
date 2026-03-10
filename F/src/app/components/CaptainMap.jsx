// import React from "react";
// import { MapContainer, TileLayer } from "react-leaflet";

// export default function CaptainMap() {
//   const position = [28.6139, 77.209];

//   return (
//     <div className="absolute top-0 left-0 w-full h-full z-0">
//       <MapContainer
//         center={position}
//         zoom={13}
//         scrollWheelZoom={true}
//         className="w-full h-full"
//       >
//         <TileLayer
//           attribution="&copy; OpenStreetMap contributors"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//       </MapContainer>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useSocket } from "../context/SocketContext";
import { useCaptain } from "../context/CaptainContext";

export default function CaptainMap() {
  const { sendEvent, connected } = useSocket();
  const { captain } = useCaptain();

  const [position, setPosition] = useState([28.6139, 77.209]); // fallback

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setPosition([lat, lng]);

        // Send location to backend
        if (connected && captain?._id) {
          sendEvent("update-location", {
            captainId: captain._id,
            lat,
            lng,
          });
        }
      },
      (err) => {
        console.log("Location error:", err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [connected, captain]);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0">
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>Your Current Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
