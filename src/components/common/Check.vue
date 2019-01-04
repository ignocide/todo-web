<template>
  <div class="check" @click="$emit('click')" @class="">
    <!--<svg viewBox="0 0 52 52" fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-width="3"-->
    <!--focusable="false" aria-hidden="true" role="presentation" stroke-linecap="round" stroke-linejoin="round"-->
    <!--style="height: 16px; width: 16px; display: block; overflow: visible;">-->
    <!--<path d="m19.1 25.2 4.7 6.2 12.1-11.2"></path>-->
    <!--</svg>-->
    <div class="check-mark">

    </div>
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
  $active-color: #71c8b6;
  .check {
    display: inline-block;
    border-radius: 50%;
    border: 2px solid #ebebeb;
    box-sizing: content-box;
    color: #71c0b6;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin: 0 5px;
    position: relative;
    transition: border-color 0.3s;
    .check-mark {
      position: absolute;
      display: inline-block;
      width: 50%;
      height: 50%;
      background-color: transparent;
      transition: background-color 0.3s;
      border-radius: 50%;
      top: 25%;
      left: 25%;
    }
    &:hover {
      border-color: $active-color;
      .check-mark {
        background-color: $active-color;
      }
    }
  }

</style>
