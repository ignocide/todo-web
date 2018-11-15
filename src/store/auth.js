import jwtDecoder from 'jwt-decode';
import * as authApi from '../api/auth';
import { setToken } from '../api/index';
import { getTokens, removeTokens, setTokens } from '../utils/userCookie';


const authStore = {
  namespace: true,
  state: {
    user: null,
  },
  // computed: {
  //   count () {
  //     return this.count
  //   }
  // },
  mutations: {
    AUTH_INIT(state) {
      const tokens = getTokens();
      if (tokens.accessToken && tokens.refreshToken) {
        state.user = jwtDecoder(tokens.accessToken);
        setToken(tokens.accessToken);
      } else {
        state.user = null;
      }
    },
    LOGIN(state, tokenResult) {
      setTokens(tokenResult);
      setToken(tokenResult.access_token);
      state.user = jwtDecoder(tokenResult.access_token);
    },
    LOGOUT(state) {
      removeTokens();
      state.user = null;
    },
  },
  actions: {
    async LOGIN({ commit }, form) {
      try {
        const payload = await authApi.login(form);
        commit('LOGIN', payload.data);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },
    // async LOGOUT({ commit }, form) {
    //   try {
    //     const payload = await authApi.out(form);
    //     commit('LOGIN', payload.data);
    //     return Promise.resolve();
    //   } catch (e) {
    //     return Promise.reject(e);
    //   }
    // },
    async REFRESH_TOKEN({ commit }) {
      try {
        const tokens = getTokens();
        if (!tokens.refreshToken) {
          return;
        }
        const payload = await authApi.refreshToken(tokens.refreshToken);
        commit('LOGIN', payload.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
};

export default authStore;
