import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { VehiclePanel } from "../../components/panels/VehiclePanel";
import { RideStatusPanel } from "../../components/panels/RideStatusPanel";
import { LocationPanel } from "../../components/panels/LocationPanel";
import { ConfirmPanel } from "../../components/panels/ConfirmPanel";

export function DashboardPage() {
  const { user } = useAppContext();
  const [bookingStage, setBookingStage] = useState("searching");
  const [selectedCab, setSelectedCab] = useState(null);
  const [fares, setFares] = useState(null);

  const VEHICLE_OPTIONS = [
    {
      id: "car",
      title: "Car",
      description: "Affordable, compact rides",
      image:
        "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85MDM0YzIwMC1jZTI5LTQ5ZjEtYmYzNS1lOWQyNTBlODIxN2EucG5n",
    },
    {
      id: "moto",
      title: "Moto",
      description: "Fast bikes for solo rides",
      image:
        "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n",
    },
    {
      id: "auto",
      title: "Auto",
      description: "Quick autos, convenient for city",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaZY2_h59IkBt0R1AN-PWjGkFRBRfV_pTKuA&s",
    },
  ];

  return (
    <div
      // Changed h-screen to calc to account for the 16 (4rem) header
      className="relative h-[calc(100vh-64px)] w-full bg-cover bg-center flex items-end md:items-stretch overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1730317195705-8a265a59ed1b?auto=format&fit=crop&q=80&w=1600')",
      }}
    >
      {/* Background Overlay to make content pop */}
      <div className="absolute inset-0 bg-black/10 md:bg-transparent" />

      {/* Sidebar Container */}
      <div className="w-full md:w-[400px] lg:w-[450px] p-4 md:p-6 flex flex-col justify-end z-10 relative">
        {/* Stage 1: Location Search */}
        {bookingStage === "searching" && (
          <LocationPanel
            userName={user?.name}
            onLocationsSet={() => setBookingStage("selecting")}
          />
        )}

        {/* Stage 2: Vehicle Selection */}
        {bookingStage === "selecting" && (
          <VehiclePanel
            fares={fares}
            setFares={setFares}
            onBack={() => setBookingStage("searching")}
            onSelect={(cab) => {
              setSelectedCab(cab);
              setBookingStage("driver");
            }}
          />
        )}

        {/* Stage 4: Driver */}
        {bookingStage === "driver" && (
          <ConfirmPanel
            driver={selectedCab}
            onConfirm={() => {
              setBookingStage("confirmed");
              // Set the current ride in context for fare/pickup/drop
              if (selectedCab) {
                setCurrentRide({
                  cab: selectedCab,
                  pickup: pickupLocation,
                  drop: dropLocation,
                  fare: fares,
                });
              }
            }}
            onBack={() => setBookingStage("selecting")}
          />
        )}

        {/* Stage 4: Confirmation */}
        {bookingStage === "confirmed" && (
          <RideStatusPanel
            cab={selectedCab}
            onBack={() => setBookingStage("selecting")}
            onCancel={() => {
              setSelectedCab(null);
              setBookingStage("searching");
            }}
          />
        )}
      </div>
    </div>
  );
}
