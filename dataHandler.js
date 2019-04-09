//This script handles fetching the data from the database, and parsing it into objects accessible with JavaScript
function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
var stepdata;

//These are the database querying functions, they leverage the above and user defined variables to grab specific ranges of data
//and store them in the custom data types defined in the dataVis.js file
var grabStepData = function(numDays) {
	var today = new Date();
	var startDay = new Date().setDate(new Date.getDate()-numDays);
};

var grabGPSData = function(numDays) {
	var today = new Date();
	var startDay = new Date();
	startDay.setDate(startDay.getDate()-numDays);
};

//This is a WORKING use of the above function, which will grab data within a certain date range and store it in a local variable
/*
ajax_get('stepDataFetch.php?startDate=2019-04-03&endDate=2019-04-05', function(data) {
    stepdata = data;
});*/
