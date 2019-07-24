'use strict';

const express = require('express');
const app = express();
const path = require('path');

app.use('/assets', express.static(__dirname + '/static'));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname + '/dist/index_live.html'));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
