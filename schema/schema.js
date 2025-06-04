const {makeExecutableSchema} = require('@graphql-tools/schema');
const {readFileSync} = require('fs');
const path = require('path');
const resolvers = require('../resolvers/resolver');

const typeDefs = readFileSync('./graphql/schema.graphql', 'utf8');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

module.exports = schema;