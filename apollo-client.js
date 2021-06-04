
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://graphqlcrud.herokuapp.com",
    cache: new InMemoryCache(),
});

export { client};