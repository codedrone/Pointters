module.exports = {
    postservice: require('./service-post'),
    putservice: require('./service-put'),
    deleteservice: require('./service-delete'),
    getservice: require('./service-get'),
    postserviceLike: require('./service-like-post'),
    getserviceLike: require('./service-like-get'),
    deleteserviceLike: require('./service-like-delete'),
    postserviceWatching: require('./service-watching-post'),
    getserviceWatching: require('./service-watching-get'),
    deleteserviceWatching: require('./service-watching-delete'),
    postserviceReview: require('./service-review-post'),
    getserviceReview: require('./service-review-get')
};
