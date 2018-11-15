const STEP = {
  TODO: 'TODO',
  // DOING: 'DOING',
  DONE: 'DONE',
};


class Task {
  boardId = null;

  createdAt = null;

  deleted = false;

  detail = '';

  id = null;

  name = null;

  step = null;

  updatedAt = null;

  constructor(todo = {}) {
    this.boardId = todo.boardId;
    this.createdAt = todo.createdAt;
    this.deleted = todo.deleted;
    this.detail = todo.detail;
    this.id = todo.id;
    this.name = todo.name;
    this.step = todo.step;
    this.updatedAt = todo.updatedAt;
  }

  getNextStep() {
    if (this.step === 'TODO') {
      return STEP.DONE;
    }

    return STEP.TODO;
  }
}

export { STEP };
export default Task;
