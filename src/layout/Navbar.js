import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../store/actions/user';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';

class TempNavbar extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
    };
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = async () => {
    const { logoutAction } = this.props;
    await logoutAction();
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { user } = this.props;
    // const user = sessionStorage.getItem('id');
    // console.log(user || 'user doenst exist');
    return (
      <AppBar position="sticky">
        <Toolbar
          style={{
            backgroundColor: 'var(--secondary-color)',
            color: 'var(--primary-color)',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{ marginRight: '1rem' }}
          >
            <Link to="/" style={{ all: 'inherit' }}>
              <ImportContactsIcon />
            </Link>
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{ marginRight: 'auto' }}
          >
            <Link to="/author" style={{ all: 'inherit' }}>
              <BorderColorIcon />
            </Link>
          </IconButton>
          {user ? (
            <>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Link to="/management" style={{ all: 'inherit' }}>
                  <SettingsIcon />
                </Link>
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <Avatar
                  alt="some person"
                  src={`https://avatars.dicebear.com/api/gridy/${user.username}.svg`}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
                style={{ margin: '2.5rem 0 0 1rem' }}
              >
                <MenuItem onClick={this.handleClose}>
                  <Link to="/profile" style={{ all: 'inherit' }}>
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={this.handleLogout}>
                  <Link to="/login" style={{ all: 'inherit' }}>
                    Logout
                  </Link>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Typography variant="h5" component="h5">
              <Link to="/login" style={{ all: 'inherit', cursor: 'pointer' }}>
                Login
              </Link>
            </Typography>
          )}
        </Toolbar>
      </AppBar>
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
    logoutAction: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TempNavbar);
