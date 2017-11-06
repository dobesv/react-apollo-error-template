import "./index.css";

import React from "react";
import { render } from "react-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

import { link } from "./graphql/link";
import App from "./App";
import QUERY from "./query";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});


client.query({ query: QUERY }).then(console.log('query 1 - this should make a network request')); // first query

client.query({ query: QUERY }).then(console.log('query 2 - this should not make a network request since query dedup is not set to false')); // second query

// App also makes the same query a 3rd time.
render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
