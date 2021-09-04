import { getRequest, patchRequest, postRequest } from '../../utility/ApiCalls';
export const USER_LOADING_ERROR = 'USER_LOADING_ERROR';
export const UPDATE_USER = 'UPDATE_USER';

export const login = (credintials) => {
  return async (dispatch) => {
    const res = await postRequest(
      'http://localhost/bookshop/users/login',
      credintials
    );
    if (res?.data?.success) {
      sessionStorage.setItem('id', res.data.data.id);
      sessionStorage.setItem('username', res.data.data.username);
      sessionStorage.setItem('created', res.data.data.created);
      sessionStorage.setItem('modified', res.data.data.modified);
      dispatch({
        type: UPDATE_USER,
        payload: res.data.data,
      });
      return { success: true };
    } else {
      dispatch({
        type: USER_LOADING_ERROR,
        payload: res?.data?.message,
      });
      return { success: false, msg: res?.data?.message };
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    const res = await getRequest('http://localhost/bookshop/users/logout');
    if (res?.data?.success) {
      sessionStorage.clear();
      dispatch({
        type: UPDATE_USER,
        payload: '',
      });
    } else {
      dispatch({
        type: USER_LOADING_ERROR,
        payload: res?.data?.message,
      });
    }
  };
};

export const setUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: user,
  };
};

export const getUser = (id) => {
  return async (dispatch) => {
    const res = await getRequest(`http://localhost/bookshop/users/view/${id}`);
    if (res?.data?.success) {
      dispatch({
        type: UPDATE_USER,
        payload: res.data.data,
      });
      return { success: true };
    } else {
      dispatch({
        type: USER_LOADING_ERROR,
        payload: res?.data?.message,
      });
      return { success: false, msg: res?.data?.message };
    }
  };
};

export const editUser = (id, body) => {
  return async (dispatch) => {
    const res = await patchRequest(
      `http://localhost/bookshop/users/edit/${id}`,
      body
    );
    if (res?.success) {
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
      return { success: true };
    } else {
      dispatch({
        type: USER_LOADING_ERROR,
        payload: res?.data?.message,
      });
      return { success: false, msg: res?.data?.message };
    }
  };
};
