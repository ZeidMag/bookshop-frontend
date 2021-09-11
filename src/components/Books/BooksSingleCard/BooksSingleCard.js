import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../../store/actions/alert';
import RentBookModal from '../RentBookModal/RentBookModal';
import Moment from 'react-moment';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import borrowBookIcon from '../../../assets/images/borrow-book.svg';
import Divider from '@material-ui/core/Divider';
import './BooksSingleCard.css';

class BooksSingleCard extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    const { setAlertAction } = this.props;

    const { user } = this.props;
    if (user) {
      return this.setState({ open: true });
    }
    setAlertAction('error', 'You must login to Rent a book !');
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { book, mediumSize = 3, user, created, duration } = this.props;
    return (
      <Grid item xs={12} sm={6} md={mediumSize} style={{ margin: '1rem auto' }}>
        <Card className="book-card">
          <CardMedia
            // style={{ paddingTop: '56.25%' }}
            style={{ paddingTop: '100%' }}
            image={book?.image_url}
            title="Image title"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h3"
              component="h2"
              className="book-title font-bebas"
            >
              {book?.title}
            </Typography>
          </CardContent>
          <div className="card-text-container">
            <div className="book-details">
              <Typography>Author: {book?.author?.name}</Typography>
              <Divider variant="middle" />
              <Typography>Pages: {book?.pages}</Typography>
              <Divider variant="middle" />
              <Typography>Published: {book?.publish_year}</Typography>
            </div>

            {duration ? (
              <div className="flex column align-items-center">
                <Divider variant="middle" style={{ margin: '2rem 0' }} />
                <Typography variant="h5" component="h5">
                  Rental information
                </Typography>
                <Typography variant="h6" component="h6">
                  Start:
                  <Moment format="YYYY-MM-DD">{created}</Moment>{' '}
                </Typography>
                <Typography variant="h6" component="h6">
                  Duration: {duration} days
                </Typography>
                <Typography variant="h6" component="h6">
                  End:
                  <Moment
                    date={moment(created).add(duration, 'd')}
                    format="YYYY-MM-DD"
                  >
                    {created}
                  </Moment>{' '}
                </Typography>
                <div>
                  {new Date().toJSON().slice(0, 10).replace(/-/g, '-') >=
                  moment(created).add(duration, 'd').format('YYYY-mm-dd') ? (
                    <Typography
                      variant="h6"
                      component="h6"
                      style={{ color: 'red' }}
                    >
                      Overdue
                    </Typography>
                  ) : (
                    <Typography
                      variant="h6"
                      component="h6"
                      style={{ color: 'green' }}
                    >
                      Active
                    </Typography>
                  )}
                </div>
              </div>
            ) : (
              <CardActions className="rent-action">
                <Typography>Rent this Book</Typography>
                <Button size="small" color="primary" onClick={this.handleOpen}>
                  <img
                    alt="borrow book"
                    src={borrowBookIcon}
                    height="40"
                    width="40"
                  />
                </Button>
                <RentBookModal
                  open={this.state.open}
                  handleClose={this.handleClose}
                  bookId={book?.id}
                  userId={user?.id}
                  bookTitle={book?.title}
                />
              </CardActions>
            )}
          </div>
        </Card>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAlertAction: (severity, message) =>
      dispatch(setAlert(severity, message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksSingleCard);
