import { UPDATE_RENT_LIST, RENT_LOADING_ERROR } from '../actions/rents';

const initialState = {
  rentList: [],
  error: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_RENT_LIST:
      return {
        ...state,
        rentList: action.payload,
      };
    case RENT_LOADING_ERROR:
      return {
        ...state,
        error: action.payload || 'loading error',
      };
    default:
      return state;
  }
};
