import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from '../../utility/ApiCalls';
export const UPDATE_BOOK_LIST = 'UPDATE_BOOK_LIST';
export const BOOKS_LOADING_ERROR = 'BOOKS_LOADING_ERROR';

export const getBooks = () => {
  return async (dispatch) => {
    const res = await getRequest('http://localhost/bookshop/books');
    if (res?.data?.success) {
      dispatch({
        type: UPDATE_BOOK_LIST,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: BOOKS_LOADING_ERROR,
        payload: res?.data?.message,
      });
    }
  };
};

export const addBook = (body) => {
  return async (dispatch) => {
    const res = await postRequest('http://localhost/bookshop/books/add', body);
    if (res?.data?.success) {
      dispatch({
        type: UPDATE_BOOK_LIST,
        payload: res.data.data,
      });
      return { success: true };
    } else {
      dispatch({
        type: BOOKS_LOADING_ERROR,
        payload: res?.data?.message,
      });
      return { success: false, msg: res?.data?.message };
    }
  };
};

export const editBook = (id, body) => {
  return async (dispatch) => {
    const res = await patchRequest(
      `http://localhost/bookshop/books/edit/${id}`,
      body
    );
    if (res?.data?.success) {
      dispatch({
        type: UPDATE_BOOK_LIST,
        payload: res.data.data,
      });
      return { success: true };
    } else {
      dispatch({
        type: BOOKS_LOADING_ERROR,
        payload: res?.data?.message,
      });
      return { success: false, msg: res?.data?.message };
    }
  };
};

export const deleteBook = (id) => {
  return async (dispatch) => {
    const res = await deleteRequest(
      `http://localhost/bookshop/books/delete/${id}`
    );
    if (res?.data?.success) {
      dispatch({
        type: UPDATE_BOOK_LIST,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: BOOKS_LOADING_ERROR,
        payload: res?.data?.message,
      });
    }
  };
};
