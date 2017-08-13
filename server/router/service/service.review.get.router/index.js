const { getserviceReview } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
<<<<<<< HEAD:server/router/service/service.review.get.router/index.js
    .get('/service/:reviewId/review', validate({ body: schema }), getserviceReview);
=======
    .delete('/post/:idComment/comment', validate({ body: schema }), deletepostComment);
>>>>>>> the test are not fixed:server/router/post/post.comment.delete.router/index.js

module.exports = router;
