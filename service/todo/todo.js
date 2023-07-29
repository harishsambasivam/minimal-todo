
export class TodoService {
    constructor(todoDAO) {
        this.todo = todoDAO;
    }

    create = async (todo) => {
        logger.debug({todo}, "invoking todo service layer")
        return await this.todo.create(todo);
    }
}