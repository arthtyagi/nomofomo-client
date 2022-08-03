/*
Global Context:
loggedIn
loggedInUser
username
firstName
lastName
userId
*/

import React, { useEffect, useReducer, createContext } from 'react';
import PropTypes from 'prop-types';
import getUser from './AuthService';

export const UserContext = createContext();
export const UserDispatch = createContext();

function userReducer(state, action) {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        data: action.userData,
      };
    default:
      return state;
  }
}

export function UserProvider({ children }) {
  const [loggedInUser, dispatch] = useReducer(userReducer, {});
  useEffect(
    () => {
      getUser().then((resp) => {
        // console.log('userData ->', userData.data);
        dispatch({ type: 'SET_USER_DATA', userData: resp.data });
      }).catch((error) => {
        console.log(error);
      });
    },
    [],
  );
  return (
    <UserContext.Provider value={loggedInUser.data}>
      <UserDispatch.Provider value={dispatch}>
        {children}
      </UserDispatch.Provider>
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};