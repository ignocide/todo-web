<template>
  <div id="app">
    <Header/>
    <div id="main">
      <router-view/>
    </div>
    <portal-target name="modal"/>
  </div>
</template>

<style lang="scss">
  @import './scss/normalize.css';
  @import './scss/index.scss';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  #main {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

</style>
<script>
import Header from './components/header/Header.vue';
// import PortalTarget from "portal-vue/src/components/portal-target";

export default {
  name: 'App',
  props: {
    msg: String,
  },
  beforeCreate() {
    this.$store.commit('AUTH_INIT');
    this.$store.dispatch('REFRESH_TOKEN');
  },
  created() {
    //    console.log(this.$store.state.auth.user);
  },
  components: {
    //    PortalTarget,
    Header,
  },
};
</script>
