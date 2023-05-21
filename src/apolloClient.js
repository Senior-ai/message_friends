import { ApolloClient, InMemoryCache } from '@apollo/client';

export const createApolloClient = (uri) => {
  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });
};
