//This function is for securely submitting data to the database via POST
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
	//TODO - make this line send actual data
	var sendData = "input=abcdef";
	console.log(sendData);
	ajax_post("demoDataSubmitter.php",sendData,function(response) {
		document.write(response);
	});
};


//MySQL formatted timestamp date generator:
//new Date().toISOString().slice(0, 19).replace('T', ' ');
