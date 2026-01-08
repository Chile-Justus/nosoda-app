import { Workbox } from "workbox-window";

export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const wb = new Workbox("/service-worker.js");
      wb.register();
    });
  }
}
