import axios from 'axios';
import toastr from 'toastr';
import { getHeaders } from '../config/api';

const client = axios.create();

// Request interceptor to add Authorization headers
client.interceptors.request.use(async (config) => {
  return { ...config, headers: getHeaders() };
});

const performLogout = () => {
  localStorage.clear();
  window.location.reload();
};

const request = (options) => {
  return client(options)
    .then(res => res)
    .catch((err) => {
      const isAuthorizationError = err.response &&
        (err.response.status === 403 || err.response.status === 401);
      if (isAuthorizationError && window.location.hash !== '#/login') {
        performLogout();
        return;
      }
      const errorMessage = err.response && err.response.data &&
        (err.response.data.error_message || err.response.data.message || err.response.data[0]);
      if (errorMessage) {
        toastr.error(errorMessage);
      }
      throw err;
    });
};

export default request;
