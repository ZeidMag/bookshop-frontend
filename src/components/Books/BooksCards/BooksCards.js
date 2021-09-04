import React, { Component } from 'react';
import BooksSingleCard from '../BooksSingleCard/BooksSingleCard';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import './BooksCards.css';

export class BooksCards extends Component {
  render() {
    const { bookList } = this.props;
    return (
      <Container maxWidth="lg" className="books-container">
        <Grid container spacing={4} style={{ width: '100%', margin: '0' }}>
          {bookList.map((book) => (
            <BooksSingleCard book={book} key={book.id} />
          ))}
        </Grid>
      </Container>
    );
  }
}

export default BooksCards;
