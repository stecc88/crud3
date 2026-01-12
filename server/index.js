import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import clientRoutes from "./routes/client.routes.js";

import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const app = express();

// ✅ CORS — SIEMPRE ANTES DE RUTAS
app.use(
  cors({
    origin: [
      "http://localhost:5175",
      "https://tu-proyecto.vercel.app",
    ],
    credentials: true,
  })
);

// middlewares base
app.use(express.json());

// ---------- MongoDB (serverless-safe cache) ----------
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// conectar DB en cada request (Vercel friendly)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("❌ DB error:", err);
    res.status(500).json({ message: "Database connection failed" });
  }
});

// healthcheck
app.get("/api/health", (_, res) => {
  res.json({ status: "ok" });
});

// rutas
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);

// ---------- DEMO USER ----------
async function ensureDemoUser() {
  if (!process.env.DEMO_EMAIL || !process.env.DEMO_PASSWORD) return;

  const exists = await User.findOne({ email: process.env.DEMO_EMAIL });
  if (exists) return;

  const hash = await bcrypt.hash(process.env.DEMO_PASSWORD, 10);

  await User.create({
    email: process.env.DEMO_EMAIL,
    password: hash,
  });

  console.log("✅ Demo user created");
}

ensureDemoUser();

export default app;
