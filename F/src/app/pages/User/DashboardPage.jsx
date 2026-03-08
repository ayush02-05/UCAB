// import React, { useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../../context/AppContext";
// import { LocationInput } from "../../components/LocationInput";
// import { MapPin, Navigation, Car, History, ShieldCheck } from "lucide-react";
// import { toast } from "sonner";
// import { useForm, Controller } from "react-hook-form";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { CabCard } from "../../components/CabCard";

// export function DashboardPage() {
//   const {
//     user,
//     pickupLocation,
//     setPickupLocation,
//     dropLocation,
//     setDropLocation,
//     panelOpen,
//     setpanelOpen,
//   } = useAppContext();
//   const cabs = [
//     {
//       id: 1,
//       driverName: "Rohit Sharma",
//       vehicleType: "Swift Dzire",
//       vehicleNumber: "MP04 AB1234",
//       rating: 4.7,
//       estimatedFare: 12.5,
//       estimatedArrival: 5,
//     },
//     {
//       id: 2,
//       driverName: "Amit Verma",
//       vehicleType: "Hyundai i20",
//       vehicleNumber: "MP04 XY5678",
//       rating: 4.5,
//       estimatedFare: 10.2,
//       estimatedArrival: 3,
//     },
//   ];

//   const navigate = useNavigate();
//   const panelRef = useRef(null);

//   const { control, handleSubmit } = useForm({
//     defaultValues: {
//       pickupLocation: pickupLocation || "",
//       dropLocation: dropLocation || "",
//     },
//   });

//   const handleFindCabs = (data) => {
//     console.log(data);

//     if (!data.pickupLocation || !data.dropLocation) {
//       toast.error("Please enter both pickup and drop locations");
//       return;
//     }

//     setPickupLocation(data.pickupLocation);
//     setDropLocation(data.dropLocation);

//     // navigate("/cabs");
//   };

//   // GSAP animation controlled by state
//   useGSAP(() => {
//     if (panelOpen) {
//       gsap.to(panelRef.current, {
//         height: window.innerWidth < 768 ? "390px" : "250px",
//         paddingTop: "24px",
//         paddingBottom: "24px",
//         duration: 0.4,
//         ease: "power2.out",
//       });
//     }
//   }, [panelOpen]);

//   return (
//     <div
//       className="relative flex-grow flex flex-col bg-cover bg-center bg-no-repeat overflow-hidden"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1730317195705-8a265a59ed1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1600')",
//       }}
//     >
//       <div className="absolute bottom-[-4%] w-full flex-grow flex flex-col md:flex-row">
//         <div className="w-full md:w-1/3 flex flex-col justify-end lg:pr-18">
//           {/* Booking Card */}
//           <div className="bg-gray-200 backdrop-blur-md rounded-2xl shadow-sm border  px-6 py-4">
//             <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
//               Welcome, {user?.name || "Guest"}
//             </h1>

//             <p className="text-gray-500 mb-8 text-sm">
//               Where are you heading today?
//             </p>

//             <form
//               onSubmit={handleSubmit(handleFindCabs)}
//               className="relative border-l-2 border-dashed border-gray-700 ml-4 mb-8 pl-6 space-y-6"
//             >
//               <div className="absolute w-4 h-4 rounded-full bg-blue-500 -left-[9px] top-10 border-2 border-white"></div>

//               <Controller
//                 name="pickupLocation"
//                 control={control}
//                 rules={{ required: true }}
//                 render={({ field }) => (
//                   <LocationInput
//                     setpanelOpen={setpanelOpen}
//                     label="Pickup Location"
//                     placeholder="Enter pickup location"
//                     value={field.value}
//                     onChange={field.onChange}
//                     iconColor="text-blue-500"
//                   />
//                 )}
//               />

//               <div className="absolute w-4 h-4 rounded-full bg-black -left-[9px] bottom-16 border-2 border-white"></div>

//               <Controller
//                 name="dropLocation"
//                 control={control}
//                 rules={{ required: true }}
//                 render={({ field }) => (
//                   <LocationInput
//                     setpanelOpen={setpanelOpen}
//                     label="Drop Location"
//                     placeholder="Enter drop location"
//                     value={field.value}
//                     onChange={field.onChange}
//                     iconColor="text-black"
//                   />
//                 )}
//               />

//               <button
//                 type="submit"
//                 className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center"
//               >
//                 <Car className="mr-2 w-5 h-5" />
//                 Find Cabs
//               </button>
//             </form>
//           </div>

//           {/* Recent Places Panel */}
//           <div
//             ref={panelRef}
//             className="bg-gray-200 h-0 overflow-hidden backdrop-blur-md rounded-2xl shadow-sm border  px-6 py-0"
//           >
//             <h3 className="font-bold text-gray-900 mb-4 flex items-center">
//               <History className="w-5 h-5 mr-2 text-gray-400" />
//               Recent Places
//             </h3>

//             <div className="max-h-100 lg:max-h-30  overflow-y-auto pr-2">
//               <ul className="space-y-3">
//                 {[
//                   {
//                     name: "City Center Mall",
//                     address: "123 Main St, Downtown",
//                   },
//                   { name: "Central Airport", address: "Terminal 1 Departures" },
//                   { name: "Tech Park", address: "Sector 4, IT Corridor" },
//                   { name: "Metro Station", address: "Line 2 Platform" },
//                   { name: "Railway Station", address: "Platform 5" },
//                   { name: "University Campus", address: "North Gate Entrance" },
//                 ].map((place, idx) => (
//                   <li
//                     key={idx}
//                     className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
//                     onClick={() => setDropLocation(place.address)}
//                   >
//                     <div className="bg-gray-100 p-2 rounded-full mr-3">
//                       <MapPin className="w-4 h-4 text-gray-600" />
//                     </div>

//                     <div>
//                       <p className="text-sm font-medium text-gray-900">
//                         {place.name}
//                       </p>

//                       <p className="text-xs text-gray-500 truncate w-48">
//                         {place.address}
//                       </p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col gap-4 p-4 w-full md:w-1/2">
//           {cabs.map((cab) => (
//             <CabCard
//               key={cab.id}
//               cab={cab}
//               onBook={(selectedCab) => {
//                 console.log("Booked:", selectedCab);
//                 toast.success(`Ride booked with ${selectedCab.driverName}`);
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useAppContext } from "../../context/AppContext";
// import { VehiclePanel } from "../../components/panels/VehiclePanel";
// import { RideStatusPanel } from "../../components/panels/RideStatusPanel";
// import { LocationPanel } from "../../components/panels/LocationPanel";

// export function DashboardPage() {
//   const { user } = useAppContext();

//   // Booking Stages: 'searching', 'selecting', 'confirmed'
//   const [bookingStage, setBookingStage] = useState("searching");
//   const [selectedCab, setSelectedCab] = useState(null);

//   return (
//     <div
//       className="relative h-screen w-full bg-cover bg-center flex items-end md:items-stretch overflow-hidden pb-20"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1730317195705-8a265a59ed1b?auto=format&fit=crop&q=80&w=1600')",
//       }}
//     >
//       {/* Sidebar Container */}
//       <div className="w-full md:w-[400px] lg:w-[450px] p-4 md:p-6 flex flex-col justify-end gap-4 z-10">
//         {/* Stage 3: Confirmed Ride (Driver Details & OTP) */}
//         {bookingStage === "confirmed" && (
//           <RideStatusPanel
//             cab={selectedCab}
//             onCancel={() => setBookingStage("searching")}
//           />
//         )}

//         {/* Stage 2: Vehicle Selection */}
//         {bookingStage === "selecting" && (
//           <VehiclePanel
//             onSelect={(cab) => {
//               setSelectedCab(cab);
//               setBookingStage("confirmed");
//             }}
//           />
//         )}

//         {/* Stage 1: Location Inputs & Suggestions */}
//         <LocationPanel
//           isActive={bookingStage === "searching"}
//           userName={user?.name}
//           onLocationsSet={() => setBookingStage("selecting")}
//         />
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { VehiclePanel } from "../../components/panels/VehiclePanel";
import { RideStatusPanel } from "../../components/panels/RideStatusPanel";
import { LocationPanel } from "../../components/panels/LocationPanel";
import { DriverPanel } from "../../components/panels/DriverPanel";

export function DashboardPage() {
  const { user } = useAppContext();
  const [bookingStage, setBookingStage] = useState("searching");
  const [selectedCab, setSelectedCab] = useState(null);

  return (
    <div
      // Changed h-screen to calc to account for the 16 (4rem) header
      className="relative h-[calc(100vh-64px)] w-full bg-cover bg-center flex items-end md:items-stretch overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1730317195705-8a265a59ed1b?auto=format&fit=crop&q=80&w=1600')",
      }}
    >
      {/* Background Overlay to make content pop */}
      <div className="absolute inset-0 bg-black/10 md:bg-transparent" />

      {/* Sidebar Container */}
      <div className="w-full md:w-[400px] lg:w-[450px] p-4 md:p-6 flex flex-col justify-end z-10 relative">
        {/* Stage 1: Location Search */}
        {bookingStage === "searching" && (
          <LocationPanel
            userName={user?.name}
            onLocationsSet={() => setBookingStage("selecting")}
          />
        )}

        {/* Stage 2: Vehicle Selection */}
        {bookingStage === "selecting" && (
          <VehiclePanel
            onBack={() => setBookingStage("searching")}
            onSelect={(cab) => {
              setSelectedCab(cab);
              setBookingStage("driver");
            }}
          />
        )}

        {/* Stage 4: Driver */}
        {bookingStage === "driver" && (
          <DriverPanel
            driver={selectedCab}
            onConfirm={() => setBookingStage("confirmed")}
            onBack={() => setBookingStage("selecting")}
          />
        )}

        {/* Stage 4: Confirmation */}
        {bookingStage === "confirmed" && (
          <RideStatusPanel
            cab={selectedCab}
            onBack={() => setBookingStage("selecting")}
            onCancel={() => {
              setSelectedCab(null);
              setBookingStage("searching");
            }}
          />
        )}
      </div>
    </div>
  );
}
