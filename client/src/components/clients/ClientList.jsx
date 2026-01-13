import React from "react";

export default function ClientList({ clients }) {
  return (
    <ul className="mt-4">
      {clients.map((client) => (
        <li key={client._id} className="border p-2 mb-2 rounded">
          {client.name}
        </li>
      ))}
    </ul>
  );
}
