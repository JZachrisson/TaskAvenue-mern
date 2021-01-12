interface ITodo {
  _id: string;
  name: string;
  description?: string;
  creator: string;
  status: boolean;
  listId: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TodoProps {
  todo: ITodo;
}
