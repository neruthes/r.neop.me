const fs = require('fs');
const rightPad = function (str, len) {
    if (str.length >= len) {
        return len;
    } else {
        return str + (new Array(len-str.length)).fill(' ').join('');
    };
};
const latestId = parseInt(fs.readFileSync('latest-id.txt').toString().trim(), 36);

// ------------------------------------------------------------

var argv = process.argv;

if (argv.length !== 3) {
    var page = argv[2];
}
// ------------------------------------------------------------

const listOfUrls = (new Array(latestId + 1)).fill(1).map((x,i)=>{
    return fs.readFileSync(`db/${i.toString(36)}.txt`).toString().trim();
});

console.log(listOfUrls.map((x,i)=>{
    return `https://udon.pw/${rightPad(i.toString(36), 8)} ${x}`;
}).join('\n'));
