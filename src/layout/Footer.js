import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export class Footer extends Component {
  render() {
    return (
      <footer
        style={{
          backgroundColor: '#ddd',
          padding: '2rem 0',
          marginTop: 'auto',
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Bookshop APP
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          This App has been created to demonstrate the use of ReactJS,
          Material-UI, CakePHP & MySQL.
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          for more details about the project, please visit the following links:
        </Typography>
        <div className="flex justify-center">
          <Link
            href="https://github.com/ZeidMag/bookshop-frontend"
            target="_blank"
            rel="noreferrer"
          >
            Frontend Repo
          </Link>
          <span style={{ margin: '0 1rem' }}> . </span>
          <Link
            href="https://github.com/ZeidMag/bookshopCakeV4"
            target="_blank"
            rel="noreferrer"
          >
            Backend Repo
          </Link>
        </div>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://github.com/ZeidMag">
            Zeid Magboub
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </footer>
    );
  }
}

export default Footer;
