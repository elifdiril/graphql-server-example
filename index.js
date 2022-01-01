const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const typeDefs = gql`
  
  type Book {
    id: ID!
    title: String
    author: String
    isPublished: Boolean
    score: Float
  }

  type Query {
    books: [Book!]
  }
`;

const resolvers = {
    Query: {
        books: () => [{
            id: "sdfsdfsdfc23",
            title: 'Çalıkuşu',
            author: 'Reşat Nuri Güntekin',
            score: 9.8,
            isPublished: true
        }],
    }
};

const server = new ApolloServer({
    typeDefs, resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
            // options
        })
    ]
});

server.listen().then(({ url }) => console.log(`Apollo server is up to ${url}`));