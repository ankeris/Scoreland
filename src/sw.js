importScripts("workbox-sw");

workbox.setConfig({ modulePathPrefix: "workbox-sw" });

const precacheManifest = [];

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(precacheManifest);
