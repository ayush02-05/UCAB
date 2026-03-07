import React, { createContext, useContext, useState } from "react";

export const CaptainContext = createContext();

export function CaptainProvider({ children }) {
  const [Captain, setCaptain] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  const login = (captainData) => setCaptain(captainData);
  const logout = () => {
    setCaptain(null);
    setPickupLocation("");
    setDropLocation("");
    setCurrentRide(null);
  };

  const value = {
    Captain,
    setCaptain,
    loading,
    setloading,
    error,
    seterror,
    login,
    logout,
  };
  return (
    <CaptainContext.Provider value={value}>{children}</CaptainContext.Provider>
  );
}

export function useCaptain() {
  const context = useContext(CaptainContext);
  if (!context) {
    throw new Error("useCaptain must be used within CaptainProvider");
  }
  return context;
}
