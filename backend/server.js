/* jshint esversion: 11 */

import {} from "dotenv/config";
import express from "express";
import { createServer } from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import bodyParser from "body-parser";
import cors from "cors";


import typeDefs from "./schemas/type-defs.js";
import resolvers from "./resolvers/index.js";

const PORT = process.env.PORT || 5000;
const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use(cors());
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
});

const wsServerCleanup = useServer({ schema }, wsServer);

const apolloServer = new ApolloServer({
    schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await wsServerCleanup.dispose();
                    }
                };
            }
        }
    ]
});

await apolloServer.start();

app.use("/graphql", bodyParser.json(), expressMiddleware(apolloServer));


httpServer.listen(PORT, () => {
    console.log(`Query Endpoint ready at http://localhost:${PORT}/graphql`);
    console.log(`Subscription Endpoint ready at ws://localhost:${PORT}/graphql`);
});
