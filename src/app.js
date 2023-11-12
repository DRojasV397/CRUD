const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/graphql", graphqlHTTP({
    graphiql: true,
    schema
}));

module.exports = app

