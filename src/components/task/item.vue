<template>
  <div
    class="task-item"
    draggable="true"
    @dragstart="bindData">
    <check :checked="!isTodo" @click="checkTask"></check>
    <div @click="setDetail">
      <h3 class="task-name">{{task.name}}</h3>
      <p class="task-detail">{{task.detail}}</p>
    </div>
  </div>
</template>
<script>
import * as dragNDrop from '../../utils/dragNDrop';
import Check from '../common/Check.vue';
import { SET_TASK_DETAIL } from '../../store/taskDetail';
import { UPDATE_TASK_STEP } from '../../store/taskList';

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
    bindData(event) {
      dragNDrop.setData(event, this.task);
      dragNDrop.setType(event, 'task');
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
  .task-item {
    text-align: left;
    position: relative;
    padding: 15px 15px 15px 62px;
    border: 1px solid #ebebeb;
    border-radius: 4px;
    background-color: white;
    transition: border-color 0.3s;
    h3.task-name {
      margin-bottom: 10px;
    }
    p.task-detail {
      size: 14px;
    }
    & + .task-item {
      margin-top: 10px;
    }
    .check {
      position: absolute;
      left: 15px;
      top: 50%;
      margin-top: -16px;
    }
    &:hover {
      border-color: #71c0b6;
    }
  }
</style>
