import { useSyncExternalStore } from "react";

export type AppView = "home" | "messages";

function parseHash(): AppView {
  return window.location.hash.replace(/^#/, "") === "messages" ? "messages" : "home";
}

function subscribe(cb: () => void) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}

export function useHashView(): AppView {
  return useSyncExternalStore(subscribe, parseHash, () => "home");
}
