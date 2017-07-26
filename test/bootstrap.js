const supertest = require('supertest');

const app = require('../server');


before(() => {
    global.agent = supertest(app);
});
