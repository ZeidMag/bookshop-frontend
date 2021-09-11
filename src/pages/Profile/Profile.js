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
import { Redirect } from 'react-router-dom';
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
    if (!user) {
      return <Redirect to="/login" />;
    }
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
          <Typography variant="h4" component="h4">
            {user?.username || 'Username'}
          </Typography>
          <Typography variant="h6" component="h4">
            Joined:{' '}
            <Moment format="YYYY-MM-DD">{user?.created || new Date()}</Moment>
          </Typography>
          <Typography variant="h6" component="h4">
            Last modified:{' '}
            <Moment format="YYYY-MM-DD">{user?.modified || new Date()}</Moment>
          </Typography>
        </section>
        <Divider variant="middle" style={{ margin: '2rem 0' }} />
        <section className="profile-modify">
          <Typography variant="h2" component="h3" className="gradient__text">
            Modify Profile
          </Typography>
          <Typography variant="h5" component="h4">
            Change username
          </Typography>
          <article className="profile-modify__username">
            <TextField
              name="newUsername"
              label="Username"
              variant="outlined"
              value={newUsername}
              onChange={this.handleChange}
              style={{ width: '90%' }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={this.handleUsernameChange}
              style={{ padding: '1em' }}
            >
              Change
            </Button>
          </article>
          <Typography variant="h5" component="h4">
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
              style={{ width: '100%' }}
            />
            <TextField
              name="newPasswordConfirm"
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={newPasswordConfirm}
              onChange={this.handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={this.handlePasswordChange}
              style={{ padding: '1em 0.5em' }}
            >
              Change
            </Button>
          </article>
        </section>
        <Divider variant="middle" style={{ margin: '2rem 0' }} />
        <section className="view-rented-books">
          <Typography
            variant="h2"
            component="h3"
            className="gradient__text"
            style={{ textAlign: 'center' }}
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
