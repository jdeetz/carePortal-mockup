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
var gpsdata;

//These are the database querying functions, they leverage the above and user defined variables to grab specific ranges of data
//and store them in the custom data types defined in the dataVis.js file
var grabData = function(type, numDays) {
	var today = new Date();

	//makes variables for each of the components of the end date (today)
	var eyear = today.getFullYear();
	var emon = today.getMonth() + 1;
	if(emon < 10) {
		emon = "0" + emon;
	}
	var eday = today.getDate();
	if(eday < 10) {
		eday = "0" + eday;
	}


	var startDay = today;
	startDay.setDate(startDay.getDay()-numDays);

	//makes variables of each of the components of the start date
	var syear = startDay.getFullYear();
	var smon = startDay.getMonth() + 1;
	if(smon < 10) {
		smon = "0" + smon;
	}
	var sday = startDay.getDate();
	if(sday < 10) {
		sday = "0" + sday;
	}

	ajax_get(type + 'DataFetch.php?startDate=' + syear + "-" + smon + "-" + sday + "&endDate=" + eyear + "-" + emon + "-" + eday, function(data) {
		if(type == "step") {
			stepdata = new StepData(data);
		} else if(type == "gps") {
			gpsdata = new LifeSpaceDelta(data);
			gpsdata.render();
		}
	});
};
