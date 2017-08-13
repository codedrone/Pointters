<<<<<<< HEAD:server/router/user/login.router/index.js

const { userlogin } = require('../../../controllers/user');
=======
const { deletepost } = require('../../../controllers/post');
const body = require('./body-schema');
const params = require('./params-schema');
>>>>>>> /user GET is updated to return other user:server/router/post/post.delete.router/index.js
const validate = require('koa2-validation');
const schema = require('./body-schema');
const Router = require('koa-router');
const router = new Router();

<<<<<<< HEAD:server/router/user/login.router/index.js
router.post('/user/login', validate({ body: schema }), userlogin);
=======
router.delete('/post/:idPost', validate({ body, params }), deletepost);
>>>>>>> /user GET is updated to return other user:server/router/post/post.delete.router/index.js

module.exports = router;
