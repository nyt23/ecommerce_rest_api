import fs from 'fs';
import * as path from "path";

export function readData(filename) {
    // Construct the file path
    const filePath = path.join(`./database/${filename}.json`);

    // Attempt to read the file
    try {
        const data = fs.readFileSync(filePath, 'utf8'); // Ensure encoding is set to 'utf8' to get string output
        return JSON.parse(data); // Parse the JSON string into a JavaScript object
    } catch (error) {
        console.error(`Failed to read or parse the file: ${filePath}`, error);
        return null; // Return null or throw an error based on your error handling strategy
    }
}

export function saveData(filename, data) {
    // Construct the file path
    const filePath = path.join('database', `${filename}.json`);

    try {
        // Stringify the JSON data with added formatting for readability
        const jsonData = JSON.stringify(data, null, 2);

        // Write data to the file system
        fs.writeFileSync(filePath, jsonData, { flag: 'w' });
    } catch (error) {
        console.error(`Failed to write data to ${filePath}`, error);
        // Optionally throw the error to be handled by the caller
        throw error;
    }
}


export function findUserById(users, id) {
    return users.find(user => user.id === id)
}
//module.exports = { readData, saveData }
