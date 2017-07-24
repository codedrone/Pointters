/**
 * This is the model class for collection "user".
 * @author Pointters
 * @date 07/12/2017
 *
 * @module      :: User Model
 * @description :: This model is to store user details.
 * @docs        ::
 */
'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

 
// set up a mongoose model
var UserSchema = new Schema({
  
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  companyName: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    default: ''
  },
  profilePic: {
    type: Array
  },
  email: {
        type: String,
        unique: true,
        required: true
    },
  isEmailValid: {
    type: Boolean,
    default: false
  },
  location:{
       type: Object,
       default: '',
       index:true
  },
  birthday: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  education: {
    type: String,
    default: ''
  },
  awards: {
    type: String,
    default: ''
  },
  license: {
    type: String,
    default: ''
  },
  isAdmin: {
        type: Boolean,
        default: false
  },
  isActive: {
        type: Boolean,
        default: false
  },
  phoneNumber:{
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: true
  },
});
 
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
 
module.exports = mongoose.model('User', UserSchema);