// ServiceWorker
var CACHE_NAME = "pwa-lottery-chache-v1";
var urlsToCache = [
	'/',
	'/manifest.json',
	'/css/style.css',
	'/js/register-serviceworker.js',
	'/js/app.js'
];

self.addEventListener('install',function(event){
	event.waitUntil(
		// open the app browser cache
		caches.open(CACHE_NAME).then(function(cache){
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch',function(event){
	event.respondWith(
		caches.match(event.request).then(function(response){
			return response ? response : fetch(event.request);
		})
	);
});
