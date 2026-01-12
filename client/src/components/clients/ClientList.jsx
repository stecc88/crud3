import { useClients } from "../../context/ClientContext";

export default function ClientList() {
  const { clients, loading, deleteClient } = useClients();

  if (loading) {
    return (
      <div className="bg-white p-4 rounded shadow">
        Cargando clientes...
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="bg-white p-4 rounded shadow">
        No hay clientes todavía
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold text-lg mb-4">Clientes</h2>

      <ul className="space-y-3">
        {clients.map((client) => (
          <li
            key={client._id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{client.name}</p>
              <p className="text-sm text-gray-600">{client.email}</p>
              <p className="text-sm text-gray-600">{client.phone}</p>
            </div>

            <button
              onClick={() => deleteClient(client._id)}
              className="text-sm text-red-600 hover:underline"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
