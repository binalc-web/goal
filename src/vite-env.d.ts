/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Asset base when the app is served under a subpath (must match vite.config `base`). */
  readonly VITE_BASE_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
