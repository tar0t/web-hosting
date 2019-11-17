// ServiceWorkerの登録
if('serviceWorker' in navigator){
	navigator.serviceWorker.register('/serviceworker.js', {
		scope: '/'
	}).then(function(){
		// success
	}).catch(function(e){
		// failed
	});
}
