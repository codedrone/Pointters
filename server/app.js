const express = require('express');
const flash = require('express-flash');

const config = require('./config')();

const app = express();
const server = require('http').createServer(app);


app.use(flash());
require('./config/express')(app);
require('./lib/routes')(app);

server.listen(config.port, () => {
    console.info('Express server listening on %d', config.port);
});

module.exports = app;
