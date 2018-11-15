import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import boards from './boards';
import taskList from './taskList';
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
    taskList,
    taskDetail,
  },
});
