import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../store/actions/user';
import { setAlert } from '../store/actions/alert';
import { Redirect, Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import loginImage from '../assets/images/login-image.jpg';
import './Login/Login.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      successfulSignup: false,
    };
  }

  componentDidMount() {
    this.setState({ successfulSignup: false });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password, passwordConfirm } = this.state;
    const { setAlertAction, addUserAction } = this.props;
    if (!username || !password || !passwordConfirm) {
      return setAlertAction('error', 'Please fill all required fields');
    }
    if (password !== passwordConfirm) {
      return setAlertAction('error', 'Passwords do not match');
    }
    const res = await addUserAction({ username, password });
    if (res.success) {
      this.setState({ successfulSignup: true });
      setAlertAction('success', 'Successfully registered');
    } else {
      setAlertAction('error', 'Registration failed');
    }
  };

  render() {
    const { username, password, passwordConfirm, successfulSignup } =
      this.state;
    if (successfulSignup) {
      return <Redirect to="/login" />;
    }
    return (
      <main className="login-container">
        <section className="login-left-section">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '6rem 0',
              }}
            >
              <Avatar
                style={{
                  backgroundColor: '#ccc',
                  margin: '8px',
                  height: '55px',
                  width: '55px',
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" className="font-bebas">
                Sign up
              </Typography>
              <form style={{ width: '100%', marginTop: '8px' }} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      label="Username"
                      name="username"
                      autoComplete="username"
                      value={username}
                      onChange={this.handleChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      value={password}
                      onChange={this.handleChange}
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      value={passwordConfirm}
                      onChange={this.handleChange}
                      name="passwordConfirm"
                      label="Confirm Password"
                      type="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                </Grid>
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.handleSubmit}
                    style={{
                      margin: '3rem auto',
                      backgroundColor: 'var(--secondary-color)',
                      width: '10rem',
                    }}
                  >
                    Register
                  </Button>
                </div>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </section>
        <section className="login-right-section">
          <img src={loginImage} alt="bookshelf" />
        </section>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUserAction: (body) => dispatch(addUser(body)),
    setAlertAction: (severity, message) =>
      dispatch(setAlert(severity, message)),
  };
};

export default connect(null, mapDispatchToProps)(Register);
