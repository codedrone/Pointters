module.exports = {
    userId: {
        type: String,
        required: true,
        index: true,
        ref: 'user'
    },
    createdAt:{
        type: Date
    },
    fulfillmentMethod:{
        type:Object
    },
    location:{
        type:Object
    },
    media:{
        type:Object
    },
    price:{
        type:Object
    },
    requestId:{
        type:String,
        required: true
    },
    serviceId:{
        type:String,
        required: true
    },
    updatedAt:{
        type:Date
    },
    workDuration:{
        type:Object
    },
    workDurationUom:{
        type: String,
        enum: [ 'hour', 'day', 'week' ]
    },
};
