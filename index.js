var execSync = require('child_process').execSync;
var http = require('http');
var fs = require('fs');
var time = 0;

function writeFile(data) {
    return new Promise(
        function (resolve, reject) {
            fs.writeFile("./test.json", JSON.stringify([data]), function (err) {
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
            var cmd = './gradlew pactVerify';
            console.log(cmd)

            var history = execSync(cmd, { encoding: 'utf8', env: process.env, stdio: [0, 1, 2] });
            console.log(history);
            resolve();
        });
}

function renameTest() {
    return new Promise(
        function (resolve, reject) {
            const reportFolder = './build/reports/pact';
            fs.readdir(reportFolder, (err, files) => {
                console.log(files)
                files.forEach(file => {
                    if (!file.startsWith("_")) {
                        fs.renameSync(`${reportFolder}/${file}`, `${reportFolder}/_${time}_${file}`);
                    }
                    resolve();
                });
            })
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

async function runStretegy(data) {

    execSync('rm -rf build', { encoding: 'utf8', env: process.env, stdio: [0, 1, 2] });

    for (let item of data) {
        time++;
        for (let testcase of item){
            await writeFile(testcase)
            await runTest()
        }
        await renameTest()
    }
}

getRegreesionInfo(runStretegy);
