<template>
  <div class="modal">
    <form @submit="updateTask">
      <div class="input-container">
        <label for="task-name"></label>
        <input type="text" id="task-name" class="update" v-model="taskForm.name"/>
      </div>
      <div class="input-container">
        <label for="task-detail">상세 내용</label>
        <textarea type="text" id="task-detail" class="update" v-model="taskForm.detail"/>
      </div>
      <div class="button-row">
        <button type="submit">수정</button>
        <button type="button" @click="$emit('close')">닫기</button>
      </div>
    </form>
  </div>
</template>
<style lang="scss" scoped>
  #task-name {
    font-weight: bold;
    &:focus {
      font-weight: normal;
    }
  }

  #task-detail {
    &:focus {
      font-weight: normal;
    }
  }

  .button-row {
    text-align: right;
    button + button {
      margin-left: 10px;
    }
  }
</style>
<script>
  import Task from "../../vo/Task";
  import { UPDATE_TASK } from '../../store/taskDetail';

  const defaultUpdateForm = {
    name: '',
  };

  export default {
    name: 'TaskUpdateModal',
    data() {
      return {
        taskForm: {
          ...defaultUpdateForm,
        },
      };
    },
    props: {
      task: Object,
    },
    components: {},
    created() {
      console.log(this.task)
      this.taskForm = new Task(this.task)
    },
    methods: {
      async updateTask(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        const { dispatch } = this.$store;
        const task = this.taskForm;
        dispatch(UPDATE_TASK.REQUEST, task);
        this.$emit('close');
      },
    },
  };
</script>
