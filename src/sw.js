
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js')

workbox.core.setCacheNameDetails({
    prefix: 'calculator-pwa',
    suffix: 'v1'
})

workbox.core.setLogLevel(workbox.core.LOG_LEVELS.silent)

workbox.clientsClaim()
workbox.skipWaiting()

workbox.precaching.precacheAndRoute([])


// if offline and fail to navigate render index.html
workbox.routing.registerRoute(
    ({ event }) => event.request.mode === 'navigate',
    ({ url }) => fetch(url.href).catch(() => caches.match('/index.html'))
)

workbox.routing.registerRoute(
    /.*\.(?:js|css|html)$/,
    workbox.strategies.networkFirst()
)

workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'image-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 10,
                maxAgeSeconds: 24 * 60 * 60
            })
        ]
    })
)

workbox.routing.registerRoute(
    /.*\.woff2/,
    workbox.strategies.cacheFirst()
)
