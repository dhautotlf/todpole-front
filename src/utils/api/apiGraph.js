import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import Config from '../config';
import { setContext } from 'apollo-link-context';
//import store from '../../store';

const authLink = setContext(async (req, { headers }) => {
  // const { session } = await store.getState();
  //
  // const authHeader = session.userToken
  //   ? {
  //       Authorization: `Bearer ${session.userToken}`,
  //     }
  //   : {};
  return {
    headers: {
      ...headers,
      //...authHeader,
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
