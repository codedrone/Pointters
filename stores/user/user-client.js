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
        unique: true
    },
    socialNetwork: {
        name: String,
        id: String,
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
            enum: ['pushNotification', 'email', '']
        },
        orderNotifications: {
            type: String,
            description: 'orderNotifications',
            enum: ['pushNotification', 'email', '']
        },
        offerNotifications: {
            type: String,
            description: 'offerNotifications',
            enum: ['pushNotification', 'email', '']
        },
        summaryEmail: {
            type: String,
            description: 'summaryEmail',
            enum: ['daily', 'weekly']
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

UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password') && !user.isNew) return next();

    bcrypt.genSalt(10)
        .then((salt) => bcrypt.hash(user.password, salt))
        .then((hash) => {
            user.password = hash;
            next();
        })
        .catch(next);
});

UserSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('tempPassword') && !user.isNew || !user.tempPassword) return next();

    bcrypt.genSalt(10)
        .then((salt) => bcrypt.hash(user.tempPassword, salt))
        .then((hash) => {
            user.tempPassword = hash;
            next();
        })
        .catch(next);
});

UserSchema.index({ 'sociaNetwork.name': 1, 'socialNetwork.id': 1 });

module.exports = mongo.model('User', UserSchema);
