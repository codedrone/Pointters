const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

module.exports = function(app) {
    app.use(compression());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json({limit: '5mb'}));
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(morgan('dev'));
};
