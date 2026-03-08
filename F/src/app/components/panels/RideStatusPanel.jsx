// import React from "react";
// import { MessageSquare, Phone, X, ShieldCheck } from "lucide-react";

// export function RideStatusPanel({ cab, onCancel }) {
// return (
//     <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 animate-in slide-in-from-bottom duration-500">
//       <div className="flex justify-between items-start mb-6">
//         <div>
//           <h2 className="text-xl font-bold text-gray-900">
//             Your Ride is Arriving
//           </h2>
//           <p className="text-blue-600 font-medium text-sm">
//             Driver is 3 mins away
//           </p>
//         </div>
//         <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md uppercase">
//           Live
//         </span>
//       </div>

//       {/* Driver Card */}
//       <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between mb-6">
//         <div className="flex items-center gap-3">
//           <img
//             src={`https://ui-avatars.com/api/?name=${cab?.driverName}`}
//             className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
//             alt="driver"
//           />
//           <div>
//             <p className="font-bold text-gray-900">
//               {cab?.driverName || "John Doe"}
//             </p>
//             <p className="text-xs text-yellow-500 font-bold">★ 4.8</p>
//           </div>
//         </div>
//         <div className="text-right">
//           <p className="font-bold text-gray-900">
//             {cab?.vehicleType || "Toyota Camry"}
//           </p>
//           <p className="text-xs text-gray-500 uppercase tracking-widest">
//             {cab?.vehicleNumber || "ABC 1234"}
//           </p>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-3 mb-6">
//         <button className="flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
//           <MessageSquare size={18} /> Message
//         </button>
//         <button className="flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
//           <Phone size={18} /> Call
//         </button>
//       </div>

//       {/* OTP Section */}
//       <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center mb-6">
//         <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">
//           Ride Start OTP
//         </p>
//         <div className="text-4xl font-black text-blue-900 tracking-[0.5em] ml-[0.5em]">
//           5821
//         </div>
//         <p className="text-[10px] text-blue-500 mt-3 italic text-balance">
//           Share this code with your driver to start the ride
//         </p>
//       </div>

//       <button
//         onClick={onCancel}
//         className="w-full text-red-500 font-bold text-sm py-2 hover:bg-red-50 rounded-xl flex items-center justify-center gap-2"
//       >
//         <X size={16} /> Cancel Ride
//       </button>
//     </div>
//   );
// }

import React from "react";
import { MessageSquare, Phone, X, ArrowLeft } from "lucide-react";

export function RideStatusPanel({ cab, onCancel, onBack }) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Your Ride is Arriving
            </h2>
            <p className="text-blue-600 font-medium text-sm">
              Driver is 3 mins away
            </p>
          </div>
        </div>
        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md">
          LIVE
        </span>
      </div>

      {/* Driver Card, Action Buttons, and OTP Section remain same as previous code */}
      {/* ... */}
      {/* Driver Card */}
      <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${cab?.driverName}`}
            className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
            alt="driver"
          />
          <div>
            <p className="font-bold text-gray-900">
              {cab?.driverName || "John Doe"}
            </p>
            <p className="text-xs text-yellow-500 font-bold">★ 4.8</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-900">
            {cab?.vehicleType || "Toyota Camry"}
          </p>
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            {cab?.vehicleNumber || "ABC 1234"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button className="flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
          <MessageSquare size={18} /> Message
        </button>
        <button className="flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
          <Phone size={18} /> Call
        </button>
      </div>

      {/* OTP Section */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center mb-6">
        <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">
          Ride Start OTP
        </p>
        <div className="text-4xl font-black text-blue-900 tracking-[0.5em] ml-[0.5em]">
          5821
        </div>
        <p className="text-[10px] text-blue-500 mt-3 italic text-balance">
          Share this code with your driver to start the ride
        </p>
      </div>

      <button
        onClick={onCancel}
        className="w-full text-red-500 font-bold text-sm py-4 hover:bg-red-50 rounded-xl flex items-center justify-center gap-2 mt-2"
      >
        <X size={16} /> Cancel Ride
      </button>
    </div>
  );
}
