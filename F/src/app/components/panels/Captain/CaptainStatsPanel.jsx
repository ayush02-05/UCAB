import React from "react";

export default function CaptainStatsPanel() {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-lg p-6 h-[45%]">
      <h3 className="text-lg font-semibold mb-4">Today's Summary</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-gray-500">Total Rides</p>
          <h2 className="text-xl font-bold">12</h2>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-gray-500">Earnings</p>
          <h2 className="text-xl font-bold">$142</h2>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-gray-500">Ride Hours</p>
          <h2 className="text-xl font-bold">5.4 hr</h2>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-gray-500">Rating</p>
          <h2 className="text-xl font-bold">4.9 ⭐</h2>
        </div>
      </div>
    </div>
  );
}
