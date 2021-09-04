import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../store/actions/user';
import { setAlert } from '../store/actions/alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Redirect, Link } from 'react-router-dom';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
    };
  }

  componentDidMount() {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.setState({ loggedIn: true });
    }
  }

  handleSubmit = async (e) => {
    const { setAlertAction } = this.props;
    e.preventDefault();
    const { username, password } = this.state;
    const { loginAction } = this.props;
    const res = await loginAction({ username, password });
    if (res.success) {
      this.setState({ loggedIn: true });
    } else {
      setAlertAction('error', 'Your username or passowrd is incorrect');
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { username, password, loggedIn } = this.state;
    if (loggedIn) {
      return <Redirect to="/" />;
    }
    return (
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
          <Avatar style={{ backgroundColor: '#f50057', margin: '8px' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form style={{ width: '100%', marginTop: '8px' }} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              value={username}
              onChange={this.handleChange}
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={this.handleChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
              style={{ margin: '3rem 0 2rem' }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (credintials) => dispatch(login(credintials)),
    setAlertAction: (severity, message) =>
      dispatch(setAlert(severity, message)),
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
