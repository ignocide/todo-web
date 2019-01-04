import { createBoard, deleteBoard, fetchBoardList } from '../api/board';
import { createAction } from '../utils/action';
import { FETCH_BOARD_DETAIL } from './boardDetail';
import { UPDATE_BOARD } from './boardDetailUpdate';

export const FETCH_BOARDS = createAction('FETCH_BOARDS');
export const CREATE_BOARD = createAction('CREATE_BOARD');
export const DELETE_BOARD = createAction('DELETE_BOARD');

const boardStore = {
  namespace: true,
  state: {
    list: [],
    loading: false,
  },
  // computed: {
  //   count () {
  //     return this.count
  //   }
  // },
  mutations: {
    [FETCH_BOARDS.SUCCESS](state, result) {
      state.list = result.list;
      state.loading = false;
    },
    [FETCH_BOARDS.FAILURE](state) {
      state.list = [];
      state.loading = false;
    },
    [FETCH_BOARDS.REQUEST](state) {
      state.loading = true;
    },
    [CREATE_BOARD.REQUEST](state) {
      state.loading = true;
    },
    [CREATE_BOARD.FAILURE](state) {
      state.loading = false;
    },
    [UPDATE_BOARD.SUCCESS](state, updatedBoard) {
      state.list = state.list.map((board) => {
        if (updatedBoard.id === board.id) {
          return updatedBoard;
        }
        return board;
      });
    },
    [DELETE_BOARD.REQUEST](state) {
      state.loading = true;
    },
    [DELETE_BOARD.SUCCESS](state, boardId) {
      state.loading = false;
      state.list = state.list.filter(board => board.id !== boardId);
    },
    [DELETE_BOARD.FAILURE](state) {
      state.loading = false;
    },
  },
  actions: {
    async [FETCH_BOARDS.REQUEST]({ commit, dispatch }) {
      commit(FETCH_BOARDS.REQUEST);
      try {
        const result = await fetchBoardList();
        const boardList = result.data;
        commit(FETCH_BOARDS.SUCCESS, boardList);
        if (boardList && boardList.list && boardList.list.length > 0) {
          const boardId = boardList.list[0].id;
          dispatch(FETCH_BOARD_DETAIL.REQUEST, { boardId });
        }
      } catch (e) {
        commit(FETCH_BOARDS.FAILURE);
      }
    },
    async [CREATE_BOARD.REQUEST]({ commit, dispatch }, form) {
      commit(CREATE_BOARD.REQUEST);
      try {
        await createBoard(form);
        dispatch(FETCH_BOARDS.REQUEST);
      } catch (e) {
        commit(FETCH_BOARDS.FAILURE);
      }
    },
    async [DELETE_BOARD.REQUEST]({ commit, rootState, state, dispatch }, params) {
      commit(DELETE_BOARD.REQUEST);
      try {
        const { boardId } = params;
        await deleteBoard({ boardId });
        const detailState = rootState.boardDetail;
        const currentBoard = detailState.board;
        commit(DELETE_BOARD.SUCCESS, boardId);
        const currentList = state.list;
        if (!currentBoard || currentBoard.id === boardId) {
          if (currentList.length > 0) {
            const { id } = currentList[0];
            dispatch(FETCH_BOARD_DETAIL.REQUEST, { boardId: id });
          }
        }
      } catch (e) {
        commit(DELETE_BOARD.FAILURE);
      }
    },
  },
};

export default boardStore;
