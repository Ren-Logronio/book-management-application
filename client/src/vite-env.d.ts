/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: "http://localhost:5000"
    // more env variables...
  }
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}