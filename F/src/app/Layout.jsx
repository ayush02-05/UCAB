import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
