/**
 * Main application file
 */

'use strict';

const express = require('express');
const config = require('./config')();


const flash = require('express-flash');

// Setup server
const app = express();
const server = require('http').createServer(app);


app.use(flash());
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, () => {
    console.log('Express server listening on %d', config.port);
});


// Expose app
module.exports = app;
