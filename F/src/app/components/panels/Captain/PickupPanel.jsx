import React from "react";

export default function PickupPanel() {
  return (
    <div className="absolute bottom-0 w-full bg-white p-6 rounded-t-3xl">
      <h3 className="text-lg font-bold mb-3">En Route to Pickup</h3>

      <div className="flex items-center gap-3 mb-4">
        <img
          src="https://i.pravatar.cc/100"
          className="w-12 h-12 rounded-full"
        />

        <div>
          <p className="font-semibold">Sarah Jenkins</p>
          <p className="text-gray-500 text-sm">⭐ 4.9 Rating</p>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded-xl mb-4">
        123 Innovation Drive, Tech Park
      </div>

      <button className="w-full bg-green-500 text-white py-3 rounded-xl">
        Arrived at Pickup
      </button>
    </div>
  );
}
