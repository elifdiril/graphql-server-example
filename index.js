const { nanoid } = require('nanoid');
const { GraphQLServer, PubSub } = require('graphql-yoga');

const { authors, books } = require('./data');

const typeDefs = `
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

  type DeleteAll {
      count: Int!
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
    deleteAuthor(id: ID!): Author!
    deleteAllAuthors: DeleteAll!

    createBook(data: inputCreateBook!): Book!
    updateBook(id: ID!, data: inputUpdateBook!): Book!
    deleteBook(id: ID!): Book!
    deleteAllBooks: DeleteAll!
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

  input inputUpdateBook {
    title: String! 
    author_id: String! 
    isPublished: Boolean! 
    score: Float!
  }
  
  type Subscription {
      authorCreated: Author!
      authorUpdated: Author!
      authorDeleted: Author!
      allAuthorsDeleted: Int!
  }
`;

const resolvers = {
    Subscription: {
        authorCreated:{
            subscribe: (_, __, {pubsub}) => pubsub.asyncIterator('authorCreated')
        },
        authorUpdated: {
            subscribe: (_, __, {pubsub}) => pubsub.asyncIterator('authorUpdated')
        },
        authorDeleted: {
            subscribe: (_, __, {pubsub}) => pubsub.asyncIterator('authorDeleted')
        },
        allAuthorsDeleted: {
            subscribe: (_, __, {pubsub}) => pubsub.asyncIterator('allAuthorsDeleted')
        }
    },

    Mutation: {
        //author
        createAuthor: (_, { data }, {pubsub}) => {
            const author = {
                id: nanoid(),
                ...data
            }
            authors.push(author);
            pubsub.publish('authorCreated', {authorCreated: author});

            return author;
        },

        updateAuthor: (_, { id, data }, {pubsub}) => {
            const author_index = authors.findIndex(author => author.id === id);

            if (author_index === -1) {
                throw new Error("Author not found!");
            }

            const updatedUser = (authors[author_index] = {
                ...authors[author_index],
                ...data
            });
            pubsub.publish('authorUpdated', {authorUpdated: updatedUser});
            
            return updatedUser;
        },

        deleteAuthor: (_, { id },  {pubsub}) => {
            const author_index = authors.findIndex(author => author.id === id);

            if (author_index === -1) {
                throw new Error("Author not found!");
            }

            const deletedAuthor = authors[author_index];
            authors.splice(author_index, 1);
            pubsub.publish('authorDeleted', {authorDeleted: deletedAuthor});

            return deletedAuthor;
        },

        deleteAllAuthors: () => {
            const count = authors.length;

            authors.splice(0, count);
            pubsub.publish('allAuthorsDeleted', {allAuthorsDeleted: count});

            return { count };
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

        updateBook: (parent, { id, data }) => {
            const book_index = books.findIndex(book => book.id === id);

            if (book_index === -1) {
                throw new Error("Book not found!");
            }

            const updatedBook = (books[book_index] = {
                ...books[book_index],
                ...data
            });

            return updatedBook;
        },

        deleteBook: (parent, { id }) => {
            const book_index = books.findIndex(book => book.id === id);

            if (book_index === -1) {
                throw new Error("Book not found!");
            }

            const deletedBook = books[book_index];
            books.splice(book_index, 1);

            return deletedBook;
        },

        deleteAllBooks: () => {
            const count = books.length;

            books.splice(0, count);

            return { count };
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

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });

server.start(() => console.log('Server is running on http://localhost:4000/'));