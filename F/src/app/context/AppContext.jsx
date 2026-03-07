import React, { createContext, useState, useContext } from "react";

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");

  const [currentRide, setCurrentRide] = useState(null);
  const [rideHistory, setRideHistory] = useState([
    {
      id: "R123",
      pickup: "123 Main St, Downtown",
      drop: "Airport Terminal 1",
      cab: {
        id: "C1",
        driverName: "John Doe",
        vehicleType: "Sedan",
        vehicleNumber: "ABC 1234",
        estimatedFare: 45,
        estimatedArrival: 5,
        rating: 4.8,
      },
      status: "completed",
      fare: 45,
      date: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "R124",
      pickup: "City Mall",
      drop: "Tech Park",
      cab: {
        id: "C2",
        driverName: "Sarah Smith",
        vehicleType: "SUV",
        vehicleNumber: "XYZ 9876",
        estimatedFare: 30,
        estimatedArrival: 3,
        rating: 4.9,
      },
      status: "completed",
      fare: 30,
      date: new Date(Date.now() - 172800000).toISOString(),
    },
  ]);

  const login = (userData) => setUser(userData);
  const logout = () => {
    setUser(null);
    setPickupLocation("");
    setDropLocation("");
    setCurrentRide(null);
  };

  const addRideToHistory = (ride) => {
    setRideHistory([ride, ...rideHistory]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        pickupLocation,
        setPickupLocation,
        dropLocation,
        setDropLocation,
        currentRide,
        setCurrentRide,
        rideHistory,
        addRideToHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
