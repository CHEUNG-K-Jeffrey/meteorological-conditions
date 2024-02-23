const cacheName = "WeatherDataCache_v1";

self.addEventListener('install,', (event) => {
    event.waitUntil(caches.open(cacheName));
})

self.addEventListener('fetch', async (event) => {
    if (event.request.url.endsWith(".json")){
        event.respondWith(caches.open(cacheName).then((cache) => {
            return cache.match(event.request).then((cachedResponse) => {
                return cachedResponse || fetch(event.request.url).then((fetchedResponse) => {
                    cache.put(event.request, fetchedResponse.clone());
                    return fetchedResponse;
                });
            });
        }));
    }
}
);

onfetch = (event) => { };
