<<<<<<< HEAD:server/router/service/service.watch.get.router/index.js
const { getserviceWatching } = require('../../../controllers/service');
const schema = require('./body-schema');
=======
const { getpostComment } = require('../../../controllers/post');
const body = require('./body-schema');
const params = require('./params-schema');
>>>>>>> /user GET is updated to return other user:server/router/post/post.comment.get.router/index.js
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

router
<<<<<<< HEAD:server/router/service/service.watch.get.router/index.js
    .get('/service/:idService/watch', validate({ body: schema }), getserviceWatching);
=======
    .get('/post/:idPost/comment/:idComment', validate({ body, params }), getpostComment);
>>>>>>> /user GET is updated to return other user:server/router/post/post.comment.get.router/index.js

module.exports = router;
