const {location:{schema:location}} = require('./sub-schema');


module.exports = {
    completedRegistration: {
        type: Boolean,
        default: false
    },
    completedRegistrationDate: Date,
    isActive: {
        type: Boolean,
        default: true
    },
    isEmail: {
        valid: {
            type: Boolean,
            default: true
        },
        bounced: {
            type: Boolean,
            default: false
        },
        spam: {
            type: Boolean,
            default: false
        },
        invalid: {
            type: Boolean,
            default: false
        },
        reason: String
    },
    awards: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    companyName: {
        type: String
    },
    description: {
        type: String
    },
    education: {
        type: String
    },
    email: {
        type: String
    },
    firstName: {
        type: String
    },
    insurance: {
        type: String
    },
    lastName: {
        type: String
    },
    license: {
        type: String
    },
    location: [ location ],
    phone: {
        type: String
    },
    profilePic: {
        type: String
    },
    socialNetwork: {
        name: String,
        id: String
    },
    profileBackgroundImages: {
        type: Object
    },
    resetPasswordExpires: String,
    tempPassword: String,
    settings: {
        generalNotifications: {
            type: String,
            description: 'generalNotifications',
            enum: [ 'pushNotification', 'email', 'all' ],
            default: 'all'
        },
        orderNotifications: {
            type: String,
            description: 'orderNotifications',
            enum: [ 'pushNotification', 'email', 'all' ],
            default: 'all'
        },
        offerNotifications: {
            type: String,
            description: 'offerNotifications',
            enum: [ 'pushNotification', 'email', 'all' ],
            default: 'all'
        },
        summaryEmail: {
            type: String,
            description: 'summaryEmail',
            enum: [ 'daily', 'weekly', 'all' ],
            default: 'all'
        },
        locationViewPermission: {
            type: String,
            description: 'locationViewPermission',
            enum: [ 'public', 'followers', 'onlyme' ],
            default: 'onlyme'
        },
        phoneViewPermission: {
            type: String,
            description: 'phoneViewPermission',
            enum: [ 'public', 'followers', 'onlyme' ],
            default: 'onlyme'
        }
    },
    likes: {
        type: [ String ],
        default: []
    },
    following: {
        type: [ String ],
        default: []
    },
    watching: {
        type: [ String ],
        default: []
    },
    likesPost: {
        type: [ String ],
        default: []
    },
    phoneNumber: {
        type: String,
        default: ''
    }
};
