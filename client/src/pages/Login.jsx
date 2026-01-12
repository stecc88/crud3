import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import PublicLayout from "../components/layout/PublicLayout";


export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    await login(form.email, form.password);
    setLoading(false);
  }

  async function handleDemo() {
    setLoading(true);
    await login("demo@demo.com", "demo1234");
    setLoading(false);
  }

  return (
    <PublicLayout>
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-96 space-y-4"
      >
        <h2 className="text-xl font-semibold">Login</h2>

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

        <button
          disabled={loading}
          className="bg-black text-white w-full p-2 rounded"
        >
          Entrar
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={handleDemo}
          className="border w-full p-2 rounded hover:bg-gray-100"
        >
          Entrar como demo
        </button>
      </form>
    </PublicLayout>
  );
}
