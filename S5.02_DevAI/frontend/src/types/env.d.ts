/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_PORT: string
  readonly VITE_JWT_SECRET_KEY: string
  readonly VITE_JWT_EXPIRATION: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}