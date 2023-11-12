const {GraphQLString, GraphQLBoolean, GraphQLID} = require('graphql')
const { Usuario } = require('../../Entities/Users')
const UserType = require('../typeDefs/User')

const CREATE_USER = {
    type: UserType,
    args: {
        name: {type: GraphQLString},
        username: {type: GraphQLString},
        password: {type: GraphQLString}
    },
    async resolve(root, args) {
        const {name, username, password} = args
        const result = await Usuario.create({
            name: name,
            username: username,
            password: password
        })
        console.log(result.toJSON())

        return {...args, id: result.dataValues.id}
    }
}

const DELETE_USER = {
    type: GraphQLBoolean,
    args: {
        id: {type: GraphQLID},
    },
    async resolve(root, args){
        const user = await Usuario.findOne({where: {id: args.id}})
        if(!user){
            return false
        }
        else{
            const result = user.destroy()
            console.log(result)
            return true
        }
    }
}

const UPDATE_USER = {
    type: UserType,
    args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        username: {type: GraphQLString},
        password: {type: GraphQLString}
    },
    async resolve(root, args){
        const user = await Usuario.findOne({
            where: {
                id: args.id,
                password: args.password
            }
        })
        if(!user){
            console.log(user)
        }
        else{
            console.log(user)
            user.update(args)
        }
        return user
    }
}

const UPDATE_PASSWORD = {
    type: UserType,
    args: {
        id: {type: GraphQLID},
        old_password: {type: GraphQLString},
        new_password: {type: GraphQLString}
    },
    async resolve(root, args){
        const user = await Usuario.findOne({
            where: {
                id: args.id,
                password: args.old_password
            }
        })
        if(!user){
            console.log(user)
        }
        else{
            console.log(user)
            user.update({password: args.new_password})
        }

        return user
    }
}

module.exports = {CREATE_USER, DELETE_USER, UPDATE_USER, UPDATE_PASSWORD}