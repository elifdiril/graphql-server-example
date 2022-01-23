const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const {authors, books} = require('./data');

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    surname: String
    books: [Book!]
    age: Int
  }
  
  type Book {
    id: ID!
    title: String!
    author: Author!
    author_id: String! 
    isPublished: Boolean
    score: Float
  }

  type Query {
    books: [Book!]
    book(id: ID): Book!
    authors: [Author!]
    author(id: ID): Author!
  }
`;

const resolvers = {
    Query: {
        books: () => books,
        book: (parent, args) => {
            const data = books.find((book) => book.id === args.id);
            return data;
        },

        authors: () => authors,
        author: (parent, args) => {
            const data = authors.find((author) => author.id === args.id);
            return data;
        }
    },
    Book: {
        author: (parent) => {
            return authors.find((author) => author.id === parent.author_id);
        }
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