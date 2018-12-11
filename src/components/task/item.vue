<template>
  <li class="task"><check @click="checkTask"/><span @click="requestTaskDetailModal">{{task.name}}</span></li>
</template>
<script>
import Check from '../common/Check.vue';
import { SET_TASK_DETAIL } from '../../store/taskDetail';
import { UPDATE_TASK_STEP } from '../../store/boardDetail';
import TaskDetailModal from './updateModal.vue';

export default {
  components: {
    Check,
  },
  data() {
    return {
      isChecked: false,
    };
  },
  name: 'TaskItem',
  props: {
    task: Object,
  },
  computed: {
    isTodo() {
      return this.task.step === 'TODO';
    },
  },
  methods: {
    requestTaskDetailModal() {
      this.$modal.show(TaskDetailModal, {
        task: this.task,
      }, {
        height: 'auto',
      });
    },
    checkTask(evt) {
      const { dispatch } = this.$store;
      const step = this.task.getNextStep();
      const task = this.task;
      dispatch(UPDATE_TASK_STEP.REQUEST, { task, step });
    },
    setDetail() {
      const { commit } = this.$store;
      commit(SET_TASK_DETAIL, this.task);
    },
  },
};
</script>
<style lang="scss">
  $main-color: #71c0b6;
  li.task, li.create-task-form{
    padding: 6px 5px;
    height: 42px;
    line-height: 30px;
    & + li.task {
      border-top: 1px solid #ebebeb;
    }
    & + .create-task-form{
      border-top: 1px solid #ebebeb;
    }
  }
  li.task{

    .check{
      margin-right: 10px;
    }
    &:hover{
      cursor: pointer;
      .check{
        border-color: $main-color;
        .check-mark{
          background-color: $main-color;
        }
      }
    }
  }
</style>
