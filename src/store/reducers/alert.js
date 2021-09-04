import { SET_ALERT, CLEAR_ALERT } from '../actions/alert';

const initialState = {
  open: false,
  severity: '',
  message: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        open: true,
        severity: action.severity,
        message: action.message,
      };
    case CLEAR_ALERT:
      return {
        ...state,
        open: false,
        severity: '',
        message: '',
      };
    default:
      return state;
  }
};
