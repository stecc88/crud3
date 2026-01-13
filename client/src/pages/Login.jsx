import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PublicLayout from "../components/layout/PublicLayout";
import { useUI } from "../context/UIContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginDemo } = useContext(AuthContext); // ✅ usar loginDemo
  const navigate = useNavigate();
  const { showToast } = useUI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      showToast("Bienvenido", "success");
      navigate("/clients");
    } catch (err) {
      showToast("Login fallido: " + err.message, "error");
    }
  };

  const handleDemo = async () => {
    try {
      await loginDemo(); // ✅ ahora usamos la función del contexto
      showToast("Ingreso demo exitoso", "success");
      navigate("/clients");
    } catch (err) {
      showToast("Ingreso demo fallido: " + err.message, "error");
    }
  };

  return (
    <PublicLayout>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Login</h2>
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
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded mb-2"
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleDemo}
          className="bg-gray-500 text-white p-2 w-full rounded"
        >
          Demo Login
        </button>
      </form>
    </PublicLayout>
  );
}
