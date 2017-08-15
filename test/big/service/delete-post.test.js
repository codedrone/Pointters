const assert = require('assert');

const { findOne, create } = require('../../../stores/post');


describe('User posts', () => {
    describe('SUCCESS', () => {
        it('/post DELETE sohuld create a post given', async () => {
            const body = {
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
            const postCreated = await create(body);
            console.log('postCreated : ', postCreated);
            await agent.delete(`/post/${postCreated._id}`)
                .set(authorizationHeader)
                .set(Cookie)
                .expect(200);
            const deleted = await findOne({ _id: postCreated._id });
            console.log('deleted ', deleted);
            assert(!deleted.isActive);
        });
    });

    describe('FAIL', () => {

    });
});
