const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/api/data/:name', (req, res, next) => {
    try {
        console.log('Received data:', req.body);
        res.setHeader('Connection', 'keep-alive');
        res.json({ message: 'Data received successfully' });
    } catch (err) {
        next(err);
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('An error occurred');
});

app.listen(PORT, () => {
    console.log(`Server1 running on port ${PORT}`);
});
