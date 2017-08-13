module.exports = {
    completedRegistration: Boolean,
    completedRegistrationDate: Date,
    awards: {
        type: String
    },
    password: {
<<<<<<< HEAD
<<<<<<< HEAD
        type: String,
        required: true
=======
        type: String
>>>>>>> the post and comment store is added
=======
        type: String,
        required: true
>>>>>>> the test are fixed
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> the test are fixed
=======
    },
    likesPost: {
        type: [String],
        default: []
>>>>>>> the test are not fixed
    },
    phoneNumber: {
        type: String,
        default: ''
<<<<<<< HEAD
=======
>>>>>>> the post and comment store is added
=======
>>>>>>> the test are fixed
    }
};
