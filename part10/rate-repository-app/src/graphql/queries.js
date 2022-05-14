import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query ExampleQuery {
    repositories {
      totalCount
      edges {
        cursor
        node {
          id
          ownerName
          name
          createdAt
          stargazersCount
          reviewCount
          forksCount
          language
          description
          fullName
          ratingAverage
          ownerAvatarUrl
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;
