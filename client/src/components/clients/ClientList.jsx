import React, { useContext, useState } from "react";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";

export default function ClientList({ clients, fetchClients }) {
  const { token } = useContext(AuthContext);
  const { showToast } = useUI();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [confirmId, setConfirmId] = useState(null);

  const startEdit = (client) => {
    setEditingId(client._id);
    setForm({ name: client.name || "", email: client.email || "", phone: client.phone || "" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", email: "", phone: "" });
  };

  const saveEdit = async (id) => {
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      };
      if (!payload.name || !payload.email || !payload.phone) {
        showToast("Completa todos los campos", "error");
        return;
      }
      await api.put(`/api/clients/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("Cliente actualizado", "success");
      setEditingId(null);
      fetchClients && fetchClients();
    } catch {
      showToast("Error al actualizar", "error");
    }
  };

  const removeClient = async (id) => {
    try {
      await api.delete(`/api/clients/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("Cliente eliminado", "success");
      fetchClients && fetchClients();
    } catch {
      showToast("Error al eliminar", "error");
    }
  };

  return (
    <div className="mt-6 bg-white rounded shadow overflow-hidden relative">
      <div className="px-4 py-3 border-b">
        <h2 className="text-lg font-semibold">Clientes</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Nombre</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Teléfono</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {clients.map((client) => {
              const isEditing = editingId === client._id;
              return (
                <tr key={client._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-900">
                    {isEditing ? (
                      <input
                        className="border p-2 rounded w-full"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      />
                    ) : (
                      client.name
                    )}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {isEditing ? (
                      <input
                        className="border p-2 rounded w-full"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      />
                    ) : (
                      client.email
                    )}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {isEditing ? (
                      <input
                        className="border p-2 rounded w-full"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      />
                    ) : (
                      client.phone
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                          onClick={() => saveEdit(client._id)}
                        >
                          Guardar
                        </button>
                        <button
                          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                          onClick={cancelEdit}
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                          onClick={() => startEdit(client)}
                        >
                          Editar
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                          onClick={() => setConfirmId(client._id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {confirmId && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded shadow p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-2">Confirmar eliminación</h3>
            <p className="text-sm text-gray-700 mb-4">¿Seguro que querés eliminar este cliente?</p>
            <div className="flex gap-2 justify-end">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded"
                onClick={() => setConfirmId(null)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
                onClick={async () => {
                  await removeClient(confirmId);
                  setConfirmId(null);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
