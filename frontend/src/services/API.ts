import axios from 'axios';

const API_URL: string = 'https://taskavenue-backend.herokuapp.com/api/';
//const API_URL: string = 'http://localhost:8080/api/';

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
    await axios.post(API_URL + 'todoitems', todo);
  } catch (error) {
    throw new Error(error);
  }
};

export const editTodo = async (
  _id: string,
  name: string,
  description: string
): Promise<void> => {
  try {
    const editedTodo = {
      name: name,
      description: description,
    };
    await axios.put(`${API_URL}todoitems/edit/${_id}`, editedTodo);
  } catch (error) {
    throw new Error(error);
  }
};

export const toggleCompletedTodo = async (_id: string): Promise<void> => {
  try {
    const completedTodo: void = await axios.put(
      `${API_URL}todoitems/toggle/${_id}`
    );
    return completedTodo;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTodo = async (_id: string): Promise<void> => {
  try {
    const deletedTodo: void = await axios.delete(`${API_URL}todoitems/${_id}`);
    return deletedTodo;
  } catch (error) {
    throw new Error(error);
  }
};
