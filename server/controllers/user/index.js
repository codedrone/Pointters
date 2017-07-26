
'use strict';

var User = require('./usersignup.model');
var jwt = require('jwt-simple');
var config = require('../../config/environment/development'); // get db config file
var auth = require('../../auth/auth.service');


// create a new user account
exports.usersignup = function(req, res) {
    console.log(req.body.json);

    if (!req.body.email || !req.body.password) {
        res.status(202);
        res.json({success: false, msg: 'Please enter email and password.'});
    } else {
        var newUser = new User({

            email: req.body.email,
            password: req.body.password

        });
    // save the user
        newUser.save((err, savedUser) => {
            if (err) {
                return res.json({success: false, msg: 'Email already exists.'});
            }

            var token = auth.signToken(savedUser._id, savedUser.email);
            res.json({success: true, id: savedUser._id, msg: 'Successful created a new user.', token: token});
        });
    }
};

// route to logina user
exports.userlogin = function(req, res) {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) throw err;

        if (!user) {
            res.send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
      // check if password matches
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
          // if user is found and password is right create a token
                    var token = auth.signToken(user._id, user.email);
          // return the information including token as JSON
                    res.status(200);
                    res.json({success: true, token: token});
                } else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
};


// get user by id
exports.getuser = function(req, res, next) {
    var userId = req.params.id;
    console.log(userId);

    User.findOne({_id: userId}, (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(404).send('No User found');
        res.status(200).json({email:user.email});
    });
};

