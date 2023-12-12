// vite.config.ts
import { defineConfig } from "file:///Z:/book-management-application/client/node_modules/vite/dist/node/index.js";
import react from "file:///Z:/book-management-application/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  define: {
    __API: JSON.stringify("http://localhost:5000/api")
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000"
    }
  }
});
export {
  vite_config_default as default
};