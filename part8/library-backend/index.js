require("dotenv").config();
const { ApolloServer, gql, UserInputError } = require("apollo-server");
const { authors, books } = require("./mockData");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const Author = require("./models/Author");

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected a mongodb");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
  }

  type Mutation {
    deleteAll: Boolean
    addBook(
      title: String
      author: String
      published: Int
      genres: [String]
    ): Book
    editAuthor(name: String, setBornTo: Int): Author
  }

  type Author {
    name: String
    id: ID
    born: Int
    bookCount: Int
  }

  type Book {
    id: ID!
    title: String!
    author: Author
    published: Int!
    genres: [String!]!
  }
`;

const resolvers = {
  Mutation: {
    deleteAll: async () => {
      await Book.deleteMany({});
      await Author.deleteMany({});
      return true;
    },
    addBook: async (_, args) => {
      const { title, author, published, genres } = args;
      let hasAuthor = await Author.findOne({ name: author });
      console.log(hasAuthor);
      try {
        if (!hasAuthor) {
          hasAuthor = await new Author({ name: author }).save();
        }
        const newBook = await new Book({
          title,
          published,
          genres,
          author: hasAuthor.id,
        }).save();
        return newBook.populate("author");
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (_, { name, setBornTo }) => {
      const author = await Author.findOne({ name });
      author.born = setBornTo;
      return author.save();
    },
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      const { author, genre } = args;
      const books = await Book.find({}).populate("author");
      console.log(books);
      return books;
      // return Book.find({});
    },
    allAuthors: async () => {
      return await Author.find({});
    },
  },
  Author: {
    bookCount: (root, args) => {
      return books.filter((book) => book.author === root.name).length;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
