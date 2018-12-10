<template>
  <div id="board-detail-page">
    <div class="btn-group">
      <button class="btn-sm" type="button" @click="setCreateTaskModal(true)">생성</button>
    </div>
    <div class="todo-tracks">
      <TodoTrack :tasks="todos" :title="'Todo'" :step="STEP.TODO"></TodoTrack>
      <TodoTrack :tasks="dones" :title="'Done'" :step="STEP.DONE"></TodoTrack>
    </div>
    <modal v-if="showCreatedBoardModal" @close="setCreateTaskModal(false)">
      <div slot="content">
        <form @submit="createTask">
          <div class="modal-header">
            <h1>Task 생성</h1>
          </div>
          <div class="modal-body">
            <div class="input-container">
              <label for="task-name">Task</label>
              <input type="text" id="task-name" v-model="createForm.name" required/>
            </div>
            <div class="input-container">
              <label for="task-detail">상세 설명</label>
              <textarea type="text" id="task-detail" v-model="createForm.detail">
              </textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn" type="submit" v-bind:disabled="disabledCreateButton">확인</button>&nbsp;
            <button class="btn" type="button" @click="setCreateTaskModal(false)">닫기</button>
          </div>
        </form>
      </div>
    </modal>
    <modal v-if="showDetailForm">
      <task-detail-form slot="content"/>
    </modal>
  </div>
</template>
<style scoped lang="scss">
  .todo-tracks {
  }

  .btn-group {
    text-align: right;
    padding: 20px;
  }

</style>
<script>
import * as taskList from '../../store/boardDetail.js';
import TodoTrack from '../../components/board/detail.vue';
import { STEP } from '../../vo/Task.js';
import Modal from '../../components/common/Modal.vue';
import Task from '../../vo/Task';
import TaskDetailForm from '../../components/task/detailForm.vue';

const defaultCreateForm = {
  name: '',
  detail: '',
};

export default {
  name: 'taskList',
  computed: {
    taskList() {
      return [];
    },
    todos() {
      return this.$store.state.boardDetail.todo;
    },
    //    doings() {
    //      return this.boardDetail.filter(todo => todo.step === STEP.DOING);
    //    },
    dones() {
      return this.$store.state.boardDetail.done;
    },
    STEP() {
      return STEP;
    },
    disabledCreateButton() {
      return !this.createForm.name;
    },
    showDetailForm() {
      return !!this.$store.state.taskDetail.detail;
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
    TaskDetailForm,
    Modal,
    TodoTrack,
  },
  beforeCreate() {
    const { boardId } = this.$route.params;
    const { dispatch } = this.$store;
    dispatch(taskList.FETCH_BOARD_DETAIL.REQUEST, { boardId });
  },
  methods: {
    initCreateForm() {
      this.createForm = {
        ...defaultCreateForm,
      };
    },
    setCreateTaskModal(isShow) {
      if (!isShow) {
        this.initCreateForm();
      }
      this.showCreatedBoardModal = isShow;
    },
    async createTask(e) {
      e.preventDefault();
      e.stopPropagation();
      const { dispatch } = this.$store;
      const { boardId } = this.$route.params;
      const newTask = new Task(this.createForm);
      newTask.boardId = boardId;
      await dispatch(taskList.CREATE_TASK.REQUEST, { task: newTask });
      this.setCreateTaskModal(false);
    },
  },
  created() {
  },
};
</script>
