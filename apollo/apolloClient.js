import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "isomorphic-unfetch";
import withApollo from "next-with-apollo";

import cookie from "cookie";

import { ApolloProvider } from "@apollo/react-hooks";

const uri = "https://graphbasicserver.azurewebsites.net/graphql";

const httpLink = createHttpLink({ uri, fetch });

const authLink = setContext((_, { headers }) => {
  // Get token from localStorage
  //   const token = JSON.parse(localStorage.getItem("jwt"))
  let cookies;
  if (headers) {
    cookies = cookie.parse(header.cookie || "");
  }

  if (typeof window !== "undefined") {
    cookies = cookie.parse(document.cookie || "");
  }

  const token = (cookies && cookies.token) || "";

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "x-mem": "in-cache"//
    },
  };
});

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache().restore(initialState || {}),
    });
  },
  // {
  //   render: ({ Page, props }) => {
  //     return (
  //       <ApolloProvider client={props.apollo}>
  //         <Page {...props} />
  //       </ApolloProvider>
  //     );
  //   },
  // }
);
