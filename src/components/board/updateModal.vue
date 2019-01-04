<template>
  <div class="modal">
    <form @submit="updateBoard">
      <div class="input-container">
        <label for="board-name"></label>
        <input type="text" id="board-name" class="update" v-model="boardForm.name" />
      </div>
      <div class="button-row">
        <button type="submit">수정</button>
        <button type="button">닫기</button>
      </div>
    </form>
  </div>
</template>
<style lang="scss" scoped>
  #board-name {
    font-weight: bold;
    &:focus {
      font-weight: normal;
    }
  }

  .button-row {
    text-align: right;
    button + button {
      margin-left: 10px;
    }
  }
</style>
<script>
  import { UPDATE_BOARD } from '../../store/boardDetailUpdate';

  const defaultUpdateForm = {
    name: '',
  };

  export default {
    name: 'BoardUpdateModal',
    data() {
      return {
        boardForm: {
          ...defaultUpdateForm,
        },
      };
    },
    props: {
      board: Object,
    },
    components: {},
    created() {
      this.boardForm.name = this.board.name;
    },
    methods: {
      async updateBoard(e) {
        e.preventDefault();
        e.stopPropagation();
        const { dispatch } = this.$store;

        await dispatch(UPDATE_BOARD.REQUEST, {
          board: this.boardForm,
          boardId: this.board.id,
        });

        this.$emit('close');
      },
    },
  };
</script>
