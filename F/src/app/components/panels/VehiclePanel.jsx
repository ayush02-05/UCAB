// // import React from "react";
// // import { CabCard } from "../CabCard";

// // export function VehiclePanel({ cabs, onSelectCab }) {
// //   return (
// //     <div className="bg-gray-200 rounded-2xl shadow-sm border px-6 py-4">
// //       <h2 className="text-xl font-bold mb-4">Choose Vehicle</h2>

// //       <div className="flex flex-col gap-4">
// //         {cabs.map((cab) => (
// //           <CabCard key={cab.id} cab={cab} onBook={onSelectCab} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// import React from "react";
// import { Car, Info, Clock, ChevronRight } from "lucide-react";

// export function VehiclePanel({ onSelect }) {
//   const cabs = [
//     {
//       id: 1,
//       driverName: "Rohit Sharma",
//       vehicleType: "UberGo",
//       vehicleNumber: "MP04 AB1234",
//       rating: 4.7,
//       estimatedFare: 112.5,
//       estimatedArrival: 2,
//       description: "Affordable, compact rides",
//       image:
//         "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_538/v1568070387/assets/b5/0a51f1-88f0-4da0-9639-dbba2b6932a4/original/UberX.png",
//     },
//     {
//       id: 2,
//       driverName: "Amit Verma",
//       vehicleType: "Premier",
//       vehicleNumber: "MP04 XY5678",
//       rating: 4.9,
//       estimatedFare: 145.2,
//       estimatedArrival: 5,
//       description: "Comfortable sedans, top-rated drivers",
//       image:
//         "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_538/v1568070443/assets/82/6bf372-335d-4c8d-9c7b-513d4099ceb9/original/UberConfirm.png",
//     },
//   ];

//   return (
//     <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-4 duration-500">
//       {/* Header */}
//       <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
//         <h3 className="font-bold text-gray-900">Choose a ride</h3>
//         <button className="text-gray-400 hover:text-gray-600">
//           <Info size={18} />
//         </button>
//       </div>

//       {/* Vehicle List */}
//       <div className="max-h-[400px] overflow-y-auto">
//         {cabs.map((cab) => (
//           <div
//             key={cab.id}
//             onClick={() => onSelect(cab)}
//             className="group flex items-center p-4 gap-4 hover:bg-blue-50/50 cursor-pointer transition-all border-b border-gray-50 last:border-0"
//           >
//             {/* Vehicle Image */}
//             <div className="w-20 h-12 flex-shrink-0">
//               <img
//                 src={cab.image}
//                 alt={cab.vehicleType}
//                 className="w-full h-full object-contain group-hover:scale-110 transition-transform"
//               />
//             </div>

//             {/* Details */}
//             <div className="flex-grow">
//               <div className="flex items-center gap-2">
//                 <span className="font-bold text-gray-900">
//                   {cab.vehicleType}
//                 </span>
//                 <span className="flex items-center text-[10px] bg-gray-900 text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter">
//                   {cab.rating} ★
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500 line-clamp-1">
//                 {cab.description}
//               </p>
//               <div className="flex items-center gap-1 mt-1 text-blue-600">
//                 <Clock size={12} />
//                 <span className="text-[11px] font-bold">
//                   {cab.estimatedArrival} min away
//                 </span>
//               </div>
//             </div>

//             {/* Price */}
//             <div className="text-right flex flex-col items-end">
//               <p className="font-black text-gray-900 text-lg">
//                 ₹{cab.estimatedFare.toFixed(2)}
//               </p>
//               <ChevronRight
//                 size={18}
//                 className="text-gray-300 group-hover:text-blue-500 transition-colors"
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Footer / Confirm Button */}
//       <div className="p-4 bg-white">
//         <button className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-gray-200">
//           Confirm Selection
//         </button>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { ArrowLeft, Info, Clock, ChevronRight } from "lucide-react";

export function VehiclePanel({ onSelect, onBack }) {
  const cabs = [
    {
      id: 1,
      driverName: "Rohit Sharma",
      vehicleType: "UberGo",
      vehicleNumber: "MP04 AB1234",
      rating: 4.7,
      estimatedFare: 112.5,
      estimatedArrival: 2,
      description: "Affordable, compact rides",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      id: 2,
      driverName: "Amit Verma",
      vehicleType: "Premier",
      vehicleNumber: "MP04 XY5678",
      rating: 4.9,
      estimatedFare: 145.2,
      estimatedArrival: 5,
      description: "Comfortable sedans, top-rated drivers",
      image:
        "data:image/jpeg;base64,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",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <h3 className="font-bold text-gray-900">Choose a ride</h3>
        </div>
        <Info size={18} className="text-gray-400" />
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {/* ... (mapping through cabs as before) */}
        {cabs.map((cab) => (
          <div
            key={cab.id}
            onClick={() => onSelect(cab)}
            className="group flex items-center p-4 gap-4 hover:bg-blue-50/50 cursor-pointer transition-all border-b border-gray-50 last:border-0"
          >
            {/* Vehicle Image */}
            <div className="w-20 h-12 flex-shrink-0">
              <img
                src={cab.image}
                alt={cab.vehicleType}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform"
              />
            </div>

            {/* Details */}
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">
                  {cab.vehicleType}
                </span>
                <span className="flex items-center text-[10px] bg-gray-900 text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter">
                  {cab.rating} ★
                </span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-1">
                {cab.description}
              </p>
              <div className="flex items-center gap-1 mt-1 text-blue-600">
                <Clock size={12} />
                <span className="text-[11px] font-bold">
                  {cab.estimatedArrival} min away
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="text-right flex flex-col items-end">
              <p className="font-black text-gray-900 text-lg">
                ₹{cab.estimatedFare.toFixed(2)}
              </p>
              <ChevronRight
                size={18}
                className="text-gray-300 group-hover:text-blue-500 transition-colors"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
