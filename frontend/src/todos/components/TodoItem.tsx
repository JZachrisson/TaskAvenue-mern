import React from 'react';
import { deleteTodo, toggleCompletedTodo } from '../../services/API';
import Button from '@material-ui/core/Button';

import Checkbox from '@material-ui/core/Checkbox';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';

import './TodoItem.css';

type Props = TodoProps & {
  deleteTodo: (_id: string) => void;
  toggleCompletedTodo: (_id: string) => void;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const checkTodo: string = todo.status ? `line-through` : '';
  console.log(todo.status);
  return (
    <div className="todo-item-card">
      <div className="todo-item">
        <Checkbox
          style={{ color: 'green', transform: 'scale(2)' }}
          checked={todo.status}
          onChange={() => toggleCompletedTodo(todo._id)}
        />
        <div>
          <h3 className={checkTodo}>{todo.name}</h3>
          {todo.description ? (
            <p className={checkTodo}>{todo.description}</p>
          ) : (
            ''
          )}
        </div>
      </div>

      <div>
        <span className="todo-item-creator">{todo.creator}</span>

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
