const {GraphQLString, GraphQLList, GraphQLID} = require('graphql')
const {Usuario} = require('../../Entities/Users');
const UserType = require('../typeDefs/User');

const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    async resolve() {
        const users = await Usuario.findAll()
        console.log(users)
        return users;
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
            console.log(user)
        }
        else{
            console.log(user.dataValues)
        }
        return user
    }
}

module.exports = {GET_ALL_USERS, GET_USER}
