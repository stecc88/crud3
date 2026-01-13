import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PublicLayout from "../components/layout/PublicLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Logged in!");
    } catch {
      alert("Login failed");
    }
  };

  const handleDemo = async () => {
    try {
      const demoEmail = import.meta.env.VITE_DEMO_EMAIL || "demo@demo.com";
      const demoPass = import.meta.env.VITE_DEMO_PASSWORD || "demo1234";
      await login(demoEmail, demoPass);
      alert("Demo login success");
    } catch {
      alert("Demo login failed");
    }
  };

  return (
    <PublicLayout>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-2 w-full rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded mb-2">
          Login
        </button>
        <button type="button" onClick={handleDemo} className="bg-gray-500 text-white p-2 w-full rounded">
          Demo Login
        </button>
      </form>
    </PublicLayout>
  );
}
