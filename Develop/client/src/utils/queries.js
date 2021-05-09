// graphql-tag helps parse client-side tagged template literal statements
import gql from 'graphql-tag';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
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
`