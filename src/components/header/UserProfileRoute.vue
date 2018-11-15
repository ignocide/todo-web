<template>
  <div class="user-profile-route">
    <ul>
      <li>
        <router-link class="router-link" to="/">프로필 수정</router-link>
      </li>
      <li>
        <a class="router-link" v-on:click="logout">로그아웃</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'UseProfileRoute',
  methods: {
    logout(event) {
      event.preventDefault();
      event.stopPropagation();
      this.$store.commit('LOGOUT');

      this.$router.replace('/login');
    },
  },
};
</script>

<style lang="scss">
  .user-profile-route {
    position: absolute;
    top: 100%;
    right: 10px;
    width: 200px;
    border: 1px solid #ebebeb;
    text-align: left;
    background-color: white;
    li {
      padding-left: 20px;
      padding-right: 20px;
      a.router-link {
        line-height: 50px;
        display: block !important;
        height: 50px;
        font-size: 14px;
        border-bottom: 1px solid #ebebeb;
      }
      &:last-child {
        a {
          border-bottom: 0;
        }
      }

    }
  }
</style>
