import express from 'express';
const userRoutes = express.Router();

// POST api for registration
userRoutes.post('/register', (req, res) => {
    res.send('user registration endpoint')
});


export default userRoutes;