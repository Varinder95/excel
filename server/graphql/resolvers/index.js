const usersResolvers = require('./users');
const dataResolvers = require('./data');
const uploadsResolvers = require('./uploads');

module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...dataResolvers.Query,
        ...uploadsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...dataResolvers.Mutation,
        ...uploadsResolvers.Mutation
    },
};