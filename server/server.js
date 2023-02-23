// import {ApolloServer} from '@apollo/server'
import { ApolloServer } from 'apollo-server-express';
import {ApolloServerPluginDrainHttpServer, AppolloServerPluginDrainHttpServer} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { resolvers, typeDefs } from './src/peopleCarsScheme';

const startApolloServer = async(typeDefs,resolvers) =>{

    const app = express()

    const httpServer = http.createServer(app)

  
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins:[ApolloServerPluginDrainHttpServer({httpServer})]
    })

    await server.start()

    server.applyMiddleware({ app })

    await new Promise(resolve => httpServer.listen({port:4000},resolve))

    console.log('Server ready at port 4000')

}

startApolloServer(typeDefs, resolvers)