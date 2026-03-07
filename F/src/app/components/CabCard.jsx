import React from 'react';
import { User, Star, Clock } from 'lucide-react';

export function CabCard({ cab, onBook }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 relative overflow-hidden">
          <img 
             src={`https://ui-avatars.com/api/?name=${encodeURIComponent(cab.driverName)}&background=random`} 
             alt={cab.driverName} 
             className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            {cab.vehicleType}
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600 font-medium">
              {cab.vehicleNumber}
            </span>
          </h3>
          <div className="text-sm text-gray-500 flex items-center mt-1">
            <User className="w-4 h-4 mr-1" />
            {cab.driverName}
            <span className="mx-2 flex items-center text-yellow-500 font-semibold">
              <Star className="w-3 h-3 ml-1 fill-current" />
              {cab.rating}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-row sm:flex-col justify-between items-end w-full sm:w-auto mt-2 sm:mt-0 gap-2 sm:gap-1">
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 flex items-center justify-end">
             ${cab.estimatedFare.toFixed(2)}
          </p>
          <p className="text-xs text-green-600 font-medium flex items-center justify-end mt-1">
            <Clock className="w-3 h-3 mr-1" />
            {cab.estimatedArrival} mins away
          </p>
        </div>
        <button
          onClick={() => onBook(cab)}
          className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-lg transition-colors whitespace-nowrap"
        >
          Book Ride
        </button>
      </div>
    </div>
  );
}
