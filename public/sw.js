const CACHE_NAME = "pizzuj-v1";
const urlsToCache = [
  "/",
  "/about",
  "/register",
  "/login",
  "/food-cost-calculator",
  "/reklama-dla-pizzerii",
  "/affiliate",
  "/blog",
  "/pizza/warszawa",
  "/pizza/krakow",
  "/pizza/poznan",
  "/static/css/main.css",
  "/favicons/android-chrome-192x192.png",
  "/favicons/android-chrome-512x512.png",
  "/og-image.jpg",
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
