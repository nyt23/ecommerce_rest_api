import fs from 'fs'
import bodyParser from 'body-parser'
import * as path from "path";
import express from 'express';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
import {fileURLToPath} from "url";
import passport from 'passport';
import { Strategy } from 'passport-local';
import { BasicStrategy } from 'passport-http'
import bcrypt from "bcrypt";

import {v4 as uuid} from "uuid";
import {findUserById, readData, saveData} from "./database/database.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectory = path.join(__dirname, 'public');





// Mounting user routes at '/api/users'
import userRoutes from './routers/users/userRouters.js';
//app.use('/api/users', userRoutes);
app.use('/', userRoutes);

app.use(express.json());
app.use(express.static(publicDirectory));

// registration HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'registration.html'))
});


// login HTML page
app.get('/login', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'login.html'))
})




const usersData = fs.readFileSync('./database/users.json', 'utf-8');
const users = JSON.parse(usersData);

// using Basic
passport.use(new BasicStrategy(
    function (email, password, done) {
        console.log('Email:', email);
        console.log('Password:', password);

        const user = users.find(u => u.email === email);
        console.log('User:', user);

        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user) // when success
    }
));


// Serialize and Deserialize User (required for session handling)
// serialize all user by id stored in session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
// specify one user by id
passport.deserializeUser(function (id, done) {
    const user = users.find(u => u.id === id);
    done(null, user || false);
});


// app.post('/users', (req, res) => {
//     console.log(req.body);
//
//     const registrationData = {
//         id: uuid(),
//         username: req.body.username,
//         email: req.body.email,
//         password:req.body.password,
//         createdAt: new Date().toISOString()
//     }
//
//     // const registrationData = req.body;
//     // const id = uuid();
//     // const createdAt = new Date().toISOString();
//     // registrationData.id = id;
//     // registrationData.createdAt = createdAt;
//
//     // Read existing users from the file, or initialize as an empty array
//     let users = [];
//     if (fs.existsSync('./database/users.json')) {
//         const userData = fs.readFileSync('./database/users.json', 'utf8');
//         try {
//             users = JSON.parse(userData);
//         } catch (e) {
//             console.error('Error parsing users JSON:', e);
//             // Send an error response to the client
//             res.status(500).send('Internal Server Error');
//             return;
//         }
//     }
//     users.push(registrationData);
//     saveData('users', users)
//     //fs.writeFileSync('./database/users.json', JSON.stringify(users), {flag:'w'})
//     // res.set('Content-Type', 'text/plain');
//     res.send('Form data received successfully');
// });



// app.get('/users/:id', (req, res) => {
//     try {
//         // const userData = readData('users');
//         const userData = fs.readFileSync('./database/users.json', 'utf-8')
//         const users = JSON.parse(userData);
//         const user = users.find(user => user.id === req.params.id);
//         // const user = findUserById(users, req.params.id);
//         if(user) {
//             // console.log(user)
//             //res.json(user)
//             res.status(200).sendFile(path.join(publicDirectory, 'usersInfo.html'))
//         } else {
//             console.error(e.stack);
//             res.status(404).send('User not found');
//         }
//     } catch (e) {
//         res.status(500).send('Internal Server Error');
//     }
// })

export default app