const {GraphQLID, GraphQLString,
    GraphQLList, GraphQLSchema,
    GraphQLNonNull} = require('graphql')
    const { GraphQLObjectType } = require('graphql/type');
const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: {type: GraphQLString},
        username: {type: GraphQLString},
        password: {type: GraphQLString},
        groups: {type:GraphQLList(GraphQLString)}
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
        users: {type: GraphQLList},
        messages: {type: GraphQLList}
    }
})
module.exports = {UserType, MessageType, GroupType}