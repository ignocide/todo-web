import { createBoard, fetchBoardList } from '../api/board';
import { createAction } from '../utils/action';
import { FETCH_BOARD_DETAIL } from './boardDetail';
import {UPDATE_BOARD} from "./boardDetailUpdate";

export const FETCH_BOARDS = createAction('FETCH_BOARDS');
export const CREATE_BOARD = createAction('CREATE_BOARD');

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
    [UPDATE_BOARD.SUCCESS](state,updatedBoard){
      state.list = state.list.map(board => {
        if(updatedBoard.id === board.id){
          return updatedBoard
        } else {
          return board
        }
      })
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
  },
};

export default boardStore;
