const JSFtp = require("jsftp");    
const source = "dist";
const target = $DEPLOY_FTP_PATH
const fs = require("fs");
var Ftp = new JSFtp({ 
	host: $DEPLOY_FTP_HOSTNAME,
	port: Number($DEPLOY_FTP_PORT),
	user: $DEPLOY_FTP_USERNAME,
	pass: $DEPLOY_FTP_PASS
});
var local = filePath;
var remote = localStorage.ftpPath + logName;
fs.readFile(local, function(err, buffer) {
	if(err) {
		console.error(err);
		callback(err);
	}
	else {
		Ftp.put(buffer, remote, function(err) {
			if (err) {
				console.error(err);
				callback(err);
			}
			else {
				alert(file + " - uploaded successfuly");
				callback();
			}
		});
	}
});
