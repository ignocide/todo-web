import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_DOMAIN,
});

instance.defaults.headers.common.Authorization = `Basic ${process.env.VUE_APP_BASIC_TOKEN}`;

function setToken(accessToken) {
  if (accessToken) {
    instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    instance.defaults.headers.common.Authorization = `Basic ${process.env.VUE_APP_BASIC_TOKEN}`;
  }
}

export { setToken };
export default instance;
