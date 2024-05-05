import express from 'express';
import bcrypt from 'bcrypt';
const userRoutes = express.Router();
import {v4 as uuid} from "uuid";
// const app = express();
import fs from 'fs';
userRoutes.use(express.json());
import {readData, saveData} from "../../database/database.js";
import path from "path";

// POST api for registration
userRoutes.post('/api/users', (req, res) => {
    //console.log(req.body);

    // const registrationData = req.body;
    // const id = uuid();
    // const createdAt = new Date().toISOString();
    // registrationData.id = id;
    // registrationData.createdAt = createdAt;

    // Read existing users from the file, or initialize as an empty array
    let users = [];
    if (fs.existsSync('./database/users.json')) {
        const userData = fs.readFileSync('./database/users.json', 'utf8');
        try {
            users = JSON.parse(userData);
        } catch (e) {
            console.error('Error parsing users JSON:', e);
            // Send an error response to the client
            res.status(500).send('Internal Server Error');
            return;
        }
    }

    // Extract registration data from request body
    const { username, email, password } = req.body;

    // Check if user with the same email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            // Send an error response to the client
            return res.status(500).send('Internal Server Error');
        }

    const newUser = {
        id: uuid(),
        username,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString()
    }

    users.push(newUser);
    saveData('users', users)
    //fs.writeFileSync('./database/users.json', JSON.stringify(users), {flag:'w'})
    // res.set('Content-Type', 'text/plain');
    res.send('Form data received successfully');
    });
});


userRoutes.get('/api/users', (req, res) => {
    try {
        const userData = fs.readFileSync('./database/users.json')
        const users = JSON.parse(userData);
        res.status(200).send(users);
    } catch (e) {
        console.error(e.stack);
        res.status(500).send('Error parsing data')
    }
});


userRoutes.get('/api/users/:id', (req, res) => {
    try {
        // const userData = readData('users');
        const userData = fs.readFileSync('./database/users.json', 'utf-8')
        const users = JSON.parse(userData);
        const user = users.find(user => user.id === req.params.id);
        // const user = findUserById(users, req.params.id);
        if(user) {
            // console.log(user)
            //res.json(user)
            res.status(200).sendFile(path.join(publicDirectory, 'usersInfo.html'))
        } else {
            console.error(e.stack);
            res.status(404).send('User not found');
        }
    } catch (e) {
        res.status(500).send('Internal Server Error');
    }
})


export default userRoutes;