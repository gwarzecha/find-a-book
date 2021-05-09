// graphql-tag helps parse client-side tagged template literal statements
import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String! $password: String!) {
   addUser(username: $username, email: $email, password: $password) {
     token
     user {
       _id
       username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($authors: [String], $description: String, $bookId: String!, $image: String, $title: String, $link: String) {
    saveBook(authors: $authors, description: $description, bookId: $bookId, image: $image, title: $title, link: $link) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;