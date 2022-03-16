const { ApolloServer, gql } = require("apollo-server");
const { authors, books } = require("./mockData");

const typeDefs = gql`
  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
  }

  type Mutation {
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
    id: ID
    title: String
    author: String
    published: Int
    genres: [String]
  }
`;

const resolvers = {
  Mutation: {
    addBook: (_, args) => {
      const haveAuthor = authors.some((author) => author.name === args.author);
      if (!haveAuthor) {
        authors.push({ name: args.author, born: null, id: args.author });
      }
      const newBook = { ...args, id: args.title };
      books.push(newBook);
      return newBook;
    },
    editAuthor: (_, args) => {
      const { name, setBornTo } = args;
      let editAuthor = null;
      for (const author of authors) {
        if (author.name === name) {
          author.born = setBornTo;
          editAuthor = author;
          break;
        }
      }
      return editAuthor;
    },
  },
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (_, args) => {
      const { author, genre } = args;
      if (!author && !genre) return books;
      if (author && genre) {
        return books
          .filter(
            (book) =>
              book.author.includes(author) || book.genres.includes(genre)
          )
          .map((book) => {
            if (book.author.includes(author) || book.genres.includes(genre)) {
              return book;
            }
          });
      }
      const bookKey = author ? "author" : "genres";
      const bookFilter = author || genre;
      return books
        .filter((book) => book[bookKey].includes(bookFilter))
        .map((book) => {
          if (book[bookKey].includes(bookFilter)) {
            return book;
          }
        });
    },
    allAuthors: () => authors,
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
