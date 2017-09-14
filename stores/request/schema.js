const {Schema} = require('mongoose')


module.exports = {
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'user'
    },
    category: {
        type: Object
    },
    createdAt: {
        type: Date, default: new Date()
    },
    isActive: {
        type: Boolean,
        default: true
    },
    location: {
        type: Object
    },
    media: {
        type: Object
    },
    minPrice: {
        type: Number
    },
    maxPrice: {
        type: Number
    },
    scheduleDate: Number,
    updatedAt: {
        type: Date, default: new Date()
    }
};
