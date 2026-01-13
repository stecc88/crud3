import { createContext, useContext, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Token almacenado en localStorage
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!token;

  // 🔹 Login normal
  async function login(email, password) {
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", { email, password });

      // Guardar token en localStorage y estado
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);

      return res.data;
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Login demo
  async function loginDemo() {
    const demoEmail = import.meta.env.VITE_DEMO_EMAIL || "demo@example.com";
    const demoPass = import.meta.env.VITE_DEMO_PASSWORD || "123456";
    return login(demoEmail, demoPass);
  }

  // 🔹 Register
  async function register(email, password) {
    setLoading(true);
    try {
      await api.post("/api/auth/register", { email, password });
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Logout
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        loginDemo,
        register,
        logout,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar AuthContext
export const useAuth = () => useContext(AuthContext);
