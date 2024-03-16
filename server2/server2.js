const express = require('express');
const httpProxy = require('http-proxy');
const bodyParser = require('body-parser');

const app = express();
const proxy = httpProxy.createProxyServer();
const PORT = 8081;

app.use(bodyParser.json());

app.post('/proxy', (req, res) => {
    const targetUrl = 'http://localhost:3000/api/data';
    proxy.web(req, res, { target: targetUrl });
});

proxy.on('error', (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error');
});

app.listen(PORT, () => {
    console.log(`Server2 running on port ${PORT}`);
});
