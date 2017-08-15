module.exports = {
    completedRegistration: Boolean,
    completedRegistrationDate: Date,
    isActive: {
        type: Boolean,
        default: true
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
    location: {
        type: Object
    },
    phone: {
        type: String
    },
    profilePic: {
        type: String
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
    likes: {
        type: [String],
        default: []
    },
    following: {
        type: [String],
        default: []
    },
    watching: {
        type: [String],
        default: []
    },
    likesPost: {
        type: [String],
        default: []
    },
    phoneNumber: {
        type: String,
        default: ''
    }
};
