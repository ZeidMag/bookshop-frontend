import { getRequest, postRequest } from '../../utility/ApiCalls';
export const UPDATE_RENT_LIST = 'UPDATE_RENT_LIST';
export const RENT_LOADING_ERROR = 'RENT_LOADING_ERROR';

export const getRents = () => {
  return async (dispatch) => {
    const res = await getRequest('http://localhost/bookshop/rents/');
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
    const res = await postRequest('http://localhost/bookshop/rents/add', {
      user_id,
      book_id,
      duration_days,
    });
    if (res.data.success) {
      dispatch({
        type: UPDATE_RENT_LIST,
        payload: res.data.data,
      });
      return { success: true };
    } else {
      dispatch({
        type: RENT_LOADING_ERROR,
        payload: res?.data?.message,
      });
      return { success: false, msg: res?.data?.message };
    }
  };
};
