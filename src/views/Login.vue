<template>
  <div class="about">
    <div class="login-form">
      <h1>로그인</h1>
      <form v-on:submit="onSubmit">
        <div class="input-container">
          <label for="email">이메일</label>
          <input type="email" id="email" v-model="email" placeholder="email" />
        </div>

        <div class="input-container">
          <label for="password">비밀번호</label>
          <input type="password" id="password" v-model="password" placeholder="password" />
        </div>
        <div class="input-container">
          <button type="submit" class="btn-fill">로그인</button>
        </div>
      </form>
    </div>

  </div>
</template>
<style scoped lang="scss">
  .login-form {
    padding: 32px;
    border-radius: 4px;
    max-width: 500px;
    width: 100%;
    margin: 80px auto 0;
    text-align: left;
  }

  h1 {
    margin-bottom: 10px;
  }
</style>
<script>
  export default {
    name: 'login-page',

    beforeCreate() {
    },
    created() {
    },
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async onSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        try {
          await this.$store.dispatch('LOGIN', {
            email: this.email,
            password: this.password,
          });
          this.$router.replace('/');
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
</script>
