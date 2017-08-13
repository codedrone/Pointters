<<<<<<< HEAD:server/router/user/user.follow.get.router/index.js
const { getuserFollow } = require('../../../controllers/user');
const schema = require('./body-schema');
=======
const { deletepostLike } = require('../../../controllers/post');
const body = require('./body-schema');
const params = require('./params-schema');
>>>>>>> /user GET is updated to return other user:server/router/post/post.like.delete.router/index.js
const validate = require('koa2-validation');
const Router = require('koa-router');
const router = new Router();

<<<<<<< HEAD:server/router/user/user.follow.get.router/index.js
router.get('/user/:followedId/follow', validate({ body: schema }), getuserFollow);
=======
router.delete('/post/:idPost/like', validate({ body, params }), deletepostLike);
>>>>>>> /user GET is updated to return other user:server/router/post/post.like.delete.router/index.js

module.exports = router;
