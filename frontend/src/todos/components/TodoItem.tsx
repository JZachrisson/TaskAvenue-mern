import React from 'react';
import './TodoItem.css';

const TodoItem: React.FC<TodoProps> = ({ todo }) => {
  return (
    <div className="todo-item-card">
      <li className="todo-item">
        {todo.name}
        {todo.description} created by: {todo.creator}
      </li>
    </div>
  );
};

export default TodoItem;
