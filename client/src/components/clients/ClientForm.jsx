import { useState } from "react";
import { useClients } from "../../context/ClientContext";

export default function ClientForm() {
  const { createClient } = useClients();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await createClient(form);
    setForm({ name: "", email: "", phone: "" });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-3"
    >
      <h2 className="font-semibold text-lg">Nuevo cliente</h2>

      <input
        placeholder="Nombre"
        className="border p-2 w-full"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        className="border p-2 w-full"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Teléfono"
        className="border p-2 w-full"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <button className="bg-black text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  );
}
