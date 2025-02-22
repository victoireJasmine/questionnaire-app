import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom", // Assure que jsdom est utilisé
    setupFiles: ["./src/setupTests.js"],
    include: ["src/**/*.test.jsx", "src/**/*.spec.jsx"], // Permet de détecter les fichiers test
  },
})


