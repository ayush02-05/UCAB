import React, { useEffect } from "react";
import CaptainStatsPanel from "../../components/panels/Captain/CaptainStatsPanel";
import CaptainMap from "../../components/CaptainMap";
import { useSocket } from "../../context/SocketContext";
import { useCaptain } from "../../context/CaptainContext";

export default function DriverDashboard() {
  const { sendEvent, connected } = useSocket();
  const { captain } = useCaptain();

  useEffect(() => {
    console.log("USER:", captain);
    console.log("CONNECTED:", connected);

    if (connected && captain?._id) {
      console.log("SENDING JOIN EVENT");

      sendEvent("join", {
        userId: captain._id,
        userType: "captain",
      });
    }
  }, [captain, connected]);
  return (
    <div className="h-screen w-full relative  ">
      {/* Map */}
      <CaptainMap />

      {/* Top Header */}
      <div className="absolute top-0 left-0 w-full flex justify-between p-4 bg-white shadow">
        <h2 className="font-bold text-lg">Captain Mode</h2>

        <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Go Online
        </button>
      </div>

      {/* Bottom Panel */}
      <CaptainStatsPanel />
    </div>
  );
}
