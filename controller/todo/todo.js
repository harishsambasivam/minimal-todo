import Joi from "joi";

const todoSchema = Joi.object({
  title: Joi.string().required(),
  isCompleted: Joi.boolean().default(false),
  userId: Joi.string().required()
});

export class TodoController {
  constructor(todoService) {
    this.todoService = todoService;
  }

   createTodo = async(request, response) => {
    logger.debug({body: request.body}, "invoking controller")
    const todo = request.body;
    // validate the todo schema
    const { error } = todoSchema.validate(todo);
    if (error) throw new Error(error.message);
    // create todo in database
    const createdTodo = await this.todoService.create(todo);
    logger.trace({todo: createdTodo})
    return response.status(200).json({
      success: true,
      data: createdTodo,
      error: null,
    });
  }
}
