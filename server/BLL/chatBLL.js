const {GraphQLID, GraphQLString,
    GraphQLList, GraphQLType, GraphQLSchema,
    GraphQLNonNull, GraphQLObjectType, GraphQLInputObjectType} = require('graphql');
const { ChatType } = require('../models/graphQLModels');
const ChatModel = require('../models/userModel');
const mongoose = require('mongoose');

const chatObjectType = new GraphQLInputObjectType({
    name: 'ChatObject',
    fields: {
        senderId: { type: GraphQLString },
        recerverId: { type: GraphQLString },
        messages: {type: GraphQLList(GraphQLNonNull(GraphQLString))}
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
                    return ChatModel.find().exec();
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
            args: {id: {type: GraphQLNonNull(GraphQLID)}},
            resolve: (root, args, context, info) => {
                console.log(args.id);
                try {
                    return ChatModel.find({$or: [{senderId: args.id}, {receiverId: args.id}]});
                } catch (error) {
                    console.error(error);
                    throw new Error('Failed to fetch chats by UserID');
                }
            }
        }
    }
    }),
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
                    console.log(newChat);
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