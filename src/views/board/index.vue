<template>
  <div id="board-list-page">
    <aside>
      <ul id="project-list">
        <h2 class="project-list-header">프로젝트</h2>
        <li class="project">
          <form class="board-create-form" @submit="createBoard">
            <label for="board-name"></label>
            <input type="text" id="board-name" v-model="createForm.name" required placeholder="" />
            <button type="submit" class="submit-btn" v-bind:disabled="disabledCreateButton">
              +
            </button>
          </form>
        </li>
        <li v-for="board in boardList">
          <div class="project" :class="getBoardActiveClass(board)">
            <div class="project-name" @click="selectBoard(board)">#  {{ board.name }}</div>
            <button type="button" class="management-btn" @click="toggleProjectOptRow(board)">
              ...
            </button>
          </div>
          <transition name="fade">
            <div v-if="board.id === activeOptRowBoardId" class="project-opt-row">
              <button type="button" class="management-btn" @click="requestProjectDetailModal(board)">
                수정
              </button>
              <button type="button" class="management-btn" @click="requestBoardDelete(board)">
                삭제
              </button>
            </div>
          </transition>
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
  #board-list-page {
    min-height: calc(100vh - 61px);
    position: relative;
    padding-left: 300px;
    display: flex;
    aside {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 300px;
      padding: 50px 10px;
      text-align: left;
      ul#project-list {
        position: relative;
        .project {
          display: flex;
          padding: 10px;
          transition: color 0.3s;
          cursor: pointer;
          &.active {
            color: $main-color;
          }
          &-name {
            flex: 1 auto;
          }
          & > .management-btn {
            height: auto;
            width: 50px;
            background-color: transparent;
            border-color: transparent;
            color: transparent;
            font-weight: bold;
            transition: color;
          }

          &:hover {
            .management-btn {
              color: $main-color;
            }
          }
        }
        .project-opt-row {
          & > .management-btn {
            height: auto;
            width: auto;
            background-color: transparent;
            border-color: transparent;
            color: black;
            font-weight: bold;
            transition: color;
          }
        }
      }
    }

    form.board-create-form {
      width: 100%;
      display: flex;
      input {
        width: 100%;
        border-width: 0 0 1px 0;
        transition: border-color 0.3s;
        flex: 1 auto;
        &:focus {
          outline: 0;
          border-color: $main-color;
        }
      }
      & > .submit-btn {
        height: auto;
        width: 50px;
        background-color: transparent;
        border-color: transparent;
        color: $main-color;
        font-weight: bold;
        &:active {
          background-color: transparent;
        }
        &:disabled {
          color: #bbb;
        }
      }
    }
  }

  .btn-group {
    text-align: right;
    padding: 20px;
  }

  .fade-enter-active, .fade-leave-active {
    /*transform : scaleY(1);*/
    /*transition: transform .5s;*/
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    /*transform : scaleY(0);*/
  }
</style>
<script>
  // @ is an alias to /src
  import Board from '../../components/Board.vue';
  import { CREATE_BOARD, FETCH_BOARDS, DELETE_BOARD } from '../../store/boards.js';
  import { FETCH_BOARD_DETAIL } from '../../store/boardDetail.js';
  import BoardDetail from '../../components/board/detail.vue';
  import UpdateBoardModal from '../../components/board/updateModal.vue';

  const defaultCreateForm = {
    name: '',
  };

  export default {
    name: 'BoardList',
    computed: {
      boardList() {
        return this.$store.state.boards.list;
      },
      selectedBoardId() {
        const { board } = this.$store.state.boardDetail;
        return board ? board.id : null;
      },
      disabledCreateButton() {
        return !this.createForm.name;
      },
    },
    data() {
      return {
        createForm: {
          ...defaultCreateForm,
        },
        activeOptRowBoardId: null,
      };
    },
    components: {
      BoardDetail,
      Board,
    },
    methods: {
      initCreateForm() {
        this.createForm = {
          ...defaultCreateForm,
        };
      },
      async createBoard(e) {
        e.preventDefault();
        e.stopPropagation();
        const { dispatch } = this.$store;
        await dispatch(CREATE_BOARD.REQUEST, this.createForm);
      },
      selectBoard(board) {
        const { dispatch } = this.$store;
        const { id: boardId } = board;
        dispatch(FETCH_BOARD_DETAIL.REQUEST, { boardId });
      },
      isSelectedBoard(board) {
        return this.selectedBoardId === board.id;
      },
      getBoardActiveClass(board) {
        return {
          active: this.isSelectedBoard(board),
        };
      },
      toggleProjectOptRow(board) {
        const { id } = board;
        if (this.activeOptRowBoardId === id) {
          this.activeOptRowBoardId = null;
        } else {
          this.activeOptRowBoardId = id;
        }
      },
      requestProjectDetailModal(board) {
        this.$modal.show(UpdateBoardModal, {
          board,
        }, {
          height: 'auto',
        });
      },
      requestBoardDelete(board) {
        this.$modal.show('dialog', {
          title: board.name,
          text: '이 프로젝트를 삭제합니까?',
          buttons: [
            {
              title: '확인',
              handler: () => {
                const { dispatch } = this.$store;
                dispatch(DELETE_BOARD.REQUEST, { boardId: board.id });
              },
            },
            {
              title: '취소',
            },
          ],
        });
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
