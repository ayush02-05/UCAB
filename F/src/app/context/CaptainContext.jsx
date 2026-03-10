import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const CaptainContext = createContext();

export function CaptainProvider({ children }) {
  const [captain, setCaptain] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const [profile, setprofile] = useState(null);

  const login = (captainData) => setCaptain(captainData);
  const captainlogout = () => {
    setCaptain(null);
    setCurrentRide(null);
  };

  // useEffect(() => {
  //   const handleProfile = async () => {
  //     try {
  //       const p = await axios.get("http://localhost:4000/api/captain/profile", {
  //         withCredentials: true,
  //       });
  //       setCaptain(p.data.captain);

  //       // setprofile(p.data.captain);
  //     } catch (err) {
  //       console.log("Profile error:", err.response?.data);
  //     }
  //   };

  //   handleProfile();
  // }, []);

  const value = {
    captain,
    setCaptain,
    loading,
    setloading,
    error,
    seterror,
    login,
    captainlogout,
    profile,
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
