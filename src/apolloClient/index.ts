import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_WORDPRESS_URL + '/graphql',
});

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default apolloClient;