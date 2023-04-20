import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import Amplify from "@aws-amplify/core";
import config from "./utils/aws-exports";
import { BrowserRouter } from "react-router-dom";
import Router from "./Route";
import Navbar from "./components/menu/Nav.js";
import { useState } from "react";
Amplify.configure(config);

const httpLink = new HttpLink({
  uri: "https://appinionstaging.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "XWRuRUsZ9IHLr9vyfbZG4JlFkFylTg4UqZANQQGt0Udw4hHl4xO6g4E5OE3CnCXK", //TODO react native environment
    Authorization: `Bearer ${"token"}`,
  },
});
const wsLink = new WebSocketLink(
  new SubscriptionClient("wss://appinionstaging.hasura.app/v1/graphql", {
    reconnect: true,
    timeout: 30000,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          "XWRuRUsZ9IHLr9vyfbZG4JlFkFylTg4UqZANQQGt0Udw4hHl4xO6g4E5OE3CnCXK", //TODO react native environment
        Authorization: `Bearer ${"token"}`,
      },
    },
  })
);

// split link for subscription and query operations
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),

  headers: {
    Authorization: `Bearer ${"token"}`,
  },
  link: splitLink,
});

const App = () => {
  const [isLoggedIn, setLogin] = useState(false);

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        {isLoggedIn && <Navbar setLogin={setLogin} />}
        <Router isAuthenticated={isLoggedIn} setLogin={setLogin} />
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
