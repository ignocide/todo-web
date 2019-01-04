<template>
  <header role="banner">
    <div class="header-container">
      <div class="logo">
        <div class="service-name">TODO</div>
      </div>
      <div class="header-space" />
      <div id="nav">
        <nav>
          <ul class="nav-link-list">
            <li class="nav-link-item">
              <router-link class="router-link" to="/board">Board</router-link>
            </li>
            <li class="nav-link-item">
              <button class="router-link user-profile-button" v-on:click="toggleUserProfileRoute" v-if="authorization">
                <img alt="user_profile" src="../../assets/user.webp" />
                <UserProfileRoute v-if="showUserProfile" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
<script>
  import { hasRole } from '../../utils/userCookie';
  import UserProfileRoute from './UserProfileRoute.vue';

  export default {
    name: 'Header',
    data() {
      return {
        showUserProfile: false,
      };
    },
    computed: {
      user: () => this.$store.state.auth.user,
      authorization() {
        return this.$store.state.auth.user;
      },
    },
    methods: {
      toggleUserProfileRoute() {
        this.showUserProfile = !this.showUserProfile;
      },
    },
    beforeCreate() {
    },
    created() {
    },
    components: {
      UserProfileRoute,
    },
  };
</script>

<style lang="scss">
  $header-height: 60px;
  $main-color: #71c0b6;
  header {
    border-bottom: 1px solid #eee;
    width: 100%;
    text-align: left;
    height: $header-height;
    background-color: $main-color;
    .header-container {
      display: table;
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
    }
    .logo {
      padding-left: 24px;
      padding-right: 24px;
      vertical-align: middle;
      display: table-cell;
      position: relative;
      text-align: center;
      text-decoration: none !important;
      transition: 0.25s color !important;
      white-space: nowrap;
      .service-name {
        height: 32px;
        line-height: 32px;
        display: inline-block;
        color: white;
        font-size: 24px;
        letter-spacing: 5px;
      }
    }

    .header-space {
      vertical-align: middle;
      display: table-cell;
      width: 100%;
    }

    #nav {
      display: table-cell;
      vertical-align: middle;
      padding: 0;
      nav {
        display: block;
        ul.nav-link-list {
          display: table !important;
          height: $header-height;
          li.nav-link-item {
            display: table-cell;
            vertical-align: middle;
            padding-left: 12px;
            padding-right: 12px;
            border-bottom: 2px solid transparent;
            position: relative;

            &:hover {
              border-color: #bbb;
            }

            button.user-profile-button {
              display: inline-block;
              height: auto;
              padding: 0;
              margin: 0;
              line-height: 1;
              border: 0;
              border-radius: 50%;
              overflow: hidden;
              vertical-align: middle;
              img {
                height: 30px;
                vertical-align: top;
              }
            }
          }
          .router-link {
            display: inline-block;
          }
        }
      }
    }
  }
</style>
