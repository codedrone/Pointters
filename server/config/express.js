/**
 * Express configuration
 */

'use strict';

var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');

module.exports = function(app) {
    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json({limit: '5mb'}));
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(morgan('dev'));
};
