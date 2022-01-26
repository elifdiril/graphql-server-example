const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { nanoid } = require('nanoid');

const { authors, books } = require('./data');

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    surname: String
    books(filter: String): [Book!]
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
    authors: [Author]
    author(id: ID): Author!
  }

  type Mutation {
    createAuthor(data: inputCreateAuthor!): Author!
    updateAuthor(id: ID!, data: inputUpdateAuthor!): Author!

    createBook(data: inputCreateBook!): Book!
  }

  input inputCreateAuthor{ 
      name: String!
      surname: String! 
      age: Int! 
  }

  input inputUpdateAuthor{ 
    name: String
    surname: String 
    age: Int
}

  input inputCreateBook {
    title: String! 
    author_id: String! 
    isPublished: Boolean! 
    score: Float!
  }
  
`;

const resolvers = {
    Mutation: {
        //author
        createAuthor: (parent, {data}) => {
            const author = {
                id: nanoid(), 
                ...data
            }
            authors.push(author);
            return author;
        },

        updateAuthor: (parent, {id, data}) => {
            const author_index = authors.findIndex(user => user.id === id);

            if(author_index === -1){
                throw new Error("User not found!");
            }

            const updatedUser = (authors[author_index] = {
                ...authors[author_index],
                ...data
            });

            return updatedUser;
        },


        //book
        createBook: (parent, { data }) => {
            const book = {
                id: nanoid(), 
                ...data
            }
            books.push(book);
            return book;
        },
    },

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
        author: (parent) => authors.find((author) => author.id === parent.author_id)

    },
    Author: {
        books: (parent, args) => {
            let filtered = books.filter((book) => book.author_id === parent.id);

            if (args.filter) {
                filtered = filtered.filter((book) => book.title.toLowerCase().startsWith(args.filter.toLowerCase()));
            }

            return filtered;
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