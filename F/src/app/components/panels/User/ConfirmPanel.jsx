import React from "react";
import { Star, Phone, MessageSquare, Truck } from "lucide-react";
import { useAppContext } from "../../../context/AppContext";
import axios from "axios";

export function ConfirmPanel({ driver, onConfirm, onBack }) {
  const {
    pickupLocation,
    dropLocation,
    currentRide,
    vehicletype,
    vehicleImage,
  } = useAppContext();

  if (!driver) return null;

  const vehicleType = vehicletype ? vehicletype : "sedan";
  const vehicleimage = vehicleImage ? vehicleImage : "sedan";

  // Fare from currentRide or driver.estimatedFare
  const fare = currentRide?.fare || driver.estimatedFare || 0;

  const confirmRide = async () => {
    const data = {
      pickup: pickupLocation,
      destination: dropLocation,
      vehicletype: vehicleType,
    };
    const response = await axios.post(
      `http://localhost:4000/ride/create`,
      data,
      {
        withCredentials: true,
      },
    );
    console.log(response.data.ride);
  };

  return (
    <div className="bg-white rounded-t-3xl md:rounded-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] border border-gray-100 p-6 w-full max-w-md mx-auto font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Confirm Ride</h2>
        <button
          onClick={onBack}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          Change Vehicle
        </button>
      </div>

      {/* Location Timeline */}
      <div className="relative pl-3 mb-6">
        <div className="absolute left-[17px] top-4 bottom-4 w-[2px] bg-gray-200"></div>

        <div className="relative mb-5 pl-6">
          <div className="absolute left-[1.5px] top-1.5 w-3 h-3 bg-blue-500 rounded-full border-[3px] border-white box-content shadow-sm"></div>
          <p className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-0.5">
            Pickup
          </p>
          <p className="text-sm font-medium text-gray-900 truncate">
            {pickupLocation || "Grand Central Terminal, New York"}
          </p>
        </div>

        <div className="relative pl-6">
          <div className="absolute left-[3px] top-1.5 w-2.5 h-2.5 bg-white border-[2px] border-green-500 rounded-sm"></div>
          <p className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-0.5">
            Destination
          </p>
          <p className="text-sm font-medium text-gray-900 truncate">
            {dropLocation || "Empire State Building, 5th Ave"}
          </p>
        </div>
      </div>

      {/* Driver & Vehicle Info */}
      <div className="flex items-center justify-between py-5 border-t border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg">
            {driver.driverName
              ? driver.driverName.substring(0, 2).toUpperCase()
              : "UN"}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-bold text-gray-900 text-base">
                {vehicleType}
              </h3>
              <div className="flex items-center text-yellow-500 text-[13px] font-bold">
                <Star className="w-3.5 h-3.5 fill-current mr-1" />
                {driver.rating || "4.8"} Rating
              </div>
            </div>
            <p className="text-[13px] text-gray-500 font-medium">
              Professional Driver • {driver.totalRides || "1200+"} trips
            </p>
          </div>
        </div>
        <img
          className="w-20 object-contain group-hover:scale-110 transition-transform"
          src={vehicleimage}
        />
      </div>

      {/* Trip Stats */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="bg-[#f8f9fa] rounded-2xl py-3 text-center border border-gray-50">
          <p className="text-[12px] font-medium text-gray-500 uppercase mb-0.5">
            ETA
          </p>
          <p className="font-bold text-gray-900 text-lg">
            {driver.eta || "4 min"}
          </p>
        </div>

        <div className="bg-[#f8f9fa] rounded-2xl py-3 text-center border border-gray-50">
          <p className="text-[12px] font-medium text-gray-500 uppercase mb-0.5">
            Distance
          </p>
          <p className="font-bold text-gray-900 text-lg">
            {driver.distance || "1.2 km"}
          </p>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="flex gap-3 mt-4">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Phone className="w-4 h-4" />
          Call
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <MessageSquare className="w-4 h-4" />
          Message
        </button>
      </div>

      {/* Total Fare */}
      <div className="flex items-center justify-between mt-8 mb-5">
        <p className="text-gray-500 font-medium text-base">Total Fare</p>
        <p className="text-3xl font-black text-gray-900">${fare.toFixed(2)}</p>
      </div>

      {/* Confirm Button */}
      <button
        onClick={() => {
          (onConfirm, confirmRide);
        }}
        className="w-full bg-[#05a368] hover:bg-[#048e5a] text-white py-4 rounded-2xl font-bold text-lg shadow-md transition-colors"
      >
        Confirm Ride
      </button>
    </div>
  );
}
