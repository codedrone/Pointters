<<<<<<< HEAD:server/router/service/service.review.post.router/index.js
const { postserviceReview } = require('../../../controllers/service');
const schema = require('./body-schema');
=======
const { deletepostComment } = require('../../../controllers/post');
const body = require('./body-schema');
const params = require('./params-schema');

>>>>>>> /user GET is updated to return other user:server/router/post/post.comment.delete.router/index.js
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
<<<<<<< HEAD:server/router/service/service.review.post.router/index.js
    .post('/service/:serviceId/review', validate({ body: schema }), postserviceReview);
=======
    .delete('/post/:idComment/comment', validate({ body, params }), deletepostComment);
>>>>>>> /user GET is updated to return other user:server/router/post/post.comment.delete.router/index.js

module.exports = router;
