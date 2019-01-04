<template>
  <a :href="boardDetailLink">
    <div class="board">
      <div>
        <div class="name">
          {{ board.name }}
        </div>
        <div class="arrow">
          >
        </div>
      </div>
    </div>
  </a>
</template>
<style scoped lang="scss">
  .board {
    display: table;
    border: 1px solid #eaeaea;
    width: 100%;
    height: 250px;
    &:hover {
      border-color: black;
    }
    & > div {
      display: table-cell;
      position: relative;
      vertical-align: middle;
      .arrow {
        position: absolute;
        right: 20px;
        bottom: 20px;
      }
    }
  }
</style>
<script>
  export default {
    name: 'board',
    props: ['board'],
    computed: {
      boardDetailLink() {
        return `/board/${this.board.id}`;
      },
    },
    created() {
    },
  };
</script>
