// imports the gql tagged template func from apollo-server-express
const { gql } = require('apollo-server-express');

// creates typeDefs
const typeDefs = gql`
  type Query {
    helloWorld: String
  }
`;

// exports typeDefs
module.exports = typeDefs;