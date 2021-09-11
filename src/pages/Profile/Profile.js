import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editUser } from '../../store/actions/user';
import { getBooks } from '../../store/actions/books';
import { setAlert } from '../../store/actions/alert';
import RentedBooksList from '../../components/RentedBooksList';
import LoadingSpinner from '../../utility/components/LoadingSpinner';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Profile.css';

export class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      newUsername: '',
      newPassword: '',
      newPasswordConfirm: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleUsernameChange = async () => {
    const { editUserAction, setAlertAction, user } = this.props;
    const { newUsername } = this.state;
    if (!newUsername) {
      return setAlertAction('warning', 'Username cannot be empty');
    }

    const res = await editUserAction(user.id, { username: newUsername });
    if (res.success) {
      setAlertAction('success', 'Username changed successfully');
      this.setState({ newUsername: '' });
    } else {
      setAlertAction('error', `Username change failed ${res.msg}`);
    }
  };

  handlePasswordChange = async () => {
    const { editUserAction, setAlertAction, user } = this.props;
    const { newPassword, newPasswordConfirm } = this.state;
    if (!newPassword || !newPasswordConfirm) {
      return setAlertAction('warning', 'passwords cannot be empty');
    }
    if (newPassword !== newPasswordConfirm) {
      return setAlertAction('warning', 'passwords do not match');
    }

    const res = await editUserAction(user.id, { password: newPassword });
    if (res.success) {
      setAlertAction('success', 'password changed successfully');
      this.setState({ newPassword: '', newPasswordConfirm: '' });
    } else {
      setAlertAction('error', `Password change failed ${res.msg}`);
    }
  };

  render() {
    const { user } = this.props;
    const { newUsername, newPassword, newPasswordConfirm, isLoading } =
      this.state;
    if (isLoading) {
      return <LoadingSpinner />;
    }
    return (
      <main className="profile-main">
        <section className="profile-info">
          <Avatar
            alt="some person"
            src={`https://avatars.dicebear.com/api/gridy/${
              user?.username || 1
            }.svg`}
          />
          <Typography
            variant="h4"
            component="h4"
            className="font-bebas"
            style={{ fontSize: '3rem' }}
          >
            {user?.username || 'Username'}
          </Typography>
          <div className="dotted-container__profile-info">
            <Typography
              variant="h6"
              component="h4"
              style={{ textAlign: 'center' }}
            >
              Joined:{' '}
              <Moment format="YYYY-MM-DD">{user?.created || new Date()}</Moment>
            </Typography>
            <Typography
              variant="h6"
              component="h4"
              style={{ textAlign: 'center' }}
            >
              Last modified:{' '}
              <Moment format="YYYY-MM-DD">
                {user?.modified || new Date()}
              </Moment>
            </Typography>
          </div>
        </section>
        <Divider variant="middle" style={{ margin: '2rem 0' }} />
        <section className="profile-modify">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
            className="gradient__text font-anton"
            style={{ fontSize: '4rem' }}
          >
            Modify Profile
          </Typography>
          <div className="dotted-container">
            <Typography
              variant="h5"
              component="h4"
              className="font-bebas"
              style={{ textAlign: 'center' }}
            >
              Change username
            </Typography>
            <article className="profile-modify__username">
              <TextField
                name="newUsername"
                label="Username"
                variant="outlined"
                value={newUsername}
                onChange={this.handleChange}
                style={{ width: '70%', margin: '0 auto' }}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={this.handleUsernameChange}
                style={{
                  backgroundColor: 'var(--secondary-color)',
                  color: 'black',
                  padding: '1em 0.5em',
                  width: '50%',
                  margin: '0 auto',
                }}
              >
                Change
              </Button>
            </article>
          </div>
          <div className="dotted-container">
            <Typography
              variant="h5"
              component="h4"
              className="font-bebas"
              style={{ textAlign: 'center' }}
            >
              Change password
            </Typography>
            <article className="profile-modify__password">
              <TextField
                name="newPassword"
                label="Password"
                type="password"
                variant="outlined"
                value={newPassword}
                onChange={this.handleChange}
                style={{ width: '70%', margin: '0 auto' }}
              />
              <TextField
                name="newPasswordConfirm"
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={newPasswordConfirm}
                onChange={this.handleChange}
                style={{ width: '70%', margin: '0 auto' }}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={this.handlePasswordChange}
                style={{
                  backgroundColor: 'var(--secondary-color)',
                  color: 'black',
                  padding: '1em 0.5em',
                  width: '50%',
                  margin: '0 auto',
                }}
              >
                Change
              </Button>
            </article>
          </div>
        </section>
        <Divider variant="middle" style={{ margin: '2rem 0' }} />
        <section className="view-rented-books">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
            className="gradient__text font-anton"
            style={{ fontSize: '4rem' }}
          >
            View Rental History
          </Typography>
          <article>
            <RentedBooksList />
          </article>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    bookList: state.books.bookList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUserAction: (userId, user) => dispatch(editUser(userId, user)),
    getBooksAction: () => dispatch(getBooks()),
    setAlertAction: (severity, message) =>
      dispatch(setAlert(severity, message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
