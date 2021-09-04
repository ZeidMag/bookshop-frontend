import { UPDATE_USER, USER_LOADING_ERROR } from '../actions/user';

const initialState = {
  user: '',
  error: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOADING_ERROR:
      return {
        ...state,
        error: action.payload || 'loading error',
      };
    default:
      return state;
  }
};
