/* jshint esversion: 11 */

const { root } = require("./caption-resolver");

const resolvers = {
    Query: {
        ...root.Query,
    },
    Mutation: {
        ...root.Mutation,
    },
    Subscription: {
        ...root.Subscription,
    }
};

module.exports = resolvers;
