import React, { useState } from "react";
import PublicLayout from "../components/layout/PublicLayout";
import api from "../api/axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/register", { email, password });
      alert("Registered successfully");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <PublicLayout>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Register</h2>
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
        <button type="submit" className="bg-green-500 text-white p-2 w-full rounded">
          Register
        </button>
      </form>
    </PublicLayout>
  );
}
