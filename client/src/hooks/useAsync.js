import * as React from 'react';
import axios from 'axios';

function useAsync() {
  function asyncReducer(state, action) {
    switch (action.type) {
      case 'idle':
        return {
          idle: true,
          loading: true,
          errorMsg: null,
          error: false,
          success: false,
        };
      case 'success':
        return {
          asyncData: action.payload,
          idle: false,
          success: true,
          loading: false,
        };
      case 'error':
        return {
          idle: false,
          success: false,
          asyncData: null,
          error: true,
          loading: false,
          errorMsg: action.payload,
        };
      default:
        throw new Error(`${action.type} doesn't exists.`);
    }
  }

  const [state, dispatch] = React.useReducer(asyncReducer, {
    idle: false,
    error: false,
    errorMsg: null,
    success: false,
    asyncData: null,
    loading: false,
  });

  async function run(endpoint, data, method = 'POST', params = null) {
    let url = process.env.REACT_APP_BACKEND_URL;
    url += endpoint;

    if (method === 'POST') {
      try {
        dispatch({type: 'idle'});

        const response = await axios.post(url, data);
        if (response.status === 200) {
          dispatch({
            type: 'success',
            payload: response.data.data,
          });
        }
      } catch (error) {
        console.log(error);
        const msg = error.response?.data.msg;

        dispatch({type: 'error', payload: msg});
      }
    } else if (method === 'GET') {
      try {
        dispatch({type: 'idle'});
        const response = await axios.get(`${url}${params ? `/${params}` : ''}`);
        if (response.status === 200) {
          dispatch({
            type: 'success',
            payload: response.data,
          });
        }
      } catch (error) {
        console.log(error);
        const msg = error.response?.data.msg;

        dispatch({type: 'error', payload: msg});
      }
    } else if (method === 'PUT') {
      try {
        dispatch({type: 'idle'});
        const response = await axios.put(
          `${url}${params ? `/${params}` : ''}`,
          data,
        );
        if (response.status === 200) {
          dispatch({
            type: 'success',
            payload: response.data,
          });
        }
      } catch (error) {
        console.log(error);
        const msg = error.response?.data.msg;

        dispatch({type: 'error', payload: msg});
      }
    }
  }
  const {success, error, errorMsg, loading, asyncData} = state;

  return {success, error, errorMsg, loading, asyncData, run};
}

export default useAsync;
