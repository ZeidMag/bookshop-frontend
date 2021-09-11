import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearAlert } from '../../store/actions/alert';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export class AlertMain extends Component {
  handleAlert = (severity, message) => {
    this.setState({
      alert: {
        open: true,
        severity,
        message,
      },
    });
  };

  handleClose = (event, reason) => {
    const { clearAlertAction } = this.props;
    if (reason === 'clickaway') {
      return;
    }
    clearAlertAction();
  };
  render() {
    const { open, severity, message } = this.props;
    return (
      <Snackbar open={open} autoHideDuration={6000} onClose={this.handleClose}>
        <Alert onClose={this.handleClose} severity={`${severity}`}>
          {message}
        </Alert>
      </Snackbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.alert.open,
    severity: state.alert.severity,
    message: state.alert.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearAlertAction: () => dispatch(clearAlert()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertMain);
