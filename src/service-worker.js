self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


const onsenui_version = '2.10.10';

// install new service worker when ok, then reload page.
// Ini Sourcenya
// Ini tambahan lagi
self.addEventListener("message", msg=>{
    if (msg.data.action=='skipWaiting'){
        self.skipWaiting()
        console.log("SW.message events");
    }
})


/*
 * Save files to user's device
 * The "install" event is called when the ServiceWorker starts up.
 * All ServiceWorker code must be inside events.
 */
                // 'https://unpkg.com/onsenui@'+`${onsenui_version}`+'/css/onsenui.min.css',
                // 'https://unpkg.com/onsenui/css/onsen-css-components.min.css',
                // 'https://unpkg.com/onsenui/js/onsenui.min.js'
self.addEventListener('install', function(e){
    console.log('[n] install')
    e.waitUntil(
        caches.open('tabik_cache').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/favicon.ico',
                '/images/icons/icon-72x72.png',
                '/manifest.json'
            ])
        })
    );
});

/*
 * Intercept requests and return the cached version instead
 */
self.addEventListener('fetch', function(e){
    e.respondWith(
        caches.match(e.request)
            .then(response => response || fetch(e.request))
    );
});
