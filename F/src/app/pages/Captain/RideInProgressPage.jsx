import React from "react";
import CaptainMap from "../../components/CaptainMap";
import RideControlPanel from "../../components/panels/Captain/RideControlPanel";

export default function RideInProgressPage() {
  return (
    <div className="h-screen relative">
      <CaptainMap />

      <RideControlPanel />
    </div>
  );
}
