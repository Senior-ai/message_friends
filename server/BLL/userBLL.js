const {GraphQLID, GraphQLString,
    GraphQLList, GraphQLType, GraphQLSchema,
    GraphQLNonNull, GraphQLObjectType, GraphQLInputObjectType} = require('graphql');
const { UserType } = require('../models/graphQLModels');
const UserModel = require('../models/userModel');
const mongoose = require('mongoose');

const userObjectType = new GraphQLInputObjectType({
    name: 'UserObject',
    fields: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    }
});

const userSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            //Query #1
            getAllUsers: {
                type: GraphQLList(UserType),
                resolve: (root, args, context, info) => {
                    return UserModel.find().exec();
                }
            },
            //Query #2
            getUserByID: {
                type: UserType,
                args: {id: {type: GraphQLNonNull(GraphQLID)}},
                resolve: (root, args, context, info) => {
                    console.log(args.id);
                    return UserModel.findById(args.id);
            }
        },
            verifyUser: {
                type: GraphQLList(UserType),
                args: {
                    username: {type: GraphQLString},
                    password: {type: GraphQLString}},
                resolve: (root, args, context, info) => {
                    return UserModel.find({'username': args.username, 'password': args.password}).exec();
                }

            }
    }
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: {
            addUser: {
                type: UserType,
                args: {
                    username: {type: GraphQLString},
                    password: {type: GraphQLString}
                },
                resolve: (root, args, context, info) => {
                    var newUser = new UserModel(args);
                    console.log(newUser);
                    return newUser.save();
                }
            },
            updateUser: { 
                type: UserType,
                args: {
                    id: {type: GraphQLNonNull(GraphQLString)},
                    user: {type: userObjectType},
                },
                resolve: (root, args, context, info) => {
                    const groups = args.user.groups ? args.user.groups.map((groupId) => new mongoose.Types.ObjectId(groupId)) : [];
                    const userId = new mongoose.Types.ObjectId(args.id);
                    return UserModel.findByIdAndUpdate(
                        userId,
                        {...args.user, groups},
                        { new: true }
                    );
                }
            }
        }
    })
})
module.exports = userSchema;