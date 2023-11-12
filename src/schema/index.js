const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const {GET_ALL_USERS, GET_USER} = require('./Queries/User');
const {CREATE_USER, DELETE_USER, UPDATE_USER, UPDATE_PASSWORD} = require('./Mutation/User');


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getAllUsers: GET_ALL_USERS,
        getUser: GET_USER
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: CREATE_USER,
        deleteUser: DELETE_USER,
        updateUser: UPDATE_USER,
        updatePassword: UPDATE_PASSWORD
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
