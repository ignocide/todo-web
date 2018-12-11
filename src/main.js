import Vue from 'vue';
import VModal from 'vue-js-modal';
import App from './App.vue';
import router from './router';
import store from './store/index';

import './registerServiceWorker';

Vue.config.productionTip = false;

// Vue.use(VModal, { dynamic: true, injectModalsContainer: true })
Vue.use(VModal, {dynamic: true, dialog: true});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
