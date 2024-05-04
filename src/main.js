const express = require('express');
const app = express();

const port = 3003;

app.get('/', (req, res) => {
    res.send('E-commerce API running!')
});

app.listen(port, () => {
    console.log(`This is the link: http://localhost:${port}`)
})
