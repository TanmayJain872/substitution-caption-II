/* jshint esversion: 11 */

// const { gql } = require("apollo-server-express");

const typeDefs = `

    type Player {
        id: ID!
        playerNumber: Int!
        name: String!
        createdBy: Int
        updatedBy: Int
        createdAt: String
        updatedAt: String
    }

    type Caption {
        id: ID!
        playerOut: String!
        numberOut: Int!
        playerIn: String!
        numberIn: Int!
        time: String
        createdBy: Int
        updatedBy: Int
        createdAt: String
        updatedAt: String
    }

    type Query {
        players: [Player]
        captions: [Caption]
        getPlayerById(id: ID!): Player
        getCaptionById(id: ID!): Caption
    }

    # Mutations to create, update and delete data
    type Mutation {
        addPlayer(playerNumber: Int!, name: String!): Player
        updatePlayer(id: ID!, name: String, playerNumber: Int): Player
        deletePlayer(id: ID!): String

        addCaption(
            playerOut: String!,
            numberOut: Int!,
            playerIn: String!,
            numberIn: Int!,
            time: String!
        ): Caption

        updateCaption(
            id: ID!,
            playerOut: String!,
            numberOut: Int!,
            playerIn: String!,
            numberIn: Int!,
            time: String!
        ): Caption

        deleteCaption(id: ID!): String
    }

    # Subscription
    type Subscription {
        captionAdded: Caption
    }
`;

module.exports = typeDefs;
