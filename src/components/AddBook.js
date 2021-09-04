import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuthors } from '../store/actions/authors';
import { addBook } from '../store/actions/books';
import { setAlert } from '../store/actions/alert';
import { validImageURL } from '../utility/Regex';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      title: '',
      pages: 0,
      author: 0,
      publishYear: 0,
      imageUrl: '',
    };
  }

  componentDidMount() {
    const { fetchAuthorList } = this.props;
    this.setState({ isLoading: true });
    fetchAuthorList();
    this.setState({ isLoading: false });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author, pages, publishYear, imageUrl } = this.state;
    const { addNewBookAction, setAlertAction } = this.props;
    if (!author || !pages || !publishYear || !title || !imageUrl) {
      return setAlertAction('warning', 'please fill all fields');
    }
    if (!validImageURL.test(this.state.imageUrl)) {
      return setAlertAction('warning', 'please enter a valid image URL');
    }
    const res = await addNewBookAction({
      title,
      author_id: author,
      pages,
      publish_year: publishYear,
      image_url: imageUrl,
    });
    if (res.success) {
      this.setState({
        error: '',
        title: '',
        imageUrl: '',
        author: 0,
        pages: 0,
        publishYear: 0,
      });
      setAlertAction('success', 'Your book has been added Successfully !');
    } else {
      setAlertAction('error', res.msg);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { title, pages, publishYear, author, imageUrl } = this.state;
    const { authorList, authorsError } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="flex row justify-space-evenly align-items-center gap-1">
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="title"
            label="Title"
            name="title"
            autoFocus
            value={title}
            onChange={this.handleChange}
            style={{ width: '100%' }}
          />

          <Select
            labelId="demo-simple-select-label"
            name="author"
            id="author"
            value={author}
            // defaultValue="0"
            onChange={this.handleChange}
            style={{ width: '100%', height: '3.5rem' }}
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
        </div>
        <div className="flex row justify-space-evenly align-items-center gap-1">
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="pages"
            type="number"
            label="pages"
            name="pages"
            value={pages || ''}
            onChange={this.handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="publishYear"
            type="number"
            label="publish year"
            name="publishYear"
            value={publishYear || ''}
            onChange={this.handleChange}
          />
        </div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="imageurl"
          type="text"
          label="Image URL"
          name="imageUrl"
          value={imageUrl}
          onChange={this.handleChange}
        />
        <Button
          type="submit"
          value="Submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Add
        </Button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authorList: state.authors.authorList,
    authorsError: state.authors.error,
    booksError: state.books.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAuthorList: () => dispatch(getAuthors()),
    addNewBookAction: (body) => dispatch(addBook(body)),
    setAlertAction: (severity, message) =>
      dispatch(setAlert(severity, message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
