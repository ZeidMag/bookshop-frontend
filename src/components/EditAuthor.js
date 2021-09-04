import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuthors, editAuthor } from '../store/actions/authors';
import { setAlert } from '../store/actions/alert';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class EditAuthor extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      author: '',
      editedAuthor: 0,
    };
  }

  componentDidMount() {
    this.fetchAuthors();
  }

  fetchAuthors = async () => {
    const { getAuthorsAction } = this.props;
    this.setState({ isLoading: true });
    await getAuthorsAction();
    this.setState({ isLoading: false });
  };

  handleSubmit = async (e) => {
    const { author, editedAuthor } = this.state;
    const { editAuthorAction, setAlertAction } = this.props;
    e.preventDefault();
    if (!author) {
      // todo: make more appropriate error
      return setAlertAction('warning', 'please insert author name');
    }
    const res = await editAuthorAction(parseInt(editedAuthor), {
      name: author,
    });
    if (res.success) {
      this.setState({
        author: '',
        editedAuthor: 0,
      });
      setAlertAction('success', 'Your author has been Edited Successfully !');
    } else {
      setAlertAction('error', res.msg);
    }
  };

  handleChange = (e) => {
    this.setState({ author: e.target.value });
  };

  handleAuthorSelect = (e) => {
    const { authorList } = this.props;
    const author = authorList?.find(
      (author) => author.id === parseInt(e.target.value)
    );
    this.setState({
      editedAuthor: author.id,
      author: author.name,
    });
  };

  render() {
    const { author, editedAuthor } = this.state;
    const { authorList, authorsError } = this.props;
    return (
      <div className="flex column" style={{ width: '100%' }}>
        <Select
          labelId="demo-simple-select-label"
          name="editedAuthor"
          value={editedAuthor}
          // defaultValue="0"
          onChange={this.handleAuthorSelect}
          // style={{ width: '100%', height: '3.5rem', display: 'block' }}
        >
          <MenuItem value="0" disabled>
            Author
          </MenuItem>
          {authorList?.length ? (
            authorList.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                {author.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="0" disabled>
              {authorsError ? authorsError : 'Something went wrong'}
            </MenuItem>
          )}
        </Select>
        <form onSubmit={this.handleSubmit} style={{ width: '100%' }}>
          <div className="flex row align-items-center gap-1">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              disabled={!editedAuthor}
              label="Author"
              autoFocus
              value={author}
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              value="Submit"
              disabled={!editedAuthor}
              variant="contained"
              color="primary"
              size="large"
              style={{ padding: '1em', marginTop: '6px', width: '30%' }}
            >
              EDIT
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authorList: state.authors.authorList,
    authorsError: state.authors.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editAuthorAction: (id, body) => dispatch(editAuthor(id, body)),
    getAuthorsAction: () => dispatch(getAuthors()),
    setAlertAction: (severity, message) =>
      dispatch(setAlert(severity, message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAuthor);
