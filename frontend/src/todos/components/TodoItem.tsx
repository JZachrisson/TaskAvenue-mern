import React from 'react';
import { deleteTodo, toggleCompletedTodo } from '../../services/API';
import './TodoItem.css';

type Props = TodoProps & {
  deleteTodo: (_id: string) => void;
  toggleCompletedTodo: (_id: string) => void;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const checkTodo: string = todo.status ? `line-through` : '';
  return (
    <div className="todo-item-card">
      <div className="todo-item">
        <h3 className={checkTodo}>{todo.name}</h3>
        {todo.description ? (
          <p className={checkTodo}>{todo.description}</p>
        ) : (
          ''
        )}
      </div>

      <div>
        <span className="todo-item-creator">{todo.creator}</span>
        <button
          onClick={() => toggleCompletedTodo(todo._id)}
          className="todo-item-edit-btn"
        >
          Complete
        </button>
        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
