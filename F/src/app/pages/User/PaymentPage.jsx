import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { CreditCard, Wallet, Landmark, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export function PaymentPage() {
  const { currentRide, setCurrentRide, addRideToHistory } = useAppContext();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // If we try to access payment page without a ride, just redirect
  if (!currentRide) {
    navigate('/dashboard');
    return null;
  }

  const handlePayment = () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      
      // Complete ride and add to history
      const completedRide = { ...currentRide, status: 'completed' };
      addRideToHistory(completedRide);
      
      // Toast and cleanup
      toast.success('Payment successful!');
      setTimeout(() => {
        setCurrentRide(null);
        navigate('/dashboard');
      }, 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex-grow flex items-center justify-center bg-gray-50 p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center space-y-6 border border-gray-100"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', damping: 15 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-500" />
          </motion.div>
          <h2 className="text-3xl font-extrabold text-gray-900">Payment Successful!</h2>
          <p className="text-gray-500">
            Thank you for riding with UCab. Your receipt has been sent to your email.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mt-6 border border-gray-100">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Total Paid</p>
            <p className="text-2xl font-bold text-gray-900">${currentRide.fare.toFixed(2)}</p>
          </div>
          <p className="text-sm text-blue-600 font-medium animate-pulse mt-4">
            Redirecting to dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  const paymentMethods = [
    { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard className="w-5 h-5 text-blue-600" /> },
    { id: 'wallet', name: 'Digital Wallet', icon: <Wallet className="w-5 h-5 text-purple-600" /> },
    { id: 'netbanking', name: 'Net Banking', icon: <Landmark className="w-5 h-5 text-green-600" /> },
  ];

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Summary</h2>
          
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
            <span className="text-gray-600 font-medium text-sm">Ride Fare</span>
            <span className="font-semibold text-gray-900">${(currentRide.fare - 2).toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
            <span className="text-gray-600 font-medium text-sm">Taxes & Fees</span>
            <span className="font-semibold text-gray-900">$2.00</span>
          </div>
          <div className="flex items-center justify-between mt-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <span className="font-bold text-gray-900 text-lg">Total Amount</span>
            <span className="font-extrabold text-black text-2xl">${currentRide.fare.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Select Payment Method</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <label 
                key={method.id} 
                className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                  selectedMethod === method.id 
                    ? 'border-black bg-gray-50 shadow-sm ring-1 ring-black' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="h-4 w-4 text-black focus:ring-black border-gray-300"
                  />
                  <div className="ml-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                    {method.icon}
                  </div>
                  <span className="ml-3 font-semibold text-gray-900">{method.name}</span>
                </div>
              </label>
            ))}
          </div>
          
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full mt-6 flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white transition-all ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
            }`}
          >
            {loading ? 'Processing...' : `Pay $${currentRide.fare.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
