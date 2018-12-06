<template>
  <div v-if="boardDetail !== null">
    <h1>{{boardDetail.name}}</h1>
    <ul id="task-list">
      <li v-for="task in taskList">
        {{task.name}}
      </li>
    </ul>
  </div>
</template>
<script>
import TaskComponent from '../task/item.vue';
import Task from '../../vo/Task';
import * as dragNDrop from '../../utils/dragNDrop';
import { UPDATE_TASK_STEP } from '../../store/boardDetail';

export default {
  name: 'BoardDetail',
  methods: {
  },
  computed: {
    taskList() {
      return this.$store.state.boardDetail.todo;
    },
    boardDetail() {
      return this.$store.state.boardDetail.board;
    },
  },
  components: {
  },
  created() {
  },
};
</script>
<style lang="scss">
  #board-detail{
    text-align: left;
    flex: 1 auto;
    border-width: 0 1px;
    border-style: solid;
    border-color: #ebebeb;
    padding: 50px;
    width:100%;
  }
  #task-list{
    margin-top: 50px;
  }

</style>
