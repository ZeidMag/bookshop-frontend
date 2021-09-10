import React, { Component } from 'react';
import { connect } from 'react-redux';
import BooksSingleCard from './Books/BooksSingleCard/BooksSingleCard';
import Grid from '@material-ui/core/Grid';

export class RentedBooksList extends Component {
  render() {
    const { rents } = this.props;
    return (
      <Grid container style={{ width: '100%', marginTop: '2rem' }}>
        {rents?.length
          ? rents.map((rent, index) => (
              <BooksSingleCard
                mediumSize={8}
                style={{ marginTop: '2rem' }}
                key={index}
                book={rent.book}
                created={rent.created}
                duration={rent.duration_days}
              />
            ))
          : ''}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  rents: state.rents.rentList,
});

export default connect(mapStateToProps)(RentedBooksList);
