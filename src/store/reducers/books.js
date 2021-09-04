import { UPDATE_BOOK_LIST, BOOKS_LOADING_ERROR } from '../actions/books';

const initialState = {
  bookList: [],
  error: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BOOK_LIST:
      return {
        ...state,
        bookList: action.payload,
      };
    case BOOKS_LOADING_ERROR:
      return {
        ...state,
        error: action.payload || 'loading error',
      };
    default:
      return state;
  }
};
