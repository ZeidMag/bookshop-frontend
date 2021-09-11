import React, { Component } from 'react';
import { connect } from 'react-redux';
import BooksSingleCard from './Books/BooksSingleCard/BooksSingleCard';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

export class RentedBooksList extends Component {
  render() {
    const { rents } = this.props;
    return (
      <>
        {rents?.length ? (
          rents.map((rent, index) => (
            <Grid container style={{ width: '70vw', marginTop: '2rem' }}>
              <BooksSingleCard
                mediumSize={6}
                style={{ marginTop: '2rem' }}
                key={index}
                book={rent.book}
                created={rent.created}
                duration={rent.duration_days}
              />
            </Grid>
          ))
        ) : (
          <div
            className="flex column justify-center"
            style={{ textAlign: 'center' }}
          >
            <h1>
              You have no rented books, go to books page and start renting !
            </h1>
            <Link
              to="/"
              style={{ textAlign: 'center', textDecoration: 'none' }}
            >
              Books Page
            </Link>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  rents: state.rents.rentList,
});

export default connect(mapStateToProps)(RentedBooksList);
