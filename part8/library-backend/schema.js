const { gql } = require("apollo-server");

const typeDefs = gql`
  type Subscription {
    bookAdded: Book!
  }

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
    bookCount: [Book]
  }

  type Book {
    id: ID!
    title: String!
    author: Author
    published: Int!
    genres: [String!]!
  }

  type User {
    username: String
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }
`;

module.exports = typeDefs;
