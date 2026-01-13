import React from "react";

export default function PrivateLayout({ children }) {
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <header className="bg-white shadow p-4 mb-6">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
