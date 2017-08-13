<<<<<<< HEAD:server/router/user/user.opt.post.router/index.js
const { userOpt } = require('../../../controllers/user');
const schema = require('./body-schema');
=======
const { putpost } = require('../../../controllers/post');
const body = require('./body-schema');
const params = require('./params-schema');
>>>>>>> /user GET is updated to return other user:server/router/post/post.put.router/index.js
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

<<<<<<< HEAD:server/router/user/user.opt.post.router/index.js
router.post('/user/opt', validate({ body: schema }), userOpt);
=======
router.put('/post/:idPost', validate({ body, params }), putpost);
>>>>>>> /user GET is updated to return other user:server/router/post/post.put.router/index.js

module.exports = router;
