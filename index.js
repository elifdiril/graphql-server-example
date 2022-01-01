const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const author = {
    id: "1",
    name: "Reşat Nuri",
    surname: "Güntekin",
    books: [{
        id: "erwsedf332",
        title: "Test",
        score: 7,
        isPublished: false
    },
    {
        id: "erwsedf33sd",
        title: "Test 2",
        score: 8,
        isPublished: true
    }]
}

const book = {
    id: "sdfsdfsdfc23",
    title: 'Çalıkuşu',
    author,
    score: 9.8,
    isPublished: true
};

const typeDefs = gql`

  type Author {
    id: ID!
    name: String
    surname: String
    books: [Book!]
  }
  
  type Book {
    id: ID!
    title: String
    author: Author
    isPublished: Boolean
    score: Float
  }

  type Query {
    book: Book
    author: Author
  }
`;

const resolvers = {
    Query: {
        book: () => book,
        author: () => author
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