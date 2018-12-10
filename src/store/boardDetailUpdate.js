import {updateBoard} from '../api/board';
import {createAction} from '../utils/action';

export const UPDATE_BOARD = createAction('UPDATE_BOARD');

const boardStore = {
  namespace: true,
  state: {
    loading: false,
  },
  mutations: {
    [UPDATE_BOARD.REQUEST](state) {
      state.loading = true;
    },
    [UPDATE_BOARD.SUCCESS](state, task) {
      state.loading = false;
    },
    [UPDATE_BOARD.REQUEST](state) {
      state.loading = false;
    },
  },
  actions: {
    async [UPDATE_BOARD.REQUEST]({commit}, params) {
      commit(UPDATE_BOARD.REQUEST);
      try {
        const {board, boardId} = params
        const result = await updateBoard({boardId}, board);

        let {board: updatedBoard} = result.data;

        commit(UPDATE_BOARD.SUCCESS, updatedBoard);
      } catch (e) {
        commit(UPDATE_BOARD.FAILURE);
      }
    },
  },
};

export default boardStore;
