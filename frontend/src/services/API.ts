import axios from 'axios';

const baseUrl: string = 'http://localhost:8080/api/';

export const addTodo = async (
  values: any,
  currentUser: string,
  id: string
): Promise<void> => {
  try {
    const todo: Omit<ITodo, '_id'> = {
      name: values.name,
      description: values.description,
      creator: currentUser,
      status: false,
      listId: id,
    };
    await axios.post(baseUrl + 'todoitems', todo);
  } catch (error) {
    throw new Error(error);
  }
};

export const toggleCompletedTodo = async (_id: string): Promise<void> => {
  try {
    const completedTodo: void = await axios.put(
      `${baseUrl}todoitems/toggle/${_id}`
    );
    return completedTodo;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTodo = async (_id: string): Promise<void> => {
  try {
    const deletedTodo: void = await axios.delete(`${baseUrl}todoitems/${_id}`);
    return deletedTodo;
  } catch (error) {
    throw new Error(error);
  }
};
