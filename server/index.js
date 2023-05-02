const { ApolloServer }  = require('apollo-server');
const mongoose = require('mongoose');
const config = require('./config');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: error => { console.log(error);},
});

mongoose.connect(process.env.MONGODB_URL || config.connectionString, {useNewUrlParser: true})
    .then(() => {
        console.log("MongoDB Connected");
        return server.listen({port: 4000});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    });