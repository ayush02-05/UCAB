import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => {
    setUser(null);
    setCurrentRide(null);
  };

  const value = {
    user,
    setUser,
    loading,
    setloading,
    error,
    seterror,
    login,
    logout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
