<<<<<<< HEAD:server/router/user/signup.router/index.js
const { usersignup } = require('../../../controllers/user');
const schema = require('./body-schema');
=======
const { getpostLike } = require('../../../controllers/post');
const body = require('./body-schema');
const params = require('./params-schema');
>>>>>>> /user GET is updated to return other user:server/router/post/post.like.get.router/index.js
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

<<<<<<< HEAD:server/router/user/signup.router/index.js
router.post('/user/signup', validate({ body: schema }), usersignup);
=======
router.get('/post/:idPost/like', validate({ body, params }), getpostLike);
>>>>>>> /user GET is updated to return other user:server/router/post/post.like.get.router/index.js

module.exports = router;
