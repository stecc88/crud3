import axios from "axios";

function normalizeBaseUrl(raw) {
  let url = (raw || "").trim();
  if (!url) url = "https://crud3-puce.vercel.app";
  if (url.startsWith("/")) url = url.slice(1);
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  url = url.replace(/\/+$/, "");
  return url;
}

const api = axios.create({
  baseURL: normalizeBaseUrl(import.meta.env.VITE_API_URL),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
