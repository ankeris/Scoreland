/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "android-chrome-192x192.png",
    "revision": "7f9e64368d26ac09678db34b9bbbcb21"
  },
  {
    "url": "android-chrome-512x512.png",
    "revision": "f809bf6e2c0e53c045592e304412a573"
  },
  {
    "url": "apple-touch-icon.png",
    "revision": "7e9a43221728d38453dec88a3f6e1dca"
  },
  {
    "url": "browserconfig.xml",
    "revision": "8c0e9988f43b529561ae2834a4b9b53f"
  },
  {
    "url": "favicon_package_v0.16.zip",
    "revision": "949b6730ae4a730414bc709c2bf37d95"
  },
  {
    "url": "favicon-16x16.png",
    "revision": "1a017d5f9b9438b7ec6ca627faf38722"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "e1e93fbde7a0e9dda2ac28ab6fc3d293"
  },
  {
    "url": "favicon.ico",
    "revision": "f42165ba43dca379a9351d8979bb4f38"
  },
  {
    "url": "fonts/AtarianSystem.ttf",
    "revision": "c493fede9be21fb89eb0f9075bc4829c"
  },
  {
    "url": "fonts/AtarianSystemBold.ttf",
    "revision": "c5b136c6d3a803ea07acd965b681efae"
  },
  {
    "url": "fonts/AtarianSystemBoldItalic.ttf",
    "revision": "716bd2ef0e04c646b3a7d52a22ddce3b"
  },
  {
    "url": "fonts/AtarianSystemExtended.ttf",
    "revision": "4c64fda2a02106061518ae0e6f2713e3"
  },
  {
    "url": "fonts/AtarianSystemExtendedBold.ttf",
    "revision": "806b6a5b33aa3788e3fe2f0a1a3ce135"
  },
  {
    "url": "fonts/AtarianSystemExtendedBoldItalic.ttf",
    "revision": "d6c746c2f89064bc6987598b928f4f97"
  },
  {
    "url": "fonts/AtarianSystemExtendedItalic.ttf",
    "revision": "adee3b1421245cb072cb53ca5d476530"
  },
  {
    "url": "fonts/Cataclysmo.otf",
    "revision": "73899b6f54aaa2d8e2a4f72f028c80f8"
  },
  {
    "url": "fonts/SF Atarian System Italic.ttf",
    "revision": "71a547f870278855afb974aa509fd270"
  },
  {
    "url": "images/scorebird.jpg",
    "revision": "f7e13a5943b3f689e6c2255b0e3cd7da"
  },
  {
    "url": "images/selfpong.jpeg",
    "revision": "8243820565e0db0fcf091c8c0d23cce6"
  },
  {
    "url": "images/snake.jpg",
    "revision": "cd1101706ef9fe865702b5cde9953779"
  },
  {
    "url": "images/streetracer.PNG",
    "revision": "72c32f83457bfb4f98cb04d9ab90720d"
  },
  {
    "url": "index.html",
    "revision": "24ed3cfd563ad9d9a92da2a6d2a20a82"
  },
  {
    "url": "logo.svg",
    "revision": "d71be4b4c47f67a80e96c1d9ecdc5f7b"
  },
  {
    "url": "mstile-144x144.png",
    "revision": "6883031574dd6cbf61f8f95b90388dff"
  },
  {
    "url": "mstile-150x150.png",
    "revision": "d3674632f0842ca6399b0f8128cc6fd0"
  },
  {
    "url": "mstile-310x150.png",
    "revision": "c1ed79274d7cb31a6b29f6ff55b0370f"
  },
  {
    "url": "mstile-310x310.png",
    "revision": "37c8fc5f3c396936992733fb655dfa19"
  },
  {
    "url": "mstile-70x70.png",
    "revision": "1cebabec85b5a796cc6fe33ba33108dd"
  },
  {
    "url": "safari-pinned-tab.svg",
    "revision": "39fdff65fde38f366cb98796e8b48a8c"
  },
  {
    "url": "site.webmanifest",
    "revision": "43589e0fef7a2ab17bcd2cd0af2e7d69"
  },
  {
    "url": "styles/global.css",
    "revision": "7744fb52d4dc7fbbdf3c851bf018ee01"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
