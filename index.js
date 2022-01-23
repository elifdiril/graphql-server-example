const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const authors = [{
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
}]

const books = [{
    id: "sdfsdfsdfc23",
    title: 'Çalıkuşu',
    author:authors[0],
    score: 9.8,
    isPublished: true
}];

const typeDefs = gql`

  type Author {
    id: ID!
    name: String!
    surname: String
    age: Int
    books: [Book!]
  }
  
  type Book {
    id: ID!
    title: String!
    author:Author 
    isPublished: Boolean
    score: Float
  }

  type Query {
    books: [Book!]
    book(id: ID): Book!
    authors: [Author!]
  }
`;

const resolvers = {
    Query: {
        books: () => books,
        book: (parent, args) => {
            const data = books.find((book) => book.id === args.id);
            return data;
        },
        authors: () => authors
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