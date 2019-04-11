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
    console.log(postData);
}

function hopeThisWorks() {
	ajax_post("demoDataSubmitter.php","input=54321",function(response) {
		document.write(response);
	});
};


//MySQL formatted timestamp date generator:
//new Date().toISOString().slice(0, 19).replace('T', ' ');
