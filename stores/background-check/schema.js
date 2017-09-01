module.exports = {
    userId: {
        type: String,
        required: true,
        index: true,
        ref: 'user'
    },
    updatedAt: {
        type: Date
    },
    createdAt: {
        type: Date
    },
    firstName: String,
    middleName: String,
    lastName: String,
    email: String,
    phone: String,
    zipcode: String,
    dob: Date,
    ssn:String,
    driverLicenseNumber: String,
    driverLicenseState: String
};
