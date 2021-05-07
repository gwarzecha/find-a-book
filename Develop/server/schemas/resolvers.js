const { AuthenticationError } = require('apollo-server-errors');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password');

        return userData;
      }

      throw new AuthenticationError('You are not logged in!');
    },
    // get all users
    users: async () => {
      return User.find()
        .select('-__v -password');
    }
  }
  // mutation resolvers here
};


module.exports = resolvers;