const {GraphQLID, GraphQLString,
    GraphQLList, GraphQLType, GraphQLSchema,
    GraphQLNonNull, GraphQLObjectType, GraphQLInputObjectType} = require('graphql');
const { UserType, GroupType } = require('../models/graphQLModels');
const UserModel = require('../models/userModel');
const mongoose = require('mongoose');
const GroupModel = require('../models/groupModel');

const groupObjectType = new GraphQLInputObjectType({
    name: 'GroupObject',
    fields: {
        groupName: { type: GraphQLString },
        groupPic: { type: GraphQLString },
        users: {type: GraphQLList(GraphQLNonNull(GraphQLString))},
        messages: {type: GraphQLList(GraphQLNonNull(GraphQLString))}
    }
});
const groupSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            //Query #1
            getAllGroups: {
                type: GraphQLList(GroupType),
                resolve: (root, args, context, info) => {
                    return GroupModel.find();
                }
            },
            //Query #2
            getGroupByID: {
                type: GroupType,
                args: {id: {type: GraphQLNonNull(GraphQLID)}},
                resolve: (root, args, context, info) => {
                    console.log(args.id);
                    return GroupModel.findById(args.id);
            }
        },
    }
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: {
            addGroup: {
                type: GroupType,
                args: {
                    groupName: {type: GraphQLString},
                    groupPic: {type: GraphQLString},
                    users: {type: GraphQLList(GraphQLID)},
                    messages: {type: GraphQLList(GraphQLID)}
                },
                resolve: (root, args, context, info) => {
                    var newGroup = new GroupModel(args);
                    console.log(newGroup);
                    return newGroup.save();
                }
            },
            updateGroup: { 
                type: GroupType,
                args: {
                    id: {type: GraphQLNonNull(GraphQLString)},
                    group: {type: groupObjectType},
                },
                resolve: (root, args, context, info) => {
                    const users = args.group.users ? args.group.users.map((userId) => new mongoose.Types.ObjectId(userId)) : [];
                    const messages = args.group.messages ? args.group.messages.map((msgId) => new mongoose.Types.ObjectId(msgId)) : [];
                    const groupId = new mongoose.Types.ObjectId(args.id);
                    return GroupModel.findByIdAndUpdate(
                        groupId,
                        {...args.group, users, messages},
                        { new: true }
                    );
                }
            }
        }
    })
})
module.exports = groupSchema;