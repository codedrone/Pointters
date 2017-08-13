<<<<<<< HEAD:server/router/service/service.get.router/index.js
const { getservice } = require('../../../controllers/service');
const schema = require('./body-schema');
=======
const { postpostLike } = require('../../../controllers/post');
const body = require('./body-schema');
const params = require('./params-schema');
>>>>>>> /user GET is updated to return other user:server/router/post/post.like.post.router/index.js
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

<<<<<<< HEAD:server/router/service/service.get.router/index.js
router.get('/service/:idService', validate({ body: schema }), getservice);
=======
router.post('/post/:idPost/like', validate({ body, params }), postpostLike);
>>>>>>> /user GET is updated to return other user:server/router/post/post.like.post.router/index.js

module.exports = router;
