import { useAuth } from "../../context/AuthContext";

export default function PrivateLayout({ children }) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="font-semibold text-lg">Client Manager</h1>
          <button
            onClick={logout}
            className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
