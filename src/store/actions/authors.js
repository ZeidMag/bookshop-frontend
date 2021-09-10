import {
  getRequest,
  postRequest,
  patchRequest,
} from '../../utility/functions/ApiCalls';
export const UPDATE_AUTHOR_LIST = 'UPDATE_AUTHOR_LIST';
export const AUTHORS_LOADING_ERROR = 'AUTHORS_LOADING_ERROR';
export const EDIT_AUTHOR = 'EDIT_AUTHOR';

export const getAuthors = () => {
  return async (dispatch) => {
    const res = await getRequest('/cake/authors');
    if (res?.success && res?.data?.response?.success) {
      dispatch({
        type: UPDATE_AUTHOR_LIST,
        payload: res.data.response.data,
      });
    } else {
      dispatch({
        type: AUTHORS_LOADING_ERROR,
        payload: res?.data?.response?.message,
      });
    }
  };
};

export const addAuthor = (body) => {
  // console.log(body);
  return async (dispatch) => {
    const res = await postRequest('/cake/authors/add', body);
    if (res?.success && res?.data?.response?.success) {
      dispatch({
        type: UPDATE_AUTHOR_LIST,
        payload: res.data.response.data,
      });
      return { success: true };
    } else {
      dispatch({
        type: AUTHORS_LOADING_ERROR,
        payload: res?.data?.response?.message,
      });
      return { success: false, msg: res?.data?.response?.message };
    }
  };
};

export const editAuthor = (id, body) => {
  return async (dispatch) => {
    const res = await patchRequest(`/cake/authors/edit/${id}`, body);
    if (res?.success && res?.data?.response?.success) {
      dispatch({
        type: UPDATE_AUTHOR_LIST,
        payload: res.data.response.data,
      });
      return { success: true };
    } else {
      dispatch({
        type: AUTHORS_LOADING_ERROR,
        payload: res?.data?.response?.message,
      });
      return { success: false, msg: res?.data?.response?.message };
    }
  };
};
