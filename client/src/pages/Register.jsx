import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import PublicLayout from "../components/layout/PublicLayout";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await register(form.email, form.password);
    navigate("/");
  }

  return (
    <PublicLayout>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96 space-y-4"
      >
        <h2 className="text-xl font-semibold">Registro</h2>

        <input
          placeholder="Email"
          className="border p-2 w-full"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-black text-white w-full p-2 rounded">
          Crear cuenta
        </button>
      </form>
    </PublicLayout>
  );
}
