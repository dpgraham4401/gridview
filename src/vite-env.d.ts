/// <reference types="vite/client" />

interface ViteTypeOptions {
  // disallow unknown environment variable keys.
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
    readonly VITE_MAPTILER_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}