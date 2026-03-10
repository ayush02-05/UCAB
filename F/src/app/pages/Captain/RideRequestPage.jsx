import React from "react";
import RideRequestPanel from "../../components/panels/Captain/RideRequestPanel";
import CaptainMap from "../../components/CaptainMap";

export default function RideRequestPage() {
  return (
    <div className="h-screen relative bottom-14">
      <CaptainMap />

      <RideRequestPanel />
    </div>
  );
}
