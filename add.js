const myDomainName = 'udon.pw';

const exec = require('child_process').exec;
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const fs = require('fs');

exec('mkdir ~/.neruthes-apps; mkdir ~/.neruthes-apps/udonpw-shortlinks; touch mkdir ~/.neruthes-apps/udonpw-shortlinks/logs.txt;');

var argv = process.argv;

if (argv.length < 3 || argv.length > 4) {
    console.error('Please give 1 and only 1 URL.');
} else {
    var url = argv[2];
    if (url.indexOf('://') === -1) {
        url = 'https://' + url;
    };
    if (argv[3] !== undefined) {
        // Given AES key
        var aeskey = argv[3];
        if (!aeskey.match(/^[0-9A-Za-z]+$/)) {
            console.error('Bad AES key. Use only A-Z, a-z, and 0-9.')
        };
        url = CryptoJS.AES.encrypt(url, aeskey);
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
    var logTextLine = `Now https://${myDomainName}/${currentId_base36}${aeskey ? '#' + aeskey : ''}\nWill be redirected to ${url}`;
    console.log(logTextLine);
    exec(`echo "${logTextLine}\n" >> ~/.neruthes-apps/udonpw-shortlinks/logs.txt;`);

    // Auto push
    exec('sh publish.sh');
};
