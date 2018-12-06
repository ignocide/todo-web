<template>
  <div id="board-list-page">
    <aside>
      <ul id="project-list">
        <h2 class="project-list-header">프로젝트</h2>
        <li class="project" v-if="">
          <form class="board-create-form" @submit="createBoard">
            <label for="board-name"></label>
            <input type="text" id="board-name" v-model="createForm.name" required placeholder=""/>
            <button type="submit" class="submit-btn" v-bind:disabled="disabledCreateButton">
              +
            </button>
          </form>
        </li>
        <li class="project" v-for="board in boardList">
          <div class="project-name">#  {{ board.name }}</div>
          <button type="button" class="management-btn">
            ...
          </button>
        </li>
      </ul>
    </aside>
    <div id="board-detail">
      <board-detail />
    </div>
    <!--<modal v-if="showCreatedBoardModal" @close="setCreateBoardModal(false)">-->
      <!--<div slot="content">-->
        <!--<form @submit="createBoard">-->
          <!--<div class="modal-header">-->
            <!--<h1>프로젝트 생성</h1>-->
          <!--</div>-->
          <!--<div class="input-container modal-body">-->
            <!--<label for="board-name">프로젝트 명</label>-->
            <!--<input type="text" id="board-name" v-model="createForm.name" required/>-->
          <!--</div>-->
          <!--<div class="modal-footer">-->
            <!--<button class="btn" type="submit" v-bind:disabled="disabledCreateButton">확인</button>&nbsp;-->
            <!--<button class="btn" type="button" @click="setCreateBoardModal(false)">닫기</button>-->
          <!--</div>-->
        <!--</form>-->
      <!--</div>-->
    <!--</modal>-->
  </div>
</template>
<style scoped lang="scss">
  $main-color: #71c0b6;
  #board-list-page{
    min-height: calc(100vh - 61px);
    position: relative;
    padding-left: 300px;
    display: flex;
    aside{
      position: absolute;
      left: 0;
      top:0;
      height:100%;
      width:300px;
      padding: 50px 10px;
      text-align: left;
      ul#project-list {
        position: relative;
        .project{
          display: flex;
          padding:10px;

          &-name{
            flex:1 auto;
          }
          & > .management-btn{
            height:auto;
            width: 50px;
            background-color: transparent;
            border-color: transparent;
            color: transparent;
            font-weight:bold;
            transition: color;
          }

          &:hover{
            .management-btn{
              color: $main-color;
            }
          }
        }
      }
    }


    form.board-create-form{
      width:100%;
      display: flex;
      input{
        width:100%;
        border-width:0 0 1px 0;
        transition: border-color 0.3s;
        flex: 1 auto;
        &:focus{
          outline: 0;
          border-color: $main-color;
        }
      }
      & > .submit-btn{
        height:auto;
        width: 50px;
        background-color: transparent;
        border-color: transparent;
        color: $main-color;
        font-weight:bold;
        &:active{
          background-color: transparent;
        }
        &:disabled{
          color: #bbb;
        }
      }
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
import BoardDetail from "../../components/board/detail.vue";

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
    BoardDetail,
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
