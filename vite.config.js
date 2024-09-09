import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: "103.161.9.133",
    host: "192.168.10.6",
    port: "3001",
  },
});
