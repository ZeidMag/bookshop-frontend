import { UPDATE_AUTHOR_LIST, AUTHORS_LOADING_ERROR } from '../actions/authors';

const initialState = {
  authorList: [],
  error: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AUTHOR_LIST:
      return {
        ...state,
        authorList: action.payload,
        error: '',
      };
    case AUTHORS_LOADING_ERROR:
      return {
        ...state,
        error: action.payload || 'Loading Error',
      };
    default:
      return state;
  }
};
