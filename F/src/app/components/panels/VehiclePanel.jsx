import React, { useEffect, useState } from "react";
import { ArrowLeft, Info, Clock, ChevronRight } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";

// 1. Keep the vehicle list simple and outside the component logic
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

export function VehiclePanel({ onSelect, onBack, fares, setFares }) {
  // 2. We just store the plain object we get from the backend: { car: 100, moto: 40, auto: 60 }

  const [loading, setLoading] = useState(true);

  const { pickupLocation, dropLocation, setVehicletype, setVehicleImage } =
    useAppContext();

  useEffect(() => {
    async function fetchFares() {
      if (!pickupLocation || !dropLocation) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // We are now making a GET request to match the fixed backend
        const res = await axios.get(
          `http://localhost:4000/ride/getfair?pickup=${encodeURIComponent(
            pickupLocation,
          )}&destination=${encodeURIComponent(dropLocation)}`,
          {
            withCredentials: true,
          },
        );

        // Axios automatically parses JSON, so data is inside res.data
        const data = res.data;

        setFares(data);
      } catch (error) {
        console.error("Error fetching fares:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFares();
  }, [pickupLocation, dropLocation]);

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <h3 className="font-bold text-gray-900">Choose a ride</h3>
        </div>
        <Info size={18} className="text-gray-400" />
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {loading ? (
          <div className="flex flex-col">
            {[1, 2, 3].map((skeletonId) => (
              <div
                key={skeletonId}
                className="flex items-center p-4 gap-4 border-b border-gray-50 animate-pulse"
              >
                <div className="w-20 h-12 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-grow space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="w-12 h-6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          /* 4. We map over our simple static list and look up the price dynamically */
          VEHICLE_OPTIONS.map((vehicle) => {
            // Find the fare for this specific vehicle type (fares.car, fares.moto, etc.)
            const calculatedFare = fares ? fares[vehicle.id] : null;

            return (
              <div
                key={vehicle.id}
                onClick={() => {
                  // 👇 1. Set the vehicle type in your global context
                  setVehicletype(vehicle.id);
                  setVehicleImage(vehicle.image);
                  // 👇 2. Run the original onSelect function
                  onSelect({ ...vehicle, estimatedFare: calculatedFare });
                }}
                className="group flex items-center p-4 gap-4 hover:bg-blue-50/50 cursor-pointer transition-all border-b border-gray-50 last:border-0"
              >
                <div className="w-20 h-12 flex-shrink-0">
                  <img
                    src={vehicle.image}
                    alt={vehicle.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 capitalize">
                      {vehicle.title}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {vehicle.description}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-blue-600">
                    <Clock size={12} />
                    <span className="text-[11px] font-bold">5 min away</span>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end">
                  <p className="font-black text-gray-900 text-lg">
                    {calculatedFare ? `₹${calculatedFare.toFixed(2)}` : "N/A"}
                  </p>
                  <ChevronRight
                    size={18}
                    className="text-gray-300 group-hover:text-blue-500 transition-colors"
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
