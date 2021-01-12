import React from 'react';
import { deleteTodo } from '../../services/API';
import './TodoItem.css';

type Props = TodoProps & {
  deleteTodo: (_id: string) => void;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <div className="todo-item-card">
      <div className="todo-item">
        <h3>{todo.name}</h3>
        {todo.description ? <p>{todo.description}</p> : ''}
      </div>

      <div>
        <span className="todo-item-creator">{todo.creator}</span>
        <button className="todo-item-edit-btn">Complete</button>
        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
