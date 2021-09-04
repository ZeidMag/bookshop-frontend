import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteBook } from '../store/actions/books';

export class DeleteBook extends Component {
  handleSubmit = async (e) => {
    const { deleteBookAction } = this.props;
    e.preventDefault();
    await deleteBookAction(20);
  };

  render() {
    return (
      <>
        <h1>Delete a book</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookList: state.books.bookList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBookAction: (id) => dispatch(deleteBook(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteBook);
