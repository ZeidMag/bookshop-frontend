import {
  getRequest,
  postRequest,
  patchRequest,
} from '../../utility/functions/ApiCalls';
export const UPDATE_BOOK_LIST = 'UPDATE_BOOK_LIST';
export const BOOKS_LOADING_ERROR = 'BOOKS_LOADING_ERROR';

export const getBooks = () => {
  return async (dispatch) => {
    const res = await getRequest('/cake/books');
    if (res?.success && res?.data?.response?.success) {
      dispatch({
        type: UPDATE_BOOK_LIST,
        payload: res.data.response.data,
      });
    } else {
      dispatch({
        type: BOOKS_LOADING_ERROR,
        payload: res?.data?.response?.message,
      });
    }
  };
};

export const addBook = (body) => {
  return async (dispatch) => {
    const res = await postRequest('/cake/books/add', body);
    if (res?.success && res?.data?.response?.success) {
      dispatch({
        type: UPDATE_BOOK_LIST,
        payload: res.data.response.data,
      });
      return { success: true };
    } else {
      dispatch({
        type: BOOKS_LOADING_ERROR,
        payload: res?.data?.response?.message,
      });
      return { success: false, msg: res?.data?.response?.message };
    }
  };
};

export const editBook = (id, body) => {
  return async (dispatch) => {
    const res = await patchRequest(`/cake/books/edit/${id}`, body);
    if (res?.success && res?.data?.response?.success) {
      dispatch({
        type: UPDATE_BOOK_LIST,
        payload: res.data.response.data,
      });
      return { success: true };
    } else {
      dispatch({
        type: BOOKS_LOADING_ERROR,
        payload: res?.data?.response?.message,
      });
      return { success: false, msg: res?.data?.response?.message };
    }
  };
};
