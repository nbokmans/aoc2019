const fs = require('fs');
const readline = require('readline');

const readFile = (fileName, cb) => {
    const fileStream = fs.createReadStream(fileName);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let str = '';

    rl.on('line', (line) => str = `${str}\n${line}`);
    rl.on('close', () => cb(str));
}

module.exports.readFile = readFile;