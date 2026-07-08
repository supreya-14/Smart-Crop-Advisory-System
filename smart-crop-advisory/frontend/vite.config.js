import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration - keeps things simple with the React plugin
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
