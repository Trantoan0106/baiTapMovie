import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig , loadEnv } from "vite"



export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') 


// https://vite.dev/config/
return defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
   proxy: {
    '/cyber': {
    target: 'https://movienew.cybersoft.edu.vn',
    changeOrigin: true,
    secure:true,
rewrite: p => p.replace(/^\/cyber/, ''),
headers: {
   TokenCybersoft: env.VITE_CYBERSOFT_TOKEN,
}

    }




   }



  }
})
}