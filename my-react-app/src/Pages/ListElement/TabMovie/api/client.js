import axios from "axios";


const BASE_URL = "https://movienew.cybersoft.edu.vn/api";
const TOKEN = import.meta.env.VITE_CYBERSOFT_TOKEN || 'PASTE_YOUR_TOKEN_HERE';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(TOKEN ? { TokenCybersoft: TOKEN } : {}),
  },
});

console.log("[client] base:", BASE_URL, "Token present:", !!TOKEN);

