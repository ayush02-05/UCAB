import React, { useState } from "react";
import { LocationInput } from "../LocationInput";

export function LocationPanel({ userName, onLocationsSet }) {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const suggestions = [
    "Airport Terminal 1",
    "City Mall",
    "Railway Station",
    "Bus Stand",
    "Central Park",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pickup || !drop) return;

    onLocationsSet({
      pickup,
      drop,
    });
  };

  const handleSuggestionClick = (place) => {
    if (activeField === "pickup") {
      setPickup(place);
    } else {
      setDrop(place);
    }

    setIsExpanded(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full">
      <h2 className="text-xl font-semibold mb-4">
        Hello {userName}, Where are you going?
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <LocationInput
          label="Pickup Location"
          placeholder="Enter pickup"
          value={pickup}
          onChange={(value) => {
            setActiveField("pickup");
            setIsExpanded(true);
            setPickup(value);
          }}
          setIsExpanded={setIsExpanded}
        />

        <LocationInput
          label="Drop Location"
          placeholder="Enter drop"
          value={drop}
          onChange={(value) => {
            setActiveField("drop");
            setIsExpanded(true);
            setDrop(value);
          }}
          setIsExpanded={setIsExpanded}
        />

        {/* Suggestions */}
        {isExpanded && (
          <div className="bg-gray-50 rounded-lg border divide-y mt-2">
            {suggestions.map((place, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(place)}
                className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
              >
                {place}
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition"
        >
          Find Ride
        </button>
      </form>
    </div>
  );
}
