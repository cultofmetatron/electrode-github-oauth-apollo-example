import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
  fetch: fetch
});


const createClient = ({token}) => {
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    //const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return client;
}

export default createClient;