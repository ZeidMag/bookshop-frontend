import { getRequest, postRequest, patchRequest } from '../../utility/ApiCalls';
export const UPDATE_AUTHOR_LIST = 'UPDATE_AUTHOR_LIST';
export const AUTHORS_LOADING_ERROR = 'AUTHORS_LOADING_ERROR';
export const EDIT_AUTHOR = 'EDIT_AUTHOR';

export const getAuthors = () => {
  return async (dispatch) => {
    const res = await getRequest('http://localhost/bookshop/authors');
    if (res?.data?.success) {
      dispatch({
        type: UPDATE_AUTHOR_LIST,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: AUTHORS_LOADING_ERROR,
        payload: res?.data?.message,
      });
    }
  };
};

export const addAuthor = (body) => {
  // console.log(body);
  return async (dispatch) => {
    const res = await postRequest(
      'http://localhost/bookshop/authors/add',
      body
    );
    if (res?.data?.success) {
      dispatch({
        type: UPDATE_AUTHOR_LIST,
        payload: res.data.data,
      });
      return { success: true };
    } else {
      dispatch({
        type: AUTHORS_LOADING_ERROR,
        payload: res?.data?.message,
      });
      return { success: false, msg: res?.data?.message };
    }
  };
};

export const editAuthor = (id, body) => {
  return async (dispatch) => {
    const res = await patchRequest(
      `http://localhost/bookshop/authors/edit/${id}`,
      body
    );
    if (res?.data?.success) {
      dispatch({
        type: UPDATE_AUTHOR_LIST,
        payload: res.data.data,
      });
      return { success: true };
    } else {
      dispatch({
        type: AUTHORS_LOADING_ERROR,
        payload: res?.data?.message,
      });
      return { success: false, msg: res?.data?.message };
    }
  };
};
