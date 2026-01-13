import React from "react";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {children}
    </div>
  );
}
