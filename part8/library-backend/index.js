require("dotenv").config();
const { ApolloServer, gql, UserInputError } = require("apollo-server");
const { authors, books } = require("./mockData");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");

const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;

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
    me: User
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
  }

  type Mutation {
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
`;

const resolvers = {
  Mutation: {
    deleteAll: async () => {
      await Book.deleteMany({});
      await Author.deleteMany({});
      return true;
    },
    addBook: async (_, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const { title, author, published, genres } = args;
      let hasAuthor = await Author.findOne({ name: author });
      console.log("hasauthor", hasAuthor);
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
    editAuthor: async (_, { name, setBornTo }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      const author = await Author.findOne({ name });
      author.born = setBornTo;
      return author.save();
    },
    createUser: (_, args) => {
      const user = new User(args);
      console.log("createuser", user);
      return user.save().catch((error) => {
        throw new UserInputError(error.message, { invalidArgs: args });
      });
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user || password !== "secret") {
        throw new UserInputError("wrong credentials");
      }
      console.log("login", user);
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, SECRET) };
    },
  },
  Query: {
    me: (_, args, ctx) => ctx.currentUser,
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      const { author, genre } = args;
      let hasAuthor;
      if (author) {
        hasAuthor = await Author.findOne({ name: author });
      }

      const booksFilter = {};
      if (hasAuthor) booksFilter.author = hasAuthor.id;
      if (genre) booksFilter.genres = { $in: [genre] };

      return Book.find(booksFilter).populate("author");
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
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), SECRET);
      console.log("decodedtoken", decodedToken);
      const currentUser = await User.findById(decodedToken.id);
      console.log("currentUser", currentUser);
      return { currentUser };
    }
  },
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
