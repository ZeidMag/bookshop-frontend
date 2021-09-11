import {
  getRequest,
  patchRequest,
  postRequest,
} from '../../utility/functions/ApiCalls';
import { splitUserAndRents } from '../../utility/functions/Helper';
import { UPDATE_RENT_LIST } from './rents';
export const USER_LOADING_ERROR = 'USER_LOADING_ERROR';
export const UPDATE_USER = 'UPDATE_USER';

export const login = (credintials) => {
  return async (dispatch) => {
    const res = await postRequest('/cake/users/login', credintials);
    if (res.success && res?.data?.response?.success) {
      sessionStorage.setItem('id', res.data.response.data.id);
      sessionStorage.setItem('username', res.data.response.data.username);
      sessionStorage.setItem('created', res.data.response.data.created);
      sessionStorage.setItem('modified', res.data.response.data.modified);
      const { user, rents } = splitUserAndRents(res.data.response.data);
      dispatch({
        type: UPDATE_USER,
        payload: user,
      });
      dispatch({
        type: UPDATE_RENT_LIST,
        payload: rents,
      });
      return { success: true };
    } else {
      dispatch({
        type: USER_LOADING_ERROR,
        payload: res?.data?.response?.message,
      });
      return { success: false, msg: res?.data?.response?.message };
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    const res = await getRequest('/cake/users/logout');
    if (res.success && res?.data?.response?.success) {
      sessionStorage.clear();
      dispatch({
        type: UPDATE_USER,
        payload: '',
      });
    } else {
      dispatch({
        type: USER_LOADING_ERROR,
        payload: res?.data?.response?.message,
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

export const addUser = (body) => {
  return async (dispatch) => {
    const res = await postRequest('/cake/users/add', body);
    if (res.success && res?.data?.response?.success) {
      return { success: true };
    } else {
      dispatch({
        type: USER_LOADING_ERROR,
        payload: res?.data?.response?.message,
      });
      return { success: false, msg: res?.data?.response?.message };
    }
  };
};

export const editUser = (id, body) => {
  return async (dispatch) => {
    const res = await patchRequest(`/cake/users/edit/${id}`, body);
    if (res?.success && res?.data?.response?.success) {
      const { user } = splitUserAndRents(res.data.response.data);
      dispatch({
        type: UPDATE_USER,
        payload: user,
      });
      return { success: true };
    } else {
      dispatch({
        type: USER_LOADING_ERROR,
        payload: res?.data?.response?.message,
      });
      return { success: false, msg: res?.data?.response?.message };
    }
  };
};
