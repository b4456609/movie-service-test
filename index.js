var execSync = require('child_process').execSync;
var http = require('http');
var fs = require('fs');

function writeFile(data) {
    return new Promise(
        function (resolve, reject) {
            fs.writeFile("./test.json", JSON.stringify(data), function (err) {
                if (err) {
                    return console.log(err);
                    reject(err);
                }
                console.log("The file was saved!");
                resolve();
            });
        });
}

function runTest() {
    return new Promise(
        function (resolve, reject) {
            var cmd = './gradlew clean configure pactVerify';
            console.log(cmd)

            var history = execSync(cmd, { encoding: 'utf8', env: process.env });
            console.log(history);
        });
}

function getRegreesionInfo(callback) {
    http.get("http://" + process.env.MGP + "/api/regression/serviceTest/" + process.env.TARGET, function (res) {
        var body = ''; // Will contain the final response
        // Received data is a buffer.
        // Adding it to our body
        res.on('data', function (data) {
            body += data;
        });
        // After the response is completed, parse it and log it to the console
        res.on('end', function () {
            var parsed = JSON.parse(body);
            console.log("recevice:", body);
            callback(parsed);
        });
    })
        // If any error has occured, log error to console
        .on('error', function (e) {
            console.log("Got error: " + e.message);
        });
}

function runStretegy(data) {
    for (let item of data) {
        writeFile(item)
            .then(runTest);
    }
}

getRegreesionInfo(runStretegy);