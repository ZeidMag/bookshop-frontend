import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../store/actions/books';
import { addRent } from '../store/actions/rents';
import Hero from '../components/Books/Hero';
import BooksCards from '../components/Books/BooksCards/BooksCards';
import LoadingSpinner from '../utility/components/LoadingSpinner';

export class Books extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      searchText: '',
      filteredBookList: [],
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchText } = this.state;
    const { bookList } = this.props;
    if (prevState.searchText !== searchText) {
      if (searchText === '') {
        this.setState({
          filteredBookList: bookList,
        });
      } else {
        this.setState({
          filteredBookList: bookList.filter(
            (book) =>
              book.title.toLowerCase().includes(searchText.toLowerCase()) ||
              book.author.name.toLowerCase().includes(searchText.toLowerCase())
          ),
        });
      }
    }
  }

  fetchBooks = async () => {
    const { getBooksAction } = this.props;
    this.setState({ isLoading: true });
    await getBooksAction();
    this.setState({ isLoading: false, filteredBookList: this.props.bookList });
    // if (this?.props?.books?.length) {
    //   this.setState({
    //     filteredBookList: this.props.books,
    //   });
    // }
  };

  handleChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  render() {
    const { isLoading, filteredBookList } = this.state;
    const { bookList, booksError } = this.props;

    if (isLoading) {
      return (
        <>
          <Hero
            handleChange={this.handleChange}
            searchText={this.state.searchText}
          />
          <LoadingSpinner />
        </>
      );
    }

    if (booksError) {
      return (
        <>
          <Hero
            handleChange={this.handleChange}
            searchText={this.state.searchText}
          />
          <div>{booksError}</div>
        </>
      );
    }

    if (!bookList.length) {
      return (
        <>
          <Hero
            handleChange={this.handleChange}
            searchText={this.state.searchText}
          />
          <div> NO BOOKS TO DISPLAY</div>
        </>
      );
    }

    return (
      <>
        <Hero
          handleChange={this.handleChange}
          searchText={this.state.searchText}
        />
        <BooksCards bookList={filteredBookList} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookList: state.books.bookList,
    booksError: state.books.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBooksAction: () => dispatch(getBooks()),
    addRentalAction: (user_id, book_id, duration) =>
      dispatch(addRent(user_id, book_id, duration)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Books);
