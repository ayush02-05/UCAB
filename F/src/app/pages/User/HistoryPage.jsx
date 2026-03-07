import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { RideCard } from '../../components/RideCard';
import { History, ArrowLeft, Frown } from 'lucide-react';

export function HistoryPage() {
  const { rideHistory, user } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="flex-grow bg-gray-50 flex flex-col py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full flex-grow flex flex-col">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/dashboard')}
              className="mr-4 p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <History className="w-6 h-6 mr-2 text-blue-500" />
              Ride History
            </h1>
          </div>
          
          <div className="text-sm text-gray-500 font-medium">
            {user?.name}'s Account
          </div>
        </div>

        {rideHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow space-y-4 py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Frown className="w-16 h-16 text-gray-300" />
            <h2 className="text-xl font-bold text-gray-700">No rides yet</h2>
            <p className="text-gray-500 text-sm text-center max-w-sm">
              You haven't taken any rides with UCab. Book your first ride today!
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="mt-6 bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full transition-colors"
            >
              Book a Ride
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {rideHistory.map((ride) => (
              <RideCard 
                key={ride.id} 
                ride={ride} 
                onClick={() => {
                  console.log('View ride details', ride.id);
                }} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
