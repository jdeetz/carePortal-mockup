//This is PWA code to cache the manifest
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('cpCache').then(function(cache) {
      return cache.addAll(
        [
	   	'/manifest.json',
          '/style.css',
		'/dataHandler.js',
		'/dataVis.js',
		'/settings.html',
		'/insights.html',
          '/index.html'
        ]
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
	console.log(event.request.url);
	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request);
		})
	);
});


//This tests the availability of storage so we know whether we can use it to store settings etc. persistently
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // all except Firefox b/c it's a snowflake
            e.code === 22 ||
            // FF
            e.code === 1014 ||
            // test name field b/c code might not be present
            // all except Firefox
            e.name === 'QuotaExceededError' ||
            // FF
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // something must be stored in order to acknowledge QuotaExceededError
            (storage && storage.length !== 0);
    }
}

//This makes easy booleans to check storage availability, as distinct from the above method which passes the exceptions
var localStorageAvailable;
if(storageAvailable('localStorage')) {localStorageAvailable = true;} else {localStorageAvailable = false;};
var sessionStorageAvailable;
if(storageAvailable('sessionStorage')) {sessionStorageAvailable = true;} else {sessionStorageAvailable = false;};

//This initializes the storage for settings and display selections for data on other pages
var prefStorage;
var createStorage = function(type) {
	if(type == 'local') {
		prefStorage = window.localStorage;
	} else {
		prefStorage = window.sessionStorage;
	}
	prefStorage.setItem("populated","yep");
	prefStorage.setItem("goalBed","21:00");
	prefStorage.setItem("goalWake","07:00");
	prefStorage.setItem("goalActive","2.0");
	prefStorage.setItem("goalStep","3000");
	prefStorage.setItem("targetOutings","3");
};

//This populates the settings, and preferences for display selections, based on which page is active
var populatePrefs = function() {
	if(window.currentTab === 3) {
		document.getElementById("goalBed").value = prefStorage.getItem("goalBed");
		document.getElementById("goalWake").value = prefStorage.getItem("goalWake");
		document.getElementById("goalActive").value = prefStorage.getItem("goalActive");
		document.getElementById("goalStep").value = prefStorage.getItem("goalStep");
		document.getElementById("targetOutings").value = prefStorage.getItem("targetOutings");
	}
};

//This resets the preferences on all pages to the default, and resets all the settings
var defaultPrefs = function() {
	prefStorage.clear();
	tryStorage();
	populatePrefs();
	document.getElementById("valuesReset").style = "display:block;animation-play-state:running;";
	setTimeout(function() {document.getElementById("valuesReset").style = "display:none;animation-play-state:initial;"},3000);
};

var savePrefs = function() {
	prefStorage.setItem("goalBed",document.getElementById("goalBed").value);
	prefStorage.setItem("goalWake",document.getElementById("goalWake").value);
	prefStorage.setItem("goalActive",document.getElementById("goalActive").value);
	prefStorage.setItem("goalStep",document.getElementById("goalStep").value);
	prefStorage.setItem("targetOutings",document.getElementById("targetOutings").value);
	document.getElementById("saveSuccess").style = "display:block;animation-play-state:running;";
	setTimeout(function() {document.getElementById("saveSuccess").style = "display:none;animation-play-state:initial;"},3000);
};

//This runs automatically to either initialize or populate the page preferences/settings
var tryStorage = function() {
	if(localStorageAvailable) {
		if(!localStorage.getItem('populated')) {
			createStorage('local');
		} else {
			prefStorage = window.localStorage;
			populatePrefs();
		}
	} else if(sessionStorageAvailable) {
		if(!sessionStorage.getItem('populated')) {
			createStorage('session');
		} else {
			prefStorage = window.sessionStorage;
			populatePrefs();
		}
	} else {
		console.log("Apparently no storage is available");
	}
};
tryStorage();
