import axios from 'axios';
axios.defaults.withCredentials = true;

export const getRequest = async (url) => {
  try {
    const response = await axios.get(url);
    if (response && response.statusText === 'OK') {
      return { success: true, data: response.data };
    }
    throw new Error();
  } catch (error) {
    console.log(error);
    return { success: false, msg: 'Error occured while loading data ...' };
  }
};

export const postRequest = async (url, body) => {
  try {
    const response = await axios.post(url, body);
    if (response && response.statusText === 'OK') {
      return { success: true, data: response.data };
    }
    throw new Error();
  } catch (error) {
    return { success: false, msg: 'Error occured while loading data ...' };
  }
};

export const patchRequest = async (url, body) => {
  try {
    const response = await axios.patch(url, body);
    if (response && response.statusText === 'OK') {
      return { success: true, data: response.data };
    }
    throw new Error();
  } catch (error) {
    return { success: false, msg: 'Error occured while loading data ...' };
  }
};

export const deleteRequest = async (url) => {
  try {
    const response = await axios.post(url);
    if (response && response.statusText === 'OK') {
      return { success: true, data: response.data };
    }
    throw new Error();
  } catch (error) {
    return { success: false, msg: 'Error occured while loading data ...' };
  }
};
