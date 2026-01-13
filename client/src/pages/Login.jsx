import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PublicLayout from "../components/layout/PublicLayout";
import { useUI } from "../context/UIContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginDemo } = useContext(AuthContext);
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
      <div className="w-full max-w-sm">
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">CRUD de Clientes</h1>
            <p className="text-sm text-gray-600">Inicia sesión para continuar</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 w-full rounded"
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={handleDemo}
              className="bg-gray-700 hover:bg-gray-800 text-white p-2 w-full rounded"
            >
              Entrar con Demo
            </button>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
}
