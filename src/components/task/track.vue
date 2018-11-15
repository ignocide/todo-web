<template>
  <div class="task-track">
    <h3>{{title}}</h3>
    <ul v-on:drop="dropItem" v-on:dragover="allowDrop">
      <Task v-for="task in tasks" :task="task"/>
    </ul>
  </div>
</template>
<script>
import TaskComponent from './item.vue';
import Task from '../../vo/Task';
import * as dragNDrop from '../../utils/dragNDrop';
import { UPDATE_TASK_STEP } from '../../store/taskList';

export default {
  name: 'TodoTrack',
  props: {
    title: String,
    tasks: Array,
    step: String,
  },
  methods: {
    allowDrop(event) {
      event.preventDefault();
    },
    dropItem(event) {
      event.preventDefault();
      let task = dragNDrop.getData(event);
      const type = dragNDrop.getType(event);

      if (type !== 'task') {
        return;
      }

      if (task.step === this.step) {
        return;
      }
      task = new Task(task);
      this.$store.dispatch(UPDATE_TASK_STEP.REQUEST, {
        task,
        step: this.step,
      });
    },
  },
  components: {
    Task: TaskComponent,
  },
  created() {
  },
};
</script>
<style lang="scss">
  .task-track {
    display: inline-block;
    width: 50%;
    float: left;
    min-height: 50vh;
    padding: 10px 25px;
    h3 {
      text-align: left;
      position: relative;
      width: 100%;
      margin-bottom: 30px;
    }

    ul {
      padding-bottom: 100px;
    }
    @media screen and (max-width: 700px) {
      width: 100%;
    }
  }
</style>
