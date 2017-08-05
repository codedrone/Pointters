module.exports = {
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
            enum: [ 'pushNotification', 'email', '' ]
        },
        orderNotifications: {
            type: String,
            description: 'orderNotifications',
            enum: [ 'pushNotification', 'email', '' ]
        },
        offerNotifications: {
            type: String,
            description: 'offerNotifications',
            enum: [ 'pushNotification', 'email', '' ]
        },
        summaryEmail: {
            type: String,
            description: 'summaryEmail',
            enum: [ 'daily', 'weekly' ]
        }
    },
    following: {
        type: [ String ],
        default: []
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
};
