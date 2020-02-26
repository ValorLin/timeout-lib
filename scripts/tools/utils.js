const child_process = require('child_process');
const fs = require('fs');

const promisify = (fn) => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            fn(...args, (err, result) => err ? reject(err) : resolve(result))
        });
    }
}

const exec = promisify(child_process.exec);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

const readJSON = (file) =>
    readFile(file)
        .then(buffer => buffer.toString())
        .then(str => JSON.parse(str));

const writeJSON = (file, object) => {
    const str = JSON.stringify(object);
    return writeFile(file, str);
}

module.exports = {
    promisify,
    readJSON,
    writeJSON,
    exec,
    readFile,
    writeFile,
    unlink
};