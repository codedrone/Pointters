const Promise = require('bluebird');
const { map } = require('lodash');
const { findOne: findOneConversation, update: updateConversation } = require('../../../stores/conversation');
const { create: createMessage } = require('../../../stores/message');
const { findOne: fineOneUser } = require('../../../stores/user');
const { Types:{ObjectId} } = require('../../../databases/mongo');
const IO = require('koa-socket.io');

//socket'io listener cb
//register it in /lib/socket.js
module.exports =  async (d, socket)=>{
    const message = (typeof d === 'string')?JSON.parse(d):d;
    if(!message)
      return socket.emit("message_error",{error: "invalid message body"});

    //validate conversationId
    if(!message.conversationId) return socket.emit("message_error",{error: "invalid conversationId"});
    const conversation = await findOneConversation({ _id: ObjectId(message.conversationId) });
    if(!conversation) return socket.emit("message_error",{error: "invalid conversationId"});

    //validate userId
    if(!message.userId) return socket.emit("message_error",{error: "invalid userId"});
    const user = await fineOneUser({ _id: ObjectId(message.userId) });
    if(!user) return socket.emit("message_error",{error: "invalid userId"});

    //create message
    const newMessage = await createMessage(message);
    if (!newMessage || newMessage.error) return socket.emit("message_error","Error message create");

    //if messageText is blank then default messageText by action
    let messageActionText = !message.messageText?"":message.messageText;
    if(!message.messageText){
      if(message.media && message.media.length>0 && message.media[0].mediaType) messageActionText="sent a "+message.media[0].mediaType;
      else if(message.serviceId) messageActionText="sent a service";
      else if(message.offerId) messageActionText="sent an offer";
      else if(message.requestId) messageActionText="sent a request";
    }

    //update conversation
    const updatedConversation = await updateConversation({ _id:message.conversationId },
      {
        lastMessage: {
          time: newMessage.createdAt,
          firstName: user.firstName,
          lastName: user.lastName,
          message: messageActionText,
          userId: message.userId
        }
      }
    );
<<<<<<< HEAD
    console.log('updatedConversation ',updatedConversation);
=======
>>>>>>> develop/ling

    //send message to conversation room
    return socket.to(message.conversationId).emit("message",newMessage);

  }
