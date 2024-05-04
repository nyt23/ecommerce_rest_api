
import * as path from "path";
import express from 'express';
const app = express();
import {fileURLToPath} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectory = path.join(__dirname, 'public');


// Mounting user routes at '/api/users'
import userRoutes from './routers/users/userRouters.js';
app.use('api/users', userRoutes)

app.use(express.json())
app.use(express.static(publicDirectory));

app.get('/start', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'registration.html'))
});


export default app