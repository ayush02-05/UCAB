import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

export function RideCard({ ride, onClick }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Completed</span>;
      case 'searching':
      case 'accepted':
      case 'arriving':
      case 'started':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">In Progress</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">{status}</span>;
    }
  };

  const formattedDate = new Date(ride.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3 border-b border-gray-50 pb-3">
        <div className="flex items-center space-x-2 text-gray-500 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        <div>{getStatusBadge(ride.status)}</div>
      </div>
      
      <div className="flex">
        <div className="flex flex-col items-center mr-3 mt-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
          <div className="w-0.5 h-10 bg-gray-200 my-1" />
          <div className="w-2 h-2 bg-black rounded-full" />
        </div>
        <div className="flex flex-col justify-between flex-grow">
          <div className="mb-4">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">Pickup</p>
            <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{ride.pickup}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">Drop</p>
            <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{ride.drop}</p>
          </div>
        </div>
        
        <div className="ml-4 flex flex-col justify-between items-end border-l border-gray-100 pl-4">
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">Fare</p>
            <p className="text-lg font-bold text-gray-900">${ride.fare.toFixed(2)}</p>
          </div>
          
          {ride.cab && (
            <div className="text-right mt-2">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">Driver</p>
              <p className="text-sm font-medium text-gray-900">{ride.cab.driverName}</p>
            </div>
          )}
          
          {onClick && (
            <ChevronRight className="w-5 h-5 text-gray-400 mt-2" />
          )}
        </div>
      </div>
    </div>
  );
}
