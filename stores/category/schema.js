const {schema: subCategories} = require('./sub-schema/sub-category');

module.exports = {
    userId: {
        type: String,
        required: true,
        index: true,
        ref: 'user'
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    keywords: [ String ],
    name: {
        type: String,
        required: true,
        unique:true
    },
    subCategories: [ subCategories ]
};
