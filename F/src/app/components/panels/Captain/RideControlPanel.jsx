import React from "react";

export default function RideControlPanel() {
  return (
    <div className="absolute bottom-0 w-full bg-white p-6 rounded-t-3xl">
      <h3 className="font-bold text-lg mb-4">Ride in Progress</h3>

      <div className="flex justify-between mb-4">
        <button className="bg-gray-200 px-4 py-2 rounded-lg">Call Rider</button>

        <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
          Cancel Ride
        </button>
      </div>

      <button className="w-full bg-green-500 text-white py-3 rounded-xl">
        Complete Ride
      </button>
    </div>
  );
}
