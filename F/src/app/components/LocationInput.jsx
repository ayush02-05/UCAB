import React from "react";
import { MapPin } from "lucide-react";

export function LocationInput({
  label,
  setIsExpanded,
  placeholder,
  value,
  onChange,
  iconColor = "text-gray-400",
}) {
  const handleExpand = () => {
    setIsExpanded(true);
  };

  return (
    <div className="flex flex-col mb-4 w-full">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>

      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 p-3 flex items-center pointer-events-none">
          <MapPin className={`h-5 w-5 ${iconColor}`} />
        </div>

        <input
          type="text"
          value={value}
          onFocus={handleExpand}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          placeholder={placeholder}
          className="w-full border rounded-lg px-10 py-3"
        />
      </div>
    </div>
  );
}
