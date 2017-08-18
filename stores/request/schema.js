module.exports = {
    userId: {
        type: String,
        required: true,
        index: true,
        ref: 'user'
    },
    category:{
        type: Object
    },
    createdAt:{
        type: String
    },
    location:{
        type: Object
    },
    media:{
        type: Object
    },
    minPrice:{
        type: Number
    },
    maxPrice:{
        type: Number
    },
    requestId:{
        type: Number
    },
    scheduleDate:{
        type: Number
    },
    updatedAt:{
        type: String
    }
};
