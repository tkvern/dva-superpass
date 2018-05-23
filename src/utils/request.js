import fetch from 'dva/fetch';
import { getCookie, delCookie } from '../utils/helper';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const access_token = getCookie('access_token');
  return fetch(url,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token,
      },
      ...options
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      console.log(data);
      if (data && data.err_code === 401) {
        delCookie('access_token');
        localStorage.clear();
        window.location.href = window.location.origin + "/#/login";
      }
      return { data };
    })
    .catch(err => ({ err }));
}
