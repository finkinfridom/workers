importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  workbox.core.skipWaiting();
  workbox.precaching.precacheAndRoute([]);

  workbox.routing.registerRoute(
    "/",
    new workbox.strategies.StaleWhileRevalidate({
      // Use a custom cache name.
      cacheName: "index-cache",
      plugins: [
        new workbox.expiration.Plugin({
          // 24 hours
          maxAgeSeconds: 60 * 60 * 24
        })
      ]
    })
  );
  workbox.routing.registerRoute(
    // Cache JS files.
    /https:\/\/unpkg.com\/comlink\/[\w-]*\.js$/,
    // Use cache but update in the background.
    new workbox.strategies.StaleWhileRevalidate({
      // Use a custom cache name.
      cacheName: "unpkg-cache",
      plugins: [
        new workbox.expiration.Plugin({
          // Cache 50 items
          maxEntries: 50,
          purgeOnQuotaError: true
        })
      ]
    })
  );
  workbox.routing.registerRoute(
    // Cache JS files.
    /\.js$/,
    // Use cache but update in the background.
    new workbox.strategies.StaleWhileRevalidate({
      // Use a custom cache name.
      cacheName: "js-cache"
    })
  );
  workbox.routing.registerRoute(
    // Cache partials files.
    /\/partials\/[\w-]*\.html$/,
    // Use cache but update in the background.
    new workbox.strategies.StaleWhileRevalidate({
      // Use a custom cache name.
      cacheName: "partials-cache"
    })
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
