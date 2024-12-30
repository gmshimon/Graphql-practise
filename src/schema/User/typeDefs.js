const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type AuthPayload{
        token:String!
        user: User!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
    }

    type Mutation {
        register(name:String!,email:String!,password:String!):AuthPayload!
        login(email:String!, password:String!): AuthPayload!
    }
`;

module.exports = userTypeDefs;
