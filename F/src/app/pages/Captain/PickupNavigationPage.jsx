import React from "react";
import PickupPanel from "../../components/panels/Captain/PickupPanel";
import CaptainMap from "../../components/CaptainMap";

export default function PickupNavigationPage() {
  return (
    <div className="h-screen relative">
      <CaptainMap />

      <PickupPanel />
    </div>
  );
}
