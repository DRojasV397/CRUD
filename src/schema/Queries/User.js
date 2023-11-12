const {GraphQLString, GraphQLList, GraphQLID} = require('graphql')
const {Usuario} = require('../../Entities/Users');
const UserType = require('../typeDefs/User');

const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    async resolve() {
        return await Usuario.findAll();
    }
}

const GET_USER = {
    type: UserType,
    args: {
        id: {type: GraphQLID}
    },
    async resolve(root, args) {
        const user = await Usuario.findOne({where: {id: args.id}})
        if(!user){
            console.log(null)
        }
        else{
            console.log(user.dataValues)
        }
        return user
    }
}

module.exports = {GET_ALL_USERS, GET_USER}
