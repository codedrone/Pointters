const mongo = require('../../databases/mongo');
const Schema = mongo.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({

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
    resetPasswordExpires: String,
    tempPassword: String,
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
    location: {
        type: Object,
        default: '',
        index: true
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
    settings: {
        generalNotifications: {
            type: String,
            description: 'generalNotifications',
            enum: [ 'pushNotification', 'email' ]
        },
        orderNotifications: {
            type: String,
            description: 'orderNotifications',
            enum: [ 'pushNotification', 'email' ]
        },
        offerNotifications: {
            type: String,
            description: 'offerNotifications',
            enum: [ 'pushNotification', 'email' ]
        },
        summaryEmail: {
            type: String,
            description: 'summaryEmail',
            enum: [ 'daily', 'weekly' ]
        }
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    insurance: String,
    phone: String,
    profileBackgroundImages: {}
});

UserSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password') && !user.isNew) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('tempPassword') && !user.isNew || !user.tempPassword) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.tempPassword, salt, (err, hash) => {
            if (err) return next(err);
            user.tempPassword = hash;
            next();
        });
    });
});

module.exports = mongo.model('User', UserSchema);
