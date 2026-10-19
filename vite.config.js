import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The Tailwind plugin makes Tailwind CSS v4 work without a separate config file.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});