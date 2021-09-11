import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addAuthor } from '../store/actions/authors';
import { setAlert } from '../store/actions/alert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class AddAuthor extends Component {
  constructor() {
    super();
    this.state = {
      author: '',
    };
  }

  handleSubmit = async (e) => {
    const { addAuthorAction, setAlertAction } = this.props;
    const { author } = this.state;
    e.preventDefault();
    const res = await addAuthorAction({ name: author });
    if (res.success) {
      this.setState({
        author: '',
      });
      setAlertAction('success', 'Your author has been added Successfully !');
    } else {
      setAlertAction('error', res.msg);
    }
  };

  handleChange = (e) => {
    this.setState({ author: e.target.value });
  };

  render() {
    const { author } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit} style={{ width: '100%' }}>
          <div className="flex row align-items-center gap-1">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="author"
              label="Author"
              name="author"
              autoFocus
              value={author}
              onChange={this.handleChange}
            />
            {/* <Button
              type="submit"
              value="Submit"
              variant="contained"
              color="primary"
              size="large"
              style={{ padding: '1em', marginTop: '6px', width: '30%' }}
            >
              Add
            </Button> */}
            <div className="flex justify-center align-items-center">
              <Button
                type="submit"
                value="Submit"
                variant="contained"
                size="large"
                style={{
                  margin: 'auto',
                  backgroundColor: 'var(--secondary-color)',
                  padding: '1em',
                  marginTop: '0.4rem',
                  width: '30%',
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </form>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAuthorAction: (body) => dispatch(addAuthor(body)),
    setAlertAction: (severity, message) =>
      dispatch(setAlert(severity, message)),
  };
};

export default connect(null, mapDispatchToProps)(AddAuthor);
