
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const API_URL = process.env?.WORDPRESS_API_URL ? process.env?.WORDPRESS_API_URL : process.env?.NEXT_PUBLIC_WORDPRESS_URL;

const headers = { 
    'Content-Type': 'application/json',
}

if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
        'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
}

export const client = new ApolloClient({
    link: new HttpLink({
        uri: API_URL,
        credentials: "include",
        headers,
    }),
    cache: new InMemoryCache()
});