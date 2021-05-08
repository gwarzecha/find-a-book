// imports the gql tagged template func from apollo-server-express
const { gql } = require('apollo-server-express');

// creates typeDefs
const typeDefs = gql`
  type Query {
    users: [User]
    me: User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
    saveBook(
      authors: [String]
      description: String
      bookId: String
      image: String
      title: String
      link: String
    ): User
    removeBook(bookId: String): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;

// exports typeDefs
module.exports = typeDefs;