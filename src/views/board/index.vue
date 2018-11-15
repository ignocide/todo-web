<template>
  <div id="board-list-page">
    <div class="btn-group">
      <button class="btn-sm" type="button" @click="setCreateBoardModal(true)">생성</button>
    </div>
    <div class="board-list">
      <div class="cell" v-for="board in boardList">
        <Board :board="board"/>
      </div>
    </div>
    <modal v-if="showCreatedBoardModal" @close="setCreateBoardModal(false)">
      <div slot="content">
        <form @submit="createBoard">
          <div class="modal-header">
            <h1>프로젝트 생성</h1>
          </div>
          <div class="input-container modal-body">
            <label for="board-name">프로젝트 명</label>
            <input type="text" id="board-name" v-model="createForm.name" required/>
          </div>
          <div class="modal-footer">
            <button class="btn" type="submit" v-bind:disabled="disabledCreateButton">확인</button>&nbsp;
            <button class="btn" type="button" @click="setCreateBoardModal(false)">닫기</button>
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>
<style scoped lang="scss">
  .board-list {
    padding-top: 10px;
    padding-bottom: 10px;
    display: table;
    width: 100%;
    .cell {
      display: table-cell;
      width: 33.33333333%;
      padding: 5px 10px;
      float: left;
    }
  }

  .btn-group {
    text-align: right;
    padding: 20px;
  }
</style>
<script>
// @ is an alias to /src
import Board from '../../components/Board.vue';
import { CREATE_BOARD, FETCH_BOARDS } from '../../store/boards.js';
import Modal from '../../components/common/Modal.vue';

const defaultCreateForm = {
  name: '',
};

export default {
  name: 'BoardList',
  computed: {
    boardList() {
      return this.$store.state.boards.list;
    },
    disabledCreateButton() {
      return !this.createForm.name;
    },
  },
  data() {
    return {
      showCreatedBoardModal: false,
      createForm: {
        ...defaultCreateForm,
      },
    };
  },
  components: {
    Modal,
    Board,
  },
  methods: {
    initCreateForm() {
      this.createForm = {
        ...defaultCreateForm,
      };
    },
    setCreateBoardModal(isShow) {
      if (!isShow) {
        this.initCreateForm();
      }
      this.showCreatedBoardModal = isShow;
    },
    async createBoard(e) {
      e.preventDefault();
      e.stopPropagation();
      const { dispatch } = this.$store;
      await dispatch(CREATE_BOARD.REQUEST, this.createForm);
      this.setCreateBoardModal(false);
    },
  },
  beforeCreate() {
    const { dispatch } = this.$store;
    dispatch(FETCH_BOARDS.REQUEST);
  },
  created() {
  },
};
</script>
