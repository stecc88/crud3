import React, { useState, useContext } from "react";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

export default function ClientForm({ fetchClients }) {
  const [name, setName] = useState("");
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        "/api/clients",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName("");
      fetchClients();
    } catch (err) {
      console.error(err);
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
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add
      </button>
    </form>
  );
}
