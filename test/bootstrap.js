const supertest = require('supertest');

const app = require('../server/app');


before(() => {
    global.agent = supertest(app);
});
