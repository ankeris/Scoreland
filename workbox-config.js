module.exports = {
  "globDirectory": "public/",
  "globPatterns": [
    "**/*.{png,xml,zip,ico,ttf,otf,jpg,jpeg,PNG,html,svg,webmanifest,css}"
  ],
  "swDest": "public\\sw.js",
  "swSrc": "src/sw.js",
  "injectionPointRegexp": /const precacheManifest = )\[\](;)/
};