import React, { useState, useContext } from "react";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";

export default function ClientForm({ fetchClients }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { showToast } = useUI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      };
      if (!payload.name || !payload.email || !payload.phone) {
        showToast("Completa todos los campos", "error");
        return;
      }
      await api.post("/api/clients", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setName("");
      setEmail("");
      setPhone("");
      fetchClients();
      showToast("Cliente creado", "success");
    } catch {
      showToast("Error al crear cliente", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow flex flex-col md:flex-row gap-3 md:items-end">
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          placeholder="Nombre del cliente"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 border p-2 rounded w-full"
        />
      </div>
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          placeholder="email@dominio.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 border p-2 rounded w-full"
        />
      </div>
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700">Teléfono</label>
        <input
          type="text"
          placeholder="+54 11 1234-5678"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 border p-2 rounded w-full"
        />
      </div>
      <button
        disabled={loading}
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full md:w-auto"
      >
        {loading ? "Agregando..." : "Agregar"}
      </button>
    </form>
  );
}
