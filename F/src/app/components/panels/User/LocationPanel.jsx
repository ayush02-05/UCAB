// import React, { useState } from "react";
// import axios from "axios";
// import { MapPin } from "lucide-react";
// import { useForm } from "react-hook-form";

// export function LocationPanel({
//   userName,
//   onLocationsSet,
//   localCity = "Jabalpur",
// }) {
//   const { register, handleSubmit, setValue, watch } = useForm({
//     defaultValues: {
//       pickup: "",
//       drop: "",
//     },
//   });

//   const [isExpanded, setIsExpanded] = useState(false);
//   const [activeField, setActiveField] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);

//   const pickupInput = watch("pickup");
//   const dropInput = watch("drop");
//   console.log(pickupInput, dropInput);

//   // Fetch suggestions
//   const fetchSuggestions = async (query) => {
//     try {
//       if (!query) return;

//       const res = await axios.get("http://localhost:4000/map/suggestions", {
//         params: { input: query },
//         withCredentials: true,
//       });

//       // Sort local city first
//       const sorted = res.data.sort((a, b) => {
//         const aLocal =
//           a.city && a.city.toLowerCase() === localCity.toLowerCase();
//         const bLocal =
//           b.city && b.city.toLowerCase() === localCity.toLowerCase();
//         if (aLocal && !bLocal) return -1;
//         if (!aLocal && bLocal) return 1;
//         return 0;
//       });

//       setSuggestions(sorted.slice(0, 5));
//     } catch (error) {
//       console.error("Suggestion error:", error);
//     }
//   };

//   const handleSuggestionClick = (place) => {
//     if (activeField === "pickup") setValue("pickup", place.full_address);
//     else setValue("drop", place.full_address);

//     setIsExpanded(false);
//     setSuggestions([]);
//   };

//   const onSubmit = (data) => {
//     onLocationsSet({
//       pickup: data.pickup,
//       drop: data.drop,
//     });
//     setIsExpanded(false);
//     setSuggestions([]);
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-xl p-6 w-full">
//       <h2 className="text-xl font-semibold mb-4">
//         Hello {userName}, Where are you going?
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Pickup Input */}
//         <div className="flex flex-col mb-4 w-full">
//           <label className="text-sm font-medium text-gray-700 mb-1">
//             Pickup Location
//           </label>
//           <div className="relative flex items-center">
//             <div className="absolute inset-y-0 left-0 p-3 flex items-center pointer-events-none">
//               <MapPin className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               {...register("pickup")}
//               type="text"
//               placeholder="Enter pickup"
//               value={pickupInput}
//               onChange={(e) => {
//                 setActiveField("pickup");
//                 setValue("pickup", e.target.value);
//                 setIsExpanded(true);
//                 fetchSuggestions(e.target.value);
//               }}
//               className="w-full border rounded-lg px-10 py-3"
//             />
//           </div>
//         </div>

//         {/* Drop Input */}
//         <div className="flex flex-col mb-4 w-full">
//           <label className="text-sm font-medium text-gray-700 mb-1">
//             Drop Location
//           </label>
//           <div className="relative flex items-center">
//             <div className="absolute inset-y-0 left-0 p-3 flex items-center pointer-events-none">
//               <MapPin className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               {...register("drop")}
//               type="text"
//               placeholder="Enter drop"
//               value={dropInput}
//               onChange={(e) => {
//                 setActiveField("drop");
//                 setValue("drop", e.target.value);
//                 setIsExpanded(true);
//                 fetchSuggestions(e.target.value);
//               }}
//               className="w-full border rounded-lg px-10 py-3"
//             />
//           </div>
//         </div>

//         {/* Suggestions */}
//         {isExpanded && suggestions.length > 0 && (
//           <div className="bg-gray-50 rounded-lg border divide-y mt-2 max-h-60 overflow-auto">
//             {suggestions.map((place, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleSuggestionClick(place)}
//                 className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
//               >
//                 {place.full_address}
//                 {place.city &&
//                   place.city.toLowerCase() === localCity.toLowerCase() && (
//                     <span className="ml-2 text-xs text-green-600">
//                       🏠 Near you
//                     </span>
//                   )}
//               </div>
//             ))}
//           </div>
//         )}

//         <button
//           type="submit"
//           className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition"
//         >
//           Find Ride
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../../context/AppContext";

export function LocationPanel({
  userName,
  onLocationsSet,
  localCity = "Jabalpur",
}) {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      pickup: "",
      drop: "",
    },
  });

  // Local typing state
  const [typingValue, setTypingValue] = useState({ pickup: "", drop: "" });

  // Final submitted values
  // const [finalValues, setFinalValues] = useState({ pickup: "", drop: "" });

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const { setPickupLocation, setDropLocation } = useAppContext();

  const fetchSuggestions = async (query) => {
    try {
      if (!query) return;
      const res = await axios.get("http://localhost:4000/map/suggestions", {
        params: { input: query },
        withCredentials: true,
      });

      const sorted = res.data.sort((a, b) => {
        const aLocal =
          a.city && a.city.toLowerCase() === localCity.toLowerCase();
        const bLocal =
          b.city && b.city.toLowerCase() === localCity.toLowerCase();
        if (aLocal && !bLocal) return -1;
        if (!aLocal && bLocal) return 1;
        return 0;
      });

      setSuggestions(sorted.slice(0, 5));
    } catch (error) {
      console.error("Suggestion error:", error);
    }
  };

  const handleSuggestionClick = (place) => {
    if (activeField === "pickup")
      setTypingValue((prev) => ({ ...prev, pickup: place.full_address }));
    else setTypingValue((prev) => ({ ...prev, drop: place.full_address }));

    setIsExpanded(false);
    setSuggestions([]);
  };

  const onSubmit = (data) => {
    // Update final values only on submit
    console.log(typingValue);
    setPickupLocation(typingValue.pickup);
    setDropLocation(typingValue.drop);
    onLocationsSet({ pickup: data.pickup, drop: data.drop });
    setIsExpanded(false);
    setSuggestions([]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full">
      <h2 className="text-xl font-semibold mb-4">
        Hello {userName}, Where are you going?
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Pickup Input */}
        <div className="flex flex-col mb-4 w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Pickup Location
          </label>
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 p-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register("pickup")}
              type="text"
              placeholder="Enter pickup"
              value={typingValue.pickup}
              onChange={(e) => {
                setActiveField("pickup");
                setTypingValue((prev) => ({ ...prev, pickup: e.target.value }));
                setValue("pickup", e.target.value); // update form value for submit
                setIsExpanded(true);
                fetchSuggestions(e.target.value);
              }}
              className="w-full border rounded-lg px-10 py-3"
            />
          </div>
        </div>
        {/* Drop Input */}
        <div className="flex flex-col mb-4 w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Drop Location
          </label>
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 p-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register("drop")}
              type="text"
              placeholder="Enter drop"
              value={typingValue.drop}
              onChange={(e) => {
                setActiveField("drop");
                setTypingValue((prev) => ({ ...prev, drop: e.target.value }));
                setValue("drop", e.target.value); // update form value for submit
                setIsExpanded(true);
                fetchSuggestions(e.target.value);
              }}
              className="w-full border rounded-lg px-10 py-3"
            />
          </div>
        </div>
        {/* Suggestions */}
        {isExpanded && suggestions.length > 0 && (
          <div className="bg-gray-50 rounded-lg border divide-y mt-2 max-h-60 overflow-auto">
            {suggestions.map((place, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(place)}
                className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
              >
                {place.full_address}
                {place.city &&
                  place.city.toLowerCase() === localCity.toLowerCase() && (
                    <span className="ml-2 text-xs text-green-600">
                      🏠 Near you
                    </span>
                  )}
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
        {/* Debug: show final values
        <div className="mt-2 text-sm text-gray-600">
          <div>Final Pickup: {finalValues.pickup}</div>
          <div>Final Drop: {finalValues.drop}</div>
        </div> */}
      </form>
    </div>
  );
}
