//This function generates a bunch of realistic-seeming demo data and sends it to the database insert function
function ajax_post(url, postData, callback) {
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

    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(postData);
}

function hopeThisWorks() {
	var fred1 = new Date().toISOString().slice(0, 10);
	var fred2 = new Date().toISOString().slice(11, 19);
	var sendData = "input=888888&time1=" + fred1 + "&time2=" + fred2;
	console.log(sendData);
	ajax_post("demoDataSubmitter.php",sendData,function(response) {
		document.write(response);
	});
};

function testDate() {
	var fred1 = new Date().toISOString().slice(0, 9);
	var fred2 = new Date().toISOString().slice(11, 19);
	console.log(fred1);
	console.log(fred2);
};


//MySQL formatted timestamp date generator:
//new Date().toISOString().slice(0, 19).replace('T', ' ');
