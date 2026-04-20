import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function normalizeBasePath(raw: string | undefined): string {
  if (!raw || raw === "/") return "/";
  return raw.endsWith("/") ? raw : `${raw}/`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: normalizeBasePath(env.VITE_BASE_PATH),
    plugins: [react()],
  };
});
