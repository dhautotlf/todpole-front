import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import Config from '../config';
import { setContext } from 'apollo-link-context';

import AuthHeader from '../authHeader';

const authLink = setContext(async (req, { headers }) => {
  const authHeader = AuthHeader.getInstance().getHeader();
  return {
    headers: {
      ...headers,
      ...authHeader,
    },
  };
});

/**
 * Apollo client: Handles graphql api requests
 */
const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: Config.graphApiUrl,
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});

export default client;
