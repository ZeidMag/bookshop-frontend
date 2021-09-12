import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import SearchButton from './SearchButton/SearchButton';
import Logo from '../../assets/images/books-logo.png';

export class Hero extends Component {
  render() {
    const { handleChange, searchText } = this.props;
    return (
      <div>
        <Container
          maxWidth="sm"
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
            className="gradient__text font-anton"
            style={{ fontSize: '5rem' }}
          >
            Bookshop
          </Typography>
          <div style={{ width: 'min(500px, 90%)', margin: '0 auto' }}>
            <img src={Logo} alt="logo" style={{ width: '100%' }} />
          </div>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
            className="font-bebas"
            style={{ fontSize: '2rem' }}
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
