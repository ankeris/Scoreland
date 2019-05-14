importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

if (workbox) {
    console.log('workbox is working');

    /* Set debug to true, for console logging */ 
    workbox.setConfig({
      debug: true
    }); 
    console.log(workbox.routing);
    
    /* Cache doc (HTML) */
    workbox.routing.registerRoute(
      new RegExp(/(\/)((\?utm.*)$|$)/),
      workbox.strategies.networkFirst({
          cacheName: "doc"
      })
    ); 

    // Caching Content from Multiple Origins
    workbox.routing.registerRoute(
      /.*(?:googleapis|gstatic)\.com.*$/,
      workbox.strategies.networkFirst({
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
      new RegExp(/(css|js)((\?.*)$|$)/),
      workbox.strategies.cacheFirst({
          cacheName: "static-resources"
      })
    ); 
    
    /* Cache Font Files */
    workbox.routing.registerRoute(
      new RegExp(/(woff|woff2|ttf)((\?.*)$|$)/),
      workbox.strategies.cacheFirst({
          cacheName: "static-fonts"
      })
    ); 

    //Cache Gasautomaten Dealers
    workbox.routing.registerRoute(
      /.*(?:bulk.kosangas)\.dk.*$/,
      workbox.strategies.networkFirst({
          cacheName: "gasautomaten"
      })
    ); 

    /* Caching Images */
    workbox.routing.registerRoute(
      new RegExp(/(jpg|jpeg|gif|png|svg)((\?.*)$|$)/),
      workbox.strategies.cacheFirst({
          cacheName: "images",
          plugins: [
              new workbox.expiration.Plugin({
                  maxEntries: 60,
                  maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
              })
          ]
      })
    );
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}
