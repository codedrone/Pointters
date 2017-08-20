const assert = require('assert');

const { create: createService } = require('../../../stores/post');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post/comment POST sohuld create a post given', async() => {
            const post = {
                userId: 'id of user',
                category: {
                    category: 'category'
                },
                description: 'description',
                media: {
                    media: 'media'
                },
                pricing: {
                    pricing: 'pricing'
                },
                fulfillmentMethod: {
                    fulfillmentMethod: 'fulfillmentMethod'
                },
            };
            const postCreated = await createService(post);
            const { body: res } = await agent
                .post(`/post/${postCreated._id}/comment`)
                .send({
                    comment:'comment'
                })
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            assert.deepEqual(res, { success: true });
        });
    });

    describe('FAIL', () => {

    });
});
