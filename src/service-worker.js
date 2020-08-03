import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';
import {StaleWhileRevalidate} from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {ExpirationPlugin} from 'workbox-expiration';

// Routing API Data
registerRoute(
  ({url}) => url.origin === "https://api.jikan.moe" && url.pathname.startsWith('/v3/') && !url.pathname.includes('search'),
  new StaleWhileRevalidate({
    cacheName: 'api-data',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ]
  })
);


// Routing API Image
// registerRoute(
//   ({ request, url}) => url.origin === 'https://cdn.myanimelist.net' && url.pathname.startsWith('/images/anime/') && request.destination === 'image',
//   new StaleWhileRevalidate({
//     cacheName: 'api-image',
//     plugins: [
//       new ExpirationPlugin({
//         maxEntries: 10,
//         maxAgeSeconds: 7 * 24 * 60 * 60, // 1 Week
//       }),
//     ],
//   })
// );

// Response unknown image when offline
self.addEventListener("fetch", (event) => {
    if (event.request.url.includes("https://cdn.myanimelist.net")) {
        event.respondWith( 
            fetch(event.request)
            .then( response => {
                return response || fetch("assets/img/unknown.png");
            })
        );
    }
})

precacheAndRoute(self.__WB_MANIFEST);