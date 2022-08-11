/*
Global Context:
loggedIn
loggedInUser
username
firstName
lastName
userId
*/

import React, {
  useReducer, createContext, useContext,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import { getUser } from './AuthService';

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
  const userQuery = useQuery(['user'], () => getUser());
  const [loggedInUser, dispatch] = useReducer(userReducer, {});
  // replace useEffect with useQuery
  if (loggedInUser.data === undefined) {
    if (userQuery.isSuccess && userQuery.data !== null) {
      const userData = userQuery.data;
      dispatch({
        type: 'SET_USER_DATA',
        userData: userData.data,
      });
      localStorage.setItem('loggedIn', true);
    }
  }
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

export function useUserDispatch() {
  return useContext(UserDispatch);
}

export function useUserContext() {
  return useContext(UserContext);
}
