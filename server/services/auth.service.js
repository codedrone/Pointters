const config = require('../config')(); // get db config file
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const {finddOne} = require('../stores/user');
const compose = require('composable-middleware');
const validateJwt = expressJwt({secret: config.secret});

function isAuthenticated() {
    return compose()
    .use((req, res, next) => {
        // allow access_token to be passed through query parameter as well
        if (req.query && req.query.hasOwnProperty('access_token'))
            req.headers.authorization = `Bearer ${ req.query.access_token}`;

        try {
            validateJwt(req, res, next);
        } catch (err) {
            next(err);
        }
    })
    .use((req, res, next) => {
        finddOne({_id: req.user._id})
        .then((user) => {
            if (!user) return res.status(400).send('Unauthorized');
            req.user = user;
            next();
        })
        .catch(next);
    });
}

const signToken = (id, email) => jwt.sign({_id: id, email: email}, config.secret);


exports.isAuthenticated = isAuthenticated;
exports.signToken = signToken;
