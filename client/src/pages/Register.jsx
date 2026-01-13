import React, { useState } from "react";
import PublicLayout from "../components/layout/PublicLayout";
import api from "../api/axios";
import { useUI } from "../context/UIContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useUI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/api/auth/register", { email, password });
      showToast("Registro exitoso", "success");
    } catch {
      showToast("Registro fallido", "error");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
        />
        <button disabled={loading} type="submit" className="bg-green-500 text-white p-2 w-full rounded">
          {loading ? "Registrando..." : "Register"}
        </button>
      </form>
    </PublicLayout>
  );
}
