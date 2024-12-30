const { gql } = require('apollo-server-express')

const productTypeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    quantity: Int!
    description: String!
    category: String!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    addProduct(
      name: String!
      price: Float!
      quantity: Int!
      description: String
      category: String
    ): Product!

    updateProduct(
      id: ID!
      name: String
      price: Float
      quantity: Int
      description: String
      category: String
    ): Product!

    deleteProduct(id: ID!): Boolean
  }
`

module.exports = productTypeDefs
