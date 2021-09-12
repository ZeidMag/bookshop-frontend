import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRent } from '../../../store/actions/rents';
import { setAlert } from '../../../store/actions/alert';
import Modal from '@material-ui/core/Modal';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import './RentBookModal.css';

const marks = [
  {
    value: 1,
    label: '1 Day',
  },
  {
    value: 15,
    label: '15 Days',
  },
];

export class RentBookModal extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      value: 1,
    };
  }
  valuetext = (value) => {
    if (value !== this.state.value) {
      this.setState({ value });
    }
  };

  handleSubmit = async () => {
    const { value } = this.state;
    const { bookId, userId, addRentBookAction, handleClose, setAlertAction } =
      this.props;
    this.setState({ isLoading: true });
    const res = await addRentBookAction(userId, bookId, value);
    if (res.success) {
      this.setState({
        error: '',
        title: '',
        imageUrl: '',
        author: 0,
        pages: 0,
        publishYear: 0,
      });
      setAlertAction(
        'success',
        "You've successfully rented the book, check profile tab to review all your rentals !"
      );
      handleClose();
    } else {
      setAlertAction('error', res.msg);
    }
    this.setState({ isLoading: false });
  };

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
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      alert: { ...this.state.alert, open: false },
    });
  };

  render() {
    const { open, handleClose, bookTitle } = this.props;
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modal-container">
          <h2>You are Renting:</h2>
          <h3>{bookTitle}</h3>
          <div className="modal-slider-container">
            <h5>How many days ?</h5>
            <Slider
              defaultValue={1}
              getAriaValueText={this.valuetext}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              min={1}
              max={15}
            />
          </div>
          <Button
            size="small"
            color="primary"
            variant="contained"
            fullWidth
            onClick={this.handleSubmit}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.user.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRentBookAction: (userId, bookId, duration_days) =>
      dispatch(addRent(userId, bookId, duration_days)),
    setAlertAction: (severity, message) =>
      dispatch(setAlert(severity, message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RentBookModal);
