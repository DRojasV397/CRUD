const {GraphQLString} = require('graphql')

module.exports = {
    type: GraphQLString,
    resolve: () => 'Hello Word'
}