const { gql } = require('apollo-server-express');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { mergeResolvers } = require('@graphql-tools/merge');

const userTypeDefs = require('./User/typeDefs');
const productTypeDefs = require('./Product/typeDefs');

const userResolvers = require('./User/resolvers');
const productResolvers = require('./Product/resolvers');

const typeDefs = mergeTypeDefs([userTypeDefs, productTypeDefs])
const resolvers = mergeResolvers([userResolvers, productResolvers]);

module.exports = {
    typeDefs,
    resolvers,
}