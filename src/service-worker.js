/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();

// This will be replaced by the build process
precacheAndRoute(self.__WB_MANIFEST);

// Cache images & audio
registerRoute(
  ({ request }) =>
    request.destination === "image" || request.destination === "audio",
  new StaleWhileRevalidate({
    cacheName: "assets-cache",
  })
);
