const assert = require('assert');

const { create: createService } = require('../../../stores/service');


describe('User services', () => {
    describe('SUCCESS', () => {
        it('/service/share POST sohuld create a service given', async() => {
            const service = {
                userId: 'id of user',
                category: {
                    category: 'category'
                },
                description: 'description',
                shared: {
                    originUser: __user._id
                }
            };
            const serviceCreated = await createService(service);
            console.log('serviceCreated ', serviceCreated);
            const { body: res } = await agent.get(`/service/${serviceCreated._id}/share`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepStrictEqual(res.service.category, service.category);
            assert.deepStrictEqual(res.service.shared, service.shared);
            assert(res.service.isActive);
        });
    });

    describe('FAIL', () => {

    });
});
