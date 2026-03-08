// import React, { useEffect } from "react";
// import { MapPin } from "lucide-react";

// export function LocationInput({
//   label,
//   isExpanded,
//   setIsExpanded,
//   placeholder,
//   value,
//   onChange,
//   iconColor = "text-gray-400",
// }) {
//   const handleExpand = useEffect(() => {
//     setIsExpanded(true);
//   }, [isExpanded]);
//   return (
//     <div className="flex flex-col mb-4 w-full">
//       <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
//       <div className="relative flex items-center">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <MapPin className={`h-5 w-5 ${iconColor}`} />
//         </div>
//         <input
//           onFocus={() => handleExpand}
//           type="text"
//           className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm bg-gray-50"
//           placeholder={placeholder}
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           required
//         />
//       </div>
//     </div>
//   );
// }

import React from "react";
import { MapPin } from "lucide-react";

export function LocationInput({
  label,
  setIsExpanded,
  placeholder,
  value,
  onChange,
  onFocus,
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
          // onFocus={onFocus}
          type="text"
          onChange={(e) => {
            onChange(e.target.value);
            // onFocus;
          }}
          placeholder={placeholder}
          className="w-full border rounded-lg px-10 py-3"
        />
      </div>
    </div>
  );
}
