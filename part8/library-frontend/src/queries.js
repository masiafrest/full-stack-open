import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query ($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      id
      title
      author
      published
      genres
    }
  }
`;
