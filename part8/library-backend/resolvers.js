const { UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const SECRET = process.env.SECRET;
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
      const newBook = new Book({
        title,
        published,
        genres,
        author: hasAuthor ? hasAuthor.id : undefined,
      });

      try {
        if (!hasAuthor) {
          hasAuthor = await new Author({ name: author }).save();
        }
        await newBook.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      pubsub.publish("BOOK_ADDED", { bookAdded: newBook });
      return newBook.populate("author");
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
      return user.save().catch((error) => {
        throw new UserInputError(error.message, { invalidArgs: args });
      });
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user || password !== "secret") {
        throw new UserInputError("wrong credentials");
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
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
      return await Author.find({}).populate("bookCount");
    },
  },
  // Author: {
  //   bookCount: (root, args) => {
  //     console.log("bookcount");
  //     return Book.collection.countDocuments({ author: root._id });
  //   },
  // },
};

module.exports = resolvers;
