import React from "react";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      {children}
    </div>
  );
}
