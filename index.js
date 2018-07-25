const express = require('express');
const path = require('path');
const app = express();
const uuid = require('uuid');

const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/api/', (req, res) => {
    res.json(uuid());
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


app.listen(port);