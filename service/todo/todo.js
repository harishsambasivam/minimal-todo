
export class TodoService {
    constructor(todoDAO) {
        this.todo = todoDAO;
    }

    create = async (todo) => {
        return await this.todo.create(todo)
    }
}