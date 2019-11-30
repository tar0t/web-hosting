var CACHE_NAME = 'pwa-lottery201911242323-cache-v1';
var urlsToCache = [
    '.',
	'index.html',
    'manifest.json',
	'css/beauter.min.css',
    'js/app.js',
    'js/beauter.min.js',
    'js/dexie.min.js',
	'js/jquery-3.4.1.min.js',
	'js/papaparse.min.js'
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});
