import axios from 'axios';

import { getToken } from 'utils';

const BASE_URL = process.env.REACT_APP_URL;

export const axiosPost = (url, data = null, sendToken = true) => {
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };
  if (sendToken) options['headers']['Authorization'] = `Bearer ${getToken()}`;
  return axios.post(BASE_URL + url, data, options);
};

export const axiosGet = (url, data = null, sendToken = true) => {
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };
  if (data) options['params'] = data;
  if (sendToken) options['headers']['Authorization'] = `Bearer ${getToken()}`;

  return axios.get(BASE_URL + url, options);
};
