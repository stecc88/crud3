import React, { useState, useEffect, useContext, useCallback } from "react";
import ClientForm from "../components/clients/ClientForm";
import ClientList from "../components/clients/ClientList";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import PrivateLayout from "../components/layout/PrivateLayout";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const { token } = useContext(AuthContext);

  const fetchClients = useCallback(async () => {
    try {
      const res = await api.get("/api/clients", { headers: { Authorization: `Bearer ${token}` } });
      setClients(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return (
    <PrivateLayout>
      <ClientForm fetchClients={fetchClients} />
      <ClientList clients={clients} />
    </PrivateLayout>
  );
}
