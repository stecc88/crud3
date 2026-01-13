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

/* =========================
   CORS (SIEMPRE PRIMERO)
========================= */
app.use(
  cors({
    origin: [
      "http://localhost:5175",               // Frontend local
      "https://crud3-x65b.vercel.app",      // Frontend deploy
    ],
    credentials: true,
  })
);

/* =========================
   Middleware base
========================= */
app.use(express.json());

/* =========================
   MongoDB (Vercel safe cache)
========================= */
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

// Conectar DB en cada request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("❌ DB error:", err);
    res.status(500).json({ message: "Database connection failed" });
  }
});

/* =========================
   Root y healthcheck
========================= */
app.get("/", (_, res) => res.send("API running"));
app.get("/api/health", (_, res) => res.json({ status: "ok" }));

/* =========================
   Rutas API
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);

/* =========================
   DEMO USER
========================= */
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
