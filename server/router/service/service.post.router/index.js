const { postservice } = require('../../../controllers/service');
const schema = require('./body-schema');
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

<<<<<<< HEAD:server/router/service/service.post.router/index.js
router.post('/service', validate({ body: schema }), postservice);
=======
router
    .get('/post/:idPost/comment/:idComment', validate({ body: schema }), getpostComment);
>>>>>>> the test to get comment is ready:server/router/post/post.comment.get.router/index.js

module.exports = router;
