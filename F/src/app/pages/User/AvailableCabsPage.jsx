import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { CabCard } from '../../components/CabCard';
import { ArrowLeft, Loader2, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';

const mockCabs = [
  { id: 'C101', driverName: 'Michael Scott', vehicleType: 'Hatchback', vehicleNumber: 'DL 01 AA 1111', estimatedFare: 15, estimatedArrival: 3, rating: 4.8 },
  { id: 'C102', driverName: 'Dwight Schrute', vehicleType: 'Sedan', vehicleNumber: 'KA 03 BB 2222', estimatedFare: 20, estimatedArrival: 5, rating: 4.9 },
  { id: 'C103', driverName: 'Jim Halpert', vehicleType: 'SUV', vehicleNumber: 'MH 12 CC 3333', estimatedFare: 35, estimatedArrival: 8, rating: 4.7 },
  { id: 'C104', driverName: 'Pam Beesly', vehicleType: 'Luxury', vehicleNumber: 'TN 07 DD 4444', estimatedFare: 60, estimatedArrival: 12, rating: 5.0 },
];

export function AvailableCabsPage() {
  const { pickupLocation, dropLocation, setCurrentRide } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pickupLocation || !dropLocation) {
      toast.error('Session expired. Please enter locations again.');
      navigate('/dashboard');
    }

    // Simulate finding cabs
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pickupLocation, dropLocation, navigate]);

  const handleBook = (cab) => {
    setCurrentRide({
      id: `RDE-${Math.floor(Math.random() * 10000)}`,
      pickup: pickupLocation,
      drop: dropLocation,
      cab,
      status: 'searching',
      fare: cab.estimatedFare,
      date: new Date().toISOString(),
    });
    
    navigate('/ride-tracking');
  };

  return (
    <div className="flex-grow bg-gray-50 flex flex-col py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full flex-grow flex flex-col">
        <div className="mb-6 flex items-center">
          <button 
            onClick={() => navigate('/dashboard')}
            className="mr-4 p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Available Rides</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-3 w-5/12">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div className="truncate text-sm font-medium text-gray-900">{pickupLocation}</div>
          </div>
          
          <div className="flex-1 px-4 flex items-center justify-center text-gray-400 text-xs">
            <div className="w-full border-t border-dashed border-gray-300"></div>
            <ArrowLeft className="w-4 h-4 mx-2 rotate-180 flex-shrink-0" />
            <div className="w-full border-t border-dashed border-gray-300"></div>
          </div>

          <div className="flex items-center space-x-3 w-5/12 justify-end">
            <div className="truncate text-sm font-medium text-gray-900 text-right">{dropLocation}</div>
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center flex-grow space-y-4 py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Loader2 className="w-12 h-12 text-blue-600" />
            </motion.div>
            <h2 className="text-xl font-bold text-gray-700">Finding drivers nearby...</h2>
            <p className="text-gray-500 text-sm text-center max-w-sm">Please wait while we locate the best options for your route.</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 px-1">Choose a ride, or swipe up for more</h3>
            {mockCabs.map((cab, index) => (
              <motion.div
                key={cab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CabCard cab={cab} onBook={handleBook} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
