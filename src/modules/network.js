const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

/**
 * Creates an HTTP GET request
 *
 * @param {string} url - API endpoint URL
 * @param {boolean} useProxy - Whether to use http proxy server or not
 * @returns {Promise} response data
 */
const fetchGet = async (url, useProxy = false) => {
  let response;
  try {
    response = await fetch(`${useProxy ? proxyUrl : ''}${url}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('fetchGet error', error.message);
  }
  let data = await response.json();
  return data;
};

/**
 * Creates an HTTP POST request
 *
 * @param {string} url - API endpoint URL
 * @param {string} contentType - Content-type of HTTP request body
 * @param {*} data - HTTP request body data
 * @param {boolean} useProxy - Whether to use http proxy server or not
 * @returns {Promise} response data
 */
const fetchPost = async (url, contentType, data, useProxy = false) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': contentType
    },
    body: data
  };
  let response;
  try {
      response = await fetch(`${useProxy ? proxyUrl : ''}${url}`, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('fetchPost error', error.message);
  }
  let responseData = await response.json();
  return responseData;
};

export {fetchGet, fetchPost};