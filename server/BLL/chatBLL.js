const mongoose = require('mongoose');
const {GraphQLID, GraphQLString,
    GraphQLList, GraphQLType, GraphQLSchema,
    GraphQLNonNull, GraphQLObjectType, GraphQLInputObjectType} = require('graphql');
const { ChatType, MessageType } = require('../models/graphQLModels');
const ChatModel = require('../models/chatModel');

const MessageInputType = new GraphQLInputObjectType({
    name: 'MessageInput',
    fields: {
      id: { type: GraphQLID },
      time: { type: GraphQLString },
      body: { type: GraphQLString },
      senderId: { type: GraphQLString },
}});
const chatObjectType = new GraphQLInputObjectType({
    name: 'ChatObject',
    fields: {
        senderId: { type: GraphQLString },
        recerverId: { type: GraphQLString },
        messages: {type: GraphQLList(MessageInputType)}
    }
});

const chatSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            //Query #1
            getAllChats: {
                type: GraphQLList(ChatType),
                resolve: (root, args, context, info) => {
                    return ChatModel.find().populate({path: 'messages', select: 'time body senderId'})
                }
            },
            //Query #2
            getChatByID: {
                type: ChatType,
                args: {id: {type: GraphQLNonNull(GraphQLID)}},
                resolve: (root, args, context, info) => {
                    console.log(args.id);
                    return ChatModel.findById(args.id);
            }
        },
        //Query #3
        getChatsByUserID: {
            type: GraphQLList(ChatType),
            args: {id: {type: GraphQLString}},
            resolve: async (root, args, context, info) => {
                console.log(args.id);
                const data = await ChatModel.find()
                .populate({path: 'senderId', select: 'id username'})
                .populate({path: 'receiverId', select: 'id username'})
                .populate({path: 'messages', select: 'id time body senderId'});
                console.log(data);
                return data;
                }
            },
        }
    }
    ),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: {
            addChat: {
                type: ChatType,
                args: {
                    senderId: {type: GraphQLString},
                    receiverId: {type: GraphQLString},
                    messages: {type: GraphQLList(GraphQLString)}
                },
                resolve: (root, args, context, info) => {
                    var newChat = new ChatModel(args);
                    return newChat.save();
                }
            },
            updateChat: { 
                type: ChatType,
                args: {
                    id: {type: GraphQLNonNull(GraphQLString)},
                    chat: {type: chatObjectType},
                },
                resolve: (root, args, context, info) => {
                    const messages = args.chat.messages ? args.chat.messages.map((msgId) => new mongoose.Types.ObjectId(msgId)) : [];
                    const chatId = new mongoose.Types.ObjectId(args.id);
                    return ChatModel.findByIdAndUpdate(
                        chatId,
                        {...args.chat, messages},
                        { new: true }
                    );
                }
            }
        }
    })
})
module.exports = chatSchema;