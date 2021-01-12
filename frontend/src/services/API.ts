import axios from 'axios';

const baseUrl: string = 'http://localhost:8080/api/';

export const addTodo = async (
  name: string,
  description: string,
  currentUser: string,
  id: string
): Promise<void> => {
  try {
    const todo: Omit<ITodo, '_id'> = {
      name: name,
      description: description,
      creator: currentUser,
      status: false,
      listId: id,
    };
    await axios.post(baseUrl + 'todoitems', todo);
  } catch (error) {
    throw new Error(error);
  }
};
