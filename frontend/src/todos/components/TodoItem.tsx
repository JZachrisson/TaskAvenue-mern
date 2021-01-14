import React, { useState } from 'react';
import { deleteTodo, toggleCompletedTodo, editTodo } from '../../services/API';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import './TodoItem.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
  },
}));

type Props = TodoProps & {
  deleteTodo: (_id: string) => void;
  toggleCompletedTodo: (_id: string) => void;
  editTodo: (_id: string, name: string, description: string) => void;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(todo.name);
  const [description, setDescription] = useState(todo.description);

  const checkTodo: string = todo.status ? `line-through` : '';

  return (
    <>
      <Modal
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className={classes.paper}>
          <h3>Edit</h3>
          <input
            value={name}
            style={{ marginBottom: '10px' }}
            placeholder={todo.name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            value={description}
            placeholder={todo.description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button onClick={() => editTodo(todo._id, name, description)}>
            Submit
          </Button>
        </div>
      </Modal>
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
          <div style={{ display: 'inline-block', marginRight: '15px' }}>
            {todo.creator}
          </div>

          <Button
            style={{ marginRight: '10px' }}
            variant="outlined"
            color="primary"
            onClick={() => setOpen(true)}
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
    </>
  );
};

export default TodoItem;
