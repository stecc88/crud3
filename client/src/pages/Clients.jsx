import React, { useState, useEffect, useContext, useCallback } from "react";
import ClientForm from "../components/clients/ClientForm";
import ClientList from "../components/clients/ClientList";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import PrivateLayout from "../components/layout/PrivateLayout";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { token } = useContext(AuthContext);

  const fetchClients = useCallback(async () => {
    try {
      const res = await api.get("/api/clients", { headers: { Authorization: `Bearer ${token}` } });
      setClients(res.data);
      setPage(1);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const filtered = clients.filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      (c.name || "").toLowerCase().includes(q) ||
      (c.email || "").toLowerCase().includes(q) ||
      (c.phone || "").toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paged = filtered.slice(start, end);

  return (
    <PrivateLayout>
      <div className="mb-4 flex items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, email o teléfono"
          className="border p-2 rounded w-full md:w-80"
        />
      </div>
      <ClientForm fetchClients={fetchClients} />
      <ClientList clients={paged} fetchClients={fetchClients} />
      <div className="mt-4 flex flex-col md:flex-row items-center gap-3 justify-between bg-white p-3 rounded shadow">
        <div className="text-sm text-gray-700">
          Página {currentPage} de {totalPages} · Mostrando {paged.length} de {filtered.length}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Anterior
          </button>
          <button
            className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Siguiente
          </button>
          <select
            className="border rounded p-2"
            value={pageSize}
            onChange={(e) => {
              const size = Number(e.target.value);
              setPageSize(size);
              setPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </PrivateLayout>
  );
}
