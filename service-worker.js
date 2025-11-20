
const CACHE_NAME = 'smartdash-cache-v1';
const ASSETS_CACHE = 'smartdash-assets-v1';

const CACHED_URLS = [
    '/',
    '/index.html',
    '/about.html',
    '/contact.html',
    '/project.html',
    '/service.html',
    '/team.html',
    '/testimonial.html',
    '/css/style.css',
    '/css/bootstrap.min.css',
    '/app.js',
    '/logo-tecno.png',
    '/manifest.json',
    '/img/about.jpg',
    '/img/developers.png',
    '/img/desarrollo.png',
    '/img/hero.png',
    'https://fonts.googleapis.com/css2?family=Heebo:wght@400;500&family=Rlogosmartdashto:wght@400;500;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css',
    'https://code.jquery.com/jquery-3.4.1.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js'
];

// Install event - cache all static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        Promise.all([
            caches.open(CACHE_NAME).then((cache) => {
                return cache.addAll(CACHED_URLS);
            }),
            caches.open(ASSETS_CACHE)
        ]).then(() => {
            return self.skipWaiting();
        })
    );
});

// Fetch event - serve from cache first, then network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request).then((response) => {
                    // Don't cache if not a successful response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response since it can only be consumed once
                    const responseToCache = response.clone();

                    // Cache the fetched resource
                    caches.open(ASSETS_CACHE)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
            .catch(() => {
                // Return offline page if no connection
                if (event.request.mode === 'navigate') {
                    return caches.match('/index.html');
                }
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            self.clients.claim(),
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => {
                            return cacheName !== CACHE_NAME && cacheName !== ASSETS_CACHE;
                        })
                        .map((cacheName) => {
                            return caches.delete(cacheName);
                        })
                );
            })
        ])
    );
});