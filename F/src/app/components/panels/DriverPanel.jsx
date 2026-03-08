import React from "react";
import { Star, Phone, MessageCircle, MapPin, Car } from "lucide-react";

export function DriverPanel({ driver, onConfirm, onBack }) {
  if (!driver) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-6 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Driver Assigned</h2>
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          Change Vehicle
        </button>
      </div>

      {/* Driver Info */}
      <div className="flex items-center gap-4 border-b pb-4">
        <img
          src={`https://ui-avatars.com/api/?name=${driver.driverName}`}
          alt="Driver"
          className="w-16 h-16 rounded-full border"
        />

        <div className="flex-1">
          <p className="text-lg font-semibold">{driver.driverName}</p>

          <div className="flex items-center text-yellow-500 text-sm">
            <Star className="w-4 h-4 mr-1" />
            {driver.rating} Rating
          </div>

          <p className="text-gray-500 text-sm">
            {driver.totalRides || 1200} trips completed
          </p>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="flex items-center justify-between mt-4 bg-gray-50 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <Car className="w-5 h-5 text-gray-600" />
          <span className="font-medium">{driver.vehicleType}</span>
        </div>

        <span className="font-semibold bg-gray-200 px-3 py-1 rounded-lg">
          {driver.vehicleNumber}
        </span>
      </div>

      {/* Trip Info */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div className="bg-gray-100 rounded-xl p-3">
          <p className="text-sm text-gray-500">ETA</p>
          <p className="font-bold">{driver.eta || "4 min"}</p>
        </div>

        <div className="bg-gray-100 rounded-xl p-3">
          <p className="text-sm text-gray-500">Distance</p>
          <p className="font-bold">{driver.distance || "1.2 km"}</p>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="flex gap-3 mt-5">
        <button className="flex items-center justify-center gap-2 w-1/2 border py-2 rounded-xl hover:bg-gray-100">
          <Phone className="w-4 h-4" />
          Call
        </button>

        <button className="flex items-center justify-center gap-2 w-1/2 border py-2 rounded-xl hover:bg-gray-100">
          <MessageCircle className="w-4 h-4" />
          Message
        </button>
      </div>

      {/* Confirm Ride */}
      <button
        onClick={onConfirm}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
      >
        Confirm Ride
      </button>
    </div>
  );
}
