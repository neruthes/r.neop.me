const myDomainName = 'udon.pw';

const exec = require('child_process').exec;
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const base62 = require('base62/lib/custom');
const fs = require('fs');

exec('mkdir ~/.neruthes-apps; mkdir ~/.neruthes-apps/udonpw-shortlinks; touch mkdir ~/.neruthes-apps/udonpw-shortlinks/logs.txt;');

var argv = process.argv;

if (argv.length < 3 || argv.length > 4) {
    console.error('Please give 1 and only 1 URL.');
} else {
    var rawUrl = argv[2];
    var url = rawUrl;
    if (rawUrl.indexOf('://') === -1) {
        url = 'https://' + rawUrl;
    };
    if (argv[3] !== undefined) {
        // Given AES key
        var aeskey = argv[3];
        if (!aeskey.match(/^[0-9A-Za-z]+$/)) {
            console.error('Bad AES key. Use only A-Z, a-z, and 0-9.')
        };
        url = CryptoJS.AES.encrypt(url, aeskey);
    };

    // Base62
    var basde62charset = base62.indexCharset('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    // Read
    var latestId = base62.decode(fs.readFileSync('latest-id.txt').toString().trim(), basde62charset);
    var currentId = latestId + 1;
    var currentId_base62 = base62.encode(currentId, basde62charset);

    // Write
    fs.writeFileSync(`db/${currentId_base62}.txt`, url);
    fs.writeFileSync(`latest-id.txt`, currentId_base62);

    // Log
    console.log('Successful!');
    var logTextLine = `Now https://${myDomainName}/${currentId_base62}${aeskey ? '#' + aeskey : ''}\nWill be redirected to ${rawUrl}`;
    console.log(logTextLine);
    exec(`echo "${logTextLine}\n" >> ~/.neruthes-apps/udonpw-shortlinks/logs.txt;`);

    // Auto push
    exec('sh publish.sh');
};
