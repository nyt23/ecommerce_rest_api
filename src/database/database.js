const fs = require('fs');
const path = require('path');

const readData = async (filename) => {
    const filePath = path.join(__dirname, 'database', `${filename}.json`);
    return fs.readFileSync(filePath);
};

const saveData = async (filename, data) => {
    const filePath = path.join(__dirname, 'database', `${filename}.json`);
    return fs.writeFileSync(filePath, JSON.stringify(data), {flag: 'w'});
};

module.exports = { readData, saveData }