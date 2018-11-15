import qs from 'querystring';
import api from './index';

export const login = (form) => {
  const data = qs.stringify({
    grant_type: 'password',
    username: form.email,
    password: form.password,
  });
  return api.post('/uua/oauth/token', data, {
    headers: {
      Authorization: `Basic ${process.env.VUE_APP_BASIC_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
  });
};


export const logout = () => api.post('/uua/oauth/logout', {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
});

export const refreshToken = (refreshToken) => {
  const data = qs.stringify({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });
  return api.post('/uua/oauth/token', data, {
    headers: {
      Authorization: `Basic ${process.env.VUE_APP_BASIC_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
  });
};
