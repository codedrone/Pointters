const assert = require('assert');

const proxyquire = require('proxyquire');

const bodyParsed = {};
const authToken = {};


describe('delete email bounced', () => {
    describe('Success', () => {
        it('should call the request with correct params', async() => {
            const error = null;
            const response = {body:{}, error: null};
            const pathStub = {
                'request':(opt, cb) => {
                    console.log('opt =', opt);
                    assert.deepStrictEqual(opt.auth.user, authToken);
                    cb(error, response);
                },
                '../../lib/parse-body':(body) => {
                    assert(body);
                    return bodyParsed;
                },
                '../../config': { checkr: { authToken } }
            };

            const client = proxyquire('../../../../services/checkr/client.js', pathStub);
            const options = {};
            const res = await client(options);
            assert.deepStrictEqual(res, response.body);
        });

        it('should call the request with correct params', async() => {
            const error = {};
            const response = {body:{}, error: null};
            const pathStub = {
                'request':(opt, cb) => {
                    console.log('opt =', opt);
                    assert.deepStrictEqual(opt.auth.user, authToken);
                    cb(error, response);
                },
                '../../lib/parse-body':(body) => {
                    assert(body);
                    return bodyParsed;
                },
                '../../config': { checkr: { authToken } }
            };

            const client = proxyquire('../../../../services/checkr/client.js', pathStub);
            const options = {};
            const errorReturned = await client(options).catch((error) => error);
            assert.deepStrictEqual(errorReturned, error);
        });

        it('should call the request with correct params', async() => {
            const error = null;
            const response = {body:{}, error: {}};
            const pathStub = {
                'request':(opt, cb) => {
                    console.log('opt =', opt);
                    assert.deepStrictEqual(opt.auth.user, authToken);
                    cb(error, response);
                },
                '../../lib/parse-body':(body) => {
                    assert(body);
                    return bodyParsed;
                },
                '../../config': { checkr: { authToken } }
            };

            const client = proxyquire('../../../../services/checkr/client.js', pathStub);
            const options = {};
            const {error:errorReturned} = await client(options);
            assert.deepStrictEqual(errorReturned, response.error);
        });
    });
});
