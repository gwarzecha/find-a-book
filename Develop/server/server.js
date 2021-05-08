const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
// import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
// imports the middleware function
const { authMiddleware } = require('./utils/auth');
const path = require('path');

const PORT = process.env.PORT || 3005;
const app = express();
// creates a new Apollo server and passes in the schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// integrates the Apollo server w/ the Express app as middleware
server.applyMiddleware({ app });

// check to see if it should be true or false
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
