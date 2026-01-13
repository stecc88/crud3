import React, { useState } from "react";
import PublicLayout from "../components/layout/PublicLayout";
import api from "../api/axios";
import { useUI } from "../context/UIContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useUI();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function validate() {
    let ok = true;
    setEmailError("");
    setPasswordError("");
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      setEmailError("Email inválido");
      ok = false;
    }
    if (!password || password.length < 6) {
      setPasswordError("Min. 6 caracteres");
      ok = false;
    }
    return ok;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validate()) {
        showToast("Completa correctamente los campos", "error");
        return;
      }
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
          className={`border p-2 mb-1 w-full rounded ${emailError ? "border-red-500" : ""}`}
        />
        {emailError && <p className="text-xs text-red-600 mb-2">{emailError}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`border p-2 mb-1 w-full rounded ${passwordError ? "border-red-500" : ""}`}
        />
        {passwordError && <p className="text-xs text-red-600 mb-2">{passwordError}</p>}
        <button disabled={loading} type="submit" className="bg-green-500 text-white p-2 w-full rounded">
          {loading ? "Registrando..." : "Register"}
        </button>
      </form>
    </PublicLayout>
  );
}
