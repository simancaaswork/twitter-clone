import * as React from 'react';
import * as types from './types';
import io from 'socket.io-client';

const AuthContext = React.createContext();

function AuthProvider({children}) {
  const initialState = {
    isAuth: false,
    user: {},
    tuits: [],
    user_tuits: [],
    usersRelated: [],
  };

  function authReducer(state, action) {
    switch (action.type) {
      case types.LOGGED_SUCCESS:
        return {
          ...state,
          isAuth: true,
          user: action.payload,
        };
      case types.TUIT_RECEIVED_SUCCESS:
        return {
          ...state,
          tuits: [action.payload, ...state.tuits],
        };
      case types.USER_TUITS_RECEIVED_SUCCESS:
        return {
          ...state,
          user_tuits: action.payload,
        };

      case types.GETTING_ALL_TUITS_SUCCESS:
        return {
          ...state,
          tuits: action.payload,
        };

      case types.GETTING_ALL_USERS_RELATED_SUCCESS:
        return {
          ...state,
          usersRelated: action.payload,
        };

      case types.GET_USER_UPDATED_SUCCESS:
        return {
          ...state,
          user: action.payload,
        };

      default: {
        throw new Error(`unhandled action type: ${action.type}`);
      }
    }
  }
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  const {
    isAuth,
    user,
    showModalTuitah,
    tuits,
    user_tuits,
    usersRelated,
  } = state;

  let urlBackend = 'https://simancas-tuitah.herokuapp.com/';
  const socket = io(urlBackend);

  function userLoggedSuccess(user) {
    dispatch({type: types.LOGGED_SUCCESS, payload: user});
  }

  function updateUserInformation() {
    socket.emit('get user updated', user._id);
  }
  socket.on('get user updated to client', user => {
    dispatch({
      type: types.GET_USER_UPDATED_SUCCESS,
      payload: user,
    });
  });

  function sendTuit(tuit) {
    if (tuit.trim() !== '') {
      let data = {
        tuit,
        user,
      };
      socket.emit('tuitah tuit', data);
    }
  }

  function getUserTuits(username) {
    socket.emit('get user tuits', username);
  }

  socket.on('get users related to client', users => {
    dispatch({
      type: types.GETTING_ALL_USERS_RELATED_SUCCESS,
      payload: users,
    });
  });

  socket.on('send tuit to client', tuit => {
    socket.emit('get all tuits');
    dispatch({
      type: types.TUIT_RECEIVED_SUCCESS,
      payload: tuit,
    });
  });

  socket.on('received user tuits', user_tuits => {
    dispatch({
      type: types.USER_TUITS_RECEIVED_SUCCESS,
      payload: user_tuits,
    });
  });

  socket.on('getting all tuits', allTuits => {
    let reversedArray = allTuits.reverse();
    dispatch({
      type: types.GETTING_ALL_TUITS_SUCCESS,
      payload: reversedArray,
    });
  });

  React.useEffect(() => {
    if (Object.keys(user).length !== 0) {
      socket.emit('get all tuits');
      socket.emit('get users related', user._id);
    }
  }, [user]);

  const value = React.useMemo(
    () => ({
      isAuth,
      user,
      showModalTuitah,
      socket,
      tuits,
      user_tuits,
      userLoggedSuccess,
      sendTuit,
      getUserTuits,
      updateUserInformation,
      usersRelated,
    }),
    [
      isAuth,
      user,
      showModalTuitah,
      socket,
      tuits,
      user_tuits,
      userLoggedSuccess,
      sendTuit,
      getUserTuits,
      updateUserInformation,
      usersRelated,
    ],
  );

  return (
    <AuthContext.Provider
      value={
        // return the state and functions to use it through all the components,
        // so in this way our auth state which will has all the behavior about
        // the action user one time he/she is logged!
        value
      }
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export {AuthProvider, useAuth};
