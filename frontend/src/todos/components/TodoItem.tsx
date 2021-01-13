import React from 'react';
import { deleteTodo, toggleCompletedTodo } from '../../services/API';
import Button from '@material-ui/core/Button';

import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

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
        <Checkbox
          style={{ color: 'green', transform: 'scale(2)' }}
          checked={todo.status}
          onChange={() => toggleCompletedTodo(todo._id)}
        />
        <div>
          <div className="todo-item-text">
            <h4 className={checkTodo}>{todo.name}</h4>
            {todo.description ? (
              <p className={checkTodo}>{todo.description}</p>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>

      <div className="todo-item-info">
        <span className="todo-item-creator">{todo.creator}</span>
        <Button
          style={{ marginRight: '10px' }}
          variant="outlined"
          color="primary"
          onClick={() => deleteTodo(todo._id)}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => deleteTodo(todo._id)}
          startIcon={<DeleteOutlineIcon />}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
