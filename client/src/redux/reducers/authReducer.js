import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_AUTH,
  LOGGED_IN_USER_PROFILE_DETAILS,
  ALL_USERS_PROFILE,
} from '../types';

const initialState = {
  user: null,
  loggedInUserDetails: null,
  allUsersProfile: [],
};

export const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload };

    case LOGOUT:
      return { ...state, user: null };

    case CLEAR_AUTH:
      return { ...state, user: null, loggedInUserDetails: null };

    case LOGGED_IN_USER_PROFILE_DETAILS:
      return { ...state, loggedInUserDetails: action.payload };

    case ALL_USERS_PROFILE:
      return { ...state, allUsersProfile: action.payload };

    default:
      return state;
  }
};
