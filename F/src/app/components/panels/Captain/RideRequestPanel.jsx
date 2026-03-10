import React from "react";

export default function RideRequestPanel() {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-3">New Ride Request</h2>

      <div className="mb-3">
        <p className="text-gray-500">Pickup</p>
        <p className="font-semibold">123 Maple Street</p>
      </div>

      <div className="mb-3">
        <p className="text-gray-500">Drop</p>
        <p className="font-semibold">456 Oak Avenue</p>
      </div>

      <div className="flex justify-between mt-4">
        <button className="bg-red-100 text-red-600 px-5 py-2 rounded-xl">
          Reject
        </button>

        <button className="bg-green-500 text-white px-5 py-2 rounded-xl">
          Accept Ride
        </button>
      </div>
    </div>
  );
}
