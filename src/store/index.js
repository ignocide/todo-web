import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import boards from './boards';
import boardDetailUpdate from './boardDetailUpdate';
import boardDetail from './boardDetail';
import taskDetail from './taskDetail';

Vue.use(Vuex);


export default new Vuex.Store({
  // state: {
  //
  // },
  // mutations: {
  //
  // },
  // actions: {
  //
  // },
  modules: {
    auth,
    boards,
    boardDetail,
    boardDetailUpdate,
    taskDetail,
  },
});
