import { createAction } from '../utils/action';
import Task from '../vo/Task';
import { updateTask } from '../api/task';

export const SET_TASK_DETAIL = 'SET_TASK_DETAIL';
export const CLEAR_TASK_DETAIL = 'CLEAR_TASK_DETAIL';
export const UPDATE_TASK = createAction('UPDATE_TASK');

const boardDetailStore = {
  namespace: true,
  state: {
    detail: null,
    loading: false,
  },
  // computed: {
  //   list () {
  //     return this.list
  //   },
  // },
  mutations: {
    [SET_TASK_DETAIL](state, task) {
      state.detail = new Task(task);
    },
    [CLEAR_TASK_DETAIL](state) {
      state.detail = null;
    },
  },
  actions: {
    async [UPDATE_TASK.REQUEST]({ commit }, task) {
      commit(UPDATE_TASK.REQUEST);
      try {
        const { id: taskId, boardId } = task;
        const result = await updateTask({ taskId, boardId }, task);
        const updatedTask = new Task(result.data);
        commit(UPDATE_TASK.SUCCESS, updatedTask);
      } catch (e) {
        commit(UPDATE_TASK.FAILURE);
      }
      commit(CLEAR_TASK_DETAIL);
    },
  },
};

export default boardDetailStore;
