<template>
  <div v-if="boardDetail !== null">
    <h1>{{boardDetail.name}}</h1>
    <ul id="task-list">
      <!--<li class="task" v-for="task in taskList">-->
      <!--<check @click="checkTask"/>{{task.name}}-->
      <!--</li>-->
      <task-item v-for="task in taskList" :task="task" key="task.id" />
      <li class="create-task-form">
        <form @submit='createTask'>
          <i class="add-icon">+</i>
          <label for="board-name"></label>
          <input type="text" id="board-name" v-model="createForm.name" required placeholder="새로운 할일" />
        </form>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
  $main-color: #71c0b6;
  #board-detail {
    text-align: left;
    flex: 1 auto;
    border-width: 0 1px;
    border-style: solid;
    border-color: #ebebeb;
    padding: 50px;
    width: 100%;
  }

  #task-list {
    margin-top: 30px;
    li.task, li.create-task-form {
      padding: 6px 5px;
      height: 42px;
      line-height: 30px;
      & + li.task {
        border-top: 1px solid #ebebeb;
      }
      & + .create-task-form {
        border-top: 1px solid #ebebeb;
      }
    }
    li.task {

      .check {
        margin-right: 10px;
      }
      &:hover {
        cursor: pointer;
        .check {
          border-color: $main-color;
          .check-mark {
            background-color: $main-color;
          }
        }
      }
    }
    .create-task-form {
      form {
        width: 100%;
        display: flex;
        i.add-icon {
          width: 50px;
          height: 100%;
          text-align: center;
          font-style: normal;
        }
        input {
          width: 100%;
          border-width: 0;
          flex: 1 auto;
          &:focus {
            outline: 0;
          }
        }
      }
    }
  }

</style>
<script>
  import TaskComponent from '../task/item.vue';
  import Task from '../../vo/Task';
  import TaskItem from '../task/item.vue';
  import * as dragNDrop from '../../utils/dragNDrop';
  import { CREATE_TASK } from '../../store/boardDetail';
  import Check from '../common/Check.vue';

  const defaultCreateForm = {
    name: '',
  };

  export default {
    name: 'BoardDetail',
    data() {
      return {
        createForm: {
          ...defaultCreateForm,
        },
      };
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
      TaskItem,
      Check,
    },
    created() {
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
        const { id: boardId } = this.boardDetail;
        const newTask = new Task(this.createForm);
        newTask.boardId = boardId;
        await dispatch(CREATE_TASK.REQUEST, { task: newTask });
        this.setCreateTaskModal(false);
      },
    },
  };
</script>
