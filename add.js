const exec = require('child_process').exec;
const fs = require('fs');

var argv = process.argv;

if (argv.length !== 3) {
    console.error('Please give 1 and only 1 URL.');
} else {
    var url = argv[2];
    if (url.indexOf('://') === -1) {
        url = 'https://' + url;
    };

    // Read
    var latestId = parseInt(fs.readFileSync('latest-id.txt').toString().trim(), 36);
    var currentId = latestId + 1;
    var currentId_base36 = currentId.toString(36);

    // Write
    fs.writeFileSync(`db/${currentId_base36}.txt`, url);
    fs.writeFileSync(`latest-id.txt`, currentId_base36);

    // Log
    console.log('Successful!');
    console.log(`Now https://udon.pw/${currentId_base36}`);
    console.log(`Will be redirected to ${url}`);

    // Auto push
    exec('sh publish.sh');
};
