import { fetchTaskList } from '../api/board';
import { createTask, updateTaskStep } from '../api/task';
import { createAction } from '../utils/action';
import Task, { STEP } from '../vo/Task';
import { UPDATE_TASK } from './taskDetail';

export const FETCH_TASKS = createAction('FETCH_TASKS');
export const CREATE_TASK = createAction('CREATE_TASK');
export const UPDATE_TASK_STEP = createAction('UPDATE_TASK_STEP');

const boardStore = {
  namespace: true,
  state: {
    todo: [],
    done: [],
    donePage: {},
    loading: false,
  },
  // computed: {
  //   list () {
  //     return this.list
  //   },
  // },
  mutations: {
    [FETCH_TASKS.SUCCESS](state, result) {
      const { todo, done, page } = result;
      state.todo = todo;
      state.done = done;
      state.donePage = page;
      state.loading = false;
    },
    [FETCH_TASKS.FAILURE](state) {
      state.list = [];
      state.loading = false;
    },
    [FETCH_TASKS.REQUEST](state) {
      state.loading = true;
    },
    [UPDATE_TASK.SUCCESS](state, updateTask) {
      state.loading = false;
      state.done = state.done.map((task) => {
        if (task.id === updateTask.id) {
          return updateTask;
        }
        return task;
      });

      state.todo = state.todo.map((task) => {
        if (task.id === updateTask.id) {
          return updateTask;
        }
        return task;
      });
    },
    [UPDATE_TASK.FAILURE](state) {
      state.loading = false;
    },
    [UPDATE_TASK.REQUEST](state) {
      state.loading = true;
    },
    [UPDATE_TASK_STEP.SUCCESS](state, updatedTask) {
      state.loading = false;
      const { todo, done } = state;
      const { step } = updatedTask;
      if (step === STEP.DONE) {
        state.todo = todo.filter(task => updatedTask.id !== task.id);
        // state.done.unshift(updatedTask);
        state.done = [updatedTask, ...done];
      } else if (step === STEP.TODO) {
        state.done = done.filter(task => updatedTask.id !== task.id);
        state.todo = [updatedTask, ...todo];
      }
    },
    [UPDATE_TASK_STEP.FAILURE](state) {
      state.loading = false;
    },
    [UPDATE_TASK_STEP.REQUEST](state) {
      state.loading = true;
    },
    [CREATE_TASK.REQUEST](state) {
      state.loading = true;
    },
    [CREATE_TASK.SUCCESS](state, task) {
      state.loading = false;
      state.todo = [task, ...state.todo];
    },
    [CREATE_TASK.REQUEST](state) {
      state.loading = false;
    },
  },
  actions: {
    async [FETCH_TASKS.REQUEST]({ commit }, params) {
      commit(FETCH_TASKS.REQUEST);
      try {
        const result = await fetchTaskList(params);
        // const todos = result.data.map(todo => new Task(todo));

        let { todo, done } = result.data;
        let { content: doneContent, pageable, ...page } = done;
        todo = todo.map(task => new Task(task));
        doneContent = doneContent.map(task => new Task(task));

        commit(FETCH_TASKS.SUCCESS, {
          todo, done: doneContent, page,
        });
      } catch (e) {
        commit(FETCH_TASKS.FAILURE);
      }
    },
    async [UPDATE_TASK_STEP.REQUEST]({ commit }, payload) {
      commit(UPDATE_TASK_STEP.REQUEST);
      try {
        const { task, step } = payload;
        const { id: taskId, boardId } = task;
        const result = await updateTaskStep({ taskId, boardId }, { step });
        const updatedTask = new Task(result.data);
        commit(UPDATE_TASK_STEP.SUCCESS, updatedTask);
      } catch (e) {
        console.log(e);
        commit(UPDATE_TASK_STEP.FAILURE);
      }
    },
    async [CREATE_TASK.REQUEST]({ commit }, payload) {
      commit(CREATE_TASK.REQUEST);
      try {
        const { task } = payload;
        const { boardId } = task;
        const result = await createTask({ boardId }, task);
        const createdTask = new Task(result.data);
        commit(CREATE_TASK.SUCCESS, createdTask);
      } catch (e) {
        console.log(e);
        commit(CREATE_TASK.FAILURE);
      }
    },
  },
};

export default boardStore;
