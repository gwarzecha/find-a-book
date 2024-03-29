import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';

import Auth from '../utils/auth';

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);
  // if there is me data within the GET_ME mutation, set that to user, otherwise 
  //user is an empty array
  const user = data?.me || [];
  const [userData, setUserData] = useState({ user });
  const loggedIn = Auth.loggedIn();

  const getUserData = async (userData) => {
    if (userData) setUserData(userData)
  }
  useEffect(() => {
    getUserData(user);
  });

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    // const token = Auth.loggedIn() ? Auth.getToken() : null;
    // if (!token) {
    //   return false;
    // }

    try {
      const updatedUser = await removeBook({
        variables: { bookId }
      });

      if (updatedUser) {
        setUserData(updatedUser);
        // upon success, remove book's id from localStorage
        removeBookId(bookId);
      }
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Here are { `${user.username}'s` } saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {loggedIn && userData?.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {loading && "Loading your books"}
          {!loading && userData && userData.savedBooks && userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
