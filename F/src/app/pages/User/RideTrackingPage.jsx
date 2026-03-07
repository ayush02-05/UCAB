import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import {
  Phone,
  ShieldAlert,
  Star,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

export function RideTrackingPage() {
  const { currentRide, setCurrentRide, addRideToHistory } =
    useAppContext();
  const navigate = useNavigate();
  const [eta, setEta] = useState(
    currentRide?.cab?.estimatedArrival || 5,
  );

  useEffect(() => {
    if (!currentRide) {
      toast.error("No active ride found");
      navigate("/dashboard");
      return;
    }

    const advanceStatus = () => {
      if (currentRide.status === "searching") {
        setCurrentRide({ ...currentRide, status: "accepted" });
      } else if (currentRide.status === "accepted") {
        setCurrentRide({ ...currentRide, status: "arriving" });
        const interval = setInterval(() => {
          setEta((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setCurrentRide({
                ...currentRide,
                status: "started",
              });
              return 0;
            }
            return prev - 1;
          });
        }, 3000);
        return () => clearInterval(interval);
      } else if (currentRide.status === "started") {
        const rideDuration = setInterval(() => {
          clearInterval(rideDuration);
          setCurrentRide({
            ...currentRide,
            status: "completed",
          });
          navigate("/payment");
        }, 5000);
        return () => clearInterval(rideDuration);
      }
    };

    const timer = setTimeout(advanceStatus, 3000);
    return () => clearTimeout(timer);
  }, [currentRide?.status, navigate, setCurrentRide]);

  if (!currentRide || !currentRide.cab) return null;

  const cab = currentRide.cab;

  const getStatusText = () => {
    switch (currentRide.status) {
      case "searching":
        return "Finding your driver...";
      case "accepted":
        return "Driver is confirmed";
      case "arriving":
        return `Driver arriving in ${eta} min`;
      case "started":
        return "On the way to destination";
      case "completed":
        return "Ride completed";
      default:
        return "Loading...";
    }
  };

  const cancelRide = () => {
    toast.success("Ride cancelled successfully");
    setCurrentRide(null);
    navigate("/dashboard");
  };

  return (
    <div className="flex-grow flex flex-col md:flex-row bg-gray-50 h-[calc(100vh-64px)] overflow-hidden">
      {/* Map Area */}
      <div className="flex-grow relative w-full md:w-2/3 h-1/2 md:h-full bg-gray-200">
        <img
          src="https://images.unsplash.com/photo-1730317195705-8a265a59ed1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbWFwJTIwb3ZlcmhlYWR8ZW58MXx8fHwxNzcyODU3NDczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Map tracking"
          className="w-full h-full object-cover"
        />

        {/* Floating status badge on map */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-lg font-bold text-sm whitespace-nowrap z-10">
          {getStatusText()}
        </div>
      </div>

      {/* Ride Details Panel */}
      <div className="w-full md:w-1/3 bg-white h-1/2 md:h-full flex flex-col shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.1)] z-20 overflow-y-auto rounded-t-3xl md:rounded-none -mt-6 md:mt-0 relative">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 md:hidden"></div>

        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-extrabold text-gray-900">
              Ride Details
            </h2>
            {currentRide.status !== "started" &&
              currentRide.status !== "completed" && (
                <button
                  onClick={cancelRide}
                  className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center transition-colors"
                >
                  <XCircle className="w-4 h-4 mr-1" /> Cancel
                </button>
              )}
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4 shadow-sm border-2 border-white">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(cab.driverName)}&background=random`}
                  alt={cab.driverName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {cab.driverName}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mt-0.5">
                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                  <span className="font-semibold text-gray-800 mr-1">
                    {cab.rating}
                  </span>
                  Rating
                </div>
              </div>
            </div>

            <a
              href="tel:+1234567890"
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
            >
              <Phone className="w-5 h-5 text-green-600" />
            </a>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 mb-6">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
                  Vehicle
                </p>
                <p className="font-semibold text-gray-900">
                  {cab.vehicleType}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
                  License Plate
                </p>
                <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md font-bold text-sm tracking-widest border border-yellow-300">
                  {cab.vehicleNumber}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
                  Total Fare
                </p>
                <p className="font-bold text-gray-900 text-xl">
                  ${cab.estimatedFare.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
                  Payment
                </p>
                <p className="font-semibold text-gray-900 flex items-center justify-end">
                  Cash{" "}
                  <span className="text-blue-600 text-xs ml-2 cursor-pointer">
                    Change
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative border-l-2 border-dashed border-gray-300 ml-4 pl-6 space-y-6 mb-8 flex-grow">
            <div className="absolute w-4 h-4 rounded-full bg-blue-500 -left-[9px] top-0 border-2 border-white"></div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">
                Pickup
              </p>
              <p className="font-medium text-gray-900">
                {currentRide.pickup}
              </p>
            </div>

            <div className="absolute w-4 h-4 rounded-full bg-black -left-[9px] bottom-2 border-2 border-white"></div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">
                Drop-off
              </p>
              <p className="font-medium text-gray-900">
                {currentRide.drop}
              </p>
            </div>
          </div>

          <button className="w-full flex items-center justify-center p-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">
            <ShieldAlert className="w-5 h-5 mr-2 text-blue-600" />
            Safety Toolkit
          </button>
        </div>
      </div>
    </div>
  );
}
