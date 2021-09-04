export const SET_ALERT = 'SET_ALERT';
export const CLEAR_ALERT = 'CLEAR_ALERT';

export const setAlert = (severity, message) => {
  return {
    type: SET_ALERT,
    severity,
    message,
  };
};

export const clearAlert = () => {
  return {
    type: CLEAR_ALERT,
  };
};
