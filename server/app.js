/**
 * Main application file
 */

'use strict';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment/development');


var flash = require('express-flash');


// Connect to database
mongoose.connect(config.dbpath, {useMongoClient: true });
mongoose.connection.on('error', function (err) {

        console.error('MongoDB connection error: ' + err);
    }
);

// Setup server
var app = express();
var server = require('http').createServer(app);


app.use(flash());
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, function () {
    console.log('Express server listening on %d', config.port);
    
});


// Expose app
 module.exports = app;
