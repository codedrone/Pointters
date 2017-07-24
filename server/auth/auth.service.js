'use strict';

var passport = require('passport');
var config  = require('../config/environment/development'); // get db config file
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var User = require('../api/user/usersignup.model');
var compose = require('composable-middleware');
var validateJwt = expressJwt({secret: config.secret});


/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
    return compose()
    // Validate jwt
        .use(function (req, res, next) {
            // allow access_token to be passed through query parameter as well
            if (req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = 'Bearer ' + req.query.access_token;
            }
            try {
                validateJwt(req, res, next);

            } catch (e) {
            }
        })
        // Attach user to request
        .use(function (req, res, next) {
            User.findById(req.user._id, function (err, user) {
                if (err) return next(err);
                if (!user) {
                    console.log(req.headers.authorization);
                    return res.status(400).send('Unauthorized')
                };

                req.user = user;
                next();
            });
        });
}


/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, email) {
    return jwt.sign({_id: id, email: email}, config.secret);
}


exports.isAuthenticated = isAuthenticated;
exports.signToken = signToken;
