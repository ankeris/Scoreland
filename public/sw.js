importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
    console.log('workbox is working');

    self.addEventListener('install', (event) => {
      self.skipWaiting();
    });
    
    self.addEventListener('activate', event => {
      event.waitUntil(clients.claim());
    });

    /* Set debug to true, for console logging */
    workbox.setConfig({
      debug: false
    });
    
    workbox.precaching.precacheAndRoute([
      {
        "url": "index.html"
      }
    ]);
    
    workbox.routing.registerNavigationRoute("./index.html", {
      blacklist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
    });

    // Caching Content from Multiple Origins
    workbox.routing.registerRoute(
      /.*(?:googleapis|gstatic|firestore)\.com.*$/,
      new workbox.strategies.NetworkFirst({
          cacheName: "google-apis",
          plugins: [
              new workbox.cacheableResponse.Plugin({
                  statuses: [0, 200]
              })
          ]
      })
    ); 

    /* Cache CSS and JavaScript Files */
    workbox.routing.registerRoute(
      new RegExp(/(css|js|json|webmanifest)((\?.*)$|$)/),
      new workbox.strategies.CacheFirst({
          cacheName: "static-resources"
      })
    );
    
    /* Cache Font Files */
    workbox.routing.registerRoute(
      new RegExp(/(woff|woff2|ttf|otf|html)((\?.*)$|$)/),
      new workbox.strategies.CacheFirst({
          cacheName: "static-fonts"
      })
    ); 

    // Other types of files that are most likely not going to change

    /* Caching Images */
    workbox.routing.registerRoute(
      new RegExp(/(jpg|jpeg|gif|png|svg|ico)((\?.*)$|$)/),
      new workbox.strategies.CacheFirst({
          cacheName: "images",
          plugins: [
              new workbox.expiration.Plugin({
                  maxEntries: 60,
                  maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
              })
          ]
      })
    );

    workbox.precaching.precacheAndRoute([]);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}
