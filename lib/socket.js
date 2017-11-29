const IO = require('koa-socket.io');
const redis = require('redis');

const { redis: redisConfig } = require('../config');
const { findOne: findOneConversation, create: createConversation } = require('../stores/conversation');
const { create: createMessage } = require('../stores/message');
const { create: createOffer } = require('../stores/offer');

const io = new IO({ namespace: '/' });
const options = {};

module.exports = (server) => {
    let client = '';
    var chatters = [];

    client = redis.createClient(redisConfig);

    client.once('ready', function () {
        client.get('users', function (err, reply) {
            if (reply) {
                chatters = JSON.parse(reply);
            }
        });
    });

    io.start(server, options)

    io.on('connect', async (ctx, next) => {
        const socket = ctx.socket;
        let addedUser = false;
        let conversationId = null;

        socket.on('create-conversation', async (ctx) => {
            if(typeof ctx.data ==='string') {
                return;
            }

            const conversation = await findOneConversation({ users: ctx.data } );

            if(conversation) {
                conversationId = conversation._id;

                socket.broadcast('create-conversation', {
                    conversationId: conversation._id
                });
            } else {
                const newConversation = await createConversation({ users: ctx.data });

                if (!newConversation || newConversation.error)
                    ctx.throw(404, "Error conversation create");

                conversationId = newConversation._id;

                chatters.push('chat' + newConversation._id);

                client.set('users', JSON.stringify(chatters));

                socket.broadcast('create-conversation', {
                    conversationId: newConversation._id
                });
            }
        });

        socket.on('chat-message', async (ctx) => {
            let message = {};
            let offerId = null;

            if(ctx.data.offer) {
                const newOffer = await createOffer(ctx.data.offer);

                if(newOffer)
                    offerId = newOffer._id;
            }

            message.userId = ctx.data.fromUser;
            message.conversationId = conversationId;
            message.messageText = ctx.data.message;
            message.media = ctx.data.media;
            message.serviceId = ctx.data.serviceId;
            message.offerId = offerId;

            const newMessage = await createMessage( message );

            socket.broadcast('chat-message', {
                message: ctx.data.message
            });
        });
    });
};

