<template>
  <div class="task-detail-form">
    <form @submit="updateTask">
      <div class="modal-body">
        <div class="input-container">
          <label for="task-name">Task</label>
          <input type="text" id="task-name" v-model="task.name" required />
        </div>
        <div class="input-container">
          <label for="task-detail">상세 설명</label>
          <textarea type="text" id="task-detail" v-model="task.detail">
            </textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn" type="button">삭제</button>&nbsp;
        <button class="btn" type="submit">수정</button>&nbsp;
        <button class="btn" type="button" @click="close">닫기</button>
      </div>
    </form>
  </div>
</template>
<script>
  import Task from '../../vo/Task';
  import { CLEAR_TASK_DETAIL, UPDATE_TASK } from '../../store/taskDetail';

  export default {
    name: 'task-detail-form',
    data() {
      return {
        task: new Task(),
      };
    },
    methods: {
      close() {
        const { commit } = this.$store;
        commit(CLEAR_TASK_DETAIL);
      },
      async updateTask(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        const { dispatch } = this.$store;
        dispatch(UPDATE_TASK.REQUEST, this.task);
      },
    },
    created() {
      const { detail } = this.$store.state.taskDetail;

      this.task = new Task(detail);
    },
  };
</script>
<style lang="scss">
  .task-detail-form {
    input, textarea {
      /*border-color: transparent;*/
    }
    #task-name {
      font-size: 24px;
    }
  }
</style>
