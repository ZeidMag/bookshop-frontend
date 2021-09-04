import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks, editBook } from '../store/actions/books';
import { getAuthors } from '../store/actions/authors';
import { setAlert } from '../store/actions/alert';
import { validImageURL } from '../utility/Regex';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

export class EditBook extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      editedBook: 0,
      title: '',
      pages: 0,
      author: 0,
      publishYear: 0,
      imageUrl: '',
    };
  }

  componentDidMount() {
    this.fetchData();

    //todo: populate fields with relavent values
  }

  fetchData = async () => {
    const { getBooksAction, getAuthorsAction } = this.props;
    this.setState({ isLoading: true });
    await getBooksAction();
    await getAuthorsAction();
    this.setState({ isLoading: false });
  };

  handleSubmit = async (e) => {
    const { title, author, pages, publishYear, imageUrl, editedBook } =
      this.state;
    const { editBookAction, setAlertAction } = this.props;
    e.preventDefault();
    if (!title && !author && !pages && !publishYear && !imageUrl) {
      // todo: make more appropriate error
      return setAlertAction('warning', 'Please fill any field to proceed');
    }
    if (!validImageURL.test(this.state.imageUrl)) {
      return setAlertAction('warning', 'please enter a valid image URL');
    }

    // todo: add dynamic id injection
    const res = await editBookAction(parseInt(editedBook), {
      title,
      pages: parseInt(pages),
      author_id: parseInt(author),
      publish_year: parseInt(publishYear),
      image_url: imageUrl,
    });
    if (res.success) {
      this.setState({
        editedBook: 0,
        error: '',
        title: '',
        imageUrl: '',
        author: 0,
        pages: 0,
        publishYear: 0,
      });
      setAlertAction('success', 'Your book has been edited Successfully !');
      // console.log('success');
    } else {
      // console.log(res.msg);
      setAlertAction('error', res.msg);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleBookSelect = (e) => {
    const { bookList } = this.props;
    const book = bookList?.find((book) => book.id === parseInt(e.target.value));
    // console.log('author id is' + book.author_id);
    this.setState({
      editedBook: book.id,
      title: book.title,
      imageUrl: book.image_url,
      pages: book.pages,
      publishYear: book.publish_year,
      author: book.author_id,
    });
  };

  render() {
    const { title, pages, publishYear, author, imageUrl, editedBook } =
      this.state;
    const { authorList, authorsError, bookList, booksError } = this.props;
    return (
      <div className="flex column">
        <Select
          labelId="demo-simple-select-label"
          name="editedBook"
          value={editedBook}
          // defaultValue="0"
          onChange={this.handleBookSelect}
          // style={{ width: '100%', height: '3.5rem', display: 'block' }}
        >
          <MenuItem value="0" disabled>
            Book
          </MenuItem>
          {bookList?.length ? (
            bookList.map((book) => (
              <MenuItem key={book.id} value={book.id}>
                {book.title}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="0" disabled>
              {booksError ? booksError : 'Something went wrong'}
            </MenuItem>
          )}
        </Select>
        <Divider variant="middle" style={{ margin: '1rem 0' }} />
        {!editedBook && (
          <h5 style={{ color: 'red', fontWeight: 'bold', margin: '0 auto' }}>
            *Please choose a book to edit*
          </h5>
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="flex row justify-space-evenly align-items-center gap-1">
            <TextField
              variant="outlined"
              margin="normal"
              label="Title"
              name="title"
              disabled={!editedBook}
              value={title}
              onChange={this.handleChange}
              style={{ width: '100%' }}
            />

            <Select
              labelId="demo-simple-select-label"
              name="author"
              disabled={!editedBook}
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
              disabled={!editedBook}
              type="number"
              label="pages"
              name="pages"
              value={pages || ''}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              disabled={!editedBook}
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
            disabled={!editedBook}
            fullWidth
            type="text"
            label="Image URL"
            name="imageUrl"
            value={imageUrl}
            onChange={this.handleChange}
          />
          <Button
            type="submit"
            value="Submit"
            disabled={!editedBook}
            variant="contained"
            color="primary"
            fullWidth
          >
            EDIT
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authorList: state.authors.authorList,
    authorsError: state.authors.error,
    bookList: state.books.bookList,
    booksError: state.books.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editBookAction: (id, body) => dispatch(editBook(id, body)),
    getAuthorsAction: () => dispatch(getAuthors()),
    getBooksAction: () => dispatch(getBooks()),
    setAlertAction: (severity, message) =>
      dispatch(setAlert(severity, message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBook);
