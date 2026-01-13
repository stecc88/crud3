import React, { useState, useContext } from "react";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";

export default function ClientForm({ fetchClients }) {
  const [name, setName] = useState("");
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { showToast } = useUI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post(
        "/api/clients",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName("");
      fetchClients();
      showToast("Cliente creado", "success");
    } catch {
      showToast("Error al crear cliente", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Client Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <button disabled={loading} type="submit" className="bg-blue-500 text-white p-2 rounded">
        {loading ? "Agregando..." : "Add"}
      </button>
    </form>
  );
}
