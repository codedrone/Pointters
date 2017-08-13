<<<<<<< HEAD:server/router/service/service.like.post.router/index.js
const { postserviceLike } = require('../../../controllers/service');
const schema = require('./body-schema');
=======
const { postpostComment } = require('../../../controllers/post');
const body = require('./body-schema');
const params = require('./params-schema');
>>>>>>> /user GET is updated to return other user:server/router/post/post.comment.post.router/index.js
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

<<<<<<< HEAD:server/router/service/service.like.post.router/index.js
router.post('/service/:idService/like', validate({ body: schema }), postserviceLike);
=======
router
    .post('/post/:idPost/comment', validate({ body, params }), postpostComment);
>>>>>>> /user GET is updated to return other user:server/router/post/post.comment.post.router/index.js

module.exports = router;
