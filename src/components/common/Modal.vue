<template>
  <portal to="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container" v-bind:class="containerClass" @click="cancelBubbling"
             v-bind:style="{ maxWidth: maxWidth+'px'}">
          <slot name="content"/>
        </div>
      </div>
    </div>
  </portal>
</template>
<script>
export default {
  name: 'Modal',
  props: {
    containerClass: String,
    maxWidth: {
      type: Number,
      default: 500,
    },
  },
  methods: {
    cancelBubbling(e) {
      e.stopPropagation();
    },
  },
  beforeCreate() {
  },
  created() {
  },
  components: {},
};
</script>

<style lang="scss">
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 95%;
    margin: 0px auto;
    padding: 50px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;

    text-align: left;
    .modal-footer {
      text-align: right;
    }
    .modal-header {
      font-size: 16px;
      margin-bottom: 20px;
    }

  }

  .fade-in-enter {
    opacity: 0;
  }

  .fade-in-leave-active {
    opacity: 0;
  }

  .fade-in-enter .fade-in-container,
  .fade-in-leave-active .fade-in-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

</style>
