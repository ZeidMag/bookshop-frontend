import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import SearchButton from './SearchButton/SearchButton';

export class Hero extends Component {
  render() {
    const { handleChange, searchText } = this.props;
    return (
      <div>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
            className="gradient__text"
          >
            Bookshop
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Welcome to Bookshop App, where you can find all the books you need.
          </Typography>
          <div spacing={4}></div>
        </Container>
        <SearchButton handleChange={handleChange} searchText={searchText} />
      </div>
    );
  }
}

export default Hero;
