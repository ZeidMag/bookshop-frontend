import { getRequest, postRequest } from '../../utility/functions/ApiCalls';
export const UPDATE_RENT_LIST = 'UPDATE_RENT_LIST';
export const RENT_LOADING_ERROR = 'RENT_LOADING_ERROR';

export const getRents = () => {
  return async (dispatch) => {
    const res = await getRequest('/rents/');
    if (res?.data?.success) {
      dispatch({
        type: UPDATE_RENT_LIST,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: RENT_LOADING_ERROR,
        payload: res?.data?.message,
      });
    }
  };
};

export const addRent = (user_id, book_id, duration_days) => {
  return async (dispatch) => {
    const res = await postRequest('/cake/rents/add', {
      user_id,
      book_id,
      duration_days,
    });
    if (res?.success && res?.data?.response?.success) {
      dispatch({
        type: UPDATE_RENT_LIST,
        payload: res.data.response.data,
      });

      return { success: true };
    } else {
      dispatch({
        type: RENT_LOADING_ERROR,
        payload: res?.data?.response?.message,
      });
      return { success: false, msg: res?.data?.response?.message };
    }
  };
};
