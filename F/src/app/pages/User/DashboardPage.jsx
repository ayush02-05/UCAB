import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { LocationInput } from '../../components/LocationInput';
import { MapPin, Navigation, Car, History, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export function DashboardPage() {
  const { user, pickupLocation, setPickupLocation, dropLocation, setDropLocation } = useAppContext();
  const navigate = useNavigate();

  const handleFindCabs = () => {
    if (!pickupLocation || !dropLocation) {
      toast.error('Please enter both pickup and drop locations');
      return;
    }
    navigate('/cabs');
  };

  return (
    <div className="flex-grow bg-gray-50 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow flex flex-col md:flex-row gap-8">
        
        {/* Left Column: Booking Form */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
              Welcome, {user?.name || 'Guest'}
            </h1>
            <p className="text-gray-500 mb-8 text-sm">Where are you heading today?</p>
            
            <div className="relative border-l-2 border-dashed border-gray-300 ml-4 mb-8 pl-6 space-y-6">
              <div className="absolute w-4 h-4 rounded-full bg-blue-500 -left-[9px] top-4 border-2 border-white"></div>
              <LocationInput
                label="Pickup Location"
                placeholder="Enter pickup location"
                value={pickupLocation}
                onChange={setPickupLocation}
                iconColor="text-blue-500"
              />
              
              <div className="absolute w-4 h-4 rounded-full bg-black -left-[9px] bottom-4 border-2 border-white"></div>
              <LocationInput
                label="Drop Location"
                placeholder="Enter drop location"
                value={dropLocation}
                onChange={setDropLocation}
                iconColor="text-black"
              />
            </div>
            
            <button
              onClick={handleFindCabs}
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <Car className="mr-2 w-5 h-5" />
              Find Cabs
            </button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
             <h3 className="font-bold text-gray-900 mb-4 flex items-center">
               <History className="w-5 h-5 mr-2 text-gray-400" />
               Recent Places
             </h3>
             <ul className="space-y-4">
               {[
                 { name: 'City Center Mall', address: '123 Main St, Downtown' },
                 { name: 'Central Airport', address: 'Terminal 1 Departures' },
                 { name: 'Tech Park', address: 'Sector 4, IT Corridor' }
               ].map((place, idx) => (
                 <li 
                    key={idx} 
                    className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    onClick={() => setDropLocation(place.address)}
                 >
                   <div className="bg-gray-100 p-2 rounded-full mr-3">
                     <MapPin className="w-4 h-4 text-gray-600" />
                   </div>
                   <div>
                     <p className="text-sm font-medium text-gray-900">{place.name}</p>
                     <p className="text-xs text-gray-500 truncate w-48">{place.address}</p>
                   </div>
                 </li>
               ))}
             </ul>
          </div>
        </div>

        {/* Right Column: Interactive map placeholder */}
        <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative min-h-[400px]">
          <img 
            src="https://images.unsplash.com/photo-1730317195705-8a265a59ed1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbWFwJTIwb3ZlcmhlYWR8ZW58MXx8fHwxNzcyODU3NDczfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Map view"
            className="w-full h-full object-cover"
          />
          
          <div className="absolute top-4 left-4 right-4 md:right-auto md:w-64 bg-white/90 backdrop-blur rounded-xl p-4 shadow-lg border border-gray-100">
             <div className="flex items-start">
               <ShieldCheck className="w-8 h-8 text-green-500 mr-3 flex-shrink-0" />
               <div>
                 <h4 className="font-bold text-gray-900 text-sm">Safety First</h4>
                 <p className="text-xs text-gray-600 mt-1">All rides are tracked and drivers are verified for your security.</p>
               </div>
             </div>
          </div>

          {pickupLocation && dropLocation && (
             <div className="absolute bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-96 bg-black text-white rounded-xl p-4 shadow-2xl flex items-center justify-between">
               <div className="flex items-center truncate">
                 <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 flex-shrink-0"></div>
                 <p className="text-sm truncate w-24 mr-2">{pickupLocation}</p>
                 <Navigation className="w-3 h-3 text-gray-400 mx-2 flex-shrink-0" />
                 <div className="w-2 h-2 rounded-full bg-white mr-2 flex-shrink-0"></div>
                 <p className="text-sm truncate w-24">{dropLocation}</p>
               </div>
               <button onClick={handleFindCabs} className="text-sm font-bold text-blue-400 hover:text-blue-300 whitespace-nowrap">
                 Go →
               </button>
             </div>
          )}
        </div>

      </div>
    </div>
  );
}
