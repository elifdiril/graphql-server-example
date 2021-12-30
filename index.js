const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
    Query: {
        books: () => [{ title: 'Çalıkuşu', author: 'Reşat Nuri Güntekin'}],
    }
};

const server = new ApolloServer({ typeDefs, resolvers});

server.listen().then(({ url }) => console.log(`Apollo server is up to ${url}`));