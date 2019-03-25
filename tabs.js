var currentTab = 0;
function changeTab(tabID) {
	switch(tabID) {
		case 1:
			break;
		case 2:
			break;
		case 3:
			break;
	}
};

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
var localStorageAvailable = if(storageAvailable('localStorage')) {return true;} else {return false;};
var sessionStorageAvailable = if(storageAvailable('sessionStorage')) {return true;} else {return false;};

//This initializes the storage for settings and display selections for data on other pages
var createStorage = function() {

};

//This populates the settings, and preferences for display selections, based on which page is active
var populatePrefs = function() {

};

//This runs automatically to either initialize or populate the page preferences/settings
if(localStorageAvailable) {
	if(!localStorage.getItem('populated')) {
		createStorage();
	} else {
		populatePrefs();
	}
}
