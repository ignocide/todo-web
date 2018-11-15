<template>
  <div class="input-container">
    <label for="email"></label>
    <input type="email" id="email" v-model="email" placeholder="email"/>
  </div>
</template>

<style scoped lang="scss">

</style>
<script>
export default {
  name: 'Input',
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
