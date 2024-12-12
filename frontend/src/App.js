/* jshint esversion: 11 */

// import './App.css';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  split,
  HttpLink,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import SubstitutionCaption from './components/SubstitutionCaption';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
  }
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});


// client
//     .query({
//         query: gql`
//             query GetPlayers {
//                 players {
//                     id
//                     name
//                     playerNumber
//                 }
//             }
//         `,
//     })
//     .then((result) => console.log(result));


function App() {

  return (
    <ApolloProvider client={client}>
      <div className="App" style={{ textAlign: "center" }}>
        <h2>SUBSTITUTION CAPTION APP</h2>
        <br />
        <SubstitutionCaption />
      </div>
    </ApolloProvider>
  );
}

export default App;
