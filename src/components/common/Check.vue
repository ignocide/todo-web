<template>
  <div class="check" @click="$emit('click')" @class="">
    <transition name="fade">
      <svg viewBox="0 0 52 52" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="3"
           focusable="false" aria-hidden="true" role="presentation" stroke-linecap="round" stroke-linejoin="round"
           v-if="checked" style="height: 32px; width: 32px; display: block; overflow: visible;">
        <path d="m19.1 25.2 4.7 6.2 12.1-11.2"></path>
      </svg>
    </transition>
  </div>
</template>
<script>
export default {
  components: {},
  name: 'check',
  props: {
    checked: Boolean,
  },
  methods: {},
  created() {
  },
};
</script>
<style scoped lang="scss">
  .check {
    display: inline-block;
    border-radius: 50%;
    border: 2px solid #71c0b6;
    box-sizing: content-box;
    color: #71c0b6;
    width: 32px;
    height: 32px;

    /*svg{*/
    /*transition-property: -ms-transform, -webkit-transform, transform !important;*/
    /*transform: scale(1, 1) !important;*/
    /*transition-duration: 62.5ms !important;*/
    /*}*/
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>
