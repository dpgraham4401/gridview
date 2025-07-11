import tailwindcss from "@tailwindcss/vite";
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tsconfigPaths(),
        react(),
        tailwindcss()
    ],
    server: {
        port: 3000,
    }
})
