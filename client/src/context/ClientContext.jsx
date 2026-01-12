import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const ClientContext = createContext(null);

export function ClientProvider({ children }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadClients() {
    const res = await api.get("/api/clients");
    setClients(res.data);
    setLoading(false);
  }

  async function createClient(data) {
    const res = await api.post("/api/clients", data);
    setClients((prev) => [res.data, ...prev]);
  }

  async function deleteClient(id) {
    await api.delete(`/api/clients/${id}`);
    setClients((prev) => prev.filter((c) => c._id !== id));
  }

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <ClientContext.Provider
      value={{
        clients,
        loading,
        createClient,
        deleteClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClients must be used inside ClientProvider");
  }
  return context;
}
