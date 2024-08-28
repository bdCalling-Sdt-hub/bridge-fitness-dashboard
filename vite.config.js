import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: "134.209.209.57",
    host: "192.168.10.6",
    port: "3001",
  },
});
