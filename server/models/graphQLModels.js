const {GraphQLID, GraphQLString,
    GraphQLList, GraphQLSchema,
    GraphQLNonNull} = require('graphql')
    const { GraphQLObjectType } = require('graphql/type');
const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: {type: GraphQLString},
        username: {type: GraphQLString},
        password: {type: GraphQLString}
    }
});

const MessageType = new GraphQLObjectType({
    name: "Message",
    fields: {
        id: {type: GraphQLID},
        time: {type: GraphQLString},
        body: {type: GraphQLString},
        senderId: {type: GraphQLString},
        receiverId: {type: GraphQLString}
    }
});

const GroupType = new GraphQLObjectType({
    name: "Group",
    fields: {
        id: {type: GraphQLString},
        groupName: {type:GraphQLString},
        groupPic: {type:GraphQLString},
        users: {type: GraphQLList(UserType)},
        messages: {type: GraphQLList(MessageType)}
    }
})

const ChatType = new GraphQLObjectType({
    name: "Chat",
    fields: {
        id: {type: GraphQLString},
        senderId: {type: GraphQLString},
        receiverId: {type: GraphQLString},
        messages: {type: GraphQLList(MessageType)}
    }
})
module.exports = {UserType, MessageType, GroupType, ChatType}