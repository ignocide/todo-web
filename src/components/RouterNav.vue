<!--<template>-->
<!--<div id="nav" v-if="authorization">-->
<!--<router-link to="/">Home</router-link> |-->
<!--<router-link to="/about">About</router-link>-->
<!--</div>-->
<!--<div id="nav" v-else>-->
<!--<router-link to="/">Home</router-link> |-->
<!--<router-link to="/about">About</router-link> |-->
<!--<router-link to="/login">Login</router-link>-->
<!--</div>-->
<!--</template>-->

<!--<style lang="scss">-->
<!--#nav {-->
<!--padding: 30px;-->
<!--a {-->
<!--font-weight: bold;-->
<!--color: #2c3e50;-->
<!--&.router-link-exact-active {-->
<!--color: #42b983;-->
<!--}-->
<!--}-->
<!--}-->
<!--</style>-->
<!--<script>-->
<!--import cookieUtil from '../utils/cookie'-->
<!--export default {-->
<!--name: 'RouterNav',-->
<!--computed : {-->
<!--user: () => {-->
<!--return this.$store.state.auth.user-->
<!--},-->
<!--authorization :() => {-->
<!--return cookieUtil.hasRole("USER")-->
<!--}-->
<!--},-->
<!--beforeCreate() {-->
<!--console.log("호출되는거 맞지")-->
<!--},-->
<!--created() {-->
<!--},-->
<!--};-->
<!--</script>-->
