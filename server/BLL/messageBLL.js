const {GraphQLID, GraphQLString,
    GraphQLList, GraphQLType, GraphQLSchema,
    GraphQLNonNull, GraphQLObjectType} = require('graphql');
const { UserType } = require('../models/graphQLModels');
const UserModel = require('../models/userModel');
const {MessageType} = require('../models/graphQLModels');
const MessageModel = require('../models/messageModel');