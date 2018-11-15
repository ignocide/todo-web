import cookie from 'js-cookie';
import jwtDecoder from 'jwt-decode';
import { setToken } from '../api/index';


const KEYS = {
  ACCESS_TOKEN: 'at',
  REFRESH_TOKEN: 'rt',

};

export const setCookie = function (key, value) {
  cookie.set(key, value, {
    expires: 365,
    path: '/',
  });
};

export const getTokens = function () {
  const refreshToken = cookie.get(KEYS.REFRESH_TOKEN);
  const accessToken = cookie.get(KEYS.ACCESS_TOKEN);

  return {
    refreshToken,
    accessToken,
  };
};

export const setTokens = function (tokens) {
  setCookie(KEYS.ACCESS_TOKEN, tokens.access_token);
  setCookie(KEYS.REFRESH_TOKEN, tokens.refresh_token);
};

export const removeTokens = function () {
  cookie.remove(KEYS.ACCESS_TOKEN);
  cookie.remove(KEYS.REFRESH_TOKEN);
  setToken(null);
};


export const getUser = function () {
  let user = null;
  const tokens = getTokens();
  if (tokens.accessToken) {
    user = jwtDecoder(tokens.accessToken);
  }
  return user;
};

export const getUserRoles = function () {
  const user = getUser() || {};
  const { authorities = [] } = user;
  return authorities;
};

export const hasRole = function (role) {
  const roles = getUserRoles();
  return roles.includes(`ROLE_${role}`);
};
