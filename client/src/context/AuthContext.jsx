import { createContext, useContext, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading] = useState(false);

  const isAuthenticated = !!token;

  async function login(email, password) {
    const res = await api.post("/api/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
  }

  async function register(email, password) {
    await api.post("/api/auth/register", { email, password });
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{ token, login, register, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
